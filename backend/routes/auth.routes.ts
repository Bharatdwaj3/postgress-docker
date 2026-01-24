import { Router } from 'express';
import { firebaseAuth } from '../middleware/firebase-auth.middleware.js';
import { requireRole } from '../middleware/role.middleware.js';
import {
  register,
  getProfile,
  updateUserRole,
  deleteUser,
} from '../controller/auth.controller.js';

const router = Router();

// Public route
router.post('/register', register);

// Protected routes
router.get('/profile', firebaseAuth, getProfile);

// Admin only routes
router.put('/role', firebaseAuth, requireRole(['admin']), updateUserRole);
router.delete('/user/:uid', firebaseAuth, requireRole(['admin']), deleteUser);

export default router;