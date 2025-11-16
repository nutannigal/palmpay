import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
  mobile: {
    type: String,
    required: true,
    index: true
  },
  otp: {
    type: String,
    required: true
  },
  purpose: {
    type: String,
    enum: ['registration', 'login', 'password_reset'],
    default: 'registration'
  },
  isUsed: {
    type: Boolean,
    default: false
  },
  verified: {
    type: Boolean,
    default: false
  },
  expiresAt: {
    type: Date,
    required: true,
    index: { expires: '10m' }
  }
}, {
  timestamps: true
});

export default mongoose.model('OTP', otpSchema);