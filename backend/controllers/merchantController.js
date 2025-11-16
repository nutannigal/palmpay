// backend/controllers/merchantController.js
import Merchant from '../models/Merchant.js'
import User from '../models/User.js'
import Transaction from '../models/Transaction.js'
import Settlement from '../models/Settlement.js'
import Order from '../models/Order.js'
import Revenue from '../models/Revenue.js'

// Get merchant dashboard stats
export const getDashboardStats = async (req, res) => {
  try {
    const merchantId = req.user.merchantId || req.user.id

    // Get today's date range
    const today = new Date()
    const startOfToday = new Date(today.setHours(0, 0, 0, 0))
    const endOfToday = new Date(today.setHours(23, 59, 59, 999))

    // Get current month date range
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59, 999)

    // Get transactions stats
    const totalTransactions = await Transaction.countDocuments({ merchantId })
    const todayTransactions = await Transaction.countDocuments({
      merchantId,
      createdAt: { $gte: startOfToday, $lte: endOfToday }
    })
    const successfulTransactions = await Transaction.countDocuments({
      merchantId,
      status: 'completed'
    })

    // Get revenue stats
    const revenueResult = await Transaction.aggregate([
      {
        $match: {
          merchantId: mongoose.Types.ObjectId(merchantId),
          status: 'completed'
        }
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$amount' },
          totalFees: { $sum: '$fees.totalFee' },
          netRevenue: { $sum: '$netAmount' }
        }
      }
    ])

    const todayRevenueResult = await Transaction.aggregate([
      {
        $match: {
          merchantId: mongoose.Types.ObjectId(merchantId),
          status: 'completed',
          createdAt: { $gte: startOfToday, $lte: endOfToday }
        }
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$amount' },
          totalFees: { $sum: '$fees.totalFee' },
          netRevenue: { $sum: '$netAmount' }
        }
      }
    ])

    // Get pending settlements
    const pendingSettlements = await Settlement.aggregate([
      {
        $match: {
          merchantId: mongoose.Types.ObjectId(merchantId),
          status: { $in: ['pending', 'processing'] }
        }
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: '$netAmount' }
        }
      }
    ])

    // Get recent transactions
    const recentTransactions = await Transaction.find({ merchantId })
      .sort({ createdAt: -1 })
      .limit(10)
      .select('transactionId amount status paymentMethod createdAt customer')

    // Calculate success rate
    const successRate = totalTransactions > 0 
      ? (successfulTransactions / totalTransactions) * 100 
      : 0

    const stats = {
      overview: {
        totalTransactions,
        todayTransactions,
        successRate: Math.round(successRate * 100) / 100,
        totalRevenue: revenueResult[0]?.totalRevenue || 0,
        todayRevenue: todayRevenueResult[0]?.totalRevenue || 0,
        pendingSettlements: pendingSettlements[0]?.totalAmount || 0
      },
      revenue: {
        total: revenueResult[0]?.totalRevenue || 0,
        fees: revenueResult[0]?.totalFees || 0,
        net: revenueResult[0]?.netRevenue || 0
      },
      recentTransactions
    }

    res.json({
      success: true,
      data: stats
    })

  } catch (error) {
    console.error('Dashboard stats error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard stats',
      error: error.message
    })
  }
}

// Get merchant profile
export const getMerchantProfile = async (req, res) => {
  try {
    const merchantId = req.user.merchantId || req.user.id

    const merchant = await Merchant.findOne({ userId: merchantId })
      .populate('userId', 'name email phone avatar')
    
    if (!merchant) {
      return res.status(404).json({
        success: false,
        message: 'Merchant profile not found'
      })
    }

    res.json({
      success: true,
      data: { merchant }
    })

  } catch (error) {
    console.error('Get merchant profile error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch merchant profile',
      error: error.message
    })
  }
}

