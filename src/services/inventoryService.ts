import { db } from '../lib/firebase';
import { 
  collection, 
  doc, 
  getDocs, 
  setDoc, 
  deleteDoc, 
  onSnapshot 
} from 'firebase/firestore';
import { FridgeItem } from '../types';
import { initialFridgeStock } from '../data';

/**
 * Obtiene el inventario de nevera y despensa de un usuario en Firestore
 */
export async function getUserInventory(userId: string): Promise<FridgeItem[]> {
  try {
    const invCol = collection(db, 'users', userId, 'inventory');
    const snap = await getDocs(invCol);
    if (!snap.empty) {
      return snap.docs.map(d => d.data() as FridgeItem);
    }
    // Sembrar stock inicial si está vacío
    await seedInitialInventory(userId);
    return initialFridgeStock;
  } catch (error) {
    console.error('Error getting inventory from Firestore:', error);
    return initialFridgeStock;
  }
}

/**
 * Inicializa el inventario del usuario con el stock base
 */
export async function seedInitialInventory(userId: string): Promise<void> {
  try {
    for (const item of initialFridgeStock) {
      const itemRef = doc(db, 'users', userId, 'inventory', item.id);
      await setDoc(itemRef, item);
    }
  } catch (e) {
    console.warn('Error seeding initial inventory:', e);
  }
}

/**
 * Guarda o actualiza un artículo de la nevera/despensa
 */
export async function saveInventoryItem(userId: string, item: FridgeItem): Promise<void> {
  try {
    const itemRef = doc(db, 'users', userId, 'inventory', item.id);
    await setDoc(itemRef, item, { merge: true });
  } catch (error) {
    console.error('Error saving inventory item to Firestore:', error);
  }
}

/**
 * Elimina un artículo del inventario
 */
export async function deleteInventoryItem(userId: string, itemId: string): Promise<void> {
  try {
    const itemRef = doc(db, 'users', userId, 'inventory', itemId);
    await deleteDoc(itemRef);
  } catch (error) {
    console.error('Error deleting inventory item from Firestore:', error);
  }
}

/**
 * Escuchador en tiempo real del inventario del usuario
 */
export function subscribeToUserInventory(
  userId: string,
  callback: (items: FridgeItem[]) => void
): () => void {
  const invCol = collection(db, 'users', userId, 'inventory');
  return onSnapshot(invCol, (snap) => {
    if (!snap.empty) {
      callback(snap.docs.map(d => d.data() as FridgeItem));
    } else {
      callback(initialFridgeStock);
    }
  }, (err) => {
    console.warn('Inventory subscription warning:', err);
  });
}
