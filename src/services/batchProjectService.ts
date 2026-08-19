import { db } from '../lib/firebase';
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  deleteDoc, 
  onSnapshot,
  query,
  orderBy
} from 'firebase/firestore';
import { BatchProject, BatchDish, BatchShoppingItem } from '../types';
import { initializeDishPortions } from '../lib/batchProjects';

/**
 * Carga todos los proyectos de batch cooking del usuario desde Firestore
 */
export async function getUserBatchProjects(userId: string): Promise<BatchProject[]> {
  try {
    const projCol = collection(db, 'users', userId, 'batchProjects');
    const q = query(projCol, orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map(d => d.data() as BatchProject);
  } catch (error) {
    console.error('Error loading batch projects from Firestore:', error);
    return [];
  }
}

/**
 * Guarda o actualiza un proyecto de batch cooking en Firestore
 */
export async function saveBatchProject(userId: string, project: BatchProject): Promise<void> {
  try {
    const projRef = doc(db, 'users', userId, 'batchProjects', project.id);
    await setDoc(projRef, {
      ...project,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (error) {
    console.error('Error saving batch project to Firestore:', error);
    throw error;
  }
}

/**
 * Guarda múltiples proyectos de batch cooking
 */
export async function saveAllUserBatchProjects(userId: string, projects: BatchProject[]): Promise<void> {
  try {
    for (const proj of projects) {
      await saveBatchProject(userId, proj);
    }
  } catch (error) {
    console.error('Error saving all batch projects to Firestore:', error);
  }
}

/**
 * Elimina un proyecto de batch cooking
 */
export async function deleteBatchProject(userId: string, projectId: string): Promise<void> {
  try {
    const projRef = doc(db, 'users', userId, 'batchProjects', projectId);
    await deleteDoc(projRef);
  } catch (error) {
    console.error('Error deleting batch project from Firestore:', error);
  }
}

/**
 * Escuchador en tiempo real de los proyectos de batch cooking del usuario
 */
export function subscribeToUserBatchProjects(
  userId: string,
  callback: (projects: BatchProject[]) => void
): () => void {
  const projCol = collection(db, 'users', userId, 'batchProjects');
  const q = query(projCol, orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snap) => {
    const projects = snap.docs.map(d => d.data() as BatchProject);
    callback(projects);
  }, (err) => {
    console.warn('Batch projects subscription error:', err);
  });
}
