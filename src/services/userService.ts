import { db, auth } from '../lib/firebase';
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  onSnapshot 
} from 'firebase/firestore';
import { AppUserProfile } from '../types';

export const SUPERADMIN_EMAIL = 'josferestudio@gmail.com';
export const BOOTSTRAP_CHEF_EMAIL = 'usajosefernan@gmail.com';

/**
 * Obtiene el perfil de un usuario desde Firestore
 */
export async function getUserProfile(userId: string): Promise<AppUserProfile | null> {
  try {
    const userRef = doc(db, 'users', userId);
    const snap = await getDoc(userRef);
    if (snap.exists()) {
      return snap.data() as AppUserProfile;
    }
  } catch (error) {
    console.error('Error fetching user profile from Firestore:', error);
  }
  return null;
}

/**
 * Guarda o actualiza el perfil del usuario en Firestore
 */
export async function saveUserProfile(profile: Partial<AppUserProfile> & { id: string }): Promise<void> {
  try {
    const userRef = doc(db, 'users', profile.id);
    const isSuperAdmin = profile.email === SUPERADMIN_EMAIL;
    const isChef = profile.email === BOOTSTRAP_CHEF_EMAIL;

    await setDoc(userRef, {
      ...profile,
      role: isSuperAdmin ? 'superadmin' : profile.role || 'user',
      isSuperAdmin: isSuperAdmin || profile.isSuperAdmin || false,
      isChef: isChef || (profile as any).isChef || false,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (error) {
    console.error('Error saving user profile to Firestore:', error);
    throw error;
  }
}

/**
 * Escuchador reactivo en tiempo real para el perfil del usuario
 */
export function subscribeToUserProfile(
  userId: string, 
  callback: (profile: AppUserProfile | null) => void
): () => void {
  const userRef = doc(db, 'users', userId);
  return onSnapshot(userRef, (snap) => {
    if (snap.exists()) {
      callback(snap.data() as AppUserProfile);
    } else {
      callback(null);
    }
  }, (error) => {
    console.warn('Error subscribing to user profile:', error);
  });
}
