import express from 'express';
import { body } from 'express-validator';
import {
  verifyOTP,
  resendOTP,
  getOTPStatus,
  validateOTP
} from '../controllers/otpController.js';

const router = express.Router();

// Validation rules
const mobileValidation = [
  body('mobile')
    .notEmpty()
    .withMessage('Mobile number is required')
    .isLength({ min: 10, max: 10 })
    .withMessage('Mobile number must be 10 digits')
];

const otpValidation = [
  body('mobile')
    .notEmpty()
    .withMessage('Mobile number is required')
    .isLength({ min: 10, max: 10 })
    .withMessage('Mobile number must be 10 digits'),
  body('otp')
    .notEmpty()
    .withMessage('OTP is required')
    .isLength({ min: 6, max: 6 })
    .withMessage('OTP must be 6 digits'),
  body('purpose')
    .optional()
    .isIn(['registration', 'login', 'password_reset', 'account_verification'])
    .withMessage('Invalid purpose')
];

const resendValidation = [
  body('mobile')
    .notEmpty()
    .withMessage('Mobile number is required')
    .isLength({ min: 10, max: 10 })
    .withMessage('Mobile number must be 10 digits'),
  body('purpose')
    .optional()
    .isIn(['registration', 'login', 'password_reset', 'account_verification'])
    .withMessage('Invalid purpose')
];

// Routes
router.post('/verify', otpValidation, verifyOTP);
router.post('/resend', resendValidation, resendOTP);
router.post('/validate', otpValidation, validateOTP);
router.get('/status/:mobile', getOTPStatus);

export default router;