import { db } from '../lib/firebase';
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot,
  query,
  orderBy
} from 'firebase/firestore';
import { ChefBookingRequest, ChefApplication, ChefProfile } from '../types';

/**
 * Obtiene todas las reservas desde Firestore `/bookings`
 */
export async function getAllBookings(): Promise<ChefBookingRequest[]> {
  try {
    const bookingsCol = collection(db, 'bookings');
    const q = query(bookingsCol, orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map(d => d.data() as ChefBookingRequest);
  } catch (error) {
    console.error('Error fetching bookings from Firestore:', error);
    return [];
  }
}

/**
 * Guarda o actualiza una reserva en Firestore
 */
export async function saveBooking(booking: ChefBookingRequest): Promise<void> {
  try {
    const bookingRef = doc(db, 'bookings', booking.id);
    await setDoc(bookingRef, {
      ...booking,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (error) {
    console.error('Error saving booking to Firestore:', error);
    throw error;
  }
}

/**
 * Postulación de un cocinero a un encargo broadcast
 */
export async function applyToBookingInFirestore(
  bookingId: string,
  chef: ChefProfile,
  message: string,
  proposedMenu?: string
): Promise<void> {
  try {
    const bookingRef = doc(db, 'bookings', bookingId);
    const snap = await getDoc(bookingRef);
    if (!snap.exists()) return;

    const currentBooking = snap.data() as ChefBookingRequest;
    const applicant: ChefApplication = {
      id: `app_${chef.id}_${Date.now()}`,
      chefId: chef.id,
      chefName: chef.name,
      chefAvatar: chef.avatar,
      chefRating: chef.rating,
      chefHourlyRate: chef.pricing.cookingHourRate,
      chefSpecialties: chef.specialties,
      appliedAt: new Date().toISOString(),
      message,
      proposedMenu,
      status: 'pending'
    };

    const existingApplicants = currentBooking.applicants || [];
    const updatedApplicants = [...existingApplicants.filter(a => a.chefId !== chef.id), applicant];

    await updateDoc(bookingRef, {
      applicants: updatedApplicants,
      status: 'offers_received',
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error applying to booking in Firestore:', error);
    throw error;
  }
}

/**
 * El cliente acepta la candidatura de un cocinero y confirma el encargo
 */
export async function acceptChefApplicationInFirestore(
  bookingId: string,
  applicantId: string
): Promise<void> {
  try {
    const bookingRef = doc(db, 'bookings', bookingId);
    const snap = await getDoc(bookingRef);
    if (!snap.exists()) return;

    const current = snap.data() as ChefBookingRequest;
    const chosenApplicant = current.applicants?.find(a => a.id === applicantId);
    if (!chosenApplicant) return;

    const updatedApplicants = current.applicants?.map(a => 
      a.id === applicantId ? { ...a, status: 'accepted' as const } : { ...a, status: 'declined' as const }
    );

    await updateDoc(bookingRef, {
      chefId: chosenApplicant.chefId,
      chefName: chosenApplicant.chefName,
      chefAvatar: chosenApplicant.chefAvatar,
      status: 'confirmed',
      applicants: updatedApplicants,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error accepting chef application in Firestore:', error);
    throw error;
  }
}

/**
 * Escuchador reactivo en tiempo real de todas las reservas de la plataforma
 */
export function subscribeToBookings(
  callback: (bookings: ChefBookingRequest[]) => void
): () => void {
  const bookingsCol = collection(db, 'bookings');
  const q = query(bookingsCol, orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snap) => {
    const bookings = snap.docs.map(d => d.data() as ChefBookingRequest);
    callback(bookings);
  }, (err) => {
    console.warn('Bookings subscription error:', err);
  });
}
