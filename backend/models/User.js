import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  // Basic Information
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [50, 'First name cannot be more than 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxlength: [50, 'Last name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please enter a valid email'
    ]
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },

  // Role and Account Information
  role: {
    type: String,
    enum: ['admin', 'merchant', 'user'],
    default: 'merchant'
  },
  accountStatus: {
    type: String,
    enum: ['pending', 'active', 'suspended', 'deactivated'],
    default: 'pending'
  },
  accountNumber: {
    type: String,
    unique: true
  },
  balance: {
    type: Number,
    default: 0.00
  },

  // Profile and Media
  avatar: {
    public_id: String,
    url: String
  },
  profileCompletion: {
    type: Number,
    default: 0 // 0-100 percentage
  },

  // Verification and Security
  isVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  verificationCode: String,
  verificationCodeExpires: Date,
  
  // Login Security
  lastLogin: {
    type: Date
  },
  loginAttempts: {
    type: Number,
    default: 0
  },
  lockUntil: {
    type: Date
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,

  // Security Settings
  security: {
    twoFactorEnabled: {
      type: Boolean,
      default: false
    },
    lastPasswordChange: {
      type: Date,
      default: Date.now
    },
    passwordHistory: [{
      password: String,
      changedAt: Date
    }]
  },

  // User Preferences
  preferences: {
    notifications: {
      email: { type: Boolean, default: true },
      sms: { type: Boolean, default: true },
      push: { type: Boolean, default: true }
    },
    language: {
      type: String,
      default: 'en'
    },
    currency: {
      type: String,
      default: 'INR'
    },
    theme: {
      type: String,
      enum: ['light', 'dark', 'auto'],
      default: 'light'
    }
  },

  // Merchant Specific Fields (if applicable)
  businessName: {
    type: String,
    trim: true
  },
  businessType: {
    type: String,
    enum: ['individual', 'company', 'startup', 'other'],
    default: 'individual'
  },
  address: {
    street: String,
    city: String,
    state: String,
    country: {
      type: String,
      default: 'India'
    },
    pincode: String
  },

  // Analytics and Metadata
  registrationSource: {
    type: String,
    enum: ['web', 'mobile', 'referral', 'partner'],
    default: 'web'
  },
  lastActive: {
    type: Date,
    default: Date.now
  },
  devices: [{
    deviceId: String,
    deviceType: String,
    lastUsed: Date,
    ipAddress: String
  }]

}, {
  timestamps: true
});

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Virtual for account age
userSchema.virtual('accountAge').get(function() {
  return Date.now() - this.createdAt;
});

// Virtual to check if account is locked
userSchema.virtual('isLocked').get(function() {
  return !!(this.lockUntil && this.lockUntil > Date.now());
});

// Generate account number before saving
userSchema.pre('save', function(next) {
  if (!this.accountNumber && this.isNew) {
    this.accountNumber = 'PALM' + Date.now().toString().slice(-10);
  }
  next();
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Update profile completion percentage
userSchema.methods.updateProfileCompletion = function() {
  let completion = 0;
  const totalFields = 8; // Adjust based on important fields
  
  if (this.firstName) completion += 12.5;
  if (this.lastName) completion += 12.5;
  if (this.email) completion += 12.5;
  if (this.phone) completion += 12.5;
  if (this.avatar && this.avatar.url) completion += 12.5;
  if (this.businessName) completion += 12.5;
  if (this.address && this.address.street) completion += 12.5;
  if (this.isVerified) completion += 12.5;
  
  this.profileCompletion = Math.min(100, completion);
  return this.save();
};

// Compare password method
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate verification code
userSchema.methods.generateVerificationCode = function() {
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  this.verificationCode = code;
  this.verificationCodeExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
  return code;
};

// Generate password reset token
userSchema.methods.generatePasswordResetToken = function() {
  const resetToken = Math.floor(100000 + Math.random() * 900000).toString();
  this.resetPasswordToken = resetToken;
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 minutes
  return resetToken;
};

// Method to increment login attempts
userSchema.methods.incrementLoginAttempts = async function() {
  // If we have a previous lock that has expired, restart at 1
  if (this.lockUntil && this.lockUntil < Date.now()) {
    this.loginAttempts = 1;
    this.lockUntil = undefined;
    return this.save();
  }
  
  // Otherwise increment attempts
  this.loginAttempts += 1;
  
  // Lock the account if we've reached max attempts and it's not locked already
  if (this.loginAttempts >= 5 && !this.isLocked) {
    this.lockUntil = Date.now() + 2 * 60 * 60 * 1000; // 2 hours
  }
  
  return this.save();
};

// Method to reset login attempts after successful login
userSchema.methods.resetLoginAttempts = function() {
  this.loginAttempts = 0;
  this.lockUntil = undefined;
  this.lastLogin = new Date();
  return this.save();
};

// Method to check if password is in history
userSchema.methods.isPasswordInHistory = async function(newPassword) {
  if (!this.security.passwordHistory || this.security.passwordHistory.length === 0) {
    return false;
  }
  
  for (const history of this.security.passwordHistory) {
    const isMatch = await bcrypt.compare(newPassword, history.password);
    if (isMatch) return true;
  }
  
  return false;
};

// Method to add password to history
userSchema.methods.addToPasswordHistory = function(passwordHash) {
  if (!this.security.passwordHistory) {
    this.security.passwordHistory = [];
  }
  
  // Keep only last 5 passwords
  this.security.passwordHistory.push({
    password: passwordHash,
    changedAt: new Date()
  });
  
  if (this.security.passwordHistory.length > 5) {
    this.security.passwordHistory = this.security.passwordHistory.slice(-5);
  }
  
  this.security.lastPasswordChange = new Date();
  return this.save();
};

// Static method to find active users
userSchema.statics.findActiveUsers = function() {
  return this.find({ 
    isActive: true, 
    accountStatus: 'active' 
  });
};

// Static method to find by phone with country code
userSchema.statics.findByPhone = function(phone) {
  const cleanPhone = phone.replace(/\D/g, '');
  return this.findOne({
    $or: [
      { phone: cleanPhone },
      { phone: `+91${cleanPhone}` },
      { phone: `91${cleanPhone}` }
    ]
  });
};

// Index for better query performance
userSchema.index({ phone: 1 });
userSchema.index({ email: 1 });
userSchema.index({ accountNumber: 1 });
userSchema.index({ role: 1 });
userSchema.index({ accountStatus: 1 });
userSchema.index({ createdAt: 1 });

// Transform output to remove sensitive fields
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  delete user.verificationCode;
  delete user.verificationCodeExpires;
  delete user.resetPasswordToken;
  delete user.resetPasswordExpire;
  delete user.security?.passwordHistory;
  return user;
};

export default mongoose.model('User', userSchema);