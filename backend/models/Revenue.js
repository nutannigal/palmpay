// backend/models/Revenue.js
import mongoose from 'mongoose'

const revenueSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  merchantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Merchant'
  },
  totalTransactions: {
    type: Number,
    default: 0
  },
  successfulTransactions: {
    type: Number,
    default: 0
  },
  failedTransactions: {
    type: Number,
    default: 0
  },
  totalAmount: {
    type: Number,
    default: 0
  },
  totalFees: {
    type: Number,
    default: 0
  },
  netRevenue: {
    type: Number,
    default: 0
  },
  refundAmount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})

revenueSchema.index({ date: 1 })
revenueSchema.index({ merchantId: 1 })
revenueSchema.index({ date: 1, merchantId: 1 }, { unique: true })

export default mongoose.model('Revenue', revenueSchema)