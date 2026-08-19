import React, { useState, useEffect } from 'react';
import { 
  auth, 
  onAuthStateChanged, 
  User, 
  db, 
  signOut as firebaseSignOut 
} from '../lib/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { 
  User as UserIcon, 
  ChefHat, 
  Users, 
  Check, 
  Flame, 
  Sparkles, 
  ShoppingBag, 
  Refrigerator, 
  Heart, 
  ShieldCheck, 
  Save, 
  LogOut, 
  Clock, 
  SlidersHorizontal,
  Calendar,
  AlertCircle,
  Plus,
  Trash2,
  CheckCircle2,
  Utensils,
  Wind,
  Box,
  Layers,
  Sparkle,
  Lock,
  Mail,
  Store,
  Info,
  FileText,
  Award,
  DollarSign,
  UtensilsCrossed,
  ArrowRight,
  Stamp
} from 'lucide-react';
import { KitchenEquipmentItem, KitchenProfile, ChefProfile } from '../types';
import { HouseholdMemoryCard } from '../components/HouseholdMemoryCard';
import { APPROVED_CHEFS } from '../lib/chefsData';
import { saveChefProfile } from '../services/chefService';

interface ProfileViewProps {
  onPeopleCountChange?: (count: number) => void;
  onNavigateToChefPortal?: () => void;
  onOpenChefOnboarding?: () => void;
}

const initialEquipmentCatalog: KitchenEquipmentItem[] = [
  {
    id: 'stove-burners',
    name: 'Placa de Cocción (Fuegos Simultáneos)',
    category: 'fuegos',
    description: 'Placa para ollas, cazuelas y sartenes funcionando en paralelo.',
    available: true,
    countOrCapacity: '4 fuegos activos',
    image: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=500&auto=format&fit=crop&q=80',
    brandOrNotes: 'Inducción rápida'
  },
  {
    id: 'oven-main',
    name: 'Horno Convencional / Multifunción',
    category: 'hornos_robots',
    description: 'Asados en bloque de verduras de raíz, pescados y carnes al mismo tiempo.',
    available: true,
    countOrCapacity: 'Bandeja grande',
    image: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=500&auto=format&fit=crop&q=80',
    brandOrNotes: 'Con ventilador'
  },
  {
    id: 'airfryer',
    name: 'Airfryer (Freidora de Aire)',
    category: 'hornos_robots',
    description: 'Cocción rápida y crujiente de guarniciones, pollo o verduras en 15 min.',
    available: true,
    countOrCapacity: '5.5 Litros',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500&auto=format&fit=crop&q=80',
    brandOrNotes: 'Freidora sin aceite'
  },
  {
    id: 'pressure-cooker',
    name: 'Olla Rápida / Exprés a Presión',
    category: 'utensilios',
    description: 'Reduce el tiempo de legumbres (lentejas, garbanzos) y estofados a 25 min.',
    available: true,
    countOrCapacity: '6 Litros',
    image: 'https://images.unsplash.com/photo-1544233726-9f1d2b27be8b?w=500&auto=format&fit=crop&q=80',
    brandOrNotes: 'Olla rápida supersegura'
  },
  {
    id: 'kitchen-robot',
    name: 'Robot de Cocina Multifunción',
    category: 'hornos_robots',
    description: 'Thermomix, Mambo o similar para cremas sedosas, sofritos y vaporeras.',
    available: false,
    countOrCapacity: 'Vaso 2.2L',
    image: 'https://images.unsplash.com/photo-1584990347449-39908cf6b48c?w=500&auto=format&fit=crop&q=80',
    brandOrNotes: 'Thermomix / Mambo'
  },
  {
    id: 'microwave',
    name: 'Microondas con Grill',
    category: 'hornos_robots',
    description: 'Descongelación controlada y regeneración uniforme de raciones.',
    available: true,
    countOrCapacity: '800W',
    image: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=500&auto=format&fit=crop&q=80',
    brandOrNotes: 'Con función grill'
  },
  {
    id: 'cast-iron-pot',
    name: 'Cazuela Alta / Cocotte de Hierro',
    category: 'utensilios',
    description: 'Guisos de cocción lenta y salsas reducidas con calor uniforme.',
    available: true,
    countOrCapacity: 'Cazuela 28cm',
    image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=500&auto=format&fit=crop&q=80',
    brandOrNotes: 'Hierro fundido / Acero'
  },
  {
    id: 'vacuum-sealer',
    name: 'Envasadora al Vacío',
    category: 'conservacion',
    description: 'Conserva carnes y guisos al vacío en nevera hasta 10 días frescos.',
    available: false,
    countOrCapacity: 'Bolsas herméticas',
    image: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=500&auto=format&fit=crop&q=80',
    brandOrNotes: 'Vacío doméstico'
  },
  {
    id: 'glass-containers',
    name: 'Set de Tuppers de Cristal Herméticos',
    category: 'conservacion',
    description: 'Recipientes de vidrio de borosilicato con válvula aptos para horno y congelador.',
    available: true,
    countOrCapacity: '12 recipientes',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=80',
    brandOrNotes: 'Vidrio borosilicato'
  },
  {
    id: 'hand-blender',
    name: 'Batidora de Brazo Potente',
    category: 'utensilios',
    description: 'Triturados finos de purés, gazpachos, emulsiones y vinagretas.',
    available: true,
    countOrCapacity: '1000W',
    image: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=500&auto=format&fit=crop&q=80',
    brandOrNotes: 'Cuchillas de titanio'
  }
];

