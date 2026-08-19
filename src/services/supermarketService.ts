import { db } from '../lib/firebase';
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  onSnapshot,
  query,
  orderBy
} from 'firebase/firestore';
import { SupermarketOrder } from '../lib/supermarketEngine';

/**
 * Guarda un pedido de supermercado en Firestore `/supermarketOrders`
 */
export async function saveSupermarketOrder(order: SupermarketOrder): Promise<void> {
  try {
    const orderRef = doc(db, 'supermarketOrders', order.id);
    await setDoc(orderRef, {
      ...order,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (error) {
    console.error('Error saving supermarket order to Firestore:', error);
    throw error;
  }
}

/**
 * Obtiene todos los pedidos de supermercado desde Firestore
 */
export async function getAllSupermarketOrders(): Promise<SupermarketOrder[]> {
  try {
    const ordersCol = collection(db, 'supermarketOrders');
    const q = query(ordersCol, orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map(d => d.data() as SupermarketOrder);
  } catch (error) {
    console.error('Error fetching supermarket orders:', error);
    return [];
  }
}

/**
 * Escuchador en tiempo real de los pedidos de supermercado
 */
export function subscribeToSupermarketOrders(
  callback: (orders: SupermarketOrder[]) => void
): () => void {
  const ordersCol = collection(db, 'supermarketOrders');
  const q = query(ordersCol, orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snap) => {
    callback(snap.docs.map(d => d.data() as SupermarketOrder));
  }, (err) => {
    console.warn('Supermarket orders subscription error:', err);
  });
}
