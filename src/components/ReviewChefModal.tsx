import React, { useState } from 'react';
import { 
  X, 
  Star, 
  Heart, 
  ChefHat, 
  Check, 
  ShieldCheck, 
  Sparkles, 
  RotateCcw,
  UtensilsCrossed
} from 'lucide-react';
import { ChefBookingRequest } from '../types';

interface ReviewChefModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: ChefBookingRequest | null;
  onSubmitReview: (reviewData: {
    overall: number;
    taste: number;
    punctuality: number;
    cleanliness: number;
    portionsAccuracy: number;
    comment: string;
    repeatPreferred: boolean;
  }) => void;
}

export const ReviewChefModal: React.FC<ReviewChefModalProps> = ({
  isOpen,
  onClose,
  booking,
  onSubmitReview
}) => {
  if (!isOpen || !booking) return null;

  const [overall, setOverall] = useState<number>(5);
  const [taste, setTaste] = useState<number>(5);
  const [punctuality, setPunctuality] = useState<number>(5);
  const [cleanliness, setCleanliness] = useState<number>(5);
  const [portionsAccuracy, setPortionsAccuracy] = useState<number>(5);
  const [comment, setComment] = useState<string>('¡Excelente cocinado! Todo ha quedado riquísimo y la cocina impecable.');
  const [repeatPreferred, setRepeatPreferred] = useState<boolean>(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitReview({
      overall,
      taste,
      punctuality,
      cleanliness,
      portionsAccuracy,
      comment,
      repeatPreferred
    });
    onClose();
  };

  const renderStarInput = (label: string, value: number, onChange: (val: number) => void) => (
    <div className="flex items-center justify-between p-2.5 bg-zinc-50 dark:bg-stone-850 rounded-xl border border-zinc-200 dark:border-stone-800">
      <span className="text-xs text-zinc-700 dark:text-stone-300 font-medium">{label}</span>
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            type="button"
            key={star}
            onClick={() => onChange(star)}
            className={`p-1 cursor-pointer transition-transform hover:scale-110 ${
              value >= star ? 'text-amber-400' : 'text-stone-600'
            }`}
          >
            <Star size={16} fill={value >= star ? 'currentColor' : 'none'} />
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-stone-900 border border-zinc-200 dark:border-stone-800 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-stone-800 flex items-center justify-between bg-zinc-50 dark:bg-stone-950/60">
          <div className="flex items-center gap-3">
            <img
              src={booking.chefAvatar || 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&auto=format&fit=crop&q=80'}
              alt={booking.chefName}
              className="w-12 h-12 rounded-2xl object-cover border border-amber-500/30"
            />
            <div>
              <h2 className="text-base font-bold text-white">
                Valorar Servicio de {booking.chefName}
              </h2>
              <p className="text-xs text-zinc-600 dark:text-stone-400">
                {booking.mealPlanTitle} • {booking.dishes.length} platos
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-600 dark:text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
          
          {/* Main Overall Rating */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-center space-y-2">
            <span className="text-xs font-bold text-amber-800 dark:text-amber-200 font-bold uppercase tracking-wider block">
              Puntuación General del Servicio
            </span>
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setOverall(star)}
                  className={`p-1.5 cursor-pointer transition-transform hover:scale-125 ${
                    overall >= star ? 'text-amber-400' : 'text-stone-600'
                  }`}
                >
                  <Star size={24} fill={overall >= star ? 'currentColor' : 'none'} />
                </button>
              ))}
            </div>
            <span className="text-[11px] text-zinc-600 dark:text-stone-400 font-medium">
              {overall === 5 && '🌟 ¡Experiencia Inmejorable!'}
              {overall === 4 && ' Muy buena sesión'}
              {overall === 3 && ' Bien, con margen de mejora'}
              {overall <= 2 && ' Hubo incidencias'}
            </span>
          </div>

          {/* Granular Sub-Ratings */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-stone-400 block">
              Evaluación Detallada:
            </span>
            {renderStarInput('Sabor y Puntos de Cocción', taste, setTaste)}
            {renderStarInput('Puntualidad y Trato', punctuality, setPunctuality)}
            {renderStarInput('Limpieza de Cocina y Menaje', cleanliness, setCleanliness)}
            {renderStarInput('Volumen y Raciones Acordadas', portionsAccuracy, setPortionsAccuracy)}
          </div>

          {/* Comment */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-700 dark:text-stone-300 block">Comentario para el perfil del Chef:</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              placeholder="¿Qué platos quedaron especialmente buenos? ¿Cómo fue el orden en la cocina?"
              className="w-full bg-white dark:bg-stone-850 border border-zinc-300 dark:border-stone-700 rounded-xl p-3 text-xs text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-stone-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Repeat loyalty checkbox */}
          <label className="flex items-center gap-2.5 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-300 dark:border-emerald-500/30 cursor-pointer">
            <input
              type="checkbox"
              checked={repeatPreferred}
              onChange={(e) => setRepeatPreferred(e.target.checked)}
              className="w-4 h-4 accent-emerald-500 rounded"
            />
            <div className="text-xs">
              <strong className="text-emerald-800 dark:text-emerald-300 font-bold block">Guardar a {booking.chefName} como mi cocinero preferido</strong>
              <span className="text-zinc-600 dark:text-stone-400 text-[11px]">Tu próxima reserva con este chef tendrá tarifa reducida (8% comisión fidelidad).</span>
            </div>
          </label>

          {/* Submit */}
          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-750 text-zinc-700 dark:text-stone-300 text-xs font-bold transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Check size={15} />
              <span>Publicar Reseña Verificada</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
