// RELOAD TEST - SAVE ME AGAIN
import express from 'express';

type Request = express.Request;
type Response = express.Response;
type NextFunction = express.NextFunction;

import { auth } from '../config/firebase-admin.config.ts';

export interface AuthRequest extends Request {
  user?: {
    uid: string;
    email?: string;
  };
}

export const firebaseAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ message: 'No token provided' });
      return;
    }

    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await auth.verifyIdToken(token);

    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
    };

    next();
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Authentication failed';
    res.status(401).json({ message });
  }
};