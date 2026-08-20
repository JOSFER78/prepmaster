import { TRADITIONAL_RECIPES_DATABASE, CanonicalRecipe } from '../data/recipesTraditionalDatabase';

export interface IngredientFamilyGroup {
  familyKey: string;
  displayName: string;
  icon: string;
  description: string;
  variations: CanonicalRecipe[];
}

const FAMILY_DEFINITIONS: Array<{
  key: string;
  keywords: string[];
  displayName: string;
  icon: string;
  description: string;
}> = [
  {
    key: 'bacalao',
    keywords: ['bacalao', 'bacalaos', 'desalado', 'desmigado', 'potaje vigilia'],
    displayName: 'Bacalao Desalado Tradicional',
    icon: '🐟',
    description: 'Pescado blanco noble con alto colágeno: desde guisos melosos y potajes de vigilia hasta salsas verdes y arroces.'
  },
  {
    key: 'pollo',
    keywords: ['pollo', 'contramuslo', 'contramuslos', 'pechuga', 'ave', 'pepitoria', 'ajillo', 'pollo asado'],
    displayName: 'Pollo de Corral & Aves',
    icon: '🍗',
    description: 'Carne magra y versátil: pepitoria clásica de almendras, ajillo al romero, asado al horno o cazuela de arroz.'
  },
  {
    key: 'ternera',
    keywords: ['ternera', 'carne picada', 'albondigas', 'carrillera', 'carrilleras', 'estofado', 'guiso carne'],
    displayName: 'Ternera & Guisos de Carne',
    icon: '🥩',
    description: 'Cortes tiernos y ricos en colágeno: albóndigas en salsa de la abuela, carrilleras al vino tinto o estofados lentos.'
  },
  {
    key: 'merluza',
    keywords: ['merluza', 'pescado blanco', 'almejas', 'salsa verde'],
    displayName: 'Merluza & Pescados de Lonja',
    icon: '🐟',
    description: 'Cocciones suaves y digestivas: salsa verde con almejas y lecho de patatas panaderas.'
  },
  {
    key: 'atun',
    keywords: ['atun', 'bonito', 'marmitako', 'empanada', 'melva'],
    displayName: 'Bonito del Norte & Atún',
    icon: '🐟',
    description: 'Guisos marineros con patata chascada (marmitako) y empanadas tradicionales.'
  },
  {
    key: 'legumbres',
    keywords: ['lenteja', 'lentejas', 'garbanzo', 'garbanzos', 'alubia', 'alubias', 'potaje', 'cuchara', 'cocido'],
    displayName: 'Legumbres & Platos de Cuchara',
    icon: '🍲',
    description: 'El pilar nutricional del batch cooking: lentejas pardinas con majado y alubias estofadas.'
  },
  {
    key: 'verduras',
    keywords: ['verdura', 'verduras', 'calabacin', 'pisto', 'crema', 'puerro', 'berenjena', 'salmorejo', 'gazpacho'],
    displayName: 'Hortalizas, Pistos & Cremas',
    icon: '🥬',
    description: 'Bases vegetales saludables: pisto manchego confitado, salmorejo cordobés y cremas aterciopeladas.'
  },
  {
    key: 'huevos',
    keywords: ['huevo', 'huevos', 'tortilla', 'tortillas', 'revuelto', 'flamenca'],
    displayName: 'Huevos Camperos & Tortillas',
    icon: '🍳',
    description: 'Tortilla de patatas con cebolla pochada, tortilla de bacalao o huevos a la flamenca.'
  },
  {
    key: 'arroz',
    keywords: ['arroz', 'arroces', 'paella', 'caldoso', 'meloso'],
    displayName: 'Arroces & Cazuelas Tradicionales',
    icon: '🍚',
    description: 'Arroz caldoso marinero, arroz con pollo de campo o arroz meloso con bacalao.'
  }
];

/**
 * Detecta las familias culinarias presentes en la consulta del usuario
 */
export function detectIngredientFamilies(
  query: string,
  excludedAllergens: string[] = [],
  sourceFilter: string = 'all'
): IngredientFamilyGroup[] {
  if (!query || !query.trim()) return [];

  const normalized = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const detected: IngredientFamilyGroup[] = [];

  for (const fam of FAMILY_DEFINITIONS) {
    const hasMatch = fam.keywords.some(kw => normalized.includes(kw));
    if (hasMatch) {
      const variations = TRADITIONAL_RECIPES_DATABASE.filter(r => {
        if (sourceFilter === 'cocina_tradicional' && r.source !== 'Cocina Tradicional') return false;
        if (sourceFilter === 'karlos_arguinano' && r.source !== 'Karlos Arguiñano') return false;
        if (excludedAllergens.length > 0 && r.allergens.some(a => excludedAllergens.includes(a))) {
          return false;
        }
        return (
          r.mainIngredientFamily === fam.key ||
          fam.keywords.some(kw => r.name.toLowerCase().includes(kw) || r.shortName.toLowerCase().includes(kw))
        );
      });

      if (variations.length > 0) {
        detected.push({
          familyKey: fam.key,
          displayName: fam.displayName,
          icon: fam.icon,
          description: fam.description,
          variations
        });
      }
    }
  }

  return detected;
}

