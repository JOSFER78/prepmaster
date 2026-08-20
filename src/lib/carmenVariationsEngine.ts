import { CARMEN_RECIPES_DATABASE, CanonicalRecipe } from '../data/recipesCarmenDatabase';

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
  excludedAllergens: string[] = []
): IngredientFamilyGroup[] {
  if (!query || !query.trim()) return [];

  const normalized = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const detected: IngredientFamilyGroup[] = [];

  for (const fam of FAMILY_DEFINITIONS) {
    const hasMatch = fam.keywords.some(kw => normalized.includes(kw));
    if (hasMatch) {
      const variations = CARMEN_RECIPES_DATABASE.filter(r => {
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
  excludedAllergens: string[] = []
): CanonicalRecipe[] {
  const current = CARMEN_RECIPES_DATABASE.find(r => r.id === recipeId);
  if (!current) return [];

  return CARMEN_RECIPES_DATABASE.filter(r => {
    if (r.id === recipeId) return false;
    if (excludedAllergens.length > 0 && r.allergens.some(a => excludedAllergens.includes(a))) return false;

    // Priorizar misma familia de ingrediente o misma categoría
    if (current.mainIngredientFamily && r.mainIngredientFamily === current.mainIngredientFamily) {
      return true;
    }
    return r.category === current.category;
  });
}

/**
 * Construye un lote inteligente equilibrado con concurrencia de estaciones térmicas
 */
export function buildSmartMultiStationBatch(
  primaryRecipeIds: string[],
  targetCount: number = 4,
  dietStyle?: string,
  excludedAllergens: string[] = []
): CanonicalRecipe[] {
  const selected: CanonicalRecipe[] = [];
  const usedStations = new Set<string>();

  // 1. Agregar recetas seleccionadas primarias
  for (const id of primaryRecipeIds) {
    const r = CARMEN_RECIPES_DATABASE.find(x => x.id === id);
    if (r && (!excludedAllergens.length || !r.allergens.some(a => excludedAllergens.includes(a)))) {
      selected.push(r);
      usedStations.add(r.station);
    }
  }

  if (selected.length >= targetCount) {
    return selected.slice(0, targetCount);
  }

  // 2. Rellenar priorizando estaciones térmicas no utilizadas (horno, olla_expres, fuegos, robot)
  const remaining = CARMEN_RECIPES_DATABASE.filter(r => 
    !selected.some(s => s.id === r.id) &&
    (!excludedAllergens.length || !r.allergens.some(a => excludedAllergens.includes(a))) &&
    (!dietStyle || r.suitableDiets.includes(dietStyle as any))
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
