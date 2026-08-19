import React, { useState } from 'react';
import { 
  X, 
  ChefHat, 
  ShieldCheck, 
  MapPin, 
  Award, 
  DollarSign, 
  Check, 
  Sparkles, 
  Upload, 
  UtensilsCrossed, 
  Users, 
  Clock, 
  ShoppingBag, 
  CheckCircle2,
  AlertCircle,
  Camera,
  ArrowRight,
  FileText,
  FileCheck,
  Building2,
  CreditCard
} from 'lucide-react';
import { ChefProfile } from '../types';
import { APPROVED_CHEFS } from '../lib/chefsData';
import { auth, db } from '../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { saveChefProfile } from '../services/chefService';

interface ChefOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onChefRegistered: (newChef: ChefProfile) => void;
}

export function ChefOnboardingModal({ isOpen, onClose, onChefRegistered }: ChefOnboardingModalProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isComplete, setIsComplete] = useState<boolean>(false);

  // Form State - Step 1: Personal info & DNI
  const [name, setName] = useState<string>(auth.currentUser?.displayName || '');
  const [dni, setDni] = useState<string>('12345678Z');
  const [title, setTitle] = useState<string>('Chef Especialista en Batch Cooking & Mediterránea');
  const [email, setEmail] = useState<string>(auth.currentUser?.email || '');
  const [phone, setPhone] = useState<string>('+34 622 345 678');
  const [locationCity, setLocationCity] = useState<string>('Madrid');
  const [zones, setZones] = useState<string>('Chamberí, Salamanca, Retiro, Pozuelo');
  const [avatarUrl, setAvatarUrl] = useState<string>(
    auth.currentUser?.photoURL || 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&auto=format&fit=crop&q=80'
  );
  const [bio, setBio] = useState<string>('Cocinero profesional con más de 8 años de experiencia en cocina saludable y batch cooking semanal.');

  // Form State - Step 2: Experience & Document Vetting
  const [yearsExperience, setYearsExperience] = useState<number>(6);
  const [culinarySchool, setCulinarySchool] = useState<string>('Escuela Superior de Hostelería');
  const [specialties, setSpecialties] = useState<string[]>([
    'Batch Cooking',
    'Mediterránea',
    'Fitness High Protein'
  ]);
  const [hasFoodHandlerCert, setHasFoodHandlerCert] = useState<boolean>(true);
  const [certNumber, setCertNumber] = useState<string>('SAN-MAD-2025-9920');
  const [dniFileName, setDniFileName] = useState<string>('DNI_Anverso_Reverso.pdf');
  const [sanitaryFileName, setSanitaryFileName] = useState<string>('Certificado_Manipulador_Alimentos.pdf');
  const [diplomaFileName, setDiplomaFileName] = useState<string>('Titulo_Hosteleria.pdf');

  // Form State - Step 3: Rates & Services Breakdown
  const [cookingHourRate, setCookingHourRate] = useState<number>(24);
  const [offersGroceryShopping, setOffersGroceryShopping] = useState<boolean>(true);
  const [groceryShoppingRate, setGroceryShoppingRate] = useState<number>(18);
  const [bringsOwnTools, setBringsOwnTools] = useState<boolean>(true);
  const [toolsExtraFee, setToolsExtraFee] = useState<number>(0);
  const [offersAssistant, setOffersAssistant] = useState<boolean>(false);
  const [assistantRate, setAssistantRate] = useState<number>(14);
  const [includesCleaning, setIncludesCleaning] = useState<boolean>(true);
  const [travelRadiusKm, setTravelRadiusKm] = useState<number>(15);
  const [travelFee, setTravelFee] = useState<number>(5);

  // Form State - Step 4: Digital Mercantil Contract
  const [acceptedTerms, setAcceptedTerms] = useState<boolean>(true);
  const [contractSignature, setContractSignature] = useState<string>(auth.currentUser?.displayName || 'Chef Autorizado');

  if (!isOpen) return null;

  const availableSpecialtyOptions = [
    'Batch Cooking',
    'Mediterránea',
    'Fitness High Protein',
    'Sin Gluten (Celiaquía)',
    'Vegetariana / Plant Based',
    'Tradicional & Guisos',
    'Baja en Carbohidratos / Keto',
    'Cocina Infantil & Familiar'
  ];

  const toggleSpecialty = (sp: string) => {
    setSpecialties(prev => 
      prev.includes(sp) ? prev.filter(s => s !== sp) : [...prev, sp]
    );
  };

  const handleFileUpload = (type: 'dni' | 'sanitary' | 'diploma', e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const fileName = file.name;
      if (type === 'dni') setDniFileName(fileName);
      if (type === 'sanitary') setSanitaryFileName(fileName);
      if (type === 'diploma') setDiplomaFileName(fileName);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Por favor, indica tu nombre completo.');
      return;
    }
    if (!dni.trim()) {
      alert('Por favor, indica tu DNI/NIE para formalizar el expediente profesional.');
      return;
    }
    if (!hasFoodHandlerCert || !certNumber.trim()) {
      alert('Es obligatorio disponer del Certificado de Manipulador de Alimentos en regla para cocinar en hogares.');
      return;
    }

    setIsSubmitting(true);
    const dateNow = new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' });

    const newChef: ChefProfile = {
      id: `chef-${auth.currentUser?.uid || Date.now()}`,
      name: name.trim(),
      slug: name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, ''),
      title: title.trim(),
      avatar: avatarUrl,
      bio: bio.trim(),
      rating: 5.0,
      reviewsCount: 0,
      completedBookingsCount: 0,
      locationCity: `${locationCity} (${zones})`,
      zones: zones.split(',').map(z => z.trim()),
      isVerified: true,
      yearsExperience,
      specialties,
      pricing: {
        cookingHourRate,
        groceryShoppingHourRate: offersGroceryShopping ? groceryShoppingRate : 0,
        assistantHourRate: 15,
        travelFee: 5,
        travelRadiusKm: 15,
        toolsIncluded: bringsOwnTools,
        toolsExtraFee,
        cleaningIncluded: includesCleaning,
        cleaningHourRate: 0
      },
      availabilityDays: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábados'],
      timeSlots: ['Mañanas (09:00 - 14:00)', 'Tardes (16:00 - 21:00)'],
      badges: ['Chef Homologado', 'Manipulador Certificado', 'Contrato Firmado', 'Fondo Protegido'],
      hasFoodHandlerCertificate: true,
      foodHandlerCertificateNumber: certNumber.trim(),
      allergenManagementCertified: true,
      haccpCompliance: true,
      featuredDishes: [
        {
          name: 'Guiso Tradicional de Lentejas (Carmen)',
          image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=80',
          category: 'Legumbres',
          prepTime: '45 min'
        }
      ],
      reviews: []
    };

    // Update in memory list
    APPROVED_CHEFS.unshift(newChef);

    // Save to Firestore /chefs SSOT
    try {
      await saveChefProfile(newChef);
    } catch (e) {
      console.warn('Firestore chef save warning:', e);
    }

    // Persist to Firestore /users if user logged in
    if (auth.currentUser) {
      try {
        await setDoc(doc(db, 'users', auth.currentUser.uid), {
          isVerifiedChef: true,
          role: 'chef',
          chefStatus: 'verified',
          chefProfile: {
            name: name.trim(),
            dni: dni.trim(),
            title: title.trim(),
            phone: phone.trim(),
            city: locationCity.trim(),
            zones: zones.trim(),
            bio: bio.trim(),
            yearsExperience,
            school: culinarySchool.trim(),
            sanitaryCert: certNumber.trim(),
            cookingRate: cookingHourRate,
            shoppingRate: groceryShoppingRate,
            contractSigned: true,
            contractDate: dateNow,
            documents: {
              dniFile: dniFileName,
              sanitaryFile: sanitaryFileName,
              diplomaFile: diplomaFileName
            }
          }
        }, { merge: true });
      } catch (err) {
        console.error('Error saving chef profile to Firestore:', err);
      }
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsComplete(true);
      onChefRegistered(newChef);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#141518] border border-zinc-200 dark:border-zinc-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh] text-zinc-200">
        
        {/* Header */}
        <div className="p-5 border-b border-zinc-800 flex items-center justify-between bg-zinc-50 dark:bg-zinc-900/80">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-500 text-zinc-950 flex items-center justify-center font-bold shadow-md shadow-amber-500/20">
              <ChefHat size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                  Alta de Cocinero Profesional
                </span>
                <span className="text-[10px] text-zinc-400">Verificación & Homologación Oficial</span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-zinc-900 dark:text-white mt-0.5">
                Únete a la Red Oficial de Cocineros TouChef
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Step Indicator */}
        {!isComplete && (
          <div className="grid grid-cols-4 border-b border-zinc-800 text-xs font-bold text-center">
            <button
              onClick={() => setStep(1)}
              className={`py-3 px-2 border-b-2 transition-all cursor-pointer ${
                step === 1 ? 'border-amber-500 text-amber-400 bg-amber-500/5' : 'border-transparent text-zinc-500'
              }`}
            >
              1. Datos & DNI
            </button>
            <button
              onClick={() => setStep(2)}
              className={`py-3 px-2 border-b-2 transition-all cursor-pointer ${
                step === 2 ? 'border-amber-500 text-amber-400 bg-amber-500/5' : 'border-transparent text-zinc-500'
              }`}
            >
              2. Documentación
            </button>
            <button
              onClick={() => setStep(3)}
              className={`py-3 px-2 border-b-2 transition-all cursor-pointer ${
                step === 3 ? 'border-amber-500 text-amber-400 bg-amber-500/5' : 'border-transparent text-zinc-500'
              }`}
            >
              3. Tarifas & Menaje
            </button>
            <button
              onClick={() => setStep(4)}
              className={`py-3 px-2 border-b-2 transition-all cursor-pointer ${
                step === 4 ? 'border-amber-500 text-amber-400 bg-amber-500/5' : 'border-transparent text-zinc-500'
              }`}
            >
              4. Contrato Mercantil
            </button>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs">
          
          {isComplete ? (
            /* COMPLETION SUCCESS SCREEN */
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 size={36} />
              </div>

              <div className="space-y-2 max-w-md mx-auto">
                <span className="text-[10px] font-black uppercase bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full">
                  Expediente Homologado · Perfil Activado
                </span>
                <h3 className="text-xl font-black text-zinc-900 dark:text-white">
                  ¡Enhorabuena, Chef {name}!
                </h3>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Tu perfil profesional ya está publicado en el directorio oficial con tu tarifa de <strong>{cookingHourRate} €/h</strong>. Ya puedes recibir encargos en {locationCity} con retención de fondos en custodia segura.
                </p>
              </div>

              <div className="p-4 bg-zinc-50 dark:bg-zinc-900/80 rounded-2xl border border-zinc-800 text-left space-y-2 max-w-md mx-auto">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-400">Tarifa Cocina en Hogares:</span>
                  <strong className="text-amber-400 font-mono">{cookingHourRate} €/h</strong>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-400">Compra Asistida DIA:</span>
                  <strong className="text-zinc-200">{offersGroceryShopping ? `${groceryShoppingRate} €/h` : 'No ofrece'}</strong>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-400">Cuchillos Propios & Higiene:</span>
                  <strong className="text-emerald-400">Incluidos (Garantía Sanitaria)</strong>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-400">Carné Manipulador:</span>
                  <strong className="text-emerald-400 font-mono">{certNumber}</strong>
                </div>
              </div>

              <div className="pt-3">
                <button
                  onClick={onClose}
                  className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-xs shadow-lg transition-all cursor-pointer"
                >
                  Entrar a Mi Panel de Cocinero
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* STEP 1: DATOS Y DNI */}
              {step === 1 && (
                <div className="space-y-4 animate-in fade-in">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300 block mb-1">Nombre Completo *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ej. Roberto Sánchez Gómez"
                        className="w-full bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-xl p-2.5 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300 block mb-1">DNI / NIE del Titular *</label>
                      <input
                        type="text"
                        required
                        value={dni}
                        onChange={(e) => setDni(e.target.value)}
                        placeholder="12345678Z"
                        className="w-full bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-xl p-2.5 text-xs text-white font-mono placeholder:text-zinc-500 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300 block mb-1">Título Profesional *</label>
                      <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Ej. Chef Especialista en Batch Cooking & Mediterránea"
                        className="w-full bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-xl p-2.5 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300 block mb-1">Teléfono Móvil (WhatsApp) *</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+34 600 000 000"
                        className="w-full bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-xl p-2.5 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300 block mb-1">Ciudad Principal de Cobertura *</label>
                      <input
                        type="text"
                        required
                        value={locationCity}
                        onChange={(e) => setLocationCity(e.target.value)}
                        placeholder="Madrid, Barcelona, Valencia..."
                        className="w-full bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-xl p-2.5 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300 block mb-1">Barrios / Municipios</label>
                      <input
                        type="text"
                        value={zones}
                        onChange={(e) => setZones(e.target.value)}
                        placeholder="Chamberí, Salamanca, Pozuelo, etc."
                        className="w-full bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-xl p-2.5 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300 block mb-1">Foto de Perfil / Uniforme de Cocinero (URL)</label>
                    <div className="flex items-center gap-3">
                      <img src={avatarUrl} alt="Preview" className="w-12 h-12 rounded-xl object-cover border border-zinc-700 shrink-0" />
                      <input
                        type="url"
                        value={avatarUrl}
                        onChange={(e) => setAvatarUrl(e.target.value)}
                        placeholder="https://..."
                        className="flex-1 bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300 block mb-1">Biografía Breve / Presentación para Clientes</label>
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      rows={2}
                      className="w-full bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-xl p-2.5 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Siguiente: Documentación & Certificados</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>

                </div>
              )}

              {/* STEP 2: DOCUMENTACIÓN & CERTIFICADOS SANITARIOS */}
              {step === 2 && (
                <div className="space-y-4 animate-in fade-in">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300 block mb-1">Años de Experiencia en Cocina</label>
                      <input
                        type="number"
                        min={1}
                        max={40}
                        value={yearsExperience}
                        onChange={(e) => setYearsExperience(Number(e.target.value))}
                        className="w-full bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-xl p-2.5 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300 block mb-1">Escuela / Formación Culinaria</label>
                      <input
                        type="text"
                        value={culinarySchool}
                        onChange={(e) => setCulinarySchool(e.target.value)}
                        placeholder="Ej. Le Cordon Bleu, CETT, FP Hostelería..."
                        className="w-full bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-xl p-2.5 text-xs text-white"
                      />
                    </div>
                  </div>

                  {/* Sanitization Certificate */}
                  <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 space-y-3">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-emerald-400" />
                      <div>
                        <strong className="text-white text-xs block">Certificado de Manipulador de Alimentos (Obligatorio)</strong>
                        <span className="text-[11px] text-zinc-400">Verificación higiénico-sanitaria para cocinar en domicilios particulares.</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div>
                        <label className="text-[10px] text-zinc-400 block mb-1">Nº Registro / Identificador Sanitario:</label>
                        <input
                          type="text"
                          value={certNumber}
                          onChange={(e) => setCertNumber(e.target.value)}
                          placeholder="SAN-ES-2025-..."
                          className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-2 text-xs text-white font-mono"
                        />
                      </div>

                      <label className="flex items-center gap-2 text-xs text-zinc-300 pt-4 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={hasFoodHandlerCert}
                          onChange={(e) => setHasFoodHandlerCert(e.target.checked)}
                          className="w-4 h-4 accent-emerald-500 rounded"
                        />
                        <span>Dispongo del título vigente en regla</span>
                      </label>
                    </div>
                  </div>

                  {/* DOCUMENT UPLOAD ZONE */}
                  <div className="space-y-3">
                    <label className="text-[11px] font-bold text-zinc-300 block">Subida y Filtrado de Documentación Oficial:</label>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {/* DNI File */}
                      <div className="p-3 bg-zinc-900 rounded-2xl border border-zinc-800 space-y-2 text-center">
                        <FileCheck size={20} className="mx-auto text-amber-400" />
                        <span className="text-[11px] font-bold block text-zinc-200">DNI / NIE (Ambas Caras)</span>
                        <span className="text-[10px] text-zinc-400 truncate block">{dniFileName}</span>
                        <label className="inline-block px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-[10px] font-bold text-zinc-200 cursor-pointer transition-colors">
                          <span>Adjuntar PDF/JPG</span>
                          <input type="file" className="hidden" onChange={(e) => handleFileUpload('dni', e)} />
                        </label>
                      </div>

                      {/* Sanitary Cert File */}
                      <div className="p-3 bg-zinc-900 rounded-2xl border border-zinc-800 space-y-2 text-center">
                        <ShieldCheck size={20} className="mx-auto text-emerald-400" />
                        <span className="text-[11px] font-bold block text-zinc-200">Carné Manipulador</span>
                        <span className="text-[10px] text-zinc-400 truncate block">{sanitaryFileName}</span>
                        <label className="inline-block px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-[10px] font-bold text-zinc-200 cursor-pointer transition-colors">
                          <span>Adjuntar PDF</span>
                          <input type="file" className="hidden" onChange={(e) => handleFileUpload('sanitary', e)} />
                        </label>
                      </div>

                      {/* Diploma File */}
                      <div className="p-3 bg-zinc-900 rounded-2xl border border-zinc-800 space-y-2 text-center">
                        <Award size={20} className="mx-auto text-blue-400" />
                        <span className="text-[11px] font-bold block text-zinc-200">Diploma Hostelería</span>
                        <span className="text-[10px] text-zinc-400 truncate block">{diplomaFileName}</span>
                        <label className="inline-block px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-[10px] font-bold text-zinc-200 cursor-pointer transition-colors">
                          <span>Adjuntar Opcional</span>
                          <input type="file" className="hidden" onChange={(e) => handleFileUpload('diploma', e)} />
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Specialties Multi-select */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-zinc-300 block">Especialidades Culinarias:</label>
                    <div className="grid grid-cols-2 gap-2">
                      {availableSpecialtyOptions.map(sp => (
                        <button
                          type="button"
                          key={sp}
                          onClick={() => toggleSpecialty(sp)}
                          className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                            specialties.includes(sp)
                              ? 'bg-amber-500/20 border-amber-500 text-amber-200 font-bold'
                              : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                          }`}
                        >
                          {specialties.includes(sp) ? `✓ ${sp}` : sp}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-300 text-xs font-bold transition-colors cursor-pointer"
                    >
                      ← Atrás
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Siguiente: Tarifas y Menaje</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>

                </div>
              )}

              {/* STEP 3: TARIFAS Y SERVICIOS */}
              {step === 3 && (
                <div className="space-y-4 animate-in fade-in">
                  
                  {/* Rates grid */}
                  <div className="p-4 bg-zinc-900 rounded-2xl border border-zinc-800 space-y-4">
                    <div className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center justify-between">
                      <span>Configuración de Tarifas y Precios</span>
                      <span className="text-zinc-400 font-normal text-[11px]">Cobro directo vía TouChef con custodia Escrow</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
                          Tarifa por Hora de Cocinado (€/h) *
                        </label>
                        <div className="flex items-center gap-3">
                          <input
                            type="range"
                            min={18}
                            max={45}
                            value={cookingHourRate}
                            onChange={(e) => setCookingHourRate(Number(e.target.value))}
                            className="flex-1 accent-amber-500"
                          />
                          <span className="font-mono font-black text-amber-400 text-base">{cookingHourRate} €/h</span>
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
                          Suplemento de Desplazamiento (€)
                        </label>
                        <div className="flex items-center gap-3">
                          <input
                            type="range"
                            min={0}
                            max={15}
                            value={travelFee}
                            onChange={(e) => setTravelFee(Number(e.target.value))}
                            className="flex-1 accent-amber-500"
                          />
                          <span className="font-mono font-bold text-zinc-200 text-sm">{travelFee} €</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Optional add-on services */}
                  <div className="space-y-2.5">
                    <span className="text-[11px] font-bold text-zinc-300 block">Servicios y Extras que Ofreces:</span>

                    {/* Grocery Shopping */}
                    <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <ShoppingBag size={16} className="text-rose-400 shrink-0" />
                        <div>
                          <strong className="text-zinc-900 dark:text-white block text-xs">Compra Asistida en Supermercado DIA</strong>
                          <span className="text-[10px] text-zinc-400">Vas al supermercado a comprar los ingredientes antes de cocinar.</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {offersGroceryShopping && (
                          <span className="text-xs font-mono font-bold text-amber-400">{groceryShoppingRate} €/h</span>
                        )}
                        <input
                          type="checkbox"
                          checked={offersGroceryShopping}
                          onChange={(e) => setOffersGroceryShopping(e.target.checked)}
                          className="w-4 h-4 accent-amber-500 rounded"
                        />
                      </div>
                    </div>

                    {/* Tools & Knives */}
                    <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <UtensilsCrossed size={16} className="text-amber-400 shrink-0" />
                        <div>
                          <strong className="text-zinc-900 dark:text-white block text-xs">Cuchillos y Herramientas Propias</strong>
                          <span className="text-[10px] text-zinc-400">Llevas tu manta de cuchillos de chef desinfectados y mandil.</span>
                        </div>
                      </div>

                      <input
                        type="checkbox"
                        checked={bringsOwnTools}
                        onChange={(e) => setBringsOwnTools(e.target.checked)}
                        className="w-4 h-4 accent-amber-500 rounded"
                      />
                    </div>

                    {/* Cleaning */}
                    <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                        <div>
                          <strong className="text-zinc-900 dark:text-white block text-xs">Recogida y Limpieza Básica de Cocina</strong>
                          <span className="text-[10px] text-zinc-400">Dejar los fogones, encimera y fregadero limpios.</span>
                        </div>
                      </div>

                      <input
                        type="checkbox"
                        checked={includesCleaning}
                        onChange={(e) => setIncludesCleaning(e.target.checked)}
                        className="w-4 h-4 accent-emerald-500 rounded"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-300 text-xs font-bold transition-colors cursor-pointer"
                    >
                      ← Atrás
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(4)}
                      className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Siguiente: Firma de Contrato Mercantil</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>

                </div>
              )}

              {/* STEP 4: CONTRATO MERCANTIL DIGITAL */}
              {step === 4 && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="p-4 bg-zinc-900 rounded-2xl border border-zinc-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                        <FileText size={16} />
                        <span>Contrato Marco de Prestación de Servicios Culinarios</span>
                      </div>
                      <span className="text-[10px] font-mono text-zinc-500">Versión 2026-ESP</span>
                    </div>

                    <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 max-h-36 overflow-y-auto text-[11px] text-zinc-400 space-y-2 leading-relaxed font-mono">
                      <p>
                        <strong>CLÁUSULA 1: OBJETO Y PRESTACIÓN.</strong> El profesional independiente se compromete a prestar servicios de cocinado y preparación de menús batch cooking en los domicilios particulares concertados a través de TouChef.
                      </p>
                      <p>
                        <strong>CLÁUSULA 2: CUMPLIMIENTO SANITARIO.</strong> El cocinero declara formalmente estar en posesión del Certificado de Manipulador de Alimentos en vigor, cumpliendo con la normativa higiénico-sanitaria vigente en España.
                      </p>
                      <p>
                        <strong>CLÁUSULA 3: LIQUIDACIÓN Y FONDOS.</strong> La retribución por los servicios prestados se liquidará mediante transferencia bancaria tras la finalización conforme del servicio por parte del usuario.
                      </p>
                    </div>

                    <div className="space-y-1.5 pt-2">
                      <label className="text-[11px] font-bold text-zinc-300 block">Firma Digital del Titular (Rúbrica con Nombre / DNI):</label>
                      <input
                        type="text"
                        required
                        value={contractSignature}
                        onChange={(e) => setContractSignature(e.target.value)}
                        placeholder="Nombre y Apellidos del Titular"
                        className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-2.5 text-xs text-amber-400 font-mono focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  {/* Terms acceptance */}
                  <label className="flex items-start gap-2.5 p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-300 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={acceptedTerms}
                      onChange={(e) => setAcceptedTerms(e.target.checked)}
                      className="w-4 h-4 accent-amber-500 rounded mt-0.5"
                    />
                    <span>
                      He leído y acepto el Contrato Marco de Proveedor Profesional de TouChef, autorizando la verificación documental y la activación de mi perfil en el directorio.
                    </span>
                  </label>

                  {/* Action buttons */}
                  <div className="flex justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-300 text-xs font-bold transition-colors cursor-pointer"
                    >
                      ← Atrás
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting || !acceptedTerms}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-zinc-950 font-black text-xs shadow-lg transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <span>Homologando Expediente...</span>
                      ) : (
                        <>
                          <Check size={16} />
                          <span>Firmar Contrato & Activar Perfil de Chef</span>
                        </>
                      )}
                    </button>
                  </div>

                </div>
              )}

            </form>
          )}

        </div>

      </div>
    </div>
  );
}
