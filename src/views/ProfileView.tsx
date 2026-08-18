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
  Sparkle
} from 'lucide-react';
import { KitchenEquipmentItem, KitchenProfile } from '../types';

interface ProfileViewProps {
  onPeopleCountChange?: (count: number) => void;
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
  'Mercadona',
  'Carrefour',
  'Lidl',
  'Día',
  'Alcampo',
  'Eroski',
  'Aldi',
  'Mercado Local / Frutería'
];

export function ProfileView({ onPeopleCountChange }: ProfileViewProps) {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<'household' | 'kitchen' | 'shopping' | 'account'>('kitchen');
  const [saving, setSaving] = useState(false);
  const [savedToast, setSavedToast] = useState(false);

  // Household state
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
  const [selectedSupermarkets, setSelectedSupermarkets] = useState<string[]>(['Mercadona', 'Mercado Local / Frutería']);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const docRef = doc(db, 'users', currentUser.uid);
          const snap = await getDoc(docRef);
          if (snap.exists()) {
            const data = snap.data();
            if (data.peopleCount) {
              setPeopleCount(data.peopleCount);
              setAdultsCount(Math.max(1, Math.round(data.peopleCount * 0.6)));
              setKidsCount(Math.max(0, data.peopleCount - Math.max(1, Math.round(data.peopleCount * 0.6))));
            }
            if (data.dietPreferences) setSelectedDiets(data.dietPreferences);
            if (data.allergies) setSelectedAllergies(data.allergies);
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

  const handleUpdateEquipmentNotes = (id: string, notes: string) => {
    setEquipmentList(prev => prev.map(item => 
      item.id === id ? { ...item, brandOrNotes: notes } : item
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

  const handleAddCustomDiet = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customDiet.trim()) return;
    if (!selectedDiets.includes(customDiet.trim())) {
      setSelectedDiets([...selectedDiets, customDiet.trim()]);
    }
    setCustomDiet('');
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
          displayName: user.displayName || user.email?.split('@')[0] || 'Cocinero',
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

    // Save locally
    try {
      localStorage.setItem('touchef_kitchen_profile', JSON.stringify(kitchenProfile));
      localStorage.setItem('touchef_diet_prefs', JSON.stringify(selectedDiets));
    } catch (e) {
      console.error('Local save error', e);
    }

    setSaving(false);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  const handleLogout = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (e) {
      console.error('Logout error:', e);
    }
  };

  const availableEquipmentCount = equipmentList.filter(e => e.available).length;

  return (
    <div className="space-y-6 animate-fade-in pb-16 text-zinc-900 dark:text-zinc-100 max-w-5xl mx-auto">
      
      {/* COMMERCIAL USER HERO CARD */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-5 sm:p-7 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-[#E07A5F] text-white flex items-center justify-center font-black text-xl shadow-md shrink-0 overflow-hidden">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || 'Avatar'} className="w-full h-full object-cover" />
                ) : (
                  <ChefHat size={32} />
                )}
              </div>
              <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#E07A5F] border-2 border-white dark:border-zinc-900 flex items-center justify-center text-[10px] text-white">
                ✓
              </span>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl font-black text-zinc-900 dark:text-white leading-tight">
                  Mi Hogar & Equipamiento de Cocina
                </h1>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#E07A5F]/10 text-[#E07A5F] dark:text-[#F4A261] border border-[#E07A5F]/20 uppercase tracking-wider">
                  Configuración del Hogar
                </span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                {user ? `Cuenta vinculada: ${user.email}` : 'Modo local / Invitado'} • Sincronización en la Nube
              </p>
            </div>
          </div>


          <div className="flex items-center gap-2.5 self-end sm:self-center">
            <button
              onClick={handleSaveProfile}
              disabled={saving}
              className="btn-hero-copper text-white text-xs font-black px-5 py-2.5 rounded-xl shadow-sm transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save size={15} />}
              <span>{saving ? 'Guardando...' : 'Guardar Cambios'}</span>
            </button>

            {user && (
              <button
                onClick={handleLogout}
                className="p-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/20 transition-all active:scale-95 text-xs font-bold"
                title="Cerrar Sesión"
              >
                <LogOut size={16} />
              </button>
            )}
          </div>

        </div>

        {/* TOAST FEEDBACK */}
        {savedToast && (
          <div className="mt-4 p-3 bg-[#E07A5F]/10 border border-[#E07A5F]/30 rounded-2xl flex items-center gap-2 text-xs font-bold text-zinc-800 dark:text-zinc-200 animate-fade-in">
            <CheckCircle2 size={16} className="text-[#E07A5F] shrink-0" />
            <span>Perfil familiar y equipamiento de cocina guardados con éxito en Firestore.</span>
          </div>
        )}
      </div>

      {/* TABS SELECTOR */}
      <div className="flex border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-2xl p-1 shadow-xs overflow-x-auto hide-scrollbar">
        <button
          onClick={() => setActiveTab('kitchen')}
          className={`flex-1 min-w-[140px] py-2.5 px-3 text-center text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeTab === 'kitchen'
              ? 'bg-[#E07A5F] text-white shadow-xs'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
          }`}
        >
          <Flame size={15} />
          <span>Mi Cocina & Equipamiento ({availableEquipmentCount})</span>
        </button>

        <button
          onClick={() => setActiveTab('household')}
          className={`flex-1 min-w-[140px] py-2.5 px-3 text-center text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeTab === 'household'
              ? 'bg-[#E07A5F] text-white shadow-xs'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
          }`}
        >
          <Users size={15} />
          <span>Comensales & Dietas ({adultsCount + kidsCount}p)</span>
        </button>

        <button
          onClick={() => setActiveTab('shopping')}
          className={`flex-1 min-w-[140px] py-2.5 px-3 text-center text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeTab === 'shopping'
              ? 'bg-[#E07A5F] text-white shadow-xs'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
          }`}
        >
          <ShoppingBag size={15} />
          <span>Compras & Horarios</span>
        </button>
      </div>

      {/* TAB 1: MI COCINA & EQUIPAMIENTO CON FOTOS */}
      {activeTab === 'kitchen' && (
        <div className="space-y-6 animate-fade-in">
          
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-3.5 text-center shadow-xs">
              <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-bold block">Fuegos de Cocina</span>
              <div className="flex items-center justify-center gap-1 mt-1">
                {[2, 3, 4, 5].map(num => (
                  <button
                    key={num}
                    onClick={() => setBurnersCount(num)}
                    className={`w-7 h-7 rounded-lg text-xs font-black transition-all ${
                      burnersCount === num 
                        ? 'bg-[#E07A5F] text-white shadow-xs' 
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-3.5 text-center shadow-xs">
              <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-bold block">Tipo de Placa</span>
              <select
                value={stoveType}
                onChange={(e) => setStoveType(e.target.value as any)}
                className="mt-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white text-xs font-bold py-1 px-2 rounded-lg border border-zinc-200 dark:border-zinc-700 outline-none w-full text-center"
              >
                <option value="induccion">⚡ Inducción</option>
                <option value="vitro">🔥 Vitrocerámica</option>
                <option value="gas">🔵 Gas</option>
                <option value="mixta">🔄 Mixta</option>
              </select>
            </div>

            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-3.5 text-center shadow-xs">
              <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-bold block">Cajones Congelador</span>
              <div className="flex items-center justify-center gap-1 mt-1">
                {[1, 2, 3, 4].map(num => (
                  <button
                    key={num}
                    onClick={() => setFreezerDrawers(num)}
                    className={`w-7 h-7 rounded-lg text-xs font-black transition-all ${
                      freezerDrawers === num 
                        ? 'bg-[#E07A5F] text-white shadow-xs' 
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-3.5 text-center shadow-xs">
              <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-bold block">Tuppers de Cristal</span>
              <div className="flex items-center justify-center gap-2 mt-1">
                <input
                  type="number"
                  min={2}
                  max={40}
                  value={tupperContainersCount}
                  onChange={(e) => setTupperContainersCount(Number(e.target.value))}
                  className="w-14 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white text-xs font-black py-1 rounded-lg border border-zinc-200 dark:border-zinc-700 text-center outline-none"
                />
                <span className="text-xs text-zinc-400 font-bold">uds.</span>
              </div>
            </div>
          </div>

          {/* Explanation Callout */}
          <div className="p-4 bg-[#E07A5F]/10 border border-[#E07A5F]/20 rounded-2xl flex items-start gap-3 text-xs text-zinc-800 dark:text-zinc-200">
            <Sparkles size={18} className="text-[#E07A5F] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Optimización del Algoritmo Batch:</strong> La IA cruzará este perfil con tus menús para calcular la distribución exacta de fuegos simultáneos. Si desactivas un equipo (ej. olla exprés o robot), el planificador nunca te pedirá recetas que lo requieran.
            </p>
          </div>

          {/* Equipment Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {equipmentList.map((item) => (
              <div 
                key={item.id}
                className={`rounded-3xl border p-4 sm:p-5 flex flex-col justify-between gap-4 transition-all ${
                  item.available 
                    ? 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-xs' 
                    : 'bg-zinc-50 dark:bg-zinc-900/40 border-zinc-200 dark:border-zinc-800/60 opacity-60'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 relative">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover" 
                    />
                    {item.available && (
                      <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#E07A5F] text-white flex items-center justify-center text-[9px] font-black shadow-xs">
                        ✓
                      </span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="text-xs sm:text-sm font-black text-zinc-900 dark:text-white leading-tight">
                        {item.name}
                      </h4>
                    </div>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                    {item.countOrCapacity && (
                      <span className="inline-block text-[10px] font-bold text-[#E07A5F] dark:text-[#F4A261] bg-[#E07A5F]/10 px-2 py-0.5 rounded-md mt-1.5">
                        {item.countOrCapacity}
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Toggle & Model notes */}
                <div className="flex items-center justify-between gap-2 pt-3 border-t border-zinc-100 dark:border-zinc-800/80">
                  <input
                    type="text"
                    value={item.brandOrNotes || ''}
                    onChange={(e) => handleUpdateEquipmentNotes(item.id, e.target.value)}
                    placeholder="Modelo / Marca (ej. Cosori 5.5L)"
                    className="flex-1 bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-xl px-2.5 py-1.5 text-xs text-zinc-900 dark:text-white outline-none focus:border-[#E07A5F]"
                  />

                  <button
                    onClick={() => handleToggleEquipment(item.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 active:scale-95 cursor-pointer ${
                      item.available 
                        ? 'bg-[#E07A5F] text-white shadow-xs' 
                        : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                    }`}
                  >
                    {item.available ? '✅ En mi cocina' : '❌ No disponible'}
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      )}

      {/* TAB 2: COMENSALES & DIETAS */}
      {activeTab === 'household' && (
        <div className="space-y-6 animate-fade-in">
          
          {/* Family Composition Card */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-xs space-y-5">
            <div>
              <h3 className="text-sm font-black text-zinc-900 dark:text-white flex items-center gap-2">
                <Users className="text-[#E07A5F]" size={18} />
                <span>Composición del Hogar</span>
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                Define cuántas raciones base se cocinan en cada tanda
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-zinc-50 dark:bg-zinc-800/40 rounded-2xl border border-zinc-200 dark:border-zinc-700/60 text-center space-y-2">
                <span className="text-xs font-bold text-zinc-600 dark:text-zinc-400 block">Adultos</span>
                <div className="flex items-center justify-center gap-3">
                  <button 
                    onClick={() => setAdultsCount(Math.max(1, adultsCount - 1))}
                    className="w-8 h-8 rounded-xl bg-zinc-200 dark:bg-zinc-700 font-black text-sm text-zinc-800 dark:text-zinc-200 active:scale-90"
                  >-</button>
                  <span className="text-xl font-black text-zinc-900 dark:text-white">{adultsCount}</span>
                  <button 
                    onClick={() => setAdultsCount(adultsCount + 1)}
                    className="w-8 h-8 rounded-xl bg-zinc-200 dark:bg-zinc-700 font-black text-sm text-zinc-800 dark:text-zinc-200 active:scale-90"
                  >+</button>
                </div>
              </div>

              <div className="p-4 bg-zinc-50 dark:bg-zinc-800/40 rounded-2xl border border-zinc-200 dark:border-zinc-700/60 text-center space-y-2">
                <span className="text-xs font-bold text-zinc-600 dark:text-zinc-400 block">Niños / Raciones Pequeñas</span>
                <div className="flex items-center justify-center gap-3">
                  <button 
                    onClick={() => setKidsCount(Math.max(0, kidsCount - 1))}
                    className="w-8 h-8 rounded-xl bg-zinc-200 dark:bg-zinc-700 font-black text-sm text-zinc-800 dark:text-zinc-200 active:scale-90"
                  >-</button>
                  <span className="text-xl font-black text-zinc-900 dark:text-white">{kidsCount}</span>
                  <button 
                    onClick={() => setKidsCount(kidsCount + 1)}
                    className="w-8 h-8 rounded-xl bg-zinc-200 dark:bg-zinc-700 font-black text-sm text-zinc-800 dark:text-zinc-200 active:scale-90"
                  >+</button>
                </div>
              </div>

              <div className="p-4 bg-[#E07A5F]/10 rounded-2xl border border-[#E07A5F]/30 text-center flex flex-col justify-center">
                <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 block">Total Comensales</span>
                <span className="text-2xl font-black text-[#E07A5F] dark:text-[#F4A261] mt-1">
                  {adultsCount + kidsCount} personas
                </span>
              </div>
            </div>
          </div>

          {/* Diet Preferences Card */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-xs space-y-4">
            <div>
              <h3 className="text-sm font-black text-zinc-900 dark:text-white flex items-center gap-2">
                <Heart className="text-[#E07A5F]" size={18} />
                <span>Estilo Dietético & Preferencias</span>
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                Selecciona los patrones de alimentación para tus menús
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {availableDietStyles.map((diet) => {
                const isSelected = selectedDiets.includes(diet);
                return (
                  <button
                    key={diet}
                    onClick={() => toggleDiet(diet)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer ${
                      isSelected
                        ? 'bg-[#E07A5F] text-white shadow-xs'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                    }`}
                  >
                    {isSelected && <Check size={13} />}
                    <span>{diet}</span>
                  </button>
                );
              })}
            </div>

            <form onSubmit={handleAddCustomDiet} className="flex gap-2 pt-2">
              <input
                type="text"
                value={customDiet}
                onChange={(e) => setCustomDiet(e.target.value)}
                placeholder="Añadir otra preferencia (ej: Sin picante, Alto en fibra)..."
                className="flex-1 bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3.5 py-2 text-xs text-zinc-900 dark:text-white outline-none focus:border-[#E07A5F]"
              />
              <button
                type="submit"
                className="bg-zinc-200 dark:bg-zinc-700 hover:bg-[#E07A5F] hover:text-white text-zinc-800 dark:text-zinc-200 text-xs font-bold px-4 py-2 rounded-xl transition-colors"
              >
                Añadir
              </button>
            </form>
          </div>

          {/* Allergies & Intolerances */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-xs space-y-4">
            <div>
              <h3 className="text-sm font-black text-zinc-900 dark:text-white flex items-center gap-2">
                <AlertCircle className="text-rose-500" size={18} />
                <span>Alergias & Restricciones Médicas</span>
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                Ingredientes que nunca deben incluirse en las recetas
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {availableAllergies.map((allergy) => {
                const isSelected = selectedAllergies.includes(allergy);
                return (
                  <button
                    key={allergy}
                    onClick={() => toggleAllergy(allergy)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer ${
                      isSelected
                        ? 'bg-rose-600 text-white shadow-xs'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                    }`}
                  >
                    {isSelected && <Check size={13} />}
                    <span>{allergy}</span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      )}

      {/* TAB 3: COMPRAS & HORARIOS */}
      {activeTab === 'shopping' && (
        <div className="space-y-6 animate-fade-in">
          
          <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-xs space-y-5">
            <div>
              <h3 className="text-sm font-black text-zinc-900 dark:text-white flex items-center gap-2">
                <Calendar className="text-[#E07A5F]" size={18} />
                <span>Rutinas Semanales de Batch Cooking</span>
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                Configura tus días favoritos para comprar y cocinar
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-zinc-50 dark:bg-zinc-800/40 rounded-2xl border border-zinc-200 dark:border-zinc-700/60 space-y-2">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block">
                  Día Habitual de Compra
                </label>
                <select
                  value={preferredShoppingDay}
                  onChange={(e) => setPreferredShoppingDay(e.target.value)}
                  className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl p-2.5 text-xs font-bold text-zinc-900 dark:text-white outline-none"
                >
                  <option>Viernes por la tarde</option>
                  <option>Sábado por la mañana</option>
                  <option>Sábado por la tarde</option>
                  <option>Domingo por la mañana</option>
                  <option>Lunes por la mañana</option>
                </select>
              </div>

              <div className="p-4 bg-zinc-50 dark:bg-zinc-800/40 rounded-2xl border border-zinc-200 dark:border-zinc-700/60 space-y-2">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block">
                  Día Habitual de Cocinado Simultáneo
                </label>
                <select
                  value={preferredBatchDay}
                  onChange={(e) => setPreferredBatchDay(e.target.value)}
                  className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl p-2.5 text-xs font-bold text-zinc-900 dark:text-white outline-none"
                >
                  <option>Domingo por la mañana (Recomendado)</option>
                  <option>Domingo por la tarde</option>
                  <option>Sábado por la mañana</option>
                  <option>Lunes por la tarde</option>
                </select>
              </div>
            </div>
          </div>

          {/* Supermarkets Card */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-xs space-y-4">
            <div>
              <h3 className="text-sm font-black text-zinc-900 dark:text-white flex items-center gap-2">
                <ShoppingBag className="text-[#E07A5F]" size={18} />
                <span>Supermercados & Mercados Preferidos</span>
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                Para clasificar los ingredientes por pasillos según tus tiendas habituales
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {availableSupermarkets.map((store) => {
                const isSelected = selectedSupermarkets.includes(store);
                return (
                  <button
                    key={store}
                    onClick={() => toggleSupermarket(store)}
                    className={`p-3 rounded-2xl border text-xs font-bold transition-all text-center flex flex-col items-center justify-center gap-1 active:scale-95 cursor-pointer ${
                      isSelected
                        ? 'bg-[#E07A5F]/10 border-[#E07A5F] text-[#E07A5F] dark:text-[#F4A261] shadow-2xs'
                        : 'bg-zinc-50 dark:bg-zinc-800/40 border-zinc-200 dark:border-zinc-700/60 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300'
                    }`}
                  >
                    <span>{store}</span>
                    {isSelected && <span className="text-[10px] text-[#E07A5F]">✓ Preferido</span>}
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
