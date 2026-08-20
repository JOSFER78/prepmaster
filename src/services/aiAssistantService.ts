import { CARMEN_RECIPES_DATABASE, CanonicalRecipe, matchCarmenRecipesByPrompt } from '../data/recipesCarmenDatabase';
import { BatchDish, GeneratedMenuPlan } from '../types';

const DEFAULT_BASE_URL = 'https://143-47-35-167.sslip.io/v1';
const DEFAULT_API_KEY = 'freellmapi-bc5d56dc6a1548c6c11a0d409008b1ed0273e4105cd64784';
const DEFAULT_MODEL = 'auto';

export interface AIChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
  suggestedRecipes?: string[]; // IDs of Carmen recipes suggested in this message
}

export interface AIPlanProposal {
  title: string;
  philosophy: string;
  selectedRecipeIds: string[];
  servingsPerDish: Record<string, number>;
  variationsAndTips: string[];
}

/**
 * Resumen del catálogo de Carmen para alimentar el System Prompt del LLM
 */
function getCarmenCatalogSummary(): string {
  return CARMEN_RECIPES_DATABASE.map(r => 
    `- [ID: ${r.id}] "${r.name}" (${r.category}, estación: ${r.station}, tiempo: ${r.prepTimeFormatted}, alérgenos: ${r.allergens.join(', ') || 'ninguno'}, nevera: ${r.shelfLifeDaysFridge}d)`
  ).join('\n');
}

/**
 * Envía una conversación al endpoint OpenAI-compatible de FreeLLMApi
 */
