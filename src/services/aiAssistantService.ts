import { CARMEN_RECIPES_DATABASE, CanonicalRecipe } from '../data/recipesCarmenDatabase';
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

  const prompt = `Genera un menú semanal de Batch Cooking para ${peopleCount} personas durante ${daysCount} días.
Alérgenos a excluir: ${allergens.join(', ') || 'Ninguno'}.
Petición específica del usuario: "${userGoal}".

Debes responder ÚNICAMENTE un objeto JSON válido con esta estructura exacta, sin markdown adicional:
{
  "title": "Título sugerente del menú",
  "philosophy": "Explicación de por qué este menú y cómo se cocina en 2 horas en paralelo",
  "selectedRecipeIds": ["carmen-lentejas-chorizo", "carmen-pollo-pepitoria", "carmen-merluza-salsa-verde", "carmen-pisto-manchego"],
  "servingsPerDish": {
    "carmen-lentejas-chorizo": 8,
    "carmen-pollo-pepitoria": 8,
    "carmen-merluza-salsa-verde": 6,
    "carmen-pisto-manchego": 6
  },
  "variationsAndTips": [
    "Consejo de mise en place previa",
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
        temperature: 0.4,
        max_tokens: 1000
      })
    });

    const data = await response.json();
    let content = data.choices?.[0]?.message?.content || '{}';
    // Clean code blocks if present
    content = content.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(content) as AIPlanProposal;
    return parsed;
  } catch (error) {
    console.warn('Fallback generating default proposal due to LLM error:', error);
    return {
      title: `Menú Tradicional Mediterráneo (${peopleCount} comensales · ${daysCount} días)`,
      philosophy: `Estructura armónica con legumbres, ave y pescados de Cocina con Carmen coordinados en paralelo.`,
      selectedRecipeIds: ['carmen-lentejas-chorizo', 'carmen-pollo-pepitoria', 'carmen-merluza-salsa-verde', 'carmen-crema-calabacin-suave'],
      servingsPerDish: {
        'carmen-lentejas-chorizo': peopleCount * 2,
        'carmen-pollo-pepitoria': peopleCount * 2,
        'carmen-merluza-salsa-verde': peopleCount * 2,
        'carmen-crema-calabacin-suave': peopleCount * 2
      },
      variationsAndTips: [
        'Hacer sofrito madre unificado para las lentejas y la salsa del pollo.',
        'Hornear y cocer en paralelo para optimizar a 2 horas.'
      ]
    };
  }
}
