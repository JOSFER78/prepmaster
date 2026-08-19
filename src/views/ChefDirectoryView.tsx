import React, { useState } from 'react';
import { 
  ChefHat, 
  Search, 
  MapPin, 
  Star, 
  ShieldCheck, 
  Award, 
  SlidersHorizontal, 
  Sparkles, 
  Calendar, 
  Clock, 
  UtensilsCrossed, 
  ArrowRight,
  Filter,
  CheckCircle2,
  DollarSign,
  Radio,
  ShoppingBag,
  ListOrdered
} from 'lucide-react';
import { ChefProfile, BatchProject, ViewState } from '../types';
import { ChefDetailModal } from '../components/ChefDetailModal';
import { subscribeToChefs } from '../services/chefService';
import { APPROVED_CHEFS } from '../lib/chefsData';

interface ChefDirectoryViewProps {
  onNavigate?: (view: ViewState) => void;
  onSelectChefToBook: (chef: ChefProfile) => void;
  onOpenProtectedChat?: (chef: ChefProfile) => void;
  activeBatchProject?: BatchProject | null;
}

export function ChefDirectoryView({
  onNavigate,
  onSelectChefToBook,
  onOpenProtectedChat,
  activeBatchProject
}: ChefDirectoryViewProps) {
  const [chefs, setChefs] = useState<ChefProfile[]>(APPROVED_CHEFS);
  const [selectedCity, setSelectedCity] = useState<string>('Todas');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('Todas');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedChefForDetail, setSelectedChefForDetail] = useState<ChefProfile | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);

  React.useEffect(() => {
    const unsub = subscribeToChefs(setChefs);
    return () => unsub();
  }, []);

  const cities = ['Todas', 'Madrid', 'Barcelona', 'Valencia'];
  const specialties = ['Todas', 'Batch Cooking Tradicional', 'Fitness & Macros', 'Mediterránea', 'Sin Gluten'];

  const filteredChefs = chefs.filter(chef => {
    const matchesCity = selectedCity === 'Todas' || chef.locationCity.toLowerCase().includes(selectedCity.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'Todas' || chef.specialties.some(s => s.toLowerCase().includes(selectedSpecialty.toLowerCase()));
    const matchesSearch = searchQuery === '' || 
      chef.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chef.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chef.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCity && matchesSpecialty && matchesSearch;
  });

  const handleOpenDetail = (chef: ChefProfile) => {
    setSelectedChefForDetail(chef);
    setIsDetailOpen(true);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-16 text-zinc-900 dark:text-zinc-100 max-w-[1400px] mx-auto">
      
      {/* HUB 3 SUB-TAB NAVIGATION */}
      <div className="flex items-center gap-2 p-1.5 bg-zinc-200/70 dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 self-start max-w-fit">
        <button
          className="px-4 py-2 rounded-xl text-xs font-black bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-xs flex items-center gap-2"
        >
          <ChefHat size={14} className="text-[#E07A5F]" />
          <span>Directorio de Cocineros (Elección Manual)</span>
        </button>

        {onNavigate && (
          <button
            onClick={() => onNavigate({ name: 'my-bookings' })}
            className="px-4 py-2 rounded-xl text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-zinc-800/50 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Radio size={14} className="text-amber-500 animate-pulse" />
            <span>Mis Encargos &amp; Ofertas de la Red</span>
            <span className="px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 text-[10px] font-black">
              2
            </span>
          </button>
        )}

        {onNavigate && (
          <button
            onClick={() => onNavigate({ name: 'supermarket-checkout' })}
            className="px-4 py-2 rounded-xl text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-zinc-800/50 transition-all flex items-center gap-2 cursor-pointer"
          >
            <ShoppingBag size={14} className="text-rose-500" />
            <span>Supermercados DIA (JIT)</span>
          </button>
        )}
      </div>

      {/* DIRECTORY HERO */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#E07A5F] bg-[#E07A5F]/10 px-2.5 py-0.5 rounded-full border border-[#E07A5F]/20">
                Marketplace Homologado TouChef
              </span>
              <span className="text-xs text-zinc-400">Garantía Sanitaria Oficial</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white mt-1">
              Chefs Profesionales de Batch Cooking en tu Hogar
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1 max-w-2xl leading-relaxed">
              Contrata cocineros certificados con seguro de responsabilidad civil y carné de manipulador. Cocinan todas tus raciones de la semana en 2.5h-4h y dejan tu cocina impecable.
            </p>
          </div>

          {activeBatchProject && (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-xs space-y-1.5 shrink-0 sm:max-w-xs">
              <span className="text-[10px] font-black text-amber-600 dark:text-amber-400 uppercase block">
                Lote Activo para Asignar
              </span>
              <strong className="text-zinc-900 dark:text-white block truncate">
                {activeBatchProject.title} ({activeBatchProject.totalServings} raciones)
              </strong>
              <p className="text-zinc-500 text-[11px]">
                El chef seleccionado preparará exactamente estas recetas en tu cocina.
              </p>
            </div>
          )}
        </div>

        {/* BROADCAST BANNER */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-[#E07A5F]/15 via-amber-500/10 to-transparent border border-[#E07A5F]/30 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="space-y-0.5">
            <strong className="text-xs font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
              <span>📡 ¿Prefieres recibir varias ofertas de cocineros?</span>
            </strong>
            <p className="text-[11px] text-zinc-600 dark:text-zinc-400">
              Lanza tu menú a la red. Los cocineros disponibles de tu barrio postularán con su mensaje y tú aceptas al mejor vía chat.
            </p>
          </div>
          <button
            onClick={() => onSelectChefToBook({ id: 'any' } as any)}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#E07A5F] hover:bg-[#c85a32] text-white text-xs font-black transition-all cursor-pointer shrink-0 shadow-xs active:scale-95"
          >
            <span>📡 Lanzar a la Red TouChef</span>
          </button>
        </div>

        {/* SEARCH AND FILTERS */}
        <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por nombre, especialidad (guisos, fitness, vegano) o barrio..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-[#E07A5F]"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
            <span className="text-[11px] font-bold text-zinc-400 shrink-0">Ciudad:</span>
            {cities.map(c => (
              <button
                key={c}
                onClick={() => setSelectedCity(c)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  selectedCity === c ? 'btn-hero-copper text-white shadow-xs' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* CHEFS DIRECTORY GRID */}
      {filteredChefs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChefs.map(chef => (
            <div
              key={chef.id}
              className="bg-white dark:bg-zinc-900 rounded-3xl p-5 border border-zinc-200/80 dark:border-zinc-800 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
            >
              {/* TOP HEADER: AVATAR & NAME */}
              <div className="flex items-start gap-3.5">
                <div className="w-14 h-14 rounded-2xl overflow-hidden bg-[#E07A5F] text-white flex items-center justify-center font-black text-xl shrink-0 border border-[#E07A5F]/20 relative">
                  <img src={chef.avatar} alt={chef.name} className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <strong className="text-sm font-black text-zinc-900 dark:text-white truncate block">
                      {chef.name}
                    </strong>
                    <div className="flex items-center gap-1 text-amber-500 font-bold text-xs shrink-0">
                      <Star size={12} fill="currentColor" />
                      <span>{chef.rating}</span>
                      <span className="text-zinc-400 font-normal">({chef.reviewsCount})</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate mt-0.5 font-medium">
                    {chef.specialties[0] || 'Chef de Cocina'}
                  </p>

                  <div className="flex items-center gap-1 text-[11px] text-zinc-400 mt-1">
                    <MapPin size={12} className="text-[#E07A5F] shrink-0" />
                    <span className="truncate">{chef.locationCity} ({(chef.zones || []).slice(0, 2).join(', ')})</span>
                  </div>
                </div>
              </div>

              {/* SPECIALTIES TAGS */}
              <div className="flex flex-wrap gap-1.5">
                {chef.specialties.map((spec, sIdx) => (
                  <span
                    key={sIdx}
                    className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200/50 dark:border-zinc-700/50"
                  >
                    {spec}
                  </span>
                ))}
              </div>

              {/* BIO SNIPPET */}
              <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                {chef.bio}
              </p>

              {/* PRICING & INCLUDED SERVICES */}
              <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/60 dark:border-zinc-700/60 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500 font-medium">Tarifa Cocina en Hogar:</span>
                  <span className="text-[#E07A5F] font-black font-mono text-sm">
                    {chef.pricing.cookingHourRate} €/hora
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-[11px] text-zinc-500">
                  <span>Compra en súper opcional:</span>
                  <span>+{chef.pricing.groceryShoppingHourRate} €/h</span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold pt-1 border-t border-zinc-200/40 dark:border-zinc-700/40">
                  <span className="flex items-center gap-1">
                    <ShieldCheck size={12} />
                    <span>Cuchillos &amp; Herramientas:</span>
                  </span>
                  <span>Incluidos</span>
                </div>
              </div>

              {/* ACTIONS: VER PERFIL + ELEGIR CHEF */}
              <div className="flex items-center gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                <button
                  onClick={() => handleOpenDetail(chef)}
                  className="px-3.5 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-bold hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all cursor-pointer"
                >
                  Ver Ficha
                </button>

                <button
                  onClick={() => onSelectChefToBook(chef)}
                  className="flex-1 py-2.5 rounded-xl btn-hero-copper text-white text-xs font-black shadow-xs transition-all cursor-pointer flex items-center justify-center gap-1 active:scale-95"
                >
                  <span>Elegir Manualmente</span>
                  <ArrowRight size={13} />
                </button>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-12 text-center border border-zinc-200 dark:border-zinc-800 space-y-4">
          <ChefHat size={40} className="mx-auto text-amber-500/60" />
          <h3 className="text-base font-black text-zinc-900 dark:text-white">No hay cocineros homologados en esta zona</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
            Pronto homologaremos nuevos cocineros en tu ciudad. ¿Eres chef profesional o estudiante de hostelería?
          </p>
          <button
            onClick={() => onNavigate && onNavigate({ name: 'profile' })}
            className="px-5 py-2.5 rounded-xl btn-hero-copper text-white text-xs font-bold shadow-xs cursor-pointer inline-flex items-center gap-2"
          >
            <span>Conviértete en Cocinero TouChef</span>
            <ArrowRight size={14} />
          </button>
        </div>
      )}

      {/* CHEF DETAIL MODAL */}
      <ChefDetailModal
        isOpen={isDetailOpen}
        chef={selectedChefForDetail}
        onClose={() => setIsDetailOpen(false)}
        onBookChef={(chef) => {
          setIsDetailOpen(false);
          onSelectChefToBook(chef);
        }}
      />

    </div>
  );
}
