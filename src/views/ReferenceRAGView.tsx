import React, { useState } from 'react';
import { 
  BookOpen, 
  Plus, 
  Sparkles, 
  ChefHat, 
  Tag, 
  ShieldCheck, 
  Search, 
  Trash2, 
  Edit3, 
  Upload, 
  FileText, 
  Check, 
  FileUp,
  BookmarkCheck,
  Flame,
  Clock,
  ArrowRight
} from 'lucide-react';
import { ReferenceChannel, UserNotebook, BatchProject } from '../types';
import { referenceChannels, userNotebooks as initialNotebooks } from '../data';

interface ReferenceRAGViewProps {
  onSelectChannelForMenu?: (channelId: string) => void;
  onNavigateToGenerator?: () => void;
}

export function ReferenceRAGView({ onSelectChannelForMenu, onNavigateToGenerator }: ReferenceRAGViewProps) {
  const [notebooks, setNotebooks] = useState<UserNotebook[]>(initialNotebooks);
  const [channels, setChannels] = useState<ReferenceChannel[]>(referenceChannels);
  const [activeTab, setActiveTab] = useState<'NOTEBOOKS' | 'CHANNELS' | 'IMPORT_MD'>('NOTEBOOKS');

  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newTags, setNewTags] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  // Markdown import state
  const [pastedMdText, setPastedMdText] = useState('');
  const [importSuccessMsg, setImportSuccessMsg] = useState('');

  const handleAddNotebook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newEntry: UserNotebook = {
      id: `nb-${Date.now()}`,
      title: newTitle,
      content: newContent,
      tags: newTags.split(',').map(t => t.trim()).filter(Boolean),
      updatedAt: new Date().toISOString().split('T')[0]
    };

    setNotebooks([newEntry, ...notebooks]);
    setNewTitle('');
    setNewContent('');
    setNewTags('');
    setShowAddForm(false);
  };

  const handleDeleteNotebook = (id: string) => {
    setNotebooks(notebooks.filter(n => n.id !== id));
  };

  const parseAndImportMarkdown = (rawText: string, sourceName: string = 'Archivo Markdown') => {
    if (!rawText.trim()) return;

    const sections = rawText.split(/(?=\n#{1,2}\s)/);
    const newParsedNotebooks: UserNotebook[] = [];

    sections.forEach((sec, idx) => {
      const lines = sec.trim().split('\n');
      if (lines.length === 0) return;

      let title = lines[0].replace(/^#{1,3}\s*/, '').trim();
      if (!title) title = `${sourceName} - Sección ${idx + 1}`;

      const content = lines.slice(1).join('\n').trim();
      if (!content) return;

      const tagMatches = content.match(/#[\wáéíóúñ]+/gi) || [];
      const tags = Array.from(new Set(['Markdown', sourceName, ...tagMatches.map(t => t.replace('#', ''))]));

      newParsedNotebooks.push({
        id: `md-import-${Date.now()}-${idx}`,
        title,
        content: content.slice(0, 1000),
        tags,
        updatedAt: new Date().toISOString().split('T')[0]
      });
    });

    if (newParsedNotebooks.length > 0) {
      setNotebooks(prev => [...newParsedNotebooks, ...prev]);
      setImportSuccessMsg(`¡Éxito! Se han importado ${newParsedNotebooks.length} notas/recetas desde "${sourceName}".`);
      setPastedMdText('');
      setTimeout(() => setImportSuccessMsg(''), 4000);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        parseAndImportMarkdown(content, file.name.replace(/\.[^/.]+$/, ""));
      }
    };
    reader.readAsText(file);
  };

  const handleLoadSampleMarkdown1 = () => {
    const sampleMd = `# Recetario Favorito YouTube - Canal Cocina con Fundamento
## Guiso de Lentejas Caramelizadas con Chacolí
Para 4-6 personas. Sofrito de cebolla durante 45 min a fuego muy suave con un toque de pimiento choricero. Desglasar con vino blanco chacolí antes de añadir las lentejas pardinas y el caldo concentrado.
#RobinFood #Legumbres #BatchCooking

## Ternera Mechada en su Jugo Horneada
Pieza de ternera de 1.2kg. Sellar fuertemente en sartén muy caliente por todos los lados. Hornear a 160°C con aromáticas (tomillo, romero, ajo) durante 1.5h. Envasar al vacío raciones individuales.
#Carne #Vacío #YouTube
`;
    parseAndImportMarkdown(sampleMd, 'Recetario YouTube (.md)');
  };

  const handleLoadSampleMarkdown2 = () => {
    const sampleMd = `# Técnicas Avanzadas de Batch Cooking YouTube
## Conservación de Ensaladas Crujientes en Vidrio
Lavar las hojas verdes y centrifugarlas al 100%. Guardar en frascos herméticos de cristal con una servilleta de papel absorbente en la parte superior. Mantienen el crujiente perfecto durante 7 a 9 días.
#Ensaladas #Conservación #BatchTechnique

## Pasteurización y Envasado al Vacío
Dejar enfriar totalmente el guiso en baño de agua helada antes de embolsar. Extraer el 99% de aire y sellar a 120°C. Almacenar entre 1°C y 3°C para 10 días de frescura garantizada.
#Vacío #SeguridadAlimentaria
`;
    parseAndImportMarkdown(sampleMd, 'Técnicas YouTube (.md)');
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12 text-zinc-900 dark:text-zinc-100 max-w-5xl mx-auto">
      
      {/* Top Header & Tab Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-4">
        <div>
          <h2 className="text-xl font-black text-zinc-900 dark:text-white flex items-center gap-2">
            <BookOpen className="text-[#E07A5F] dark:text-[#F4A261]" size={22} />
            <span>Mi Archivo & Biblioteca de Conocimiento</span>
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Recetas guardadas, canales de cocina y cuaderno de técnicas culinarias
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-2xl border border-zinc-200 dark:border-zinc-700/60">
          <button
            onClick={() => setActiveTab('NOTEBOOKS')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'NOTEBOOKS'
                ? 'bg-white dark:bg-zinc-900 text-[#E07A5F] dark:text-[#F4A261] shadow-xs'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            Cuaderno RAG ({notebooks.length})
          </button>
          <button
            onClick={() => setActiveTab('CHANNELS')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'CHANNELS'
                ? 'bg-white dark:bg-zinc-900 text-[#E07A5F] dark:text-[#F4A261] shadow-xs'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            Canales de Autor ({channels.length})
          </button>
          <button
            onClick={() => setActiveTab('IMPORT_MD')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'IMPORT_MD'
                ? 'bg-white dark:bg-zinc-900 text-[#E07A5F] dark:text-[#F4A261] shadow-xs'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            Importar `.md`
          </button>
        </div>
      </div>

      {/* RAG Pipeline Explainer Banner */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl p-5 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-3">
        <h3 className="font-extrabold text-xs text-zinc-900 dark:text-white flex items-center gap-2">
          <Sparkles className="text-[#E07A5F] dark:text-[#F4A261]" size={16} />
          <span>Memoria Activa: Cómo influyen tus notas en el Asistente IA</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="bg-zinc-50 dark:bg-zinc-800/40 p-3.5 rounded-2xl border border-zinc-200/80 dark:border-zinc-700/50 space-y-1">
            <div className="font-bold text-[#E07A5F] dark:text-[#F4A261] flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-[#E07A5F] text-white flex items-center justify-center text-[9px] font-black">1</span>
              <span>Notas y Recetas `.md`</span>
            </div>
            <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed text-[11px]">
              Guarda tus trucos y recetas favoritas de YouTube para que el sistema aprenda tus gustos.
            </p>
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-800/40 p-3.5 rounded-2xl border border-zinc-200/80 dark:border-zinc-700/50 space-y-1">
            <div className="font-bold text-[#E07A5F] dark:text-[#F4A261] flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-[#E07A5F] text-white flex items-center justify-center text-[9px] font-black">2</span>
              <span>Indexación RAG</span>
            </div>
            <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed text-[11px]">
              La IA extrae temperaturas exactas, tiempos de cocción, sofritos y técnicas de conservación.
            </p>
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-800/40 p-3.5 rounded-2xl border border-zinc-200/80 dark:border-zinc-700/50 space-y-1">
            <div className="font-bold text-[#E07A5F] dark:text-[#F4A261] flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-[#E07A5F] text-white flex items-center justify-center text-[9px] font-black">3</span>
              <span>Generación de Menú</span>
            </div>
            <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed text-[11px]">
              Tus lotes semanales respetan tus ingredientes y estilos preferidos automáticamente.
            </p>
          </div>
        </div>
      </div>

      {/* IMPORT MD TAB */}
      {activeTab === 'IMPORT_MD' && (
        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-[#E07A5F]/30 shadow-xs space-y-6 animate-fade-in">
          <div className="space-y-1 border-b border-zinc-200 dark:border-zinc-800 pb-4">
            <h2 className="text-base font-black text-zinc-900 dark:text-white flex items-center gap-2">
              <Upload className="text-[#E07A5F] dark:text-[#F4A261]" size={20} />
              <span>Importar Archivos Markdown (`.md`)</span>
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Sube un archivo `.md` de tus cuadernos o pega directamente el texto de recetas de tus canales preferidos.
            </p>
          </div>

          {importSuccessMsg && (
            <div className="bg-[#E07A5F]/10 text-zinc-900 dark:text-zinc-100 border border-[#E07A5F]/30 p-3.5 rounded-2xl flex items-center gap-2.5 text-xs font-bold animate-fade-in">
              <Check className="text-[#E07A5F] shrink-0" size={18} />
              <span>{importSuccessMsg}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* File Upload Box */}
            <div className="border-2 border-dashed border-[#E07A5F]/30 bg-[#E07A5F]/5 rounded-2xl p-5 flex flex-col items-center justify-center text-center space-y-3 hover:border-[#E07A5F]/60 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#E07A5F]/20 text-[#E07A5F] dark:text-[#F4A261] flex items-center justify-center">
                <FileText size={20} />
              </div>
              <div>
                <h3 className="font-bold text-xs text-zinc-900 dark:text-white">Subir Archivo `.md` o `.txt`</h3>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">Selecciona tu cuaderno exportado</p>
              </div>
              <label className="btn-hero-copper text-white px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-colors shadow-xs">
                Explorar Archivo
                <input type="file" accept=".md,.txt,.markdown" onChange={handleFileUpload} className="hidden" />
              </label>
            </div>

            {/* Quick Demo Pre-load Samples */}
            <div className="bg-zinc-50 dark:bg-zinc-800/40 rounded-2xl p-4 border border-zinc-200 dark:border-zinc-700/60 space-y-2 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-xs text-zinc-900 dark:text-white flex items-center gap-1.5">
                  <Sparkles size={14} className="text-[#E07A5F]" />
                  <span>Carga Rápida de Ejemplos `.md`</span>
                </h3>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                  Prueba importando recetarios pre-configurados para comprobar la absorción RAG.
                </p>
              </div>

              <div className="space-y-1.5 pt-2">
                <button
                  onClick={handleLoadSampleMarkdown1}
                  className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 hover:border-[#E07A5F]/50 text-zinc-800 dark:text-zinc-200 text-xs py-2 px-3 rounded-xl font-bold text-left flex items-center justify-between transition-colors"
                >
                  <span>📄 Recetario_YouTube_Fundamento.md</span>
                  <Plus size={14} className="text-[#E07A5F]" />
                </button>

                <button
                  onClick={handleLoadSampleMarkdown2}
                  className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 hover:border-[#E07A5F]/50 text-zinc-800 dark:text-zinc-200 text-xs py-2 px-3 rounded-xl font-bold text-left flex items-center justify-between transition-colors"
                >
                  <span>📄 Tecnicas_Avanzadas_Batch.md</span>
                  <Plus size={14} className="text-[#E07A5F]" />
                </button>
              </div>
            </div>
          </div>

          {/* Raw Text Paste Area */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block">
              O pega texto en formato Markdown directamente:
            </label>
            <textarea
              value={pastedMdText}
              onChange={(e) => setPastedMdText(e.target.value)}
              placeholder="# Nombre de la Receta o Técnica&#10;Escribe aquí los ingredientes, tiempo de cocción y recomendaciones..."
              rows={4}
              className="w-full bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-2xl p-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#E07A5F]/30 font-mono text-zinc-800 dark:text-zinc-200"
            />
            <button
              onClick={() => parseAndImportMarkdown(pastedMdText, 'Pegado Manual')}
              disabled={!pastedMdText.trim()}
              className="btn-hero-copper text-white px-4 py-2 rounded-xl text-xs font-bold shadow-xs transition-colors disabled:opacity-40 active:scale-95"
            >
              Procesar e Importar
            </button>
          </div>
        </div>
      )}

      {/* CHANNELS TAB */}
      {activeTab === 'CHANNELS' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
          {channels.map((channel) => (
            <div key={channel.id} className="bg-white dark:bg-zinc-900 rounded-3xl p-5 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-4 flex flex-col justify-between hover:border-[#E07A5F]/40 transition-all">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <img src={channel.avatar} alt={channel.author} className="w-12 h-12 rounded-2xl object-cover shadow-xs shrink-0" />
                  <div>
                    <h3 className="font-bold text-sm text-zinc-900 dark:text-white">{channel.name}</h3>
                    <p className="text-xs font-bold text-[#E07A5F] dark:text-[#F4A261]">{channel.style}</p>
                  </div>
                </div>

                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed bg-zinc-50 dark:bg-zinc-800/40 p-3 rounded-2xl border border-zinc-200/60 dark:border-zinc-700/40 italic">
                  "{channel.philosophy}"
                </p>

                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5 flex items-center gap-1.5">
                    <ChefHat size={13} className="text-[#E07A5F]" />
                    <span>Técnicas Clave Registradas:</span>
                  </p>
                  <ul className="space-y-1">
                    {channel.keyTechniques.map((tech, idx) => (
                      <li key={idx} className="text-xs text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E07A5F] shrink-0" />
                        <span>{tech}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {onSelectChannelForMenu && (
                <button
                  onClick={() => onSelectChannelForMenu(channel.id)}
                  className="w-full bg-[#E07A5F]/10 hover:bg-[#E07A5F] text-[#E07A5F] hover:text-white dark:text-[#F4A261] py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <Sparkles size={14} />
                  <span>Usar este Estilo para Generar Menú</span>
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* NOTEBOOKS TAB */}
      {activeTab === 'NOTEBOOKS' && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="font-bold text-sm text-zinc-900 dark:text-white">
              Cuadernos y Notas Guardadas ({notebooks.length})
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('IMPORT_MD')}
                className="bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
              >
                <Upload size={14} />
                <span>Importar `.md`</span>
              </button>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="btn-hero-copper text-white px-3.5 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-xs transition-all active:scale-95"
              >
                <Plus size={14} />
                <span>+ Nueva Nota</span>
              </button>
            </div>
          </div>

          {showAddForm && (
            <form onSubmit={handleAddNotebook} className="bg-white dark:bg-zinc-900 rounded-3xl p-5 border border-[#E07A5F]/40 shadow-md space-y-3 animate-fade-in">
              <h4 className="font-bold text-xs text-[#E07A5F] dark:text-[#F4A261] uppercase tracking-wider">
                Añadir Nueva Nota o Receta a la Base
              </h4>
              <div>
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block mb-1">Título</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Ej: Secreto del sofrito con pimiento choricero"
                  className="w-full bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#E07A5F]/30 text-zinc-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block mb-1">Contenido / Instrucciones</label>
                <textarea
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Escribe los pasos, cantidades o técnicas..."
                  rows={3}
                  className="w-full bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-xl p-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#E07A5F]/30 text-zinc-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block mb-1">Etiquetas (separadas por comas)</label>
                <input
                  type="text"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  placeholder="Sofritos, Vacío, Lentejas"
                  className="w-full bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#E07A5F]/30 text-zinc-900 dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-[#E07A5F] text-white px-4 py-1.5 rounded-xl text-xs font-bold shadow-xs hover:bg-[#c96a50] active:scale-95"
                >
                  Guardar Nota
                </button>
              </div>
            </form>
          )}

          {/* Notebooks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {notebooks.map((nb) => (
              <div key={nb.id} className="bg-white dark:bg-zinc-900 rounded-2xl p-4 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-3 flex flex-col justify-between hover:border-[#E07A5F]/40 transition-all">
                <div className="space-y-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-bold text-xs text-zinc-900 dark:text-white leading-snug">{nb.title}</h4>
                    <button 
                      onClick={() => handleDeleteNotebook(nb.id)} 
                      className="text-zinc-400 hover:text-rose-500 transition-colors shrink-0 p-1"
                      title="Eliminar"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-3">
                    "{nb.content}"
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                  <div className="flex flex-wrap gap-1">
                    {nb.tags.map((tag, idx) => (
                      <span key={idx} className="bg-[#E07A5F]/10 text-[#E07A5F] dark:text-[#F4A261] text-[10px] font-bold px-2 py-0.5 rounded-md">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-[10px] text-zinc-400 text-right">Actualizado: {nb.updatedAt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
