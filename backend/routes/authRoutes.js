import express from 'express';
import { body } from 'express-validator';
import {
  register,
  login,
  mobileLogin,
  sendOTP,
  verifyOTP,
  completeRegistration,
  validatePassword,
  checkPasswordMatch
} from '../controllers/authController.js';

const router = express.Router();

// Validation rules
const registerValidation = [
  body('firstName')
    .notEmpty()
    .withMessage('First name is required'),
  body('lastName')
    .notEmpty()
    .withMessage('Last name is required'),
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email'),
  body('phone')
    .notEmpty()
    .withMessage('Phone number is required'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
];

const mobileLoginValidation = [
  body('mobile')
    .notEmpty()
    .withMessage('Mobile number is required'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

const sendOTPValidation = [
  body('mobile')
    .notEmpty()
    .withMessage('Mobile number is required')
];

const verifyOTPValidation = [
  body('mobile')
    .notEmpty()
    .withMessage('Mobile number is required'),
  body('otp')
    .notEmpty()
    .withMessage('OTP is required')
];

const completeRegistrationValidation = [
  body('mobile')
    .notEmpty()
    .withMessage('Mobile number is required'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
];

const passwordValidation = [
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

const passwordMatchValidation = [
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  body('confirmPassword')
    .notEmpty()
    .withMessage('Confirm password is required')
];

// Routes
router.post('/register', registerValidation, register);
router.post('/login', mobileLoginValidation, mobileLogin);
router.post('/send-otp', sendOTPValidation, sendOTP);
router.post('/verify-otp', verifyOTPValidation, verifyOTP);
router.post('/complete-registration', completeRegistrationValidation, completeRegistration);
router.post('/validate-password', passwordValidation, validatePassword);
router.post('/check-password-match', passwordMatchValidation, checkPasswordMatch);

export default router;