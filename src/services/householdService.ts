import { db } from '../lib/firebase';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { HouseholdMemory, getDefaultHouseholdMemory } from '../lib/antiFugaEngine';

export type { HouseholdMemory };
export { getDefaultHouseholdMemory };

/**
 * Obtiene la memoria técnica de la cocina del usuario desde Firestore
 */
export async function getHouseholdMemory(userId: string): Promise<HouseholdMemory> {
  try {
    const memRef = doc(db, 'users', userId, 'settings', 'household');
    const snap = await getDoc(memRef);
    if (snap.exists()) {
      return snap.data() as HouseholdMemory;
    }
  } catch (error) {
    console.error('Error loading household memory from Firestore:', error);
  }
  return getDefaultHouseholdMemory();
}

/**
 * Guarda la memoria técnica de cocina en Firestore
 */
export async function saveHouseholdMemory(userId: string, memory: HouseholdMemory): Promise<void> {
  try {
    const memRef = doc(db, 'users', userId, 'settings', 'household');
    await setDoc(memRef, {
      ...memory,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (error) {
    console.error('Error saving household memory to Firestore:', error);
    throw error;
  }
}

/**
 * Escucha cambios en tiempo real de la memoria del hogar
 */
export function subscribeToHouseholdMemory(
  userId: string,
  callback: (memory: HouseholdMemory) => void
): () => void {
  const memRef = doc(db, 'users', userId, 'settings', 'household');
  return onSnapshot(memRef, (snap) => {
    if (snap.exists()) {
      callback(snap.data() as HouseholdMemory);
    } else {
      callback(getDefaultHouseholdMemory());
    }
  }, (err) => {
    console.warn('Household memory subscription error:', err);
  });
}
