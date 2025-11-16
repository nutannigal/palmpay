import OTP from '../models/OTP.js';
import User from '../models/User.js';
import { validationResult } from 'express-validator';
import generateToken from '../utils/generateToken.js';

// @desc    Verify OTP
// @route   POST /api/otp/verify
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

    // Find OTP document
    const otpDoc = await OTP.findOne({
      mobile: formattedMobile,
      purpose,
      isUsed: false,
      expiresAt: { $gt: new Date() }
    });

    if (!otpDoc) {
      return res.status(400).json({
        success: false,
        message: 'OTP not found or expired. Please request a new OTP.',
        code: 'OTP_EXPIRED'
      });
    }

    // Check if maximum attempts exceeded
    if (otpDoc.attempts >= otpDoc.maxAttempts) {
      await OTP.deleteMany({ mobile: formattedMobile, purpose });
      return res.status(400).json({
        success: false,
        message: 'Too many failed attempts. Please request a new OTP.',
        code: 'MAX_ATTEMPTS_EXCEEDED'
      });
    }

    // Check if OTP matches
    if (otpDoc.otp !== otp) {
      // Increment attempts
      otpDoc.attempts += 1;
      await otpDoc.save();

      const remainingAttempts = otpDoc.maxAttempts - otpDoc.attempts;

      return res.status(400).json({
        success: false,
        message: `Invalid OTP. ${remainingAttempts} attempts remaining.`,
        code: 'INVALID_OTP',
        data: {
          remainingAttempts,
          mobile: formattedMobile
        }
      });
    }

    // Mark OTP as used and verified
    otpDoc.isUsed = true;
    otpDoc.verified = true;
    await otpDoc.save();

    let user = null;
    let token = null;
    let responseData = {
      success: true,
      message: 'OTP verified successfully',
      data: {
        mobile: formattedMobile,
        verified: true,
        purpose,
        otpId: otpDoc._id
      }
    };

    // Handle different purposes
    switch (purpose) {
      case 'registration':
        // Check if user already exists (should not for registration)
        user = await User.findOne({ 
          $or: [
            { phone: formattedMobile },
            { phone: `+91${formattedMobile}` }
          ]
        });

        if (user) {
          return res.status(400).json({
            success: false,
            message: 'User already exists with this mobile number.',
            code: 'USER_ALREADY_EXISTS'
          });
        }

        responseData.data.nextStep = 'complete_registration';
        responseData.message = 'OTP verified. Please complete your registration.';
        break;

      case 'login':
        user = await User.findOne({ 
          $or: [
            { phone: formattedMobile },
            { phone: `+91${formattedMobile}` }
          ]
        });

        if (!user) {
          return res.status(404).json({
            success: false,
            message: 'No account found with this mobile number.',
            code: 'USER_NOT_FOUND'
          });
        }

        token = generateToken(user._id);
        
        responseData.data.nextStep = 'dashboard';
        responseData.data.user = {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          accountNumber: user.accountNumber,
          balance: user.balance,
          isVerified: user.isVerified,
          avatar: user.avatar
        };
        responseData.data.token = token;
        responseData.message = 'Login successful';
        break;

      case 'password_reset':
        user = await User.findOne({ 
          $or: [
            { phone: formattedMobile },
            { phone: `+91${formattedMobile}` }
          ]
        });

        if (!user) {
          return res.status(404).json({
            success: false,
            message: 'No account found with this mobile number.',
            code: 'USER_NOT_FOUND'
          });
        }

        responseData.data.nextStep = 'reset_password';
        responseData.data.userId = user._id;
        responseData.message = 'OTP verified. You can now reset your password.';
        break;

      case 'account_verification':
        user = await User.findOne({ 
          $or: [
            { phone: formattedMobile },
            { phone: `+91${formattedMobile}` }
          ]
        });

        if (!user) {
          return res.status(404).json({
            success: false,
            message: 'No account found with this mobile number.',
            code: 'USER_NOT_FOUND'
          });
        }

        user.isVerified = true;
        await user.save();

        responseData.data.nextStep = 'account_verified';
        responseData.message = 'Account verified successfully.';
        break;

      default:
        return res.status(400).json({
          success: false,
          message: 'Invalid OTP purpose.',
          code: 'INVALID_PURPOSE'
        });
    }

    res.status(200).json(responseData);

  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({
      success: false,
      message: 'Error verifying OTP',
      error: error.message
    });
  }
};

