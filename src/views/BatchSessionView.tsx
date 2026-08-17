import { useState } from 'react';
import { ArrowLeft, Users, Clock, Flame, Scissors, Leaf, Wind, Refrigerator, CheckCircle, Package, Snowflake, AlertCircle, ShoppingCart } from 'lucide-react';
import { ViewState } from '../types';
import { mainBatchPlan } from '../data';

export function BatchSessionView({ onNavigate }: { onNavigate: (view: ViewState) => void }) {
  const [servings, setServings] = useState<number>(mainBatchPlan.defaultServings);
  const [activeTab, setActiveTab] = useState<'cronograma' | 'ingredientes' | 'conservacion'>('cronograma');
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});

  const scaleFactor = servings / mainBatchPlan.defaultServings;

  const toggleTask = (taskId: string) => {
    setCompletedTasks(prev => ({ ...prev, [taskId]: !prev[taskId] }));
  };

  return (
    <div className="w-full bg-background -mx-4 px-4 md:mx-0 md:px-0">
      {/* Header Bar */}
      <header className="fixed top-0 left-0 w-full z-40 bg-surface/95 backdrop-blur-md shadow-sm">
        <div className="flex items-center px-4 py-3 h-16 max-w-[1140px] mx-auto justify-between">
          <button 
            onClick={() => onNavigate({ name: 'planner' })}
            className="p-2 -ml-2 rounded-full hover:bg-surface-container-high transition-colors active:scale-95 text-on-surface flex items-center gap-2 font-medium"
          >
            <ArrowLeft size={22} />
            <span className="hidden sm:inline">Volver al Planificador</span>
          </button>
          
          <div className="text-center">
            <h1 className="text-base sm:text-lg font-bold text-primary truncate">Sesión de Batch Cooking</h1>
            <p className="text-xs text-on-surface-variant font-medium">Cocina en lote para toda la semana</p>
          </div>

          <div className="w-8"></div>
        </div>
      </header>

      <div className="pt-20 max-w-4xl mx-auto pb-24">
        {/* Hero Card */}
        <div className="bg-gradient-to-br from-primary-container via-primary to-primary-container text-on-primary rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden mb-8">
          <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
            <Package size={240} />
          </div>

          <div className="relative z-10 flex flex-col gap-4">
            <div className="flex flex-wrap gap-2">
              {mainBatchPlan.tags.map(tag => (
                <span key={tag} className="bg-on-primary/20 backdrop-blur-md text-on-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">{mainBatchPlan.title}</h1>
            <p className="text-sm sm:text-base text-on-primary/95 leading-relaxed max-w-2xl">
              {mainBatchPlan.description}
            </p>

            {/* Scale Controller */}
            <div className="mt-2 bg-on-primary/15 backdrop-blur-md rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 border border-on-primary/20">
              <div className="flex items-center gap-3">
                <Users size={24} className="text-on-primary shrink-0" />
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider block opacity-90">Multiplicador de Porciones / Personas</span>
                  <span className="text-sm font-semibold">Calculado para {servings} personas ({Math.round(mainBatchPlan.totalMealsPrepared * scaleFactor)} raciones totales)</span>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-surface/95 text-on-surface p-1.5 rounded-xl shadow-inner">
                <button 
                  onClick={() => setServings(Math.max(1, servings - 1))}
                  className="w-8 h-8 rounded-lg bg-surface-container-high hover:bg-surface-variant font-bold text-lg flex items-center justify-center transition-colors"
                >
                  -
                </button>
                <span className="w-10 text-center font-bold text-base">{servings} p.</span>
                <button 
                  onClick={() => setServings(servings + 1)}
                  className="w-8 h-8 rounded-lg bg-primary text-on-primary font-bold text-lg flex items-center justify-center transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Prepared Dishes Overview */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-on-surface mb-4 flex items-center gap-2">
            <Package className="text-primary" size={22} />
            Platos Preparados en esta Sesión
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {mainBatchPlan.dishes.map((dish, i) => (
              <div key={i} className="bg-surface border border-surface-variant rounded-2xl overflow-hidden shadow-sm flex flex-col">
                <div className="h-32 overflow-hidden relative">
                  <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2 bg-primary/90 text-on-primary text-[11px] font-bold px-2 py-0.5 rounded-md backdrop-blur-sm">
                    {Math.round(dish.servings * scaleFactor)} Raciones
                  </div>
                </div>
                <div className="p-4 flex flex-col justify-between flex-grow">
                  <h3 className="text-sm font-bold text-on-surface line-clamp-2">{dish.name}</h3>
                  <span className="text-xs text-on-surface-variant mt-2 font-medium">{dish.calories} kcal / ración</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-surface-variant mb-6" role="tablist">
          <button 
            onClick={() => setActiveTab('cronograma')}
            className={`flex-1 py-3 text-center text-sm sm:text-base font-bold transition-colors relative ${activeTab === 'cronograma' ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
          >
            Paso a Paso (2.5h)
            {activeTab === 'cronograma' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-full"></div>}
          </button>
          <button 
            onClick={() => setActiveTab('ingredientes')}
            className={`flex-1 py-3 text-center text-sm sm:text-base font-bold transition-colors relative ${activeTab === 'ingredientes' ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
          >
            Ingredientes ({servings}p)
            {activeTab === 'ingredientes' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-full"></div>}
          </button>
          <button 
            onClick={() => setActiveTab('conservacion')}
            className={`flex-1 py-3 text-center text-sm sm:text-base font-bold transition-colors relative ${activeTab === 'conservacion' ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
          >
            Vacío & Congelación
            {activeTab === 'conservacion' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-full"></div>}
          </button>
        </div>

        {/* TAB 1: CRONOGRAMA PASO A PASO */}
        {activeTab === 'cronograma' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-secondary-container/10 border border-secondary/20 rounded-2xl p-4 flex items-start gap-3">
              <Clock className="text-secondary shrink-0 mt-0.5" size={22} />
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                <strong>Consejo de Batch Cooking:</strong> El secreto de cocinar para varias personas en una sola mañana está en la <em>cocción simultánea pasiva</em> (usar horno y fuego lento mientras haces tareas secundarias de centrifugado y envasado).
              </p>
            </div>

            <div className="space-y-6">
              {mainBatchPlan.timeline.map((step, idx) => {
                const renderIcon = (iconName: string) => {
                  if (iconName === 'Scissors') return <Scissors className="text-secondary" size={22} />;
                  if (iconName === 'Flame') return <Flame className="text-secondary" size={22} />;
                  if (iconName === 'Leaf') return <Leaf className="text-secondary" size={22} />;
                  return <Wind className="text-secondary" size={22} />;
                };

                return (
                  <div key={idx} className="bg-surface border border-surface-variant rounded-2xl p-5 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-3 border-b border-surface-container-high">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-secondary-container/20 flex items-center justify-center shrink-0">
                          {renderIcon(step.icon)}
                        </div>
                        <div>
                          <span className="text-xs font-bold text-secondary uppercase tracking-wider">{step.timeBlock}</span>
                          <h3 className="text-base font-bold text-on-surface">{step.title}</h3>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-on-surface-variant mb-4 leading-relaxed">{step.description}</p>

                    <div className="space-y-2.5">
                      {step.tasks.map((task, tIdx) => {
                        const taskId = `step-${idx}-task-${tIdx}`;
                        const isDone = completedTasks[taskId];

                        return (
                          <div 
                            key={tIdx} 
                            onClick={() => toggleTask(taskId)}
                            className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                              isDone ? 'bg-primary-container/10 border-primary/30 text-on-surface-variant' : 'bg-surface-container-low border-surface-variant text-on-surface hover:bg-surface-container-high'
                            }`}
                          >
                            <div className="mt-0.5">
                              {isDone ? (
                                <CheckCircle size={18} className="text-primary fill-primary/20" />
                              ) : (
                                <div className="w-4 h-4 rounded-md border-2 border-outline"></div>
                              )}
                            </div>
                            <span className={`text-sm ${isDone ? 'line-through text-outline' : 'font-medium'}`}>
                              {task}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: INGREDIENTES ESCALADOS */}
        {activeTab === 'ingredientes' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center bg-surface-container-low p-4 rounded-2xl border border-surface-variant">
              <div>
                <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block">Lista de la Compra Escalada</span>
                <span className="text-sm font-semibold text-primary">Ajustado para {servings} personas</span>
              </div>
              <button className="flex items-center gap-2 bg-secondary text-on-secondary text-xs font-bold px-4 py-2 rounded-xl shadow-sm hover:bg-secondary/90 transition-colors">
                <ShoppingCart size={16} /> Exportar Lista
              </button>
            </div>

            {mainBatchPlan.ingredientGroups.map((group, idx) => (
              <div key={idx} className="bg-surface border border-surface-variant rounded-2xl p-5 shadow-sm">
                <h3 className="text-base font-bold text-on-surface mb-3 pb-2 border-b border-surface-container-high">
                  {group.category}
                </h3>
                <ul className="space-y-3">
                  {group.items.map((item, iIdx) => {
                    const scaledQty = Math.round((item.baseQuantity * scaleFactor) * 10) / 10;
                    return (
                      <li key={iIdx} className="flex justify-between items-center text-sm p-3 bg-surface-container-low rounded-xl">
                        <div className="flex flex-col">
                          <span className="font-semibold text-on-surface">{item.name}</span>
                          {item.notes && <span className="text-xs text-on-surface-variant">{item.notes}</span>}
                        </div>
                        <span className="font-bold text-primary bg-primary/10 px-3 py-1 rounded-full text-xs">
                          {scaledQty} {item.unit}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: CONSERVACIÓN, VACÍO Y CONGELACIÓN */}
        {activeTab === 'conservacion' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-primary-container/10 border border-primary/20 rounded-2xl p-5 flex items-start gap-4">
              <Snowflake className="text-primary shrink-0 mt-1" size={28} />
              <div>
                <h3 className="text-base font-bold text-primary mb-1">Principios de Seguridad Alimentaria en Batch Cooking</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Al cocinar comida para varios días y múltiples personas en una sola mañana, la clave del éxito es el <strong>enfriamiento rápido</strong> y la <strong>ausencia de oxígeno (envasado al vacío)</strong> para conservar sabores y nutrientes intactos durante toda la semana.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {mainBatchPlan.storageProtocols.map((proto, idx) => (
                <div key={idx} className="bg-surface border border-surface-variant rounded-2xl p-5 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center mb-3">
                      {idx === 0 && <Wind className="text-primary" size={22} />}
                      {idx === 1 && <Snowflake className="text-primary" size={22} />}
                      {idx === 2 && <Refrigerator className="text-primary" size={22} />}
                    </div>
                    <h4 className="text-base font-bold text-on-surface mb-1">{proto.title}</h4>
                    <span className="inline-block bg-secondary/10 text-secondary text-xs font-bold px-2.5 py-1 rounded-md mb-3">
                      ⏱ {proto.duration}
                    </span>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      {proto.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-surface-container-high text-[11px] text-outline font-medium">
                    Técnica: {proto.technique}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-surface border border-surface-variant rounded-2xl p-5">
              <h3 className="text-base font-bold text-on-surface mb-3 flex items-center gap-2">
                <AlertCircle className="text-secondary" size={20} />
                Reglas de Oro para Regenerar la Comida
              </h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-on-surface-variant leading-relaxed">
                <li><strong>Guisos y Legumbres:</strong> Calentar a fuego medio añadiendo un chorrito de agua o caldo para recuperar la jugosidad original.</li>
                <li><strong>Carnes Mechadas en Vacío:</strong> Calentar al baño maría o regenerar directamente en sartén con su propio jugo reducido.</li>
                <li><strong>Vegetales Asados:</strong> Dar un golpe de horno o sartén rápida de 3 minutos para recuperar textura crujiente antes de servir.</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
