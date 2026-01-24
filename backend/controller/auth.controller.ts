import { Request, Response } from 'express';
import { auth } from '../config/firebase-admin.config.js';
import prisma from '../config/prisma-client.js';
import { AuthRequest } from '../middleware/firebase-auth.middleware.js';

// Register new user
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, role, firstName, lastName, age, gender } = req.body;

    // Create user in Firebase
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: `${firstName} ${lastName}`,
    });

    // Set custom claims for role
    await auth.setCustomUserClaims(userRecord.uid, { role });

    // Store additional info in your database based on role
    if (role === 'faculty') {
      await prisma.faculty.create({
        data: {
          email,
          Fname: firstName,
          Lname: lastName,
          age,
          gender,
          Expertise: req.body.expertise,
        },
      });
    } else if (role === 'student') {
      await prisma.student.create({
        data: {
          email,
          Fname: firstName,
          Lname: lastName,
          age,
          gender,
          Subjects: req.body.subject,
        },
      });
    }

    res.status(201).json({
      message: 'User registered successfully',
      uid: userRecord.uid,
      email: userRecord.email,
      role,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Registration failed';
    res.status(500).json({ message });
  }
};

// Get current user info
export const getProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const uid = req.user?.uid;
    if (!uid) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const userRecord = await auth.getUser(uid);
    const customClaims = userRecord.customClaims;

    res.status(200).json({
      uid: userRecord.uid,
      email: userRecord.email,
      displayName: userRecord.displayName,
      role: customClaims?.role || 'user',
      emailVerified: userRecord.emailVerified,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to get profile';
    res.status(500).json({ message });
  }
};

// Update user role (admin only)
export const updateUserRole = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { uid, role } = req.body;

    await auth.setCustomUserClaims(uid, { role });

    res.status(200).json({
      message: 'Role updated successfully',
      uid,
      role,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update role';
    res.status(500).json({ message });
  }
};

// Delete user
export const deleteUser = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { uid } = req.params;

    await auth.deleteUser(uid);

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to delete user';
    res.status(500).json({ message });
  }
};