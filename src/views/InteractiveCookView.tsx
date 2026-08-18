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
  ChevronUp
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
  const [expandedProtocols, setExpandedProtocols] = useState<boolean>(true);

  // Timers for simultaneous zones
  // Timer 1: Guisos / Olla Principal (40 min)
  const [timer1, setTimer1] = useState<number>(40 * 60);
  const [isTimer1Running, setIsTimer1Running] = useState<boolean>(false);

  // Timer 2: Horno Asados (30 min)
  const [timer2, setTimer2] = useState<number>(30 * 60);
  const [isTimer2Running, setIsTimer2Running] = useState<boolean>(false);

  // Timer 3: Fuego Secundario / Cremas (20 min)
  const [timer3, setTimer3] = useState<number>(20 * 60);
  const [isTimer3Running, setIsTimer3Running] = useState<boolean>(false);

  // Stop any speech synthesis on unmount or mount
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

  // Timer countdowns
  useEffect(() => {
    let int1: any = null;
    if (isTimer1Running && timer1 > 0) {
      int1 = setInterval(() => setTimer1(t => (t > 0 ? t - 1 : 0)), 1000);
    }
    return () => clearInterval(int1);
  }, [isTimer1Running, timer1]);

  useEffect(() => {
    let int2: any = null;
    if (isTimer2Running && timer2 > 0) {
      int2 = setInterval(() => setTimer2(t => (t > 0 ? t - 1 : 0)), 1000);
    }
    return () => clearInterval(int2);
  }, [isTimer2Running, timer2]);

  useEffect(() => {
    let int3 = null;
    if (isTimer3Running && timer3 > 0) {
      int3 = setInterval(() => setTimer3(t => (t > 0 ? t - 1 : 0)), 1000);
    }
    return () => clearInterval(int3);
  }, [isTimer3Running, timer3]);

  // Construct parallel stages from active project dishes
  const dishes = activeProject?.dishes || [];
  
  const cookingSteps = [
    {
      stage: 'Fase 1: Puesta a punto & Mise en Place',
      title: 'Corte Unificado de Verduras, Sofrito Base y Encendido de Horno',
      description: 'Lavamos y picamos todas las verduras aromáticas en bloque. Encendemos el horno a 190°C y arrancamos la cazuela principal.',
      actions: [
        `Picar cebolla, puerros, ajos y zanahorias para ${dishes.map(d => d.name).slice(0, 3).join(', ')}.`,
        'Fuego 1 (Olla Principal): Sofreír cebolla y ajo con AOVE virgen extra.',
        'Horno: Precalentar a 190°C y forrar bandejas con papel vegetal.'
      ],
      tip: 'Cortar todas las verduras a la vez ahorra un 40% del tiempo de tabla y cuchillo.'
    },
    {
      stage: 'Fase 2: Cocción Paralela & Guisos Largos',
      title: 'Fuegos Simultáneos y Entrada de Bandejas al Horno',
      description: 'Los platos de larga cocción trabajan solos mientras avanzamos con las elaboraciones intermedias.',
      actions: [
        `Fuego 1: Incorporar ${dishes[0]?.name || 'legumbres/guiso'} con caldo y tapar a fuego suave (35-40 min).`,
        `Horno: Hornear ${dishes[2]?.name || 'asados de verduras y proteínas'} en bandeja superior durante 30 min.`,
        `Fuego 2: Arrancar ${dishes[1]?.name || 'segunda cazuela o crema'} a fuego medio.`
      ],
      tip: 'Mantén un hervor suave y tapado para concentrar aromas sin evaporar el caldo.'
    },
    {
      stage: 'Fase 3: Elaboraciones Rápidas & Triturado',
      title: 'Salteados Cortos, Pescados y Emulsión de Cremas',
      description: 'Completamos los platos rápidos que requieren poca cocción para preservar su textura.',
      actions: [
        `Fuego 3 / Plancha: Saltear o marcar ${dishes[3]?.name || 'pescados o salteados'} en 4-5 minutos.`,
        'Triturar finamente las cremas de verduras añadiendo un hilo de AOVE en crudo.',
        'Verificar el punto de sal y apagar fuegos para que los guisos reposen.'
      ],
      tip: 'El reposo de 10 minutos con el fuego apagado asienta los sabores del guiso.'
    },
    {
      stage: 'Fase 4: Porcionado, Enfriado & Cadena de Frío',
      title: 'Distribución en Tuppers y Almacenamiento Nevera / Congelador',
      description: 'Dejamos atemperar los alimentos y los porcionamos en recipientes herméticos para su conservación óptima.',
      actions: [
        'Dejar enfriar a temperatura ambiente antes de tapar para evitar condensación de vapor.',
        `Distribuir las ${activeProject?.totalServings || 40} raciones en tápers herméticos de cristal.`,
        'Guardar en Nevera (0-4°C) los platos de consumo para los primeros 3 días.',
        'Guardar en Congelador (-18°C) las raciones destinadas a los días 4 y 5.'
      ],
      tip: 'Etiqueta cada tupper con el plato y fecha para un consumo rotativo sin esfuerzo.'
    }
  ];

  const currentStep = cookingSteps[currentStepIndex];

  const handleSpeakCurrentStep = () => {
    if (!('speechSynthesis' in window)) return;

    if (isPlayingVoice) {
      window.speechSynthesis.cancel();
      setIsPlayingVoice(false);
      return;
    }

    const text = `${currentStep.stage}. ${currentStep.title}. ${currentStep.description}. Acciones: ${currentStep.actions.join('. ')}. Consejo: ${currentStep.tip}`;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    utterance.rate = 1.0;
    utterance.onstart = () => setIsPlayingVoice(true);
    utterance.onend = () => setIsPlayingVoice(false);
    utterance.onerror = () => setIsPlayingVoice(false);

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="space-y-4 animate-fade-in pb-12 text-zinc-900 dark:text-zinc-100 max-w-4xl mx-auto">
      
      {/* TOP HUD BAR */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl p-4 sm:p-5 border border-zinc-200 dark:border-zinc-800 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
            title="Volver al Panel"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <span className="text-[10px] font-bold bg-[#E07A5F]/10 text-[#E07A5F] dark:text-[#F4A261] px-2 py-0.5 rounded uppercase">
              Asistente de Cocina Simultánea
            </span>
            <h1 className="text-sm sm:text-base font-black text-zinc-900 dark:text-white mt-0.5">
              {activeProject?.title || 'Sesión de Batch Cooking'}
            </h1>
          </div>
        </div>

        {/* Voice Cue Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleSpeakCurrentStep}
            className={`p-2.5 rounded-xl border font-bold text-xs flex items-center gap-1.5 transition-all ${
              isPlayingVoice 
                ? 'bg-[#E07A5F] text-white border-[#E07A5F] animate-pulse' 
                : 'bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:border-[#E07A5F]'
            }`}
            title="Asistente de voz"
          >
            {isPlayingVoice ? <Volume2 size={16} /> : <VolumeX size={16} />}
            <span className="hidden sm:inline">{isPlayingVoice ? 'Pausar Voz' : 'Leer en Voz Alta'}</span>
          </button>
        </div>
      </div>

      {/* 3 SIMULTANEOUS TIMERS BAR */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        
        {/* Timer 1: Olla / Fuego 1 */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 space-y-2 shadow-xs">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
              <Flame size={14} className="text-amber-500" />
              Fuego 1 (Olla Principal)
            </span>
            <span className="text-[10px] font-mono text-zinc-400">Guisos</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xl font-mono font-black text-zinc-900 dark:text-white">
              {formatTime(timer1)}
            </span>
            <div className="flex gap-1">
              <button
                onClick={() => setIsTimer1Running(!isTimer1Running)}
                className={`p-2 rounded-xl font-bold text-xs ${
                  isTimer1Running ? 'bg-amber-500 text-white' : 'bg-[#E07A5F] text-white'
                }`}
              >
                {isTimer1Running ? <Pause size={14} /> : <Play size={14} />}
              </button>
              <button
                onClick={() => { setIsTimer1Running(false); setTimer1(40 * 60); }}
                className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-zinc-900"
              >
                <RotateCcw size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Timer 2: Horno */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 space-y-2 shadow-xs">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
              <Flame size={14} className="text-rose-500" />
              Horno (190°C)
            </span>
            <span className="text-[10px] font-mono text-zinc-400">Asados</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xl font-mono font-black text-zinc-900 dark:text-white">
              {formatTime(timer2)}
            </span>
            <div className="flex gap-1">
              <button
                onClick={() => setIsTimer2Running(!isTimer2Running)}
                className={`p-2 rounded-xl font-bold text-xs ${
                  isTimer2Running ? 'bg-amber-500 text-white' : 'bg-[#E07A5F] text-white'
                }`}
              >
                {isTimer2Running ? <Pause size={14} /> : <Play size={14} />}
              </button>
              <button
                onClick={() => { setIsTimer2Running(false); setTimer2(30 * 60); }}
                className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-zinc-900"
              >
                <RotateCcw size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Timer 3: Fuego 2 / Cremas */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 space-y-2 shadow-xs">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
              <Flame size={14} className="text-cyan-500" />
              Fuego 2 / Cazo
            </span>
            <span className="text-[10px] font-mono text-zinc-400">Cremas</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xl font-mono font-black text-zinc-900 dark:text-white">
              {formatTime(timer3)}
            </span>
            <div className="flex gap-1">
              <button
                onClick={() => setIsTimer3Running(!isTimer3Running)}
                className={`p-2 rounded-xl font-bold text-xs ${
                  isTimer3Running ? 'bg-amber-500 text-white' : 'bg-[#E07A5F] text-white'
                }`}
              >
                {isTimer3Running ? <Pause size={14} /> : <Play size={14} />}
              </button>
              <button
                onClick={() => { setIsTimer3Running(false); setTimer3(20 * 60); }}
                className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-zinc-900"
              >
                <RotateCcw size={14} />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* PHASE PROGRESS STEPPER */}
      <div className="grid grid-cols-4 gap-2">
        {cookingSteps.map((s, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentStepIndex(idx)}
            className={`p-3 rounded-2xl border text-center transition-all ${
              currentStepIndex === idx
                ? 'bg-[#E07A5F] text-white border-[#E07A5F] font-black shadow-xs'
                : idx < currentStepIndex
                  ? 'bg-[#E07A5F]/10 border-[#E07A5F]/30 text-zinc-900 dark:text-zinc-100 font-bold'
                  : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-400'
            }`}
          >
            <div className="text-[10px] uppercase">Paso {idx + 1}</div>
            <div className="text-xs font-bold truncate mt-0.5">{s.title.split(',')[0]}</div>
          </button>
        ))}
      </div>

      {/* MAIN ACTIVE STEP CARD */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6 sm:p-7 shadow-xs space-y-6 animate-slide-up">
        
        <div>
          <span className="text-[10px] font-bold text-[#E07A5F] dark:text-[#F4A261] uppercase tracking-wider bg-[#E07A5F]/10 px-2.5 py-0.5 rounded-full">
            {currentStep.stage}
          </span>
          <h2 className="text-lg sm:text-xl font-black text-zinc-900 dark:text-white mt-1.5">
            {currentStep.title}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
            {currentStep.description}
          </p>
        </div>

        {/* Action Checklist */}
        <div className="space-y-2.5">
          <h3 className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
            Acciones a ejecutar en esta fase:
          </h3>
          <div className="space-y-2">
            {currentStep.actions.map((act, i) => (
              <div 
                key={i}
                className="p-3.5 bg-zinc-50 dark:bg-zinc-800/60 rounded-2xl border border-zinc-200 dark:border-zinc-700/60 flex items-start gap-3"
              >
                <div className="w-5 h-5 rounded-lg bg-[#E07A5F]/15 text-[#E07A5F] dark:text-[#F4A261] font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <p className="text-xs font-medium text-zinc-800 dark:text-zinc-200 leading-snug">
                  {act}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Pro Tip Callout */}
        <div className="p-3.5 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-start gap-2.5 text-xs text-amber-900 dark:text-amber-200">
          <Sparkles size={16} className="text-amber-500 shrink-0 mt-0.5" />
          <div>
            <strong>Consejo Maestro:</strong> {currentStep.tip}
          </div>
        </div>

        {/* STEP 4 CONSERVATION ACCORDION */}
        {currentStepIndex === 3 && (
          <div className="border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 bg-zinc-50 dark:bg-zinc-800/40 space-y-3">
            <div 
              onClick={() => setExpandedProtocols(!expandedProtocols)}
              className="flex items-center justify-between cursor-pointer select-none"
            >
              <div className="flex items-center gap-2">
                <Refrigerator size={16} className="text-[#E07A5F]" />
                <h4 className="text-xs font-bold text-zinc-900 dark:text-white">
                  Guía de Conservación y Caducidad
                </h4>
              </div>
              {expandedProtocols ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>

            {expandedProtocols && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs">
                <div className="p-3 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-700/60 space-y-1">
                  <div className="flex items-center gap-1.5 text-[#E07A5F] dark:text-[#F4A261] font-bold">
                    <Refrigerator size={13} />
                    <span>Nevera (Días 1 a 3)</span>
                  </div>
                  <p className="text-[11px] text-zinc-500">
                    Cremas, pescados horneados y verduras salteadas. Consumir dentro de 72 horas para máxima textura.
                  </p>
                </div>

                <div className="p-3 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-700/60 space-y-1">
                  <div className="flex items-center gap-1.5 text-cyan-500 font-bold">
                    <Snowflake size={13} />
                    <span>Congelador (Días 4+)</span>
                  </div>
                  <p className="text-[11px] text-zinc-500">
                    Guisos de legumbres y carnes estofadas. Descongelar en nevera 24 horas antes de su consumo.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEPPER NAVIGATION BUTTONS */}
        <div className="flex items-center justify-between pt-3 border-t border-zinc-100 dark:border-zinc-800">
          <button
            onClick={() => setCurrentStepIndex(Math.max(0, currentStepIndex - 1))}
            disabled={currentStepIndex === 0}
            className="px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-xs font-bold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Fase Anterior
          </button>

          {currentStepIndex < cookingSteps.length - 1 ? (
            <button
              onClick={() => setCurrentStepIndex(currentStepIndex + 1)}
              className="bg-[#E07A5F] hover:bg-[#c96a50] text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-xs transition-all flex items-center gap-1.5 active:scale-95"
            >
              <span>Siguiente Fase</span>
              <ArrowRight size={14} />
            </button>
          ) : (
            <button
              onClick={onFinishCooking}
              className="bg-[#E07A5F] hover:bg-[#f4a261] text-white font-black text-xs px-6 py-3 rounded-xl shadow-md transition-all flex items-center gap-2 active:scale-95 animate-pulse"
            >
              <CheckCircle2 size={16} />
              <span>Terminar Sesión y Guardar en Nevera</span>
            </button>
          )}
        </div>

      </div>

    </div>
  );
}