// Update merchant profile
export const updateMerchantProfile = async (req, res) => {
  try {
    const merchantId = req.user.merchantId || req.user.id
    const updateData = req.body

    // Remove restricted fields
    delete updateData.status
    delete updateData.verification
    delete updateData.stats

    const merchant = await Merchant.findOneAndUpdate(
      { userId: merchantId },
      updateData,
      { new: true, runValidators: true }
    ).populate('userId', 'name email phone avatar')

    if (!merchant) {
      return res.status(404).json({
        success: false,
        message: 'Merchant profile not found'
      })
    }

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: { merchant }
    })

  } catch (error) {
    console.error('Update merchant profile error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to update merchant profile',
      error: error.message
    })
  }
}

// Get transactions with pagination and filters
export const getTransactions = async (req, res) => {
  try {
    const merchantId = req.user.merchantId || req.user.id
    const {
      page = 1,
      limit = 10,
      status,
      paymentMethod,
      startDate,
      endDate,
      search
    } = req.query

    // Build filter object
    const filter = { merchantId }
    
    if (status) filter.status = status
    if (paymentMethod) filter.paymentMethod = paymentMethod
    
    if (startDate || endDate) {
      filter.createdAt = {}
      if (startDate) filter.createdAt.$gte = new Date(startDate)
      if (endDate) filter.createdAt.$lte = new Date(endDate)
    }

    if (search) {
      filter.$or = [
        { transactionId: { $regex: search, $options: 'i' } },
        { 'customer.name': { $regex: search, $options: 'i' } },
        { 'customer.email': { $regex: search, $options: 'i' } }
      ]
    }

    // Calculate pagination
    const skip = (page - 1) * limit

    // Get transactions with pagination
    const transactions = await Transaction.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))

    // Get total count for pagination
    const total = await Transaction.countDocuments(filter)

    res.json({
      success: true,
      data: {
        transactions,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    })

  } catch (error) {
    console.error('Get transactions error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch transactions',
      error: error.message
    })
  }
}

// Get single transaction
export const getTransaction = async (req, res) => {
  try {
    const { id } = req.params
    const merchantId = req.user.merchantId || req.user.id

    const transaction = await Transaction.findOne({
      _id: id,
      merchantId
    })

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found'
      })
    }

    res.json({
      success: true,
      data: { transaction }
    })

  } catch (error) {
    console.error('Get transaction error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch transaction',
      error: error.message
    })
  }
}

// Process refund
export const processRefund = async (req, res) => {
  try {
    const { id } = req.params
    const { amount, reason } = req.body
    const merchantId = req.user.merchantId || req.user.id

    // Find the transaction
    const transaction = await Transaction.findOne({
      _id: id,
      merchantId,
      status: 'completed'
    })

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found or not eligible for refund'
      })
    }

    // Validate refund amount
    const refundAmount = amount || transaction.amount
    const maxRefundAmount = transaction.amount - transaction.refundAmount

    if (refundAmount > maxRefundAmount) {
      return res.status(400).json({
        success: false,
        message: `Refund amount cannot exceed ${maxRefundAmount}`
      })
    }

    // Create refund transaction
    const refundTransaction = await Transaction.create({
      transactionId: `REF_${Date.now()}`,
      merchantId,
      amount: refundAmount,
      type: 'refund',
      status: 'pending',
      paymentMethod: transaction.paymentMethod,
      customer: transaction.customer,
      description: `Refund for transaction ${transaction.transactionId}: ${reason}`,
      fees: {
        transactionFee: 0,
        fixedFee: 0,
        totalFee: 0
      },
      netAmount: -refundAmount,
      refundAmount: refundAmount,
      metadata: {
        originalTransaction: transaction._id,
        refundReason: reason
      }
    })

    // Update original transaction refund amount
    transaction.refundAmount += refundAmount
    if (transaction.refundAmount === transaction.amount) {
      transaction.status = 'refunded'
    }
    await transaction.save()

    // TODO: Integrate with payment gateway for actual refund processing

    res.json({
      success: true,
      message: 'Refund processed successfully',
      data: { refundTransaction }
    })

  } catch (error) {
    console.error('Process refund error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to process refund',
      error: error.message
    })
  }
}

