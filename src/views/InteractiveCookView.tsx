import React, { useState, useEffect } from 'react';
import { Play, Pause, ChevronRight, Volume2, VolumeX, CheckCircle2, Clock, Mic, Sparkles, ArrowLeft, Flame, ArrowRight, Layers, AlertCircle } from 'lucide-react';

interface InteractiveCookViewProps {
  dishName?: string;
  onBack: () => void;
}

export function InteractiveCookView({ dishName = 'Lote de 25 Raciones: Guisos, Ternera, Pescado & Cremas (Batch Cooking)', onBack }: InteractiveCookViewProps) {
  const [subStep, setSubStep] = useState<1 | 2 | 3 | 4>(1); // 1: Resumen de Fuego, 2: Guía Simultánea, 3: Asistente Voz, 4: Envasado
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlayingVoice, setIsPlayingVoice] = useState<boolean>(false);
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(true);
  
  // Independent timers for simultaneous cooking zones
  const [timerZone1, setTimerZone1] = useState<number | null>(null); // Fuego 1 (Ej: Sofrito Lentejas)
  const [timerZone2, setTimerZone2] = useState<number | null>(null); // Fuego 2 (Ej: Ternera Mechada)
  const [isTimer1Running, setIsTimer1Running] = useState<boolean>(false);
  const [isTimer2Running, setIsTimer2Running] = useState<boolean>(false);

  // Interleaved steps for parallel batch cooking
  const steps = [
    {
      stage: 'Fase 1: Preparación Inicial & Encendido de Fuegos',
      title: 'Mise en Place & Arranque Doble de Sofrito y Horno',
      simultaneousActions: [
        'Fuego 1 (Cazuela Grande): Picar cebolla y ajo, sofreír a fuego lento (3/10) para la base de las 8 raciones de Lentejas.',
        'Horno / Plancha (Fuego 2): Precalentar a 200°C o secar y sellar la pieza de Ternera Mechada a fuego vivo (9/10).',
        'Paso Entrelazado: Mientras la cebolla se pocha lentamente en el Fuego 1, corta las verduras para las Cremas.'
      ],
      timerMinutesZone1: 15,
      timerMinutesZone2: 10,
      tipText: 'Añade sal a la cebolla desde el principio para acelerar la sudoración osmótica sin subir el fuego.'
    },
    {
      stage: 'Fase 2: Cocción Paralela Principal',
      title: 'Incorporación de Legumbres y Guisado Paralelo',
      simultaneousActions: [
        'Fuego 1: Desglasar sofrito con vino blanco, vertir las Lentejas y el Caldo de Ave. Tapar a fuego medio (4/10).',
        'Fuego 2: Sellar la Ternera por sus 4 caras hasta formar costra crujiente, luego cubrir con vino y caldo para guisar a fuego suave.',
        'Paso Entrelazado: Mientras ambos guisos hierven a fuego lento, lava y corta el mix de ensaladas y guarniciones frescas.'
      ],
      timerMinutesZone1: 30,
      timerMinutesZone2: 40,
      tipText: 'Mantén el hervor a fuego suave (3-4/10). Un hervor violento rompe la piel de las legumbres y endurece las fibras carnes.'
    },
    {
      stage: 'Fase 3: Platos de Rápida Cocción & Pescado',
      title: 'Plancha Rápida para Merluza en Salsa Verde',
      simultaneousActions: [
        'Fuego 3 (Sartén Ancha): Marcar los lomos de Merluza con ajo y perejil picado durante 3 minutos por lado.',
        'Fuego 1 y 2: Comprobar textura de las Lentejas y Ternera. Apagar fuegos cuando el caldo reduzca y adquiera cuerpo.',
        'Paso Entrelazado: Emplatar raciones directas o disponer contenedores de vidrio para enfriar.'
      ],
      timerMinutesZone1: 10,
      timerMinutesZone2: 10,
      tipText: 'El pescado debe retirarse 1 minuto antes de su punto ideal; el calor residual dentro del contenedor terminará de cocinarlo.'
    },
    {
      stage: 'Fase 4: Porcionado, Enfriado & Envasado al Vacío',
      title: 'Abatimiento Térmico & Etiquetado de Raciones',
      simultaneousActions: [
        'Atemperar la comida a menos de 20°C antes de meter en contenedores herméticos o bolsas de vacío.',
        'Porcionar las 25 raciones según el plan consolidado (8 Lentejas, 8 Ternera, 5 Merluza, 4 Cremas).',
        'Etiquetar con la fecha de preparación y caducidad sugerida (7-10 días en refrigerador a 2°C).'
      ],
      timerMinutesZone1: 15,
      timerMinutesZone2: 5,
      tipText: 'Nunca guardes los recipientes calientes directos al refrigerador para evitar condensación y proliferación bacteriana.'
    }
  ];

  const currentStep = steps[currentStepIndex];

  // Speech synthesis helper
  const speakInstruction = (text: string) => {
    if (!voiceEnabled || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    utterance.rate = 1.0;
    utterance.onstart = () => setIsPlayingVoice(true);
    utterance.onend = () => setIsPlayingVoice(false);
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (voiceEnabled) {
      speakInstruction(`${currentStep.stage}. ${currentStep.title}. Comienza ejecutando las acciones simultáneas en tus fuegos.`);
    }
  }, [currentStepIndex, voiceEnabled]);

  // Timers countdown handlers
  useEffect(() => {
    let int1: any = null;
    if (isTimer1Running && timerZone1 !== null && timerZone1 > 0) {
      int1 = setInterval(() => setTimerZone1(p => (p && p > 0 ? p - 1 : 0)), 1000);
    } else if (timerZone1 === 0) {
      setIsTimer1Running(false);
      speakInstruction('¡Atención! El temporizador del Fuego 1 ha finalizado.');
    }
    return () => clearInterval(int1);
  }, [isTimer1Running, timerZone1]);

  useEffect(() => {
    let int2: any = null;
    if (isTimer2Running && timerZone2 !== null && timerZone2 > 0) {
      int2 = setInterval(() => setTimerZone2(p => (p && p > 0 ? p - 1 : 0)), 1000);
    } else if (timerZone2 === 0) {
      setIsTimer2Running(false);
      speakInstruction('¡Atención! El temporizador del Fuego 2 ha finalizado.');
    }
    return () => clearInterval(int2);
  }, [isTimer2Running, timerZone2]);

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="space-y-3 animate-fade-in pb-2">
      {/* Header Bar */}
      <div className="bg-gradient-to-r from-primary-container/40 via-surface to-secondary-container/40 rounded-2xl p-2.5 border border-outline-variant/30 space-y-1.5 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={onBack}
              className="w-7 h-7 rounded-lg bg-surface border border-outline-variant/30 flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-colors"
            >
              <ArrowLeft size={16} />
            </button>
            <div className="w-6 h-6 rounded-lg bg-primary text-on-primary font-black flex items-center justify-center text-xs">
              3
            </div>
            <div>
              <h1 className="text-xs font-bold text-on-surface leading-none">
                {subStep === 1 ? 'Paso 1: Orquestación de Fuegos Simultáneos' :
                 subStep === 2 ? 'Paso 2: Guía de Cocinado Entrelazado' :
                 subStep === 3 ? 'Paso 3: Asistente de Voz Manos Libres' :
                 'Paso 4: Porcionado & Envasado al Vacío'}
              </h1>
              <p className="text-[10px] text-on-surface-variant mt-0.5 truncate max-w-xs">
                {dishName}
              </p>
            </div>
          </div>

          <button
            onClick={() => setVoiceEnabled(!voiceEnabled)}
            className={`px-2 py-1 rounded-xl text-xs font-bold flex items-center gap-1 transition-all ${
              voiceEnabled ? 'bg-primary text-on-primary shadow-xs' : 'bg-surface-container text-on-surface-variant'
            }`}
          >
            {voiceEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
            <span>{voiceEnabled ? 'Voz ON' : 'Voz Mute'}</span>
          </button>
        </div>

        {/* 4 Steps Navigation Pill Bar */}
        <div className="flex items-center justify-between gap-1 pt-1 border-t border-outline-variant/20">
          <span className="text-[9px] font-bold text-on-surface-variant uppercase">Cocina Simultánea:</span>
          <div className="flex items-center gap-1 flex-1 justify-end">
            {[
              { num: 1, label: 'Fuegos' },
              { num: 2, label: 'Entrelazado' },
              { num: 3, label: 'Voz' },
              { num: 4, label: 'Envasado' }
            ].map((s) => (
              <button
                key={s.num}
                onClick={() => setSubStep(s.num as any)}
                className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-all ${
                  subStep === s.num 
                    ? 'bg-primary text-on-primary shadow-xs' 
                    : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                3.{s.num} {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sub-step 3.1: Overview of Simultaneous Cooking Zones */}
      {subStep === 1 && (
        <div className="bg-surface rounded-2xl p-3 border border-outline-variant/30 space-y-3 shadow-xs animate-fade-in">
          <div className="flex items-center justify-between border-b border-outline-variant/20 pb-1.5">
            <h2 className="text-xs font-extrabold text-on-surface flex items-center gap-1.5">
              <Flame className="text-primary" size={16} />
              Orquestación de Fuegos Simultáneos (25 Raciones Totales)
            </h2>
            <span className="text-[10px] font-bold bg-primary-container text-on-primary-container px-2 py-0.5 rounded-full">
              4 Platos Paralelos
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="bg-surface-container/60 p-2.5 rounded-xl border border-outline-variant/30 space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-xs font-extrabold text-primary flex items-center gap-1">
                  🔥 Fuego 1 (Cazuela Grande)
                </span>
                <span className="text-[10px] font-bold text-on-surface-variant">8 Raciones</span>
              </div>
              <p className="text-xs font-bold text-on-surface">Lentejas Pardinas Estofadas</p>
              <p className="text-[10px] text-on-surface-variant">Cocción lenta a fuego constante (4/10) ~ 35 min.</p>
            </div>

            <div className="bg-surface-container/60 p-2.5 rounded-xl border border-outline-variant/30 space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-xs font-extrabold text-secondary flex items-center gap-1">
                  🔥 Fuego 2 (Cazuela de Hierro)
                </span>
                <span className="text-[10px] font-bold text-on-surface-variant">8 Raciones</span>
              </div>
              <p className="text-xs font-bold text-on-surface">Ternera Mechada con Verduras</p>
              <p className="text-[10px] text-on-surface-variant">Sellado fuerte (9/10) y guisado con vino blanco ~ 45 min.</p>
            </div>

            <div className="bg-surface-container/60 p-2.5 rounded-xl border border-outline-variant/30 space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-xs font-extrabold text-emerald-800 flex items-center gap-1">
                  🔥 Fuego 3 (Sartén Ancha)
                </span>
                <span className="text-[10px] font-bold text-on-surface-variant">5 Raciones</span>
              </div>
              <p className="text-xs font-bold text-on-surface">Merluza en Salsa Verde con Almejas</p>
              <p className="text-[10px] text-on-surface-variant">Marcado rápido en la fase final ~ 12 min.</p>
            </div>

            <div className="bg-surface-container/60 p-2.5 rounded-xl border border-outline-variant/30 space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-xs font-extrabold text-amber-800 flex items-center gap-1">
                  🥗 Zona Fría / Tabla
                </span>
                <span className="text-[10px] font-bold text-on-surface-variant">4 Raciones</span>
              </div>
              <p className="text-xs font-bold text-on-surface">Cremas de Verdura y Ensaladas</p>
              <p className="text-[10px] text-on-surface-variant">Picado entrelazado durante los tiempos de espera de hervor.</p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-outline-variant/20">
            <span className="text-[10px] text-on-surface-variant">
              Tiempo estimado total de cocinado: <strong>1h 15 min</strong>
            </span>
            <button
              onClick={() => setSubStep(2)}
              className="bg-primary text-on-primary py-1.5 px-3 rounded-xl font-bold text-xs flex items-center gap-1 shadow-xs hover:bg-primary/90 transition-all"
            >
              Iniciar Guía Entrelazada
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Sub-step 3.2: Interleaved Guided Step-by-Step with Dual Zone Timers */}
      {subStep === 2 && (
        <div className="bg-surface rounded-2xl p-3 border border-outline-variant/30 space-y-3 shadow-xs animate-fade-in">
          {/* Phase Header */}
          <div className="flex items-center justify-between border-b border-outline-variant/20 pb-1.5">
            <span className="text-[10px] font-extrabold text-primary bg-primary-container/40 px-2 py-0.5 rounded-md uppercase">
              {currentStep.stage}
            </span>
            <span className="text-[10px] font-bold text-on-surface-variant">
              Etapa {currentStepIndex + 1} de {steps.length}
            </span>
          </div>

          <div>
            <h2 className="text-sm font-extrabold text-on-surface">{currentStep.title}</h2>
          </div>

          {/* Interleaved Simultaneous Action Cards */}
          <div className="space-y-1.5">
            <p className="text-[11px] font-bold text-on-surface flex items-center gap-1">
              <Layers size={14} className="text-primary" />
              Acciones Simultáneas en Paralelo:
            </p>
            {currentStep.simultaneousActions.map((act, idx) => (
              <div key={idx} className="bg-surface-container/60 p-2.5 rounded-xl border border-outline-variant/30 text-xs text-on-surface leading-relaxed flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-primary text-on-primary text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span>{act}</span>
              </div>
            ))}
          </div>

          {/* Dual Independent Timers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-surface-container/40 p-2 rounded-xl border border-outline-variant/20">
            <div className="flex items-center justify-between bg-surface p-2 rounded-lg border border-outline-variant/30">
              <div>
                <p className="text-[10px] font-bold text-primary">Timer Fuego 1 (Lentejas)</p>
                <p className="text-xs font-bold text-on-surface">
                  {timerZone1 !== null ? formatTimer(timerZone1) : `${currentStep.timerMinutesZone1} min`}
                </p>
              </div>
              <button
                onClick={() => {
                  if (timerZone1 === null) setTimerZone1(currentStep.timerMinutesZone1 * 60);
                  setIsTimer1Running(!isTimer1Running);
                }}
                className="bg-primary text-on-primary px-2.5 py-1 rounded-lg text-xs font-bold shadow-2xs"
              >
                {isTimer1Running ? 'Pausar' : 'Iniciar'}
              </button>
            </div>

            <div className="flex items-center justify-between bg-surface p-2 rounded-lg border border-outline-variant/30">
              <div>
                <p className="text-[10px] font-bold text-secondary">Timer Fuego 2 (Ternera)</p>
                <p className="text-xs font-bold text-on-surface">
                  {timerZone2 !== null ? formatTimer(timerZone2) : `${currentStep.timerMinutesZone2} min`}
                </p>
              </div>
              <button
                onClick={() => {
                  if (timerZone2 === null) setTimerZone2(currentStep.timerMinutesZone2 * 60);
                  setIsTimer2Running(!isTimer2Running);
                }}
                className="bg-secondary text-on-secondary px-2.5 py-1 rounded-lg text-xs font-bold shadow-2xs"
              >
                {isTimer2Running ? 'Pausar' : 'Iniciar'}
              </button>
            </div>
          </div>

          {/* Professional Tip */}
          <div className="bg-amber-50 border border-amber-200 p-2 rounded-xl text-xs text-amber-950 flex items-start gap-1.5">
            <AlertCircle size={15} className="text-amber-700 shrink-0 mt-0.5" />
            <p><strong>Consejo Técnico de Sazón:</strong> {currentStep.tipText}</p>
          </div>

          {/* Stepper Controls */}
          <div className="flex items-center justify-between pt-1 border-t border-outline-variant/20">
            <button
              onClick={() => setCurrentStepIndex(Math.max(0, currentStepIndex - 1))}
              disabled={currentStepIndex === 0}
              className="bg-surface-container border border-outline-variant/30 text-on-surface py-1.5 px-3 rounded-xl font-bold text-xs disabled:opacity-40"
            >
              ← Etapa Anterior
            </button>
            
            {currentStepIndex < steps.length - 1 ? (
              <button
                onClick={() => setCurrentStepIndex(currentStepIndex + 1)}
                className="bg-primary text-on-primary py-1.5 px-3 rounded-xl font-bold text-xs flex items-center gap-1 shadow-xs hover:bg-primary/90 transition-all"
              >
                Siguiente Etapa
                <ArrowRight size={14} />
              </button>
            ) : (
              <button
                onClick={() => setSubStep(4)}
                className="bg-primary text-on-primary py-1.5 px-3 rounded-xl font-bold text-xs flex items-center gap-1 shadow-xs hover:bg-primary/90 transition-all"
              >
                Finalizar e Ir a Envasado
                <ArrowRight size={14} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Sub-step 3.3: Voice Commands & Hands-Free Interaction */}
      {subStep === 3 && (
        <div className="bg-surface rounded-2xl p-3 border border-outline-variant/30 space-y-3 shadow-xs animate-fade-in">
          <div className="flex items-center justify-between border-b border-outline-variant/20 pb-1.5">
            <h3 className="text-xs font-bold text-on-surface flex items-center gap-1.5">
              <Mic className="text-primary" size={16} />
              Asistente de Voz Manos Libres en Cocina
            </h3>
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
              Escucha Activa
            </span>
          </div>

          <div className="bg-surface-container/60 p-4 rounded-xl border border-outline-variant/30 text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto animate-pulse">
              <Mic size={24} />
            </div>
            <p className="text-xs font-extrabold text-on-surface">"Dictando pasos y respondiendo tus comandos de voz..."</p>
            <p className="text-[11px] text-on-surface-variant max-w-sm mx-auto">
              Puedes hablar directamente mientras tienes las manos ocupadas o húmedas durante el cocinado.
            </p>

            <div className="flex flex-wrap justify-center gap-1.5 pt-2">
              <span className="bg-surface px-2.5 py-1 rounded-full border border-outline-variant/30 text-[10px] font-bold text-on-surface">
                🗣️ "Siguiente paso"
              </span>
              <span className="bg-surface px-2.5 py-1 rounded-full border border-outline-variant/30 text-[10px] font-bold text-on-surface">
                🗣️ "Repetir instrucción"
              </span>
              <span className="bg-surface px-2.5 py-1 rounded-full border border-outline-variant/30 text-[10px] font-bold text-on-surface">
                🗣️ "Poner temporizador de 15 minutos"
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-outline-variant/20">
            <button onClick={() => setSubStep(2)} className="bg-surface-container border border-outline-variant/30 text-on-surface py-1.5 px-3 rounded-xl font-bold text-xs">
              ← Volver a Guía Entrelazada
            </button>
            <button onClick={() => setSubStep(4)} className="bg-primary text-on-primary py-1.5 px-3 rounded-xl font-bold text-xs flex items-center gap-1 shadow-xs hover:bg-primary/90 transition-all">
              Ir a Envasado (3.4)
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Sub-step 3.4: Vacuum Packing & Labeling */}
      {subStep === 4 && (
        <div className="bg-surface rounded-2xl p-4 border border-outline-variant/30 space-y-3 text-center animate-fade-in shadow-xs">
          <div className="w-11 h-11 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
            <CheckCircle2 size={22} />
          </div>
          <div>
            <h2 className="text-sm font-extrabold text-on-surface">¡Cocinado Simultáneo Completado!</h2>
            <p className="text-xs text-on-surface-variant max-w-sm mx-auto mt-0.5 leading-relaxed">
              Tus 25 raciones están listas. Enfría a menos de 20°C antes de envasar al vacío o guardar en recipientes herméticos.
            </p>
          </div>

          <div className="bg-surface-container/60 p-3 rounded-xl border border-outline-variant/30 text-xs text-left space-y-1.5">
            <p className="font-bold text-on-surface flex items-center gap-1">
              <CheckCircle2 size={14} className="text-emerald-600" />
              Verificación de Raciones Consolidadas:
            </p>
            <p className="text-on-surface-variant">• <strong>8 raciones</strong> de Lentejas Pardinas (Refrigeración 2°C: 7 días)</p>
            <p className="text-on-surface-variant">• <strong>8 raciones</strong> de Ternera Mechada (Refrigeración 2°C: 8 días / Congelador: 3 meses)</p>
            <p className="text-on-surface-variant">• <strong>5 raciones</strong> de Merluza en Salsa Verde (Consumo preferente 3-4 días)</p>
            <p className="text-on-surface-variant">• <strong>4 raciones</strong> de Cremas y Ensaladas de Acompañamiento</p>
          </div>

          <button
            onClick={onBack}
            className="w-full bg-primary text-on-primary py-2.5 px-4 rounded-xl font-bold text-xs shadow-md hover:bg-primary/90 transition-all"
          >
            🏁 Finalizar Sesión y Guardar Registro
          </button>
        </div>
      )}
    </div>
  );
}
