import { Response, NextFunction } from 'express';
import { auth } from '../config/firebase-admin.config.js';
import { AuthRequest } from './firebase-auth.middleware.js';

export const requireRole = (allowedRoles: string[]) => {
  return async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const uid = req.user?.uid;
      if (!uid) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      const userRecord = await auth.getUser(uid);
      const userRole = userRecord.customClaims?.role as string;

      if (!userRole || !allowedRoles.includes(userRole)) {
        res.status(403).json({ 
          message: 'Forbidden - Insufficient permissions',
          required: allowedRoles,
          current: userRole || 'none',
        });
        return;
      }

      next();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Authorization failed';
      res.status(403).json({ message });
    }
  };
};