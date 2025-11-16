import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/palmpay';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((error) => console.error('❌ MongoDB connection error:', error));

// ========== ALL ENDPOINTS DEFINED HERE ==========

// 1. Health Check - TEST THIS FIRST
app.get('/api/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  
  res.json({ 
    success: true, 
    message: 'PalmPay API is running!',
    database: dbStatus,
    timestamp: new Date().toISOString()
  });
});

// 2. Mobile Login
app.post('/api/auth/mobile-login', (req, res) => {
  const { mobile, password } = req.body;
  
  if (!mobile || !password) {
    return res.status(400).json({
      success: false,
      message: 'Mobile and password are required'
    });
  }

  res.json({
    success: true,
    message: 'Login successful',
    data: {
      user: {
        id: 'user-123',
        firstName: 'Demo',
        lastName: 'User',
        email: 'demo@palmpay.com',
        phone: mobile,
        accountNumber: 'PALM123456',
        balance: 1000.00,
        isVerified: true
      },
      token: 'demo-jwt-token-123'
    }
  });
});

// 3. Send OTP
app.post('/api/auth/send-otp', (req, res) => {
  const { mobile } = req.body;

  if (!mobile) {
    return res.status(400).json({
      success: false,
      message: 'Mobile number is required'
    });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  
  console.log(`📱 OTP for ${mobile}: ${otp}`);

  res.json({
    success: true,
    message: 'OTP sent successfully',
    data: {
      mobile,
      otp: otp, // In development, we return OTP for testing
      expiresIn: '10 minutes'
    }
  });
});

// 4. Verify OTP
app.post('/api/auth/verify-otp', (req, res) => {
  const { mobile, otp } = req.body;

  if (!mobile || !otp) {
    return res.status(400).json({
      success: false,
      message: 'Mobile and OTP are required'
    });
  }

  // Demo verification - accept any 6-digit OTP
  if (otp.length === 6 && /^\d+$/.test(otp)) {
    res.json({
      success: true,
      message: 'OTP verified successfully',
      data: {
        mobile,
        verified: true
      }
    });
  } else {
    res.status(400).json({
      success: false,
      message: 'Invalid OTP'
    });
  }
});

// 5. Complete Registration
app.post('/api/auth/complete-registration', (req, res) => {
  const { mobile, password, confirmPassword } = req.body;

  if (!mobile || !password || !confirmPassword) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required'
    });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: 'Passwords do not match'
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: 'Password must be at least 6 characters'
    });
  }

  res.json({
    success: true,
    message: 'Registration completed successfully!',
    data: {
      user: {
        id: 'new-user-' + Date.now(),
        firstName: 'New',
        lastName: 'User',
        email: `user_${mobile}@palmpay.com`,
        phone: mobile,
        accountNumber: 'PALM' + Date.now().toString().slice(-10),
        balance: 0.00,
        isVerified: true
      },
      token: 'new-user-jwt-token'
    }
  });
});

// 6. Validate Password
app.post('/api/auth/validate-password', (req, res) => {
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

  res.json({
    success: true,
    data: {
      valid: isValid,
      strength,
      score,
      validation
    }
  });
});

// 7. Check Password Match
app.post('/api/auth/check-password-match', (req, res) => {
  const { password, confirmPassword } = req.body;

  if (!password || !confirmPassword) {
    return res.status(400).json({
      success: false,
      message: 'Both passwords are required'
    });
  }

  const match = password === confirmPassword;

  res.json({
    success: true,
    data: {
      match,
      message: match ? 'Passwords match' : 'Passwords do not match'
    }
  });
});

// ========== FIXED 404 HANDLER ==========
// Remove the problematic '*' route and use this approach:
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
    availableEndpoints: [
      'GET  /api/health',
      'POST /api/auth/mobile-login',
      'POST /api/auth/send-otp', 
      'POST /api/auth/verify-otp',
      'POST /api/auth/complete-registration',
      'POST /api/auth/validate-password',
      'POST /api/auth/check-password-match'
    ]
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 PalmPay Server running on port ${PORT}`);
  console.log(`📍 Available endpoints:`);
  console.log(`   GET  http://localhost:${PORT}/api/health`);
  console.log(`   POST http://localhost:${PORT}/api/auth/mobile-login`);
  console.log(`   POST http://localhost:${PORT}/api/auth/send-otp`);
  console.log(`   POST http://localhost:${PORT}/api/auth/verify-otp`);
  console.log(`   POST http://localhost:${PORT}/api/auth/complete-registration`);
  console.log(`   POST http://localhost:${PORT}/api/auth/validate-password`);
  console.log(`   POST http://localhost:${PORT}/api/auth/check-password-match`);
});