// Get settlements
export const getSettlements = async (req, res) => {
  try {
    const merchantId = req.user.merchantId || req.user.id
    const {
      page = 1,
      limit = 10,
      status,
      startDate,
      endDate
    } = req.query

    // Build filter object
    const filter = { merchantId }
    
    if (status) filter.status = status
    
    if (startDate || endDate) {
      filter.createdAt = {}
      if (startDate) filter.createdAt.$gte = new Date(startDate)
      if (endDate) filter.createdAt.$lte = new Date(endDate)
    }

    // Calculate pagination
    const skip = (page - 1) * limit

    // Get settlements with pagination
    const settlements = await Settlement.find(filter)
      .populate('transactions')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))

    // Get total count for pagination
    const total = await Settlement.countDocuments(filter)

    res.json({
      success: true,
      data: {
        settlements,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    })

  } catch (error) {
    console.error('Get settlements error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch settlements',
      error: error.message
    })
  }
}

// Get single settlement
export const getSettlement = async (req, res) => {
  try {
    const { id } = req.params
    const merchantId = req.user.merchantId || req.user.id

    const settlement = await Settlement.findOne({
      _id: id,
      merchantId
    }).populate('transactions')

    if (!settlement) {
      return res.status(404).json({
        success: false,
        message: 'Settlement not found'
      })
    }

    res.json({
      success: true,
      data: { settlement }
    })

  } catch (error) {
    console.error('Get settlement error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch settlement',
      error: error.message
    })
  }
}

// Get orders
export const getOrders = async (req, res) => {
  try {
    const merchantId = req.user.merchantId || req.user.id
    const {
      page = 1,
      limit = 10,
      status,
      startDate,
      endDate,
      search
    } = req.query

    // Build filter object
    const filter = { merchantId }
    
    if (status) filter.status = status
    
    if (startDate || endDate) {
      filter.createdAt = {}
      if (startDate) filter.createdAt.$gte = new Date(startDate)
      if (endDate) filter.createdAt.$lte = new Date(endDate)
    }

    if (search) {
      filter.$or = [
        { orderId: { $regex: search, $options: 'i' } },
        { 'customer.name': { $regex: search, $options: 'i' } },
        { 'customer.email': { $regex: search, $options: 'i' } }
      ]
    }

    // Calculate pagination
    const skip = (page - 1) * limit

    // Get orders with pagination
    const orders = await Order.find(filter)
      .populate('transactionId')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))

    // Get total count for pagination
    const total = await Order.countDocuments(filter)

    res.json({
      success: true,
      data: {
        orders,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    })

  } catch (error) {
    console.error('Get orders error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders',
      error: error.message
    })
  }
}

// Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params
    const { status, trackingNumber, notes } = req.body
    const merchantId = req.user.merchantId || req.user.id

    const order = await Order.findOne({
      _id: id,
      merchantId
    })

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      })
    }

    // Update order
    const updateData = { status }
    if (trackingNumber) updateData['shipping.trackingNumber'] = trackingNumber
    if (notes) updateData.notes = notes

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate('transactionId')

    res.json({
      success: true,
      message: 'Order status updated successfully',
      data: { order: updatedOrder }
    })

  } catch (error) {
    console.error('Update order status error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to update order status',
      error: error.message
    })
  }
}

