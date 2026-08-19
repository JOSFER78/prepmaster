import { db } from '../lib/firebase';
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  updateDoc, 
  onSnapshot 
} from 'firebase/firestore';
import { ChefProfile } from '../types';

export const BOOTSTRAP_CHEF_ID = 'chef-jose-fernandez';

export const INITIAL_BOOTSTRAP_CHEF: ChefProfile = {
  id: BOOTSTRAP_CHEF_ID,
  email: 'usajosefernan@gmail.com',
  slug: 'jose-fernandez',
  title: 'Especialista en Batch Cooking Mediterráneo & Cocina Tradicional',
  name: 'José Fernández',
  avatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&auto=format&fit=crop&q=80',
  bio: 'Chef profesional especializado en Batch Cooking tradicional español (Cocina con Carmen) y guisos de alta conservación. Manipulador de alimentos certificado con más de 10 años de experiencia.',
  rating: 5.0,
  reviewsCount: 0,
  completedBookingsCount: 0,
  locationCity: 'Madrid (Chamberí)',
  zones: ['Chamberí', 'Salamanca', 'Retiro', 'Centro', 'Chamartín', 'Moncloa'],
  isVerified: true,
  yearsExperience: 10,
  specialties: ['Batch Cooking', 'Mediterránea Tradicional', 'Cocina con Carmen', 'Fitness High Protein', 'Guisos & Cuchara'],
  pricing: {
    cookingHourRate: 25.0,        // €25/h solo cocina
    groceryShoppingHourRate: 18.0, // €18/h gestión compra
    assistantHourRate: 15.0,       // €15/h ayudante adicional
    travelFee: 5.0,               // €5 desplazamiento
    travelRadiusKm: 15,
    toolsIncluded: true,
    toolsExtraFee: 0.0,
    cleaningIncluded: true,
    cleaningHourRate: 0.0
  },
  availabilityDays: ['Lunes', 'Miércoles', 'Viernes', 'Domingos'],
  timeSlots: ['Mañanas (09:00 - 14:00)', 'Tardes (16:00 - 21:00)'],
  badges: ['Chef Homologado TouChef', 'Manipulador de Alimentos', 'Experto Batch 120min', 'Higiene Certificada'],
  hasFoodHandlerCertificate: true,
  foodHandlerCertificateNumber: 'CERT-MAD-2026-9882',
  allergenManagementCertified: true,
  haccpCompliance: true,
  featuredDishes: [
    {
      name: 'Lentejas Pardinas con Chorizo de Carmen',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop&q=80',
      category: 'Legumbres',
      prepTime: '35 min'
    },
    {
      name: 'Pollo en Pepitoria con Majado de Almendras',
      image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&auto=format&fit=crop&q=80',
      category: 'Carnes',
      prepTime: '50 min'
    },
    {
      name: 'Merluza en Salsa Verde con Almejas',
      image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&auto=format&fit=crop&q=80',
      category: 'Pescados',
      prepTime: '25 min'
    }
  ],
  reviews: []
};

/**
 * Obtiene la lista de cocineros aprobados desde Firestore `/chefs`
 */
export async function getApprovedChefs(): Promise<ChefProfile[]> {
  try {
    const chefsCol = collection(db, 'chefs');
    const snap = await getDocs(chefsCol);
    if (!snap.empty) {
      return snap.docs.map(d => d.data() as ChefProfile);
    }
    // Inicializar el chef bootstrap si la colección está vacía
    await setDoc(doc(db, 'chefs', BOOTSTRAP_CHEF_ID), INITIAL_BOOTSTRAP_CHEF);
    return [INITIAL_BOOTSTRAP_CHEF];
  } catch (error) {
    console.error('Error loading chefs from Firestore:', error);
    return [INITIAL_BOOTSTRAP_CHEF];
  }
}

/**
 * Guarda o actualiza el perfil de un cocinero en Firestore
 */
export async function saveChefProfile(chef: ChefProfile): Promise<void> {
  try {
    const chefRef = doc(db, 'chefs', chef.id);
    await setDoc(chefRef, {
      ...chef,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (error) {
    console.error('Error saving chef profile to Firestore:', error);
    throw error;
  }
}

/**
 * Escuchador en tiempo real del directorio de cocineros
 */
export function subscribeToChefs(callback: (chefs: ChefProfile[]) => void): () => void {
  const chefsCol = collection(db, 'chefs');
  return onSnapshot(chefsCol, (snap) => {
    if (!snap.empty) {
      callback(snap.docs.map(d => d.data() as ChefProfile));
    } else {
      callback([INITIAL_BOOTSTRAP_CHEF]);
    }
  }, (err) => {
    console.warn('Chefs subscription error:', err);
    callback([INITIAL_BOOTSTRAP_CHEF]);
  });
}