/**
 * Obtiene todas las recetas alternativas para un plato dado
 */
export function getAlternativeRecipesFor(
  recipeId: string,
  excludedAllergens: string[] = [],
  sourceFilter: string = 'all'
): CanonicalRecipe[] {
  const current = TRADITIONAL_RECIPES_DATABASE.find(r => r.id === recipeId);
  if (!current) return [];

  return TRADITIONAL_RECIPES_DATABASE.filter(r => {
    if (r.id === recipeId) return false;
    if (sourceFilter === 'cocina_tradicional' && r.source !== 'Cocina Tradicional') return false;
    if (sourceFilter === 'karlos_arguinano' && r.source !== 'Karlos Arguiñano') return false;
    if (excludedAllergens.length > 0 && r.allergens.some(a => excludedAllergens.includes(a))) return false;

    // Priorizar misma familia de ingrediente o misma categoría
    if (current.mainIngredientFamily && r.mainIngredientFamily === current.mainIngredientFamily) {
      return true;
    }
    return r.category === current.category;
  });
}

export interface BatchMenuConfiguration {
  id: string;
  title: string;
  badge: string;
  description: string;
  tagline: string;
  recipes: CanonicalRecipe[];
  totalEstMinutes: number;
  stationsSummary: string[];
}

/**
 * Genera hasta 3 propuestas o configuraciones completas de menú inteligentes
 * basadas en las preferencias del usuario pero explorando distintas técnicas culinarias
 * (ej: Tradicional de Cuchara vs Express Horno & Salteados vs Marinero & Huerta)
 */
export function generateMenuConfigurations(
  query: string,
  targetDishesCount: number = 4,
  dietStyle: string = 'mediterranean',
  excludedAllergens: string[] = [],
  sourceFilter: string = 'all'
): BatchMenuConfiguration[] {
  const families = detectIngredientFamilies(query, excludedAllergens, sourceFilter);
  const configs: BatchMenuConfiguration[] = [];

  // Helper para filtrar por alérgenos y dieta
  const isEligible = (r: CanonicalRecipe) => {
    if (sourceFilter === 'cocina_tradicional' && r.source !== 'Cocina Tradicional') return false;
    if (sourceFilter === 'karlos_arguinano' && r.source !== 'Karlos Arguiñano') return false;
    if (excludedAllergens.length > 0 && r.allergens.some(a => excludedAllergens.includes(a))) return false;
    if (dietStyle && dietStyle !== 'all' && dietStyle !== 'mediterranean') {
      if (!r.suitableDiets.includes(dietStyle as any)) return false;
    }
    return true;
  };

  // CONFIGURACIÓN 1: "Clásica de Cuchara & Guisos Tradicionales"
  const cucharaRecipes: CanonicalRecipe[] = [];
  const cucharaStations = new Set<string>();

  for (const fam of families) {
    const matchingVar = fam.variations.find(v => 
      isEligible(v) && 
      (v.category === 'legumbres' || v.category === 'carnes' || v.station === 'olla_expres' || v.station === 'fuego_1' || v.name.toLowerCase().includes('guiso') || v.name.toLowerCase().includes('potaje') || v.name.toLowerCase().includes('pepitoria') || v.name.toLowerCase().includes('marmitako') || v.name.toLowerCase().includes('alubia'))
    ) || fam.variations[0];

    if (matchingVar && !cucharaRecipes.some(r => r.id === matchingVar.id)) {
      cucharaRecipes.push(matchingVar);
      cucharaStations.add(matchingVar.station);
    }
  }

  // Rellenar con clásicos tradicionales
  const cucharaFull = buildSmartMultiStationBatch(cucharaRecipes.map(r => r.id), targetDishesCount, dietStyle, excludedAllergens, sourceFilter);
  configs.push({
    id: 'config_cuchara_abuela',
    title: 'Propuesta 1: Guisos de Cuchara & Cocina de Fondo',
    badge: '👵 Sabor Profundo & Fondos Lentos',
    tagline: 'Guisos tradicionales, fondos caseros y potajes de cuchara',
    description: 'Aprovecha tus ingredientes en elaboraciones melosas de cocción pausada y potajes con sofrito noble.',
    recipes: cucharaFull,
    totalEstMinutes: 110,
    stationsSummary: Array.from(new Set(cucharaFull.map(r => r.station)))
  });

  // CONFIGURACIÓN 2: "Express 90 Min & Asados al Horno"
  const expressRecipes: CanonicalRecipe[] = [];
  for (const fam of families) {
    const matchingVar = fam.variations.find(v => 
      isEligible(v) && 
      (v.station === 'horno' || v.station === 'fuego_2' || v.name.toLowerCase().includes('ajoarriero') || v.name.toLowerCase().includes('ajillo') || v.name.toLowerCase().includes('asado') || v.name.toLowerCase().includes('tortilla') || v.name.toLowerCase().includes('pil-pil'))
    ) || fam.variations[fam.variations.length - 1];

    if (matchingVar && !expressRecipes.some(r => r.id === matchingVar.id)) {
      expressRecipes.push(matchingVar);
    }
  }
  const expressFull = buildSmartMultiStationBatch(expressRecipes.map(r => r.id), targetDishesCount, 'express_90min', excludedAllergens, sourceFilter);
  configs.push({
    id: 'config_express_horno',
    title: 'Propuesta 2: Express 90 Min & Asados / Salteados',
    badge: '⚡ Máxima Rapidez & Horno',
    tagline: 'Técnicas de calor directo, asados en bandeja y salteados vivos',
    description: 'Cocción optimizada en paralelo: proteínas al horno o sartén rápida para reducir tiempos totales.',
    recipes: expressFull,
    totalEstMinutes: 85,
    stationsSummary: Array.from(new Set(expressFull.map(r => r.station)))
  });

  // CONFIGURACIÓN 3: "Cazuela Marinera & Huerta Fresca"
  const marineraRecipes: CanonicalRecipe[] = [];
  for (const fam of families) {
    const matchingVar = fam.variations.find(v => 
      isEligible(v) && 
      (v.category === 'arroces_pastas' || v.name.toLowerCase().includes('arroz') || v.name.toLowerCase().includes('salsa verde') || v.name.toLowerCase().includes('tortilla') || v.category === 'verduras' || v.name.toLowerCase().includes('marinera'))
    ) || fam.variations[Math.floor(fam.variations.length / 2)];

    if (matchingVar && !marineraRecipes.some(r => r.id === matchingVar.id)) {
      marineraRecipes.push(matchingVar);
    }
  }
  const marineraFull = buildSmartMultiStationBatch(marineraRecipes.map(r => r.id), targetDishesCount, dietStyle, excludedAllergens, sourceFilter);
  configs.push({
    id: 'config_marinera_huerta',
    title: 'Propuesta 3: Arroces Melosos & Huerta Fresca',
    badge: '🌊 Fresco, Marinero & Huerta',
    tagline: 'Cazuelas de arroz meloso, salsas verdes y verduras confitadas',
    description: 'Platos ligeros y vibrantes combinados con guarniciones hortícolas y tortillas jugosas.',
    recipes: marineraFull,
    totalEstMinutes: 95,
    stationsSummary: Array.from(new Set(marineraFull.map(r => r.station)))
  });

  return configs;
}

