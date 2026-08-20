import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithRedirect,
  getRedirectResult,
  signInAnonymously, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile,
  signOut as firebaseSignOut, 
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
  User,
  getIdToken
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);

// Explicitly enable local browser persistence for cookies/storage
if (typeof window !== 'undefined') {
  setPersistence(auth, browserLocalPersistence).catch(console.error);
}

export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId || undefined);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export const SUPERADMIN_EMAIL = 'josferestudio@gmail.com';

export const isSuperAdmin = (userOrEmail?: string | User | null): boolean => {
  if (!userOrEmail) return false;
  const email = typeof userOrEmail === 'string' ? userOrEmail : userOrEmail.email;
  return !!email && email.trim().toLowerCase() === SUPERADMIN_EMAIL.toLowerCase();
};

import { Capacitor } from '@capacitor/core';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';

export async function signInWithGoogleNativeOrWeb(): Promise<{ uid: string; email?: string | null; displayName?: string | null; photoURL?: string | null }> {
  if (Capacitor.isNativePlatform()) {
    try {
      const result = await FirebaseAuthentication.signInWithGoogle();
      if (result.user) {
        return {
          uid: result.user.uid,
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoUrl
        };
      }
    } catch (nativeErr) {
      console.warn('Native Google Sign-In failed, attempting web fallback:', nativeErr);
    }
  }

  // Web fallback
  const userCred = await signInWithPopup(auth, googleProvider);
  return {
    uid: userCred.user.uid,
    email: userCred.user.email,
    displayName: userCred.user.displayName,
    photoURL: userCred.user.photoURL
  };
}

export { 
  signInWithPopup, 
  signInAnonymously, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendPasswordResetEmail, 
  sendEmailVerification, 
  updateProfile, 
  firebaseSignOut, 
  firebaseSignOut as signOut, 
  onAuthStateChanged, 
  getIdToken 
};
export type { User };