const availableDietStyles = [
  'Mediterránea Equilibrada',
  'Alta en Proteína / Fitness',
  'Baja en Carbohidratos / Low Carb',
  'Vegetariana / Plant Based',
  'Vegana',
  'Comida Casera Tradicional',
  'Baja en Sodio / Cardiosaludable',
  'Antiinflamatoria'
];

const availableAllergies = [
  'Gluten / Celíaco',
  'Lactosa',
  'Frutos Secos',
  'Mariscos / Crustáceos',
  'Pescado',
  'Huevos',
  'Soja',
  'Legumbres'
];

const availableSupermarkets = [
  'Supermercados DIA',
  'Mercadona',
  'Carrefour',
  'Lidl',
  'Alcampo',
  'Eroski',
  'Aldi',
  'Mercado Local / Frutería'
];

export function ProfileView({ onPeopleCountChange, onNavigateToChefPortal, onOpenChefOnboarding }: ProfileViewProps) {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<'kitchen' | 'household' | 'shopping' | 'chef_contract' | 'account'>('kitchen');
  const [saving, setSaving] = useState(false);
  const [savedToast, setSavedToast] = useState(false);

  // Household state
  const [displayName, setDisplayName] = useState<string>('');
  const [peopleCount, setPeopleCount] = useState<number>(4);
  const [adultsCount, setAdultsCount] = useState<number>(2);
  const [kidsCount, setKidsCount] = useState<number>(2);
  const [selectedDiets, setSelectedDiets] = useState<string[]>(['Mediterránea Equilibrada']);
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
  const [customDiet, setCustomDiet] = useState('');

  // Kitchen Profile state
  const [stoveType, setStoveType] = useState<'induccion' | 'vitro' | 'gas' | 'mixta'>('induccion');
  const [burnersCount, setBurnersCount] = useState<number>(4);
  const [freezerDrawers, setFreezerDrawers] = useState<number>(3);
  const [tupperContainersCount, setTupperContainersCount] = useState<number>(12);
  const [equipmentList, setEquipmentList] = useState<KitchenEquipmentItem[]>(initialEquipmentCatalog);

  // Shopping & Schedule state
  const [preferredShoppingDay, setPreferredShoppingDay] = useState<string>('Sábado por la mañana');
  const [preferredBatchDay, setPreferredBatchDay] = useState<string>('Domingo por la mañana');
  const [selectedSupermarkets, setSelectedSupermarkets] = useState<string[]>(['Supermercados DIA', 'Mercado Local / Frutería']);

  // Professional Chef Verification & Contract State
  const [isVerifiedChef, setIsVerifiedChef] = useState<boolean>(false);
  const [chefTitle, setChefTitle] = useState<string>('Chef Especialista en Batch Cooking & Mediterránea');
  const [chefCity, setChefCity] = useState<string>('Madrid');
  const [chefZones, setChefZones] = useState<string>('Chamberí, Salamanca, Retiro, Pozuelo');
  const [chefBio, setChefBio] = useState<string>('Cocinero con formación en hostelería y pasión por la cocina saludable en hogares.');
  const [chefExperienceYears, setChefExperienceYears] = useState<number>(5);
  const [chefSchool, setChefSchool] = useState<string>('Escuela Superior de Hostelería');
  const [chefSanitaryCert, setChefSanitaryCert] = useState<string>('SAN-MAD-2025-9920');
  const [chefCookingRate, setChefCookingRate] = useState<number>(22);
  const [chefOffersShopping, setChefOffersShopping] = useState<boolean>(true);
  const [chefShoppingRate, setChefShoppingRate] = useState<number>(18);
  const [chefBringsTools, setChefBringsTools] = useState<boolean>(true);
  const [chefOffersAssistant, setChefOffersAssistant] = useState<boolean>(false);
  const [chefIncludesCleaning, setChefIncludesCleaning] = useState<boolean>(true);
  const [chefDni, setChefDni] = useState<string>('12345678Z');
  const [chefContractSigned, setChefContractSigned] = useState<boolean>(false);
  const [chefContractDate, setChefContractDate] = useState<string>('');

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setDisplayName(currentUser.displayName || currentUser.email?.split('@')[0] || '');
        try {
          const docRef = doc(db, 'users', currentUser.uid);
          const snap = await getDoc(docRef);
          if (snap.exists()) {
            const data = snap.data();
            if (data.displayName) setDisplayName(data.displayName);
            if (data.peopleCount) {
              setPeopleCount(data.peopleCount);
              setAdultsCount(Math.max(1, Math.round(data.peopleCount * 0.6)));
              setKidsCount(Math.max(0, data.peopleCount - Math.max(1, Math.round(data.peopleCount * 0.6))));
            }
            if (data.dietPreferences) setSelectedDiets(data.dietPreferences);
            if (data.allergies) setSelectedAllergies(data.allergies);
            if (data.isVerifiedChef) setIsVerifiedChef(data.isVerifiedChef);
            if (data.chefProfile) {
              const cp = data.chefProfile;
              if (cp.title) setChefTitle(cp.title);
              if (cp.city) setChefCity(cp.city);
              if (cp.zones) setChefZones(cp.zones);
              if (cp.bio) setChefBio(cp.bio);
              if (cp.yearsExperience) setChefExperienceYears(cp.yearsExperience);
              if (cp.school) setChefSchool(cp.school);
              if (cp.sanitaryCert) setChefSanitaryCert(cp.sanitaryCert);
              if (cp.cookingRate) setChefCookingRate(cp.cookingRate);
              if (cp.contractSigned) {
                setChefContractSigned(cp.contractSigned);
                setChefContractDate(cp.contractDate || '');
              }
            }
            if (data.kitchenProfile) {
              const kp = data.kitchenProfile;
              if (kp.stoveType) setStoveType(kp.stoveType);
              if (kp.burnersCount) setBurnersCount(kp.burnersCount);
              if (kp.freezerDrawersCount) setFreezerDrawers(kp.freezerDrawersCount);
              if (kp.glassContainersCount) setTupperContainersCount(kp.glassContainersCount);
              if (kp.equipmentList && Array.isArray(kp.equipmentList)) {
                setEquipmentList(kp.equipmentList);
              }
              if (kp.preferredShoppingDay) setPreferredShoppingDay(kp.preferredShoppingDay);
              if (kp.preferredBatchDay) setPreferredBatchDay(kp.preferredBatchDay);
              if (kp.preferredSupermarkets) setSelectedSupermarkets(kp.preferredSupermarkets);
            }
          }
        } catch (e) {
          console.error('Error loading user profile from Firestore:', e);
        }
      }
    });
    return () => unsub();
  }, []);

  const handleToggleEquipment = (id: string) => {
    setEquipmentList(prev => prev.map(item => 
      item.id === id ? { ...item, available: !item.available } : item
    ));
  };

  const toggleDiet = (diet: string) => {
    setSelectedDiets(prev => 
      prev.includes(diet) ? prev.filter(d => d !== diet) : [...prev, diet]
    );
  };

  const toggleAllergy = (allergy: string) => {
    setSelectedAllergies(prev => 
      prev.includes(allergy) ? prev.filter(a => a !== allergy) : [...prev, allergy]
    );
  };

  const toggleSupermarket = (supermarket: string) => {
    setSelectedSupermarkets(prev => 
      prev.includes(supermarket) ? prev.filter(s => s !== supermarket) : [...prev, supermarket]
    );
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    const totalPeople = adultsCount + kidsCount;
    setPeopleCount(totalPeople);
    if (onPeopleCountChange) onPeopleCountChange(totalPeople);

    const kitchenProfile: KitchenProfile = {
      stoveType,
      burnersCount,
      hasOven: equipmentList.find(e => e.id === 'oven-main')?.available ?? true,
      hasAirfryer: equipmentList.find(e => e.id === 'airfryer')?.available ?? true,
      hasPressureCooker: equipmentList.find(e => e.id === 'pressure-cooker')?.available ?? true,
      hasKitchenRobot: equipmentList.find(e => e.id === 'kitchen-robot')?.available ?? false,
      kitchenRobotModel: equipmentList.find(e => e.id === 'kitchen-robot')?.brandOrNotes,
      hasMicrowave: equipmentList.find(e => e.id === 'microwave')?.available ?? true,
      hasVacuumSealer: equipmentList.find(e => e.id === 'vacuum-sealer')?.available ?? false,
      glassContainersCount: tupperContainersCount,
      freezerDrawersCount: freezerDrawers,
      equipmentList,
      preferredShoppingDay,
      preferredBatchDay,
      preferredSupermarkets: selectedSupermarkets
    };

    if (user) {
      try {
        await setDoc(doc(db, 'users', user.uid), {
          displayName: displayName || user.displayName || user.email?.split('@')[0] || 'Cocinero',
          email: user.email,
          peopleCount: totalPeople,
          dietPreferences: selectedDiets,
          allergies: selectedAllergies,
          kitchenProfile,
          updatedAt: new Date().toISOString()
        }, { merge: true });
      } catch (err) {
        console.error('Error saving profile to Firestore:', err);
      }
    }

    setSaving(false);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  const handleSignChefContract = async () => {
    if (!chefDni.trim()) {
      alert('Por favor, indica tu DNI/NIE para formalizar el contrato.');
      return;
    }
    if (!chefSanitaryCert.trim()) {
      alert('Es obligatorio indicar el identificador de tu Certificado de Manipulador de Alimentos.');
      return;
    }

    setSaving(true);
    const dateNow = new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' });
    setChefContractSigned(true);
    setChefContractDate(dateNow);
    setIsVerifiedChef(true);

    // Register into Firestore /chefs
    const newChef: ChefProfile = {
      id: `chef-${user?.uid || Date.now()}`,
      email: user?.email || '',
      name: displayName || user?.displayName || 'Chef TouChef',
      slug: (displayName || 'chef').toLowerCase().replace(/\s+/g, '-'),
      title: chefTitle,
      avatar: user?.photoURL || 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&auto=format&fit=crop&q=80',
      bio: chefBio,
      rating: 5.0,
      reviewsCount: 0,
      completedBookingsCount: 0,
      locationCity: `${chefCity} (${chefZones})`,
      zones: chefZones.split(',').map(z => z.trim()),
      isVerified: true,
      yearsExperience: chefExperienceYears,
      specialties: ['Batch Cooking', 'Mediterránea Tradicional (Carmen)', 'Saludable'],
      pricing: {
        cookingHourRate: chefCookingRate,
        groceryShoppingHourRate: chefShoppingRate,
        assistantHourRate: 15,
        travelFee: 5,
        travelRadiusKm: 15,
        toolsIncluded: chefBringsTools,
        toolsExtraFee: 0,
        cleaningIncluded: chefIncludesCleaning,
        cleaningHourRate: 0
      },
      availabilityDays: ['Lunes', 'Miércoles', 'Viernes', 'Domingos'],
      timeSlots: ['Mañanas (09:00 - 14:00)', 'Tardes (16:00 - 21:00)'],
      badges: ['Chef Verificado', 'Higiene Certificada', 'Superhost'],
      hasFoodHandlerCertificate: true,
      foodHandlerCertificateNumber: chefSanitaryCert,
      allergenManagementCertified: true,
      haccpCompliance: true,
      featuredDishes: [],
      reviews: []
    };

    APPROVED_CHEFS.unshift(newChef);

    try {
      await saveChefProfile(newChef);
    } catch (e) {
      console.warn('Firestore chef save error in ProfileView:', e);
    }

    if (user) {
      try {
        await setDoc(doc(db, 'users', user.uid), {
          isVerifiedChef: true,
          chefProfile: {
            title: chefTitle,
            city: chefCity,
            zones: chefZones,
            bio: chefBio,
            yearsExperience: chefExperienceYears,
            school: chefSchool,
            sanitaryCert: chefSanitaryCert,
            cookingRate: chefCookingRate,
            shoppingRate: chefShoppingRate,
            contractSigned: true,
            contractDate: dateNow,
            dni: chefDni
          }
        }, { merge: true });
      } catch (err) {
        console.error('Error saving chef contract in Firestore:', err);
      }
    }

    setSaving(false);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  const handleLogout = async () => {
    try {
      await firebaseSignOut(auth);
      window.location.reload();
    } catch (e) {
      console.error('Logout error:', e);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-16 text-zinc-900 dark:text-zinc-100 max-w-5xl mx-auto">
      
      {/* TABS & ACTIONS HEADER (ULTRA-COMPACT SINGLE ROW) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-zinc-200 dark:border-zinc-800">
        
        {/* Tabs Switcher */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 hide-scrollbar">
          {[
            { id: 'kitchen' as const, label: '🍳 Mi Cocina & Equipamiento' },
            { id: 'household' as const, label: '👨‍👩‍👧‍👦 Hogar & Comensales' },
            { id: 'shopping' as const, label: '🛒 Supermercados & Hábitos' },
            { id: 'account' as const, label: '👤 Mi Cuenta & Seguridad' },
            ...(isVerifiedChef ? [{ id: 'chef_contract' as const, label: '📜 Mi Contrato de Chef' }] : [])
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === t.id
                  ? 'btn-hero-copper text-white shadow-xs'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Action Buttons: Guardar Cambios + Cerrar Sesión */}
        <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
          <button
            onClick={handleSaveProfile}
            disabled={saving}
            className="btn-hero-copper text-white text-xs font-black px-4 py-2 rounded-xl shadow-xs transition-all flex items-center gap-1.5 active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            {saving ? <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save size={14} />}
            <span>{saving ? 'Guardando...' : 'Guardar Cambios'}</span>
          </button>

          {user && (
            <button
              onClick={handleLogout}
              className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-rose-500/15 text-zinc-600 dark:text-zinc-400 hover:text-rose-600 dark:hover:text-rose-400 border border-zinc-200 dark:border-zinc-700 transition-all active:scale-95 text-xs font-bold flex items-center justify-center cursor-pointer"
              title="Cerrar Sesión"
            >
              <LogOut size={14} />
            </button>
          )}
        </div>

      </div>

      {savedToast && (
        <div className="p-3 bg-emerald-500/15 border border-emerald-500/30 rounded-xl text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 size={16} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>¡Configuración y datos del hogar guardados correctamente!</span>
        </div>
      )}

      {/* TAB 1: MI COCINA & EQUIPAMIENTO */}
      {activeTab === 'kitchen' && (
        <div className="space-y-6">
          <HouseholdMemoryCard />

          <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
              <div>
                <h3 className="font-bold text-sm text-zinc-900 dark:text-white">Inventario de Electrodomésticos y Menaje</h3>
                <p className="text-xs text-zinc-500">Selecciona el equipamiento disponible para que la IA y tus chefs coordinen recetas compatibles.</p>
              </div>
              <span className="text-xs font-mono font-bold text-[#E07A5F]">
                {equipmentList.filter(e => e.available).length} disponibles
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {equipmentList.map(item => (
                <div
                  key={item.id}
                  onClick={() => handleToggleEquipment(item.id)}
                  className={`p-3.5 rounded-2xl border transition-all flex items-start gap-3 cursor-pointer select-none ${
                    item.available
                      ? 'bg-zinc-50 dark:bg-zinc-800/80 border-[#E07A5F]/40 shadow-xs'
                      : 'bg-zinc-50/40 dark:bg-zinc-800/40 border-zinc-200 dark:border-zinc-800 opacity-60'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 ${
                    item.available 
                      ? 'bg-[#E07A5F] border-[#E07A5F] text-white' 
                      : 'border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-700'
                  }`}>
                    {item.available && <Check size={14} strokeWidth={3} />}
                  </div>

                  <div className="min-w-0 flex-1 space-y-1">
                    <strong className="text-xs font-bold text-zinc-900 dark:text-white block leading-snug">
                      {item.name}
                    </strong>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: HOGAR & COMENSALES */}
      {activeTab === 'household' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-xs space-y-5">
            <h3 className="font-bold text-sm text-zinc-900 dark:text-white pb-3 border-b border-zinc-100 dark:border-zinc-800">
              Dimensiones del Hogar & Comensales
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-zinc-50 dark:bg-zinc-800/60 rounded-2xl border border-zinc-200 dark:border-zinc-700 space-y-2">
                <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block">Adultos en casa:</span>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setAdultsCount(Math.max(1, adultsCount - 1))}
                    className="w-8 h-8 rounded-xl bg-white dark:bg-zinc-700 border border-zinc-200 dark:border-zinc-600 font-bold"
                  >-</button>
                  <span className="text-lg font-black font-mono">{adultsCount}</span>
                  <button 
                    onClick={() => setAdultsCount(adultsCount + 1)}
                    className="w-8 h-8 rounded-xl bg-white dark:bg-zinc-700 border border-zinc-200 dark:border-zinc-600 font-bold"
                  >+</button>
                </div>
              </div>

              <div className="p-4 bg-zinc-50 dark:bg-zinc-800/60 rounded-2xl border border-zinc-200 dark:border-zinc-700 space-y-2">
                <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block">Niños / Raciones infantiles:</span>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setKidsCount(Math.max(0, kidsCount - 1))}
                    className="w-8 h-8 rounded-xl bg-white dark:bg-zinc-700 border border-zinc-200 dark:border-zinc-600 font-bold"
                  >-</button>
                  <span className="text-lg font-black font-mono">{kidsCount}</span>
                  <button 
                    onClick={() => setKidsCount(kidsCount + 1)}
                    className="w-8 h-8 rounded-xl bg-white dark:bg-zinc-700 border border-zinc-200 dark:border-zinc-600 font-bold"
                  >+</button>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block">
                Estilos de Alimentación Preferidos:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {availableDietStyles.map(diet => (
                  <button
                    key={diet}
                    onClick={() => toggleDiet(diet)}
                    className={`p-2.5 rounded-xl border text-xs text-left transition-all cursor-pointer ${
                      selectedDiets.includes(diet)
                        ? 'bg-[#E07A5F]/15 border-[#E07A5F] text-zinc-900 dark:text-white font-bold'
                        : 'bg-zinc-50 dark:bg-zinc-800/40 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400'
                    }`}
                  >
                    {selectedDiets.includes(diet) ? `✓ ${diet}` : diet}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block">
                Alérgenos e Intolerancias a Evitar:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {availableAllergies.map(allergy => (
                  <button
                    key={allergy}
                    onClick={() => toggleAllergy(allergy)}
                    className={`p-2.5 rounded-xl border text-xs text-left transition-all cursor-pointer ${
                      selectedAllergies.includes(allergy)
                        ? 'bg-rose-500/15 border-rose-500 text-rose-600 dark:text-rose-400 font-bold'
                        : 'bg-zinc-50 dark:bg-zinc-800/40 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400'
                    }`}
                  >
                    {selectedAllergies.includes(allergy) ? `⚠️ ${allergy}` : allergy}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SUPERMERCADOS & HÁBITOS */}
      {activeTab === 'shopping' && (
        <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-xs space-y-5">
          <h3 className="font-bold text-sm text-zinc-900 dark:text-white pb-3 border-b border-zinc-100 dark:border-zinc-800">
            Supermercados Habituales & Días de Rutina
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block mb-1">Día Habitual de Compra:</label>
              <input
                type="text"
                value={preferredShoppingDay}
                onChange={(e) => setPreferredShoppingDay(e.target.value)}
                placeholder="Ej. Sábado por la mañana"
                className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl p-2.5 text-xs text-zinc-900 dark:text-white"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block mb-1">Día Habitual de Batch Cooking / Cocinero:</label>
              <input
                type="text"
                value={preferredBatchDay}
                onChange={(e) => setPreferredBatchDay(e.target.value)}
                placeholder="Ej. Domingo por la tarde"
                className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl p-2.5 text-xs text-zinc-900 dark:text-white"
              />
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block">Supermercados de Confianza:</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {availableSupermarkets.map(sm => (
                <button
                  key={sm}
                  onClick={() => toggleSupermarket(sm)}
                  className={`p-2.5 rounded-xl border text-xs text-left transition-all cursor-pointer ${
                    selectedSupermarkets.includes(sm)
                      ? 'bg-rose-500/15 border-rose-500 text-zinc-900 dark:text-white font-bold'
                      : 'bg-zinc-50 dark:bg-zinc-800/40 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400'
                  }`}
                >
                  {selectedSupermarkets.includes(sm) ? `✓ ${sm}` : sm}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: MODO COCINERO & FIRMA DE CONTRATO */}
      {activeTab === 'chef_contract' && (
        <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-xs space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800 gap-3">
            <div>
              <div className="flex items-center gap-2">
                <ChefHat className="text-amber-500" size={20} />
                <h3 className="font-bold text-sm text-zinc-900 dark:text-white">
                  Verificación de Cocinero Profesional & Contrato
                </h3>
              </div>
              <p className="text-xs text-zinc-500 mt-0.5">
                Completa tus datos profesionales, tarifas y firma el contrato mercantil para cocinar en hogares.
              </p>
            </div>

            {isVerifiedChef && (
              <span className="px-3 py-1 bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 rounded-full text-xs font-black flex items-center gap-1.5 self-start sm:self-center">
                <ShieldCheck size={14} /> Contrato Activo y Verificado
              </span>
            )}
          </div>

          {/* Form fields */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block mb-1">Título Profesional</label>
                <input
                  type="text"
                  value={chefTitle}
                  onChange={(e) => setChefTitle(e.target.value)}
                  className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl p-2.5 text-xs text-zinc-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block mb-1">DNI / NIE del Titular *</label>
                <input
                  type="text"
                  value={chefDni}
                  onChange={(e) => setChefDni(e.target.value)}
                  placeholder="12345678X"
                  className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl p-2.5 text-xs text-zinc-900 dark:text-white font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block mb-1">Ciudad de Cobertura</label>
                <input
                  type="text"
                  value={chefCity}
                  onChange={(e) => setChefCity(e.target.value)}
                  className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl p-2.5 text-xs text-zinc-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block mb-1">Nº Registro Manipulador Sanitario *</label>
                <input
                  type="text"
                  value={chefSanitaryCert}
                  onChange={(e) => setChefSanitaryCert(e.target.value)}
                  className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl p-2.5 text-xs text-zinc-900 dark:text-white font-mono"
                />
              </div>
            </div>

            {/* Rates */}
            <div className="p-4 bg-zinc-50 dark:bg-zinc-800/60 rounded-2xl border border-zinc-200 dark:border-zinc-700 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block mb-1">Tarifa Cocina / h:</label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min={18}
                    max={40}
                    value={chefCookingRate}
                    onChange={(e) => setChefCookingRate(Number(e.target.value))}
                    className="accent-amber-500 flex-1"
                  />
                  <span className="font-mono font-bold text-amber-500 text-sm">{chefCookingRate} €/h</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block mb-1">Tarifa Compra DIA / h:</label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min={12}
                    max={25}
                    value={chefShoppingRate}
                    onChange={(e) => setChefShoppingRate(Number(e.target.value))}
                    className="accent-amber-500 flex-1"
                  />
                  <span className="font-mono font-bold text-zinc-700 dark:text-zinc-300 text-sm">{chefShoppingRate} €/h</span>
                </div>
              </div>

              <div className="space-y-1.5 pt-1">
                <label className="flex items-center gap-2 text-xs text-zinc-700 dark:text-zinc-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={chefBringsTools}
                    onChange={(e) => setChefBringsTools(e.target.checked)}
                    className="w-4 h-4 accent-amber-500 rounded"
                  />
                  <span>Lleva cuchillos propios</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-zinc-700 dark:text-zinc-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={chefIncludesCleaning}
                    onChange={(e) => setChefIncludesCleaning(e.target.checked)}
                    className="w-4 h-4 accent-emerald-500 rounded"
                  />
                  <span>Incluye limpieza de cocina</span>
                </label>
              </div>
            </div>

            {/* CONTRACT DOCUMENT VIEWER */}
            <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="text-amber-500" size={18} />
                  <strong className="text-xs font-bold text-zinc-900 dark:text-white">
                    Contrato Marco de Colaboración de Cocineros TouChef
                  </strong>
                </div>
                <span className="text-[10px] bg-amber-500/20 text-amber-600 dark:text-amber-300 px-2 py-0.5 rounded-full font-mono">
                  VERSIÓN 2026-ESP
                </span>
              </div>

              <div className="p-3 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 text-[11px] text-zinc-600 dark:text-zinc-400 space-y-2 max-h-36 overflow-y-auto leading-relaxed">
                <p>
                  <strong>CLÁUSULA 1: OBJETO Y PRESTACIÓN.</strong> El profesional independiente se compromete a prestar servicios de cocinado y preparación de menús batch cooking en los domicilios particulares concertados a través de TouChef.
                </p>
                <p>
                  <strong>CLÁUSULA 2: CUMPLIMIENTO SANITARIO.</strong> El cocinero declara formalmente estar en posesión del Certificado de Manipulador de Alimentos en vigor, cumpliendo con la normativa higiénico-sanitaria vigente en España.
                </p>
                <p>
                  <strong>CLÁUSULA 3: LIQUIDACIÓN Y FONDOS.</strong> Los cobros se liquidarán una vez completados satisfactoriamente los 5 hitos del servicio según las tarifas estipuladas ({chefCookingRate} €/h).
                </p>
              </div>

              {chefContractSigned ? (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs text-emerald-600 dark:text-emerald-400 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} />
                    <span>Contrato formalizado digitalmente por <strong>{displayName || 'Usuario'}</strong> (DNI: {chefDni}) el {chefContractDate || 'recientemente'}.</span>
                  </div>
                  {onNavigateToChefPortal && (
                    <button
                      onClick={onNavigateToChefPortal}
                      className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-lg text-xs transition-all cursor-pointer shrink-0"
                    >
                      Ir al Portal Pro
                    </button>
                  )}
                </div>
              ) : (
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <span className="text-[11px] text-zinc-500">
                    Al firmar, el sistema te autoriza y publica tu perfil en el directorio oficial.
                  </span>
                  <button
                    onClick={handleSignChefContract}
                    disabled={saving}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-black text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-95"
                  >
                    <Stamp size={16} />
                    <span>Firmar Contrato y Autorizar Perfil</span>
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>
      )}

      {/* TAB 4: MI CUENTA & SEGURIDAD */}
      {activeTab === 'account' && (
        <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-100 dark:border-zinc-800">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-[#E07A5F] text-white flex items-center justify-center font-black text-lg shadow-sm shrink-0 overflow-hidden">
                  {user?.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName || 'Avatar'} className="w-full h-full object-cover" />
                  ) : (
                    <UserIcon size={26} />
                  )}
                </div>
                <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#E07A5F] border-2 border-white dark:border-zinc-900 flex items-center justify-center text-[8px] text-white font-bold">
                  ✓
                </span>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <strong className="text-base font-black text-zinc-900 dark:text-white">
                    {displayName || 'Usuario TouChef'}
                  </strong>
                  {isVerifiedChef ? (
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-300 border border-amber-500/30 uppercase tracking-wider flex items-center gap-1">
                      <Award size={11} /> Chef Homologado
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                      Cliente del Hogar
                    </span>
                  )}
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                  {user ? user.email : 'Modo Local / Invitado'} • Sincronización en la Nube
                </p>
              </div>
            </div>

            <div>
              {isVerifiedChef ? (
                <button
                  type="button"
                  onClick={onNavigateToChefPortal}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-300 hover:bg-amber-500/25 border border-amber-500/30 text-xs font-bold transition-all cursor-pointer shadow-xs"
                >
                  <Award size={14} className="text-amber-500" />
                  <span>Portal de Cocinero Pro →</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    if (onOpenChefOnboarding) {
                      onOpenChefOnboarding();
                    } else {
                      setActiveTab('chef_contract');
                    }
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 text-xs font-bold transition-all cursor-pointer shadow-xs group"
                >
                  <ChefHat size={14} className="text-amber-500 group-hover:rotate-12 transition-transform" />
                  <span>¿Quieres cocinar en hogares? Conviértete en Cocinero →</span>
                </button>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-400">Datos Personales &amp; Acceso</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block mb-1">Nombre Mostrado:</label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Tu nombre"
                  className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl p-2.5 text-xs text-zinc-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block mb-1">Email Vinculado:</label>
                <input
                  type="email"
                  disabled
                  value={user?.email || 'modo_invitado@touchef.local'}
                  className="w-full bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl p-2.5 text-xs text-zinc-500 cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
            <div>
              <strong className="text-xs text-zinc-900 dark:text-white block">Cerrar Sesión Activa</strong>
              <span className="text-[11px] text-zinc-500">Desvincula este dispositivo y regresa a la portada.</span>
            </div>

            {user ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
              >
                <LogOut size={14} />
                <span>Cerrar Sesión</span>
              </button>
            ) : (
              <span className="text-xs text-zinc-400">Modo local / No autenticado</span>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
