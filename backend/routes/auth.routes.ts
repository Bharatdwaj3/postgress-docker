import { Router } from 'express';
import { firebaseAuth } from '../middleware/fireauth.middleware.ts';
import { requireRole } from '../middleware/role.middleware.ts';
import {
  register,
  getProfile,
  updateUserRole,
  deleteUser,
} from '../controller/auth.controller.ts';

const router = Router();

// Public route
router.post('/register', register);

// Protected routes
router.get('/profile', firebaseAuth, getProfile);

// Admin only routes
router.put('/role', firebaseAuth, requireRole(['admin']), updateUserRole);
router.delete('/user/:id', firebaseAuth, requireRole(['admin']), deleteUser);

export default router;