import React, { useState } from 'react';
import { BookOpen, Plus, Sparkles, ChefHat, Tag, ShieldCheck, Search, Trash2, Edit3, Upload, FileText, Check, FileUp } from 'lucide-react';
import { ReferenceChannel, UserNotebook } from '../types';
import { referenceChannels, userNotebooks as initialNotebooks } from '../data';

interface ReferenceRAGViewProps {
  onSelectChannelForMenu?: (channelId: string) => void;
}

export function ReferenceRAGView({ onSelectChannelForMenu }: ReferenceRAGViewProps) {
  const [notebooks, setNotebooks] = useState<UserNotebook[]>(initialNotebooks);
  const [channels, setChannels] = useState<ReferenceChannel[]>(referenceChannels);
  const [activeTab, setActiveTab] = useState<'CHANNELS' | 'NOTEBOOKS' | 'IMPORT_MD'>('NOTEBOOKS');

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

  // Helper to parse Markdown content and import entries into RAG notebooks/channels
  const parseAndImportMarkdown = (rawText: string, sourceName: string = 'Archivo Markdown') => {
    if (!rawText.trim()) return;

    // Split by Markdown Level 1 or 2 headers (# or ##)
    const sections = rawText.split(/(?=\n#{1,2}\s)/);
    const newParsedNotebooks: UserNotebook[] = [];

    sections.forEach((sec, idx) => {
      const lines = sec.trim().split('\n');
      if (lines.length === 0) return;

      let title = lines[0].replace(/^#{1,3}\s*/, '').trim();
      if (!title) title = `${sourceName} - Sección ${idx + 1}`;

      const content = lines.slice(1).join('\n').trim();
      if (!content) return;

      // Extract tags from content if any hashtags exist
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
      setImportSuccessMsg(`¡Éxito! Se han procesado e importado ${newParsedNotebooks.length} notas/recetas desde "${sourceName}".`);
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
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Architecture Pipeline Explanation Card */}
      <div className="bg-gradient-to-r from-surface-container-high via-surface to-surface-container-high rounded-3xl p-6 border border-outline-variant/30 space-y-4">
        <h3 className="font-extrabold text-sm text-on-surface flex items-center gap-2">
          <Sparkles className="text-primary" size={18} />
          Conexión Directa: De tus Notebooks YouTube (`.md`) al Asistente de Cocina IA
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-surface p-4 rounded-2xl border border-outline-variant/20 space-y-1.5">
            <div className="font-bold text-primary flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-primary text-on-primary flex items-center justify-center text-[10px]">1</span>
              Importa o Pega tu `.md`
            </div>
            <p className="text-on-surface-variant leading-relaxed">
              Carga tus notas con las recetas y trucos exactos de tus canales favoritos de YouTube (Robin Food, Dabiz Muñoz, etc.).
            </p>
          </div>

          <div className="bg-surface p-4 rounded-2xl border border-outline-variant/20 space-y-1.5">
            <div className="font-bold text-secondary flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-secondary text-on-secondary flex items-center justify-center text-[10px]">2</span>
              Procesamiento RAG IA
            </div>
            <p className="text-on-surface-variant leading-relaxed">
              La IA no inventa ni simplifica: extrae las temperaturas, tiempos de fuego, puntos de sal y secretos de sofrito exactos.
            </p>
          </div>

          <div className="bg-surface p-4 rounded-2xl border border-outline-variant/20 space-y-1.5">
            <div className="font-bold text-emerald-700 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">3</span>
              Ejecución Guiada en Directo
            </div>
            <p className="text-on-surface-variant leading-relaxed">
              Al cocinar o generar menús, la app te muestra la <strong>Técnica Detallada del Autor</strong> paso a paso con control por visión y voz.
            </p>
          </div>
        </div>
      </div>

      {/* IMPORT MD TAB */}
      {activeTab === 'IMPORT_MD' && (
        <div className="bg-surface rounded-3xl p-6 sm:p-8 border border-primary/20 shadow-md space-y-6 animate-fade-in">
          <div className="space-y-2 border-b border-outline-variant/20 pb-4">
            <h2 className="text-xl font-bold text-on-surface flex items-center gap-2">
              <Upload className="text-primary" size={22} />
              Importar Base de Datos desde Archivos Markdown (`.md`)
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Puedes subir un archivo `.md` de tus cuadernos o pegar directamente el código Markdown de recetas o técnicas guardadas de tus canales de YouTube preferidos.
            </p>
          </div>

          {importSuccessMsg && (
            <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 p-4 rounded-2xl flex items-center gap-3 text-xs font-bold animate-fade-in">
              <Check className="text-emerald-600 shrink-0" size={20} />
              {importSuccessMsg}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* File Upload Box */}
            <div className="border-2 border-dashed border-primary/30 bg-primary-container/10 rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-3 hover:border-primary transition-colors">
              <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                <FileText size={24} />
              </div>
              <div>
                <h3 className="font-bold text-sm text-on-surface">Subir Archivo `.md` o `.txt`</h3>
                <p className="text-xs text-on-surface-variant mt-1">Selecciona tu cuaderno o recetario exportado</p>
              </div>
              <label className="bg-primary text-on-primary px-4 py-2.5 rounded-xl text-xs font-bold cursor-pointer hover:bg-primary/90 transition-colors shadow-xs">
                Explorar Archivos
                <input type="file" accept=".md,.txt,.markdown" onChange={handleFileUpload} className="hidden" />
              </label>
            </div>

            {/* Quick Demo Pre-load Samples */}
            <div className="bg-surface-container/60 rounded-2xl p-5 border border-outline-variant/30 space-y-3 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-sm text-on-surface flex items-center gap-2">
                  <Sparkles size={16} className="text-secondary" />
                  Prueba Rápida: Cargar Ejemplos `.md`
                </h3>
                <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                  Carga archivos Markdown de demostración con 1 solo clic para verificar cómo la IA absorbe y aplica las recetas y técnicas en los menús.
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  onClick={handleLoadSampleMarkdown1}
                  className="w-full bg-surface border border-outline-variant/40 hover:bg-surface-container-high text-on-surface text-xs py-2.5 px-3 rounded-xl font-bold text-left flex items-center justify-between"
                >
                  <span>📄 Cargar "Recetario_YouTube_Robin.md"</span>
                  <Plus size={16} className="text-primary" />
                </button>

                <button
                  onClick={handleLoadSampleMarkdown2}
                  className="w-full bg-surface border border-outline-variant/40 hover:bg-surface-container-high text-on-surface text-xs py-2.5 px-3 rounded-xl font-bold text-left flex items-center justify-between"
                >
                  <span>📄 Cargar "Tecnicas_Batch_Cooking.md"</span>
                  <Plus size={16} className="text-primary" />
                </button>
              </div>
            </div>
          </div>

          {/* Raw Text Paste Area */}
          <div className="space-y-2 pt-2">
            <label className="text-xs font-bold text-on-surface block">O pega el texto Markdown directamente aquí:</label>
            <textarea
              value={pastedMdText}
              onChange={(e) => setPastedMdText(e.target.value)}
              placeholder="# Nombre de la Receta o Técnica&#10;Escribe aquí la preparación, sofritos, tiempo y consejos..."
              rows={5}
              className="w-full bg-surface-container border border-outline-variant/40 rounded-xl p-3.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 font-mono"
            />
            <button
              onClick={() => parseAndImportMarkdown(pastedMdText, 'Pegado Manual')}
              disabled={!pastedMdText.trim()}
              className="bg-primary text-on-primary px-5 py-2.5 rounded-xl text-xs font-bold shadow-xs hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              Procesar e Importar Texto Markdown
            </button>
          </div>
        </div>
      )}

      {/* TABS CONTENT */}
      {activeTab === 'CHANNELS' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {channels.map((channel) => (
            <div key={channel.id} className="bg-surface rounded-3xl p-6 border border-outline-variant/30 shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <img src={channel.avatar} alt={channel.author} className="w-14 h-14 rounded-2xl object-cover shadow-sm shrink-0" />
                  <div>
                    <h3 className="font-bold text-lg text-on-surface">{channel.name}</h3>
                    <p className="text-xs font-semibold text-primary">{channel.style}</p>
                  </div>
                </div>

                <p className="text-xs text-on-surface-variant leading-relaxed bg-surface-container/50 p-3 rounded-xl">
                  "{channel.philosophy}"
                </p>

                <div>
                  <p className="text-xs font-bold text-on-surface mb-1.5 flex items-center gap-1.5">
                    <ChefHat size={14} className="text-secondary" />
                    Técnicas Clave Registradas:
                  </p>
                  <ul className="space-y-1">
                    {channel.keyTechniques.map((tech, idx) => (
                      <li key={idx} className="text-xs text-on-surface-variant flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {onSelectChannelForMenu && (
                <button
                  onClick={() => onSelectChannelForMenu(channel.id)}
                  className="w-full bg-primary/10 hover:bg-primary text-primary hover:text-on-primary py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2"
                >
                  <Sparkles size={14} />
                  Usar para Generar Menú de Batch Cooking
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {activeTab === 'NOTEBOOKS' && (
        <div className="space-y-6">
          {/* Notebooks Form Header */}
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg text-on-surface">Apuntes y Cuadernos Registrados en la Base RAG</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('IMPORT_MD')}
                className="bg-surface-container border border-outline-variant/40 hover:bg-surface-container-high text-on-surface px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <Upload size={14} />
                Subir `.md`
              </button>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="bg-primary text-on-primary px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm hover:bg-primary/90 transition-colors"
              >
                <Plus size={16} />
                Nota Manual
              </button>
            </div>
          </div>

          {showAddForm && (
            <form onSubmit={handleAddNotebook} className="bg-surface rounded-2xl p-5 border border-primary/20 shadow-md space-y-4 animate-fade-in">
              <h4 className="font-bold text-sm text-primary">Añadir Nota a la Base RAG</h4>
              <div>
                <label className="text-xs font-bold text-on-surface block mb-1">Título de la Nota</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Ej: Secreto del sofrito vasco con pimiento choricero"
                  className="w-full bg-surface-container border border-outline-variant/30 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-on-surface block mb-1">Instrucciones o Filosofía del Autor</label>
                <textarea
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Escribe el truco o técnica que debe respetar la IA..."
                  rows={3}
                  className="w-full bg-surface-container border border-outline-variant/30 rounded-xl p-3.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-on-surface block mb-1">Etiquetas (separadas por comas)</label>
                <input
                  type="text"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  placeholder="Sofritos, Vacío, Robin Food"
                  className="w-full bg-surface-container border border-outline-variant/30 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-on-surface-variant hover:bg-surface-container"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-primary text-on-primary px-5 py-2 rounded-xl text-xs font-bold shadow-xs hover:bg-primary/90"
                >
                  Guardar en RAG
                </button>
              </div>
            </form>
          )}

          {/* Notebook list */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {notebooks.map((nb) => (
              <div key={nb.id} className="bg-surface rounded-2xl p-5 border border-outline-variant/30 shadow-2xs space-y-3 flex flex-col justify-between hover:border-primary/30 transition-colors">
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-bold text-sm text-on-surface leading-snug">{nb.title}</h4>
                    <button onClick={() => handleDeleteNotebook(nb.id)} className="text-on-surface-variant hover:text-error shrink-0">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed line-clamp-4">
                    "{nb.content}"
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-outline-variant/20">
                  <div className="flex flex-wrap gap-1">
                    {nb.tags.map((tag, idx) => (
                      <span key={idx} className="bg-primary-container/20 text-primary text-[10px] font-bold px-2 py-0.5 rounded-md">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-[10px] text-on-surface-variant text-right">Actualizado: {nb.updatedAt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

