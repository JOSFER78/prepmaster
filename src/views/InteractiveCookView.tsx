import React, { useState, useEffect } from 'react';
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
  UtensilsCrossed
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
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlayingVoice, setIsPlayingVoice] = useState<boolean>(false);
  const [isVoiceActive, setIsVoiceActive] = useState<boolean>(false);

  // 4 CONCURRENT HEAT ZONES (APPLE FITNESS+ / PELOTON COCKPIT)
  // Zone 1: Olla Principal (Guiso)
  const [t1, setT1] = useState<number>(38 * 60);
  const [t1Running, setT1Running] = useState<boolean>(true);

  // Zone 2: Horno Asados
  const [t2, setT2] = useState<number>(45 * 60);
  const [t2Running, setT2Running] = useState<boolean>(true);

  // Zone 3: Plancha / Salteado
  const [t3, setT3] = useState<number>(14 * 60);
  const [t3Running, setT3Running] = useState<boolean>(false);

  // Zone 4: Cazo / Cremas
  const [t4, setT4] = useState<number>(20 * 60);
  const [t4Running, setT4Running] = useState<boolean>(false);

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
      if (t1Running) setT1(v => (v > 0 ? v - 1 : 0));
      if (t2Running) setT2(v => (v > 0 ? v - 1 : 0));
      if (t3Running) setT3(v => (v > 0 ? v - 1 : 0));
      if (t4Running) setT4(v => (v > 0 ? v - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [t1Running, t2Running, t3Running, t4Running]);

  // Master Orchestration Steps
  const parallelPhases = [
    {
      title: 'Fase 1: Mise en Place Unificada & Corte',
      timeFormatted: '00:00 - 00:20',
      description: 'Picar todas las cebollas, ajos, pimientos y tubérculos. Separar en cuencos antes de encender un solo fuego.',
      targetHeat: 'Mesado y Tablas de Corte'
    },
    {
      title: 'Fase 2: Encendido & Cocción Concurrente (4 Fuegos)',
      timeFormatted: '00:20 - 01:10',
      description: 'Meter bandeja de tubérculos al horno (190°C). Sofreír base de lentejas en olla grande y sellar proteínas en sartén.',
      targetHeat: 'Horno 190°C + Olla Nivel 4 + Plancha Nivel 7'
    },
    {
      title: 'Fase 3: Chup-Chup, Emulsión & Reducción',
      timeFormatted: '01:10 - 01:45',
      description: 'Bajar guiso a fuego lento tapado. Cocer crema de calabaza en cazo y triturar en caliente.',
      targetHeat: 'Guiso Fuego 2 + Cazo Fuego 4'
    },
    {
      title: 'Fase 4: Enfriamiento Rápido & Envasado Hermético',
      timeFormatted: '01:45 - 02:15',
      description: 'Dejar atemperar 15 min. Rellenar tuppers de cristal. Guardar días 1-3 en nevera y días 4+ en congelador.',
      targetHeat: 'Envasado y Conservación'
    }
  ];

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
              <span className="text-xs text-zinc-400 font-mono">4 Estaciones Térmicas</span>
            </div>
            <h1 className="text-xl font-black text-zinc-900 dark:text-white mt-1">
              {activeProject ? activeProject.title : 'Sesión Batch Cooking en Paralelo'}
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

      {/* 4 ZONE BURNER CARDS (GIANT SLAP HITBOXES FOR DIRTY HANDS) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        
        {/* ZONE 1: OLLA GUISOS */}
        <div 
          onClick={() => setT1Running(!t1Running)}
          className={`p-6 rounded-3xl border-2 transition-all cursor-pointer select-none space-y-4 ${
            t1Running 
              ? 'bg-[#E07A5F]/15 border-[#E07A5F] shadow-lg scale-[1.01]' 
              : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800'
          }`}
        >
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-[#E07A5F] flex items-center gap-1">
                <Flame size={13} /> Fuego 1 · Olla Principal
              </span>
              <strong className="text-sm font-black text-zinc-900 dark:text-white block mt-0.5">
                Guiso de Legumbres
              </strong>
            </div>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${t1Running ? 'bg-emerald-500/20 text-emerald-400' : 'bg-zinc-800 text-zinc-400'}`}>
              {t1Running ? 'Activo' : 'Pausa'}
            </span>
          </div>

          <div className="text-center py-2">
            <span className="text-3xl font-black font-mono tracking-tight text-zinc-900 dark:text-white">
              {formatTime(t1)}
            </span>
            <span className="text-[10px] text-zinc-400 uppercase tracking-wider block mt-1">
              Chup-chup suave (Nivel 3/9)
            </span>
          </div>

          <button 
            onClick={(e) => { e.stopPropagation(); setT1(v => v + 300); }}
            className="w-full py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 text-xs font-bold text-zinc-700 dark:text-zinc-300 transition-colors"
          >
            +5 Minutos
          </button>
        </div>

        {/* ZONE 2: HORNO ASADOS */}
        <div 
          onClick={() => setT2Running(!t2Running)}
          className={`p-6 rounded-3xl border-2 transition-all cursor-pointer select-none space-y-4 ${
            t2Running 
              ? 'bg-amber-500/15 border-amber-500 shadow-lg scale-[1.01]' 
              : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800'
          }`}
        >
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 flex items-center gap-1">
                <Zap size={13} /> Fuego 2 · Horno
              </span>
              <strong className="text-sm font-black text-zinc-900 dark:text-white block mt-0.5">
                Asado de Tubérculos & Carnes
              </strong>
            </div>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${t2Running ? 'bg-emerald-500/20 text-emerald-400' : 'bg-zinc-800 text-zinc-400'}`}>
              {t2Running ? '190°C' : 'Pausa'}
            </span>
          </div>

          <div className="text-center py-2">
            <span className="text-3xl font-black font-mono tracking-tight text-zinc-900 dark:text-white">
              {formatTime(t2)}
            </span>
            <span className="text-[10px] text-zinc-400 uppercase tracking-wider block mt-1">
              Convección + Calor Arriba
            </span>
          </div>

          <button 
            onClick={(e) => { e.stopPropagation(); setT2(v => v + 300); }}
            className="w-full py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 text-xs font-bold text-zinc-700 dark:text-zinc-300 transition-colors"
          >
            +5 Minutos
          </button>
        </div>

        {/* ZONE 3: PLANCHA / SARTEN */}
        <div 
          onClick={() => setT3Running(!t3Running)}
          className={`p-6 rounded-3xl border-2 transition-all cursor-pointer select-none space-y-4 ${
            t3Running 
              ? 'bg-emerald-500/15 border-emerald-500 shadow-lg scale-[1.01]' 
              : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800'
          }`}
        >
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                <Flame size={13} /> Fuego 3 · Plancha / Sartén
              </span>
              <strong className="text-sm font-black text-zinc-900 dark:text-white block mt-0.5">
                Salteado & Sellado
              </strong>
            </div>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${t3Running ? 'bg-emerald-500/20 text-emerald-400' : 'bg-zinc-800 text-zinc-400'}`}>
              {t3Running ? 'Activo' : 'Standby'}
            </span>
          </div>

          <div className="text-center py-2">
            <span className="text-3xl font-black font-mono tracking-tight text-zinc-900 dark:text-white">
              {formatTime(t3)}
            </span>
            <span className="text-[10px] text-zinc-400 uppercase tracking-wider block mt-1">
              Fuego Vivo (Nivel 7/9)
            </span>
          </div>

          <button 
            onClick={(e) => { e.stopPropagation(); setT3(v => v + 120); }}
            className="w-full py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 text-xs font-bold text-zinc-700 dark:text-zinc-300 transition-colors"
          >
            +2 Minutos
          </button>
        </div>

        {/* ZONE 4: CAZO / CREMAS */}
        <div 
          onClick={() => setT4Running(!t4Running)}
          className={`p-6 rounded-3xl border-2 transition-all cursor-pointer select-none space-y-4 ${
            t4Running 
              ? 'bg-indigo-500/15 border-indigo-500 shadow-lg scale-[1.01]' 
              : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800'
          }`}
        >
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-indigo-400 flex items-center gap-1">
                <UtensilsCrossed size={13} /> Fuego 4 · Cazo Cremas
              </span>
              <strong className="text-sm font-black text-zinc-900 dark:text-white block mt-0.5">
                Crema de Verduras
              </strong>
            </div>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${t4Running ? 'bg-emerald-500/20 text-emerald-400' : 'bg-zinc-800 text-zinc-400'}`}>
              {t4Running ? 'Activo' : 'Standby'}
            </span>
          </div>

          <div className="text-center py-2">
            <span className="text-3xl font-black font-mono tracking-tight text-zinc-900 dark:text-white">
              {formatTime(t4)}
            </span>
            <span className="text-[10px] text-zinc-400 uppercase tracking-wider block mt-1">
              Hervor Suave (Nivel 4/9)
            </span>
          </div>

          <button 
            onClick={(e) => { e.stopPropagation(); setT4(v => v + 300); }}
            className="w-full py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 text-xs font-bold text-zinc-700 dark:text-zinc-300 transition-colors"
          >
            +5 Minutos
          </button>
        </div>

      </div>

      {/* PHASE STEPPER CAROUSEL */}
      <div className="glass-surface-elevated rounded-3xl p-6 sm:p-8 border border-zinc-200 dark:border-white/10 shadow-md space-y-6">
        
        <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-4">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider bg-[#E07A5F]/20 text-[#E07A5F] px-2.5 py-0.5 rounded-md">
              Paso {currentStepIndex + 1} de {parallelPhases.length}
            </span>
            <h2 className="text-lg sm:text-xl font-black text-zinc-900 dark:text-white mt-1">
              {currentPhase.title}
            </h2>
          </div>
          <span className="text-xs font-mono font-bold text-zinc-400">
            {currentPhase.timeFormatted}
          </span>
        </div>

        <p className="text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed max-w-4xl">
          {currentPhase.description}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800">
          <button
            disabled={currentStepIndex === 0}
            onClick={() => setCurrentStepIndex(i => Math.max(0, i - 1))}
            className="px-5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs font-bold disabled:opacity-40 cursor-pointer"
          >
            ← Paso Anterior
          </button>

          <div className="flex gap-1.5">
            {parallelPhases.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentStepIndex(idx)}
                className={`w-3 h-3 rounded-full transition-all ${
                  idx === currentStepIndex 
                    ? 'bg-[#E07A5F] scale-125' 
                    : 'bg-zinc-300 dark:bg-zinc-700'
                }`}
              />
            ))}
          </div>

          <button
            disabled={currentStepIndex === parallelPhases.length - 1}
            onClick={() => setCurrentStepIndex(i => Math.min(parallelPhases.length - 1, i + 1))}
            className="px-5 py-2.5 btn-hero-copper text-white rounded-xl text-xs font-bold disabled:opacity-40 cursor-pointer"
          >
            Siguiente Paso →
          </button>
        </div>

      </div>

    </div>
  );
}
