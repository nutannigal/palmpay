import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Transaction from '../models/Transaction.js';

const router = express.Router();

// Middleware to check if user is merchant
const requireMerchant = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || user.role !== 'merchant') {
      return res.status(403).json({ message: 'Merchant access required' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Merchant dashboard
router.get('/dashboard', requireMerchant, async (req, res) => {
  try {
    const merchantId = req.user._id;

    const totalTransactions = await Transaction.countDocuments({ merchantId });
    const totalRevenue = await Transaction.aggregate([
      { $match: { merchantId, status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    const recentTransactions = await Transaction.find({ merchantId })
      .populate('userId', 'username email')
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({
      stats: {
        totalTransactions,
        totalRevenue: totalRevenue[0]?.total || 0
      },
      recentTransactions
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;