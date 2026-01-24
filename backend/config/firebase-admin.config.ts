import admin from 'firebase-admin';
import type { Auth } from 'firebase-admin/auth';

const firebaseApp = admin.initializeApp({
  projectId: 'demo-project',
  storageBucket: 'demo-project.appspot.com',
});

if (process.env.NODE_ENV === 'development') {
  process.env.FIREBASE_AUTH_EMULATOR_HOST = 'firebase:9099';
  process.env.FIREBASE_STORAGE_EMULATOR_HOST = 'firebase:9199';
}

export const auth: Auth = admin.auth();
export const storage = admin.storage().bucket() as ReturnType<ReturnType<typeof admin.storage>['bucket']>;

export default firebaseApp;