export async function sendChatMessageToFreeLLM(
  messages: AIChatMessage[],
  customApiKey?: string,
  customBaseUrl?: string
): Promise<string> {
  const baseUrl = customBaseUrl || DEFAULT_BASE_URL;
  const apiKey = customApiKey || DEFAULT_API_KEY;

  const systemPrompt = `Eres TouChef AI, el Copiloto Culinario y Asesor Culinario Experto de la plataforma TouChef 2.0.
Tu conocimiento proviene directamente del recetario tradicional de Cocina con Carmen y de los compendios técnicos de Batch Cooking y Seguridad Alimentaria (docs/fuentes/).

DIRECTIVAS PRINCIPALES:
1. Habla con cercanía, profesionalidad y pasión por la cocina casera tradicional y saludable.
2. Si el usuario te da pocos detalles, hazle 1 o 2 preguntas clave (número de comensales, días, gustos, intolerancias, o qué tiene en su despensa).
3. Propón siempre platos concretos de la base canónica de Cocina con Carmen.
4. Explica las raciones recomendadas, los gramajes aproximados y cómo coordinar la cocción en paralelo (olla rápida, horno, fuegos).
5. Si el usuario pide variaciones (ej: sin gluten, sin cerdo, más proteína, vegetariano), explícale la adaptación técnica exacta.
6. Al proponer un lote o menú, incluye siempre los [ID: carmen-...] de las recetas recomendadas para que el sistema pueda cargarlas automáticamente.

CATÁLOGO CANÓNICO DE RECETAS DE CARMEN DISPONIBLES:
${getCarmenCatalogSummary()}
`;

  const payloadMessages = [
    { role: 'system', content: systemPrompt },
    ...messages.map(m => ({ role: m.role, content: m.content }))
  ];

  try {
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: DEFAULT_MODEL,
        messages: payloadMessages,
        temperature: 0.7,
        max_tokens: 1200
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Error ${response.status} de FreeLLM API: ${errText}`);
    }

    const data = await response.json();
    const assistantContent = data.choices?.[0]?.message?.content || 'No se pudo generar respuesta del copiloto.';
    return assistantContent;
  } catch (error: any) {
    console.error('Error en sendChatMessageToFreeLLM:', error);
    throw error;
  }
}

/**
 * Extrae los IDs de recetas de Carmen sugeridas en el texto de la IA
 */
export function extractRecipeIdsFromAIText(text: string): string[] {
  const matches = text.match(/carmen-[\w-]+/g);
  if (!matches) return [];
  const unique = Array.from(new Set(matches));
  return unique.filter(id => CARMEN_RECIPES_DATABASE.some(r => r.id === id));
}

export interface QuickActionPrompt {
  id: string;
  label: string;
  icon: string;
  prompt: string;
}

export const QUICK_ACTION_PROMPTS: QuickActionPrompt[] = [
  {
    id: 'more_veggies',
    label: '🥗 Más Verduras & Ligero',
    icon: 'Salad',
    prompt: 'Por favor, haz el menú más ligero aumentando la presencia de verduras de temporada, cremas y reduciendo grasas.'
  },
  {
    id: 'swap_to_fish',
    label: '🐟 Más Pescado & Mariscos',
    icon: 'Fish',
    prompt: 'Prefiero incluir más pescado blanco o azul de lonja en vez de carnes.'
  },
  {
    id: 'express_90min',
    label: '⚡ Optimizar a 90 Minutos',
    icon: 'Zap',
    prompt: 'Optimiza el lote para cocinarlo en menos de 90 minutos usando olla rápida y horno en paralelo.'
  },
  {
    id: 'high_protein',
    label: '💪 Alto en Proteínas',
    icon: 'Dumbbell',
    prompt: 'Adapta las raciones y platos para un enfoque Fitness con alta densidad proteica y legumbres saciantes.'
  },
  {
    id: 'add_soup',
    label: '🍲 Añadir Crema o Cuchara',
    icon: 'Soup',
    prompt: 'Quiero asegurarme de tener una buena crema de verduras o plato de cuchara para las cenas.'
  }
];

/**
 * Solicita a la IA sustituir una receta específica por otra alternativa idónea
 */
export async function requestAISwapRecipe(
  currentRecipeIds: string[],
  recipeToReplaceId: string,
  userReason: string = '',
  allergens: string[] = []
): Promise<{ newRecipeId: string; reason: string }> {
  const currentDishesNames = currentRecipeIds.map(id => {
    const r = CARMEN_RECIPES_DATABASE.find(x => x.id === id);
    return r ? `"${r.name}" (${r.category})` : id;
  }).join(', ');

  const targetDish = CARMEN_RECIPES_DATABASE.find(x => x.id === recipeToReplaceId)?.name || recipeToReplaceId;

  const prompt = `Actualmente el menú tiene estos platos: ${currentDishesNames}.
Queremos SUSTITUIR el plato "${targetDish}" por otra receta del catálogo de Carmen.
Motivo o preferencia del usuario: "${userReason || 'Dar otra alternativa deliciosa y compatible'}".
Alérgenos a evitar: ${allergens.join(', ') || 'Ninguno'}.

Catálogo disponible:
${CARMEN_RECIPES_DATABASE.filter(r => !currentRecipeIds.includes(r.id)).map(r => `- [ID: ${r.id}] "${r.name}" (${r.category}, ${r.prepTimeFormatted})`).join('\n')}

Responde ÚNICAMENTE un JSON con:
{
  "newRecipeId": "carmen-...",
  "reason": "Breve explicación de por qué esta receta encaja perfectamente como sustituta"
}`;

  try {
    const response = await fetch(`${DEFAULT_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEFAULT_API_KEY}`
      },
      body: JSON.stringify({
        model: DEFAULT_MODEL,
        messages: [
          { role: 'system', content: 'Eres un asistente culinario experto. Responde sólo JSON válido.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.3,
        max_tokens: 400
      })
    });

    const data = await response.json();
    let content = data.choices?.[0]?.message?.content || '{}';
    content = content.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(content);
    if (parsed.newRecipeId && CARMEN_RECIPES_DATABASE.some(r => r.id === parsed.newRecipeId)) {
      return parsed;
    }
  } catch (err) {
    console.warn('Fallback swap recipe:', err);
  }

  // Fallback: pick another recipe from database not in current
  const alternative = CARMEN_RECIPES_DATABASE.find(r => !currentRecipeIds.includes(r.id) && !r.allergens.some(a => allergens.includes(a))) || CARMEN_RECIPES_DATABASE[0];
  return {
    newRecipeId: alternative.id,
    reason: `Sustituido por ${alternative.name} para mantener el equilibrio del lote.`
  };
}

/**
 * Pide a la IA una propuesta estructurada en formato JSON para autoconfigurar el lote semanal
 */
export async function generateStructuredAIProposal(
  userGoal: string,
  peopleCount: number,
  daysCount: number,
  allergens: string[] = [],
  customApiKey?: string
): Promise<AIPlanProposal> {
  const baseUrl = DEFAULT_BASE_URL;
  const apiKey = customApiKey || DEFAULT_API_KEY;

  // Pre-emparejar deterministicamente con el recetario de Carmen por si la IA tarda o falla
  const preMatched = matchCarmenRecipesByPrompt(userGoal, allergens, undefined, 4);
  const preMatchedIds = preMatched.map(r => r.id);

  const prompt = `Genera un menú semanal de Batch Cooking para ${peopleCount} personas durante ${daysCount} días.
Alérgenos a excluir: ${allergens.join(', ') || 'Ninguno'}.
Petición específica del usuario: "${userGoal}".

CANDIDATOS PRIORITARIOS RECOMENDADOS SEGÚN LA PETICIÓN DEL USUARIO:
${preMatched.map(r => `- [ID: ${r.id}] "${r.name}" (${r.category}, estación: ${r.station}, tiempo: ${r.prepTimeFormatted})`).join('\n')}

Debes responder ÚNICAMENTE un objeto JSON válido con esta estructura exacta, sin markdown adicional:
{
  "title": "Título sugerente del menú",
  "philosophy": "Explicación de cómo este menú cumple la petición '${userGoal}' y cómo se cocina en 2 horas en paralelo",
  "selectedRecipeIds": ${JSON.stringify(preMatchedIds)},
  "servingsPerDish": {
    "${preMatchedIds[0] || 'carmen-lentejas-chorizo'}": ${Math.max(4, peopleCount * 2)},
    "${preMatchedIds[1] || 'carmen-pollo-pepitoria'}": ${Math.max(4, peopleCount * 2)}
  },
  "variationsAndTips": [
    "Consejo de mise en place previa para coordinar fuegos",
    "Adaptación de cocción en paralelo"
  ]
}

Usa EXCLUSIVAMENTE IDs reales del catálogo de Carmen:
${CARMEN_RECIPES_DATABASE.map(r => r.id).join(', ')}`;

  try {
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: DEFAULT_MODEL,
        messages: [
          { role: 'system', content: 'Eres un generador JSON culinario estricto de TouChef. Devuelve sólo JSON válido sin bloques markdown ni texto exterior.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.3,
        max_tokens: 1000
      })
    });

    const data = await response.json();
    let content = data.choices?.[0]?.message?.content || '{}';
    content = content.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(content) as AIPlanProposal;

    // Validar que los IDs devueltos existen realmente en el catálogo
    const validIds = (parsed.selectedRecipeIds || []).filter(id => CARMEN_RECIPES_DATABASE.some(r => r.id === id));
    if (validIds.length > 0) {
      return {
        ...parsed,
        selectedRecipeIds: validIds
      };
    }
  } catch (error) {
    console.warn('Fallback generating smart matched proposal due to LLM error:', error);
  }

  // Fallback garantizado e inmediato con las recetas emparejadas por ingredientes reales
  const fallbackServings: Record<string, number> = {};
  preMatchedIds.forEach(id => {
    fallbackServings[id] = Math.max(4, Math.ceil((peopleCount * daysCount * 2) / Math.max(1, preMatchedIds.length)));
  });

  return {
    title: userGoal ? `Menú Adaptado: ${userGoal.slice(0, 45)}` : `Menú Tradicional Equilibrado (${peopleCount} personas · ${daysCount} días)`,
    philosophy: `Estructura optimizada con recetas de Carmen seleccionadas expresamente según tus preferencias (${userGoal || 'Equilibrado'}), coordinadas en paralelo.`,
    selectedRecipeIds: preMatchedIds.length > 0 ? preMatchedIds : ['carmen-lentejas-chorizo', 'carmen-pollo-pepitoria', 'carmen-pisto-manchego', 'carmen-crema-calabacin-suave'],
    servingsPerDish: fallbackServings,
    variationsAndTips: [
      'Picar todas las verduras en mise en place antes de encender fogones.',
      'Cocinar en paralelo usando la olla rápida y los fuegos para terminar en 2 horas.'
    ]
  };
}