// @desc    Resend OTP
// @route   POST /api/otp/resend
// @access  Public
export const resendOTP = async (req, res) => {
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

    // Rate limiting - check if OTP was recently sent
    const recentOTP = await OTP.findOne({
      mobile: formattedMobile,
      purpose,
      createdAt: { $gt: new Date(Date.now() - 30 * 1000) } // Last 30 seconds
    });

    if (recentOTP) {
      const timeLeft = Math.ceil((recentOTP.createdAt.getTime() + 30000 - Date.now()) / 1000);
      return res.status(429).json({
        success: false,
        message: `Please wait ${timeLeft} seconds before requesting a new OTP.`,
        code: 'RATE_LIMITED',
        data: { retryAfter: timeLeft }
      });
    }

    // Generate new OTP
    const newOTP = Math.floor(100000 + Math.random() * 900000).toString();

    // Delete any existing OTP for this mobile and purpose
    await OTP.deleteMany({ 
      mobile: formattedMobile, 
      purpose 
    });

    // Create new OTP
    const otpDoc = await OTP.create({
      mobile: formattedMobile,
      otp: newOTP,
      purpose,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000) // 10 minutes
    });

    // In production, integrate with SMS service
    console.log(`New OTP for ${formattedMobile} (${purpose}): ${newOTP}`);
    console.log(`Expires at: ${otpDoc.expiresAt}`);

    // Simulate SMS delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    res.status(200).json({
      success: true,
      message: 'OTP sent successfully',
      data: {
        mobile: formattedMobile,
        purpose,
        expiresIn: '10 minutes',
        // In development, return OTP for testing
        otp: process.env.NODE_ENV === 'development' ? newOTP : undefined
      }
    });

  } catch (error) {
    console.error('Resend OTP error:', error);
    res.status(500).json({
      success: false,
      message: 'Error resending OTP',
      error: error.message
    });
  }
};

// @desc    Get OTP status
// @route   GET /api/otp/status/:mobile
// @access  Public
export const getOTPStatus = async (req, res) => {
  try {
    const { mobile } = req.params;
    const { purpose = 'registration' } = req.query;

    const formattedMobile = mobile.replace(/\D/g, '');

    const otpDoc = await OTP.findOne({
      mobile: formattedMobile,
      purpose,
      expiresAt: { $gt: new Date() }
    });

    if (!otpDoc) {
      return res.status(404).json({
        success: false,
        message: 'No active OTP found',
        code: 'NO_ACTIVE_OTP'
      });
    }

    const timeLeft = Math.max(0, Math.ceil((otpDoc.expiresAt - new Date()) / 1000));
    const canResend = Date.now() - otpDoc.createdAt.getTime() > 30000; // 30 seconds

    res.status(200).json({
      success: true,
      data: {
        mobile: formattedMobile,
        purpose,
        expiresIn: timeLeft,
        canResend,
        attempts: otpDoc.attempts,
        maxAttempts: otpDoc.maxAttempts,
        isUsed: otpDoc.isUsed,
        verified: otpDoc.verified,
        createdAt: otpDoc.createdAt,
        expiresAt: otpDoc.expiresAt
      }
    });

  } catch (error) {
    console.error('Get OTP status error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching OTP status',
      error: error.message
    });
  }
};

// @desc    Validate OTP without consuming it
// @route   POST /api/otp/validate
// @access  Public
export const validateOTP = async (req, res) => {
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

    const otpDoc = await OTP.findOne({
      mobile: formattedMobile,
      purpose,
      isUsed: false,
      expiresAt: { $gt: new Date() }
    });

    if (!otpDoc) {
      return res.status(400).json({
        success: false,
        message: 'OTP not found or expired',
        code: 'OTP_EXPIRED',
        valid: false
      });
    }

    if (otpDoc.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: 'Invalid OTP',
        code: 'INVALID_OTP',
        valid: false
      });
    }

    res.status(200).json({
      success: true,
      message: 'OTP is valid',
      data: {
        valid: true,
        mobile: formattedMobile,
        purpose
      }
    });

  } catch (error) {
    console.error('Validate OTP error:', error);
    res.status(500).json({
      success: false,
      message: 'Error validating OTP',
      error: error.message
    });
  }
};