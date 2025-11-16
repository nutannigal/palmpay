import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  updateProfile,
  getBalance,
  changePassword
} from '../controllers/userController.js';

const router = express.Router();

router.use(protect); // All routes below are protected

router.put('/profile', updateProfile);
router.get('/balance', getBalance);
router.put('/change-password', changePassword);

export default router;