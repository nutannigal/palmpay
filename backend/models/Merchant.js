// backend/models/Merchant.js
import mongoose from 'mongoose'

const merchantSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  businessName: {
    type: String,
    required: true,
    trim: true
  },
  businessType: {
    type: String,
    enum: ['retail', 'ecommerce', 'service', 'restaurant', 'other'],
    required: true
  },
  businessRegistration: {
    registrationNumber: String,
    taxId: String,
    registrationDate: Date
  },
  address: {
    street: String,
    city: String,
    state: String,
    country: {
      type: String,
      default: 'India'
    },
    zipCode: String
  },
  contact: {
    phone: String,
    email: String,
    website: String
  },
  bankDetails: {
    accountNumber: String,
    accountHolder: String,
    bankName: String,
    ifscCode: String,
    branch: String
  },
  settlementSettings: {
    frequency: {
      type: String,
      enum: ['daily', 'weekly', 'monthly'],
      default: 'daily'
    },
    minimumAmount: {
      type: Number,
      default: 1000
    },
    autoSettlement: {
      type: Boolean,
      default: true
    }
  },
  fees: {
    transactionFee: {
      type: Number,
      default: 2.9
    },
    fixedFee: {
      type: Number,
      default: 0.3
    }
  },
  status: {
    type: String,
    enum: ['active', 'pending', 'suspended', 'under_review'],
    default: 'pending'
  },
  verification: {
    documents: [{
      type: {
        type: String,
        enum: ['pan', 'gst', 'bank', 'address', 'business']
      },
      url: String,
      status: {
        type: String,
        enum: ['pending', 'verified', 'rejected'],
        default: 'pending'
      },
      verifiedAt: Date,
      verifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    }],
    verified: {
      type: Boolean,
      default: false
    },
    verifiedAt: Date
  },
  stats: {
    totalTransactions: {
      type: Number,
      default: 0
    },
    totalRevenue: {
      type: Number,
      default: 0
    },
    successRate: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true
})

merchantSchema.index({ userId: 1 })
merchantSchema.index({ status: 1 })
merchantSchema.index({ businessName: 'text' })

export default mongoose.model('Merchant', merchantSchema)