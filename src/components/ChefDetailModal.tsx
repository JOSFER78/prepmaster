import React, { useState } from 'react';
import { 
  X, 
  ChefHat, 
  Star, 
  ShieldCheck, 
  Award, 
  Clock, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  Sparkles, 
  ShoppingBag, 
  UtensilsCrossed, 
  Flame,
  ArrowRight,
  Shield
} from 'lucide-react';
import { ChefProfile } from '../types';

interface ChefDetailModalProps {
  chef: ChefProfile | null;
  isOpen: boolean;
  onClose: () => void;
  onBookChef: (chef: ChefProfile) => void;
  onOpenProtectedChat?: (chef: ChefProfile) => void;
}

export function ChefDetailModal({
  chef,
  isOpen,
  onClose,
  onBookChef,
  onOpenProtectedChat
}: ChefDetailModalProps) {
  const [cookingHours, setCookingHours] = useState<number>(3.5);
  const [includeShopping, setIncludeShopping] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'profile' | 'calculator' | 'reviews'>('profile');

  if (!isOpen || !chef) return null;

  const cookingSubtotal = cookingHours * chef.pricing.cookingHourRate;
  const shoppingSubtotal = includeShopping ? (chef.pricing.groceryShoppingHourRate || 16) * 1.5 : 0;
  const travelFee = chef.pricing.travelFee || 0;
  const totalEstimate = cookingSubtotal + shoppingSubtotal + travelFee;
  const estimatedServings = Math.round(cookingHours * 10);
  const costPerServing = (totalEstimate / (estimatedServings || 1)).toFixed(2);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-3xl p-5 sm:p-7 shadow-2xl border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 flex flex-col max-h-[92vh] overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl overflow-hidden bg-[#E07A5F] text-white flex items-center justify-center font-bold text-lg shrink-0 border border-[#E07A5F]/30">
              <img src={chef.avatar} alt={chef.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-zinc-900 dark:text-white">
                  {chef.name}
                </h2>
                {chef.isVerified && (
                  <span className="text-[10px] font-black px-2 py-0.2 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                    <ShieldCheck size={11} /> Verificado
                  </span>
                )}
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate max-w-xs sm:max-w-md">
                {chef.title}
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-500 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* TABS */}
        <div className="flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pt-3 pb-2 text-xs font-bold shrink-0">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeTab === 'profile' ? 'btn-hero-copper text-white' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            Perfil & Especialidades
          </button>
          <button
            onClick={() => setActiveTab('calculator')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeTab === 'calculator' ? 'btn-hero-copper text-white' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            Calculadora en Vivo
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeTab === 'reviews' ? 'btn-hero-copper text-white' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            Reseñas ({chef.reviews?.length || 0})
          </button>
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto pr-1 py-4 space-y-5">
          
          {activeTab === 'profile' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 text-xs leading-relaxed space-y-2">
                <strong className="text-zinc-900 dark:text-white block font-bold">Biografía Profesional:</strong>
                <p className="text-zinc-600 dark:text-zinc-300">{chef.bio}</p>
                <div className="pt-2 border-t border-zinc-200/60 dark:border-zinc-700 flex flex-wrap gap-3 text-zinc-500">
                  <span>📍 {chef.locationCity} ({chef.zones?.join(', ')})</span>
                  <span>🎓 {chef.yearsExperience} años experiencia</span>
                  <span>⭐ {chef.rating} ({chef.completedBookingsCount} servicios)</span>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">
                  Platos Estrella & Especialidades:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {chef.featuredDishes?.map((dish, i) => (
                    <div key={i} className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-xs flex items-center gap-2">
                      <Flame size={14} className="text-[#E07A5F] shrink-0" />
                      <span className="font-semibold text-zinc-800 dark:text-zinc-200 truncate">
                        {typeof dish === 'string' ? dish : dish.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold">
                  <ShieldCheck size={16} />
                  <span>Garantía Sanitaria & Herramientas Incluidas</span>
                </div>
                <p className="text-zinc-500 text-[11px]">
                  El cocinero aporta cuchillos profesionales desinfectados y deja la cocina impecable. Certificado de manipulador de alimentos verificado por TouChef.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'calculator' && (
            <div className="space-y-5">
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span>Horas estimadas de cocinado en tu hogar:</span>
                  <span className="text-sm font-mono text-[#E07A5F]">{cookingHours} horas</span>
                </div>
                <input
                  type="range"
                  min={2}
                  max={5}
                  step={0.5}
                  value={cookingHours}
                  onChange={(e) => setCookingHours(Number(e.target.value))}
                  className="w-full accent-[#E07A5F] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-zinc-400">
                  <span>2h (16-20 raciones)</span>
                  <span>3.5h (30-40 raciones)</span>
                  <span>5h (50+ raciones)</span>
                </div>
              </div>

              <label className="flex items-center gap-3 p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeShopping}
                  onChange={(e) => setIncludeShopping(e.target.checked)}
                  className="w-4 h-4 accent-[#E07A5F] rounded"
                />
                <div className="text-xs">
                  <strong className="text-zinc-900 dark:text-white block">Añadir compra en mercado/súper (+1.5h servicio)</strong>
                  <span className="text-zinc-500 text-[11px]">El cocinero selecciona los frescos y te presenta el ticket real de compra.</span>
                </div>
              </label>

              {/* ESTIMATE CARD */}
              <div className="p-4 rounded-2xl bg-zinc-900 text-white border border-zinc-800 space-y-3">
                <div className="flex justify-between items-center text-xs text-zinc-400">
                  <span>Mano de obra cocinado ({cookingHours}h × {chef.pricing.cookingHourRate}€):</span>
                  <span className="font-mono font-bold text-white">{cookingSubtotal} €</span>
                </div>
                {includeShopping && (
                  <div className="flex justify-between items-center text-xs text-zinc-400">
                    <span>Servicio de compra de frescos (1.5h × 16€):</span>
                    <span className="font-mono font-bold text-white">{shoppingSubtotal} €</span>
                  </div>
                )}
                <div className="flex justify-between items-center text-xs text-zinc-400">
                  <span>Desplazamiento a tu domicilio:</span>
                  <span className="font-mono font-bold text-emerald-400">{travelFee === 0 ? 'Gratis' : `${travelFee} €`}</span>
                </div>
                <div className="pt-2 border-t border-zinc-800 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] text-zinc-400 uppercase font-bold block">Total Estimado Sesión</span>
                    <span className="text-xs text-zinc-500">~{costPerServing} € / ración preparada</span>
                  </div>
                  <strong className="text-2xl font-mono font-black text-[#F4A261]">{totalEstimate} €</strong>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-3">
              {chef.reviews?.map(rev => (
                <div key={rev.id} className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-500 font-bold">
                      <Star size={13} fill="currentColor" />
                      <span>{rev.rating}.0</span>
                      <span className="text-zinc-400 font-normal">· {rev.authorName}</span>
                    </div>
                    <span className="text-[10px] text-zinc-400">{rev.date}</span>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-300 italic">"{rev.comment}"</p>
                  <span className="text-[10px] text-[#E07A5F] font-bold block">Lote: {rev.batchType}</span>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* FOOTER ACTIONS */}
        <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between gap-3 shrink-0">
          <button
            onClick={() => onOpenProtectedChat && onOpenProtectedChat(chef)}
            className="px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-xs font-bold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            💬 Enviar Mensaje
          </button>

          <button
            onClick={() => onBookChef(chef)}
            className="btn-hero-copper text-xs font-black px-6 py-2.5 rounded-xl shadow-md flex items-center gap-2 active:scale-95 cursor-pointer text-white"
          >
            <span>Reservar Sesión con {chef.name.split(' ')[0]}</span>
            <ArrowRight size={15} />
          </button>
        </div>

      </div>
    </div>
  );
}
