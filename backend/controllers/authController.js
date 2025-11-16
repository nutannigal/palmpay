import User from '../models/User.js';
import OTP from '../models/OTP.js';
import { validationResult } from 'express-validator';
import generateToken from '../utils/generateToken.js';

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { firstName, lastName, email, phone, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({
      $or: [{ email }, { phone }]
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      });
    }

    // Create user
    const user = await User.create({
      firstName,
      lastName,
      email,
      phone,
      password
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          accountNumber: user.accountNumber,
          balance: user.balance,
          isVerified: user.isVerified
        },
        token
      }
    });

  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({
      success: false,
      message: 'Error in registration',
      error: error.message
    });
  }
};

// @desc    Login user with mobile
// @route   POST /api/auth/login
// @access  Public
export const mobileLogin = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { mobile, password } = req.body;

    const formattedMobile = mobile.replace(/\D/g, '');
    
    // Find user (for demo, we'll create a mock response)
    // In production, you would query the database
    const user = await User.findOne({ 
      $or: [
        { phone: formattedMobile },
        { phone: `+91${formattedMobile}` }
      ]
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'No account found with this mobile number'
      });
    }

    // Check password
    const isPasswordValid = await user.matchPassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid password'
      });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          accountNumber: user.accountNumber,
          balance: user.balance,
          isVerified: user.isVerified
        },
        token
      }
    });

  } catch (error) {
    console.error('Mobile login error:', error);
    res.status(500).json({
      success: false,
      message: 'Error in login process',
      error: error.message
    });
  }
};

// @desc    Send OTP
// @route   POST /api/auth/send-otp
// @access  Public
export const sendOTP = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { mobile, purpose = 'registration' } = req.body;

    const formattedMobile = mobile.replace(/\D/g, '');

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Delete existing OTPs
    await OTP.deleteMany({ 
      mobile: formattedMobile, 
      purpose 
    });

    // Create new OTP
    const otpDoc = await OTP.create({
      mobile: formattedMobile,
      otp,
      purpose,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000) // 10 minutes
    });

    console.log(`OTP for ${formattedMobile}: ${otp}`);

    res.status(200).json({
      success: true,
      message: 'OTP sent successfully',
      data: {
        mobile: formattedMobile,
        purpose,
        otp: process.env.NODE_ENV === 'development' ? otp : undefined,
        expiresIn: '10 minutes'
      }
    });

  } catch (error) {
    console.error('Send OTP error:', error);
    res.status(500).json({
      success: false,
      message: 'Error sending OTP',
      error: error.message
    });
  }
};

// @desc    Verify OTP
// @route   POST /api/auth/verify-otp
// @access  Public
export const verifyOTP = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { mobile, otp, purpose = 'registration' } = req.body;

    const formattedMobile = mobile.replace(/\D/g, '');

    // Find OTP
    const otpDoc = await OTP.findOne({
      mobile: formattedMobile,
      purpose,
      isUsed: false,
      expiresAt: { $gt: new Date() }
    });

    if (!otpDoc) {
      return res.status(400).json({
        success: false,
        message: 'OTP not found or expired'
      });
    }

    if (otpDoc.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: 'Invalid OTP'
      });
    }

    // Mark OTP as used
    otpDoc.isUsed = true;
    await otpDoc.save();

    res.status(200).json({
      success: true,
      message: 'OTP verified successfully',
      data: {
        mobile: formattedMobile,
        purpose,
        verified: true
      }
    });

  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({
      success: false,
      message: 'Error verifying OTP',
      error: error.message
    });
  }
};

// @desc    Complete registration
// @route   POST /api/auth/complete-registration
// @access  Public
export const completeRegistration = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { mobile, password } = req.body;

    const formattedMobile = mobile.replace(/\D/g, '');

    // Check if OTP was verified
    const verifiedOTP = await OTP.findOne({
      mobile: formattedMobile,
      purpose: 'registration',
      verified: true,
      isUsed: true
    });

    if (!verifiedOTP) {
      return res.status(400).json({
        success: false,
        message: 'OTP verification required'
      });
    }

    // Create user
    const user = await User.create({
      firstName: 'User',
      lastName: formattedMobile.slice(-4),
      email: `user_${formattedMobile}@palmpay.com`,
      phone: formattedMobile,
      password: password,
      isVerified: true
    });

    const token = generateToken(user._id);

    // Clean up OTP
    await OTP.deleteMany({
      mobile: formattedMobile,
      purpose: 'registration'
    });

    res.status(201).json({
      success: true,
      message: 'Registration completed successfully!',
      data: {
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          accountNumber: user.accountNumber,
          balance: user.balance,
          isVerified: user.isVerified
        },
        token
      }
    });

  } catch (error) {
    console.error('Complete registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Error completing registration',
      error: error.message
    });
  }
};

// @desc    Validate password strength
// @route   POST /api/auth/validate-password
// @access  Public
export const validatePassword = async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        success: false,
        message: 'Password is required'
      });
    }

    const validation = {
      minLength: password.length >= 6,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumbers: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };

    const isValid = Object.values(validation).every(Boolean);
    const score = Object.values(validation).filter(Boolean).length;

    let strength = 'weak';
    if (score >= 4) strength = 'strong';
    else if (score >= 3) strength = 'good';
    else if (score >= 2) strength = 'fair';

    res.status(200).json({
      success: true,
      data: {
        valid: isValid,
        strength,
        score,
        validation
      }
    });

  } catch (error) {
    console.error('Validate password error:', error);
    res.status(500).json({
      success: false,
      message: 'Error validating password',
      error: error.message
    });
  }
};

// @desc    Check password match
// @route   POST /api/auth/check-password-match
// @access  Public
export const checkPasswordMatch = async (req, res) => {
  try {
    const { password, confirmPassword } = req.body;

    if (!password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Both passwords are required'
      });
    }

    const match = password === confirmPassword;

    res.status(200).json({
      success: true,
      data: {
        match,
        message: match ? 'Passwords match' : 'Passwords do not match'
      }
    });

  } catch (error) {
    console.error('Check password match error:', error);
    res.status(500).json({
      success: false,
      message: 'Error checking password match',
      error: error.message
    });
  }
};

// Placeholder functions for other routes
export const login = async (req, res) => {
  res.json({ message: 'Login endpoint' });
};