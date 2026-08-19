import React, { useState } from 'react';
import { 
  UtensilsCrossed, 
  Flame, 
  Refrigerator, 
  ShieldAlert, 
  Check, 
  Edit2, 
  Save
} from 'lucide-react';
import { 
  getHouseholdMemory, 
  saveHouseholdMemory, 
  HouseholdMemory,
  getDefaultHouseholdMemory 
} from '../services/householdService';
import { auth } from '../lib/firebase';

export const HouseholdMemoryCard: React.FC = () => {
  const [memory, setMemory] = useState<HouseholdMemory>(getDefaultHouseholdMemory());
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  React.useEffect(() => {
    const uid = auth.currentUser?.uid;
    if (uid) {
      getHouseholdMemory(uid).then(setMemory).catch(console.error);
    }
  }, []);

  const handleSave = async () => {
    const uid = auth.currentUser?.uid || 'user-client-123';
    await saveHouseholdMemory(uid, memory);
    setIsEditing(false);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-5 sm:p-6 space-y-4 shadow-xs text-zinc-900 dark:text-zinc-100">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-400 flex items-center justify-center font-bold">
            <UtensilsCrossed size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-black text-zinc-900 dark:text-white">Memoria del Hogar TouChef</h3>
              <span className="text-[10px] bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                Sincronizada
              </span>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              Datos de tu cocina que tus cocineros consultan automáticamente antes de cada sesión.
            </p>
          </div>
        </div>

        <div>
          {isEditing ? (
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
            >
              <Save size={14} />
              <span>Guardar Memoria</span>
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-3.5 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer border border-zinc-200 dark:border-zinc-700"
            >
              <Edit2 size={13} />
              <span>Editar Memoria</span>
            </button>
          )}
        </div>
      </div>

      {isSaved && (
        <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-500/40 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2">
          <Check size={14} />
          <span>¡Memoria de cocina actualizada y lista para tus próximas reservas!</span>
        </div>
      )}

      {/* Grid details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
        
        {/* Stove type */}
        <div className="p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-2xl border border-zinc-200 dark:border-zinc-700/60 space-y-1">
          <span className="text-zinc-600 dark:text-zinc-400 flex items-center gap-1 text-[11px] font-medium">
            <Flame size={12} className="text-amber-600 dark:text-amber-400" />
            Tipo de Fogones:
          </span>
          {isEditing ? (
            <select
              value={memory.stoveType}
              onChange={(e) => setMemory({ ...memory, stoveType: e.target.value as any })}
              className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg p-1.5 text-xs text-zinc-900 dark:text-white"
            >
              <option value="vitro">Vitrocerámica</option>
              <option value="induccion">Inducción</option>
              <option value="gas">Gas Natural</option>
              <option value="mixta">Mixta</option>
            </select>
          ) : (
            <strong className="text-zinc-900 dark:text-white block capitalize font-bold">{memory.stoveType} ({memory.burnersCount} fuegos)</strong>
          )}
        </div>

        {/* Burners */}
        <div className="p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-2xl border border-zinc-200 dark:border-zinc-700/60 space-y-1">
          <span className="text-zinc-600 dark:text-zinc-400 flex items-center gap-1 text-[11px] font-medium">
            <UtensilsCrossed size={12} className="text-amber-600 dark:text-amber-400" />
            Fuegos Disponibles:
          </span>
          {isEditing ? (
            <input
              type="number"
              min={1}
              max={6}
              value={memory.burnersCount}
              onChange={(e) => setMemory({ ...memory, burnersCount: Number(e.target.value) })}
              className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg p-1.5 text-xs text-zinc-900 dark:text-white"
            />
          ) : (
            <strong className="text-zinc-900 dark:text-white block font-bold">{memory.burnersCount} fuegos simultáneos</strong>
          )}
        </div>

        {/* Tupperware */}
        <div className="p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-2xl border border-zinc-200 dark:border-zinc-700/60 space-y-1">
          <span className="text-zinc-600 dark:text-zinc-400 flex items-center gap-1 text-[11px] font-medium">
            <Refrigerator size={12} className="text-[#52796F] dark:text-[#84A98C]" />
            Fiambreras Cristal:
          </span>
          {isEditing ? (
            <input
              type="number"
              min={0}
              max={30}
              value={memory.glassTupperwareCount}
              onChange={(e) => setMemory({ ...memory, glassTupperwareCount: Number(e.target.value) })}
              className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg p-1.5 text-xs text-zinc-900 dark:text-white"
            />
          ) : (
            <strong className="text-zinc-900 dark:text-white block font-bold">{memory.glassTupperwareCount} recipientes</strong>
          )}
        </div>

        {/* Allergens */}
        <div className="p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-2xl border border-zinc-200 dark:border-zinc-700/60 space-y-1">
          <span className="text-zinc-600 dark:text-zinc-400 flex items-center gap-1 text-[11px] font-medium">
            <ShieldAlert size={12} className="text-rose-600 dark:text-rose-400" />
            Alérgenos del Hogar:
          </span>
          {isEditing ? (
            <input
              type="text"
              value={memory.allergiesOrIntolerances.join(', ')}
              onChange={(e) => setMemory({ ...memory, allergiesOrIntolerances: e.target.value.split(',').map(s => s.trim()) })}
              className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg p-1.5 text-xs text-zinc-900 dark:text-white"
            />
          ) : (
            <strong className="text-rose-700 dark:text-rose-400 block truncate font-bold">{memory.allergiesOrIntolerances.join(', ') || 'Sin alérgenos declarados'}</strong>
          )}
        </div>
      </div>

      {/* House Rules and notes */}
      <div className="p-3.5 bg-zinc-50 dark:bg-zinc-800/60 rounded-2xl border border-zinc-200 dark:border-zinc-700/60 space-y-1.5 text-xs">
        <span className="text-zinc-700 dark:text-zinc-300 text-[11px] font-bold block">Reglas de Cocina &amp; Notas para el Chef:</span>
        {isEditing ? (
          <textarea
            value={memory.kitchenRulesNotes}
            onChange={(e) => setMemory({ ...memory, kitchenRulesNotes: e.target.value })}
            rows={2}
            className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-xl p-2 text-xs text-zinc-900 dark:text-white"
          />
        ) : (
          <p className="text-zinc-700 dark:text-zinc-300 italic">
            "{memory.kitchenRulesNotes}"
          </p>
        )}
      </div>

    </div>
  );
};
