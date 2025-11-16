// backend/models/Settlement.js
import mongoose from 'mongoose'

const settlementSchema = new mongoose.Schema({
  settlementId: {
    type: String,
    required: true,
    unique: true
  },
  merchantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Merchant',
    required: true
  },
  period: {
    startDate: Date,
    endDate: Date
  },
  transactions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Transaction'
  }],
  totalAmount: {
    type: Number,
    required: true
  },
  totalFees: {
    type: Number,
    required: true
  },
  netAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed'],
    default: 'pending'
  },
  settlementDate: Date,
  bankReference: String,
  failureReason: String
}, {
  timestamps: true
})

settlementSchema.index({ settlementId: 1 })
settlementSchema.index({ merchantId: 1 })
settlementSchema.index({ status: 1 })
settlementSchema.index({ settlementDate: -1 })

export default mongoose.model('Settlement', settlementSchema)