import React, { useState } from 'react';
import { 
  ChefHat, 
  Calendar, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  RotateCcw, 
  Plus, 
  Sparkles, 
  CheckCircle2, 
  ShoppingBag,
  MessageSquare,
  Star,
  Activity,
  Radio,
  UserCheck,
  Check,
  ChevronRight
} from 'lucide-react';
import { ChefBookingRequest, ViewState, ChefApplication } from '../types';
import { ServiceTimelineModal } from '../components/ServiceTimelineModal';
import { ProtectedChatModal } from '../components/ProtectedChatModal';
import { ReviewChefModal } from '../components/ReviewChefModal';
import { AntiFugaEconomicsModal } from '../components/AntiFugaEconomicsModal';
import { acceptChefApplicationInFirestore } from '../services/bookingService';

interface MyBookingsViewProps {
  bookings: ChefBookingRequest[];
  onNavigate: (view: ViewState) => void;
  onRepeatBooking: (booking: ChefBookingRequest) => void;
  onUpdateBookings?: (bookings: ChefBookingRequest[]) => void;
}

export const MyBookingsView: React.FC<MyBookingsViewProps> = ({
  bookings: initialBookings,
  onNavigate,
  onRepeatBooking,
  onUpdateBookings
}) => {
  const [bookings, setBookings] = useState<ChefBookingRequest[]>(initialBookings);
  const [activeTimelineBooking, setActiveTimelineBooking] = useState<ChefBookingRequest | null>(null);
  const [activeChatBooking, setActiveChatBooking] = useState<ChefBookingRequest | null>(null);
  const [activeReviewBooking, setActiveReviewBooking] = useState<ChefBookingRequest | null>(null);
  const [isEconomicsOpen, setIsEconomicsOpen] = useState<boolean>(false);
  const [selectedApplicant, setSelectedApplicant] = useState<ChefApplication | null>(null);

  const handleAcceptCandidate = async (bookingId: string, applicantId: string) => {
    try {
      await acceptChefApplicationInFirestore(bookingId, applicantId);
    } catch (e) {
      console.error('Error accepting candidate in Firestore:', e);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Red de Cocineros &amp; Encargos</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">Mis Encargos &amp; Cocineros</h1>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
            Lanza tus menús a la red para recibir ofertas, chatea con los cocineros candidatos o contrata directamente a tu chef preferido.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsEconomicsOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <ShieldCheck size={14} className="text-emerald-700 dark:text-emerald-400" />
            <span>Garantía &amp; Depósito Escrow</span>
          </button>

          <button
            onClick={() => onNavigate({ name: 'chefs' })}
            className="px-5 py-2.5 rounded-xl bg-[#E07A5F] hover:bg-[#c85a32] text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 self-start sm:self-auto cursor-pointer active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Nuevo Encargo / Elegir Chef</span>
          </button>
        </div>
      </div>

      {/* Bookings List */}
      {bookings.length > 0 ? (
        <div className="space-y-6">
          {bookings.map(b => {
            const hasPendingApplicants = b.isBroadcast && b.status === 'offers_received' && (b.applicants?.length || 0) > 0;

            return (
              <div
                key={b.id}
                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-xs space-y-5"
              >
                {/* Header Card Info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
                  <div className="flex items-center gap-4">
                    {b.chefAvatar ? (
                      <img
                        src={b.chefAvatar}
                        alt={b.chefName || 'Chef'}
                        className="w-14 h-14 rounded-2xl object-cover border-2 border-amber-500/40 shadow-md"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-2xl bg-[#E07A5F]/15 border-2 border-[#E07A5F]/40 text-[#E07A5F] flex items-center justify-center font-bold">
                        <Radio size={24} className="animate-pulse" />
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                          {b.chefName || (b.isBroadcast ? 'Encargo Lanzado a la Red TouChef' : 'Cocinero por Confirmar')}
                        </h3>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                          b.status === 'confirmed'
                            ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30'
                            : b.status === 'offers_received'
                            ? 'bg-amber-500/15 text-amber-800 dark:text-amber-300 border-amber-500/30 animate-pulse'
                            : 'bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/30'
                        }`}>
                          {b.status === 'confirmed' 
                            ? 'Chef Confirmado' 
                            : b.status === 'offers_received'
                            ? `${b.applicants?.length || 0} Cocineros Han Aceptado`
                            : 'Publicado en la Red'}
                        </span>
                      </div>
                      <p className="text-xs text-amber-700 dark:text-amber-400 font-medium mt-0.5">{b.mealPlanTitle}</p>
                      <div className="flex items-center gap-3 text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
                          {b.targetDate}
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
                          {b.targetTimeSlot}
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                          {b.address}, {b.city}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right sm:self-center">
                    <div className="text-xl font-black text-amber-700 dark:text-amber-400 font-mono">{b.costBreakdown.totalClientPrice} €</div>
                    <div className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1 justify-end">
                      <ShieldCheck className="w-3 h-3" />
                      Fondos en Depósito Escrow
                    </div>
                  </div>
                </div>

                {/* BROADCAST CANDIDATES SECTION (IF OFFERS RECEIVED) */}
                {hasPendingApplicants && (
                  <div className="p-4 bg-amber-500/5 dark:bg-amber-500/10 rounded-2xl border border-amber-500/25 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Radio size={16} className="text-[#E07A5F] animate-pulse" />
                        <h4 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                          Cocineros que han aceptado tu encargo ({b.applicants?.length}):
                        </h4>
                      </div>
                      <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                        Chatea con ellos y pulsa "Aceptar" para confirmar a tu favorito.
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {b.applicants?.map(app => (
                        <div
                          key={app.id}
                          className="p-3.5 bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 flex flex-col justify-between space-y-3 shadow-xs"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <img
                                src={app.chefAvatar}
                                alt={app.chefName}
                                className="w-10 h-10 rounded-xl object-cover border border-amber-500/30"
                              />
                              <div>
                                <strong className="text-xs font-bold text-zinc-900 dark:text-white block leading-tight">
                                  {app.chefName}
                                </strong>
                                <span className="text-[10px] text-amber-700 dark:text-amber-400 font-bold font-mono">
                                  {app.chefHourlyRate} €/h · ★ {app.chefRating}
                                </span>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-1 justify-end">
                              {app.chefSpecialties.slice(0, 2).map((sp, sIdx) => (
                                <span key={sIdx} className="text-[9px] font-medium bg-zinc-100 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 px-1.5 py-0.5 rounded">
                                  {sp}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Candidate pitch message */}
                          <div className="p-2.5 bg-zinc-50 dark:bg-zinc-900/60 rounded-xl border border-zinc-200 dark:border-zinc-800 text-[11px] text-zinc-700 dark:text-zinc-300 italic leading-relaxed">
                            "{app.message}"
                          </div>

                          {/* Action Buttons for this candidate */}
                          <div className="flex items-center justify-between pt-1 gap-2">
                            <button
                              onClick={() => {
                                setActiveChatBooking({
                                  ...b,
                                  chefId: app.chefId,
                                  chefName: app.chefName,
                                  chefAvatar: app.chefAvatar
                                });
                              }}
                              className="flex-1 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-600 text-xs font-bold text-zinc-800 dark:text-zinc-200 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                            >
                              <MessageSquare size={13} />
                              <span>Chatear</span>
                            </button>

                            <button
                              onClick={() => handleAcceptCandidate(b.id, app.id)}
                              className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-black text-white flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer active:scale-95"
                            >
                              <Check size={14} strokeWidth={3} />
                              <span>Aceptar Cocinero</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Dishes list */}
                <div>
                  <div className="text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-2">
                    Menú a preparar ({b.dishes.length} platos · {b.peopleCount} comensales):
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {b.dishes.map((dish, i) => (
                      <div key={i} className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/60 text-xs text-zinc-800 dark:text-zinc-200 flex items-center justify-between">
                        <span className="font-semibold truncate">{dish.name}</span>
                        <span className="text-zinc-500 dark:text-zinc-400 font-mono text-[11px]">{dish.servings} rac.</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Included Extras */}
                <div className="flex flex-wrap gap-2 text-xs">
                  {b.grocerySource === 'supermarket_delivery' && (
                    <span className="px-2.5 py-1 rounded-lg bg-rose-500/10 text-rose-700 dark:text-rose-300 border border-rose-500/20 flex items-center gap-1 font-medium">
                      <ShoppingBag className="w-3.5 h-3.5" />
                      Compra coordinada en Supermercados DIA
                    </span>
                  )}
                  {b.includeCleaning && (
                    <span className="px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 flex items-center gap-1 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      Limpieza de cocina incluida
                    </span>
                  )}
                  {b.bringChefTools && (
                    <span className="px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 flex items-center gap-1 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      Cuchillos profesionales del chef
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">
                    Código de reserva: <span className="font-mono text-zinc-700 dark:text-zinc-300 font-bold">{b.id}</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {b.status === 'confirmed' && (
                      <button
                        onClick={() => setActiveTimelineBooking(b)}
                        className="px-3.5 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-xs font-bold text-amber-700 dark:text-amber-400 border border-amber-500/30 transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <Activity size={14} />
                        <span>Hitos en Vivo</span>
                      </button>
                    )}

                    <button
                      onClick={() => setActiveChatBooking(b)}
                      className="px-3.5 py-2 rounded-xl bg-amber-500/10 dark:bg-amber-500/15 hover:bg-amber-500/20 border border-amber-500/30 text-xs font-bold text-amber-800 dark:text-amber-200 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <MessageSquare size={14} />
                      <span>Chat Seguro</span>
                    </button>

                    {b.status === 'completed' && (
                      <button
                        onClick={() => setActiveReviewBooking(b)}
                        className="px-3.5 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-xs font-bold text-zinc-700 dark:text-zinc-200 transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <Star size={14} className="text-amber-500" />
                        <span>Valorar</span>
                      </button>
                    )}

                    <button
                      onClick={() => onRepeatBooking(b)}
                      className="px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-xs font-bold text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Repetir Lote</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-12 text-center bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 flex items-center justify-center mx-auto">
            <ChefHat className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Aún no tienes reservas de cocineros</h3>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 max-w-md mx-auto leading-relaxed">
            Puedes generar un menú semanal con IA y pulsar <strong>"Lanzar a la Red"</strong> para recibir ofertas con mensaje, o explorar directamente nuestro catálogo de chefs verificados.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={() => onNavigate({ name: 'ai-generator' })}
              className="px-5 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-bold text-xs transition-colors cursor-pointer"
            >
              Crear Plan con IA
            </button>
            <button
              onClick={() => onNavigate({ name: 'chefs' })}
              className="px-5 py-2.5 rounded-xl bg-[#E07A5F] hover:bg-[#c85a32] text-white font-bold text-xs shadow-md transition-all cursor-pointer active:scale-95"
            >
              Ver Cocineros Disponibles
            </button>
          </div>
        </div>
      )}

      {/* MODALS */}
      <ServiceTimelineModal
        isOpen={!!activeTimelineBooking}
        onClose={() => setActiveTimelineBooking(null)}
        booking={activeTimelineBooking}
      />

      <ProtectedChatModal
        isOpen={!!activeChatBooking}
        onClose={() => setActiveChatBooking(null)}
        booking={activeChatBooking}
        onAcceptOffer={(bookingId, chefId) => {
          const booking = bookings.find(b => b.id === bookingId);
          if (booking) {
            const applicant = booking.applicants?.find(a => a.chefId === chefId);
            if (applicant) {
              handleAcceptCandidate(bookingId, applicant.id);
            }
          }
          setActiveChatBooking(null);
        }}
      />

      <ReviewChefModal
        isOpen={!!activeReviewBooking}
        onClose={() => setActiveReviewBooking(null)}
        booking={activeReviewBooking}
        onSubmitReview={() => {
          alert('¡Muchas gracias! Tu reseña ha sido publicada y el chef ha recibido tu valoración.');
        }}
      />

      <AntiFugaEconomicsModal
        isOpen={isEconomicsOpen}
        onClose={() => setIsEconomicsOpen(false)}
      />

    </div>
  );
};