/**
 * Construye un lote inteligente equilibrado con concurrencia de estaciones térmicas
 */
export function buildSmartMultiStationBatch(
  primaryRecipeIds: string[],
  targetCount: number = 4,
  dietStyle?: string,
  excludedAllergens: string[] = [],
  sourceFilter: string = 'all'
): CanonicalRecipe[] {
  const selected: CanonicalRecipe[] = [];
  const usedStations = new Set<string>();

  // 1. Agregar recetas seleccionadas primarias
  for (const id of primaryRecipeIds) {
    const r = TRADITIONAL_RECIPES_DATABASE.find(x => x.id === id);
    if (r && (!excludedAllergens.length || !r.allergens.some(a => excludedAllergens.includes(a)))) {
      if (sourceFilter === 'all' || (sourceFilter === 'cocina_tradicional' && r.source === 'Cocina Tradicional') || (sourceFilter === 'karlos_arguinano' && r.source === 'Karlos Arguiñano')) {
        selected.push(r);
        usedStations.add(r.station);
      }
    }
  }

  if (selected.length >= targetCount) {
    return selected.slice(0, targetCount);
  }

  // 2. Rellenar priorizando estaciones térmicas no utilizadas (horno, olla_expres, fuegos, robot)
  const remaining = TRADITIONAL_RECIPES_DATABASE.filter(r => 
    !selected.some(s => s.id === r.id) &&
    (sourceFilter === 'all' || (sourceFilter === 'cocina_tradicional' && r.source === 'Cocina Tradicional') || (sourceFilter === 'karlos_arguinano' && r.source === 'Karlos Arguiñano')) &&
    (!excludedAllergens.length || !r.allergens.some(a => excludedAllergens.includes(a))) &&
    (!dietStyle || dietStyle === 'all' || dietStyle === 'mediterranean' || dietStyle === 'express_90min' || r.suitableDiets.includes(dietStyle as any))
  );

  // Ordenar priorizando estaciones térmicas libres
  remaining.sort((a, b) => {
    const aUsed = usedStations.has(a.station) ? 1 : 0;
    const bUsed = usedStations.has(b.station) ? 1 : 0;
    return aUsed - bUsed;
  });

  for (const candidate of remaining) {
    if (selected.length >= targetCount) break;
    selected.push(candidate);
    usedStations.add(candidate.station);
  }

  return selected;
}
