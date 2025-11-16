// backend/models/Staff.js
import mongoose from 'mongoose'

const staffSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  merchantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Merchant',
    required: true
  },
  department: {
    type: String,
    enum: ['support', 'technical', 'sales', 'operations', 'finance'],
    required: true
  },
  position: {
    type: String,
    required: true
  },
  permissions: [{
    type: String,
    enum: [
      'view_transactions',
      'manage_transactions', 
      'view_settlements',
      'manage_orders',
      'view_reports',
      'manage_products',
      'customer_support'
    ]
  }],
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended'],
    default: 'active'
  },
  joinDate: {
    type: Date,
    default: Date.now
  },
  leaveDate: Date
}, {
  timestamps: true
})

staffSchema.index({ userId: 1 })
staffSchema.index({ merchantId: 1 })
staffSchema.index({ department: 1 })

export default mongoose.model('Staff', staffSchema)