// Get revenue analytics
export const getRevenueAnalytics = async (req, res) => {
  try {
    const merchantId = req.user.merchantId || req.user.id
    const { period = '7d' } = req.query // 7d, 30d, 90d, 1y

    // Calculate date range based on period
    const endDate = new Date()
    let startDate = new Date()

    switch (period) {
      case '7d':
        startDate.setDate(startDate.getDate() - 7)
        break
      case '30d':
        startDate.setDate(startDate.getDate() - 30)
        break
      case '90d':
        startDate.setDate(startDate.getDate() - 90)
        break
      case '1y':
        startDate.setFullYear(startDate.getFullYear() - 1)
        break
      default:
        startDate.setDate(startDate.getDate() - 7)
    }

    // Get revenue data grouped by date
    const revenueData = await Transaction.aggregate([
      {
        $match: {
          merchantId: mongoose.Types.ObjectId(merchantId),
          status: 'completed',
          createdAt: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
          },
          totalAmount: { $sum: '$amount' },
          totalFees: { $sum: '$fees.totalFee' },
          netAmount: { $sum: '$netAmount' },
          transactionCount: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ])

    // Get payment method distribution
    const paymentMethodData = await Transaction.aggregate([
      {
        $match: {
          merchantId: mongoose.Types.ObjectId(merchantId),
          status: 'completed',
          createdAt: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: '$paymentMethod',
          totalAmount: { $sum: '$amount' },
          transactionCount: { $sum: 1 }
        }
      }
    ])

    // Get success rate over time
    const successRateData = await Transaction.aggregate([
      {
        $match: {
          merchantId: mongoose.Types.ObjectId(merchantId),
          createdAt: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
          },
          totalTransactions: { $sum: 1 },
          successfulTransactions: {
            $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] }
          }
        }
      },
      {
        $addFields: {
          successRate: {
            $multiply: [
              { $divide: ['$successfulTransactions', '$totalTransactions'] },
              100
            ]
          }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ])

    const analytics = {
      revenueData,
      paymentMethodData,
      successRateData,
      period: {
        startDate,
        endDate,
        period
      }
    }

    res.json({
      success: true,
      data: analytics
    })

  } catch (error) {
    console.error('Get revenue analytics error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch revenue analytics',
      error: error.message
    })
  }
}

// Upload documents for verification
export const uploadDocuments = async (req, res) => {
  try {
    const merchantId = req.user.merchantId || req.user.id
    const { documentType } = req.body

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a document'
      })
    }

    const merchant = await Merchant.findOne({ userId: merchantId })

    if (!merchant) {
      return res.status(404).json({
        success: false,
        message: 'Merchant profile not found'
      })
    }

    // Add or update document
    const documentIndex = merchant.verification.documents.findIndex(
      doc => doc.type === documentType
    )

    const documentData = {
      type: documentType,
      url: req.file.path,
      status: 'pending',
      verifiedAt: null,
      verifiedBy: null
    }

    if (documentIndex > -1) {
      merchant.verification.documents[documentIndex] = documentData
    } else {
      merchant.verification.documents.push(documentData)
    }

    await merchant.save()

    res.json({
      success: true,
      message: 'Document uploaded successfully',
      data: { document: documentData }
    })

  } catch (error) {
    console.error('Upload documents error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to upload document',
      error: error.message
    })
  }
}

// Update settlement settings
export const updateSettlementSettings = async (req, res) => {
  try {
    const merchantId = req.user.merchantId || req.user.id
    const { frequency, minimumAmount, autoSettlement } = req.body

    const merchant = await Merchant.findOneAndUpdate(
      { userId: merchantId },
      {
        $set: {
          'settlementSettings.frequency': frequency,
          'settlementSettings.minimumAmount': minimumAmount,
          'settlementSettings.autoSettlement': autoSettlement
        }
      },
      { new: true, runValidators: true }
    )

    if (!merchant) {
      return res.status(404).json({
        success: false,
        message: 'Merchant profile not found'
      })
    }

    res.json({
      success: true,
      message: 'Settlement settings updated successfully',
      data: { settlementSettings: merchant.settlementSettings }
    })

  } catch (error) {
    console.error('Update settlement settings error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to update settlement settings',
      error: error.message
    })
  }
}