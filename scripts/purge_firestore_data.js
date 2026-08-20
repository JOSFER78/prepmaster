import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import fs from 'fs';

const firebaseConfig = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf8'));

const app = initializeApp(firebaseConfig);
const db = getFirestore(app, firebaseConfig.firestoreDatabaseId || undefined);

async function purgeCollection(colName) {
  console.log(`Buscando documentos en colección: ${colName}...`);
  try {
    const colRef = collection(db, colName);
    const snapshot = await getDocs(colRef);
    console.log(`Encontrados ${snapshot.docs.length} documentos en '${colName}'.`);
    
    for (const d of snapshot.docs) {
      console.log(` - Eliminando documento ${d.id} en ${colName}...`);
      if (colName === 'users') {
        try {
          const subCol = collection(db, 'users', d.id, 'batchProjects');
          const subSnap = await getDocs(subCol);
          for (const subD of subSnap.docs) {
            console.log(`   - Eliminando sub-proyecto ${subD.id}...`);
            await deleteDoc(doc(db, 'users', d.id, 'batchProjects', subD.id));
          }
        } catch (e) {
          console.warn('Subcollection check error:', e.message);
        }
      }
      await deleteDoc(doc(db, colName, d.id));
    }
    console.log(`✓ Colección '${colName}' purgada con éxito.`);
  } catch (error) {
    console.error(`Error purgando colección '${colName}':`, error);
  }
}

async function run() {
  console.log('Iniciando purga total de Firestore para TouChef...');
  console.log(`Database ID: ${firebaseConfig.firestoreDatabaseId}`);
  
  await purgeCollection('users');
  await purgeCollection('chefBookings');
  await purgeCollection('batchProjects');
  await purgeCollection('chefRequests');
  await purgeCollection('reviews');
  await purgeCollection('user_preferences');
  
  console.log('🎉 PURGA COMPLETADA: Todas las colecciones de prueba han sido vaciadas.');
  process.exit(0);
}

run().catch(err => {
  console.error('Error fatal en purga:', err);
  process.exit(1);
});
