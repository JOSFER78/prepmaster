import React, { useState, useEffect, useMemo } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  Clock, 
  Flame, 
  ArrowRight, 
  ArrowLeft, 
  Refrigerator, 
  Star, 
  Sparkles, 
  Layers, 
  Check, 
  RotateCcw,
  Snowflake,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Mic,
  Zap,
  Award,
  Utensils,
  UtensilsCrossed,
  HelpCircle
} from 'lucide-react';
import { BatchProject, BatchDish } from '../types';

interface InteractiveCookViewProps {
  dishName?: string;
  activeProject?: BatchProject | null;
  onBack: () => void;
  onFinishCooking?: () => void;
}

export function InteractiveCookView({ 
  dishName, 
  activeProject, 
  onBack,
  onFinishCooking 
}: InteractiveCookViewProps) {
  
  // IF NO ACTIVE PROJECT EXISTS IN FIRESTORE, SHOW CLEAN ZERO-MOCKS EMPTY STATE
  if (!activeProject || !activeProject.dishes || activeProject.dishes.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 text-center space-y-6 animate-fade-in text-zinc-900 dark:text-zinc-100">
        <div className="w-20 h-20 rounded-3xl bg-[#E07A5F]/10 text-[#E07A5F] flex items-center justify-center mx-auto shadow-inner">
          <Flame size={36} />
        </div>
        <div className="space-y-2">
          <span className="text-[10px] font-black uppercase tracking-wider bg-zinc-100 dark:bg-zinc-800 text-zinc-500 px-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-700">
            Sin Lote Activo · Firebase a 0
          </span>
          <h2 className="text-2xl font-black text-zinc-900 dark:text-white">
            No tienes ninguna sesión de cocina activa
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-md mx-auto leading-relaxed">
            TouChef opera bajo la doctrina de <strong>CERO Datos Simulados</strong>. Para iniciar el Workout Culinario en vivo con temporizadores y estaciones térmicas, crea primero tu menú o receta con el Asistente Guiado.
          </p>
        </div>
        <div className="flex justify-center gap-3 pt-2">
          <button
            onClick={onBack}
            className="btn-hero-copper text-white text-xs font-black px-6 py-3 rounded-2xl shadow-md flex items-center gap-2 cursor-pointer hover:scale-[1.02] transition-transform"
          >
            <Sparkles size={16} />
            <span>Crear Mi Primer Plan de Batch Cooking</span>
          </button>
        </div>
      </div>
    );
  }

  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlayingVoice, setIsPlayingVoice] = useState<boolean>(false);

  // DYNAMIC TIMER ZONES DERIVED DIRECTLY FROM ACTIVE PROJECT DISHES (MAX 4 STATIONS)
  const stationDishes = useMemo(() => {
    return activeProject.dishes.slice(0, 4);
  }, [activeProject]);

  // Timers state for each station (initialized to estimated prep time in seconds)
  const [stationTimers, setStationTimers] = useState<number[]>(() => {
    return stationDishes.map(d => {
      const match = d.prepTime.match(/(\d+)/);
      const minutes = match ? parseInt(match[1], 10) : 30;
      return minutes * 60;
    });
  });

  const [stationRunning, setStationRunning] = useState<boolean[]>(() => {
    return stationDishes.map((_, i) => i < 2); // First 2 active by default
  });

  // Screen Wake Lock API
  useEffect(() => {
    if ('wakeLock' in navigator) {
      try {
        (navigator as any).wakeLock.request('screen').catch(() => {});
      } catch (e) {}
    }
  }, []);

  // Stop any speech synthesis on unmount
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Timers tick
  useEffect(() => {
    const interval = setInterval(() => {
      setStationTimers(prev => prev.map((t, idx) => {
        if (stationRunning[idx] && t > 0) return t - 1;
        return t;
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, [stationRunning]);

  const toggleStation = (idx: number) => {
    setStationRunning(prev => {
      const next = [...prev];
      next[idx] = !next[idx];
      return next;
    });
  };

  const addTime = (idx: number, seconds: number) => {
    setStationTimers(prev => {
      const next = [...prev];
      next[idx] = (next[idx] || 0) + seconds;
      return next;
    });
  };

  // DYNAMIC ORCHESTRATION PHASES FROM DISHES
  const parallelPhases = useMemo(() => {
    const totalDishes = activeProject.dishes.length;
    const dishNames = activeProject.dishes.map(d => d.name).join(', ');

    return [
      {
        title: 'Fase 1: Mise en Place Unificada & Pesaje',
        timeFormatted: '00:00 - 00:20',
        description: `Picar y pesar todos los ingredientes para los ${totalDishes} platos (${dishNames}). Separar en cuencos de cristal antes de encender el primer fuego.`,
        targetHeat: 'Mesado y Tablas de Corte'
      },
      {
        title: 'Fase 2: Encendido & Cocción Concurrente',
        timeFormatted: '00:20 - 01:10',
        description: `Iniciar cocciones principales en paralelo: ${stationDishes.map((d, i) => `Estación ${i + 1} (${d.cookingMethod}): ${d.name}`).join(' • ')}.`,
        targetHeat: 'Fogones, Olla y Horno en Paralelo'
      },
      {
        title: 'Fase 3: Chup-Chup, Reducción & Emulsión',
        timeFormatted: '01:10 - 01:45',
        description: 'Bajar fuego en guisos a punto lento tapado. Ligar salsas con majados o triturar cremas en caliente.',
        targetHeat: 'Fuego Lento & Varillas'
      },
      {
        title: 'Fase 4: Enfriamiento & Envasado Hermético',
        timeFormatted: '01:45 - 02:15',
        description: 'Atemperar 15 minutos. Rellenar fiambreras de cristal herméticas. Rotular fechas: Nevera (Días 1-3) y Congelador (Días 4+).',
        targetHeat: 'Envasado y Conservación'
      }
    ];
  }, [activeProject, stationDishes]);

  const currentPhase = parallelPhases[currentStepIndex] || parallelPhases[0];

  const handleSpeakStep = () => {
    if (!('speechSynthesis' in window)) return;
    if (isPlayingVoice) {
      window.speechSynthesis.cancel();
      setIsPlayingVoice(false);
      return;
    }

    const textToRead = `${currentPhase.title}. ${currentPhase.description}`;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = 'es-ES';
    utterance.rate = 0.95;
    utterance.onend = () => setIsPlayingVoice(false);
    utterance.onerror = () => setIsPlayingVoice(false);

    window.speechSynthesis.speak(utterance);
    setIsPlayingVoice(true);
  };

  return (
    <div className="w-full space-y-6 animate-fade-in pb-16 text-zinc-900 dark:text-zinc-100">
      
      {/* TOP COCKPIT HEADER */}
      <div className="glass-surface-elevated rounded-3xl p-5 sm:p-6 border border-zinc-200 dark:border-white/10 shadow-lg flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <button
            onClick={onBack}
            className="p-2.5 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider bg-rose-500/20 text-rose-400 border border-rose-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                Workout Culinario en Vivo
              </span>
              <span className="text-xs text-zinc-400 font-mono">{stationDishes.length} Estaciones Térmicas</span>
            </div>
            <h1 className="text-xl font-black text-zinc-900 dark:text-white mt-1">
              {activeProject.title}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSpeakStep}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              isPlayingVoice 
                ? 'bg-rose-500 text-white animate-pulse shadow-md' 
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-white'
            }`}
          >
            {isPlayingVoice ? <VolumeX size={15} /> : <Volume2 size={15} />}
            <span>{isPlayingVoice ? 'Detener Voz' : 'Leer Paso'}</span>
          </button>

          {onFinishCooking && (
            <button
              onClick={onFinishCooking}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-black text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Check size={15} strokeWidth={3} />
              <span>Finalizar Sesión</span>
            </button>
          )}
        </div>
      </div>

      {/* DYNAMIC STATION BURNER CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stationDishes.map((dish, idx) => {
          const isRunning = stationRunning[idx];
          const timerVal = stationTimers[idx] || 0;

          return (
            <div 
              key={dish.id || idx}
              onClick={() => toggleStation(idx)}
              className={`p-6 rounded-3xl border-2 transition-all cursor-pointer select-none space-y-4 ${
                isRunning 
                  ? 'bg-[#E07A5F]/15 border-[#E07A5F] shadow-lg scale-[1.01]' 
                  : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#E07A5F] flex items-center gap-1 truncate">
                    <Flame size={13} /> Estación {idx + 1} · {dish.cookingMethod}
                  </span>
                  <strong className="text-sm font-black text-zinc-900 dark:text-white block mt-0.5 truncate">
                    {dish.name}
                  </strong>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ml-2 shrink-0 ${isRunning ? 'bg-emerald-500/20 text-emerald-400' : 'bg-zinc-800 text-zinc-400'}`}>
                  {isRunning ? 'Activo' : 'Pausa'}
                </span>
              </div>

              <div className="text-center py-2">
                <span className="text-3xl font-black font-mono tracking-tight text-zinc-900 dark:text-white">
                  {formatTime(timerVal)}
                </span>
                <span className="text-[10px] text-zinc-400 uppercase tracking-wider block mt-1">
                  {dish.storageAdvice}
                </span>
              </div>

              <button 
                onClick={(e) => { e.stopPropagation(); addTime(idx, 300); }}
                className="w-full py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-xs font-bold text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer"
              >
                +5 Minutos
              </button>
            </div>
          );
        })}
      </div>

      {/* WORKOUT STEP NAVIGATOR CARD */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 shadow-lg space-y-6">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#E07A5F] bg-[#E07A5F]/10 px-3 py-1 rounded-full border border-[#E07A5F]/20">
            Paso {currentStepIndex + 1} de {parallelPhases.length}
          </span>
          <span className="text-xs font-mono font-bold text-zinc-400">
            {currentPhase.timeFormatted}
          </span>
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-black text-zinc-900 dark:text-white">
            {currentPhase.title}
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
            {currentPhase.description}
          </p>
        </div>

        <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
          <button
            disabled={currentStepIndex === 0}
            onClick={() => setCurrentStepIndex(i => Math.max(0, i - 1))}
            className="px-4 py-2 rounded-xl text-xs font-bold text-zinc-500 hover:text-zinc-900 dark:hover:text-white disabled:opacity-40 transition-colors cursor-pointer disabled:cursor-not-allowed"
          >
            ← Paso Anterior
          </button>

          <div className="flex gap-1.5">
            {parallelPhases.map((_, i) => (
              <span
                key={i}
                onClick={() => setCurrentStepIndex(i)}
                className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-all ${
                  i === currentStepIndex ? 'bg-[#E07A5F] w-6' : 'bg-zinc-300 dark:bg-zinc-700'
                }`}
              />
            ))}
          </div>

          <button
            disabled={currentStepIndex === parallelPhases.length - 1}
            onClick={() => setCurrentStepIndex(i => Math.min(parallelPhases.length - 1, i + 1))}
            className="btn-hero-copper text-white text-xs font-black px-5 py-2 rounded-xl shadow-xs transition-all disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
          >
            Siguiente Paso →
          </button>
        </div>
      </div>

    </div>
  );
}
