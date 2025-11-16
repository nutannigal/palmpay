// backend/models/Transaction.js
import mongoose from 'mongoose'

const transactionSchema = new mongoose.Schema({
  transactionId: {
    type: String,
    required: true,
    unique: true
  },
  merchantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Merchant',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  currency: {
    type: String,
    default: 'INR'
  },
  type: {
    type: String,
    enum: ['payment', 'refund', 'transfer'],
    default: 'payment'
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'cancelled', 'refunded'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['card', 'upi', 'netbanking', 'wallet', 'cash'],
    required: true
  },
  paymentGateway: {
    type: String,
    default: 'razorpay'
  },
  gatewayTransactionId: String,
  customer: {
    name: String,
    email: String,
    phone: String
  },
  description: String,
  fees: {
    transactionFee: Number,
    fixedFee: Number,
    totalFee: Number
  },
  netAmount: {
    type: Number,
    required: true
  },
  refundAmount: {
    type: Number,
    default: 0
  },
  metadata: mongoose.Schema.Types.Mixed
}, {
  timestamps: true
})

transactionSchema.index({ transactionId: 1 })
transactionSchema.index({ merchantId: 1 })
transactionSchema.index({ status: 1 })
transactionSchema.index({ createdAt: -1 })
transactionSchema.index({ 'customer.email': 1 })

export default mongoose.model('Transaction', transactionSchema)