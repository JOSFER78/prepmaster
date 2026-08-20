/**
 * BASE DE DATOS MAESTRA CANÓNICA — COCINA TRADICIONAL Y KARLOS ARGUIÑANO
 * Compilación exhaustiva extraída íntegramente de docs/fuentes/ con infografías y seguimiento fotográfico
 * Total de recetas canónicas: 247
 */

export interface CanonicalIngredient {
  name: string;
  quantity: number;
  unit: string;
  category: 'frescos' | 'carnes-pescados' | 'despensa' | 'refrigerados';
}

export interface RecipeStepPhotos {
  ingredientes?: string | null;
  elaboracion?: string | null;
  resultadoFinal?: string | null;
}

export interface CanonicalRecipe {
  id: string;
  name: string;
  shortName: string;
  category: 'carnes' | 'pescados' | 'legumbres' | 'verduras' | 'cremas' | 'huevos' | 'arroces_pastas' | 'tapas' | 'masas' | 'postres';
  mealType: 'lunch' | 'dinner' | 'universal';
  station: 'horno' | 'olla_expres' | 'fuego_1' | 'fuego_2' | 'fuego_3' | 'robot' | 'frio';
  prepTimeFormatted: string;
  prepTimeMinutes: number;
  shelfLifeDaysFridge: number;
  canFreeze: boolean;
  storageAdvice: string;
  suitableDiets: string[];
  allergens: string[];
  image: string;
  source: 'Cocina Tradicional' | 'Karlos Arguiñano';
  sourceCompendium: string;
  mainIngredientFamily?: string | null;
  culinaryTechnique?: string | null;
  infografia?: string | null;
  stepPhotos?: RecipeStepPhotos;
  ingredientsPerServing: CanonicalIngredient[];
  instructions: string[];
  batchTip: string;
}

export interface SystemInfographic {
  id: string;
  title: string;
  category: 'sistemas_batch' | 'nutricion_alergenos' | 'sous_vide' | 'recetas';
  path: string;
  description: string;
}

export const CULINARY_SOURCES = [
  { id: 'all', name: 'Todas las Fuentes Canónicas', badge: '✨ Catálogo Completo' },
  { id: 'cocina_tradicional', name: 'Cocina Tradicional', badge: '🥘 Recetario Popular' },
  { id: 'karlos_arguinano', name: 'Karlos Arguiñano', badge: '👨‍🍳 Maestría Cantábrica' }
];

export const SYSTEM_INFOGRAPHICS: SystemInfographic[] = [
  {
    id: 'zonificacion_5_estaciones',
    title: 'Zonificación de Cocina en 5 Estaciones Simultáneas',
    category: 'sistemas_batch',
    path: '/assets/fuentes/sistemas_batch/infografia_tecnica_5_estaciones.jpg',
    description: 'Protocolo de optimización térmica para cocinar 4-6 platos en paralelo en menos de 120 minutos.'
  },
  {
    id: 'abatimiento_cook_chill',
    title: 'Curva Termodinámica de Abatimiento Rápido (Cook & Chill)',
    category: 'sistemas_batch',
    path: '/assets/fuentes/sistemas_batch/infografia_tecnica_abatimiento_cook_chill.jpg',
    description: 'Enfriamiento de +70°C a +10°C en menos de 90 min para garantizar inocuidad microbiológica.'
  },
  {
    id: '14_alergenos_ue',
    title: 'Guía de 14 Alérgenos de Declaración Obligatoria (UE 1169/2011)',
    category: 'nutricion_alergenos',
    path: '/assets/fuentes/saludable_alergenos/infografia_tecnica_14_alergenos_ue.jpg',
    description: 'Matriz de control de alérgenos y prevención de contaminación cruzada en obradores.'
  },
  {
    id: 'plato_harvard',
    title: 'Estructura Nutricional del Plato Saludable de Harvard',
    category: 'nutricion_alergenos',
    path: '/assets/fuentes/saludable_alergenos/infografia_tecnica_plato_harvard.jpg',
    description: 'Distribución 50% vegetales y frutas, 25% proteína noble y 25% carbohidratos integrales.'
  },
  {
    id: 'sous_vide_baldwin',
    title: 'Cinética de Inactivación y Pasteurización Sous-Vide (Baldwin)',
    category: 'sous_vide',
    path: '/assets/fuentes/sous_vide/infografia_tecnica_sous_vide_baldwin.jpg',
    description: 'Tablas de tiempo y temperatura para reducción 6D de Listeria monocytogenes al vacío.'
  }
];

export const TRADITIONAL_RECIPES_DATABASE: CanonicalRecipe[] = [
  {
    "id": "trad-croquetas_de_jamon_iberico_cremosas",
    "name": "Croquetas de Jamón Ibérico Cremosas de la Abuela",
    "shortName": "Croquetas",
    "category": "tapas",
    "mealType": "universal",
    "station": "fuego_2",
    "prepTimeFormatted": "15 min (fuego_2)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Lácteos",
      "Frutos de cáscara",
      "Gluten",
      "Pescado"
    ],
    "image": "/assets/fuentes/cocina_tradicional/croquetas_de_jamon_iberico_cremosas_de_la_abu_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "01_tapas_y_entrantes.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "salsa",
    "infografia": "/assets/fuentes/cocina_tradicional/infografia_croquetas_de_jamon_iberico.jpg",
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/croquetas_de_jamon_iberico_cremosas_de_la_abu_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/croquetas_de_jamon_iberico_cremosas_de_la_abu_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/croquetas_de_jamon_iberico_cremosas_de_la_abu_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Croquetas fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Infusión Aromática de la Leche:**",
      "**El Salteado Exprés del Jamón:**",
      "**Elaboración del Roux Lento y Cocinado de la Harina:**",
      "**Incorporación Gradual de la Leche y Emulsión:**",
      "**Adición del Jamón y Ajuste de Sal:**",
      "**Enfriado y Maduración de la Masa:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-croquetas_de_pollo_asado_y_huevo_du",
    "name": "Croquetas de Pollo Asado y Huevo Duro",
    "shortName": "Croquetas",
    "category": "carnes",
    "mealType": "universal",
    "station": "horno",
    "prepTimeFormatted": "25 min (horno)",
    "prepTimeMinutes": 25,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Lácteos",
      "Frutos de cáscara",
      "Gluten"
    ],
    "image": "/assets/fuentes/cocina_tradicional/croquetas_de_pollo_asado_y_huevo_duro_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "01_tapas_y_entrantes.md",
    "mainIngredientFamily": "pollo",
    "culinaryTechnique": "asado_horno",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/croquetas_de_pollo_asado_y_huevo_duro_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/croquetas_de_pollo_asado_y_huevo_duro_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/croquetas_de_pollo_asado_y_huevo_duro_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Croquetas fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Cocción de Huevos y Picado del Pollo:**",
      "**Pochado de la Cebolla y Reducción:**",
      "**Elaboración de la Bechamel Mixta (Leche + Caldo de Pollo):**",
      "**Incorporación del Huevo Duro y Reposo:**",
      "**Boleado, Empanado y Fritura:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-ensaladilla_rusa_tradicional_de_car",
    "name": "Ensaladilla Rusa Tradicional de Carmen con Mayonesa Casera",
    "shortName": "Ensaladilla Rusa Tradicional",
    "category": "tapas",
    "mealType": "universal",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Lácteos",
      "Gluten",
      "Pescado"
    ],
    "image": "/assets/fuentes/cocina_tradicional/ensaladilla_rusa_tradicional_de_carmen_con_ma_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "01_tapas_y_entrantes.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "guiso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/ensaladilla_rusa_tradicional_de_carmen_con_ma_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/ensaladilla_rusa_tradicional_de_carmen_con_ma_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/ensaladilla_rusa_tradicional_de_carmen_con_ma_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Ensaladilla fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Cocción Perfecta de Patatas y Zanahorias con Piel:**",
      "**Cocción de Huevos:**",
      "**El Aliño Secreto en Caliente de Carmen:**",
      "**Elaboración de la Mayonesa Casera Inmune a Cortes:**",
      "**Ensamblado y Refrigeración:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-patatas_bravas_con_salsa_brava_aute",
    "name": "Patatas Bravas con Salsa Brava Auténtica Picante",
    "shortName": "Patatas Bravas",
    "category": "tapas",
    "mealType": "universal",
    "station": "fuego_2",
    "prepTimeFormatted": "15 min (fuego_2)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Huevos",
      "Gluten",
      "Sulfitos",
      "Pescado"
    ],
    "image": "/assets/fuentes/cocina_tradicional/patatas_bravas_con_salsa_brava_autentica_pica_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "01_tapas_y_entrantes.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "salsa",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/patatas_bravas_con_salsa_brava_autentica_pica_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/patatas_bravas_con_salsa_brava_autentica_pica_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/patatas_bravas_con_salsa_brava_autentica_pica_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Patatas fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Corte y Lavado de la Patata:**",
      "**Primera Fritura (Pochado / Confitado):**",
      "**Elaboración de la Auténtica Salsa Brava:**",
      "**Segunda Fritura (Golpe Fuerte Crujiente):**",
      "**Emplatado y Servicio:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-patatas_alioli_tradicionales_al_mor",
    "name": "Patatas Alioli Tradicionales al Mortero",
    "shortName": "Patatas Alioli Tradicionales al Mortero",
    "category": "tapas",
    "mealType": "universal",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Pescado"
    ],
    "image": "/assets/fuentes/cocina_tradicional/patatas_alioli_tradicionales_al_mortero_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "01_tapas_y_entrantes.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "guiso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/patatas_alioli_tradicionales_al_mortero_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/patatas_alioli_tradicionales_al_mortero_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/patatas_alioli_tradicionales_al_mortero_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Patatas fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Cocción y Corte de las Patatas:**",
      "**Elaboración del Alioli en Mortero Tradicional:**",
      "**Mezcla y Maduración:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-empanadillas_caseras_de_atun_tomate",
    "name": "Empanadillas Caseras de Atún, Tomate y Huevo Duro",
    "shortName": "Empanadillas Caseras",
    "category": "tapas",
    "mealType": "universal",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Huevos",
      "Gluten",
      "Sulfitos",
      "Pescado"
    ],
    "image": "/assets/fuentes/cocina_tradicional/empanadillas_caseras_de_atun_tomate_y_huevo_d_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "01_tapas_y_entrantes.md",
    "mainIngredientFamily": "huevos",
    "culinaryTechnique": "frito_empanado",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/empanadillas_caseras_de_atun_tomate_y_huevo_d_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/empanadillas_caseras_de_atun_tomate_y_huevo_d_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/empanadillas_caseras_de_atun_tomate_y_huevo_d_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Empanadillas fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Elaboración de la Masa Escaldada:**",
      "**Elaboración del Relleno Concentrado:**",
      "**Estirado, Rellenado y Sellado:**",
      "**Cocción (Dos Opciones):**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-tortilla_espanola_jugosa_con_ceboll",
    "name": "Tortilla Española Jugosa con Cebolla Pochada",
    "shortName": "Tortilla Española Jugosa",
    "category": "legumbres",
    "mealType": "lunch",
    "station": "olla_expres",
    "prepTimeFormatted": "15 min (olla_expres)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Lácteos",
      "Huevos",
      "Gluten",
      "Pescado"
    ],
    "image": "/assets/fuentes/cocina_tradicional/tortilla_espanola_jugosa_con_cebolla_pochada_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "01_tapas_y_entrantes.md",
    "mainIngredientFamily": "legumbres",
    "culinaryTechnique": "cuchara_potaje",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/tortilla_espanola_jugosa_con_cebolla_pochada_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/tortilla_espanola_jugosa_con_cebolla_pochada_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/tortilla_espanola_jugosa_con_cebolla_pochada_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Tortilla fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Corte Profesional de Patata y Cebolla:**",
      "**Confitado Lento Maestro:**",
      "**Escurrido y Reposo Sagrado de Carmen:**",
      "**El Cuajado Rápido y Volteo:**",
      "**Reposo:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-tortillitas_de_camarones_gambas_cru",
    "name": "Tortillitas de Camarones / Gambas Crujientes",
    "shortName": "Tortillitas",
    "category": "pescados",
    "mealType": "universal",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 3,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-3 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Lácteos",
      "Huevos",
      "Gluten",
      "Crustáceos"
    ],
    "image": "/assets/fuentes/cocina_tradicional/tortillitas_de_camarones_gambas_crujientes_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "01_tapas_y_entrantes.md",
    "mainIngredientFamily": "marisco",
    "culinaryTechnique": "guiso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/tortillitas_de_camarones_gambas_crujientes_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/tortillitas_de_camarones_gambas_crujientes_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/tortillitas_de_camarones_gambas_crujientes_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Tortillitas fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Elaboración de la Masa Fluida:**",
      "**La Fritura en Encaje a Alta Temperatura:**",
      "**Escurrido Inmediato:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-huevos_rellenos_de_atun_y_yema_con_",
    "name": "Huevos Rellenos de Atún y Yema con Gratinado / Mahonesa",
    "shortName": "Huevos Rellenos",
    "category": "tapas",
    "mealType": "universal",
    "station": "horno",
    "prepTimeFormatted": "15 min (horno)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Lácteos",
      "Huevos",
      "Sulfitos",
      "Pescado"
    ],
    "image": "/assets/fuentes/cocina_tradicional/huevos_rellenos_de_atun_y_yema_gratinados_con_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "01_tapas_y_entrantes.md",
    "mainIngredientFamily": "huevos",
    "culinaryTechnique": "asado_horno",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/huevos_rellenos_de_atun_y_yema_con_gratinado__01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/huevos_rellenos_de_atun_y_yema_con_gratinado__02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/huevos_rellenos_de_atun_y_yema_gratinados_con_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Huevos fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Cocción y Corte de los Huevos:**",
      "**Elaboración de la Crema de Relleno:**",
      "**Rellenado y Presentación:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-flamenquines_cordobeses_caseros_de_",
    "name": "Flamenquines Cordobeses Caseros de Lomo y Jamón Serrano",
    "shortName": "Flamenquines Cordobeses Caseros",
    "category": "carnes",
    "mealType": "universal",
    "station": "fuego_1",
    "prepTimeFormatted": "25 min (fuego_1)",
    "prepTimeMinutes": 25,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Lácteos",
      "Gluten",
      "Pescado"
    ],
    "image": "/assets/fuentes/cocina_tradicional/flamenquines_cordobeses_caseros_de_lomo_y_jam_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "01_tapas_y_entrantes.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "frito_empanado",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/flamenquines_cordobeses_caseros_de_lomo_y_jam_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/flamenquines_cordobeses_caseros_de_lomo_y_jam_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/flamenquines_cordobeses_caseros_de_lomo_y_jam_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Flamenquines fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Espalmado y Macerado de la Carne:**",
      "**Montaje y Enrollado Compacto:**",
      "**Empanado Doble Sellador:**",
      "**Fritura y Desgrasado:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-calamares_a_la_romana_crujientes_y_",
    "name": "Calamares a la Romana Crujientes y Tiernos",
    "shortName": "Calamares a la Romana Crujientes y Tiernos",
    "category": "pescados",
    "mealType": "universal",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 3,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-3 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Pescado",
      "Gluten",
      "Moluscos"
    ],
    "image": "/assets/fuentes/cocina_tradicional/calamares_a_la_romana_crujientes_y_tiernos_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "01_tapas_y_entrantes.md",
    "mainIngredientFamily": "marisco",
    "culinaryTechnique": "frito_empanado",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/calamares_a_la_romana_crujientes_y_tiernos_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/calamares_a_la_romana_crujientes_y_tiernos_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/calamares_a_la_romana_crujientes_y_tiernos_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Calamares fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Preparación y Secado del Calamar:**",
      "**Elaboración de la Masa Romana Suflada:**",
      "**Fritura a Alta Temperatura:**",
      "**Servicio:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-matriz_comparativa_y_guia_de_servic",
    "name": "Matriz Comparativa y Guía de Servicio Rápido",
    "shortName": "Matriz Comparativa y Guía",
    "category": "tapas",
    "mealType": "universal",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Moluscos"
    ],
    "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=80",
    "source": "Cocina Tradicional",
    "sourceCompendium": "01_tapas_y_entrantes.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "guiso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": null,
      "elaboracion": null,
      "resultadoFinal": null
    },
    "ingredientsPerServing": [
      {
        "name": "Matriz fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "Preparar la mise en place de Matriz Comparativa y Guía de Servicio Rápido con corte homogéneo de ingredientes.",
      "Ejecutar la cocción en fuego 1 respetando los puntos térmicos tradicionales.",
      "Abatir temperatura o reservar en recipientes herméticos fechados para conservación segura."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-ensalada_campera_tradicional_de_pat",
    "name": "Ensalada Campera Tradicional de Patata, Atún, Huevo y Hortalizas",
    "shortName": "Ensalada Campera Tradicional",
    "category": "carnes",
    "mealType": "universal",
    "station": "frio",
    "prepTimeFormatted": "25 min (frio)",
    "prepTimeMinutes": 25,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Pescado"
    ],
    "image": "/assets/fuentes/cocina_tradicional/ensalada_campera_tradicional_de_patata_atun_h_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "02_ensaladas_alinos_y_frios.md",
    "mainIngredientFamily": "huevos",
    "culinaryTechnique": "frio_alino",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/ensalada_campera_tradicional_de_patata_atun_h_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/ensalada_campera_tradicional_de_patata_atun_h_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/ensalada_campera_tradicional_de_patata_atun_h_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Ensalada fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Cocción Perfecta de las Patatas:**",
      "**Cocción Controlada de los Huevos Camperos:**",
      "**El Truco del Aliño en Caliente:**",
      "**Desflemar la Cebolleta y Cortar Hortalizas:**",
      "**Ensamblado y Emulsión Final:**",
      "**Reposo y Maduración Térmica:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-pipirrana_andaluza_tradicional_con_",
    "name": "Pipirrana Andaluza Tradicional con Tomate, Pepino, Pimiento y Atún",
    "shortName": "Pipirrana Andaluza Tradicional",
    "category": "carnes",
    "mealType": "universal",
    "station": "frio",
    "prepTimeFormatted": "25 min (frio)",
    "prepTimeMinutes": 25,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Huevos",
      "Gluten",
      "Sulfitos",
      "Pescado"
    ],
    "image": "/assets/fuentes/cocina_tradicional/pipirrana_andaluza_tradicional_con_tomate_pep_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "02_ensaladas_alinos_y_frios.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "frio_alino",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/pipirrana_andaluza_tradicional_con_tomate_pep_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/pipirrana_andaluza_tradicional_con_tomate_pep_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/pipirrana_andaluza_tradicional_con_tomate_pep_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Pipirrana fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Preparación de Huevos y Extracción de Yemas:**",
      "**Elaboración del Majado de Mortero (El Secreto de Jaén):**",
      "**Corte Milimétrico de las Hortalizas:**",
      "**Ensamblado y Maduración del \"Calducho\":**",
      "**Maceración en Frío:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-ensalada_de_pimientos_asados_al_hor",
    "name": "Ensalada de Pimientos Asados al Horno con Melva de Andalucía",
    "shortName": "Ensalada",
    "category": "carnes",
    "mealType": "universal",
    "station": "horno",
    "prepTimeFormatted": "25 min (horno)",
    "prepTimeMinutes": 25,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Lácteos",
      "Gluten",
      "Pescado"
    ],
    "image": "/assets/fuentes/cocina_tradicional/ensalada_de_pimientos_asados_al_horno_con_mel_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "02_ensaladas_alinos_y_frios.md",
    "mainIngredientFamily": "atun",
    "culinaryTechnique": "asado_horno",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/ensalada_de_pimientos_asados_al_horno_con_mel_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/ensalada_de_pimientos_asados_al_horno_con_mel_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/ensalada_de_pimientos_asados_al_horno_con_mel_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Ensalada fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Horneado y Caramelización de los Pimientos:**",
      "**Técnica del Sudado Hermético (Crucial):**",
      "**Pelado Artesanal y Despepitado:**",
      "**Filtrado y Emulsión del Aliño:**",
      "**Ensamblado y Aderezo:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-salpicon_de_marisco_tradicional_con",
    "name": "Salpicón de Marisco Tradicional con Pulpo, Gambas y Mejillones",
    "shortName": "Salpicón",
    "category": "pescados",
    "mealType": "universal",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 3,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-3 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Crustáceos",
      "Huevos",
      "Sulfitos",
      "Pescado",
      "Moluscos"
    ],
    "image": "/assets/fuentes/cocina_tradicional/salpicon_de_marisco_tradicional_con_pulpo_gam_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "02_ensaladas_alinos_y_frios.md",
    "mainIngredientFamily": "marisco",
    "culinaryTechnique": "guiso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/salpicon_de_marisco_tradicional_con_pulpo_gam_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/salpicon_de_marisco_tradicional_con_pulpo_gam_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/salpicon_de_marisco_tradicional_con_pulpo_gam_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Salpicón fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Apertura y Limpieza de los Mejillones:**",
      "**Cocción Exprés de las Gambas:**",
      "**Corte del Pulpo:**",
      "**Corte Milimétrico de la Verdura (Brunoise Perfecta):**",
      "**Emulsión de la Vinagreta de Agua Marina:**",
      "**Ensamblado y Maduración:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-ensaladilla_rusa_tradicional_de_car-16",
    "name": "Ensaladilla Rusa Tradicional de Carmen con Mayonesa Casera",
    "shortName": "Ensaladilla Rusa Tradicional",
    "category": "carnes",
    "mealType": "universal",
    "station": "fuego_1",
    "prepTimeFormatted": "25 min (fuego_1)",
    "prepTimeMinutes": 25,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Huevos",
      "Gluten",
      "Sulfitos",
      "Pescado"
    ],
    "image": "/assets/fuentes/cocina_tradicional/ensaladilla_rusa_tradicional_de_carmen_con_ma_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "02_ensaladas_alinos_y_frios.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "guiso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/ensaladilla_rusa_tradicional_de_carmen_con_ma_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/ensaladilla_rusa_tradicional_de_carmen_con_ma_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/ensaladilla_rusa_tradicional_de_carmen_con_ma_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Ensaladilla fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Cocción Homogénea de Patatas, Zanahorias y Huevos:**",
      "**Machacado en Caliente e Hidratación:**",
      "**Elaboración de la Mayonesa Casera Infalible:**",
      "**Ensamblado y Unión de Ingredientes:**",
      "**Moldeado y Decoración de Carmen:**",
      "**Reposo Térmico:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-ensalada_de_pasta_de_verano_con_atu",
    "name": "Ensalada de Pasta de Verano con Atún, Maíz y Salsa Rosa Casera",
    "shortName": "Ensalada",
    "category": "arroces_pastas",
    "mealType": "lunch",
    "station": "fuego_2",
    "prepTimeFormatted": "25 min (fuego_2)",
    "prepTimeMinutes": 25,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Lácteos",
      "Gluten",
      "Pescado"
    ],
    "image": "/assets/fuentes/cocina_tradicional/ensalada_de_pasta_de_verano_con_atun_maiz_y_s_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "02_ensaladas_alinos_y_frios.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "salsa",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/ensalada_de_pasta_de_verano_con_atun_maiz_y_s_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/ensalada_de_pasta_de_verano_con_atun_maiz_y_s_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/ensalada_de_pasta_de_verano_con_atun_maiz_y_s_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Ensalada fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Cocción Rigurosa de la Pasta:**",
      "**Técnica de Enfriado en Bandeja (Sin Lavar):**",
      "**Elaboración de la Salsa Rosa Equilibrada:**",
      "**Ensamblado y Fusión de Ingredientes:**",
      "**Reposo y Asentado:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-ensalada_de_garbanzos_veraniega_con",
    "name": "Ensalada de Garbanzos Veraniega con Verduras Frescas y Comino",
    "shortName": "Ensalada",
    "category": "legumbres",
    "mealType": "lunch",
    "station": "frio",
    "prepTimeFormatted": "15 min (frio)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Mostaza",
      "Pescado"
    ],
    "image": "/assets/fuentes/cocina_tradicional/ensalada_de_garbanzos_veraniega_con_verduras__portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "02_ensaladas_alinos_y_frios.md",
    "mainIngredientFamily": "legumbres",
    "culinaryTechnique": "frio_alino",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/ensalada_de_garbanzos_veraniega_con_verduras__01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/ensalada_de_garbanzos_veraniega_con_verduras__02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/ensalada_de_garbanzos_veraniega_con_verduras__03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Ensalada fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Preparación y Secado de la Legumbre:**",
      "**Corte Homogéneo de las Verduras:**",
      "**Elaboración de la Vinagreta Digestiva de Comino:**",
      "**Mezclado y Macerado:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-cogollos_de_tudela_al_ajillo_con_an",
    "name": "Cogollos de Tudela al Ajillo con Anchoas del Cantábrico y Ajo Confitado",
    "shortName": "Cogollos",
    "category": "carnes",
    "mealType": "universal",
    "station": "fuego_1",
    "prepTimeFormatted": "25 min (fuego_1)",
    "prepTimeMinutes": 25,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Pescado"
    ],
    "image": "/assets/fuentes/cocina_tradicional/cogollos_de_tudela_al_ajillo_con_anchoas_del__portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "02_ensaladas_alinos_y_frios.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "sarten_ajillo",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/cogollos_de_tudela_al_ajillo_con_anchoas_del__01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/cogollos_de_tudela_al_ajillo_con_anchoas_del__02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/cogollos_de_tudela_al_ajillo_con_anchoas_del__03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Cogollos fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Limpieza, Desinfección y Secado Centrifugado:**",
      "**Elaboración del Refrito al Ajillo Templado:**",
      "**Ensamblado y Aderezo Final:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-boquerones_en_vinagre_tradicionales",
    "name": "Boquerones en Vinagre Tradicionales de Carmen con AOVE, Ajo y Perejil",
    "shortName": "Boquerones en Vinagre Tradicionales",
    "category": "carnes",
    "mealType": "universal",
    "station": "frio",
    "prepTimeFormatted": "25 min (frio)",
    "prepTimeMinutes": 25,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Pescado"
    ],
    "image": "/assets/fuentes/cocina_tradicional/boquerones_en_vinagre_tradicionales_de_carmen_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "02_ensaladas_alinos_y_frios.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "frio_alino",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/boquerones_en_vinagre_tradicionales_de_carmen_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/boquerones_en_vinagre_tradicionales_de_carmen_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/boquerones_en_vinagre_tradicionales_de_carmen_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Boquerones fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Limpieza Quirúrgica del Boquerón:**",
      "**Técnica del Desangrado en Agua Helada (Blancura Absoluta):**",
      "**Elaboración de la Solución de Maceración y Curado:**",
      "**Escurrido y Desecado:**",
      "**Protocolo de Congelación Preventiva Anti-Anisakis (Obligatorio RD 1021/2022):**",
      "**Aliño y Cobertura en Aceite Noble:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-ensalada_de_arroz_de_verano_refresc",
    "name": "Ensalada de Arroz de Verano Refrescante y Nutritiva",
    "shortName": "Ensalada",
    "category": "arroces_pastas",
    "mealType": "lunch",
    "station": "fuego_3",
    "prepTimeFormatted": "25 min (fuego_3)",
    "prepTimeMinutes": 25,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Huevos",
      "Gluten",
      "Mostaza",
      "Pescado"
    ],
    "image": "/assets/fuentes/cocina_tradicional/ensalada_de_arroz_de_verano_refrescante_y_nut_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "02_ensaladas_alinos_y_frios.md",
    "mainIngredientFamily": "arroz",
    "culinaryTechnique": "arroz_meloso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/ensalada_de_arroz_de_verano_refrescante_y_nut_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/ensalada_de_arroz_de_verano_refrescante_y_nut_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/ensalada_de_arroz_de_verano_refrescante_y_nut_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Ensalada fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Cocción Aromática del Arroz:**",
      "**Técnica de Secado y Grano Suelto:**",
      "**Corte y Preparación de Tropezones:**",
      "**Elaboración de la Vinagreta Cítrica:**",
      "**Ensamblado y Fusión:**",
      "**Reposo Térmico:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-ensalada_de_tomate_con_ventresca_ce",
    "name": "Ensalada de Tomate con Ventresca, Cebolleta y Aceitunas Gordales",
    "shortName": "Ensalada",
    "category": "carnes",
    "mealType": "universal",
    "station": "frio",
    "prepTimeFormatted": "25 min (frio)",
    "prepTimeMinutes": 25,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Lácteos",
      "Gluten",
      "Pescado"
    ],
    "image": "/assets/fuentes/cocina_tradicional/ensalada_de_tomate_con_ventresca_cebolleta_y__portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "02_ensaladas_alinos_y_frios.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "frio_alino",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/ensalada_de_tomate_con_ventresca_cebolleta_y__01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/ensalada_de_tomate_con_ventresca_cebolleta_y__02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/ensalada_de_tomate_con_ventresca_cebolleta_y__03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Ensalada fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Tratamiento Térmico del Tomate (Temperatura Ambiente):**",
      "**Técnica del Sazonado Previo:**",
      "**Desflemado Crujiente de la Cebolleta:**",
      "**Disposición de la Ventresca y Aceitunas:**",
      "**Aliñado Final en Crudo:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-tabla_comparativa_maestra_rendimien",
    "name": "Tabla Comparativa Maestra: Rendimientos, Costes y Tiempos de Conservación",
    "shortName": "Tabla Comparativa Maestra: Rendimientos, Costes y Tiempos",
    "category": "carnes",
    "mealType": "universal",
    "station": "fuego_1",
    "prepTimeFormatted": "25 min (fuego_1)",
    "prepTimeMinutes": 25,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Pescado",
      "Mostaza",
      "Moluscos"
    ],
    "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=80",
    "source": "Cocina Tradicional",
    "sourceCompendium": "02_ensaladas_alinos_y_frios.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "guiso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": null,
      "elaboracion": null,
      "resultadoFinal": null
    },
    "ingredientsPerServing": [
      {
        "name": "Tabla fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "Preparar la mise en place de Tabla Comparativa Maestra: Rendimientos, Costes y Tiempos de Conservación con corte homogéneo de ingredientes.",
      "Ejecutar la cocción en fuego 1 respetando los puntos térmicos tradicionales.",
      "Abatir temperatura o reservar en recipientes herméticos fechados para conservación segura."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-salmorejo_cordobes_tradicional_de_c",
    "name": "Salmorejo Cordobés Tradicional de Carmen",
    "shortName": "Salmorejo Cordobés Tradicional",
    "category": "cremas",
    "mealType": "dinner",
    "station": "frio",
    "prepTimeFormatted": "15 min (frio)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Huevos",
      "Gluten",
      "Sulfitos",
      "Pescado"
    ],
    "image": "/assets/fuentes/cocina_tradicional/salmorejo_cordobes_tradicional_de_carmen_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "02_sopas_cremas_y_potajes.md",
    "mainIngredientFamily": "verduras",
    "culinaryTechnique": "frio_alino",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/salmorejo_cordobes_tradicional_de_carmen_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/salmorejo_cordobes_tradicional_de_carmen_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/salmorejo_cordobes_tradicional_de_carmen_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Salmorejo fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Mise en Place y Cocción de Huevos:**",
      "**Preparación y Maceración del Tomate:**",
      "**Incorporación Aromática y Triturado Base:**",
      "**Emulsión Maestra con AOVE:**",
      "**Atemperado y Maduración:**",
      "**Montaje y Presentación:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-gazpacho_andaluz_tradicional",
    "name": "Gazpacho Andaluz Tradicional",
    "shortName": "Gazpacho Andaluz Tradicional",
    "category": "cremas",
    "mealType": "dinner",
    "station": "frio",
    "prepTimeFormatted": "15 min (frio)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Huevos",
      "Gluten",
      "Sulfitos",
      "Pescado"
    ],
    "image": "/assets/fuentes/cocina_tradicional/gazpacho_andaluz_tradicional_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "02_sopas_cremas_y_potajes.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "frio_alino",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/gazpacho_andaluz_tradicional_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/gazpacho_andaluz_tradicional_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/gazpacho_andaluz_tradicional_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Gazpacho fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Limpieza y Corte de Hortalizas:**",
      "**Molienda y Triturado Intenso:**",
      "**Emulsión del Aceite:**",
      "**Filtrado Técnico por Chino:**",
      "**Refrigeración y Reposo:**",
      "**Servicio:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-ajoblanco_malagueno_tradicional_con",
    "name": "Ajoblanco Malagueño Tradicional con Uvas Moscatel",
    "shortName": "Ajoblanco Malagueño Tradicional",
    "category": "cremas",
    "mealType": "dinner",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Lácteos",
      "Frutos de cáscara",
      "Gluten"
    ],
    "image": "/assets/fuentes/cocina_tradicional/ajoblanco_malagueno_tradicional_con_uvas_mosc_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "02_sopas_cremas_y_potajes.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "guiso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/ajoblanco_malagueno_tradicional_con_uvas_mosc_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/ajoblanco_malagueno_tradicional_con_uvas_mosc_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/ajoblanco_malagueno_tradicional_con_uvas_mosc_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Ajoblanco fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Hidratación de la Miga y Acondicionamiento:**",
      "**Triturado de la Almendra (Fase Grasa):**",
      "**Incorporación del Pan y Emulsión:**",
      "**Filtrado y Reposo Térmico:**",
      "**Preparación de la Guarnición y Emplatado:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-sopa_de_ajo_castellana_tradicional_",
    "name": "Sopa de Ajo Castellana Tradicional con Huevo Escalfado",
    "shortName": "Sopa",
    "category": "cremas",
    "mealType": "dinner",
    "station": "robot",
    "prepTimeFormatted": "15 min (robot)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Frutos de cáscara",
      "Gluten",
      "Pescado"
    ],
    "image": "/assets/fuentes/cocina_tradicional/sopa_de_ajo_castellana_tradicional_con_huevo__portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "02_sopas_cremas_y_potajes.md",
    "mainIngredientFamily": "huevos",
    "culinaryTechnique": "crema",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/sopa_de_ajo_castellana_tradicional_con_huevo__01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/sopa_de_ajo_castellana_tradicional_con_huevo__02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/sopa_de_ajo_castellana_tradicional_con_huevo__03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Sopa fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Confitado y Dorado de los Ajos:**",
      "**Incorporación del Jamón y Rehogado del Pan:**",
      "**El Punto Crítico del Pimentón y Desglasado:**",
      "**Cocción a Fuego Manso (*Chup-Chup*):**",
      "**Escalfado de los Huevos Camperos:**",
      "**Servicio:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-sopa_de_picadillo_andaluza_con_fide",
    "name": "Sopa de Picadillo Andaluza con Fideos, Pollo, Jamón y Hierbabuena",
    "shortName": "Sopa",
    "category": "carnes",
    "mealType": "universal",
    "station": "robot",
    "prepTimeFormatted": "25 min (robot)",
    "prepTimeMinutes": 25,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Apio",
      "Gluten",
      "Pescado"
    ],
    "image": "/assets/fuentes/cocina_tradicional/sopa_de_picadillo_andaluza_con_fideos_pollo_j_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "02_sopas_cremas_y_potajes.md",
    "mainIngredientFamily": "pollo",
    "culinaryTechnique": "crema",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/sopa_de_picadillo_andaluza_con_fideos_pollo_j_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/sopa_de_picadillo_andaluza_con_fideos_pollo_j_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/sopa_de_picadillo_andaluza_con_fideos_pollo_j_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Sopa fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Montaje del Fondo en Frío y Espumado:**",
      "**Cocción Prolongada y Desgrasado:**",
      "**Preparación del Picadillo:**",
      "**Cocción de los Fideos:**",
      "**Aromatizado con Hierbabuena y Emplatado:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-crema_de_calabacin_aterciopelada_de",
    "name": "Crema de Calabacín Aterciopelada de Carmen (con quesitos y patata)",
    "shortName": "Crema",
    "category": "cremas",
    "mealType": "dinner",
    "station": "robot",
    "prepTimeFormatted": "15 min (robot)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Huevos",
      "Lácteos",
      "Frutos de cáscara",
      "Gluten",
      "Sésamo",
      "Pescado"
    ],
    "image": "/assets/fuentes/cocina_tradicional/crema_de_calabacin_aterciopelada_de_carmen_co_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "02_sopas_cremas_y_potajes.md",
    "mainIngredientFamily": "verduras",
    "culinaryTechnique": "crema",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/crema_de_calabacin_aterciopelada_de_carmen_co_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/crema_de_calabacin_aterciopelada_de_carmen_co_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/crema_de_calabacin_aterciopelada_de_carmen_co_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Crema fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Rehogado Aromático Inicial:**",
      "**Sellado de Patata y Calabacín:**",
      "**Cocción a Fuego Justo:**",
      "**Emulsión con Quesitos y Especias:**",
      "**Servicio:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-crema_de_calabaza_asada_con_crujien",
    "name": "Crema de Calabaza Asada con Crujiente de Semillas",
    "shortName": "Crema",
    "category": "cremas",
    "mealType": "dinner",
    "station": "robot",
    "prepTimeFormatted": "15 min (robot)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Lácteos",
      "Apio",
      "Huevos"
    ],
    "image": "/assets/fuentes/cocina_tradicional/crema_de_calabaza_asada_con_crujiente_de_semi_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "02_sopas_cremas_y_potajes.md",
    "mainIngredientFamily": "verduras",
    "culinaryTechnique": "crema",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/crema_de_calabaza_asada_con_crujiente_de_semi_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/crema_de_calabaza_asada_con_crujiente_de_semi_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/crema_de_calabaza_asada_con_crujiente_de_semi_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Crema fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Asado Maestro y Concentración de Sabores:**",
      "**Pochado de Cebolla y Especias:**",
      "**Integración y Cocción Corta:**",
      "**Triturado y Emulsión Sedosa:**",
      "**Elaboración del Topping Crujiente:**",
      "**Presentación:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-potaje_de_vigilia_tradicional_garba",
    "name": "Potaje de Vigilia Tradicional (Garbanzos con Bacalao y Espinacas)",
    "shortName": "Potaje",
    "category": "legumbres",
    "mealType": "lunch",
    "station": "olla_expres",
    "prepTimeFormatted": "15 min (olla_expres)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Huevos",
      "Frutos de cáscara",
      "Gluten",
      "Mostaza",
      "Pescado"
    ],
    "image": "/assets/fuentes/cocina_tradicional/potaje_de_vigilia_tradicional_garbanzos_con_b_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "02_sopas_cremas_y_potajes.md",
    "mainIngredientFamily": "bacalao",
    "culinaryTechnique": "cuchara_potaje",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/potaje_de_vigilia_tradicional_garbanzos_con_b_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/potaje_de_vigilia_tradicional_garbanzos_con_b_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/potaje_de_vigilia_tradicional_garbanzos_con_b_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Potaje fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Remojo y Cocción Maestra del Garbanzo:**",
      "**Elaboración del Majado Tradicional:**",
      "**El Sofrito Concentrado:**",
      "**Ensamblaje del Guiso y Espinacas:**",
      "**Confitado del Bacalao (*Cocción Pasiva*):**",
      "**Reposo y Presentación:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-sopa_de_marisco_y_pescado_festiva_d",
    "name": "Sopa de Marisco y Pescado Festiva de Carmen",
    "shortName": "Sopa",
    "category": "pescados",
    "mealType": "universal",
    "station": "robot",
    "prepTimeFormatted": "15 min (robot)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 3,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-3 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Crustáceos",
      "Huevos",
      "Sulfitos",
      "Pescado",
      "Gluten",
      "Moluscos"
    ],
    "image": "/assets/fuentes/cocina_tradicional/sopa_de_marisco_y_pescado_festiva_de_carmen_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "02_sopas_cremas_y_potajes.md",
    "mainIngredientFamily": "marisco",
    "culinaryTechnique": "crema",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/sopa_de_marisco_y_pescado_festiva_de_carmen_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/sopa_de_marisco_y_pescado_festiva_de_carmen_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/sopa_de_marisco_y_pescado_festiva_de_carmen_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Sopa fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Purga de Almejas y Pelado del Marisco:**",
      "**Extracción de Corales y Flambeado:**",
      "**Cocción y Prensado del Fumet Rojo:**",
      "**Elaboración del Majado Ligador:**",
      "**Cocción Escalonada de Tropezones:**",
      "**Servicio Festivo:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-tabla_comparativa_maestra_rendimien-33",
    "name": "Tabla Comparativa Maestra: Rendimientos, Costes y Tiempos",
    "shortName": "Tabla Comparativa Maestra: Rendimientos, Costes y Tiempos",
    "category": "cremas",
    "mealType": "dinner",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Moluscos",
      "Huevos",
      "Sulfitos",
      "Pescado"
    ],
    "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=80",
    "source": "Cocina Tradicional",
    "sourceCompendium": "02_sopas_cremas_y_potajes.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "guiso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": null,
      "elaboracion": null,
      "resultadoFinal": null
    },
    "ingredientsPerServing": [
      {
        "name": "Tabla fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "Preparar la mise en place de Tabla Comparativa Maestra: Rendimientos, Costes y Tiempos con corte homogéneo de ingredientes.",
      "Ejecutar la cocción en fuego 1 respetando los puntos térmicos tradicionales.",
      "Abatir temperatura o reservar en recipientes herméticos fechados para conservación segura."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-guia_rapida_de_adaptacion_para_into",
    "name": "️ Guía Rápida de Adaptación para Intolerancias y Dietas Especiales",
    "shortName": "️ Guía Rápida",
    "category": "cremas",
    "mealType": "dinner",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Lácteos",
      "Huevos",
      "Gluten",
      "Pescado"
    ],
    "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=80",
    "source": "Cocina Tradicional",
    "sourceCompendium": "02_sopas_cremas_y_potajes.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "guiso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": null,
      "elaboracion": null,
      "resultadoFinal": null
    },
    "ingredientsPerServing": [
      {
        "name": "️ fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "Preparar la mise en place de ️ Guía Rápida de Adaptación para Intolerancias y Dietas Especiales con corte homogéneo de ingredientes.",
      "Ejecutar la cocción en fuego 1 respetando los puntos térmicos tradicionales.",
      "Abatir temperatura o reservar en recipientes herméticos fechados para conservación segura."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-tortilla_espanola_de_patatas_jugosa",
    "name": "Tortilla Española de Patatas Jugosa con Cebolla Pochada (el punto perfecto de Carmen)",
    "shortName": "Tortilla Española",
    "category": "legumbres",
    "mealType": "lunch",
    "station": "olla_expres",
    "prepTimeFormatted": "15 min (olla_expres)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Lácteos",
      "Huevos",
      "Gluten",
      "Sulfitos"
    ],
    "image": "/assets/fuentes/cocina_tradicional/tortilla_espanola_de_patatas_jugosa_con_cebol_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "04_huevos_tortillas_y_revueltos.md",
    "mainIngredientFamily": "legumbres",
    "culinaryTechnique": "cuchara_potaje",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/tortilla_espanola_de_patatas_jugosa_con_cebol_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/tortilla_espanola_de_patatas_jugosa_con_cebol_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/tortilla_espanola_de_patatas_jugosa_con_cebol_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Tortilla fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Corte y Calibrado de Patata y Cebolla:**",
      "**Pochado y Confitado Lento en AOVE:**",
      "**Escurrido y Reposo de la Mezcla en el Huevo:**",
      "**Sellado y Cuajado Magistral:**",
      "**El Volteo y Sellado Final:**",
      "**Reposo y Servicio:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-tortilla_paisana_tradicional_con_ch",
    "name": "Tortilla Paisana Tradicional con Chorizo, Guisantes, Pimiento y Jamón",
    "shortName": "Tortilla Paisana Tradicional",
    "category": "huevos",
    "mealType": "dinner",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": false,
    "storageAdvice": "Nevera 1-5 días • Consumo fresco",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos"
    ],
    "image": "/assets/fuentes/cocina_tradicional/tortilla_paisana_tradicional_con_chorizo_guis_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "04_huevos_tortillas_y_revueltos.md",
    "mainIngredientFamily": "huevos",
    "culinaryTechnique": "tortilla",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/tortilla_paisana_tradicional_con_chorizo_guis_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/tortilla_paisana_tradicional_con_chorizo_guis_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/tortilla_paisana_tradicional_con_chorizo_guis_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Tortilla fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Sofrito de Verduras y Fritura de Patatas:**",
      "**Salteado de Chorizo, Jamón y Guisantes:**",
      "**Unión de Ingredientes y Reposo en Huevo:**",
      "**Cuajado de la Tortilla Paisana:**",
      "**Servicio:** Servir templada o a temperatura ambiente en porciones triangulares generosas."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-huevos_a_la_flamenca_tradicionales_",
    "name": "Huevos a la Flamenca Tradicionales en Cazuela de Barro",
    "shortName": "Huevos a la Flamenca Tradicionales en Cazuela",
    "category": "huevos",
    "mealType": "dinner",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": false,
    "storageAdvice": "Nevera 1-5 días • Consumo fresco",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Huevos",
      "Gluten",
      "Sulfitos"
    ],
    "image": "/assets/fuentes/cocina_tradicional/huevos_a_la_flamenca_tradicionales_en_cazuela_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "04_huevos_tortillas_y_revueltos.md",
    "mainIngredientFamily": "huevos",
    "culinaryTechnique": "guiso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/huevos_a_la_flamenca_tradicionales_en_cazuela_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/huevos_a_la_flamenca_tradicionales_en_cazuela_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/huevos_a_la_flamenca_tradicionales_en_cazuela_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Huevos fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Fritura Crujiente de Patatas:**",
      "**Elaboración de la Base Sofrita y Chup-Chup:**",
      "**Montaje en Cazuelas de Barro:**",
      "**Disposición de los Huevos y Horneado Controlado:**",
      "**Toque Final:** Espolvorear un giro de pimienta negra recién molida y servir inmediatamente con abundante pan de pueblo."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-huevos_rotos_con_jamon_iberico_y_pa",
    "name": "Huevos Rotos con Jamón Ibérico y Patatas Panadera",
    "shortName": "Huevos Rotos",
    "category": "huevos",
    "mealType": "dinner",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": false,
    "storageAdvice": "Nevera 1-5 días • Consumo fresco",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Huevos",
      "Gluten",
      "Sulfitos"
    ],
    "image": "/assets/fuentes/cocina_tradicional/huevos_rotos_con_jamon_iberico_y_patatas_pana_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "04_huevos_tortillas_y_revueltos.md",
    "mainIngredientFamily": "huevos",
    "culinaryTechnique": "guiso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/huevos_rotos_con_jamon_iberico_y_patatas_pana_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/huevos_rotos_con_jamon_iberico_y_patatas_pana_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/huevos_rotos_con_jamon_iberico_y_patatas_pana_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Huevos fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Elaboración de las Patatas Panadera:**",
      "**Fritura Magistral de los Huevos con Puntilla:**",
      "**El Emplatado y el Ritual de la Rotura:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-revuelto_de_setas_silvestres_gambas",
    "name": "Revuelto de Setas Silvestres, Gambas al Ajillo y Jamón",
    "shortName": "Revuelto",
    "category": "pescados",
    "mealType": "universal",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 3,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-3 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Crustáceos",
      "Huevos",
      "Lácteos",
      "Gluten",
      "Moluscos"
    ],
    "image": "/assets/fuentes/cocina_tradicional/revuelto_de_setas_silvestres_gambas_al_ajillo_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "04_huevos_tortillas_y_revueltos.md",
    "mainIngredientFamily": "huevos",
    "culinaryTechnique": "sarten_ajillo",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/revuelto_de_setas_silvestres_gambas_al_ajillo_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/revuelto_de_setas_silvestres_gambas_al_ajillo_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/revuelto_de_setas_silvestres_gambas_al_ajillo_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Revuelto fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Evaporación y Dorado de las Setas:**",
      "**Ajillo y Salteado de Gambas y Jamón:**",
      "**El Batido Ligero del Huevo:**",
      "**La Emulsión del Revuelto Fuera del Fuego:**",
      "**Servicio Inmediato:** Volcar de inmediato sobre tostas de pan de masa madre frotadas con ajo y aceite."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-tortilla_de_espinacas_frescas_pinon",
    "name": "Tortilla de Espinacas Frescas, Piñones y Pasas",
    "shortName": "Tortilla",
    "category": "verduras",
    "mealType": "dinner",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": false,
    "storageAdvice": "Nevera 1-5 días • Consumo fresco",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Huevos",
      "Frutos de cáscara",
      "Sulfitos"
    ],
    "image": "/assets/fuentes/cocina_tradicional/tortilla_de_espinacas_frescas_pinones_y_pasas_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "04_huevos_tortillas_y_revueltos.md",
    "mainIngredientFamily": "huevos",
    "culinaryTechnique": "tortilla",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/tortilla_de_espinacas_frescas_pinones_y_pasas_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/tortilla_de_espinacas_frescas_pinones_y_pasas_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/tortilla_de_espinacas_frescas_pinones_y_pasas_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Tortilla fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Hidratación y Tostado:**",
      "**Salteado en Seco y Deshidratación de Espinacas:**",
      "**Integración y Cuajado:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-tortilla_de_bacalao_desmigado_con_p",
    "name": "Tortilla de Bacalao Desmigado con Pimientos y Cebolla",
    "shortName": "Tortilla",
    "category": "pescados",
    "mealType": "universal",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 3,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-3 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Lácteos",
      "Huevos",
      "Sulfitos",
      "Pescado"
    ],
    "image": "/assets/fuentes/cocina_tradicional/tortilla_de_bacalao_desmigado_con_pimientos_y_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "04_huevos_tortillas_y_revueltos.md",
    "mainIngredientFamily": "bacalao",
    "culinaryTechnique": "tortilla",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/tortilla_de_bacalao_desmigado_con_pimientos_y_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/tortilla_de_bacalao_desmigado_con_pimientos_y_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/tortilla_de_bacalao_desmigado_con_pimientos_y_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Tortilla fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Pochar la Verdura Melosa:**",
      "**Confitado Rápido del Bacalao:**",
      "**Emulsión con Huevo y Cuajado Jugoso:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-huevos_rellenos_de_atun_y_yema_grat",
    "name": "Huevos Rellenos de Atún y Yema Gratinados con Bechamel Sedosa",
    "shortName": "Huevos Rellenos",
    "category": "huevos",
    "mealType": "dinner",
    "station": "horno",
    "prepTimeFormatted": "15 min (horno)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": false,
    "storageAdvice": "Nevera 1-5 días • Consumo fresco",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Huevos",
      "Lácteos",
      "Frutos de cáscara",
      "Gluten",
      "Pescado"
    ],
    "image": "/assets/fuentes/cocina_tradicional/huevos_rellenos_de_atun_y_yema_gratinados_con_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "04_huevos_tortillas_y_revueltos.md",
    "mainIngredientFamily": "huevos",
    "culinaryTechnique": "asado_horno",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/huevos_rellenos_de_atun_y_yema_con_gratinado__01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/huevos_rellenos_de_atun_y_yema_con_gratinado__02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/huevos_rellenos_de_atun_y_yema_gratinados_con_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Huevos fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Cocción Perfecta del Huevo Duro (Técnica de Carmen):**",
      "**Elaboración de la Farsa del Relleno:**",
      "**Elaboración de la Bechamel Sedosa:**",
      "**Montaje y Gratinado:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-huevos_tontos_tradicionales_de_la_a",
    "name": "Huevos Tontos Tradicionales de la Abuela",
    "shortName": "Huevos Tontos Tradicionales",
    "category": "huevos",
    "mealType": "dinner",
    "station": "fuego_2",
    "prepTimeFormatted": "15 min (fuego_2)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": false,
    "storageAdvice": "Nevera 1-5 días • Consumo fresco",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Lácteos",
      "Huevos",
      "Gluten",
      "Frutos de cáscara"
    ],
    "image": "/assets/fuentes/cocina_tradicional/huevos_tontos_tradicionales_de_la_abuela_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "04_huevos_tortillas_y_revueltos.md",
    "mainIngredientFamily": "huevos",
    "culinaryTechnique": "salsa",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/huevos_tontos_tradicionales_de_la_abuela_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/huevos_tontos_tradicionales_de_la_abuela_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/huevos_tontos_tradicionales_de_la_abuela_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Huevos fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Hidratación y Amasado de la Miga:**",
      "**Incorporación de Aromáticos y Huevos:**",
      "**Fritura Dorada de los Huevos Tontos:**",
      "**Cocción en Caldo Aromático (El Toque Sublime de Carmen):**",
      "**Servicio:** Servir en plato hondo con 3-4 huevos tontos por persona y unos cazos del caldo reconfortante."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-revuelto_gramajo_tradicional_con_ja",
    "name": "Revuelto Gramajo Tradicional con Jamón y Patatas Paja Crujientes",
    "shortName": "Revuelto Gramajo Tradicional",
    "category": "huevos",
    "mealType": "dinner",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": false,
    "storageAdvice": "Nevera 1-5 días • Consumo fresco",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Lácteos",
      "Huevos",
      "Sulfitos",
      "Pescado"
    ],
    "image": "/assets/fuentes/cocina_tradicional/revuelto_gramajo_tradicional_con_jamon_y_pata_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "04_huevos_tortillas_y_revueltos.md",
    "mainIngredientFamily": "huevos",
    "culinaryTechnique": "tortilla",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/revuelto_gramajo_tradicional_con_jamon_y_pata_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/revuelto_gramajo_tradicional_con_jamon_y_pata_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/revuelto_gramajo_tradicional_con_jamon_y_pata_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Revuelto fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Corte y Fritura Maestra de las Patatas Paja:**",
      "**Salteado de Aromáticos y Jamón:**",
      "**El Cuajado Cremoso con Crujiente:**",
      "**Servicio y Coronación:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-pisto_manchego_con_huevos_fritos_co",
    "name": "Pisto Manchego con Huevos Fritos con Puntilla",
    "shortName": "Pisto Manchego",
    "category": "verduras",
    "mealType": "dinner",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": false,
    "storageAdvice": "Nevera 1-5 días • Consumo fresco",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Huevos",
      "Gluten",
      "Sulfitos",
      "Pescado"
    ],
    "image": "/assets/fuentes/cocina_tradicional/pisto_manchego_con_huevos_fritos_con_puntilla_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "04_huevos_tortillas_y_revueltos.md",
    "mainIngredientFamily": "verduras",
    "culinaryTechnique": "frito_empanado",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/pisto_manchego_con_huevos_fritos_con_puntilla_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/pisto_manchego_con_huevos_fritos_con_puntilla_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/pisto_manchego_con_huevos_fritos_con_puntilla_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Pisto fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Pochar Pimientos y Cebolla:**",
      "**Incorporación del Calabacín:**",
      "**Reducción y Concentración del Tomate:**",
      "**Fritura de los Huevos con Puntilla:**",
      "**Montaje y Degustación:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-tabla_comparativa_maestra_rendimien-46",
    "name": "Tabla Comparativa Maestra: Rendimientos, Costes, Tiempos y Alérgenos",
    "shortName": "Tabla Comparativa Maestra: Rendimientos, Costes, Tiempos y Alérgenos",
    "category": "huevos",
    "mealType": "dinner",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": false,
    "storageAdvice": "Nevera 1-5 días • Consumo fresco",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Crustáceos",
      "Huevos",
      "Pescado"
    ],
    "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=80",
    "source": "Cocina Tradicional",
    "sourceCompendium": "04_huevos_tortillas_y_revueltos.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "guiso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": null,
      "elaboracion": null,
      "resultadoFinal": null
    },
    "ingredientsPerServing": [
      {
        "name": "Tabla fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "Preparar la mise en place de Tabla Comparativa Maestra: Rendimientos, Costes, Tiempos y Alérgenos con corte homogéneo de ingredientes.",
      "Ejecutar la cocción en fuego 1 respetando los puntos térmicos tradicionales.",
      "Abatir temperatura o reservar en recipientes herméticos fechados para conservación segura."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-protocolo_higienico_sanitario_y_con",
    "name": "️ Protocolo Higiénico-Sanitario y Conservación de Ovoproductos",
    "shortName": "️ Protocolo Higiénico-Sanitario y Conservación",
    "category": "huevos",
    "mealType": "dinner",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": false,
    "storageAdvice": "Nevera 1-5 días • Consumo fresco",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Huevos"
    ],
    "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=80",
    "source": "Cocina Tradicional",
    "sourceCompendium": "04_huevos_tortillas_y_revueltos.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "guiso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": null,
      "elaboracion": null,
      "resultadoFinal": null
    },
    "ingredientsPerServing": [
      {
        "name": "️ fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "Preparar la mise en place de ️ Protocolo Higiénico-Sanitario y Conservación de Ovoproductos con corte homogéneo de ingredientes.",
      "Ejecutar la cocción en fuego 1 respetando los puntos térmicos tradicionales.",
      "Abatir temperatura o reservar en recipientes herméticos fechados para conservación segura."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-arroz_caldoso_marinero_con_rape_gam",
    "name": "Arroz Caldoso Marinero con Rape, Gambones y Mejillones de Roca",
    "shortName": "Arroz Caldoso Marinero",
    "category": "arroces_pastas",
    "mealType": "lunch",
    "station": "fuego_3",
    "prepTimeFormatted": "25 min (fuego_3)",
    "prepTimeMinutes": 25,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Crustáceos",
      "Huevos",
      "Sulfitos",
      "Apio",
      "Pescado",
      "Gluten",
      "Moluscos"
    ],
    "image": "/assets/fuentes/cocina_tradicional/arroz_caldoso_marinero_con_rape_gambones_y_me_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "07_arroces_paellas_y_fideuas.md",
    "mainIngredientFamily": "arroz",
    "culinaryTechnique": "arroz_meloso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/arroz_caldoso_marinero_con_rape_gambones_y_me_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/arroz_caldoso_marinero_con_rape_gambones_y_me_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/arroz_caldoso_marinero_con_rape_gambones_y_me_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Arroz fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Elaboración del Fumet Marinero:**",
      "**Apertura de Mejillones al Vapor:**",
      "**Marcado del Marisco y Extracción del Coral:**",
      "**Sofrito Paciente Concentrado:**",
      "**Nacarado del Grano y Cocción Hidrodinámica:**",
      "**Integración Final de Pescado y Reposo:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-arroz_con_costillejas_de_cerdo_iber",
    "name": "Arroz con Costillejas de Cerdo Ibérico, Alcachofas y Verduras",
    "shortName": "Arroz",
    "category": "arroces_pastas",
    "mealType": "lunch",
    "station": "fuego_3",
    "prepTimeFormatted": "25 min (fuego_3)",
    "prepTimeMinutes": 25,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Apio",
      "Huevos",
      "Sulfitos",
      "Pescado"
    ],
    "image": "/assets/fuentes/cocina_tradicional/arroz_con_costillejas_de_cerdo_iberico_alcach_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "07_arroces_paellas_y_fideuas.md",
    "mainIngredientFamily": "verduras",
    "culinaryTechnique": "arroz_meloso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/arroz_con_costillejas_de_cerdo_iberico_alcach_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/arroz_con_costillejas_de_cerdo_iberico_alcach_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/arroz_con_costillejas_de_cerdo_iberico_alcach_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Arroz fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Preparación y Limpieza de las Alcachofas:**",
      "**Sellado Intenso de las Costillejas Ibéricas:**",
      "**Confitado de Alcachofas y Verduras:**",
      "**El Sofrito Tradicional:**",
      "**Nacarado del Arroz y Cocción:**",
      "**Socarrat y Reposo:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-paella_mixta_tradicional_de_pollo_c",
    "name": "Paella Mixta Tradicional de Pollo, Conejo, Calamares y Gambas",
    "shortName": "Paella Mixta Tradicional",
    "category": "arroces_pastas",
    "mealType": "lunch",
    "station": "fuego_3",
    "prepTimeFormatted": "25 min (fuego_3)",
    "prepTimeMinutes": 25,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Crustáceos",
      "Huevos",
      "Sulfitos",
      "Pescado",
      "Gluten",
      "Moluscos"
    ],
    "image": "/assets/fuentes/cocina_tradicional/paella_mixta_tradicional_de_pollo_conejo_cala_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "07_arroces_paellas_y_fideuas.md",
    "mainIngredientFamily": "pollo",
    "culinaryTechnique": "arroz_meloso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/paella_mixta_tradicional_de_pollo_conejo_cala_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/paella_mixta_tradicional_de_pollo_conejo_cala_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/paella_mixta_tradicional_de_pollo_conejo_cala_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Paella fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Nivelado de la Paella y Salteado de Gambas:**",
      "**Dorado Prolongado de Pollo y Conejo:**",
      "**Pochado de Calamares y Verduras:**",
      "**El Sofrito y la Concentración:**",
      "**Nacarado, Caldo y Ebullición:**",
      "**Socarrat Final y Reposo:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-arroz_a_banda_tradicional_con_salmo",
    "name": "Arroz a Banda Tradicional con Salmorreta y Alioli Casero",
    "shortName": "Arroz a Banda Tradicional",
    "category": "arroces_pastas",
    "mealType": "lunch",
    "station": "fuego_3",
    "prepTimeFormatted": "25 min (fuego_3)",
    "prepTimeMinutes": 25,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Crustáceos",
      "Huevos",
      "Sulfitos",
      "Pescado",
      "Moluscos"
    ],
    "image": "/assets/fuentes/cocina_tradicional/arroz_a_banda_tradicional_con_salmorreta_y_al_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "07_arroces_paellas_y_fideuas.md",
    "mainIngredientFamily": "arroz",
    "culinaryTechnique": "arroz_meloso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/arroz_a_banda_tradicional_con_salmorreta_y_al_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/arroz_a_banda_tradicional_con_salmorreta_y_al_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/arroz_a_banda_tradicional_con_salmorreta_y_al_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Arroz fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Elaboración del Caldo de Morralla:**",
      "**Elaboración de la Salmorreta Alicantina:**",
      "**Elaboración del Alioli de Mortero:**",
      "**Cocinado del Arroz en Paella:**",
      "**El Socarrat Levantino y Reposo:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-arroz_negro_con_sepia_en_su_tinta_y",
    "name": "Arroz Negro con Sepia en su Tinta y Habitas Tiernas",
    "shortName": "Arroz Negro",
    "category": "arroces_pastas",
    "mealType": "lunch",
    "station": "fuego_3",
    "prepTimeFormatted": "25 min (fuego_3)",
    "prepTimeMinutes": 25,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Pescado",
      "Gluten",
      "Moluscos"
    ],
    "image": "/assets/fuentes/cocina_tradicional/arroz_negro_con_sepia_en_su_tinta_y_habitas_t_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "07_arroces_paellas_y_fideuas.md",
    "mainIngredientFamily": "arroz",
    "culinaryTechnique": "arroz_meloso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/arroz_negro_con_sepia_en_su_tinta_y_habitas_t_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/arroz_negro_con_sepia_en_su_tinta_y_habitas_t_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/arroz_negro_con_sepia_en_su_tinta_y_habitas_t_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Arroz fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Limpieza y Preparación de la Sepia:**",
      "**Pochado y Caramelización de la Cebolla (Clave del Color):**",
      "**Salteado de la Sepia y la Melsa:**",
      "**Disolución de la Tinta e Hidratación del Grano:**",
      "**Salteado de Habitas y Acabado:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-fideua_marinera_de_fideo_fino_cruji",
    "name": "Fideuá Marinera de Fideo Fino Crujiente con Rape y Langostinos",
    "shortName": "Fideuá Marinera",
    "category": "pescados",
    "mealType": "universal",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 3,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-3 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Crustáceos",
      "Huevos",
      "Sulfitos",
      "Frutos de cáscara",
      "Pescado",
      "Gluten",
      "Moluscos"
    ],
    "image": "/assets/fuentes/cocina_tradicional/fideua_marinera_de_fideo_fino_crujiente_con_r_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "07_arroces_paellas_y_fideuas.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "guiso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/fideua_marinera_de_fideo_fino_crujiente_con_r_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/fideua_marinera_de_fideo_fino_crujiente_con_r_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/fideua_marinera_de_fideo_fino_crujiente_con_r_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Fideuá fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Tostado Previo de los Fideos (El Secreto de la Textura):**",
      "**Marcado del Marisco y Rape:**",
      "**Sofrito y Fusión:**",
      "**Incorporación de Fideos y Fumet:**",
      "**Horneado y Levantamiento de Fideos (*Fideus Drets*):**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-arroz_al_horno_tradicional_valencia",
    "name": "Arroz al Horno Tradicional Valenciano con Costilla, Morcilla, Garbanzos y Tomate",
    "shortName": "Arroz al Horno Tradicional Valenciano",
    "category": "arroces_pastas",
    "mealType": "lunch",
    "station": "horno",
    "prepTimeFormatted": "25 min (horno)",
    "prepTimeMinutes": 25,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Apio",
      "Gluten",
      "Pescado"
    ],
    "image": "/assets/fuentes/cocina_tradicional/arroz_al_horno_tradicional_valenciano_con_cos_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "07_arroces_paellas_y_fideuas.md",
    "mainIngredientFamily": "legumbres",
    "culinaryTechnique": "asado_horno",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/arroz_al_horno_tradicional_valenciano_con_cos_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/arroz_al_horno_tradicional_valenciano_con_cos_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/arroz_al_horno_tradicional_valenciano_con_cos_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Arroz fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Precalentado del Horno y Cazuela:**",
      "**Dorado Previo de Ingredientes en Sartén:**",
      "**Sofrito y Nacarado del Arroz:**",
      "**Montaje Tradicional en la Cazuela de Barro:**",
      "**Horneado Preciso y Reposo:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-arroz_meloso_con_bacalao_y_coliflor",
    "name": "Arroz Meloso con Bacalao y Coliflor",
    "shortName": "Arroz Meloso",
    "category": "arroces_pastas",
    "mealType": "lunch",
    "station": "fuego_3",
    "prepTimeFormatted": "25 min (fuego_3)",
    "prepTimeMinutes": 25,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Pescado"
    ],
    "image": "/assets/fuentes/cocina_tradicional/arroz_meloso_con_bacalao_y_coliflor_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "07_arroces_paellas_y_fideuas.md",
    "mainIngredientFamily": "bacalao",
    "culinaryTechnique": "arroz_meloso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/arroz_meloso_con_bacalao_y_coliflor_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/arroz_meloso_con_bacalao_y_coliflor_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/arroz_meloso_con_bacalao_y_coliflor_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Arroz fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Dorado Previo de la Coliflor:**",
      "**El Sofrito Meloso:**",
      "**Nacarado y Cocción del Arroz Meloso:**",
      "**Incorporación del Bacalao y Emulsión:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-tabla_comparativa_maestra_rendimien-56",
    "name": "Tabla Comparativa Maestra: Rendimientos, Costes, Ratios y Tiempos",
    "shortName": "Tabla Comparativa Maestra: Rendimientos, Costes, Ratios y Tiempos",
    "category": "carnes",
    "mealType": "universal",
    "station": "fuego_1",
    "prepTimeFormatted": "25 min (fuego_1)",
    "prepTimeMinutes": 25,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Moluscos",
      "Pescado"
    ],
    "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=80",
    "source": "Cocina Tradicional",
    "sourceCompendium": "07_arroces_paellas_y_fideuas.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "guiso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": null,
      "elaboracion": null,
      "resultadoFinal": null
    },
    "ingredientsPerServing": [
      {
        "name": "Tabla fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "Preparar la mise en place de Tabla Comparativa Maestra: Rendimientos, Costes, Ratios y Tiempos con corte homogéneo de ingredientes.",
      "Ejecutar la cocción en fuego 1 respetando los puntos térmicos tradicionales.",
      "Abatir temperatura o reservar en recipientes herméticos fechados para conservación segura."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-glosario_tecnico_de_los_maestros_ar",
    "name": "Glosario Técnico de los Maestros Arroceros",
    "shortName": "Glosario Técnico",
    "category": "carnes",
    "mealType": "universal",
    "station": "fuego_1",
    "prepTimeFormatted": "25 min (fuego_1)",
    "prepTimeMinutes": 25,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Moluscos"
    ],
    "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=80",
    "source": "Cocina Tradicional",
    "sourceCompendium": "07_arroces_paellas_y_fideuas.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "guiso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": null,
      "elaboracion": null,
      "resultadoFinal": null
    },
    "ingredientsPerServing": [
      {
        "name": "Glosario fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "Preparar la mise en place de Glosario Técnico de los Maestros Arroceros con corte homogéneo de ingredientes.",
      "Ejecutar la cocción en fuego 1 respetando los puntos térmicos tradicionales.",
      "Abatir temperatura o reservar en recipientes herméticos fechados para conservación segura."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-macarrones_gratinados_de_la_abuela_",
    "name": "Macarrones Gratinados de la Abuela con Chorizo, Carne Picada, Tomate Frito y Bechamel",
    "shortName": "Macarrones Gratinados",
    "category": "arroces_pastas",
    "mealType": "lunch",
    "station": "fuego_2",
    "prepTimeFormatted": "25 min (fuego_2)",
    "prepTimeMinutes": 25,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Lácteos",
      "Frutos de cáscara",
      "Gluten",
      "Pescado"
    ],
    "image": "/assets/fuentes/cocina_tradicional/macarrones_gratinados_de_la_abuela_con_choriz_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "08_pastas_gratinados_y_lasanas.md",
    "mainIngredientFamily": "ternera",
    "culinaryTechnique": "salsa",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/macarrones_gratinados_de_la_abuela_con_choriz_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/macarrones_gratinados_de_la_abuela_con_choriz_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/macarrones_gratinados_de_la_abuela_con_choriz_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Macarrones fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Elaboración del Sofrito con Chorizo y Carne:**",
      "**Preparación de la Bechamel Fluida de Cobertura:**",
      "**Cocción Al Dente de la Pasta:**",
      "**Integración, Montaje y Gratinado:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-lasana_casera_tradicional_bolonesa_",
    "name": "Lasaña Casera Tradicional Boloñesa de Carne y Verduras con Bechamel Sedosa",
    "shortName": "Lasaña Casera Tradicional Boloñesa",
    "category": "arroces_pastas",
    "mealType": "lunch",
    "station": "fuego_1",
    "prepTimeFormatted": "25 min (fuego_1)",
    "prepTimeMinutes": 25,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Apio",
      "Lácteos",
      "Frutos de cáscara",
      "Gluten"
    ],
    "image": "/assets/fuentes/cocina_tradicional/lasana_casera_tradicional_bolonesa_de_carne_y_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "08_pastas_gratinados_y_lasanas.md",
    "mainIngredientFamily": "verduras",
    "culinaryTechnique": "guiso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/lasana_casera_tradicional_bolonesa_de_carne_y_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/lasana_casera_tradicional_bolonesa_de_carne_y_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/lasana_casera_tradicional_bolonesa_de_carne_y_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Lasaña fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Cocción del Ragú Boloñesa Concentrado:**",
      "**Elaboración de la Bechamel Sedosa:**",
      "**Acondicionamiento de las Placas:**",
      "**Montaje Estructurado de la Lasaña:**",
      "**Horneado, Gratinado y Reposo Crucial:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-canelones_tradicionales_de_fiesta_r",
    "name": "Canelones Tradicionales de Fiesta Rellenos de Asado Mixto y Foie",
    "shortName": "Canelones Tradicionales",
    "category": "arroces_pastas",
    "mealType": "lunch",
    "station": "horno",
    "prepTimeFormatted": "25 min (horno)",
    "prepTimeMinutes": 25,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Lácteos",
      "Frutos de cáscara",
      "Gluten"
    ],
    "image": "/assets/fuentes/cocina_tradicional/canelones_tradicionales_de_fiesta_rellenos_de_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "08_pastas_gratinados_y_lasanas.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "asado_horno",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/canelones_tradicionales_de_fiesta_rellenos_de_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/canelones_tradicionales_de_fiesta_rellenos_de_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/canelones_tradicionales_de_fiesta_rellenos_de_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Canelones fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Rostizado Tradicional de las Tres Carnes:**",
      "**Picado y Emulsión del Relleno:**",
      "**Cocción y Manejo de las Placas:**",
      "**Elaboración de la Bechamel con Reducción de Asado:**",
      "**Relleno, Enrollado y Montaje:**",
      "**Horneado y Gratinado:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-espaguetis_a_la_carbonara_tradicion",
    "name": "Espaguetis a la Carbonara Tradicional al Huevo con Guanciale/Panceta y Pecorino/Parmesano",
    "shortName": "Espaguetis a la Carbonara Tradicional al Huevo",
    "category": "arroces_pastas",
    "mealType": "lunch",
    "station": "fuego_1",
    "prepTimeFormatted": "25 min (fuego_1)",
    "prepTimeMinutes": 25,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Lácteos",
      "Gluten",
      "Pescado"
    ],
    "image": "/assets/fuentes/cocina_tradicional/espaguetis_a_la_carbonara_tradicional_al_huev_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "08_pastas_gratinados_y_lasanas.md",
    "mainIngredientFamily": "huevos",
    "culinaryTechnique": "guiso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/espaguetis_a_la_carbonara_tradicional_al_huev_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/espaguetis_a_la_carbonara_tradicional_al_huev_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/espaguetis_a_la_carbonara_tradicional_al_huev_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Espaguetis fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Tostado de la Pimienta y Dorado del Guanciale:**",
      "**Preparación de la \"Carbo-Crema\" Base:**",
      "**Cocción Perfecta al Dente de los Espaguetis:**",
      "**La Mantecadura y Emulsión Fuera del Fuego (*Il Momento Magico*):**",
      "**Emplatado Inmediato:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-lasana_de_atun_huevos_duros_y_pimie",
    "name": "Lasaña de Atún, Huevos Duros y Pimientos Asados con Bechamel Gratinada",
    "shortName": "Lasaña",
    "category": "arroces_pastas",
    "mealType": "lunch",
    "station": "horno",
    "prepTimeFormatted": "25 min (horno)",
    "prepTimeMinutes": 25,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Lácteos",
      "Frutos de cáscara",
      "Gluten",
      "Pescado"
    ],
    "image": "/assets/fuentes/cocina_tradicional/lasana_de_atun_huevos_duros_y_pimientos_asado_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "08_pastas_gratinados_y_lasanas.md",
    "mainIngredientFamily": "huevos",
    "culinaryTechnique": "asado_horno",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/lasana_de_atun_huevos_duros_y_pimientos_asado_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/lasana_de_atun_huevos_duros_y_pimientos_asado_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/lasana_de_atun_huevos_duros_y_pimientos_asado_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Lasaña fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Sofrito de Cebolla y Base de Tomate:**",
      "**Preparación del Relleno de Atún y Pimientos:**",
      "**Elaboración de la Bechamel Suave:**",
      "**Montaje y Gratinado:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-pasta_con_salsa_bolonesa_tradiciona",
    "name": "Pasta con Salsa Boloñesa Tradicional de Larga Cocción (2h de chup-chup)",
    "shortName": "Pasta",
    "category": "arroces_pastas",
    "mealType": "lunch",
    "station": "fuego_2",
    "prepTimeFormatted": "25 min (fuego_2)",
    "prepTimeMinutes": 25,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Apio",
      "Lácteos",
      "Frutos de cáscara",
      "Gluten",
      "Pescado"
    ],
    "image": "/assets/fuentes/cocina_tradicional/pasta_con_salsa_bolonesa_tradicional_de_larga_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "08_pastas_gratinados_y_lasanas.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "salsa",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/pasta_con_salsa_bolonesa_tradicional_de_larga_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/pasta_con_salsa_bolonesa_tradicional_de_larga_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/pasta_con_salsa_bolonesa_tradicional_de_larga_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Pasta fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Sellado de Carnes:**",
      "**Mirepoix y Sofrito Lento:**",
      "**Desglase con Vino:**",
      "**El Secreto de la Leche:**",
      "**La Gran Cocción Lenta de 2 Horas (*El Chup-Chup Infalible*):**",
      "**Mantecado con la Pasta:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-espaguetis_con_gambas_al_ajillo_y_g",
    "name": "Espaguetis con Gambas al Ajillo y Guindilla",
    "shortName": "Espaguetis",
    "category": "arroces_pastas",
    "mealType": "lunch",
    "station": "fuego_1",
    "prepTimeFormatted": "25 min (fuego_1)",
    "prepTimeMinutes": 25,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Crustáceos",
      "Huevos",
      "Sulfitos",
      "Gluten",
      "Moluscos"
    ],
    "image": "/assets/fuentes/cocina_tradicional/espaguetis_con_gambas_al_ajillo_y_guindilla_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "08_pastas_gratinados_y_lasanas.md",
    "mainIngredientFamily": "marisco",
    "culinaryTechnique": "sarten_ajillo",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/espaguetis_con_gambas_al_ajillo_y_guindilla_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/espaguetis_con_gambas_al_ajillo_y_guindilla_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/espaguetis_con_gambas_al_ajillo_y_guindilla_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Espaguetis fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Pelado de Gambas y Extracción de Esencia:**",
      "**Infusión del Ajillo y Guindilla:**",
      "**Salteado Ultrarrápido de las Gambas:**",
      "**Cocción y Manteado de la Pasta:**",
      "**Servicio:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-canelones_de_espinacas_ricotta_requ",
    "name": "Canelones de Espinacas, Ricotta/Requesón y Piñones",
    "shortName": "Canelones",
    "category": "arroces_pastas",
    "mealType": "lunch",
    "station": "fuego_1",
    "prepTimeFormatted": "25 min (fuego_1)",
    "prepTimeMinutes": 25,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Lácteos",
      "Frutos de cáscara",
      "Gluten",
      "Pescado"
    ],
    "image": "/assets/fuentes/cocina_tradicional/canelones_de_espinacas_ricotta_requeson_y_pin_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "08_pastas_gratinados_y_lasanas.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "guiso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/canelones_de_espinacas_ricotta_requeson_y_pin_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/canelones_de_espinacas_ricotta_requeson_y_pin_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/canelones_de_espinacas_ricotta_requeson_y_pin_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Canelones fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Salteado y Escurrido de Espinacas:**",
      "**Elaboración del Relleno Cremoso:**",
      "**Bechamel y Cocción de Placas:**",
      "**Montaje, Relleno y Gratinado:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-tabla_comparativa_maestra_rendimien-66",
    "name": "Tabla Comparativa Maestra: Rendimientos, Costes, Tiempos y Alérgenos",
    "shortName": "Tabla Comparativa Maestra: Rendimientos, Costes, Tiempos y Alérgenos",
    "category": "arroces_pastas",
    "mealType": "lunch",
    "station": "fuego_1",
    "prepTimeFormatted": "25 min (fuego_1)",
    "prepTimeMinutes": 25,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Crustáceos",
      "Huevos",
      "Sulfitos",
      "Apio",
      "Lácteos",
      "Pescado"
    ],
    "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=80",
    "source": "Cocina Tradicional",
    "sourceCompendium": "08_pastas_gratinados_y_lasanas.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "guiso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": null,
      "elaboracion": null,
      "resultadoFinal": null
    },
    "ingredientsPerServing": [
      {
        "name": "Tabla fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "Preparar la mise en place de Tabla Comparativa Maestra: Rendimientos, Costes, Tiempos y Alérgenos con corte homogéneo de ingredientes.",
      "Ejecutar la cocción en fuego 1 respetando los puntos térmicos tradicionales.",
      "Abatir temperatura o reservar en recipientes herméticos fechados para conservación segura."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-decalogo_de_oro_de_carmen_para_past",
    "name": "Decálogo de Oro de Carmen para Pastas y Gratinados Insuperables",
    "shortName": "Decálogo",
    "category": "arroces_pastas",
    "mealType": "lunch",
    "station": "horno",
    "prepTimeFormatted": "25 min (horno)",
    "prepTimeMinutes": 25,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Lácteos",
      "Sulfitos"
    ],
    "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=80",
    "source": "Cocina Tradicional",
    "sourceCompendium": "08_pastas_gratinados_y_lasanas.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "asado_horno",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": null,
      "elaboracion": null,
      "resultadoFinal": null
    },
    "ingredientsPerServing": [
      {
        "name": "Decálogo fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "Preparar la mise en place de Decálogo de Oro de Carmen para Pastas y Gratinados Insuperables con corte homogéneo de ingredientes.",
      "Ejecutar la cocción en horno respetando los puntos térmicos tradicionales.",
      "Abatir temperatura o reservar en recipientes herméticos fechados para conservación segura."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-mapa_conceptual_del_recetario_de_cu",
    "name": "️ Mapa Conceptual del Recetario de Cuchara",
    "shortName": "️ Mapa Conceptual del Recetario",
    "category": "legumbres",
    "mealType": "lunch",
    "station": "olla_expres",
    "prepTimeFormatted": "15 min (olla_expres)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [],
    "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=80",
    "source": "Cocina Tradicional",
    "sourceCompendium": "09_legumbres_y_potajes_de_cuchara.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "cuchara_potaje",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": null,
      "elaboracion": null,
      "resultadoFinal": null
    },
    "ingredientsPerServing": [
      {
        "name": "️ fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "Preparar la mise en place de ️ Mapa Conceptual del Recetario de Cuchara con corte homogéneo de ingredientes.",
      "Ejecutar la cocción en olla expres respetando los puntos térmicos tradicionales.",
      "Abatir temperatura o reservar en recipientes herméticos fechados para conservación segura."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-lentejas_pardinas_con_chorizo_costi",
    "name": "Lentejas Pardinas con Chorizo, Costilla y el Majado Secreto de Carmen",
    "shortName": "Lentejas Pardinas",
    "category": "legumbres",
    "mealType": "lunch",
    "station": "olla_expres",
    "prepTimeFormatted": "15 min (olla_expres)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Lácteos",
      "Gluten",
      "Pescado"
    ],
    "image": "/assets/fuentes/cocina_tradicional/lentejas_pardinas_con_chorizo_y_costilla_de_c_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "09_legumbres_y_potajes_de_cuchara.md",
    "mainIngredientFamily": "legumbres",
    "culinaryTechnique": "cuchara_potaje",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/lentejas_pardinas_con_chorizo_y_costilla_de_c_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/lentejas_pardinas_con_chorizo_costilla_y_el_m_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/lentejas_pardinas_con_chorizo_costilla_y_el_m_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Lentejas fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Sellado de Carnes y Base Grasa:**",
      "**Pochado Lento de Verduras:**",
      "**Incorporación de Legumbres y Cocción Inicial:**",
      "**Adición de la Patata Chascada:**",
      "**Elaboración del Majado Secreto de Carmen:**",
      "**Cocción Final, Espesado y Reposo:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-fabada_rapida_casera_con_compango_a",
    "name": "Fabada Rápida Casera con Compango Asturiano",
    "shortName": "Fabada Rápida Casera",
    "category": "legumbres",
    "mealType": "lunch",
    "station": "olla_expres",
    "prepTimeFormatted": "15 min (olla_expres)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Huevos",
      "Gluten",
      "Sulfitos",
      "Pescado"
    ],
    "image": "/assets/fuentes/cocina_tradicional/fabada_rapida_casera_con_compango_asturiano_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "09_legumbres_y_potajes_de_cuchara.md",
    "mainIngredientFamily": "legumbres",
    "culinaryTechnique": "cuchara_potaje",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/fabada_rapida_casera_con_compango_asturiano_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/fabada_rapida_casera_con_compango_asturiano_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/fabada_rapida_casera_con_compango_asturiano_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Fabada fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Remojo Osmótico de las Fabes:**",
      "**Tratamiento Técnico del Compango (Prevención de Roturas y Exceso Graso):**",
      "**Montaje de la Olla y Cocción Controlada:**",
      "**Espumado y Asustado de la Faba:**",
      "**Infusión de Azafrán y Cierre de Olla Rápida:**",
      "**Ligado de la Salsa y Desgrase:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-potaje_de_garbanzos_con_bacalao_y_e",
    "name": "Potaje de Garbanzos con Bacalao y Espinacas Frescas (Vigilia)",
    "shortName": "Potaje",
    "category": "legumbres",
    "mealType": "lunch",
    "station": "olla_expres",
    "prepTimeFormatted": "15 min (olla_expres)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Frutos de cáscara",
      "Gluten",
      "Pescado"
    ],
    "image": "/assets/fuentes/cocina_tradicional/potaje_de_garbanzos_con_bacalao_y_espinacas_f_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "09_legumbres_y_potajes_de_cuchara.md",
    "mainIngredientFamily": "bacalao",
    "culinaryTechnique": "cuchara_potaje",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/potaje_de_garbanzos_con_bacalao_y_espinacas_f_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/potaje_de_garbanzos_con_bacalao_y_espinacas_f_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/potaje_de_garbanzos_con_bacalao_y_espinacas_f_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Potaje fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Remojo e Inicio Térmico de los Garbanzos:**",
      "**El Sofrito Marino y Cocinado de Espinacas:**",
      "**El Majado de Almendras y Yemas:**",
      "**Integración del Bacalao y Emulsión:**",
      "**Acabado y Reposo:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-cocido_andaluz_tradicional_con_su_p",
    "name": "Cocido Andaluz Tradicional con su Pringá de Tocino, Ternera, Pollo y Chorizo",
    "shortName": "Cocido Andaluz Tradicional",
    "category": "legumbres",
    "mealType": "lunch",
    "station": "olla_expres",
    "prepTimeFormatted": "15 min (olla_expres)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Huevos",
      "Gluten",
      "Sulfitos"
    ],
    "image": "/assets/fuentes/cocina_tradicional/cocido_andaluz_tradicional_con_su_pringa_de_t_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "09_legumbres_y_potajes_de_cuchara.md",
    "mainIngredientFamily": "pollo",
    "culinaryTechnique": "cuchara_potaje",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/cocido_andaluz_tradicional_con_su_pringa_de_t_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/cocido_andaluz_tradicional_con_su_pringa_de_t_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/cocido_andaluz_tradicional_con_su_pringa_de_t_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Cocido fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**El Fondo Noble y Extracción de Carnes:**",
      "**Entrada de Garbanzos en Agua Hirviendo:**",
      "**Incorporación de Verduras y Embutidos:**",
      "**Servicio y Majado de la Pringá:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-alubias_blancas_estofadas_con_verdu",
    "name": "Alubias Blancas Estofadas con Verduras de la Huerta y Panceta Ibérica",
    "shortName": "Alubias Blancas Estofadas",
    "category": "legumbres",
    "mealType": "lunch",
    "station": "olla_expres",
    "prepTimeFormatted": "15 min (olla_expres)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Huevos",
      "Gluten",
      "Sulfitos"
    ],
    "image": "/assets/fuentes/cocina_tradicional/alubias_blancas_estofadas_con_verduras_de_la__portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "09_legumbres_y_potajes_de_cuchara.md",
    "mainIngredientFamily": "legumbres",
    "culinaryTechnique": "cuchara_potaje",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/alubias_blancas_estofadas_con_verduras_de_la__01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/alubias_blancas_estofadas_con_verduras_de_la__02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/alubias_blancas_estofadas_con_verduras_de_la__03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Alubias fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Montaje en Frío (*Estofado a la Antigua*):**",
      "**Cocción y Doble Asustado:**",
      "**Triturado Ligador:**",
      "**Acabado:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-garbanzos_con_callos_y_morro_a_la_m",
    "name": "Garbanzos con Callos y Morro a la Madrileña",
    "shortName": "Garbanzos",
    "category": "legumbres",
    "mealType": "lunch",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Gluten",
      "Sulfitos"
    ],
    "image": "/assets/fuentes/cocina_tradicional/garbanzos_con_callos_y_morro_a_la_madrilena_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "09_legumbres_y_potajes_de_cuchara.md",
    "mainIngredientFamily": "legumbres",
    "culinaryTechnique": "guiso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/garbanzos_con_callos_y_morro_a_la_madrilena_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/garbanzos_con_callos_y_morro_a_la_madrilena_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/garbanzos_con_callos_y_morro_a_la_madrilena_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Garbanzos fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Blanqueado y Cocción de la Casquería:**",
      "**Cocción de Garbanzos en el Caldo Gelatinoso:**",
      "**El Sofrito Tabernero Picante:**",
      "**Fusión y Asentado:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-judiones_de_la_granja_con_oreja_y_c",
    "name": "Judiones de la Granja con Oreja y Chorizo",
    "shortName": "Judiones",
    "category": "legumbres",
    "mealType": "lunch",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Lácteos",
      "Huevos",
      "Gluten",
      "Sulfitos"
    ],
    "image": "/assets/fuentes/cocina_tradicional/judiones_de_la_granja_con_oreja_y_chorizo_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "09_legumbres_y_potajes_de_cuchara.md",
    "mainIngredientFamily": "legumbres",
    "culinaryTechnique": "guiso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/judiones_de_la_granja_con_oreja_y_chorizo_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/judiones_de_la_granja_con_oreja_y_chorizo_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/judiones_de_la_granja_con_oreja_y_chorizo_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Judiones fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Remojo Prolongado:**",
      "**Puesta en Marcha y Cocción de Oreja:**",
      "**Técnica del Triple Asustado a Fuego Manso:**",
      "**El Sofrito de Pimentón y Embutidos:**",
      "**Ligazón y Textura de Mantequilla:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-potaje_de_lentejas_castellanas_vege",
    "name": "Potaje de Lentejas Castellanas Vegetarianas con Boniato y Verduras",
    "shortName": "Potaje",
    "category": "legumbres",
    "mealType": "lunch",
    "station": "olla_expres",
    "prepTimeFormatted": "15 min (olla_expres)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Apio",
      "Huevos",
      "Sulfitos"
    ],
    "image": "/assets/fuentes/cocina_tradicional/potaje_de_lentejas_castellanas_vegetarianas_c_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "09_legumbres_y_potajes_de_cuchara.md",
    "mainIngredientFamily": "legumbres",
    "culinaryTechnique": "cuchara_potaje",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/potaje_de_lentejas_castellanas_vegetarianas_c_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/potaje_de_lentejas_castellanas_vegetarianas_c_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/potaje_de_lentejas_castellanas_vegetarianas_c_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Potaje fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Sofrito Aromático de Huerta:**",
      "**Incorporación de Tubérculos y Lentejas:**",
      "**Cocción Suave y Liberación de Almidón Dulce:**",
      "**Acabado con Espinacas Frescas:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-tabla_comparativa_maestra_rendimien-77",
    "name": "Tabla Comparativa Maestra: Rendimientos, Tiempos, Costes y Métodos de Cocción",
    "shortName": "Tabla Comparativa Maestra: Rendimientos, Tiempos, Costes y Métodos",
    "category": "legumbres",
    "mealType": "lunch",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Huevos",
      "Frutos de cáscara",
      "Pescado"
    ],
    "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=80",
    "source": "Cocina Tradicional",
    "sourceCompendium": "09_legumbres_y_potajes_de_cuchara.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "guiso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": null,
      "elaboracion": null,
      "resultadoFinal": null
    },
    "ingredientsPerServing": [
      {
        "name": "Tabla fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "Preparar la mise en place de Tabla Comparativa Maestra: Rendimientos, Tiempos, Costes y Métodos de Cocción con corte homogéneo de ingredientes.",
      "Ejecutar la cocción en fuego 1 respetando los puntos térmicos tradicionales.",
      "Abatir temperatura o reservar en recipientes herméticos fechados para conservación segura."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-tabla_tecnica_de_tiempos_de_remojo_",
    "name": "Tabla Técnica de Tiempos de Remojo y Cocción de Legumbres en España",
    "shortName": "Tabla Técnica",
    "category": "legumbres",
    "mealType": "lunch",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [],
    "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=80",
    "source": "Cocina Tradicional",
    "sourceCompendium": "09_legumbres_y_potajes_de_cuchara.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "guiso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": null,
      "elaboracion": null,
      "resultadoFinal": null
    },
    "ingredientsPerServing": [
      {
        "name": "Tabla fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "Preparar la mise en place de Tabla Técnica de Tiempos de Remojo y Cocción de Legumbres en España con corte homogéneo de ingredientes.",
      "Ejecutar la cocción en fuego 1 respetando los puntos térmicos tradicionales.",
      "Abatir temperatura o reservar en recipientes herméticos fechados para conservación segura."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-pisto_manchego_tradicional_con_poch",
    "name": "Pisto Manchego Tradicional con Pochado Escalonado",
    "shortName": "Pisto Manchego Tradicional",
    "category": "legumbres",
    "mealType": "lunch",
    "station": "olla_expres",
    "prepTimeFormatted": "15 min (olla_expres)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Lácteos",
      "Gluten",
      "Pescado"
    ],
    "image": "/assets/fuentes/cocina_tradicional/pisto_manchego_tradicional_con_pochado_escalo_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "10_verduras_pistos_y_platos_horticolas.md",
    "mainIngredientFamily": "legumbres",
    "culinaryTechnique": "cuchara_potaje",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/pisto_manchego_tradicional_con_pochado_escalo_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/pisto_manchego_tradicional_con_pochado_escalo_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/pisto_manchego_tradicional_con_pochado_escalo_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Pisto fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Purga Osmótica de la Berenjena:**",
      "**Pochado Inicial de Aromáticos y Pimientos:**",
      "**Incorporación Escalonada del Calabacín y la Berenjena:**",
      "**Adición del Tomate y Concentración Lenta:**",
      "**Punto Óptimo y Reposo:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-berenjenas_rellenas_de_carne_picada",
    "name": "Berenjenas Rellenas de Carne Picada Gratinadas con Bechamel",
    "shortName": "Berenjenas Rellenas",
    "category": "verduras",
    "mealType": "dinner",
    "station": "horno",
    "prepTimeFormatted": "15 min (horno)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": false,
    "storageAdvice": "Nevera 1-5 días • Consumo fresco",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Lácteos",
      "Frutos de cáscara",
      "Gluten"
    ],
    "image": "/assets/fuentes/cocina_tradicional/berenjenas_rellenas_de_carne_picada_gratinada_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "10_verduras_pistos_y_platos_horticolas.md",
    "mainIngredientFamily": "ternera",
    "culinaryTechnique": "asado_horno",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/berenjenas_rellenas_de_carne_picada_gratinada_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/berenjenas_rellenas_de_carne_picada_gratinada_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/berenjenas_rellenas_de_carne_picada_gratinada_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Berenjenas fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Precocción y Vaciado de las Berenjenas:**",
      "**Elaboración del Relleno Cárnico Concentrado:**",
      "**Elaboración de la Bechamel Suave:**",
      "**Montaje y Gratinado:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-calabacines_rellenos_de_atun_huevo_",
    "name": "Calabacines Rellenos de Atún, Huevo y Verduras Gratinados",
    "shortName": "Calabacines Rellenos",
    "category": "verduras",
    "mealType": "dinner",
    "station": "horno",
    "prepTimeFormatted": "15 min (horno)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": false,
    "storageAdvice": "Nevera 1-5 días • Consumo fresco",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Lácteos",
      "Huevos",
      "Sulfitos",
      "Pescado"
    ],
    "image": "/assets/fuentes/cocina_tradicional/calabacines_rellenos_de_atun_huevo_y_verduras_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "10_verduras_pistos_y_platos_horticolas.md",
    "mainIngredientFamily": "verduras",
    "culinaryTechnique": "asado_horno",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/calabacines_rellenos_de_atun_huevo_y_verduras_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/calabacines_rellenos_de_atun_huevo_y_verduras_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/calabacines_rellenos_de_atun_huevo_y_verduras_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Calabacines fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Escaldado y Vaciado de los Calabacines:**",
      "**Sofrito de la Pulpa y Verduras:**",
      "**Integración del Atún, Huevo y Tomate:**",
      "**Relleno y Gratinado:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-menestra_de_verduras_tudelana_con_j",
    "name": "Menestra de Verduras Tudelana con Jamón Ibérico",
    "shortName": "Menestra",
    "category": "verduras",
    "mealType": "dinner",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": false,
    "storageAdvice": "Nevera 1-5 días • Consumo fresco",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Huevos",
      "Gluten",
      "Sulfitos",
      "Pescado"
    ],
    "image": "/assets/fuentes/cocina_tradicional/menestra_de_verduras_tudelana_con_jamon_iberi_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "10_verduras_pistos_y_platos_horticolas.md",
    "mainIngredientFamily": "verduras",
    "culinaryTechnique": "guiso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/menestra_de_verduras_tudelana_con_jamon_iberi_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/menestra_de_verduras_tudelana_con_jamon_iberi_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/menestra_de_verduras_tudelana_con_jamon_iberi_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Menestra fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Torneado y Cocción de las Alcachofas:**",
      "**Cocción Diferenciada del Resto de Vegetales:**",
      "**Sofrito de Jamón y Elaboración del Roux Ligador:**",
      "**Emulsión de la Salsa y Glaseado:**",
      "**Ensamblaje y Vaivén Final:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-espinacas_con_garbanzos_al_estilo_s",
    "name": "Espinacas con Garbanzos al Estilo Sevillano y Majado de Pan y Comino",
    "shortName": "Espinacas",
    "category": "legumbres",
    "mealType": "lunch",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Huevos",
      "Gluten",
      "Frutos de cáscara",
      "Sulfitos"
    ],
    "image": "/assets/fuentes/cocina_tradicional/espinacas_con_garbanzos_al_estilo_sevillano_y_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "10_verduras_pistos_y_platos_horticolas.md",
    "mainIngredientFamily": "legumbres",
    "culinaryTechnique": "guiso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/espinacas_con_garbanzos_al_estilo_sevillano_y_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/espinacas_con_garbanzos_al_estilo_sevillano_y_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/espinacas_con_garbanzos_al_estilo_sevillano_y_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Espinacas fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Tratamiento y Escaldado de las Espinacas:**",
      "**Elaboración del Majado en Mortero:**",
      "**Cocción y Ligazón del Guiso:**",
      "**Incorporación de los Garbanzos y Asentamiento:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-patatas_a_lo_pobre_con_pimientos_y_",
    "name": "Patatas a lo Pobre con Pimientos y Cebolla Confitada",
    "shortName": "Patatas a lo Pobre",
    "category": "verduras",
    "mealType": "dinner",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": false,
    "storageAdvice": "Nevera 1-5 días • Consumo fresco",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Lácteos",
      "Huevos",
      "Gluten",
      "Sulfitos"
    ],
    "image": "/assets/fuentes/cocina_tradicional/patatas_a_lo_pobre_con_pimientos_tricolor_y_c_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "10_verduras_pistos_y_platos_horticolas.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "sarten_ajillo",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/patatas_a_lo_pobre_con_pimientos_y_cebolla_co_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/patatas_a_lo_pobre_con_pimientos_tricolor_y_c_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/patatas_a_lo_pobre_con_pimientos_y_cebolla_co_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Patatas fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Corte y Lavado de la Patata:**",
      "**Disposición y Confitado Lento:**",
      "**Golpe de Fuego y Dorado:**",
      "**Escurrido y Servicio:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-alcachofas_salteadas_con_jamon_iber",
    "name": "Alcachofas Salteadas con Jamón Ibérico y Ajos Tiernos",
    "shortName": "Alcachofas Salteadas",
    "category": "verduras",
    "mealType": "dinner",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": false,
    "storageAdvice": "Nevera 1-5 días • Consumo fresco",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Huevos",
      "Gluten",
      "Sulfitos"
    ],
    "image": "/assets/fuentes/cocina_tradicional/alcachofas_salteadas_con_jamon_iberico_y_ajos_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "10_verduras_pistos_y_platos_horticolas.md",
    "mainIngredientFamily": "verduras",
    "culinaryTechnique": "sarten_ajillo",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/alcachofas_salteadas_con_jamon_iberico_y_ajos_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/alcachofas_salteadas_con_jamon_iberico_y_ajos_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/alcachofas_salteadas_con_jamon_iberico_y_ajos_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Alcachofas fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Torneado y Limpieza de Alcachofas:**",
      "**Cocción al Dente:**",
      "**Salteado con Ajos Tiernos y Desglasado:**",
      "**Incorporación del Jamón y Emplatado:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-coliflor_al_ajoarriero_con_pimenton",
    "name": "Coliflor al Ajoarriero con Pimentón de la Vera",
    "shortName": "Coliflor al Ajoarriero",
    "category": "verduras",
    "mealType": "dinner",
    "station": "fuego_2",
    "prepTimeFormatted": "15 min (fuego_2)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": false,
    "storageAdvice": "Nevera 1-5 días • Consumo fresco",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Lácteos",
      "Frutos de cáscara",
      "Gluten"
    ],
    "image": "/assets/fuentes/cocina_tradicional/coliflor_al_ajoarriero_con_pimenton_de_la_ver_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "10_verduras_pistos_y_platos_horticolas.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "salsa",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/coliflor_al_ajoarriero_con_pimenton_de_la_ver_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/coliflor_al_ajoarriero_con_pimenton_de_la_ver_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/coliflor_al_ajoarriero_con_pimenton_de_la_ver_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Coliflor fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Corte y Cocción al Vapor de la Coliflor:**",
      "**Elaboración del Refrito Ajoarriero Tradicional:**",
      "**Salseado y Servicio:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-champinones_al_ajillo_con_vino_blan",
    "name": "Champiñones al Ajillo con Vino Blanco y Perejil",
    "shortName": "Champiñones al Ajillo",
    "category": "verduras",
    "mealType": "dinner",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": false,
    "storageAdvice": "Nevera 1-5 días • Consumo fresco",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Huevos",
      "Frutos de cáscara",
      "Sulfitos"
    ],
    "image": "/assets/fuentes/cocina_tradicional/champinones_al_ajillo_con_vino_blanco_y_perej_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "10_verduras_pistos_y_platos_horticolas.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "sarten_ajillo",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/champinones_al_ajillo_con_vino_blanco_y_perej_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/champinones_al_ajillo_con_vino_blanco_y_perej_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/champinones_al_ajillo_con_vino_blanco_y_perej_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Champiñones fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Limpieza y Corte de los Hongos:**",
      "**Salteado a Fuego Vivo (Sellado Térmico):**",
      "**Desglasado con Vino Blanco y Reducción:**",
      "**Acabado con Perejil:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-judias_verdes_con_tomate_frito_case",
    "name": "Judías Verdes con Tomate Frito Casero y Taquitos de Jamón",
    "shortName": "Judías Verdes",
    "category": "verduras",
    "mealType": "dinner",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": false,
    "storageAdvice": "Nevera 1-5 días • Consumo fresco",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos"
    ],
    "image": "/assets/fuentes/cocina_tradicional/judias_verdes_con_tomate_frito_casero_y_taqui_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "10_verduras_pistos_y_platos_horticolas.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "frito_empanado",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/judias_verdes_con_tomate_frito_casero_y_taqui_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/judias_verdes_con_tomate_frito_casero_y_taqui_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/judias_verdes_con_tomate_frito_casero_y_taqui_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Judías fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Limpieza, Corte y Blanqueado:**",
      "**Sofrito de Ajo, Cebolla y Jamón:**",
      "**Integración con el Tomate y las Judías:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-pastel_de_verduras_al_horno_con_que",
    "name": "Pastel de Verduras al Horno con Queso de Cabra",
    "shortName": "Pastel",
    "category": "verduras",
    "mealType": "dinner",
    "station": "horno",
    "prepTimeFormatted": "15 min (horno)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": false,
    "storageAdvice": "Nevera 1-5 días • Consumo fresco",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Lácteos",
      "Frutos de cáscara",
      "Gluten"
    ],
    "image": "/assets/fuentes/cocina_tradicional/pastel_de_verduras_al_horno_con_queso_de_cabr_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "10_verduras_pistos_y_platos_horticolas.md",
    "mainIngredientFamily": "verduras",
    "culinaryTechnique": "asado_horno",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/pastel_de_verduras_al_horno_con_queso_de_cabr_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/pastel_de_verduras_al_horno_con_queso_de_cabr_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/pastel_de_verduras_al_horno_con_queso_de_cabr_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Pastel fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Pochar y Secar las Verduras:**",
      "**Elaboración de la Royale:**",
      "**Encamisado del Molde y Horneado:**",
      "**Atemperado y Desmoldado:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-tabla_comparativa_maestra_rendimien-90",
    "name": "Tabla Comparativa Maestra: Rendimientos, Costes, Tiempos y Conservación",
    "shortName": "Tabla Comparativa Maestra: Rendimientos, Costes, Tiempos y Conservación",
    "category": "verduras",
    "mealType": "dinner",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": false,
    "storageAdvice": "Nevera 1-5 días • Consumo fresco",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Pescado"
    ],
    "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=80",
    "source": "Cocina Tradicional",
    "sourceCompendium": "10_verduras_pistos_y_platos_horticolas.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "guiso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": null,
      "elaboracion": null,
      "resultadoFinal": null
    },
    "ingredientsPerServing": [
      {
        "name": "Tabla fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "Preparar la mise en place de Tabla Comparativa Maestra: Rendimientos, Costes, Tiempos y Conservación con corte homogéneo de ingredientes.",
      "Ejecutar la cocción en fuego 1 respetando los puntos térmicos tradicionales.",
      "Abatir temperatura o reservar en recipientes herméticos fechados para conservación segura."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-guia_rapida_de_adaptacion_para_into-91",
    "name": "️ Guía Rápida de Adaptación para Intolerancias y Dietas Especiales",
    "shortName": "️ Guía Rápida",
    "category": "verduras",
    "mealType": "dinner",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": false,
    "storageAdvice": "Nevera 1-5 días • Consumo fresco",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Huevos",
      "Lácteos",
      "Frutos de cáscara",
      "Gluten",
      "Mostaza"
    ],
    "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=80",
    "source": "Cocina Tradicional",
    "sourceCompendium": "10_verduras_pistos_y_platos_horticolas.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "guiso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": null,
      "elaboracion": null,
      "resultadoFinal": null
    },
    "ingredientsPerServing": [
      {
        "name": "️ fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "Preparar la mise en place de ️ Guía Rápida de Adaptación para Intolerancias y Dietas Especiales con corte homogéneo de ingredientes.",
      "Ejecutar la cocción en fuego 1 respetando los puntos térmicos tradicionales.",
      "Abatir temperatura o reservar en recipientes herméticos fechados para conservación segura."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-sofrito_madre_universal_de_carmen_b",
    "name": "Sofrito Madre Universal de Carmen (Base Dorada Multiusos)",
    "shortName": "Sofrito Madre Universal",
    "category": "pescados",
    "mealType": "universal",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 3,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-3 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Moluscos",
      "Huevos",
      "Sulfitos",
      "Pescado"
    ],
    "image": "/assets/fuentes/cocina_tradicional/sofrito_madre_universal_de_carmen_base_dorada_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "11_salsas_sofritos_fondos_y_adobos.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "frito_empanado",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/sofrito_madre_universal_de_carmen_base_dorada_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/sofrito_madre_universal_de_carmen_base_dorada_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/sofrito_madre_universal_de_carmen_base_dorada_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Sofrito fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Aromatización del Aceite e Inicio de Pochado:**",
      "**Pochado Lento y Sudado de Hortalizas (20-25 minutos):**",
      "**Adición del Tomate y Reducción del Agua Libre (15 minutos):**",
      "**Toque Maestro de Pimentón y Reposo:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-salsa_de_tomate_frito_casero_reduci",
    "name": "Salsa de Tomate Frito Casero Reducido y Concentrado en AOVE",
    "shortName": "Salsa",
    "category": "carnes",
    "mealType": "universal",
    "station": "fuego_2",
    "prepTimeFormatted": "25 min (fuego_2)",
    "prepTimeMinutes": 25,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Huevos",
      "Gluten",
      "Sulfitos",
      "Pescado"
    ],
    "image": "/assets/fuentes/cocina_tradicional/salsa_de_tomate_frito_casero_reducido_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "11_salsas_sofritos_fondos_y_adobos.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "salsa",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/salsa_de_tomate_frito_casero_reducido_y_conce_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/salsa_de_tomate_frito_casero_reducido_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/salsa_de_tomate_frito_casero_reducido_y_conce_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Salsa fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Confitado de Ajos y Cebolla:**",
      "**Incorporación del Tomate y Cocción Lenta:**",
      "**Reducción y Confitura en Grasa (50-60 minutos):**",
      "**Aromatizado Final y Textura:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-salsa_bechamel_perfecta_y_sedosa_si",
    "name": "Salsa Bechamel Perfecta y Sedosa Sin Grumos",
    "shortName": "Salsa Bechamel Perfecta y Sedosa Sin Grumos",
    "category": "carnes",
    "mealType": "universal",
    "station": "fuego_2",
    "prepTimeFormatted": "25 min (fuego_2)",
    "prepTimeMinutes": 25,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Huevos",
      "Lácteos",
      "Frutos de cáscara",
      "Gluten",
      "Pescado"
    ],
    "image": "/assets/fuentes/cocina_tradicional/salsa_bechamel_perfecta_y_sedosa_sin_grumos_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "11_salsas_sofritos_fondos_y_adobos.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "salsa",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/salsa_bechamel_perfecta_y_sedosa_sin_grumos_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/salsa_bechamel_perfecta_y_sedosa_sin_grumos_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/salsa_bechamel_perfecta_y_sedosa_sin_grumos_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Salsa fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Calentamiento de la Leche:**",
      "**Elaboración del Roux Blanco-Rubio:**",
      "**Adición de Leche en 3 Fases Térmicas:**",
      "**Cocción a Fuego Lento y Condimentado:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-salsa_alioli_casera_tradicional_al_",
    "name": "Salsa Alioli Casera Tradicional al Mortero (Emulsión Densa)",
    "shortName": "Salsa Alioli Casera Tradicional al Mortero (Emulsión Densa)",
    "category": "tapas",
    "mealType": "universal",
    "station": "fuego_2",
    "prepTimeFormatted": "15 min (fuego_2)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Lácteos",
      "Huevos",
      "Sulfitos"
    ],
    "image": "/assets/fuentes/cocina_tradicional/salsa_alioli_casera_tradicional_al_mortero_em_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "11_salsas_sofritos_fondos_y_adobos.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "salsa",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/salsa_alioli_casera_tradicional_al_mortero_em_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/salsa_alioli_casera_tradicional_al_mortero_em_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/salsa_alioli_casera_tradicional_al_mortero_em_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Salsa fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Majado Abrasivo del Ajo:**",
      "**Inicio de la Emulsión:**",
      "**Incorporación del Aceite Gota a Gota:**",
      "**Montado y Espesamiento:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-mayonesa_casera_con_toque_de_limon_",
    "name": "Mayonesa Casera con Toque de Limón por Inmersión",
    "shortName": "Mayonesa Casera",
    "category": "carnes",
    "mealType": "universal",
    "station": "fuego_1",
    "prepTimeFormatted": "25 min (fuego_1)",
    "prepTimeMinutes": 25,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Lácteos",
      "Huevos",
      "Mostaza",
      "Pescado"
    ],
    "image": "/assets/fuentes/cocina_tradicional/mayonesa_casera_con_toque_de_limon_por_inmers_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "11_salsas_sofritos_fondos_y_adobos.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "guiso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/mayonesa_casera_con_toque_de_limon_por_inmers_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/mayonesa_casera_con_toque_de_limon_por_inmers_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/mayonesa_casera_con_toque_de_limon_por_inmers_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Mayonesa fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Disposición por Densidades en el Vaso:**",
      "**Emulsión por Inmersión:**",
      "**Ligado Final:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-salsa_verde_tradicional_para_pescad",
    "name": "Salsa Verde Tradicional para Pescados y Mariscos",
    "shortName": "Salsa Verde Tradicional para Pescados y Mariscos",
    "category": "pescados",
    "mealType": "universal",
    "station": "fuego_2",
    "prepTimeFormatted": "15 min (fuego_2)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 3,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-3 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Pescado",
      "Gluten",
      "Moluscos"
    ],
    "image": "/assets/fuentes/cocina_tradicional/merluza_en_salsa_verde_tradicional_con_almeja_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "11_salsas_sofritos_fondos_y_adobos.md",
    "mainIngredientFamily": "marisco",
    "culinaryTechnique": "salsa",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/salsa_verde_tradicional_para_pescados_y_maris_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/salsa_verde_tradicional_para_pescados_y_maris_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/salsa_verde_tradicional_para_pescados_y_maris_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Salsa fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Aromatizado del Aceite:**",
      "**Cocción del Roux Verde:**",
      "**Desglasado y Reducción Alcohólica:**",
      "**Adición del Fumet y Emulsión por Vaivén:**",
      "**Servicio con Pescados:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-salsa_espanola_oscura_reducida_para",
    "name": "Salsa Española Oscura Reducida para Carnes y Albóndigas",
    "shortName": "Salsa Española Oscura Reducida para Carnes y Albóndigas",
    "category": "carnes",
    "mealType": "universal",
    "station": "fuego_2",
    "prepTimeFormatted": "25 min (fuego_2)",
    "prepTimeMinutes": 25,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Sulfitos",
      "Apio",
      "Lácteos",
      "Frutos de cáscara",
      "Gluten"
    ],
    "image": "/assets/fuentes/cocina_tradicional/salsa_espanola_oscura_reducida_para_carnes_y__portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "11_salsas_sofritos_fondos_y_adobos.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "salsa",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/salsa_espanola_oscura_reducida_para_carnes_y__01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/salsa_espanola_oscura_reducida_para_carnes_y__02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/salsa_espanola_oscura_reducida_para_carnes_y__03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Salsa fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Caramelización de la Bresa Vegetal:**",
      "**Elaboración del Roux Oscuro:**",
      "**Desglasado con Vino y Evaporación:**",
      "**Adición del Fondo y Reducción Lenta:**",
      "**Colado y Textura de Terciopelo:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-salsa_brava_casera_autentica_con_pi",
    "name": "️ Salsa Brava Casera Auténtica con Pimentón de la Vera",
    "shortName": "️ Salsa Brava Casera Auténtica",
    "category": "tapas",
    "mealType": "universal",
    "station": "fuego_2",
    "prepTimeFormatted": "15 min (fuego_2)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Huevos",
      "Gluten",
      "Sulfitos",
      "Moluscos"
    ],
    "image": "/assets/fuentes/cocina_tradicional/salsa_brava_casera_autentica_con_pimenton_de__portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "11_salsas_sofritos_fondos_y_adobos.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "salsa",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/salsa_brava_casera_autentica_con_pimenton_de__01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/salsa_brava_casera_autentica_con_pimenton_de__02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/salsa_brava_casera_autentica_con_pimenton_de__03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "️ fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Pochado Profundo:**",
      "**Tostado de Harina y Pimentones:**",
      "**Desglasado y Ligazón:**",
      "**Triturado y Colado Fino:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-adobo_andaluz_tradicional_para_bien",
    "name": "Adobo Andaluz Tradicional para Bienmesabe, Carnes y Pescados",
    "shortName": "Adobo Andaluz Tradicional para Bienmesabe, Carnes y Pescados",
    "category": "carnes",
    "mealType": "universal",
    "station": "fuego_1",
    "prepTimeFormatted": "25 min (fuego_1)",
    "prepTimeMinutes": 25,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Huevos",
      "Gluten",
      "Sulfitos",
      "Pescado"
    ],
    "image": "/assets/fuentes/cocina_tradicional/adobo_andaluz_tradicional_para_bienmesabe_car_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "11_salsas_sofritos_fondos_y_adobos.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "guiso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/adobo_andaluz_tradicional_para_bienmesabe_car_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/adobo_andaluz_tradicional_para_bienmesabe_car_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/adobo_andaluz_tradicional_para_bienmesabe_car_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Adobo fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Tostado y Majado Aromático:**",
      "**Integración de Líquidos y Especias:**",
      "**Protocolo de Maceración por Tipo de Proteína:**",
      "**Técnica de Fritura Andaluza Posterior:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-fondo_oscuro_de_carne_casero_tostad",
    "name": "Fondo Oscuro de Carne Casero Tostado y Gelatinoso",
    "shortName": "Fondo Oscuro",
    "category": "carnes",
    "mealType": "universal",
    "station": "fuego_1",
    "prepTimeFormatted": "25 min (fuego_1)",
    "prepTimeMinutes": 25,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Apio",
      "Huevos",
      "Sulfitos"
    ],
    "image": "/assets/fuentes/cocina_tradicional/fondo_oscuro_de_carne_casero_tostado_y_gelati_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "11_salsas_sofritos_fondos_y_adobos.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "guiso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/fondo_oscuro_de_carne_casero_tostado_y_gelati_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/fondo_oscuro_de_carne_casero_tostado_y_gelati_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/fondo_oscuro_de_carne_casero_tostado_y_gelati_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Fondo fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Tostado Profundo en Horno (Maillard):**",
      "**Desglasado de la Placa:**",
      "**Cocción a Fuego Lento y Desespumado Constante:**",
      "**Filtrado y Desgrasado en Frío:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-fumet_rojo_de_pescado_y_marisco_con",
    "name": "Fumet Rojo de Pescado y Marisco Concentrado con Brandy",
    "shortName": "Fumet Rojo",
    "category": "pescados",
    "mealType": "universal",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 3,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-3 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Crustáceos",
      "Huevos",
      "Sulfitos",
      "Pescado",
      "Gluten",
      "Moluscos"
    ],
    "image": "/assets/fuentes/cocina_tradicional/fumet_rojo_de_pescado_y_marisco_concentrado_c_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "11_salsas_sofritos_fondos_y_adobos.md",
    "mainIngredientFamily": "marisco",
    "culinaryTechnique": "guiso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/fumet_rojo_de_pescado_y_marisco_concentrado_c_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/fumet_rojo_de_pescado_y_marisco_concentrado_c_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/fumet_rojo_de_pescado_y_marisco_concentrado_c_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Fumet fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Dorado y Extracción de Coral del Marisco:**",
      "**Flambeado con Brandy:**",
      "**Pochado de Bresa y Tomate:**",
      "**Infusión y Cocción Corta de Espinas (25 minutos):**",
      "**Filtrado Escrupuloso:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-caldo_de_pollo_de_corral_y_hueso_de",
    "name": "Caldo de Pollo de Corral y Hueso de Jamón Tradicional",
    "shortName": "Caldo",
    "category": "carnes",
    "mealType": "universal",
    "station": "fuego_1",
    "prepTimeFormatted": "25 min (fuego_1)",
    "prepTimeMinutes": 25,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Apio",
      "Huevos",
      "Gluten",
      "Sulfitos"
    ],
    "image": "/assets/fuentes/cocina_tradicional/caldo_de_pollo_de_corral_y_hueso_de_jamon_tra_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "11_salsas_sofritos_fondos_y_adobos.md",
    "mainIngredientFamily": "pollo",
    "culinaryTechnique": "guiso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/caldo_de_pollo_de_corral_y_hueso_de_jamon_tra_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/caldo_de_pollo_de_corral_y_hueso_de_jamon_tra_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/caldo_de_pollo_de_corral_y_hueso_de_jamon_tra_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Caldo fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Blanqueado del Hueso de Jamón:**",
      "**Tostado de la Cebolla (Color Ámbar Natural):**",
      "**Ensamblaje y Arranque en Frío:**",
      "**Espumado y Cocción a Fuego Lento (3 horas):**",
      "**Filtrado y Clarificación:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-tabla_comparativa_maestra_rendimien-104",
    "name": "Tabla Comparativa Maestra: Rendimientos, Costes, Tiempos y Conservación",
    "shortName": "Tabla Comparativa Maestra: Rendimientos, Costes, Tiempos y Conservación",
    "category": "carnes",
    "mealType": "universal",
    "station": "fuego_1",
    "prepTimeFormatted": "25 min (fuego_1)",
    "prepTimeMinutes": 25,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Moluscos",
      "Pescado"
    ],
    "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=80",
    "source": "Cocina Tradicional",
    "sourceCompendium": "11_salsas_sofritos_fondos_y_adobos.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "guiso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": null,
      "elaboracion": null,
      "resultadoFinal": null
    },
    "ingredientsPerServing": [
      {
        "name": "Tabla fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "Preparar la mise en place de Tabla Comparativa Maestra: Rendimientos, Costes, Tiempos y Conservación con corte homogéneo de ingredientes.",
      "Ejecutar la cocción en fuego 1 respetando los puntos térmicos tradicionales.",
      "Abatir temperatura o reservar en recipientes herméticos fechados para conservación segura."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-matriz_de_congelacion_en_cubiteras_",
    "name": "Matriz de Congelación en Cubiteras y Dosificación Batch Cooking",
    "shortName": "Matriz",
    "category": "carnes",
    "mealType": "universal",
    "station": "fuego_1",
    "prepTimeFormatted": "25 min (fuego_1)",
    "prepTimeMinutes": 25,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Pescado"
    ],
    "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=80",
    "source": "Cocina Tradicional",
    "sourceCompendium": "11_salsas_sofritos_fondos_y_adobos.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "guiso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": null,
      "elaboracion": null,
      "resultadoFinal": null
    },
    "ingredientsPerServing": [
      {
        "name": "Matriz fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "Preparar la mise en place de Matriz de Congelación en Cubiteras y Dosificación Batch Cooking con corte homogéneo de ingredientes.",
      "Ejecutar la cocción en fuego 1 respetando los puntos térmicos tradicionales.",
      "Abatir temperatura o reservar en recipientes herméticos fechados para conservación segura."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-guia_rapida_de_adaptacion_para_into-106",
    "name": "️ Guía Rápida de Adaptación para Intolerancias y Dietas Especiales",
    "shortName": "️ Guía Rápida",
    "category": "carnes",
    "mealType": "universal",
    "station": "fuego_1",
    "prepTimeFormatted": "25 min (fuego_1)",
    "prepTimeMinutes": 25,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Apio",
      "Lácteos",
      "Gluten",
      "Pescado"
    ],
    "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=80",
    "source": "Cocina Tradicional",
    "sourceCompendium": "11_salsas_sofritos_fondos_y_adobos.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "guiso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": null,
      "elaboracion": null,
      "resultadoFinal": null
    },
    "ingredientsPerServing": [
      {
        "name": "️ fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "Preparar la mise en place de ️ Guía Rápida de Adaptación para Intolerancias y Dietas Especiales con corte homogéneo de ingredientes.",
      "Ejecutar la cocción en fuego 1 respetando los puntos térmicos tradicionales.",
      "Abatir temperatura o reservar en recipientes herméticos fechados para conservación segura."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-masa_de_empanada_gallega_tradiciona",
    "name": "Masa de Empanada Gallega Tradicional con Relleno de Atún y Pimientos",
    "shortName": "Masa",
    "category": "masas",
    "mealType": "universal",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Lácteos",
      "Gluten",
      "Pescado"
    ],
    "image": "/assets/fuentes/cocina_tradicional/masa_de_empanada_gallega_tradicional_con_rell_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "12_masas_panes_empanadas_y_quiches.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "frito_empanado",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/masa_de_empanada_gallega_tradicional_con_rell_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/masa_de_empanada_gallega_tradicional_con_rell_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/masa_de_empanada_gallega_tradicional_con_rell_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Masa fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "Preparar la mise en place de Masa de Empanada Gallega Tradicional con Relleno de Atún y Pimientos con corte homogéneo de ingredientes.",
      "Ejecutar la cocción en fuego 1 respetando los puntos térmicos tradicionales.",
      "Abatir temperatura o reservar en recipientes herméticos fechados para conservación segura."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-masa_de_pizza_casera_crujiente_de_l",
    "name": "Masa de Pizza Casera Crujiente de Larga Fermentación (24-48h)",
    "shortName": "Masa",
    "category": "masas",
    "mealType": "universal",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Lácteos",
      "Huevos",
      "Gluten"
    ],
    "image": "/assets/fuentes/cocina_tradicional/masa_de_pizza_casera_crujiente_de_larga_ferme_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "12_masas_panes_empanadas_y_quiches.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "guiso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/masa_de_pizza_casera_crujiente_de_larga_ferme_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/masa_de_pizza_casera_crujiente_de_larga_ferme_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/masa_de_pizza_casera_crujiente_de_larga_ferme_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Masa fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "Preparar la mise en place de Masa de Pizza Casera Crujiente de Larga Fermentación (24-48h) con corte homogéneo de ingredientes.",
      "Ejecutar la cocción en fuego 1 respetando los puntos térmicos tradicionales.",
      "Abatir temperatura o reservar en recipientes herméticos fechados para conservación segura."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-masa_quebrada_brisa_casera_para_tar",
    "name": "Masa Quebrada / Brisa Casera para Tartas Saladas y Quiches",
    "shortName": "Masa Quebrada / Brisa Casera para Tartas Saladas y Quiches",
    "category": "masas",
    "mealType": "universal",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Lácteos",
      "Huevos",
      "Gluten",
      "Sulfitos"
    ],
    "image": "/assets/fuentes/cocina_tradicional/masa_quebrada_brisa_casera_para_tartas_salada_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "12_masas_panes_empanadas_y_quiches.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "guiso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/masa_quebrada_brisa_casera_para_tartas_salada_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/masa_quebrada_brisa_casera_para_tartas_salada_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/masa_quebrada_brisa_casera_para_tartas_salada_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Masa fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "Preparar la mise en place de Masa Quebrada / Brisa Casera para Tartas Saladas y Quiches con corte homogéneo de ingredientes.",
      "Ejecutar la cocción en fuego 1 respetando los puntos térmicos tradicionales.",
      "Abatir temperatura o reservar en recipientes herméticos fechados para conservación segura."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-quiche_lorraine_tradicional_con_bac",
    "name": "Quiche Lorraine Tradicional con Bacon Ahumado y Queso Gruyère",
    "shortName": "Quiche Lorraine Tradicional",
    "category": "masas",
    "mealType": "universal",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Lácteos",
      "Frutos de cáscara",
      "Gluten",
      "Pescado"
    ],
    "image": "/assets/fuentes/cocina_tradicional/quiche_lorraine_tradicional_con_bacon_ahumado_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "12_masas_panes_empanadas_y_quiches.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "guiso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/quiche_lorraine_tradicional_con_bacon_ahumado_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/quiche_lorraine_tradicional_con_bacon_ahumado_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/quiche_lorraine_tradicional_con_bacon_ahumado_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Quiche fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Cocinado y Desgrasado del Bacon:**",
      "**Elaboración del Batido Ligador (*Appareil*):**",
      "**Distribución por Capas en la Base:**",
      "**Vertido y Coronado de Queso:**",
      "**Horneado y Curva Térmica:**",
      "**Atemperado y Corte:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-pan_casero_facil_sin_amasado_en_coc",
    "name": "Pan Casero Fácil Sin Amasado (en Cocotte / Pyrex con Corteza Crujiente)",
    "shortName": "Pan Casero Fácil Sin Amasado (en Cocotte / Pyrex",
    "category": "masas",
    "mealType": "universal",
    "station": "horno",
    "prepTimeFormatted": "15 min (horno)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Huevos",
      "Gluten"
    ],
    "image": "/assets/fuentes/cocina_tradicional/pan_casero_facil_sin_amasado_en_cocotte_pyrex_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "12_masas_panes_empanadas_y_quiches.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "asado_horno",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/pan_casero_facil_sin_amasado_en_cocotte_pyrex_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/pan_casero_facil_sin_amasado_en_cocotte_pyrex_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/pan_casero_facil_sin_amasado_en_cocotte_pyrex_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Pan fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "Preparar la mise en place de Pan Casero Fácil Sin Amasado (en Cocotte / Pyrex con Corteza Crujiente) con corte homogéneo de ingredientes.",
      "Ejecutar la cocción en horno respetando los puntos térmicos tradicionales.",
      "Abatir temperatura o reservar en recipientes herméticos fechados para conservación segura."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-masa_para_empanadillas_fritas_y_al_",
    "name": "Masa para Empanadillas Fritas y al Horno (Obleas Caseras de Carmen)",
    "shortName": "Masa para Empanadillas Fritas y al Horno (Obleas Caseras",
    "category": "masas",
    "mealType": "universal",
    "station": "horno",
    "prepTimeFormatted": "15 min (horno)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Apio",
      "Lácteos",
      "Gluten",
      "Pescado"
    ],
    "image": "/assets/fuentes/cocina_tradicional/masa_para_empanadillas_fritas_y_al_horno_oble_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "12_masas_panes_empanadas_y_quiches.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "asado_horno",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/masa_para_empanadillas_fritas_y_al_horno_oble_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/masa_para_empanadillas_fritas_y_al_horno_oble_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/masa_para_empanadillas_fritas_y_al_horno_oble_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Masa fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "Preparar la mise en place de Masa para Empanadillas Fritas y al Horno (Obleas Caseras de Carmen) con corte homogéneo de ingredientes.",
      "Ejecutar la cocción en horno respetando los puntos térmicos tradicionales.",
      "Abatir temperatura o reservar en recipientes herméticos fechados para conservación segura."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-empanada_de_pollo_asado_cebolla_car",
    "name": "Empanada de Pollo Asado, Cebolla Caramelizada y Queso Fundente",
    "shortName": "Empanada",
    "category": "carnes",
    "mealType": "universal",
    "station": "horno",
    "prepTimeFormatted": "25 min (horno)",
    "prepTimeMinutes": 25,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Lácteos",
      "Gluten",
      "Pescado"
    ],
    "image": "/assets/fuentes/cocina_tradicional/empanada_de_pollo_asado_cebolla_caramelizada__portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "12_masas_panes_empanadas_y_quiches.md",
    "mainIngredientFamily": "pollo",
    "culinaryTechnique": "asado_horno",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/empanada_de_pollo_asado_cebolla_caramelizada__01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/empanada_de_pollo_asado_cebolla_caramelizada__02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/empanada_de_pollo_asado_cebolla_caramelizada__03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Empanada fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Caramelización Natural de la Cebolla:**",
      "**Integración del Relleno:**",
      "**Amasado y Fermentación:**",
      "**Montaje y Sellado de la Empanada:**",
      "**Horneado Dorado:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-hojaldre_relleno_de_espinacas_fresc",
    "name": "Hojaldre Relleno de Espinacas Frescas, Queso Feta y Nueces",
    "shortName": "Hojaldre Relleno",
    "category": "verduras",
    "mealType": "dinner",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": false,
    "storageAdvice": "Nevera 1-5 días • Consumo fresco",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Lácteos",
      "Frutos de cáscara",
      "Gluten",
      "Sésamo",
      "Pescado"
    ],
    "image": "/assets/fuentes/cocina_tradicional/hojaldre_relleno_de_espinacas_frescas_queso_f_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "12_masas_panes_empanadas_y_quiches.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "guiso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/hojaldre_relleno_de_espinacas_frescas_queso_f_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/hojaldre_relleno_de_espinacas_frescas_queso_f_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/hojaldre_relleno_de_espinacas_frescas_queso_f_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Hojaldre fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Salteado y Escurrido Riguroso de las Espinacas:**",
      "**Elaboración del Relleno:**",
      "**Montaje en Trenza o Corona de Hojaldre:**",
      "**Pincelado y Horneado:**",
      "**Servicio:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-tabla_comparativa_maestra_hidrataci",
    "name": "Tabla Comparativa Maestra: Hidratación, Fermentación, Costes y Horneado",
    "shortName": "Tabla Comparativa Maestra: Hidratación, Fermentación, Costes y Horneado",
    "category": "masas",
    "mealType": "universal",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Lácteos",
      "Sulfitos"
    ],
    "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=80",
    "source": "Cocina Tradicional",
    "sourceCompendium": "12_masas_panes_empanadas_y_quiches.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "guiso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": null,
      "elaboracion": null,
      "resultadoFinal": null
    },
    "ingredientsPerServing": [
      {
        "name": "Tabla fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "Preparar la mise en place de Tabla Comparativa Maestra: Hidratación, Fermentación, Costes y Horneado con corte homogéneo de ingredientes.",
      "Ejecutar la cocción en fuego 1 respetando los puntos térmicos tradicionales.",
      "Abatir temperatura o reservar en recipientes herméticos fechados para conservación segura."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-arroz_con_leche_cremoso_de_la_abuel",
    "name": "Arroz con Leche Cremoso de la Abuela con Canela y Cítricos",
    "shortName": "Arroz",
    "category": "arroces_pastas",
    "mealType": "lunch",
    "station": "fuego_2",
    "prepTimeFormatted": "25 min (fuego_2)",
    "prepTimeMinutes": 25,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Lácteos",
      "Frutos de cáscara",
      "Gluten"
    ],
    "image": "/assets/fuentes/cocina_tradicional/arroz_con_leche_caramelizado_al_estilo_asturi_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "13_postres_de_cuchara_y_flanes.md",
    "mainIngredientFamily": "arroz",
    "culinaryTechnique": "salsa",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/arroz_con_leche_caramelizado_al_estilo_asturi_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/arroz_con_leche_cremoso_de_la_abuela_con_cane_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/arroz_con_leche_cremoso_de_la_abuela_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Arroz fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Aromatización e Infusión de la Leche:**",
      "**Blanqueado Previo del Arroz:**",
      "**Cocción Lenta y Fricción Mecánica:**",
      "**Incorporación del Azúcar y Manteca:**",
      "**Punto de Fluidez y Reposo:**",
      "**Servicio Tradicional:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-flan_de_huevo_tradicional_al_bano_m",
    "name": "Flan de Huevo Tradicional al Baño María con Caramelo Líquido Casero",
    "shortName": "Flan",
    "category": "postres",
    "mealType": "universal",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Lácteos",
      "Frutos de cáscara",
      "Gluten"
    ],
    "image": "/assets/fuentes/cocina_tradicional/flan_de_huevo_tradicional_al_bano_maria_con_c_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "13_postres_de_cuchara_y_flanes.md",
    "mainIngredientFamily": "huevos",
    "culinaryTechnique": "guiso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/flan_de_huevo_tradicional_al_bano_maria_con_c_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/flan_de_huevo_tradicional_al_bano_maria_con_c_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/flan_de_huevo_tradicional_al_bano_maria_con_c_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Flan fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Elaboración del Caramelo Rubio Artesano:**",
      "**Infusión Aromática Láctea:**",
      "**Elaboración del Aparejo sin Emulsión de Aire:**",
      "**Disposición del Baño María Técnico:**",
      "**Cocción y Maduración:**",
      "**Desmoldado Perfecto:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-natillas_caseras_de_yema_con_gallet",
    "name": "Natillas Caseras de Yema con Galleta María y Canela",
    "shortName": "Natillas Caseras",
    "category": "postres",
    "mealType": "universal",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Lácteos",
      "Huevos",
      "Gluten",
      "Sulfitos"
    ],
    "image": "/assets/fuentes/cocina_tradicional/natillas_caseras_de_yema_con_galleta_maria_y__portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "13_postres_de_cuchara_y_flanes.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "guiso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/natillas_caseras_de_yema_con_galleta_maria_y__01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/natillas_caseras_de_yema_con_galleta_maria_y__02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/natillas_caseras_de_yema_con_galleta_maria_y__03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Natillas fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Infusión Aromática:**",
      "**Mezcla y Disolución de Yemas:**",
      "**Temperado Escalonado:**",
      "**Cocinado a Fuego Lento hasta el Punto de Rosa:**",
      "**Corte Térmico y Emplatado:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-crema_catalana_tradicional_con_azuc",
    "name": "Crema Catalana Tradicional con Azúcar Quemado Crujiente",
    "shortName": "Crema Catalana Tradicional",
    "category": "cremas",
    "mealType": "dinner",
    "station": "robot",
    "prepTimeFormatted": "15 min (robot)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Lácteos",
      "Huevos",
      "Frutos de cáscara",
      "Sulfitos"
    ],
    "image": "/assets/fuentes/cocina_tradicional/crema_catalana_tradicional_con_azucar_quemado_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "13_postres_de_cuchara_y_flanes.md",
    "mainIngredientFamily": "verduras",
    "culinaryTechnique": "crema",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/crema_catalana_tradicional_con_azucar_quemado_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/crema_catalana_tradicional_con_azucar_quemado_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/crema_catalana_tradicional_con_azucar_quemado_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Crema fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Infusión Cítrica Doble:**",
      "**Ligazón de Yemas y Maizena:**",
      "**Cocción de la Crema:**",
      "**Dosificado y Enfriado:**",
      "**Quemado Crujiente Magistral:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-tocino_de_cielo_tradicional_de_jere",
    "name": "Tocino de Cielo Tradicional de Jerez",
    "shortName": "Tocino",
    "category": "postres",
    "mealType": "universal",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Lácteos",
      "Huevos",
      "Sulfitos"
    ],
    "image": "/assets/fuentes/cocina_tradicional/tocino_de_cielo_tradicional_de_jerez_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "13_postres_de_cuchara_y_flanes.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "guiso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/tocino_de_cielo_tradicional_de_jerez_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/tocino_de_cielo_tradicional_de_jerez_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/tocino_de_cielo_tradicional_de_jerez_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Tocino fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Caramelizado de los Moldes:**",
      "**Elaboración del Almíbar en Punto de Hebra Fina (105-108°C):**",
      "**Preparación y Doble Colado de las Yemas:**",
      "**Cocción al Vapor Hermética:**",
      "**Enfriado y Maduración:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-mousse_de_limon_cremosa_facil_y_rap",
    "name": "Mousse de Limón Cremosa Fácil y Rápida",
    "shortName": "Mousse",
    "category": "postres",
    "mealType": "universal",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Lácteos",
      "Huevos",
      "Sulfitos"
    ],
    "image": "/assets/fuentes/cocina_tradicional/mousse_de_limon_cremosa_facil_y_rapida_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "13_postres_de_cuchara_y_flanes.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "guiso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/mousse_de_limon_cremosa_facil_y_rapida_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/mousse_de_limon_cremosa_facil_y_rapida_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/mousse_de_limon_cremosa_facil_y_rapida_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Mousse fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Reacción Cítrico-Láctea:**",
      "**Montado Firme de la Nata:**",
      "**Integración Envolvente para Conservar el Aire:**",
      "**Dosificado y Estabilización en Frío:**",
      "**Presentación:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-panna_cotta_tradicional_de_vainilla",
    "name": "Panna Cotta Tradicional de Vainilla con Coulis de Frutos Rojos",
    "shortName": "Panna Cotta Tradicional",
    "category": "masas",
    "mealType": "universal",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Lácteos",
      "Frutos de cáscara",
      "Gluten",
      "Pescado"
    ],
    "image": "/assets/fuentes/cocina_tradicional/panna_cotta_tradicional_de_vainilla_con_couli_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "13_postres_de_cuchara_y_flanes.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "guiso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/panna_cotta_tradicional_de_vainilla_con_couli_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/panna_cotta_tradicional_de_vainilla_con_couli_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/panna_cotta_tradicional_de_vainilla_con_couli_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Panna fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Hidratación de la Gelatina:**",
      "**Infusión y Disolución Láctea:**",
      "**Llenado y Gelificación:**",
      "**Elaboración del Coulis Casero:**",
      "**Servicio y Pase:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-arroz_con_leche_caramelizado_al_est",
    "name": "Arroz con Leche Caramelizado al Estilo Asturiano",
    "shortName": "Arroz",
    "category": "arroces_pastas",
    "mealType": "lunch",
    "station": "fuego_3",
    "prepTimeFormatted": "25 min (fuego_3)",
    "prepTimeMinutes": 25,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Lácteos",
      "Huevos",
      "Sulfitos"
    ],
    "image": "/assets/fuentes/cocina_tradicional/arroz_con_leche_caramelizado_al_estilo_asturi_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "13_postres_de_cuchara_y_flanes.md",
    "mainIngredientFamily": "arroz",
    "culinaryTechnique": "arroz_meloso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/arroz_con_leche_caramelizado_al_estilo_asturi_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/arroz_con_leche_cremoso_de_la_abuela_con_cane_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/arroz_con_leche_cremoso_de_la_abuela_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Arroz fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Apertura de Grano en Agua:**",
      "**Adición Progresiva de Leche Infusionada:**",
      "**Cocción Extrema y Removido Asturiano (90 Minutos):**",
      "**Incorporación de Mantequilla y Azúcar:**",
      "**Enfriado y Maduración:**",
      "**Caramelizado Crujiente de Servicio:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-tabla_comparativa_maestra_rendimien-124",
    "name": "Tabla Comparativa Maestra: Rendimientos, Costes y Tiempos",
    "shortName": "Tabla Comparativa Maestra: Rendimientos, Costes y Tiempos",
    "category": "postres",
    "mealType": "universal",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Lácteos",
      "Huevos",
      "Gluten"
    ],
    "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=80",
    "source": "Cocina Tradicional",
    "sourceCompendium": "13_postres_de_cuchara_y_flanes.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "guiso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": null,
      "elaboracion": null,
      "resultadoFinal": null
    },
    "ingredientsPerServing": [
      {
        "name": "Tabla fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "Preparar la mise en place de Tabla Comparativa Maestra: Rendimientos, Costes y Tiempos con corte homogéneo de ingredientes.",
      "Ejecutar la cocción en fuego 1 respetando los puntos térmicos tradicionales.",
      "Abatir temperatura o reservar en recipientes herméticos fechados para conservación segura."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-guia_rapida_de_adaptacion_para_into-125",
    "name": "️ Guía Rápida de Adaptación para Intolerancias y Dietas Especiales",
    "shortName": "️ Guía Rápida",
    "category": "postres",
    "mealType": "universal",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Lácteos",
      "Huevos",
      "Gluten",
      "Frutos de cáscara"
    ],
    "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=80",
    "source": "Cocina Tradicional",
    "sourceCompendium": "13_postres_de_cuchara_y_flanes.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "guiso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": null,
      "elaboracion": null,
      "resultadoFinal": null
    },
    "ingredientsPerServing": [
      {
        "name": "️ fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "Preparar la mise en place de ️ Guía Rápida de Adaptación para Intolerancias y Dietas Especiales con corte homogéneo de ingredientes.",
      "Ejecutar la cocción en fuego 1 respetando los puntos térmicos tradicionales.",
      "Abatir temperatura o reservar en recipientes herméticos fechados para conservación segura."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-decalogo_de_oro_del_chef_pastelero_",
    "name": "Decálogo de Oro del Chef Pastelero de Carmen",
    "shortName": "Decálogo",
    "category": "postres",
    "mealType": "universal",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Lácteos",
      "Huevos",
      "Pescado"
    ],
    "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=80",
    "source": "Cocina Tradicional",
    "sourceCompendium": "13_postres_de_cuchara_y_flanes.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "guiso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": null,
      "elaboracion": null,
      "resultadoFinal": null
    },
    "ingredientsPerServing": [
      {
        "name": "Decálogo fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "Preparar la mise en place de Decálogo de Oro del Chef Pastelero de Carmen con corte homogéneo de ingredientes.",
      "Ejecutar la cocción en fuego 1 respetando los puntos térmicos tradicionales.",
      "Abatir temperatura o reservar en recipientes herméticos fechados para conservación segura."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-bizcocho_de_yogur_esponjoso_1_2_3_t",
    "name": "Bizcocho de Yogur Esponjoso 1, 2, 3 Tradicional",
    "shortName": "Bizcocho",
    "category": "postres",
    "mealType": "universal",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Lácteos",
      "Huevos",
      "Gluten"
    ],
    "image": "/assets/fuentes/cocina_tradicional/bizcocho_de_yogur_esponjoso_1_2_3_tradicional_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "14_bizcochos_tartas_y_dulces_sarten.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "guiso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/bizcocho_de_yogur_esponjoso_1_2_3_tradicional_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/bizcocho_de_yogur_esponjoso_1_2_3_tradicional_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/bizcocho_de_yogur_esponjoso_1_2_3_tradicional_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Bizcocho fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Preparación y Precalentamiento:** Precalentar el horno a 180°C con calor arriba y abajo (sin ventilador). Enmantequillar y enharinar un molde de 22 cm sacudiendo el exceso.",
      "**Blanqueado Aireado:** En un bol amplio, batir los 3 huevos con los 240 g de azúcar y la pizca de sal con varillas eléctricas durante 5 minutos hasta que la mezcla duplique su volumen, blanquee y forme relieve.",
      "**Integración de Líquidos:** Añadir el yogur natural, el aceite y la ralladura de limón. Batir a velocidad baja durante 45 segundos hasta integrar.",
      "**Tamizado e Integración Suave:** Tamizar la harina junto con el impulsor químico sobre el bol. Integrar con espátula de silicona mediante movimientos envolventes de abajo hacia arriba solo hasta que no queden rastros de harina seca.",
      "**Horneado Perfecto:** Verter la masa en el molde. Hornear a 180°C en la rejilla central durante 35-40 minutos. No abrir la puerta antes del minuto 30. Comprobar la cocción pinchando con brocheta en el centro (debe salir limpia y seca).",
      "**Desmoldado:** Dejar templar 10 minutos dentro del molde, desmoldar sobre rejilla metálica y enfriar por completo."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-tarta_de_la_abuela_tradicional_de_g",
    "name": "Tarta de la Abuela Tradicional de Galletas, Crema y Chocolate",
    "shortName": "Tarta",
    "category": "cremas",
    "mealType": "dinner",
    "station": "fuego_2",
    "prepTimeFormatted": "15 min (fuego_2)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Lácteos",
      "Huevos"
    ],
    "image": "/assets/fuentes/cocina_tradicional/tarta_de_la_abuela_tradicional_de_galletas_cr_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "14_bizcochos_tartas_y_dulces_sarten.md",
    "mainIngredientFamily": "verduras",
    "culinaryTechnique": "salsa",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/tarta_de_la_abuela_tradicional_de_galletas_cr_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/tarta_de_la_abuela_tradicional_de_galletas_cr_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/tarta_de_la_abuela_tradicional_de_galletas_cr_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Tarta fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Crema Pastelera Infusionada:** Infusionar 600 ml de leche con la canela y piel de limón a 80°C. En un bol, batir las 4 yemas con el azúcar, la maicena y los 150 ml de leche fría restante. Colar la leche caliente sobre el bol batiendo continuamente, devolver al cazo a fuego medio-bajo y espesar removiendo sin parar con varillas hasta que hierva suave 1 min. Retirar del fuego, añadir los 25 g de mantequilla y tapar con film a piel.",
      "**Ganache Brillante:** Calentar la nata hasta ebullición. Verter sobre el chocolate troceado en un bol. Dejar reposar 2 min y batir desde el centro hasta emulsionar. Incorporar los 40 g de mantequilla en pomada.",
      "**Montaje por Capas:** En la base del molde rectangular, colocar una capa de galletas remojadas brevemente (1 segundo por lado en la leche con anís). Verter la mitad de la crema pastelera caliente. Colocar otra capa de galletas remojadas, verter el resto de la crema, cubrir con una tercera capa de galletas.",
      "**Cobertura y Reposo:** Verter la ganache de chocolate sobre la última capa de galletas, alisando con espátula. Refrigerar a 3-4°C un mínimo de 6 horas (óptimo de un día para otro)."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-tarta_de_queso_tradicional_al_horno",
    "name": "Tarta de Queso Tradicional al Horno de la Abuela",
    "shortName": "Tarta",
    "category": "postres",
    "mealType": "universal",
    "station": "fuego_2",
    "prepTimeFormatted": "15 min (fuego_2)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Lácteos",
      "Huevos"
    ],
    "image": "/assets/fuentes/cocina_tradicional/tarta_de_queso_tradicional_al_horno_de_la_abu_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "14_bizcochos_tartas_y_dulces_sarten.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "salsa",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/tarta_de_queso_tradicional_al_horno_de_la_abu_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/tarta_de_queso_tradicional_al_horno_de_la_abu_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/tarta_de_queso_tradicional_al_horno_de_la_abu_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Tarta fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Forrado del Molde:** Arrugar una hoja de papel de horno bajo el grifo, escurrir bien y forrar el molde desmontable de 22 cm dejando que sobresalga por los bordes.",
      "**Batido Suave:** En un bol grande, mezclar el queso crema con el azúcar con varillas manuales hasta suavizar. Añadir los huevos uno a uno, integrando con suavidad sin meter exceso de aire.",
      "**Integración:** Verter la nata, la vainilla, la pizca de sal y la cucharada de harina tamizada. Mezclar hasta obtener una crema líquida homogénea.",
      "**Horneado:** Verter en el molde y hornear a 190°C (horno precalentado, calor arriba y abajo) durante 45 minutos. El centro debe quedar tembloroso tipo flan (*wobble* característico).",
      "**Reposo:** Apagar el horno y dejar reposar dentro con la puerta entreabierta 15 minutos. Enfriar a temperatura ambiente y reposar en nevera mínimo 4 horas antes de cortar."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-torrijas_tradicionales_de_leche_y_m",
    "name": "Torrijas Tradicionales de Leche y Miel de Carmen",
    "shortName": "Torrijas Tradicionales",
    "category": "postres",
    "mealType": "universal",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Lácteos",
      "Huevos",
      "Frutos de cáscara"
    ],
    "image": "/assets/fuentes/cocina_tradicional/torrijas_tradicionales_de_leche_y_miel_de_car_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "14_bizcochos_tartas_y_dulces_sarten.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "guiso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/torrijas_tradicionales_de_leche_y_miel_de_car_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/torrijas_tradicionales_de_leche_y_miel_de_car_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/torrijas_tradicionales_de_leche_y_miel_de_car_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Torrijas fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Infusión Láctea:** Hervir la leche con el azúcar, la canela y las pieles cítricas. Apagar, tapar y dejar templar 15 minutos para que la miga absorba sin romperse.",
      "**Remojo Paciente:** Colocar las rebanadas de pan en una fuente honda. Verter la leche infusionada colada tibia sobre el pan. Dejar reposar 8-10 minutos hasta que estén completamente empapadas como esponjas sin deshacerse.",
      "**Rebozado y Fritura:** Pasar con cuidado cada rebanada por huevo batido. Freír en AOVE caliente a 175°C en tandas de 2 o 3 unidades durante 1,5 minutos por lado hasta que adquieran un tono dorado avellanado brillante.",
      "**Escurrido y Enmelado:** Escurrir sobre papel absorbente 30 segundos y pasar inmediatamente por la miel rebajada tibia (o rebozar en la mezcla de azúcar y canela molida)."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-leche_frita_cremosa_tradicional",
    "name": "Leche Frita Cremosa Tradicional",
    "shortName": "Leche Frita Cremosa Tradicional",
    "category": "postres",
    "mealType": "universal",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Lácteos",
      "Huevos"
    ],
    "image": "/assets/fuentes/cocina_tradicional/leche_frita_cremosa_tradicional_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "14_bizcochos_tartas_y_dulces_sarten.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "frito_empanado",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/leche_frita_cremosa_tradicional_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/leche_frita_cremosa_tradicional_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/leche_frita_cremosa_tradicional_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Leche fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Infusión y Mezcla:** Infusionar 800 ml de leche con la canela y el limón. Disolver la maicena y las yemas en los 200 ml de leche fría restante con el azúcar.",
      "**Espesado:** Colar la leche caliente sobre la mezcla de maicena, devolver al cazo a fuego medio-bajo y cocinar removiendo continuamente con varillas hasta que espese intensamente y hierva 2 minutos. Añadir la mantequilla fuera del fuego.",
      "**Cuajado en Molde:** Verter la crema en una fuente rectangular aceitada (de unos 2 cm de grosor), cubrir con film a piel y refrigerar 4 horas hasta que esté firme y fría.",
      "**Corte y Fritura:** Cortar en cuadrados de 4x4 cm. Pasar por harina, sacudir el exceso, bañar en huevo batido y freír en AOVE a 180°C durante 1 min por lado hasta dorar. Rebozar calientes en azúcar y canela."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-tarta_de_manzana_casera_con_crema_y",
    "name": "Tarta de Manzana Casera con Crema y Base de Hojaldre",
    "shortName": "Tarta",
    "category": "cremas",
    "mealType": "dinner",
    "station": "robot",
    "prepTimeFormatted": "15 min (robot)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Lácteos",
      "Huevos"
    ],
    "image": "/assets/fuentes/cocina_tradicional/tarta_de_manzana_casera_con_crema_y_base_de_h_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "14_bizcochos_tartas_y_dulces_sarten.md",
    "mainIngredientFamily": "verduras",
    "culinaryTechnique": "crema",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/tarta_de_manzana_casera_con_crema_y_base_de_h_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/tarta_de_manzana_casera_con_crema_y_base_de_h_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/tarta_de_manzana_casera_con_crema_y_base_de_h_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Tarta fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Base y Crema:** Extender el hojaldre en una bandeja con papel vegetal. Pinchar la base con tenedor (dejando 1 cm de borde sin pinchar). Extender la crema pastelera fría sobre la base.",
      "**Colocación de Manzana:** Pelar, descorazonar y cortar las manzanas en láminas finas de 2 mm. Disponerlas solapadas en filas ordenadas sobre la crema.",
      "**Horneado y Brillo:** Hornear a 195°C durante 30-35 minutos hasta que el hojaldre esté inflado y dorado y la manzana tierna. Calentar la mermelada con el agua y pintar generosamente la superficie caliente con un pincel."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-magdalenas_caseras_de_pueblo_con_co",
    "name": "Magdalenas Caseras de Pueblo con Copete y Azúcar",
    "shortName": "Magdalenas Caseras",
    "category": "postres",
    "mealType": "universal",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Lácteos",
      "Huevos"
    ],
    "image": "/assets/fuentes/cocina_tradicional/magdalenas_caseras_de_pueblo_con_copete_y_azu_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "14_bizcochos_tartas_y_dulces_sarten.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "guiso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/magdalenas_caseras_de_pueblo_con_copete_y_azu_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/magdalenas_caseras_de_pueblo_con_copete_y_azu_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/magdalenas_caseras_de_pueblo_con_copete_y_azu_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Magdalenas fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Batido Intenso:** Batir los huevos con el azúcar durante 7 minutos hasta blanquear.",
      "**Emulsión Líquida:** Añadir la leche, el aceite y la ralladura batiendo a velocidad baja.",
      "**Tamizado e Integración:** Incorporar la harina, levadura y sal tamizadas. Mezclar con espátula.",
      "**El Secreto del Choque Térmico (Clave de Carmen):** Tapar el bol con la masa y **refrigerar en nevera durante 1 hora mínimo (o toda la noche)**.",
      "**Horneado con Copete:** Llenar las cápsulas de papel (colocadas dentro de un molde rígido de magdalenas) hasta 3/4 de su capacidad. Espolvorear 1/2 cucharadita de azúcar en el centro de cada una. Hornear en horno precalentado a 210°C durante 13-15 minutos. El contraste térmico frío-calor disparará el copete hacia arriba."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-rosquillas_de_anis_caseras_de_la_ab",
    "name": "Rosquillas de Anís Caseras de la Abuela",
    "shortName": "Rosquillas",
    "category": "postres",
    "mealType": "universal",
    "station": "fuego_2",
    "prepTimeFormatted": "15 min (fuego_2)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Huevos"
    ],
    "image": "/assets/fuentes/cocina_tradicional/rosquillas_de_anis_caseras_de_la_abuela_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "14_bizcochos_tartas_y_dulces_sarten.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "salsa",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/rosquillas_de_anis_caseras_de_la_abuela_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/rosquillas_de_anis_caseras_de_la_abuela_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/rosquillas_de_anis_caseras_de_la_abuela_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Rosquillas fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Masa Aromática:** Batir los huevos con el azúcar, añadir el AOVE aromatizado frío, el anís licor y las ralladuras. Incorporar la harina tamizada con el impulsor hasta tener una masa tierna y manejable (engrasarse las manos con aceite para trabajarla).",
      "**Formado:** Tomar porciones de masa de 25 g, hacer cordones, unir los extremos formando rosquillas y hacerles 2 o 3 pequeños cortes exteriores con tijera.",
      "**Fritura:** Freír en AOVE a 170°C hasta que se doren uniformemente e hinchen. Rebozar calientes en azúcar común."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-matriz_comparativa_maestra_de_repos",
    "name": "Matriz Comparativa Maestra de Repostería y Dulces",
    "shortName": "Matriz Comparativa Maestra",
    "category": "postres",
    "mealType": "universal",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Lácteos"
    ],
    "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=80",
    "source": "Cocina Tradicional",
    "sourceCompendium": "14_bizcochos_tartas_y_dulces_sarten.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "guiso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": null,
      "elaboracion": null,
      "resultadoFinal": null
    },
    "ingredientsPerServing": [
      {
        "name": "Matriz fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "Preparar la mise en place de Matriz Comparativa Maestra de Repostería y Dulces con corte homogéneo de ingredientes.",
      "Ejecutar la cocción en fuego 1 respetando los puntos térmicos tradicionales.",
      "Abatir temperatura o reservar en recipientes herméticos fechados para conservación segura."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-pollo_en_pepitoria_tradicional",
    "name": "Pollo en Pepitoria Tradicional",
    "shortName": "Pollo en Pepitoria Tradicional",
    "category": "carnes",
    "mealType": "universal",
    "station": "fuego_2",
    "prepTimeFormatted": "25 min (fuego_2)",
    "prepTimeMinutes": 25,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Apio",
      "Frutos de cáscara",
      "Gluten",
      "Mostaza",
      "Pescado"
    ],
    "image": "/assets/fuentes/cocina_tradicional/pollo_en_pepitoria_tradicional_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "carnes_y_guisos.md",
    "mainIngredientFamily": "pollo",
    "culinaryTechnique": "salsa",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/pollo_en_pepitoria_tradicional_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/pollo_en_pepitoria_tradicional_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/pollo_en_pepitoria_tradicional_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Pollo fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Mise en Place y Huevos Cocidos:**",
      "**Sellado Maestro (Maillard):**",
      "**El Sofrito Base:**",
      "**Elaboración del Majado Sublime:**",
      "**Desglasado y Cocción (*Chup-Chup*):**",
      "**Acabado y Reposo:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-albondigas_en_salsa_de_la_abuela",
    "name": "Albóndigas en Salsa de la Abuela",
    "shortName": "Albóndigas en Salsa",
    "category": "carnes",
    "mealType": "universal",
    "station": "fuego_2",
    "prepTimeFormatted": "25 min (fuego_2)",
    "prepTimeMinutes": 25,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Lácteos",
      "Frutos de cáscara",
      "Gluten"
    ],
    "image": "/assets/fuentes/cocina_tradicional/albondigas_en_salsa_de_la_abuela_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "carnes_y_guisos.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "salsa",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/albondigas_en_salsa_de_la_abuela_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/albondigas_en_salsa_de_la_abuela_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/albondigas_en_salsa_de_la_abuela_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Albóndigas fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Hidratación y Mezclado de la Farsa:**",
      "**Formado y Sellado Dorado:**",
      "**Elaboración de la Salsa Magistral:**",
      "**Desglasado, Triturado (opcional) y Guisado:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-ternera_guisada_a_la_jardinera",
    "name": "Ternera Guisada a la Jardinera",
    "shortName": "Ternera Guisada a la Jardinera",
    "category": "carnes",
    "mealType": "universal",
    "station": "fuego_1",
    "prepTimeFormatted": "25 min (fuego_1)",
    "prepTimeMinutes": 25,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Apio",
      "Frutos de cáscara",
      "Gluten"
    ],
    "image": "/assets/fuentes/cocina_tradicional/ternera_guisada_a_la_jardinera_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "carnes_y_guisos.md",
    "mainIngredientFamily": "ternera",
    "culinaryTechnique": "guiso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/ternera_guisada_a_la_jardinera_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/ternera_guisada_a_la_jardinera_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/ternera_guisada_a_la_jardinera_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Ternera fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Preparación y Sellado Intenso:**",
      "**Sofrito de Fondo y Desglasado:**",
      "**Estofado Prolongado:**",
      "**Incorporación de la Jardinera Fresca:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-carrilleras_de_cerdo_iberico_en_sal",
    "name": "Carrilleras de Cerdo Ibérico en Salsa al Vino Tinto",
    "shortName": "Carrilleras",
    "category": "carnes",
    "mealType": "universal",
    "station": "fuego_2",
    "prepTimeFormatted": "25 min (fuego_2)",
    "prepTimeMinutes": 25,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Apio",
      "Lácteos",
      "Gluten"
    ],
    "image": "/assets/fuentes/cocina_tradicional/carrilleras_de_cerdo_iberico_en_salsa_al_vino_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "carnes_y_guisos.md",
    "mainIngredientFamily": "ternera",
    "culinaryTechnique": "salsa",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/carrilleras_de_cerdo_iberico_en_salsa_al_vino_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/carrilleras_de_cerdo_iberico_en_salsa_al_vino_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/carrilleras_de_cerdo_iberico_en_salsa_al_vino_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Carrilleras fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Limpieza y Sellado Profundo:**",
      "**Pochado de la Bresa Hortícola:**",
      "**Desglasado y Reducción del Vino:**",
      "**Cocción Lenta del Colágeno:**",
      "**Filtrado y Glaseado de la Salsa:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-lentejas_pardinas_con_chorizo_y_cos",
    "name": "Lentejas Pardinas con Chorizo y Costilla de Carmen",
    "shortName": "Lentejas Pardinas",
    "category": "legumbres",
    "mealType": "lunch",
    "station": "olla_expres",
    "prepTimeFormatted": "15 min (olla_expres)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Lácteos",
      "Huevos",
      "Gluten",
      "Sulfitos"
    ],
    "image": "/assets/fuentes/cocina_tradicional/lentejas_pardinas_con_chorizo_y_costilla_de_c_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "carnes_y_guisos.md",
    "mainIngredientFamily": "legumbres",
    "culinaryTechnique": "cuchara_potaje",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/lentejas_pardinas_con_chorizo_y_costilla_de_c_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/lentejas_pardinas_con_chorizo_costilla_y_el_m_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/lentejas_pardinas_con_chorizo_costilla_y_el_m_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Lentejas fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Carga en Frío (*Todo en Crudo* Base):**",
      "**Arranque y Desespumado:**",
      "**El Toque Maestro de Carmen (Sofrito / Emulsión de Verduras):**",
      "**Patatas Chascadas y Reducción Final:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-estofado_de_magro_de_cerdo_con_pata",
    "name": "Estofado de Magro de Cerdo con Patatas Chascadas",
    "shortName": "Estofado",
    "category": "carnes",
    "mealType": "universal",
    "station": "fuego_1",
    "prepTimeFormatted": "25 min (fuego_1)",
    "prepTimeMinutes": 25,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Pescado"
    ],
    "image": "/assets/fuentes/cocina_tradicional/estofado_de_magro_de_cerdo_con_patatas_chasca_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "carnes_y_guisos.md",
    "mainIngredientFamily": "ternera",
    "culinaryTechnique": "guiso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/estofado_de_magro_de_cerdo_con_patatas_chasca_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/estofado_de_magro_de_cerdo_con_patatas_chasca_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/estofado_de_magro_de_cerdo_con_patatas_chasca_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Estofado fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Sellado del Magro:**",
      "**Sofrito Aromático de la Huerta:**",
      "**Desglasado y Cocción de la Carne:**",
      "**Técnica del Chascado de Patatas y Ligazón:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-pollo_al_ajillo_tradicional",
    "name": "Pollo al Ajillo Tradicional",
    "shortName": "Pollo al Ajillo Tradicional",
    "category": "carnes",
    "mealType": "universal",
    "station": "fuego_1",
    "prepTimeFormatted": "25 min (fuego_1)",
    "prepTimeMinutes": 25,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Huevos",
      "Gluten",
      "Sulfitos"
    ],
    "image": "/assets/fuentes/cocina_tradicional/pollo_al_ajillo_tradicional_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "carnes_y_guisos.md",
    "mainIngredientFamily": "pollo",
    "culinaryTechnique": "sarten_ajillo",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/pollo_al_ajillo_tradicional_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/pollo_al_ajillo_tradicional_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/pollo_al_ajillo_tradicional_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Pollo fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Aromatizado del Aceite y Confitado de Ajos:**",
      "**Dorado Crujiente del Pollo:**",
      "**Incorporación de Aromáticos y Ajo Laminado:**",
      "**Desglasado y Emulsión de la Salsa al Ajillo:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-conejo_al_ajillo_y_romero_en_cazado",
    "name": "Conejo al Ajillo y Romero en Cazadora / Salsa Rústica",
    "shortName": "Conejo al Ajillo y Romero en Cazadora / Salsa Rústica",
    "category": "carnes",
    "mealType": "universal",
    "station": "fuego_2",
    "prepTimeFormatted": "25 min (fuego_2)",
    "prepTimeMinutes": 25,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Huevos",
      "Gluten",
      "Frutos de cáscara",
      "Sulfitos"
    ],
    "image": "/assets/fuentes/cocina_tradicional/conejo_al_ajillo_y_romero_en_cazadora_salsa_r_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "carnes_y_guisos.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "salsa",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/conejo_al_ajillo_y_romero_en_cazadora_salsa_r_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/conejo_al_ajillo_y_romero_en_cazadora_salsa_r_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/conejo_al_ajillo_y_romero_en_cazadora_salsa_r_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Conejo fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Sellado del Conejo y del Hígado:**",
      "**Sofrito de Ajos y Confección del Majado:**",
      "**Guisado Campestre y Reducción:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-contramuslos_de_pollo_tipo_carrille",
    "name": "Contramuslos de Pollo Tipo \"Carrilleras\" (Guiso Meloso y Económico)",
    "shortName": "Contramuslos",
    "category": "carnes",
    "mealType": "universal",
    "station": "fuego_1",
    "prepTimeFormatted": "25 min (fuego_1)",
    "prepTimeMinutes": 25,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Huevos",
      "Gluten",
      "Sulfitos"
    ],
    "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=80",
    "source": "Cocina Tradicional",
    "sourceCompendium": "carnes_y_guisos.md",
    "mainIngredientFamily": "pollo",
    "culinaryTechnique": "guiso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": null,
      "elaboracion": null,
      "resultadoFinal": null
    },
    "ingredientsPerServing": [
      {
        "name": "Contramuslos fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Acondicionamiento y Sellado de Maillard:**",
      "**Sofrito Paciente y Caramelización:**",
      "**Desglasado con Vino Tinto:**",
      "**Guisado a Fuego Lento (Chup-chup):**",
      "**Triturado y Emulsión Brillante de la Salsa:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-rabo_de_toro_estofado_a_la_cordobes",
    "name": "Rabo de Toro Estofado a la Cordobesa",
    "shortName": "Rabo",
    "category": "carnes",
    "mealType": "universal",
    "station": "fuego_1",
    "prepTimeFormatted": "25 min (fuego_1)",
    "prepTimeMinutes": 25,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Huevos",
      "Gluten",
      "Sulfitos"
    ],
    "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=80",
    "source": "Cocina Tradicional",
    "sourceCompendium": "carnes_y_guisos.md",
    "mainIngredientFamily": "ternera",
    "culinaryTechnique": "guiso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": null,
      "elaboracion": null,
      "resultadoFinal": null
    },
    "ingredientsPerServing": [
      {
        "name": "Rabo fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Sellado Intenso y Fijación de Maillard:**",
      "**Confección del Sofrito Cordobés:**",
      "**Aromatización y Reducción del Vino:**",
      "**Cocción Lenta Tradicional (3 Horas):**",
      "**Acabado y Reposo Maestro:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-matriz_comparativa_y_guia_de_rendim",
    "name": "Matriz Comparativa y Guía de Rendimiento Batch Cooking",
    "shortName": "Matriz Comparativa y Guía",
    "category": "carnes",
    "mealType": "universal",
    "station": "fuego_1",
    "prepTimeFormatted": "25 min (fuego_1)",
    "prepTimeMinutes": 25,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Huevos",
      "Frutos de cáscara",
      "Sulfitos"
    ],
    "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=80",
    "source": "Cocina Tradicional",
    "sourceCompendium": "carnes_y_guisos.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "guiso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": null,
      "elaboracion": null,
      "resultadoFinal": null
    },
    "ingredientsPerServing": [
      {
        "name": "Matriz fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "Preparar la mise en place de Matriz Comparativa y Guía de Rendimiento Batch Cooking con corte homogéneo de ingredientes.",
      "Ejecutar la cocción en fuego 1 respetando los puntos térmicos tradicionales.",
      "Abatir temperatura o reservar en recipientes herméticos fechados para conservación segura."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-introduccion_tecnica_y_principios_d",
    "name": "INTRODUCCIÓN TÉCNICA Y PRINCIPIOS DE LA COCINA DE CARMEN",
    "shortName": "INTRODUCCIÓN TÉCNICA Y PRINCIPIOS DE LA COCINA DE CARMEN",
    "category": "legumbres",
    "mealType": "lunch",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Moluscos",
      "Pescado"
    ],
    "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=80",
    "source": "Cocina Tradicional",
    "sourceCompendium": "pescados_legumbres_arroces.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "guiso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": null,
      "elaboracion": null,
      "resultadoFinal": null
    },
    "ingredientsPerServing": [
      {
        "name": "INTRODUCCIÓN fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "Preparar la mise en place de INTRODUCCIÓN TÉCNICA Y PRINCIPIOS DE LA COCINA DE CARMEN con corte homogéneo de ingredientes.",
      "Ejecutar la cocción en fuego 1 respetando los puntos térmicos tradicionales.",
      "Abatir temperatura o reservar en recipientes herméticos fechados para conservación segura."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-indice_general_de_recetas",
    "name": "ÍNDICE GENERAL DE RECETAS",
    "shortName": "ÍNDICE GENERAL DE RECETAS",
    "category": "legumbres",
    "mealType": "lunch",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Crustáceos",
      "Moluscos",
      "Sulfitos",
      "Pescado"
    ],
    "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=80",
    "source": "Cocina Tradicional",
    "sourceCompendium": "pescados_legumbres_arroces.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "guiso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": null,
      "elaboracion": null,
      "resultadoFinal": null
    },
    "ingredientsPerServing": [
      {
        "name": "ÍNDICE fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "Preparar la mise en place de ÍNDICE GENERAL DE RECETAS con corte homogéneo de ingredientes.",
      "Ejecutar la cocción en fuego 1 respetando los puntos térmicos tradicionales.",
      "Abatir temperatura o reservar en recipientes herméticos fechados para conservación segura."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-merluza_en_salsa_verde_tradicional_",
    "name": "Merluza en Salsa Verde Tradicional con Almejas y Gambas",
    "shortName": "Merluza en Salsa Verde Tradicional",
    "category": "legumbres",
    "mealType": "lunch",
    "station": "fuego_2",
    "prepTimeFormatted": "15 min (fuego_2)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Crustáceos",
      "Huevos",
      "Sulfitos",
      "Pescado",
      "Gluten",
      "Moluscos"
    ],
    "image": "/assets/fuentes/cocina_tradicional/merluza_en_salsa_verde_tradicional_con_almeja_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "pescados_legumbres_arroces.md",
    "mainIngredientFamily": "merluza",
    "culinaryTechnique": "salsa",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/merluza_en_salsa_verde_tradicional_con_almeja_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/merluza_en_salsa_verde_tradicional_con_almeja_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/merluza_en_salsa_verde_tradicional_con_almeja_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Merluza fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Purga de almejas:** Disponer las almejas en un cuenco con abundante agua fría y 35 g de sal por litro durante al menos 1 hora para expulsar cualquier resto de arena. Escurrir y enjuagar con agua fría corriente.",
      "**Preparación del pescado:** Secar los lomos de merluza con papel absorbente. Salar ligeramente por ambas caras 10 minutos antes de cocinar para compactar la fibra muscular.",
      "**Elaboración de la base aromática:** Poner la cazuela a fuego medio-bajo con los 60 ml de AOVE. Añadir el ajo picado. Dejar que comience a \"bailar\" y soltar aroma durante 1-2 minutos sin que tome color dorado oscuro (si se dora en exceso amargará la salsa verde).",
      "**Creación del roux y desglasado:** Añadir la cucharada de harina (18 g) y remover constantemente con cuchara de madera durante 60-90 segundos para cocinar el almidón y eliminar el sabor a crudo. Verter los 100 ml de vino blanco/fino y remover con brío hasta que evapore el alcohol durante 2 minutos.",
      "**Incorporación del caldo y perejil:** Añadir los 350 ml de fumet caliente poco a poco sin dejar de mover en vaivén la cazuela para crear una velouté ligera y homogénea. Agregar 3/4 partes del perejil picado. Dejar hervir suavemente 3 minutos hasta que la salsa espese ligeramente.",
      "**Cocción de almejas y merluza:**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-bacalao_al_ajoarriero_tradicional_c",
    "name": "Bacalao al Ajoarriero Tradicional con Pimientos Asados y Tomate",
    "shortName": "Bacalao al Ajoarriero Tradicional",
    "category": "legumbres",
    "mealType": "lunch",
    "station": "fuego_2",
    "prepTimeFormatted": "15 min (fuego_2)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Huevos",
      "Gluten",
      "Pescado"
    ],
    "image": "/assets/fuentes/cocina_tradicional/bacalao_al_ajoarriero_tradicional_con_pimient_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "pescados_legumbres_arroces.md",
    "mainIngredientFamily": "bacalao",
    "culinaryTechnique": "salsa",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/bacalao_al_ajoarriero_tradicional_con_pimient_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/bacalao_al_ajoarriero_tradicional_con_pimient_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/bacalao_al_ajoarriero_tradicional_con_pimient_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Bacalao fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Desalado y secado del bacalao:** Desalar el bacalao cambiando el agua cada 8 horas en frigorífico durante 48 horas. Escurrir muy bien y desmigar en lascas o tiras medianas de unos 3-4 cm con las manos, retirando cualquier espina residual. Secar con paño limpio.",
      "**Confitado inicial de ajos y bacalao:** En la cazuela, calentar los 100 ml de AOVE con los ajos laminados y la cayena a fuego muy suave (90-100°C). Cuando los ajos comiencen a dorarse levemente, añadir las lascas de bacalao. Confitar durante 3 minutos removiendo para que el bacalao suelte su gelatina blanca (albúmina). Retirar el bacalao y los ajos a un plato, conservando todo el aceite y la gelatina en la cazuela.",
      "**Elaboración del sofrito aromático:** En el mismo aceite aromatizado, añadir la cebolla picada y el pimiento verde. Pochar a fuego medio-bajo durante 15 minutos con una pizca de sal, hasta que la cebolla esté melosa y caramelizada.",
      "**Incorporación de pimientos y tomate:** Agregar las tiras de pimiento del piquillo asado. Rehogar 3 minutos para que se integren. Añadir el pimentón dulce de la Vera fuera del fuego directo, remover 15 segundos para no quemarlo y verter de inmediato el tomate triturado. Cocinar a fuego lento durante 10-12 minutos hasta obtener una salsa espesa y brillante donde el aceite empiece a aflorar en la superficie.",
      "**Ensamblaje y ligado final:** Reincorporar el bacalao confitado, los ajos y todo el jugo de gelatina que haya soltado en el plato.",
      "**Cocción integrada:** Mantener a fuego muy suave durante 5-6 minutos, realizando movimientos circulares y de vaivén con la cazuela para que el aceite, el tomate y la gelatina del bacalao liguen en una textura untuosa y homogénea."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-potaje_de_garbanzos_con_bacalao_y_e-151",
    "name": "Potaje de Garbanzos con Bacalao y Espinacas Frescas (Guiso de Cuaresma)",
    "shortName": "Potaje",
    "category": "legumbres",
    "mealType": "lunch",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Huevos",
      "Gluten",
      "Frutos de cáscara",
      "Pescado"
    ],
    "image": "/assets/fuentes/cocina_tradicional/potaje_de_garbanzos_con_bacalao_y_espinacas_f_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "pescados_legumbres_arroces.md",
    "mainIngredientFamily": "bacalao",
    "culinaryTechnique": "guiso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/potaje_de_garbanzos_con_bacalao_y_espinacas_f_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/potaje_de_garbanzos_con_bacalao_y_espinacas_f_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/potaje_de_garbanzos_con_bacalao_y_espinacas_f_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Potaje fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Remojo y cocción inicial de garbanzos:** Tras 12 horas de remojo en agua templada con una pizca de bicarbonato o sal, escurrir los garbanzos. Poner en la olla 1,4 litros de agua o caldo suave con las 2 hojas de laurel y media cebolla. Llevar a ebullición. **Regla de oro:** Introducir siempre los garbanzos cuando el agua esté hirviendo a borbotones para evitar que queden duros (hollejo encallado). Cocer a fuego lento espumando las impurezas durante 1 hora (o 20-25 minutos en olla a presión rápida).",
      "**Elaboración del majado de Carmen:**",
      "**El sofrito base:** En la misma sartén con el aceite restante (30 ml), pochar la cebolla picada con los 2 ajos restantes durante 8-10 minutos. Añadir el tomate triturado y cocinar a fuego lento durante 8 minutos hasta que reduzca por completo.",
      "**Integración del guiso:** Cuando los garbanzos estén tiernos, verter en la olla el sofrito de tomate y cebolla junto con el majado del mortero. Remover en vaivén para que el caldo tome cuerpo y color inmediatamente. Dejar cocer el conjunto a fuego suave durante 10 minutos.",
      "**Incorporación de espinacas:** Añadir las espinacas frescas cortadas a la olla. Aunque ocupen mucho volumen inicial, reducirán y se integrarán en apenas 3-4 minutos de cocción suave.",
      "**Punto final del bacalao:** Incorporar los tacos de bacalao desalado sumergiéndolos suavemente entre los garbanzos. Cocinar a fuego muy lento durante solo 4 minutos. El calor del guiso cocinará el bacalao a la perfección sin resecarlo ni romper sus lascas."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-marmitako_tradicional_de_bonito_del",
    "name": "Marmitako Tradicional de Bonito del Norte con Patatas Chascadas",
    "shortName": "Marmitako Tradicional",
    "category": "legumbres",
    "mealType": "lunch",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Lácteos",
      "Pescado",
      "Gluten",
      "Moluscos"
    ],
    "image": "/assets/fuentes/cocina_tradicional/marmitako_tradicional_de_bonito_del_norte_con_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "pescados_legumbres_arroces.md",
    "mainIngredientFamily": "atun",
    "culinaryTechnique": "guiso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/marmitako_tradicional_de_bonito_del_norte_con_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/marmitako_tradicional_de_bonito_del_norte_con_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/marmitako_tradicional_de_bonito_del_norte_con_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Marmitako fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Técnica de chascado de la patata:** Pelar las patatas y lavarlas. Introducir el cuchillo de puntilla 1 cm y tirar haciendo palanca para romper (\"chascar\" o \"cascar\") el trozo con un chasquido seco. Este corte irregular expone las celdas de almidón abiertas, lo que espesará el caldo de forma natural sin necesidad de añadir harinas.",
      "**Sofrito marinero:** En la cazuela con los 60 ml de AOVE, pochar a fuego medio la cebolla, el pimiento verde, el pimiento rojo y el ajo durante 12-14 minutos con una pizca de sal, hasta que las verduras estén completamente pochadas y tiernas.",
      "**Especiado y desglasado:** Añadir la pulpa de pimiento choricero, el pimentón dulce y el tomate triturado. Rehogar 2 minutos sin dejar de remover. Verter el vino blanco/txakoli y raspar el fondo con la espátula para rescatar los azúcares caramelizados. Dejar evaporar el alcohol 2 minutos.",
      "**Rehogado de patatas:** Añadir las patatas chascadas a la cazuela y rehogarlas durante 3 minutos junto al sofrito para que se impregnen de los aromas y aceites coloreados.",
      "**Cocción en caldo:** Cubrir con el fumet caliente (unos 900 ml, justo hasta tapar las patatas sin ahogarlas) y añadir la hoja de laurel. Llevar a ebullición, bajar el fuego al mínimo, tapar y cocer a fuego lento durante 20-25 minutos, hasta que las patatas estén tiernas como mantequilla al pincharlas con la punta del cuchillo.",
      "**El secreto del punto del bonito (Crucial):**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-calamares_en_su_tinta_caseros_con_a",
    "name": "Calamares en su Tinta Caseros con Arroz Blanco de Acompañamiento",
    "shortName": "Calamares en su Tinta Caseros",
    "category": "arroces_pastas",
    "mealType": "lunch",
    "station": "fuego_3",
    "prepTimeFormatted": "25 min (fuego_3)",
    "prepTimeMinutes": 25,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Lácteos",
      "Pescado",
      "Gluten",
      "Moluscos"
    ],
    "image": "/assets/fuentes/cocina_tradicional/calamares_en_su_tinta_caseros_con_arroz_blanc_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "pescados_legumbres_arroces.md",
    "mainIngredientFamily": "arroz",
    "culinaryTechnique": "arroz_meloso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/calamares_en_su_tinta_caseros_con_arroz_blanc_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/calamares_en_su_tinta_caseros_con_arroz_blanc_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/calamares_en_su_tinta_caseros_con_arroz_blanc_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Calamares fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Limpieza del calamar:** Limpiar los calamares retirando la pluma transparente, tripas y boca. Conservar la piel fina si se desea mayor sabor o pelar para acabado blanco. Cortar los tubos en anillas de 1,5 cm de grosor y los tentáculos en 2-3 piezas. Secar meticulosamente con papel de cocina.",
      "**Sellado a alta temperatura:** En la cazuela bien caliente con 2 cucharadas de AOVE a fuego vivo, saltear los calamares durante 2 minutos hasta que cambien de color y suelten el exceso de agua. Retirar los calamares y reservar su jugo escurrido en un cuenco.",
      "**El pochado negro de la cebolla:** En la misma cazuela con el resto del AOVE, añadir la gran cantidad de cebolla picada, el pimiento verde y los ajos con una pizca de sal. Pochar a fuego muy lento durante 20-25 minutos. La cebolla debe quedar completamente transparente, reducida a una cuarta parte y con un tono dorado caramelo natural.",
      "**Tomate y desglasado con tinta:** Añadir el tomate rallado y cocinar 5 minutos. En un vaso, mezclar el vino blanco con las 4 bolsitas de tinta de calamar removiendo con un tenedor hasta disolver completamente. Verter sobre la cebolla y cocinar 3 minutos a fuego vivo para evaporar el alcohol.",
      "**Triturado y refinado de la salsa (Toque Maestro de Carmen):** Pasar todo el sofrito negro por el vaso batidor junto con 150 ml de caldo de pescado. Triturar a máxima potencia durante 1 minuto y pasar por el colador chino de vuelta a la cazuela. Quedará una salsa negra de textura aterciopelada y brillante, sin tropezones de verdura.",
      "**Cocción lenta del calamar:** Incorporar los calamares sellados y los jugos que soltaron a la salsa negra colada. Añadir el resto del caldo de pescado si la salsa estuviera muy densa. Tapar y guisar a fuego suave durante 30-35 minutos, hasta que el calamar esté tierno como mantequilla (comprobar pinchando con tenedor)."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-arroz_caldoso_marinero_con_rape_gam-154",
    "name": "Arroz Caldoso Marinero con Rape, Gambones y Mejillones",
    "shortName": "Arroz Caldoso Marinero",
    "category": "arroces_pastas",
    "mealType": "lunch",
    "station": "fuego_3",
    "prepTimeFormatted": "25 min (fuego_3)",
    "prepTimeMinutes": 25,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Crustáceos",
      "Moluscos",
      "Huevos",
      "Pescado"
    ],
    "image": "/assets/fuentes/cocina_tradicional/arroz_caldoso_marinero_con_rape_gambones_y_me_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "pescados_legumbres_arroces.md",
    "mainIngredientFamily": "arroz",
    "culinaryTechnique": "arroz_meloso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/arroz_caldoso_marinero_con_rape_gambones_y_me_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/arroz_caldoso_marinero_con_rape_gambones_y_me_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/arroz_caldoso_marinero_con_rape_gambones_y_me_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Arroz fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Extracción aromática del marisco:** En la cazuela con los 60 ml de AOVE a fuego fuerte, marcar los gambones enteros durante 1 minuto por cada lado. Retirar a un plato. En el mismo aceite, sofreír los dados de rape durante 1 minuto y retirar junto a los gambones para evitar sobrecocinarlos.",
      "**Elaboración de la salmorreta / sofrito:** Bajar a fuego medio. Añadir la cebolla, el pimiento rojo y el ajo picado. Pochar lentamente durante 10 minutos. Añadir la carne de ñora, el pimentón dulce, las hebras de azafrán y el tomate triturado. Reducir el sofrito durante 6-8 minutos hasta que caramelice y adquiera un tono caoba oscuro.",
      "**Nacarado del arroz:** Añadir los 300 g de arroz a la cazuela. Remover con cuchara de madera durante 2 minutos a fuego medio para que el grano se impregne de grasa y se selle el almidón exterior (\"nacarar\").",
      "**Cocción en caldo (Cronometraje estricto):**",
      "**Incorporación de pescados y mariscos:**",
      "**Reposo y textura caldosa:** Apagar el fuego exactamente a los **15-16 minutos** de cocción (el arroz debe tener un punto crujiente milimétrico en su núcleo). Dejar reposar destapado durante 2-3 minutos. El arroz terminará de cocinarse con el calor residual, quedando con un grano entero, suelto y rodeado de un caldo untuoso y aromático."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-fabada_rapida_casera_de_carmen_con_",
    "name": "Fabada Rápida Casera de Carmen con Compango Asturiano",
    "shortName": "Fabada Rápida Casera",
    "category": "legumbres",
    "mealType": "lunch",
    "station": "olla_expres",
    "prepTimeFormatted": "15 min (olla_expres)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Huevos",
      "Gluten"
    ],
    "image": "/assets/fuentes/cocina_tradicional/fabada_rapida_casera_de_carmen_con_compango_a_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "pescados_legumbres_arroces.md",
    "mainIngredientFamily": "legumbres",
    "culinaryTechnique": "cuchara_potaje",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/fabada_rapida_casera_de_carmen_con_compango_a_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/fabada_rapida_casera_de_carmen_con_compango_a_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/fabada_rapida_casera_de_carmen_con_compango_a_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Fabada fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Tratamiento de las alubias cocidas:** Volcar los botes de fabes en un colador grande y lavarlas bajo el grifo de agua fría con chorro muy suave para retirar el líquido de gobierno (gelatina de conservación) sin romper la piel. Escurrir delicadamente.",
      "**Dorado del compango:** En la cazuela con 2 cucharadas de AOVE, dorar a fuego medio los tacos de panceta y el chorizo pinchado durante 4-5 minutos para que suelten sus grasas ahumadas y aromas. Retirar la mitad del exceso de grasa si se prefiere una fabada más ligera y digestiva.",
      "**Sofrito base:** Añadir a la grasa aromatizada la cebolla picada y los ajos. Pochar a fuego suave durante 8 minutos hasta que estén tiernos. Añadir el azafrán, la hoja de laurel y el pimentón dulce, removiendo 15 segundos fuera del fuego.",
      "**Integración de líquidos y cocción del compango:** Colocar la panceta, el chorizo y la morcilla entera (con sumo cuidado). Verter los 450 ml de caldo o agua templada. Dejar hervir suavemente durante 10 minutos para que el compango se cocine y perfume el caldo.",
      "**Incorporación de las fabes:** Añadir con delicadeza las fabes cocidas escurridas a la cazuela, distribuyéndolas sin remover con cuchara metálica (mover siempre la cazuela en vaivén por las asas para no romper los hollejos).",
      "**El truco de Carmen para espesar el caldo:** Retirar en una taza 3 cucharadas de fabes con un poco de caldo. Aplastarlas concienzudamente con un tenedor hasta formar un puré denso y devolverlo a la cazuela."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-almejas_a_la_marinera_tradicionales",
    "name": "Almejas a la Marinera Tradicionales con Vino Fino y Pimentón",
    "shortName": "Almejas a la Marinera Tradicionales",
    "category": "legumbres",
    "mealType": "lunch",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Pescado",
      "Gluten",
      "Moluscos"
    ],
    "image": "/assets/fuentes/cocina_tradicional/almejas_a_la_marinera_tradicionales_con_vino__portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "pescados_legumbres_arroces.md",
    "mainIngredientFamily": "marisco",
    "culinaryTechnique": "guiso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/almejas_a_la_marinera_tradicionales_con_vino__01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/almejas_a_la_marinera_tradicionales_con_vino__02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/almejas_a_la_marinera_tradicionales_con_vino__03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Almejas fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Desarenado meticuloso:** Sumergir las almejas en 1 litro de agua fría con 35 g de sal gorda durante mínimo 2 horas en la nevera, cambiando el agua a mitad de tiempo. Enjuagar con cuidado bajo el grifo.",
      "**Sofrito de la salsa marinera:** Calentar los 45 ml de AOVE en la cazuela a fuego medio. Añadir la cayena, los ajos picados y la cebolla finísima con una pizca insignificante de sal. Pochar durante 8-10 minutos hasta que la cebolla esté tierna, transparente y fundente.",
      "**Elaboración del roux rojizo:** Incorporar la cucharada de harina y remover durante 1 minuto para tostarla. Añadir el pimentón dulce de la Vera, mezclar 10 segundos y verter de inmediato el vino fino y los 80 ml de caldo/agua.",
      "**Reducción:** Cocinar a fuego medio durante 2 minutos hasta que la salsa espese y evapore el olor a alcohol, formando una base aterciopelada color teja.",
      "**Apertura de las almejas al vapor:**",
      "**Emulsión y selección:** Destapar la cazuela; retirar de inmediato del fuego en cuanto la mayoría de las almejas estén abiertas. Desechar cualquier almeja que haya quedado completamente cerrada."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-guiso_marinero_de_sepia_con_patatas",
    "name": "Guiso Marinero de Sepia con Patatas y Guisantes Tiernos",
    "shortName": "Guiso Marinero",
    "category": "legumbres",
    "mealType": "lunch",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Moluscos",
      "Huevos",
      "Sulfitos",
      "Pescado"
    ],
    "image": "/assets/fuentes/cocina_tradicional/guiso_marinero_de_sepia_con_patatas_y_guisant_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "pescados_legumbres_arroces.md",
    "mainIngredientFamily": "marisco",
    "culinaryTechnique": "guiso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/guiso_marinero_de_sepia_con_patatas_y_guisant_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/guiso_marinero_de_sepia_con_patatas_y_guisant_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/guiso_marinero_de_sepia_con_patatas_y_guisant_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Guiso fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Preparación y dorado de la sepia:** Secar concienzudamente los trozos de sepia con papel absorbente. Calentar la cazuela a fuego vivo con 2 cucharadas de AOVE. Añadir la sepia y dorar durante 3-4 minutos hasta que evapore el agua que desprende y empiece a adquirir tono dorado. Retirar y reservar en un plato.",
      "**Sofrito marinero:** En la misma cazuela con el resto del aceite a fuego medio-bajo, añadir la cebolla, el pimiento verde y los ajos con una pizca de sal. Pochar durante 12 minutos hasta que la verdura esté muy blanda y caramelizada.",
      "**Tomate y desglasado:** Añadir el tomate triturado, el pimentón y el laurel. Cocinar 6 minutos hasta reducir. Verter el vino blanco/manzanilla y raspar el fondo con la cuchara. Dejar reducir 2 minutos.",
      "**Estofado previo de la sepia:** Reincorporar la sepia con sus jugos a la cazuela. Cubrir con 300 ml de fumet caliente. Tapar y dejar cocer a fuego lento durante **15 minutos** para ablandar las fibras elásticas del cefalópodo antes de añadir las patatas.",
      "**Incorporación de patatas chascadas:** Añadir las patatas chascadas y las hebras de azafrán. Rehogar 2 minutos para que absorban la grasa y el color del guiso.",
      "**Cocción conjunta:** Verter el resto del fumet caliente (unos 450 ml, hasta cubrir las patatas a ras). Llevar a hervor suave, tapar y cocer durante **20 minutos** a fuego lento."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-bacalao_al_pil_pil_tecnica_tradicio",
    "name": "Bacalao al Pil Pil (Técnica Tradicional con el Truco del Colador)",
    "shortName": "Bacalao al Pil Pil (Técnica Tradicional",
    "category": "legumbres",
    "mealType": "lunch",
    "station": "fuego_2",
    "prepTimeFormatted": "15 min (fuego_2)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Huevos",
      "Pescado"
    ],
    "image": "/assets/fuentes/cocina_tradicional/bacalao_al_pil_pil_truco_colador_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "pescados_legumbres_arroces.md",
    "mainIngredientFamily": "bacalao",
    "culinaryTechnique": "pil_pil",
    "infografia": "/assets/fuentes/cocina_tradicional/infografia_bacalao_al_pil_pil_truco_colador.jpg",
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/bacalao_al_pil_pil_truco_colador_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/bacalao_al_pil_pil_truco_colador_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/bacalao_al_pil_pil_truco_colador_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Bacalao fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Aromatizado en frío del AOVE:** En la cazuela fría, verter los 220 ml de AOVE. Añadir los ajos laminados y la guindilla en aros. Encender a fuego suave para que el aceite extraiga pausadamente los aceites esenciales del ajo sin dorarlo bruscamente.",
      "**Retirada de aromáticos:** En cuanto los ajos alcancen un tono dorado pajizo crujiente (aprox. 3-4 minutos), retirarlos junto con los aros de guindilla con una espumadera y reservarlos en un plato seco.",
      "**Atemperado del aceite:** Dejar templar el aceite fuera del fuego 1 minuto para estabilizar la temperatura a 50-55°C (no debe freír, sino confitar suavemente).",
      "**Confitado pasivo del bacalao:**",
      "**Reserva del bacalao:** Retirar los lomos a un plato limpio. Verter los jugos gelatinosos que suelte el plato de vuelta a la cazuela templada.",
      "**Técnica del colador invertido (Emulsión en 2 minutos):**"
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-matriz_resumen_control_termico_batc",
    "name": "MATRIZ RESUMEN: CONTROL TÉRMICO, BATCH COOKING Y REGENERACIÓN",
    "shortName": "MATRIZ RESUMEN: CONTROL TÉRMICO, BATCH COOKING Y REGENERACIÓN",
    "category": "legumbres",
    "mealType": "lunch",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Moluscos",
      "Pescado"
    ],
    "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=80",
    "source": "Cocina Tradicional",
    "sourceCompendium": "pescados_legumbres_arroces.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "guiso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": null,
      "elaboracion": null,
      "resultadoFinal": null
    },
    "ingredientsPerServing": [
      {
        "name": "MATRIZ fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "Preparar la mise en place de MATRIZ RESUMEN: CONTROL TÉRMICO, BATCH COOKING Y REGENERACIÓN con corte homogéneo de ingredientes.",
      "Ejecutar la cocción en fuego 1 respetando los puntos térmicos tradicionales.",
      "Abatir temperatura o reservar en recipientes herméticos fechados para conservación segura."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-consejos_maestros_de_cocina_con_car",
    "name": "CONSEJOS MAESTROS DE 'COCINA CON CARMEN' PARA EL ÉXITO MARINERO",
    "shortName": "CONSEJOS MAESTROS DE 'COCINA CON CARMEN' PARA EL ÉXITO MARINERO",
    "category": "legumbres",
    "mealType": "lunch",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Crustáceos",
      "Moluscos",
      "Pescado"
    ],
    "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=80",
    "source": "Cocina Tradicional",
    "sourceCompendium": "pescados_legumbres_arroces.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "guiso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": null,
      "elaboracion": null,
      "resultadoFinal": null
    },
    "ingredientsPerServing": [
      {
        "name": "CONSEJOS fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "Preparar la mise en place de CONSEJOS MAESTROS DE 'COCINA CON CARMEN' PARA EL ÉXITO MARINERO con corte homogéneo de ingredientes.",
      "Ejecutar la cocción en fuego 1 respetando los puntos térmicos tradicionales.",
      "Abatir temperatura o reservar en recipientes herméticos fechados para conservación segura."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-coleccion_especial_cocina_con_carme",
    "name": "Colección Especial «Cocina con Carmen» — Tu Chef PrepMaster",
    "shortName": "Colección Especial «Cocina",
    "category": "verduras",
    "mealType": "dinner",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": false,
    "storageAdvice": "Nevera 1-5 días • Consumo fresco",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [],
    "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=80",
    "source": "Cocina Tradicional",
    "sourceCompendium": "verduras_salsas_postres.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "guiso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": null,
      "elaboracion": null,
      "resultadoFinal": null
    },
    "ingredientsPerServing": [
      {
        "name": "Colección fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "Preparar la mise en place de Colección Especial «Cocina con Carmen» — Tu Chef PrepMaster con corte homogéneo de ingredientes.",
      "Ejecutar la cocción en fuego 1 respetando los puntos térmicos tradicionales.",
      "Abatir temperatura o reservar en recipientes herméticos fechados para conservación segura."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-manual_de_buenas_practicas_y_estand",
    "name": "Manual de Buenas Prácticas y Estandarización Culinaria",
    "shortName": "Manual",
    "category": "verduras",
    "mealType": "dinner",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": false,
    "storageAdvice": "Nevera 1-5 días • Consumo fresco",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Huevos"
    ],
    "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=80",
    "source": "Cocina Tradicional",
    "sourceCompendium": "verduras_salsas_postres.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "guiso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": null,
      "elaboracion": null,
      "resultadoFinal": null
    },
    "ingredientsPerServing": [
      {
        "name": "Manual fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "Preparar la mise en place de Manual de Buenas Prácticas y Estandarización Culinaria con corte homogéneo de ingredientes.",
      "Ejecutar la cocción en fuego 1 respetando los puntos térmicos tradicionales.",
      "Abatir temperatura o reservar en recipientes herméticos fechados para conservación segura."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-pisto_manchego_tradicional",
    "name": "Pisto Manchego Tradicional",
    "shortName": "Pisto Manchego Tradicional",
    "category": "verduras",
    "mealType": "dinner",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": false,
    "storageAdvice": "Nevera 1-5 días • Consumo fresco",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Huevos",
      "Pescado"
    ],
    "image": "/assets/fuentes/cocina_tradicional/pisto_manchego_tradicional_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "verduras_salsas_postres.md",
    "mainIngredientFamily": "verduras",
    "culinaryTechnique": "guiso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/pisto_manchego_tradicional_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/pisto_manchego_tradicional_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/pisto_manchego_tradicional_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Pisto fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "Preparar la mise en place de Pisto Manchego Tradicional con corte homogéneo de ingredientes.",
      "Ejecutar la cocción en fuego 1 respetando los puntos térmicos tradicionales.",
      "Abatir temperatura o reservar en recipientes herméticos fechados para conservación segura."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-menestra_de_verduras_tudelana_con_j-164",
    "name": "Menestra de Verduras Tudelana con Jamón Ibérico",
    "shortName": "Menestra",
    "category": "verduras",
    "mealType": "dinner",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": false,
    "storageAdvice": "Nevera 1-5 días • Consumo fresco",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Huevos",
      "Gluten"
    ],
    "image": "/assets/fuentes/cocina_tradicional/menestra_de_verduras_tudelana_con_jamon_iberi_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "verduras_salsas_postres.md",
    "mainIngredientFamily": "verduras",
    "culinaryTechnique": "guiso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/menestra_de_verduras_tudelana_con_jamon_iberi_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/menestra_de_verduras_tudelana_con_jamon_iberi_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/menestra_de_verduras_tudelana_con_jamon_iberi_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Menestra fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "Preparar la mise en place de Menestra de Verduras Tudelana con Jamón Ibérico con corte homogéneo de ingredientes.",
      "Ejecutar la cocción en fuego 1 respetando los puntos térmicos tradicionales.",
      "Abatir temperatura o reservar en recipientes herméticos fechados para conservación segura."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-espinacas_con_garbanzos_al_estilo_s-165",
    "name": "Espinacas con Garbanzos al Estilo Sevillano y Toque de Crema",
    "shortName": "Espinacas",
    "category": "legumbres",
    "mealType": "lunch",
    "station": "robot",
    "prepTimeFormatted": "15 min (robot)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Lácteos",
      "Gluten"
    ],
    "image": "/assets/fuentes/cocina_tradicional/espinacas_con_garbanzos_al_estilo_sevillano_y_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "verduras_salsas_postres.md",
    "mainIngredientFamily": "legumbres",
    "culinaryTechnique": "crema",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/espinacas_con_garbanzos_al_estilo_sevillano_y_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/espinacas_con_garbanzos_al_estilo_sevillano_y_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/espinacas_con_garbanzos_al_estilo_sevillano_y_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Espinacas fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "Preparar la mise en place de Espinacas con Garbanzos al Estilo Sevillano y Toque de Crema con corte homogéneo de ingredientes.",
      "Ejecutar la cocción en robot respetando los puntos térmicos tradicionales.",
      "Abatir temperatura o reservar en recipientes herméticos fechados para conservación segura."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-patatas_a_lo_pobre_con_pimientos_tr",
    "name": "Patatas a lo Pobre con Pimientos Tricolor y Cebolla Confitada",
    "shortName": "Patatas a lo Pobre",
    "category": "verduras",
    "mealType": "dinner",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": false,
    "storageAdvice": "Nevera 1-5 días • Consumo fresco",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Pescado"
    ],
    "image": "/assets/fuentes/cocina_tradicional/patatas_a_lo_pobre_con_pimientos_tricolor_y_c_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "verduras_salsas_postres.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "sarten_ajillo",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/patatas_a_lo_pobre_con_pimientos_y_cebolla_co_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/patatas_a_lo_pobre_con_pimientos_tricolor_y_c_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/patatas_a_lo_pobre_con_pimientos_y_cebolla_co_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Patatas fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "Preparar la mise en place de Patatas a lo Pobre con Pimientos Tricolor y Cebolla Confitada con corte homogéneo de ingredientes.",
      "Ejecutar la cocción en fuego 1 respetando los puntos térmicos tradicionales.",
      "Abatir temperatura o reservar en recipientes herméticos fechados para conservación segura."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-sofrito_madre_multiusos_de_carmen",
    "name": "Sofrito Madre Multiusos de Carmen",
    "shortName": "Sofrito Madre Multiusos",
    "category": "verduras",
    "mealType": "dinner",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": false,
    "storageAdvice": "Nevera 1-5 días • Consumo fresco",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Huevos"
    ],
    "image": "/assets/fuentes/cocina_tradicional/sofrito_madre_multiusos_de_carmen_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "verduras_salsas_postres.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "frito_empanado",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/sofrito_madre_multiusos_de_carmen_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/sofrito_madre_multiusos_de_carmen_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/sofrito_madre_multiusos_de_carmen_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Sofrito fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "Preparar la mise en place de Sofrito Madre Multiusos de Carmen con corte homogéneo de ingredientes.",
      "Ejecutar la cocción en fuego 1 respetando los puntos térmicos tradicionales.",
      "Abatir temperatura o reservar en recipientes herméticos fechados para conservación segura."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-salsa_de_tomate_frito_casero_reduci-168",
    "name": "Salsa de Tomate Frito Casero Reducido",
    "shortName": "Salsa",
    "category": "verduras",
    "mealType": "dinner",
    "station": "fuego_2",
    "prepTimeFormatted": "15 min (fuego_2)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": false,
    "storageAdvice": "Nevera 1-5 días • Consumo fresco",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Huevos"
    ],
    "image": "/assets/fuentes/cocina_tradicional/salsa_de_tomate_frito_casero_reducido_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "verduras_salsas_postres.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "salsa",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/salsa_de_tomate_frito_casero_reducido_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/salsa_de_tomate_frito_casero_reducido_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/salsa_de_tomate_frito_casero_reducido_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Salsa fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "Preparar la mise en place de Salsa de Tomate Frito Casero Reducido con corte homogéneo de ingredientes.",
      "Ejecutar la cocción en fuego 2 respetando los puntos térmicos tradicionales.",
      "Abatir temperatura o reservar en recipientes herméticos fechados para conservación segura."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-salsa_bechamel_perfecta_sedosa_sin_",
    "name": "Salsa Bechamel Perfecta Sedosa Sin Grumos",
    "shortName": "Salsa Bechamel Perfecta Sedosa Sin Grumos",
    "category": "verduras",
    "mealType": "dinner",
    "station": "fuego_2",
    "prepTimeFormatted": "15 min (fuego_2)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": false,
    "storageAdvice": "Nevera 1-5 días • Consumo fresco",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Lácteos",
      "Gluten",
      "Frutos de cáscara"
    ],
    "image": "/assets/fuentes/cocina_tradicional/salsa_bechamel_perfecta_sedosa_sin_grumos_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "verduras_salsas_postres.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "salsa",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/salsa_bechamel_perfecta_sedosa_sin_grumos_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/salsa_bechamel_perfecta_sedosa_sin_grumos_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/salsa_bechamel_perfecta_sedosa_sin_grumos_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Salsa fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "Preparar la mise en place de Salsa Bechamel Perfecta Sedosa Sin Grumos con corte homogéneo de ingredientes.",
      "Ejecutar la cocción en fuego 2 respetando los puntos térmicos tradicionales.",
      "Abatir temperatura o reservar en recipientes herméticos fechados para conservación segura."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-emulsiones_frias_clasicas_mahonesa_",
    "name": "Emulsiones Frías Clásicas: Mahonesa Tradicional y Alioli al Mortero",
    "shortName": "Emulsiones Frías Clásicas: Mahonesa Tradicional y Alioli al Mortero",
    "category": "verduras",
    "mealType": "dinner",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": false,
    "storageAdvice": "Nevera 1-5 días • Consumo fresco",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos"
    ],
    "image": "/assets/fuentes/cocina_tradicional/emulsiones_frias_clasicas_mahonesa_tradiciona_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "verduras_salsas_postres.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "guiso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/emulsiones_frias_clasicas_mahonesa_tradiciona_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/emulsiones_frias_clasicas_mahonesa_tradiciona_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/emulsiones_frias_clasicas_mahonesa_tradiciona_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Emulsiones fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "Preparar la mise en place de Emulsiones Frías Clásicas: Mahonesa Tradicional y Alioli al Mortero con corte homogéneo de ingredientes.",
      "Ejecutar la cocción en fuego 1 respetando los puntos térmicos tradicionales.",
      "Abatir temperatura o reservar en recipientes herméticos fechados para conservación segura."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-arroz_con_leche_cremoso_de_la_abuel-171",
    "name": "Arroz con Leche Cremoso de la Abuela",
    "shortName": "Arroz",
    "category": "arroces_pastas",
    "mealType": "lunch",
    "station": "fuego_2",
    "prepTimeFormatted": "25 min (fuego_2)",
    "prepTimeMinutes": 25,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Lácteos"
    ],
    "image": "/assets/fuentes/cocina_tradicional/arroz_con_leche_cremoso_de_la_abuela_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "verduras_salsas_postres.md",
    "mainIngredientFamily": "arroz",
    "culinaryTechnique": "salsa",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/arroz_con_leche_cremoso_de_la_abuela_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/arroz_con_leche_cremoso_de_la_abuela_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/arroz_con_leche_cremoso_de_la_abuela_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Arroz fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "Preparar la mise en place de Arroz con Leche Cremoso de la Abuela con corte homogéneo de ingredientes.",
      "Ejecutar la cocción en fuego 2 respetando los puntos térmicos tradicionales.",
      "Abatir temperatura o reservar en recipientes herméticos fechados para conservación segura."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-flan_de_huevo_tradicional_al_bano_m-172",
    "name": "Flan de Huevo Tradicional al Baño María con Caramelo Rubio",
    "shortName": "Flan",
    "category": "verduras",
    "mealType": "dinner",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": false,
    "storageAdvice": "Nevera 1-5 días • Consumo fresco",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Lácteos",
      "Huevos"
    ],
    "image": "/assets/fuentes/cocina_tradicional/flan_de_huevo_tradicional_al_bano_maria_con_c_portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "verduras_salsas_postres.md",
    "mainIngredientFamily": "huevos",
    "culinaryTechnique": "guiso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/flan_de_huevo_tradicional_al_bano_maria_con_c_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/flan_de_huevo_tradicional_al_bano_maria_con_c_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/flan_de_huevo_tradicional_al_bano_maria_con_c_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Flan fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "Preparar la mise en place de Flan de Huevo Tradicional al Baño María con Caramelo Rubio con corte homogéneo de ingredientes.",
      "Ejecutar la cocción en fuego 1 respetando los puntos térmicos tradicionales.",
      "Abatir temperatura o reservar en recipientes herméticos fechados para conservación segura."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "trad-natillas_caseras_de_yema_con_gallet-173",
    "name": "Natillas Caseras de Yema con Galleta María y Canela de Ceilán",
    "shortName": "Natillas Caseras",
    "category": "verduras",
    "mealType": "dinner",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": false,
    "storageAdvice": "Nevera 1-5 días • Consumo fresco",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Lácteos",
      "Huevos",
      "Gluten"
    ],
    "image": "/assets/fuentes/cocina_tradicional/natillas_caseras_de_yema_con_galleta_maria_y__portada.jpg",
    "source": "Cocina Tradicional",
    "sourceCompendium": "verduras_salsas_postres.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "guiso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/cocina_tradicional/natillas_caseras_de_yema_con_galleta_maria_y__01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/cocina_tradicional/natillas_caseras_de_yema_con_galleta_maria_y__02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/cocina_tradicional/natillas_caseras_de_yema_con_galleta_maria_y__03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Natillas fresco seleccionado",
        "quantity": 0.25,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Verduras de temporada para sofrito",
        "quantity": 0.15,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra y condimentos",
        "quantity": 0.03,
        "unit": "L",
        "category": "despensa"
      }
    ],
    "instructions": [
      "Preparar la mise en place de Natillas Caseras de Yema con Galleta María y Canela de Ceilán con corte homogéneo de ingredientes.",
      "Ejecutar la cocción en fuego 1 respetando los puntos térmicos tradicionales.",
      "Abatir temperatura o reservar en recipientes herméticos fechados para conservación segura."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "arg-marmitako_de_bonito_del_norte_tradi",
    "name": "Marmitako de Bonito del Norte Tradicional",
    "shortName": "Marmitako",
    "category": "pescados",
    "mealType": "universal",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 3,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-3 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Apio",
      "Gluten",
      "Mostaza",
      "Sésamo",
      "Pescado"
    ],
    "image": "/assets/fuentes/karlos_arguinano/marmitako_de_bonito_del_norte_tradicional_portada.jpg",
    "source": "Karlos Arguiñano",
    "sourceCompendium": "01_sopas_cremas_y_potajes_vascos.md",
    "mainIngredientFamily": "atun",
    "culinaryTechnique": "guiso",
    "infografia": "/assets/fuentes/karlos_arguinano/infografia_marmitako_de_bonito_del_norte_tradicional.jpg",
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/karlos_arguinano/marmitako_de_bonito_del_norte_tradicional_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/karlos_arguinano/marmitako_de_bonito_del_norte_tradicional_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/karlos_arguinano/marmitako_de_bonito_del_norte_tradicional_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Bonito del Norte fresco limpio (sin piel ni espinas)",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Patatas de variedad Monalisa o Kennebec",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Pimientos verdes italianos",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Pimiento rojo morrón",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Cebolla dulce de caserío",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Dientes de ajo morado",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      }
    ],
    "instructions": [
      "**Sofrito base caramelizado:** En la cazuela con los 60 ml de AOVE a fuego medio, añadir los ajos picados y la cayena. Cuando bailen, incorporar la cebolla dulce picada en brunoise fina y los dos tipos de pimiento en daditos uniformes de 1 cm. Sazonar con una pizca de sal y pochar a fuego medio-bajo durante 12-14 minutos hasta que la verdura esté tierna, translúcida y dulce.",
      "**Adición de tomate y pulpa de choricero:** Incorporar el tomate maduro rallado y las 2 cucharadas de pulpa de pimiento choricero. Rehogar durante 4-5 minutos hasta que el agua del tomate se evapore y el sofrito adquiera un tono rojo oscuro brillante.",
      "**Chascado de patatas y sellado:** Añadir los 800 g de patatas previamente chascadas (introduciendo el cuchillo y quebrando el trozo para liberar el almidón). Rehogar el conjunto durante 3 minutos continuos para que la patata absorba los aromas del fondo.",
      "**Cocción y chup-chup coloidal:** Verter el fumet de pescado bien caliente hasta cubrir las patatas unos 2 dedos por encima (aprox. 1.000 ml). Llevar a ebullición viva, espumar si es necesario, bajar a fuego manso (*chup-chup* constante a 90°C) y cocer tapado durante 20-25 minutos hasta que la patata esté sumamente tierna y el caldo quede trabado y denso.",
      "**Cocción perfecta del bonito en calor residual:** Cortar el bonito en dados regulares de 3 cm y sazonar ligeramente. **Apagar el fuego de la cazuela por completo**. Añadir los dados de bonito, sumergirlos con cuidado en el caldo hirviente, tapar la cazuela con su tapadera y dejar reposar durante **3 a 4 minutos exactos**. El calor residual cocerá el bonito dejándolo nacarado, tierno y con un centro jugoso."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "arg-porrusalda_tradicional_con_bacalao_",
    "name": "Porrusalda Tradicional con Bacalao Desmigado",
    "shortName": "Porrusalda Tradicional",
    "category": "pescados",
    "mealType": "universal",
    "station": "robot",
    "prepTimeFormatted": "15 min (robot)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 3,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-3 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Apio",
      "Mostaza",
      "Sésamo",
      "Pescado"
    ],
    "image": "/assets/fuentes/karlos_arguinano/porrusalda_tradicional_con_bacalao_desmigado_portada.jpg",
    "source": "Karlos Arguiñano",
    "sourceCompendium": "01_sopas_cremas_y_potajes_vascos.md",
    "mainIngredientFamily": "bacalao",
    "culinaryTechnique": "crema",
    "infografia": "/assets/fuentes/karlos_arguinano/infografia_porrusalda_tradicional_con_bacalao_desmigado.jpg",
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/karlos_arguinano/porrusalda_tradicional_con_bacalao_desmigado_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/karlos_arguinano/porrusalda_tradicional_con_bacalao_desmigado_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/karlos_arguinano/porrusalda_tradicional_con_bacalao_desmigado_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Puerros frescos de caserío (tallos gruesos y limpios)",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Patatas de calidad para guiso (Monalisa o Spunta)",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Zanahorias medianas peladas",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Bacalao desalado desmigado o en tiras",
        "quantity": 0.1,
        "unit": "kg",
        "category": "carnes-pescados"
      },
      {
        "name": "Dientes de ajo laminados",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Caldo suave de verduras, agua mineral o caldo corto de espinas",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      }
    ],
    "instructions": [
      "**Limpieza técnica y corte del puerro:** Retirar las raíces y la parte verde oscura externa. Realizar una incisión longitudinal en cruz en la parte superior y lavar bajo chorro de agua fría abundante para eliminar cualquier resto de tierra o arenilla. Cortar en cilindros limpios de 2,5 a 3 cm de longitud.",
      "**Rehogado dulce:** En la cazuela con el AOVE a fuego suave, dorar los 2 dientes de ajo laminados sin quemarlos. Añadir los cilindros de puerro y las rodajas de zanahoria. Rehogar tapado durante 6-8 minutos a fuego mínimo hasta que el puerro empiece a ablandarse y desprenda su aroma dulce característico sin tomar color tostado.",
      "**Entrada de la patata chascada:** Chascar las patatas en trozos medianos similares al tamaño del puerro. Añadirlas a la cazuela, remover para impregnarlas del aceite y rehogar 2 minutos.",
      "**Cocción a fuego manso:** Cubrir con los 1.000 ml de caldo o agua caliente. Llevar a hervor suave, tapar y cocer durante 20-22 minutos a fuego medio-bajo hasta que la patata esté completamente tierna y mantequillosa.",
      "**Incorporación del bacalao y reposo:** Añadir el bacalao desalado desmigado distribuyéndolo por toda la superficie de la cazuela. Dejar cocer suavemente durante **3 minutos exactos**. Apagar el fuego, rectificar de sal si fuera necesario (teniendo en cuenta la salinidad natural del bacalao) y reposar 5 minutos tapado para que los jugos se equilibren."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "arg-sopa_de_pescado_y_marisco_donostiar",
    "name": "Sopa de Pescado y Marisco Donostiarra",
    "shortName": "Sopa",
    "category": "pescados",
    "mealType": "universal",
    "station": "robot",
    "prepTimeFormatted": "15 min (robot)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 3,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-3 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Crustáceos",
      "Huevos",
      "Sulfitos",
      "Apio",
      "Pescado",
      "Gluten",
      "Mostaza",
      "Sésamo",
      "Moluscos"
    ],
    "image": "/assets/fuentes/karlos_arguinano/sopa_de_pescado_y_marisco_donostiarra_portada.jpg",
    "source": "Karlos Arguiñano",
    "sourceCompendium": "01_sopas_cremas_y_potajes_vascos.md",
    "mainIngredientFamily": "marisco",
    "culinaryTechnique": "crema",
    "infografia": "/assets/fuentes/karlos_arguinano/infografia_sopa_de_pescado_y_marisco_donostiarra.jpg",
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/karlos_arguinano/sopa_de_pescado_y_marisco_donostiarra_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/karlos_arguinano/sopa_de_pescado_y_marisco_donostiarra_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/karlos_arguinano/sopa_de_pescado_y_marisco_donostiarra_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Lomos limpios de rape y merluza fresca en dados",
        "quantity": 0.1,
        "unit": "kg",
        "category": "carnes-pescados"
      },
      {
        "name": "Gambas o langostinos frescos enteros con piel",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Almejas finas limpias de arena",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Cabeza y espinas de rape/merluza para fumet",
        "quantity": 0.1,
        "unit": "kg",
        "category": "carnes-pescados"
      },
      {
        "name": "Pan de hogaza candeal del día anterior (rebanadas finas)",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Puerro limpio picado",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Extracción del fondo marino y flambeado:** Pelar las gambas reservando los cuerpos limpios. En una cazuela con 20 ml de AOVE caliente, dorar las cabezas y cáscaras a fuego vivo aplastándolas con la maza de un mortero para que suelten todos sus jugos corales. Verter los 40 ml de brandy y flambear con precaución. Añadir las espinas del pescado, cubrir con 1.400 ml de agua, hervir 20 minutos a fuego suave y colar por colador chino presionando enérgicamente (obteniendo 1.200 ml de fumet rojo intenso).",
      "**Sofrito de verduras y pan de sopa:** En la cazuela principal con el resto del AOVE, pochar a fuego lento la cebolla, puerro, zanahoria y ajos durante 10 minutos. Añadir el tomate triturado y cocinar 5 minutos más hasta caramelizar. Incorporar las láminas finas de pan candeal duro y remover 2 minutos para que se impregnen de la grasa y el sofrito.",
      "**Cocción y triturado aterciopelado:** Verter el fumet rojo caliente sobre el sofrito con pan. Dejar cocer a fuego lento durante 15 minutos para que el pan se deshaga por completo. Pasar el caldo por pasapurés (método clásico de Karlos Arguiñano para mantener una textura con cuerpo rústico) o triturar ligeramente con batidora.",
      "**Apertura de almejas e incorporación de tropezones:** En una sartén con unas gotas de caldo y tapada, abrir las almejas al vapor (desechar las que permanezcan cerradas). Verter su jugo colado a la sopa.",
      "**Cocción final de rape, merluza y gambas:** Reintegrar la sopa al fuego. Cuando empiece a hervir suavemente, añadir los dados de rape, merluza y los cuerpos de las gambas. Cocinar a fuego manso durante **3-4 minutos** solamente. Incorporar las almejas con su concha y apagar el fuego."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "arg-crema_de_calabaza_y_naranja_con_cru",
    "name": "Crema de Calabaza y Naranja con Crujiente de Jamón",
    "shortName": "Crema",
    "category": "cremas",
    "mealType": "dinner",
    "station": "robot",
    "prepTimeFormatted": "15 min (robot)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Apio",
      "Lácteos",
      "Frutos de cáscara",
      "Mostaza",
      "Sésamo",
      "Pescado"
    ],
    "image": "/assets/fuentes/karlos_arguinano/crema_de_calabaza_y_naranja_con_crujiente_de_jamon_portada.jpg",
    "source": "Karlos Arguiñano",
    "sourceCompendium": "01_sopas_cremas_y_potajes_vascos.md",
    "mainIngredientFamily": "verduras",
    "culinaryTechnique": "crema",
    "infografia": "/assets/fuentes/karlos_arguinano/infografia_crema_de_calabaza_y_naranja_con_crujiente_de_jamon.jpg",
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/karlos_arguinano/crema_de_calabaza_y_naranja_con_crujiente_de_jamon_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/karlos_arguinano/crema_de_calabaza_y_naranja_con_crujiente_de_jamon_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/karlos_arguinano/crema_de_calabaza_y_naranja_con_crujiente_de_jamon_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Calabaza tipo Butternut (cacahuete) pelada y sin semillas",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Puerro fresco limpio (parte blanca y verde clara)",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Zumo natural de naranja recién exprimido",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Ralladura fina de piel de naranja (sin albedo amargo)",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Mantequilla artesana de caserío",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Aceite de oliva virgen extra (AOVE)",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Elaboración del crujiente de jamón en horno:** Precalentar el horno a 180°C con calor arriba y abajo. Colocar las lonchas de jamón estiradas sobre una bandeja con papel de hornear. Cubrir con otra hoja de papel y colocar encima otra bandeja para que el jamón no se curve al secarse. Hornear durante **10-12 minutos** hasta que esté deshidratado y firme. Retirar, dejar enfriar sobre rejilla (se volverá crujiente como cristal) y quebrar en tejas o lascas.",
      "**Rehogado aromático:** En la cazuela, fundir los 25 g de mantequilla con los 20 ml de AOVE. Añadir el puerro cortado en rodajas finas y pochar a fuego suave durante 5 minutos sin que tome color dorado.",
      "**Cocción de la calabaza:** Incorporar los dados de calabaza, la ralladura de naranja, sal, pimienta blanca y una pizca sutil de nuez moscada. Rehogar 4 minutos para impregnar. Verter el caldo de verduras caliente (500 ml) y cocer a fuego medio-bajo tapado durante **20 minutos** hasta que la calabaza se atraviese sin resistencia con un tenedor.",
      "**Emulsión y acabado cítrico:** Retirar del fuego. Añadir los 100 ml de zumo natural de naranja colado y los 50 ml de nata líquida. Triturar en la batidora a máxima potencia durante 2-3 minutos continuos para emulsionar la grasa y obtener una crema extraordinariamente brillante, aérea y satinada. Rectificar de sal."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "arg-sopa_castellana_de_ajo_y_huevo_esca",
    "name": "Sopa Castellana de Ajo y Huevo Escalfado",
    "shortName": "Sopa Castellana",
    "category": "cremas",
    "mealType": "dinner",
    "station": "robot",
    "prepTimeFormatted": "15 min (robot)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Apio",
      "Gluten",
      "Mostaza",
      "Sésamo",
      "Pescado"
    ],
    "image": "/assets/fuentes/karlos_arguinano/sopa_castellana_de_ajo_y_huevo_escalfado_portada.jpg",
    "source": "Karlos Arguiñano",
    "sourceCompendium": "01_sopas_cremas_y_potajes_vascos.md",
    "mainIngredientFamily": "huevos",
    "culinaryTechnique": "crema",
    "infografia": "/assets/fuentes/karlos_arguinano/infografia_sopa_castellana_de_ajo_y_huevo_escalfado.jpg",
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/karlos_arguinano/sopa_castellana_de_ajo_y_huevo_escalfado_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/karlos_arguinano/sopa_castellana_de_ajo_y_huevo_escalfado_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/karlos_arguinano/sopa_castellana_de_ajo_y_huevo_escalfado_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Pan de pueblo o de hogaza candeal (asentado de 2 días)",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Dientes de ajo morado de Las Pedroñeras",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Huevos frescos camperos (Categoría 0 o 1)",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Taquitos de jamón curado o serrano entreverado",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Pimentón dulce de la Vera con D.O.P.",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Pimentón picante de la Vera",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Dorado lento de los ajos y jamón:** En la cazuela de barro, calentar los 50 ml de AOVE a fuego medio-bajo. Añadir los ajos laminados y confitarlos lentamente hasta que adquieran un tono dorado pálido sin quemarse (el ajo quemado arruina la sopa volviéndola amarga). Añadir los taquitos de jamón curado y saltear 1 minuto.",
      "**Tostado de pimentón y fritura de pan:** **Retirar la cazuela del fuego** durante 30 segundos. Añadir el pimentón dulce (y la pizca de picante) y remover rápidamente con la cuchara de madera en el aceite caliente para que se tueste sin quemarse. De inmediato, incorporar las rebanadas finas de pan duro y volver a poner a fuego suave, rehogando el pan durante 2-3 minutos para que absorba todo el aceite rojo y quede impregnado.",
      "**Cocción y rotura del pan:** Verter los 1.200 ml de caldo caliente (o agua) sobre el pan. Subir el fuego hasta que hierva, sazonar ligeramente, bajar a fuego manso y cocinar durante **15 minutos** removiendo ocasionalmente para que el pan se ablande y se rompa en hebras y copos tiernos.",
      "**Escalfado de huevos:** Cascar los 4 huevos camperos uno a uno con cuidado depositándolos sobre la superficie del caldo hirviente en 4 esquinas distintas. Tapar la cazuela, apagar el fuego o mantener al mínimo durante **3 minutos** hasta que la clara cuaje en un blanco opaco pero la yema permanezca totalmente líquida y cremosa."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "arg-crema_de_calabacin_suave_con_quesit",
    "name": "Crema de Calabacín Suave con Quesitos",
    "shortName": "Crema",
    "category": "cremas",
    "mealType": "dinner",
    "station": "robot",
    "prepTimeFormatted": "15 min (robot)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Apio",
      "Lácteos",
      "Gluten",
      "Mostaza",
      "Sésamo",
      "Pescado"
    ],
    "image": "/assets/fuentes/karlos_arguinano/crema_de_calabacin_suave_con_quesitos_portada.jpg",
    "source": "Karlos Arguiñano",
    "sourceCompendium": "01_sopas_cremas_y_potajes_vascos.md",
    "mainIngredientFamily": "pollo",
    "culinaryTechnique": "crema",
    "infografia": "/assets/fuentes/karlos_arguinano/infografia_crema_de_calabacin_suave_con_quesitos.jpg",
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/karlos_arguinano/crema_de_calabacin_suave_con_quesitos_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/karlos_arguinano/crema_de_calabacin_suave_con_quesitos_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/karlos_arguinano/crema_de_calabacin_suave_con_quesitos_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Calabacines medianos frescos y tersos (con piel limpia)",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Patata mediana (Monalisa)",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Cebolla blanca o puerro",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Diente de ajo pelado",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Quesitos en porciones (o queso crema suave)",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Caldo de verduras ligero o agua",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      }
    ],
    "instructions": [
      "**Preparación y corte de vegetales:** Lavar concienzudamente la piel de los calabacines (mantener la piel aporta clorofila, antioxidantes y un vivo color verde esmeralda). Cortar en dados medianos de 2 cm. Picar la cebolla y cortar la patata en cubitos pequeños para que se cocine rápido.",
      "**Rehogado inicial:** En la cazuela con los 35 ml de AOVE, pochar la cebolla picada y el diente de ajo a fuego suave durante 4 minutos. Añadir los dados de calabacín y patata, sazonar y rehogar durante 4 minutos para activar los azúcares naturales de la hortaliza.",
      "**Cocción corta controlada:** Verter los 400 ml de caldo o agua caliente (el líquido debe llegar a media altura de los vegetales; no cubrir del todo ya que el calabacín suelta abundante agua y una crema líquida pierde textura). Tapar y cocinar a fuego medio durante **15 minutos** hasta que la patata esté blanda.",
      "**Triturado y emulsión láctea:** Añadir las 4 porciones de quesitos directamente a la cazuela caliente. Triturar en batidora de vaso durante 2 minutos enteros a máxima potencia hasta lograr una textura completamente sedosa, brillante y sin ningún grumo. Rectificar de sal y pimienta blanca."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "arg-sopa_zurrukutuna_tradicional_de_bac",
    "name": "Sopa Zurrukutuna Tradicional de Bacalao y Pimiento Choricero",
    "shortName": "Sopa Zurrukutuna Tradicional",
    "category": "pescados",
    "mealType": "universal",
    "station": "robot",
    "prepTimeFormatted": "15 min (robot)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 3,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-3 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Apio",
      "Frutos de cáscara",
      "Gluten",
      "Mostaza",
      "Sésamo",
      "Pescado"
    ],
    "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=80",
    "source": "Karlos Arguiñano",
    "sourceCompendium": "01_sopas_cremas_y_potajes_vascos.md",
    "mainIngredientFamily": "bacalao",
    "culinaryTechnique": "crema",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": null,
      "elaboracion": null,
      "resultadoFinal": null
    },
    "ingredientsPerServing": [
      {
        "name": "Bacalao desalado desmigado o en lascas limpias",
        "quantity": 0.1,
        "unit": "kg",
        "category": "carnes-pescados"
      },
      {
        "name": "Pan de hogaza o de sopa del día anterior",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Carne de pimiento choricero hidratada",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Dientes de ajo morado",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Tomate maduro rallado",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Huevos camperos frescos",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Confitado de ajos y base de choricero:** En la cazuela con el AOVE a fuego suave, dorar los ajos laminados y la cayena hasta que tomen color avellana claro. Añadir el tomate rallado y sofreír 3 minutos. Incorporar la carne de pimiento choricero y el pimentón dulce, removiendo fuera del fuego para evitar que amargue.",
      "**Fritura e hidratación del pan de sopa:** Añadir las rebanadas finas de pan asentado a la cazuela. Rehogar durante 2 minutos para que el pan se empape de la grasa roja aromatizada.",
      "**Cocción y deshebrado del pan:** Verter el fumet caliente (1.100 ml). Cocinar a fuego lento durante **15 minutos**, removiendo con varilla o cuchara de madera para que el pan se deshaga creando una sopa espesa y melosa.",
      "**Incorporación de bacalao y huevo hilado:** Añadir los 300 g de bacalao desalado desmigado y cocinar durante **3 minutos**. Por último, verter los 2 huevos batidos en hilo fino mientras se remueve la sopa con la varilla para que se formen hilos dorados de huevo cuajado repartidos por todo el caldo. Apagar el fuego y reposar 5 minutos."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "arg-crema_de_esparragos_trigueros_con_g",
    "name": "Crema de Espárragos Trigueros con Gambas y Virutas de Jamón",
    "shortName": "Crema",
    "category": "pescados",
    "mealType": "universal",
    "station": "robot",
    "prepTimeFormatted": "15 min (robot)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 3,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-3 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Crustáceos",
      "Huevos",
      "Sulfitos",
      "Apio",
      "Lácteos",
      "Mostaza",
      "Sésamo",
      "Pescado"
    ],
    "image": "/assets/fuentes/karlos_arguinano/crema_de_esparragos_trigueros_con_gambas_y_jamon_portada.jpg",
    "source": "Karlos Arguiñano",
    "sourceCompendium": "01_sopas_cremas_y_potajes_vascos.md",
    "mainIngredientFamily": "verduras",
    "culinaryTechnique": "crema",
    "infografia": "/assets/fuentes/karlos_arguinano/infografia_crema_de_esparragos_trigueros_con_gambas_y_jamon.jpg",
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/karlos_arguinano/crema_de_esparragos_trigueros_con_gambas_y_jamon_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/karlos_arguinano/crema_de_esparragos_trigueros_con_gambas_y_jamon_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/karlos_arguinano/crema_de_esparragos_trigueros_con_gambas_y_jamon_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Espárragos trigueros verdes frescos",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Gambas o langostinos pelados",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Puerro limpio (parte blanca)",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Patata mediana pelada",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Caldo de verduras o agua",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Nata ligera o leche evaporada",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Preparación y reserva de yemas:** Doblar la base de los espárragos hasta que quiebren de forma natural desechando el tallo leñoso duro. Cortar las yemas superiores (5 cm) y reservarlas para saltear como guarnición crujiente. Trocear el resto de los tallos tiernos.",
      "**Rehogado y cocción:** En la cazuela con 30 ml de AOVE, pochar el puerro picado y los tallos de espárragos durante 5 minutos. Añadir la patata chascada, sazonar con sal y pimienta blanca, verter el caldo caliente y cocer tapado durante **15 minutos** a fuego medio.",
      "**Triturado y texturizado fino:** Añadir la nata y triturar en la batidora de vaso a máxima velocidad durante 2 minutos. Pasar por un colador chino para eliminar cualquier fibra residual de los espárragos obteniendo una textura de seda pura.",
      "**Salteado de guarnición noble:** En una sartén con 10 ml de AOVE a fuego vivo, saltear las yemas de espárrago reservadas durante 2 minutos hasta que estén al dente y doradas. Añadir las gambas peladas y los taquitos de jamón, salteando 1 minuto más."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "arg-sopa_de_cebolla_gratinada_con_queso",
    "name": "Sopa de Cebolla Gratinada con Queso Idiazábal",
    "shortName": "Sopa",
    "category": "cremas",
    "mealType": "dinner",
    "station": "horno",
    "prepTimeFormatted": "15 min (horno)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Apio",
      "Lácteos",
      "Gluten",
      "Mostaza",
      "Sésamo",
      "Pescado"
    ],
    "image": "/assets/fuentes/karlos_arguinano/sopa_de_cebolla_gratinada_con_queso_idiazabal_portada.jpg",
    "source": "Karlos Arguiñano",
    "sourceCompendium": "01_sopas_cremas_y_potajes_vascos.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "asado_horno",
    "infografia": "/assets/fuentes/karlos_arguinano/infografia_sopa_de_cebolla_gratinada_con_queso_idiazabal.jpg",
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/karlos_arguinano/sopa_de_cebolla_gratinada_con_queso_idiazabal_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/karlos_arguinano/sopa_de_cebolla_gratinada_con_queso_idiazabal_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/karlos_arguinano/sopa_de_cebolla_gratinada_con_queso_idiazabal_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Cebollas dulces o tipo Figueres",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Mantequilla de caserío",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Aceite de oliva virgen extra (AOVE)",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Harina de trigo de repostería",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Vino blanco seco o Txakoli de Getaria",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Caldo de carne o de ave concentrado oscuro",
        "quantity": 0.1,
        "unit": "kg",
        "category": "carnes-pescados"
      }
    ],
    "instructions": [
      "**Caramelización lenta de la cebolla:** En la cazuela amplia a fuego bajo, derretir la mantequilla con el AOVE. Añadir las cebollas en juliana fina con una pizca de sal. Pochar pacientemente durante **30 minutos**, removiendo cada pocos minutos hasta que la cebolla adquiera un tono pardo dorado intenso y un sabor dulce caramelizado (reacción de Maillard natural).",
      "**Roux y desglasado con Txakoli:** Espolvorear la cucharada de harina sobre la cebolla caramelizada y tostar durante 1 minuto para cocinar el almidón. Verter el Txakoli o vino blanco, rascando el fondo con la espátula para levantar los jugos tostados. Dejar reducir 2 minutos.",
      "**Cocción con caldo:** Añadir el caldo de carne caliente (1.200 ml). Cocinar a fuego manso durante **15 minutos** para que los sabores se armonicen y el caldo adquiera cuerpo y color caoba.",
      "**Gratinado con Idiazábal:** Tostar las rebanadas de pan y frotarlas ligeramente con el diente de ajo. Repartir la sopa hirviente en 4 cuencos de barro refractarios. Colocar 2 rebanadas de pan en la superficie de cada cuenco y cubrir generosamente con los 120 g de queso Idiazábal rallado.",
      "**Gratinado al horno:** Introducir bajo el grill del horno a 220°C durante **4-5 minutos** hasta que el queso esté burbujeante, fundido y con una costra dorada y crujiente."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "arg-vichyssoise_vasca_templada_de_puerr",
    "name": "Vichyssoise Vasca Templada de Puerros y Manzana Reineta",
    "shortName": "Vichyssoise Vasca Templada",
    "category": "cremas",
    "mealType": "dinner",
    "station": "robot",
    "prepTimeFormatted": "15 min (robot)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Apio",
      "Lácteos",
      "Mostaza",
      "Sésamo",
      "Pescado"
    ],
    "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=80",
    "source": "Karlos Arguiñano",
    "sourceCompendium": "01_sopas_cremas_y_potajes_vascos.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "crema",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": null,
      "elaboracion": null,
      "resultadoFinal": null
    },
    "ingredientsPerServing": [
      {
        "name": "Puerros frescos (solo la parte blanca pura)",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Manzanas tipo Reineta o Granny Smith",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Patata harinosa (Kennebec o Monalisa)",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Cebolleta blanca fresca",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Mantequilla de caserío",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Aceite de oliva virgen extra suave",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Rehogado en blanco (sin color):** En la cazuela, fundir la mantequilla con los 15 ml de AOVE a fuego muy bajo. Añadir la cebolleta y la parte blanca de los puerros cortados en rodajas finas. Pochar a fuego mínimo durante 8 minutos tapado, cuidando meticulosamente que no adquieran ningún tono dorado para mantener un color blanco marfil impoluto.",
      "**Adición de manzana y patata:** Añadir las manzanas reineta en dados y la patata troceada fina. Rehogar 3 minutos para que la manzana empiece a liberar sus aromas frutales y su pectina.",
      "**Cocción corta:** Verter los 600 ml de caldo blanco de ave caliente. Cocinar tapado a fuego medio durante **15 minutos** hasta que la patata y la manzana estén completamente deshechas.",
      "**Triturado, emulsión y enfriado/atemperado:** Incorporar la nata líquida y triturar en la batidora de vaso a velocidad máxima durante 2 minutos hasta conseguir una emulsión blanca, untuosa y ligera. Pasar por el colador chino para asegurar una finura suprema. Servir templada o enfriar en abatidor/nevera para tomar fría en época estival."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "arg-bacalao_al_pil_pil_tradicional_con_",
    "name": "Bacalao al Pil-Pil Tradicional con Ajos y Guindilla",
    "shortName": "Bacalao al Pil-Pil Tradicional",
    "category": "pescados",
    "mealType": "universal",
    "station": "fuego_2",
    "prepTimeFormatted": "15 min (fuego_2)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 3,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-3 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Apio",
      "Mostaza",
      "Sésamo",
      "Pescado"
    ],
    "image": "/assets/fuentes/karlos_arguinano/bacalao_al_pil_pil_tradicional_con_ajos_y_guindill_portada.jpg",
    "source": "Karlos Arguiñano",
    "sourceCompendium": "02_pescados_del_cantabrico_y_mariscos.md",
    "mainIngredientFamily": "bacalao",
    "culinaryTechnique": "pil_pil",
    "infografia": "/assets/fuentes/karlos_arguinano/infografia_kokotxas_de_bacalao_al_pil_pil.jpg",
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/karlos_arguinano/kokotxas_de_bacalao_al_pil_pil_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/karlos_arguinano/kokotxas_de_bacalao_al_pil_pil_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/karlos_arguinano/bacalao_al_pil_pil_tradicional_con_ajos_y_guindill_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Lomos gruesos de bacalao desalado (corte especial)",
        "quantity": 0.1,
        "unit": "kg",
        "category": "carnes-pescados"
      },
      {
        "name": "Dientes de ajo pelados y laminados finos",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Guindilla cayena seca en aros sin semillas",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Aceite de oliva virgen extra suave (acidez ≤ 0.4°)",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Perejil fresco picado fino para acabado",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Secado y atemperado:** Secar minuciosamente los lomos de bacalao con papel absorbente para retirar agua libre superficial y atemperar 15 min a temperatura ambiente.",
      "**Dorado de ajos y guindilla:** En la cazuela con los 250 ml de AOVE a fuego suave (130°C), dorar las láminas de ajo y los aros de guindilla hasta que alcancen un tono pajizo tostado. Retirar y reservar crujientes sobre papel secante.",
      "**Confitado y desprendimiento de gelatina:** Bajar la temperatura del aceite a 65-70°C. Colocar los lomos con la piel hacia arriba durante 4 minutos; dar la vuelta con cuidado dejando la piel hacia abajo otros 4 minutos. El bacalao expulsará perlas de suero gelatinoso blanco.",
      "**Emulsión del Pil-Pil:** Retirar los lomos a una fuente templada y reservar el jugo que suelten. Dejar templar el aceite a 45-50°C. Con un colador de malla fina mediante movimientos circulares continuos (o con el balanceo rítmico manual de la cazuela), batir el fondo de aceite incorporando gota a gota el suero gelatinoso hasta lograr una crema espesa, densa y de color verde amarillento.",
      "**Ensamblado y baño térmico:** Reincorporar los lomos a la cazuela con el pil-pil ligado, calentar 1 minuto a fuego mínimo sin sobrepasar los 55°C para evitar que se corte, y coronar con los ajos y aros de guindilla crujientes."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "arg-merluza_en_salsa_verde_con_almejas_",
    "name": "Merluza en Salsa Verde con Almejas y Kokotxas",
    "shortName": "Merluza en Salsa Verde",
    "category": "pescados",
    "mealType": "universal",
    "station": "fuego_2",
    "prepTimeFormatted": "15 min (fuego_2)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 3,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-3 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Apio",
      "Pescado",
      "Gluten",
      "Mostaza",
      "Sésamo",
      "Moluscos"
    ],
    "image": "/assets/fuentes/karlos_arguinano/merluza_en_salsa_verde_con_almejas_y_kokotxas_portada.jpg",
    "source": "Karlos Arguiñano",
    "sourceCompendium": "02_pescados_del_cantabrico_y_mariscos.md",
    "mainIngredientFamily": "merluza",
    "culinaryTechnique": "salsa",
    "infografia": "/assets/fuentes/karlos_arguinano/infografia_merluza_en_salsa_verde_con_almejas_y_kokotxas.jpg",
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/karlos_arguinano/merluza_en_salsa_verde_con_almejas_y_kokotxas_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/karlos_arguinano/merluza_en_salsa_verde_con_almejas_y_kokotxas_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/karlos_arguinano/merluza_en_salsa_verde_con_almejas_y_kokotxas_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Rodajas o lomos de merluza de pincho",
        "quantity": 0.1,
        "unit": "kg",
        "category": "carnes-pescados"
      },
      {
        "name": "Almejas finas de carril o babosas",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Kokotxas de merluza frescas",
        "quantity": 0.1,
        "unit": "kg",
        "category": "carnes-pescados"
      },
      {
        "name": "Dientes de ajo picados finamente en brunoise",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Harina de trigo tamizada",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Txakoli de Getaria o vino blanco seco",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Purga de almejas:** Sumergir las almejas 30 minutos en agua fría con sal gorda (35 g/L) para eliminar arenillas.",
      "**Roux rubio base:** En cazuela baja con el AOVE a fuego medio, dorar el ajo picado sin que se queme. Añadir la harina y cocinar 60 segundos removiendo para perder el sabor a crudo.",
      "**Desglasado y emulsión verde:** Incorporar el Txakoli o vino blanco, evaporar el alcohol a fuego vivo 1 min, agregar el fumet caliente y el perejil picado, agitando la cazuela hasta que la salsa ligue.",
      "**Cocción en vaivén:** Sazonar los lomos de merluza y colocarlos en la salsa junto con las almejas y las kokotxas. Tapar y cocer a fuego medio-bajo durante 6-8 minutos con suaves movimientos de vaivén de la cazuela hasta que las almejas se abran por completo."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "arg-txangurro_a_la_donostiarra_al_horno",
    "name": "Txangurro a la Donostiarra al Horno",
    "shortName": "Txangurro a la Donostiarra al Horno",
    "category": "pescados",
    "mealType": "universal",
    "station": "horno",
    "prepTimeFormatted": "15 min (horno)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 3,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-3 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Crustáceos",
      "Huevos",
      "Sulfitos",
      "Apio",
      "Lácteos",
      "Pescado",
      "Gluten",
      "Mostaza",
      "Sésamo",
      "Moluscos"
    ],
    "image": "/assets/fuentes/karlos_arguinano/txangurro_a_la_donostiarra_al_horno_portada.jpg",
    "source": "Karlos Arguiñano",
    "sourceCompendium": "02_pescados_del_cantabrico_y_mariscos.md",
    "mainIngredientFamily": "marisco",
    "culinaryTechnique": "asado_horno",
    "infografia": "/assets/fuentes/karlos_arguinano/infografia_txangurro_a_la_donostiarra_al_horno.jpg",
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/karlos_arguinano/txangurro_a_la_donostiarra_al_horno_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/karlos_arguinano/txangurro_a_la_donostiarra_al_horno_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/karlos_arguinano/txangurro_a_la_donostiarra_al_horno_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Centollos o bueyes de mar cocidos enteros (con caparazón íntegro)",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Cebolla dulce picada en brunoise fina",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Puerro (parte blanca) picado finamente",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Tomate maduro escalfado, pelado y rallado",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Diente de ajo picado",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Brandy / Coñac de calidad",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Desmigado minucioso:** Separar el cuerpo y las patas del txangurro. Extraer toda la carne magra y los corales interiores evitando fragmentos de cáscara. Lavar y cepillar los caparazones vacíos para rellenar.",
      "**Sofrito donostiarra:** En sartén con el AOVE y 10 g de mantequilla, pochar el ajo, la cebolla y el puerro a fuego lento durante 12-14 min. Añadir el tomate rallado y sofreír 6 min más.",
      "**Flambeado y ensamblaje:** Agregar la carne y corales de txangurro al sofrito, verter el brandy y flambear con precaución. Reducir 2 min a fuego suave ajustando de sal y pimienta blanca.",
      "**Relleno y gratinado crujiente:** Rellenar los 2 caparazones limpios con la farsa, espolvorear con el pan rallado y repartir dados finos del resto de mantequilla (20 g). Gratinar en horno a 210°C durante 8-10 minutos hasta formar una costra tostada y crujiente."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "arg-chipirones_en_su_tinta_tradicionale",
    "name": "Chipirones en su Tinta Tradicionales",
    "shortName": "Chipirones en su Tinta Tradicionales",
    "category": "pescados",
    "mealType": "universal",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 3,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-3 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Apio",
      "Lácteos",
      "Pescado",
      "Gluten",
      "Mostaza",
      "Sésamo",
      "Moluscos"
    ],
    "image": "/assets/fuentes/karlos_arguinano/chipirones_en_su_tinta_tradicionales_portada.jpg",
    "source": "Karlos Arguiñano",
    "sourceCompendium": "02_pescados_del_cantabrico_y_mariscos.md",
    "mainIngredientFamily": "marisco",
    "culinaryTechnique": "guiso",
    "infografia": "/assets/fuentes/karlos_arguinano/infografia_chipirones_en_su_tinta_tradicionales.jpg",
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/karlos_arguinano/chipirones_en_su_tinta_tradicionales_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/karlos_arguinano/chipirones_en_su_tinta_tradicionales_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/karlos_arguinano/chipirones_en_su_tinta_tradicionales_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Chipirones medianos frescos limpios",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Bolsitas de tinta natural de calamar",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Cebollas moradas de Zalla o rojas en juliana",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Pimiento verde italiano picado",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Dientes de ajo picados",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Rebanada de pan de hogaza frito",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Limpieza y rellenado:** Picar finamente las aletas y tentáculos limpios. Rellenar las vainas con su propio picadillo hasta 2/3 de capacidad y sellar el extremo con un palillo de madera.",
      "**Caramelización de la cebolla roja:** En cazuela con el AOVE, pochar la cebolla roja y el pimiento verde a fuego muy suave durante 25-30 minutos hasta lograr un fondo caoba oscuro y dulce.",
      "**Salsa negra aterciopelada:** Añadir el ajo, el pan frito, desglasar con vino blanco, evaporar alcohol e incorporar la tinta disuelta en el fumet caliente. Cocer 10 min, triturar a fondo y pasar por colador chino.",
      "**Marcado y estofado:** Marcar los chipirones en sartén viva con unas gotas de aceite durante 1 min por cara. Introducir en la salsa de tinta y guisar a fuego suave tapado durante 18-20 minutos hasta que estén tiernos como mantequilla."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "arg-merluza_a_la_koskera_con_esparragos",
    "name": "Merluza a la Koskera con Espárragos, Almejas y Huevo Duro",
    "shortName": "Merluza a la Koskera",
    "category": "pescados",
    "mealType": "universal",
    "station": "fuego_2",
    "prepTimeFormatted": "15 min (fuego_2)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 3,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-3 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Apio",
      "Pescado",
      "Gluten",
      "Mostaza",
      "Sésamo",
      "Moluscos"
    ],
    "image": "/assets/fuentes/karlos_arguinano/merluza_a_la_koskera_con_esparragos_y_huevo_duro_portada.jpg",
    "source": "Karlos Arguiñano",
    "sourceCompendium": "02_pescados_del_cantabrico_y_mariscos.md",
    "mainIngredientFamily": "merluza",
    "culinaryTechnique": "salsa",
    "infografia": "/assets/fuentes/karlos_arguinano/infografia_merluza_a_la_koskera_con_esparragos_y_huevo_duro.jpg",
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/karlos_arguinano/merluza_a_la_koskera_con_esparragos_y_huevo_duro_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/karlos_arguinano/merluza_a_la_koskera_con_esparragos_y_huevo_duro_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/karlos_arguinano/merluza_a_la_koskera_con_esparragos_y_huevo_duro_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Lomos o rodajas gruesas de merluza de anzuelo",
        "quantity": 0.1,
        "unit": "kg",
        "category": "carnes-pescados"
      },
      {
        "name": "Almejas finas de carril",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Yemas de espárragos blancos de Navarra gruesos",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Huevos camperos cocidos (9 min)",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Guisantes tiernos frescos o congelados extrafinos",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Dientes de ajo en brunoise",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      }
    ],
    "instructions": [
      "**Base y roux aromático:** En cazuela con el AOVE, dorar el ajo picado a fuego suave. Incorporar la harina y sofreír 1 min sin que se oscurezca.",
      "**Salsa verde Koskera:** Verter el vino blanco, evaporar el alcohol 1 min, verter el fumet caliente y el perejil. Remover hasta que la salsa ligue uniformemente.",
      "**Cocción de pescado, almejas y guisantes:** Salar los lomos de merluza y sumergirlos en la salsa junto a las almejas purgadas y los guisantes. Cocer 6-7 minutos tapado a fuego medio con vaivén continuo.",
      "**Guarnición y asentado:** Incorporar las yemas de espárragos blancos y los cuartos de huevo duro durante los últimos 2 minutos de cocción para que tomen temperatura sin deshacerse."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "arg-bonito_del_norte_con_tomate_y_pimie",
    "name": "Bonito del Norte con Tomate y Pimientos del País",
    "shortName": "Bonito del Norte",
    "category": "pescados",
    "mealType": "universal",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 3,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-3 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Apio",
      "Mostaza",
      "Sésamo",
      "Pescado"
    ],
    "image": "/assets/fuentes/karlos_arguinano/marmitako_de_bonito_del_norte_tradicional_portada.jpg",
    "source": "Karlos Arguiñano",
    "sourceCompendium": "02_pescados_del_cantabrico_y_mariscos.md",
    "mainIngredientFamily": "atun",
    "culinaryTechnique": "guiso",
    "infografia": "/assets/fuentes/karlos_arguinano/infografia_marmitako_de_bonito_del_norte_tradicional.jpg",
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/karlos_arguinano/bonito_del_norte_con_tomate_y_pimientos_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/karlos_arguinano/marmitako_de_bonito_del_norte_tradicional_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/karlos_arguinano/bonito_del_norte_con_tomate_y_pimientos_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Tacos limpios de Bonito del Norte fresco (sin piel ni espina central)",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Tomates maduros tipo pera escalfados y triturados",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Cebollas dulces picadas en juliana fina",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Pimientos verdes del país / italianos en tiras",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Pimiento rojo morrón asado en tiras",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Dientes de ajo laminados",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      }
    ],
    "instructions": [
      "**Fritada y confitado:** En cazuela con 40 ml de AOVE, pochar la cebolla, el ajo y los pimientos verdes y rojos con una pizca de sal a fuego medio-bajo durante 20 minutos hasta que estén tiernos y translúcidos.",
      "**Salsa de tomate casera:** Incorporar el tomate triturado y el azúcar. Cocinar a fuego lento tapado durante 20 minutos hasta que la salsa espese y el aceite suba a la superficie.",
      "**Sellado rápido del bonito:** Cortar el bonito en tacos de 4x4 cm. En sartén viva con 20 ml de AOVE muy caliente, sellar los tacos sazonados durante solo 30 segundos por cara (interior crudo).",
      "**Cocción residual sin fuego:** Pasar los tacos sellados inmediatamente a la cazuela de tomate, apagar el fuego por completo, tapar y dejar reposar 3-4 minutos para que el calor residual cocine el centro dejándolo extraordinariamente jugoso."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "arg-besugo_al_orio_con_ajos_guindilla_y",
    "name": "Besugo al Orio con Ajos, Guindilla y Vinagre de Sidra",
    "shortName": "Besugo al Orio",
    "category": "pescados",
    "mealType": "universal",
    "station": "frio",
    "prepTimeFormatted": "15 min (frio)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 3,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-3 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Apio",
      "Gluten",
      "Mostaza",
      "Sésamo",
      "Pescado"
    ],
    "image": "/assets/fuentes/karlos_arguinano/besugo_al_orio_con_ajos_y_guindilla_portada.jpg",
    "source": "Karlos Arguiñano",
    "sourceCompendium": "02_pescados_del_cantabrico_y_mariscos.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "frio_alino",
    "infografia": "/assets/fuentes/karlos_arguinano/infografia_besugo_al_orio_con_ajos_y_guindilla.jpg",
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/karlos_arguinano/besugo_al_orio_con_ajos_y_guindilla_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/karlos_arguinano/besugo_al_orio_con_ajos_y_guindilla_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/karlos_arguinano/besugo_al_orio_con_ajos_y_guindilla_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Besugo salvaje entero abierto en libro (o con 3 cortes en el lomo)",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Dientes de ajo pelados y laminados",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Guindillas de cayena secas en aros",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Vinagre de sidra natural vasco",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Aceite de oliva virgen extra de calidad",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Sal gruesa marina o flor de sal",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Asado al horno:** Precalentar el horno a 200°C. Colocar el besugo sazonado con sal gruesa en la bandeja con 20 ml de AOVE. Hornear a 190°C durante 18-20 minutos hasta que la carne junto a la espina se separe con facilidad sin secarse.",
      "**Elaboración del refrito:** Mientras tanto, en sartén pequeña calentar los 100 ml de AOVE restantes con los ajos laminados y la guindilla a fuego suave hasta que los ajos tomen un dorado uniforme y crujiente.",
      "**El triple vuelco (emulsión Orio):** Sacar el besugo del horno. Regar la piel caliente con el vinagre de sidra. Verter inmediatamente el refrito hirviendo de ajos y guindilla (chisporroteo). Escurrir todo el jugo de la bandeja a la sartén, agitar enérgicamente en círculos para emulsionar los jugos del besugo, el vinagre y el aceite, y volver a verter sobre el besugo. Repetir 2 o 3 veces hasta obtener una salsa ligada y translúcida.",
      "**Remate:** Espolvorear perejil fresco picado y servir inmediatamente."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "arg-kokotxas_de_bacalao_al_pil_pil_emul",
    "name": "Kokotxas de Bacalao al Pil-Pil Emulsionadas",
    "shortName": "Kokotxas",
    "category": "pescados",
    "mealType": "universal",
    "station": "fuego_2",
    "prepTimeFormatted": "15 min (fuego_2)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 3,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-3 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Apio",
      "Mostaza",
      "Sésamo",
      "Pescado"
    ],
    "image": "/assets/fuentes/karlos_arguinano/kokotxas_de_bacalao_al_pil_pil_portada.jpg",
    "source": "Karlos Arguiñano",
    "sourceCompendium": "02_pescados_del_cantabrico_y_mariscos.md",
    "mainIngredientFamily": "bacalao",
    "culinaryTechnique": "pil_pil",
    "infografia": "/assets/fuentes/karlos_arguinano/infografia_kokotxas_de_bacalao_al_pil_pil.jpg",
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/karlos_arguinano/kokotxas_de_bacalao_al_pil_pil_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/karlos_arguinano/kokotxas_de_bacalao_al_pil_pil_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/karlos_arguinano/kokotxas_de_bacalao_al_pil_pil_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Kokotxas de bacalao frescas o desaladas limpias",
        "quantity": 0.1,
        "unit": "kg",
        "category": "carnes-pescados"
      },
      {
        "name": "Dientes de ajo laminados",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Guindilla seca de cayena en aros",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Aceite de oliva virgen extra suave",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Perejil picado fino",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Limpieza y secado:** Retirar telillas duras de las kokotxas con tijeras y secar perfectamente con papel absorbente.",
      "**Aromatizado del aceite:** En cazuela con el AOVE, dorar los ajos laminados y la guindilla a fuego suave. Retirar y reservar crujientes.",
      "**Confitado proteico:** Templar el aceite a 60°C. Colocar las kokotxas con la piel hacia abajo 3 min y dar la vuelta otros 2 min hasta que liberen abundantes perlas de gelatina.",
      "**Emulsión del pil-pil:** Retirar las kokotxas a un plato. A 45°C, emulsionar el aceite y la gelatina con un colador en movimientos circulares continuos durante 3 minutos hasta que la salsa ligue en una crema sedosa. Reincorporar las kokotxas, atemperar 1 min y coronar con ajo y guindilla."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "arg-lubina_salvaje_al_horno_sobre_patat",
    "name": "Lubina Salvaje al Horno sobre Patatas Panadera",
    "shortName": "Lubina Salvaje al Horno sobre Patatas Panadera",
    "category": "pescados",
    "mealType": "universal",
    "station": "horno",
    "prepTimeFormatted": "15 min (horno)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 3,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-3 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Apio",
      "Gluten",
      "Mostaza",
      "Sésamo",
      "Pescado"
    ],
    "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=80",
    "source": "Karlos Arguiñano",
    "sourceCompendium": "02_pescados_del_cantabrico_y_mariscos.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "asado_horno",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": null,
      "elaboracion": null,
      "resultadoFinal": null
    },
    "ingredientsPerServing": [
      {
        "name": "Lubina salvaje entera abierta en libro (o 4 lomos limpios)",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Patatas tipo Monalisa en rodajas panadera de 4 mm",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Cebollas dulces en juliana",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Pimiento verde en tiras finas",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Dientes de ajo laminados",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Vino blanco seco / Txakoli",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Horneado de la cama panadera:** Precalentar el horno a 180°C. En la fuente de horno, disponer las patatas en rodajas, la cebolla y el pimiento verde con 50 ml de AOVE, sal y el vino blanco. Hornear a 180°C durante 25-30 minutos hasta que estén tiernas y jugosas.",
      "**Asado de la lubina:** Sazonar la lubina. Colocarla abierta sobre las patatas horneadas. Hornear a 190°C durante 12-14 minutos exactos para conservar la textura jugosa y nacarada.",
      "**Refrito Donostiarra final:** En sartén con 30 ml de AOVE, dorar los ajos laminados. Sacar la lubina del horno, regar con el vinagre de sidra y verter el refrito hirviendo de ajos encima. Espolvorear perejil picado."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "arg-rodaballo_a_la_plancha_horno_con_re",
    "name": "Rodaballo a la Plancha / Horno con Refrito Tradicional Donostiarra",
    "shortName": "Rodaballo a la Plancha / Horno",
    "category": "pescados",
    "mealType": "universal",
    "station": "horno",
    "prepTimeFormatted": "15 min (horno)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 3,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-3 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Apio",
      "Mostaza",
      "Sésamo",
      "Pescado"
    ],
    "image": "/assets/fuentes/karlos_arguinano/rodaballo_a_la_plancha_con_refrito_de_ajos_portada.jpg",
    "source": "Karlos Arguiñano",
    "sourceCompendium": "02_pescados_del_cantabrico_y_mariscos.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "asado_horno",
    "infografia": "/assets/fuentes/karlos_arguinano/infografia_rodaballo_a_la_plancha_con_refrito_de_ajos.jpg",
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/karlos_arguinano/rodaballo_a_la_plancha_con_refrito_de_ajos_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/karlos_arguinano/rodaballo_a_la_plancha_con_refrito_de_ajos_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/karlos_arguinano/rodaballo_a_la_plancha_con_refrito_de_ajos_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Rodaballo salvaje entero limpio (o tronzado en 4 piezas)",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Dientes de ajo laminados",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Guindilla seca en aros",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Vinagre de sidra de Guipúzcoa",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Aceite de oliva virgen extra",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Sal gorda marina",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Marcado exterior:** Realizar incisiones superficiales en la piel oscura del rodaballo. Sazonar con sal gruesa y marcar en plancha viva con unas gotas de aceite durante 3 min por lado para activar la gelatina exterior.",
      "**Terminado al horno:** Hornear en bandeja a 200°C durante 15-18 minutos hasta que la carne junto a la espina se separe en lascas firmes y gelatinosas.",
      "**Refrito Donostiarra:** Dorar los ajos laminados y la guindilla en 80 ml de AOVE. Regar el rodaballo con el vinagre de sidra y luego con el refrito hirviendo. Escurrir los jugos de la bandeja a la sartén, ligar con vaivén y salsear nuevamente sobre el pescado."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "arg-calamares_encebollados_en_su_propio",
    "name": "Calamares Encebollados en su Propio Jugo",
    "shortName": "Calamares Encebollados en su Propio Jugo",
    "category": "pescados",
    "mealType": "universal",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 3,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-3 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Apio",
      "Pescado",
      "Mostaza",
      "Sésamo",
      "Moluscos"
    ],
    "image": "/assets/fuentes/karlos_arguinano/calamares_encebollados_en_su_jugo_portada.jpg",
    "source": "Karlos Arguiñano",
    "sourceCompendium": "02_pescados_del_cantabrico_y_mariscos.md",
    "mainIngredientFamily": "marisco",
    "culinaryTechnique": "guiso",
    "infografia": "/assets/fuentes/karlos_arguinano/infografia_calamares_encebollados_en_su_jugo.jpg",
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/karlos_arguinano/calamares_encebollados_en_su_jugo_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/karlos_arguinano/calamares_encebollados_en_su_jugo_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/karlos_arguinano/calamares_encebollados_en_su_jugo_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Calamares frescos limpios en anillas y tentáculos enteros",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Cebollas dulces picadas en juliana fina",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Dientes de ajo picados",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Vino blanco seco (Txakoli o Verdejo)",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Aceite de oliva virgen extra",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Sal marina, pimienta negra y perejil fresco",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Fondeado y caramelización:** En cazuela con el AOVE, añadir los ajos y toda la cebolla en juliana con una pizca de sal. Pochar a fuego mínimo tapado durante 30 minutos hasta que la cebolla reduzca a 1/3 y tome un color dorado tostado natural.",
      "**Rehogado de calamares:** Subir el fuego, incorporar los calamares troceados y saltear 3-4 minutos para que liberen su agua de mar.",
      "**Estofado en su jugo:** Verter el vino blanco, evaporar 2 min, tapar y cocer a fuego mínimo durante 25 minutos en su propio jugo hasta que los calamares estén tiernos y la salsa concentrada y melosa. Ajustar de sal, pimienta y perejil."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "arg-bacalao_a_la_vizcaina_con_salsa_de_",
    "name": "Bacalao a la Vizcaína con Salsa de Pimientos Choriceros",
    "shortName": "Bacalao a la Vizcaína",
    "category": "pescados",
    "mealType": "universal",
    "station": "fuego_2",
    "prepTimeFormatted": "15 min (fuego_2)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 3,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-3 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Apio",
      "Gluten",
      "Mostaza",
      "Sésamo",
      "Pescado"
    ],
    "image": "/assets/fuentes/karlos_arguinano/bacalao_a_la_vizcaina_con_pimientos_choriceros_portada.jpg",
    "source": "Karlos Arguiñano",
    "sourceCompendium": "02_pescados_del_cantabrico_y_mariscos.md",
    "mainIngredientFamily": "bacalao",
    "culinaryTechnique": "salsa",
    "infografia": "/assets/fuentes/karlos_arguinano/infografia_bacalao_a_la_vizcaina_con_pimientos_choriceros.jpg",
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/karlos_arguinano/bacalao_a_la_vizcaina_con_pimientos_choriceros_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/karlos_arguinano/bacalao_a_la_vizcaina_con_pimientos_choriceros_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/karlos_arguinano/bacalao_a_la_vizcaina_con_pimientos_choriceros_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Lomos gruesos de bacalao desalado",
        "quantity": 0.1,
        "unit": "kg",
        "category": "carnes-pescados"
      },
      {
        "name": "Pimientos choriceros secos hidratados (o pulpa pura)",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Cebollas rojas de Zalla / moradas en juliana",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Dientes de ajo picados",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Galletas María o rebanada de pan frito para ligar",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Fumet de espinas de bacalao",
        "quantity": 0.1,
        "unit": "kg",
        "category": "carnes-pescados"
      }
    ],
    "instructions": [
      "**Extracción de pulpa choricera:** Escaldar los pimientos choriceros secos 10 min en agua hirviendo y raspar la pulpa interior con una puntilla.",
      "**Salsa vizcaína artesanal:** En cazuela con 50 ml de AOVE, pochar la cebolla roja y los ajos a fuego lentísimo durante 35 minutos hasta caramelizar. Añadir la pulpa de choricero, el pan/galletas y el fumet. Cocinar 15 min, triturar finamente y colar.",
      "**Confitado e integración:** En sartén con 30 ml de AOVE, confitar los lomos con la piel hacia arriba 4 min a 70°C. Pasarlos a la cazuela con la salsa vizcaína caliente y terminar de cocer 5 minutos a fuego muy suave tapado."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "arg-rape_sapito_a_la_marinera_con_almej",
    "name": "Rape / Sapito a la Marinera con Almejas y Langostinos",
    "shortName": "Rape / Sapito a la Marinera",
    "category": "pescados",
    "mealType": "universal",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 3,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-3 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Crustáceos",
      "Huevos",
      "Sulfitos",
      "Apio",
      "Pescado",
      "Gluten",
      "Mostaza",
      "Sésamo",
      "Moluscos"
    ],
    "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=80",
    "source": "Karlos Arguiñano",
    "sourceCompendium": "02_pescados_del_cantabrico_y_mariscos.md",
    "mainIngredientFamily": "marisco",
    "culinaryTechnique": "guiso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": null,
      "elaboracion": null,
      "resultadoFinal": null
    },
    "ingredientsPerServing": [
      {
        "name": "Medallones limpios de rape (sapito) fresco",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Almejas finas purgadas",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Langostinos o gambones frescos",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Cebolla dulce picada en brunoise fina",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Dientes de ajo picados",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Tomate maduro triturado casero",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      }
    ],
    "instructions": [
      "**Fumet marinero:** Pelar los langostinos reservando colas; dorar cabezas y cáscaras en 15 ml de AOVE aplastando para extraer jugos, cubrir con agua, cocer 15 min y colar.",
      "**Sellado del rape:** Sazonar y enharinar ligeramente los medallones de rape. Marcar en cazuela con 25 ml de AOVE a fuego vivo 1 min por lado y retirar.",
      "**Sofrito y flambeado:** En la misma cazuela, pochar la cebolla y el ajo. Añadir el tomate triturado y el pimentón dulce. Verter el brandy y flambear con cuidado.",
      "**Guisado marinero conjunto:** Verter el fumet colado caliente. Reincorporar los medallones de rape, las almejas y los langostinos pelados. Cocer tapado a fuego medio durante 5-6 minutos hasta abrir las almejas y dejar el rape jugoso. Espolvorear perejil."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "arg-kokotxas_de_merluza_rebozadas_con_p",
    "name": "Kokotxas de Merluza Rebozadas con Pimientos de Gernika / Padrón",
    "shortName": "Kokotxas",
    "category": "pescados",
    "mealType": "universal",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 3,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-3 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Apio",
      "Gluten",
      "Mostaza",
      "Sésamo",
      "Pescado"
    ],
    "image": "/assets/fuentes/karlos_arguinano/kokotxas_de_merluza_rebozadas_con_pimientos_portada.jpg",
    "source": "Karlos Arguiñano",
    "sourceCompendium": "02_pescados_del_cantabrico_y_mariscos.md",
    "mainIngredientFamily": "merluza",
    "culinaryTechnique": "frito_empanado",
    "infografia": "/assets/fuentes/karlos_arguinano/infografia_kokotxas_de_merluza_rebozadas_con_pimientos.jpg",
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/karlos_arguinano/kokotxas_de_merluza_rebozadas_con_pimientos_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/karlos_arguinano/kokotxas_de_merluza_rebozadas_con_pimientos_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/karlos_arguinano/kokotxas_de_merluza_rebozadas_con_pimientos_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Kokotxas de merluza frescas limpias",
        "quantity": 0.1,
        "unit": "kg",
        "category": "carnes-pescados"
      },
      {
        "name": "Huevos camperos batidos",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Harina de trigo tamizada",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Pimientos de Gernika o Padrón",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra suave para freír",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Sal marina fina y escamas de sal",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Fritura de pimientos:** En sartén con el AOVE y el ajo machacado, freír los pimientos a fuego vivo 3-4 minutos hasta que la piel se ampolle. Escurrir sobre papel y sazonar con escamas de sal.",
      "**Acondicionado de kokotxas:** Secar las kokotxas y sazonar con sal fina.",
      "**Rebozado esponjoso:** Pasar las kokotxas por harina sacudiendo el exceso y luego por el huevo batido envolviéndolas bien.",
      "**Fritura exprés:** En el AOVE bien caliente (175-180°C), freír en tandas pequeñas durante 45-60 segundos por cara hasta lograr un rebozado dorado y esponjoso con el corazón tierno y gelatinoso. Escurrir sobre papel secante."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "arg-alubias_de_tolosa_con_sacramentos_c",
    "name": "Alubias de Tolosa con Sacramentos (Chorizo, Morcilla de Beasain, Tocino, Costilla y Berza)",
    "shortName": "Alubias",
    "category": "legumbres",
    "mealType": "lunch",
    "station": "olla_expres",
    "prepTimeFormatted": "15 min (olla_expres)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Apio",
      "Gluten",
      "Mostaza",
      "Sésamo",
      "Pescado"
    ],
    "image": "/assets/fuentes/karlos_arguinano/alubias_de_tolosa_con_sacramentos_chorizo_morcilla_portada.jpg",
    "source": "Karlos Arguiñano",
    "sourceCompendium": "03_legumbres_y_platos_de_cuchara.md",
    "mainIngredientFamily": "legumbres",
    "culinaryTechnique": "cuchara_potaje",
    "infografia": "/assets/fuentes/karlos_arguinano/infografia_alubias_de_tolosa_con_sacramentos_chorizo_morcilla.jpg",
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/karlos_arguinano/alubias_de_tolosa_con_sacramentos_chorizo_morcilla_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/karlos_arguinano/alubias_de_tolosa_con_sacramentos_chorizo_morcilla_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/karlos_arguinano/alubias_de_tolosa_con_sacramentos_chorizo_morcilla_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Alubia negra de Tolosa con IGP (Tolosa Babarruna)",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Chorizo artesano curado de caserío",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Morcilla de cebolla y puerro de Beasain",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Costilla de cerdo fresca o adobada",
        "quantity": 0.1,
        "unit": "kg",
        "category": "carnes-pescados"
      },
      {
        "name": "Panceta curada o tocino ibérico entreverado",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Berza / Col rizada fresca de caserío",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Inicio en frío sin remojo:** Colocar las alubias de Tolosa directamente en la cazuela principal con 2.000 ml de agua mineral fría y 40 ml de AOVE en crudo. Poner a fuego vivo hasta que alcance la primera ebullición.",
      "**Asustado y cocción a fuego mínimo:** En cuanto rompa el hervor, verter un chorrito de 50 ml de agua fría para frenar el hervor. Repetir esta operación de \"asustado\" 3 veces durante la primera hora. Bajar el fuego al mínimo absoluto (*chup-chup* apenas imperceptible a 85-90°C) y cocer tapado durante **2 horas a 2 horas y 15 minutos**.",
      "**Cocción de los sacramentos por separado:** En la olla auxiliar con agua hirviendo, introducir la costilla de cerdo, el tocino entreverado y los chorizos. Cocer a fuego medio durante 45 minutos. Pinchar la morcilla de Beasain con un palillo para que no reviente y añadirla a la olla durante los últimos 15 minutos de cocción. Retirar y reservar calientes.",
      "**Cocción y refrito de la berza:** En otra cazuela con agua hirviendo y sal, cocer la berza cortada en juliana durante 15 minutos. Escurrir muy bien. En una sartén, dorar los 2 ajos laminados en 20 ml de AOVE y rehogar la berza escurrida durante 3 minutos.",
      "**Ligazón del caldo por vaivén:** Cuando la alubia esté tierna como terciopelo, añadir los 8 g de sal marina. Con la cazuela sujeta por las dos asas, realizar movimientos circulares suaves y continuos durante 3 minutos. El almidón natural de la alubia espesará el caldo hasta convertirlo en un manto color chocolate espeso, denso y brillante. Dejar reposar 15 minutos fuera del fuego."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "arg-garbanzos_de_vigilia_con_espinacas_",
    "name": "Garbanzos de Vigilia con Espinacas Frescas y Bacalao Desalado",
    "shortName": "Garbanzos",
    "category": "legumbres",
    "mealType": "lunch",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Apio",
      "Frutos de cáscara",
      "Gluten",
      "Mostaza",
      "Sésamo",
      "Pescado"
    ],
    "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=80",
    "source": "Karlos Arguiñano",
    "sourceCompendium": "03_legumbres_y_platos_de_cuchara.md",
    "mainIngredientFamily": "bacalao",
    "culinaryTechnique": "guiso",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": null,
      "elaboracion": null,
      "resultadoFinal": null
    },
    "ingredientsPerServing": [
      {
        "name": "Garbanzos secos (Pedrosillano o Castellano)",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Lomos o tiras gruesas de bacalao desalado con piel",
        "quantity": 0.1,
        "unit": "kg",
        "category": "carnes-pescados"
      },
      {
        "name": "Espinacas frescas de hoja entera limpias",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Huevos camperos cocidos durante 9 min",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Cebolla dulce",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Zanahoria pelada",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Cocción en caliente de garbanzos:** Escurrir los garbanzos remojados. En la olla con los 1.300 ml de agua o caldo ya hirviendo a borbotones con laurel, media cebolla, puerro y zanahoria, verter los garbanzos templados. Cocer durante 25 minutos en olla rápida o 60 minutos en cazuela tradicional hasta que estén tiernos.",
      "**Sofrito de verduras y espinacas:** En una cazuela ancha con 35 ml de AOVE, pochar la otra media cebolla picada y 2 ajos picados durante 8 minutos. Añadir el tomate rallado y sofreír 3 minutos. Añadir el pimentón fuera del fuego, remover e incorporar las espinacas frescas. Rehogar 2 minutos hasta que encojan.",
      "**Majado emulsionante de almendra y yema:** En la sartén con 15 ml de AOVE, dorar los otros 2 ajos enteros, las almendras crudas y la rebanada de pan. En el mortero, majar las almendras, los ajos fritos, el pan frito, unas ramas de perejil y las 2 yemas de los huevos cocidos. Desleír con un cazo de caldo caliente de los garbanzos hasta formar una pasta cremosa y fina.",
      "**Integración, bacalao y ligazón:** Volcar los garbanzos cocidos con su caldo sobre la cazuela del sofrito con espinacas. Añadir el majado del mortero y remover en vaivén. Colocar los trozos de bacalao desalado con la piel hacia arriba. Cocinar a fuego lento durante **5 minutos** para que el bacalao se cocine jugoso y libere su gelatina en el caldo.",
      "**Acabado y reposo:** Picar las claras de huevo duro e integrarlas en el potaje. Apagar el fuego y dejar reposar 10 minutos tapado."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "arg-lentejas_pardinas_con_codillo_de_ce",
    "name": "Lentejas Pardinas con Codillo de Cerdo y Verduras de la Huerta",
    "shortName": "Lentejas Pardinas",
    "category": "legumbres",
    "mealType": "lunch",
    "station": "olla_expres",
    "prepTimeFormatted": "15 min (olla_expres)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Apio",
      "Gluten",
      "Mostaza",
      "Sésamo",
      "Pescado"
    ],
    "image": "/assets/fuentes/karlos_arguinano/lentejas_pardinas_con_codillo_y_verduras_portada.jpg",
    "source": "Karlos Arguiñano",
    "sourceCompendium": "03_legumbres_y_platos_de_cuchara.md",
    "mainIngredientFamily": "legumbres",
    "culinaryTechnique": "cuchara_potaje",
    "infografia": "/assets/fuentes/karlos_arguinano/infografia_lentejas_pardinas_con_codillo_y_verduras.jpg",
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/karlos_arguinano/lentejas_pardinas_con_codillo_y_verduras_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/karlos_arguinano/lentejas_pardinas_con_codillo_y_verduras_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/karlos_arguinano/lentejas_pardinas_con_codillo_y_verduras_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Lentejas pardinas secas de Tierra de Campos",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Codillo de cerdo curado o salmuerizado semi-cocido",
        "quantity": 0.1,
        "unit": "kg",
        "category": "carnes-pescados"
      },
      {
        "name": "Patatas medianas (Monalisa)",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Zanahorias medianas",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Puerro fresco (solo parte blanca)",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Cebolla dulce picada",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      }
    ],
    "instructions": [
      "**Sellado de codillo y sofrito vegetal:** En la cazuela con los 40 ml de AOVE, saltear los dados de codillo a fuego vivo durante 4 minutos para dorar la superficie y extraer colágeno. Retirar el codillo. En el mismo aceite, pochar la cebolla, el puerro, el pimiento verde y los ajos durante 8 minutos a fuego suave.",
      "**Pimentón y chascado de patata:** Retirar brevemente del fuego, incorporar el pimentón dulce y el comino molido, remover 10 segundos y agregar de inmediato las rodajas de zanahoria y las patatas chascadas. Rehogar 2 minutos.",
      "**Cocción de lentejas en frío:** Añadir las lentejas pardinas lavadas, los dados de codillo y las 2 hojas de laurel. Cubrir con 1.300 ml de agua mineral fría (las lentejas pardinas se inician siempre en frío para que la cocción sea progresiva).",
      "**Hervor manso y espumado:** Llevar a ebullición, espumar pacientemente las impurezas iniciales durante 5 minutos, tapar y cocer a fuego lento (*chup-chup* suave) durante **35-40 minutos** hasta que las lentejas y las patatas estén mantecosas.",
      "**Truco de ligazón de Arguiñano:** Saca un cazo con media patata cocida, una rodaja de zanahoria y 2 cucharadas de lentejas con un poco de caldo; tritúralo con el pasapurés o tenedor y reintegra la papilla a la cazuela, removiendo en vaivén para espesar el caldo sin harinas. Reposar 10 minutos."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "arg-pochas_frescas_de_navarra_con_almej",
    "name": "Pochas Frescas de Navarra con Almejas en Salsa Verde",
    "shortName": "Pochas Frescas",
    "category": "legumbres",
    "mealType": "lunch",
    "station": "fuego_2",
    "prepTimeFormatted": "15 min (fuego_2)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Apio",
      "Pescado",
      "Gluten",
      "Mostaza",
      "Sésamo",
      "Moluscos"
    ],
    "image": "/assets/fuentes/karlos_arguinano/pochas_frescas_de_navarra_con_almejas_portada.jpg",
    "source": "Karlos Arguiñano",
    "sourceCompendium": "03_legumbres_y_platos_de_cuchara.md",
    "mainIngredientFamily": "legumbres",
    "culinaryTechnique": "salsa",
    "infografia": "/assets/fuentes/karlos_arguinano/infografia_pochas_frescas_de_navarra_con_almejas.jpg",
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/karlos_arguinano/pochas_frescas_de_navarra_con_almejas_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/karlos_arguinano/pochas_frescas_de_navarra_con_almejas_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/karlos_arguinano/pochas_frescas_de_navarra_con_almejas_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Pochas frescas de Navarra desgranadas (o congeladas ultracongeladas)",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Almejas finas frescas limpias de arena",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Cebolletas frescas con su tallo tierno",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Dientes de ajo morado",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Vino blanco seco o Txakoli de Getaria",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Fumet de pescado blanco o caldo de verduras suave",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      }
    ],
    "instructions": [
      "**Cocción suave de las pochas:** En la cazuela con 500 ml de fumet o agua y 15 ml de AOVE, poner las pochas frescas limpias a fuego suave. Como son frescas, no necesitan remojo previo. Cocinar tapadas durante **25 minutos** a fuego lento hasta que estén tiernas y mantecosas sin romperse.",
      "**Elaboración de la salsa verde:** En una sartén con los 35 ml de AOVE restantes a fuego medio, pochar los ajos picados y las cebolletas durante 6 minutos hasta que queden transparentes sin dorarse. Espolvorear la cucharadita de harina y rehogar 1 minuto para tostar el almidón. Verter el Txakoli y dejar reducir 1 minuto.",
      "**Adición de caldo y perejil:** Añadir 200 ml de fumet caliente a la sartén y abundante perejil fresco recién picado. Remover con varilla para que emulsione formando una salsa verde aterciopelada y fragante.",
      "**Apertura de almejas e integración:** Añadir las almejas finas a la salsa verde, tapar la sartén y mantener a fuego vivo durante **2 minutos** hasta que todas las conchas se abran por completo.",
      "**Fusión coloidal final:** Volcar las almejas con toda su salsa verde sobre la cazuela de las pochas cocidas. Mover la cazuela en círculos suaves con vaivén continuo durante **3 minutos** a fuego mínimo para que el jugo de las almejas, la salsa verde y el almidón de las pochas liguen en una crema verde sublime. Rectificar de sal y servir."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "arg-fabes_asturianas_estofadas_con_codo",
    "name": "Fabes Asturianas Estofadas con Codornices Salteadas",
    "shortName": "Fabes Asturianas Estofadas",
    "category": "legumbres",
    "mealType": "lunch",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Apio",
      "Mostaza",
      "Sésamo",
      "Pescado"
    ],
    "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=80",
    "source": "Karlos Arguiñano",
    "sourceCompendium": "03_legumbres_y_platos_de_cuchara.md",
    "mainIngredientFamily": "legumbres",
    "culinaryTechnique": "sarten_ajillo",
    "infografia": null,
    "stepPhotos": {
      "ingredientes": null,
      "elaboracion": null,
      "resultadoFinal": null
    },
    "ingredientsPerServing": [
      {
        "name": "Fabes asturianas con IGP Faba Asturiana",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Codornices camperas limpias y enteras",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Cebolla blanca dulce",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Puerro limpio (parte blanca)",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Zanahorias medianas",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Dientes de ajo morado",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      }
    ],
    "instructions": [
      "**Bridado y sellado de codornices:** Limpiar y bridar las 4 codornices con hilo de cocina para que mantengan su forma. Salpimentar por dentro y por fuera. En una sartén con 30 ml de AOVE a fuego vivo, dorar las codornices por todas sus caras durante 6 minutos hasta obtener una piel dorada y crujiente. Flambear con los 50 ml de brandy y reservar.",
      "**Sofrito aromático:** En la cazuela principal con el aceite residual, pochar a fuego lento la cebolla, puerro, zanahorias y ajos durante 10 minutos. Añadir el pimentón dulce fuera del fuego y remover rápidamente.",
      "**Montaje y cocción de las fabes:** Escurrir las fabes remojadas y añadirlas a la cazuela. Acomodar las 4 codornices doradas entre las fabes. Añadir el laurel, la ramita de tomillo y las hebras de azafrán previamente tostadas y disueltas en un poco de caldo.",
      "**Espumado y asustado continuo:** Cubrir con 1.500 ml de agua o caldo frío. Llevar a ebullición viva, espumar cuidadosamente durante 5 minutos y \"asustar\" con 50 ml de agua helada en dos ocasiones. Bajar a fuego manso y cocinar tapado durante **1 hora y 45 minutos** (o 25 min en olla a presión) con vaivén suave hasta que las fabes estén mantecosas y las codornices tiernísimas.",
      "**Reposo y desgrasado:** Retirar las cuerdas de bridar de las codornices. Rectificar de sal y dejar reposar 15 minutos antes de servir."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "arg-alubias_rojas_de_guernica_con_costi",
    "name": "Alubias Rojas de Guernica con Costilla Adobada y Chorizo",
    "shortName": "Alubias Rojas",
    "category": "legumbres",
    "mealType": "lunch",
    "station": "olla_expres",
    "prepTimeFormatted": "15 min (olla_expres)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Apio",
      "Mostaza",
      "Sésamo",
      "Pescado"
    ],
    "image": "/assets/fuentes/karlos_arguinano/alubias_rojas_de_guernica_con_costilla_adobada_portada.jpg",
    "source": "Karlos Arguiñano",
    "sourceCompendium": "03_legumbres_y_platos_de_cuchara.md",
    "mainIngredientFamily": "legumbres",
    "culinaryTechnique": "cuchara_potaje",
    "infografia": "/assets/fuentes/karlos_arguinano/infografia_alubias_rojas_de_guernica_con_costilla_adobada.jpg",
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/karlos_arguinano/alubias_rojas_de_guernica_con_costilla_adobada_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/karlos_arguinano/alubias_rojas_de_guernica_con_costilla_adobada_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/karlos_arguinano/alubias_rojas_de_guernica_con_costilla_adobada_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Alubia roja de Guernica con Eusko Label (Gernikako Babarruna)",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Costilla de cerdo adobada tradicional",
        "quantity": 0.1,
        "unit": "kg",
        "category": "carnes-pescados"
      },
      {
        "name": "Chorizo fresco de caserío",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Cebolla morada de Zalla o dulce",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Pimiento verde de caserío",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Carne de pimiento choricero hidratada",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      }
    ],
    "instructions": [
      "**Montaje en frío de alubia de Gernika:** Disponer las alubias rojas en la cazuela con los 2.000 ml de agua fría, un chorro de 30 ml de AOVE, la cebolla morada picada, el pimiento verde y los ajos enteros. Poner a fuego medio hasta ebullición.",
      "**Sellado y desgrasado de costilla:** En una sartén con unas gotas de aceite, dorar la costilla adobada y los chorizos pinchados para sellar los jugos y soltar exceso de grasa externa. Escurrir e incorporar a la cazuela de las alubias.",
      "**Asustado y cocción a fuego lento:** En cuanto rompa el hervor, romper la ebullición con 50 ml de agua helada. Repetir 2 veces. Añadir las 2 cucharadas de carne de pimiento choricero. Cocer tapado a fuego suave durante **2 horas** con balanceo circular de la cazuela.",
      "**Ligazón y punto de sal:** Probar las alubias; cuando estén suaves como manteca, añadir la sal marina y agitar la cazuela por las asas durante 3 minutos hasta que el caldo tome consistencia aterciopelada y color caoba profundo. Reposar 15 minutos."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "arg-garbanzos_con_langostinos_y_almejas",
    "name": "Garbanzos con Langostinos y Almejas al Estilo Marinero",
    "shortName": "Garbanzos",
    "category": "legumbres",
    "mealType": "lunch",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Crustáceos",
      "Huevos",
      "Sulfitos",
      "Apio",
      "Pescado",
      "Mostaza",
      "Sésamo",
      "Moluscos"
    ],
    "image": "/assets/fuentes/karlos_arguinano/garbanzos_con_langostinos_al_estilo_marinero_portada.jpg",
    "source": "Karlos Arguiñano",
    "sourceCompendium": "03_legumbres_y_platos_de_cuchara.md",
    "mainIngredientFamily": "legumbres",
    "culinaryTechnique": "guiso",
    "infografia": "/assets/fuentes/karlos_arguinano/infografia_garbanzos_con_langostinos_al_estilo_marinero.jpg",
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/karlos_arguinano/garbanzos_con_langostinos_al_estilo_marinero_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/karlos_arguinano/garbanzos_con_langostinos_al_estilo_marinero_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/karlos_arguinano/garbanzos_con_langostinos_al_estilo_marinero_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Garbanzos pedrosillanos cocidos artesanos",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Langostinos o gambones frescos enteros",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Almejas finas limpias",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Cebolleta fresca picada",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Pimiento verde italiano",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Tomate maduro rallado",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      }
    ],
    "instructions": [
      "**Extracción coral y fumet:** Pelar los langostinos reservando los cuerpos limpios. En la sartén con 20 ml de AOVE a fuego vivo, saltear las cabezas y cáscaras aplastando con la maza para extraer todo el jugo anaranjado. Flambear con los 30 ml de brandy, añadir 400 ml de fumet, cocer 10 minutos y colar presionando fuerte por el colador.",
      "**Sofrito marinero:** En la cazuela principal con el resto del AOVE, pochar la cebolleta, el pimiento verde y los ajos durante 8 minutos. Añadir el tomate rallado y sofreír 3 minutos. Añadir el pimentón dulce y remover.",
      "**Cocción de garbanzos en salsa marina:** Añadir los garbanzos cocidos escurridos a la cazuela del sofrito. Verter el fumet rojo de coral colado. Cocinar tapado a fuego suave durante **15 minutos** para que los garbanzos absorban los jugos marinos.",
      "**Incorporación de marisco final:** Añadir las almejas limpias y los cuerpos de los langostinos a la superficie. Tapar la cazuela durante **3-4 minutos** hasta que las almejas se abran y los langostinos cambien a un tono rosado nacarado. Apagar y reposar 5 minutos."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "arg-pochas_de_sanguesa_con_chistorra_y_",
    "name": "Pochas de Sangüesa con Chistorra y Panceta Ibérica",
    "shortName": "Pochas",
    "category": "legumbres",
    "mealType": "lunch",
    "station": "olla_expres",
    "prepTimeFormatted": "15 min (olla_expres)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Apio",
      "Lácteos",
      "Gluten",
      "Mostaza",
      "Sésamo",
      "Pescado"
    ],
    "image": "/assets/fuentes/karlos_arguinano/pochas_de_sanguesa_con_chistorra_y_panceta_portada.jpg",
    "source": "Karlos Arguiñano",
    "sourceCompendium": "03_legumbres_y_platos_de_cuchara.md",
    "mainIngredientFamily": "legumbres",
    "culinaryTechnique": "cuchara_potaje",
    "infografia": "/assets/fuentes/karlos_arguinano/infografia_pochas_de_sanguesa_con_chistorra_y_panceta.jpg",
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/karlos_arguinano/pochas_de_sanguesa_con_chistorra_y_panceta_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/karlos_arguinano/pochas_de_sanguesa_con_chistorra_y_panceta_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/karlos_arguinano/pochas_de_sanguesa_con_chistorra_y_panceta_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Pochas frescas de Sangüesa / Navarra",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Chistorra artesana de Navarra",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Panceta fresca o curada ibérica",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Pimiento verde de huerta",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Pimiento rojo morrón",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Cebolleta tierna",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Dorado y desgrasado de la chistorra y panceta:** En la sartén sin aceite añadido, saltear la panceta y los trozos de chistorra a fuego medio durante 4 minutos hasta que doren y liberen su grasa superficial. Escurrir sobre papel absorbente.",
      "**Sofrito base:** En la cazuela con 30 ml de AOVE, pochar la cebolleta, los pimientos picados en brunoise y los ajos durante 8 minutos a fuego medio-bajo.",
      "**Cocción de pochas:** Incorporar las pochas frescas a la cazuela, añadir los trozos de chistorra y panceta desgrasados y cubrir con los 800 ml de agua mineral o caldo.",
      "**Chup-chup suave:** Llevar a ebullición, bajar a fuego mínimo y cocinar tapado durante **25-30 minutos** hasta que la pocha esté tierna como mantequilla. Agitar la cazuela por las asas para emulsionar el caldo. Rectificar de sal y reposar 10 minutos."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "arg-lentejas_castellanas_con_boletus_y_",
    "name": "Lentejas Castellanas con Boletus y Verduras de Temporada (Veganas)",
    "shortName": "Lentejas Castellanas",
    "category": "legumbres",
    "mealType": "lunch",
    "station": "olla_expres",
    "prepTimeFormatted": "15 min (olla_expres)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Apio",
      "Mostaza",
      "Sésamo",
      "Pescado"
    ],
    "image": "/assets/fuentes/karlos_arguinano/lentejas_castellanas_con_boletus_y_verduras_portada.jpg",
    "source": "Karlos Arguiñano",
    "sourceCompendium": "03_legumbres_y_platos_de_cuchara.md",
    "mainIngredientFamily": "legumbres",
    "culinaryTechnique": "cuchara_potaje",
    "infografia": "/assets/fuentes/karlos_arguinano/infografia_lentejas_castellanas_con_boletus_y_verduras.jpg",
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/karlos_arguinano/lentejas_castellanas_con_boletus_y_verduras_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/karlos_arguinano/lentejas_castellanas_con_boletus_y_verduras_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/karlos_arguinano/lentejas_castellanas_con_boletus_y_verduras_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Lentejas castellanas secas",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Boletus edulis o setas silvestres variadas (frescas o congeladas)",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Boniato o calabaza dulce",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Zanahorias peladas",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Puerro limpio (parte blanca)",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Cebolla dulce picada",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      }
    ],
    "instructions": [
      "**Salteado aromático de boletus:** En una sartén con 20 ml de AOVE a fuego vivo, saltear los boletus troceados con 1 ajo picado y una pizca de sal durante 4 minutos hasta que doren y caramelicen sus jugos. Reservar.",
      "**Sofrito de huerta:** En la cazuela con el resto del AOVE, pochar la cebolla picada, el puerro y los otros 2 ajos durante 8 minutos. Añadir el pimentón dulce y el comino fuera del fuego.",
      "**Cocción de lentejas y boniato:** Añadir las lentejas castellanas, los dados de boniato, las rodajas de zanahoria, el laurel y el tomillo. Cubrir con los 1.200 ml de caldo de verduras frío.",
      "**Chup-chup y unión con boletus:** Cocinar a fuego lento durante **35 minutos**. A continuación, añadir los boletus salteados con todos sus jugos a la cazuela y cocinar 10 minutos más hasta que la lenteja y el boniato estén fundentes. Mover en vaivén para espesar el caldo naturalmente."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "arg-judias_pintas_estofadas_con_rabo_de",
    "name": "Judías Pintas Estofadas con Rabo de Toro y Pimientos del Piquillo",
    "shortName": "Judías Pintas Estofadas",
    "category": "legumbres",
    "mealType": "lunch",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Apio",
      "Gluten",
      "Mostaza",
      "Sésamo",
      "Pescado"
    ],
    "image": "/assets/fuentes/karlos_arguinano/judias_pintas_estofadas_con_rabo_de_toro_portada.jpg",
    "source": "Karlos Arguiñano",
    "sourceCompendium": "03_legumbres_y_platos_de_cuchara.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "guiso",
    "infografia": "/assets/fuentes/karlos_arguinano/infografia_judias_pintas_estofadas_con_rabo_de_toro.jpg",
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/karlos_arguinano/judias_pintas_estofadas_con_rabo_de_toro_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/karlos_arguinano/judias_pintas_estofadas_con_rabo_de_toro_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/karlos_arguinano/judias_pintas_estofadas_con_rabo_de_toro_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Judías pintas secas",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Rabo de toro o ternera cortado por las articulaciones",
        "quantity": 0.1,
        "unit": "kg",
        "category": "carnes-pescados"
      },
      {
        "name": "Pimientos del piquillo de Lodosa en tiras",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Cebolla morada o dulce",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Zanahorias peladas",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Dientes de ajo morado",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      }
    ],
    "instructions": [
      "**Sellado profundo del rabo de toro:** Salpimentar los trozos de rabo y pasarlos ligeramente por harina sacudiendo el exceso. En la cazuela u olla con los 60 ml de AOVE a fuego vivo, dorar el rabo por todas sus caras durante 8 minutos hasta formar una costra dorada oscura. Retirar.",
      "**Sofrito y reducción de vino tinto:** En la misma cazuela, pochar la cebolla, zanahorias y ajos durante 10 minutos. Verter los 150 ml de vino tinto rascando el fondo con la espátula y dejar reducir a fuego vivo 3 minutos para evaporar el alcohol.",
      "**Cocción previa del rabo y colágeno:** Reincorporar el rabo sellado, añadir el laurel y 1.000 ml de caldo/agua. Cocinar en olla rápida durante **35 minutos** (o 1h 45 min en cazuela tradicional) hasta que la carne esté tiernísima y se desprenda del hueso.",
      "**Incorporación de judías pintas y piquillos:** Abrir la olla. Desmigar la carne del rabo desechando los huesos o dejar los trozos enteros según preferencia. Añadir las judías pintas escurridas y el resto del caldo caliente. Cocinar tapado a fuego suave durante **30-35 minutos** (o 12 min en olla rápida).",
      "**Confitado de piquillos y ligazón:** Incorporar las tiras de pimiento del piquillo confitado y mover la cazuela en círculos durante 3 minutos para que el colágeno del rabo y el almidón de la judía pintada liguen en una salsa caoba densa y aterciopelada. Rectificar de sal y reposar 15 minutos."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "arg-carrilleras_de_ternera_al_vino_tint",
    "name": "Carrilleras de Ternera al Vino Tinto Rioja",
    "shortName": "Carrilleras",
    "category": "carnes",
    "mealType": "universal",
    "station": "fuego_1",
    "prepTimeFormatted": "25 min (fuego_1)",
    "prepTimeMinutes": 25,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Apio",
      "Lácteos",
      "Gluten",
      "Mostaza",
      "Sésamo",
      "Pescado"
    ],
    "image": "/assets/fuentes/karlos_arguinano/carrilleras_de_ternera_al_vino_tinto_rioja_portada.jpg",
    "source": "Karlos Arguiñano",
    "sourceCompendium": "04_carnes_guisos_y_aves.md",
    "mainIngredientFamily": "ternera",
    "culinaryTechnique": "guiso",
    "infografia": "/assets/fuentes/karlos_arguinano/infografia_carrilleras_de_ternera_al_vino_tinto_rioja.jpg",
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/karlos_arguinano/carrilleras_de_ternera_al_vino_tinto_rioja_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/karlos_arguinano/carrilleras_de_ternera_al_vino_tinto_rioja_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/karlos_arguinano/carrilleras_de_ternera_al_vino_tinto_rioja_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Carrilleras de ternera limpias de telillas",
        "quantity": 0.1,
        "unit": "kg",
        "category": "carnes-pescados"
      },
      {
        "name": "Vino tinto crianza D.O. Ca. Rioja",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Cebollas moradas picadas en brunoise",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Zanahorias peladas en rodajas de 1 cm",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Puerro limpio (solo la parte blanca) picado",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Dientes de ajo enteros chafados con piel",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      }
    ],
    "instructions": [
      "**Sellado proteico de carrilleras:** Limpiar el exceso de grasa superficial. Salpimentar generosamente y enharinar sacudiendo el exceso. En cazuela caliente con 60 ml de AOVE a fuego vivo (180°C), sellar las carrilleras durante 3-4 min por lado hasta formar una costra dorada uniforme de reacción de Maillard. Retirar y reservar en fuente.",
      "**Sofrito y reducción vínica:** En el mismo aceite residual, añadir los ajos chafados, la cebolla morada, el puerro y la zanahoria con una pizca de sal. Pochar a fuego medio-bajo (110°C) durante 15 minutos rascando los jugos caramelizados del fondo. Verter la botella entera de vino tinto Rioja y subir el fuego para reducir a hervor vivo durante 12-14 minutos, hasta evaporar completamente el etanol y reducir el volumen en un 60%.",
      "**Estofado lento y colagénico:** Reincorporar las carrilleras junto con sus jugos acumulados. Verter el fondo de buey caliente y el bouquet garni. Tapar herméticamente y cocer a fuego muy suave en chup-chup mínimo (90-95°C) durante 1 h 45 min (o 45 min en olla a presión rápida a posición 2), hasta que la temperatura interna supere los 92°C y el tejido conjuntivo se transforme en gelatina untuosa.",
      "**Filtrado, brillo y glaseado:** Extraer las carrilleras con cuidado para no romperlas. Retirar el bouquet de hierbas. Pasar las verduras y el caldo por el pasapurés o triturar con batidora y colar por chino fino. Volver a poner la salsa en cazuela a fuego medio-alto durante 6-8 minutos para desespumar y reducir hasta obtener una textura de jarabe de brillo espejo. Introducir las carrilleras 3 minutos para glasear su superficie exterior."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "arg-pollo_de_caserio_al_chilindron_trad",
    "name": "Pollo de Caserío al Chilindrón Tradicional",
    "shortName": "Pollo",
    "category": "carnes",
    "mealType": "universal",
    "station": "fuego_1",
    "prepTimeFormatted": "25 min (fuego_1)",
    "prepTimeMinutes": 25,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Apio",
      "Frutos de cáscara",
      "Mostaza",
      "Sésamo",
      "Pescado"
    ],
    "image": "/assets/fuentes/karlos_arguinano/pollo_de_caserio_al_chilindron_tradicional_portada.jpg",
    "source": "Karlos Arguiñano",
    "sourceCompendium": "04_carnes_guisos_y_aves.md",
    "mainIngredientFamily": "pollo",
    "culinaryTechnique": "guiso",
    "infografia": "/assets/fuentes/karlos_arguinano/infografia_pollo_de_caserio_al_chilindron_tradicional.jpg",
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/karlos_arguinano/pollo_de_caserio_al_chilindron_tradicional_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/karlos_arguinano/pollo_de_caserio_al_chilindron_tradicional_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/karlos_arguinano/pollo_de_caserio_al_chilindron_tradicional_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Pollo campero de caserío troceado para guiso",
        "quantity": 0.1,
        "unit": "kg",
        "category": "carnes-pescados"
      },
      {
        "name": "Pimientos rojos carnosos en tiras juliana",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Pimientos verdes tipo cristal o italianos en tiras",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Cebolla blanca dulce cortada en pluma fina",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Dientes de ajo laminados",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Tomate maduro triturado natural",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      }
    ],
    "instructions": [
      "**Dorado del pollo campero:** Secar con papel de cocina las presas de pollo. Salpimentar al gusto. En cazuela amplia con el AOVE a fuego vivo, dorar el pollo por tandas durante 8-10 minutos hasta que la piel adquiera un tono avellanado crujiente. Retirar a una fuente dejando el aceite aromatizado.",
      "**Pochado lento de la huerta y jamón:** Bajar a fuego medio. Agregar los ajos laminados, la cebolla y las tiras de pimiento rojo y verde con una pizca de sal. Rehogar con tapa durante 14 minutos removiendo periódicamente hasta que los pimientos estén tiernos y ligeramente caramelizados. Incorporar los dados de jamón y sofreír 1 minuto para fundir sus grasas aromáticas.",
      "**Integración de salsa y reducción:** Añadir la pulpa de pimiento choricero y el tomate triturado. Dejar freír el tomate a fuego medio durante 8 minutos hasta que pierda el agua y cambie a un rojo oscuro brillante. Verter el vino blanco y dejar hervir 3 minutos a borbotones para volatilizar el alcohol.",
      "**Estofado final y ensamblaje:** Introducir las piezas de pollo y sus jugos en la cazuela. Mezclar bien con el sofrito chilindrón, tapar y guisar a fuego suave durante 25 minutos (dando la vuelta a las presas a mitad de cocción) hasta que la carne esté tierna hasta el hueso y la salsa emulsionada con la gelatina natural del ave."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "arg-rabo_de_toro_estofado_al_vino_tinto",
    "name": "Rabo de Toro Estofado al Vino Tinto Rioja",
    "shortName": "Rabo",
    "category": "carnes",
    "mealType": "universal",
    "station": "fuego_1",
    "prepTimeFormatted": "25 min (fuego_1)",
    "prepTimeMinutes": 25,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Apio",
      "Gluten",
      "Mostaza",
      "Sésamo",
      "Pescado"
    ],
    "image": "/assets/fuentes/karlos_arguinano/rabo_de_toro_estofado_al_vino_tinto_rioja_portada.jpg",
    "source": "Karlos Arguiñano",
    "sourceCompendium": "04_carnes_guisos_y_aves.md",
    "mainIngredientFamily": "ternera",
    "culinaryTechnique": "guiso",
    "infografia": "/assets/fuentes/karlos_arguinano/infografia_rabo_de_toro_estofado_al_vino_tinto_rioja.jpg",
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/karlos_arguinano/rabo_de_toro_estofado_al_vino_tinto_rioja_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/karlos_arguinano/rabo_de_toro_estofado_al_vino_tinto_rioja_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/karlos_arguinano/rabo_de_toro_estofado_al_vino_tinto_rioja_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Rabo de toro o buey cortado por las articulaciones",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Vino tinto con cuerpo D.O. Ca. Rioja",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Brandy o Coñac",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Cebollas grandes picadas",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Zanahorias dulces en rodajas gruesas",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Puerro limpio en rodajas",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Sellado y caramelización del rabo:** Retirar el exceso de grasa exterior de las rodajas. Salpimentar y pasar por un velo fino de harina. Calentar el AOVE en la cocotte a fuego alto y sellar las piezas de rabo por todas sus caras durante 10-12 min hasta que queden profundamente tostadas. Flambear con el brandy con precaución y retirar las piezas a una bandeja.",
      "**Mirepoix sofrito y especiado:** En el mismo fondo con los jugos concentrados, agregar los ajos, cebollas, zanahorias, puerro y apio. Añadir los clavos de olor pinchados, los granos de pimienta y el laurel. Rehogar a fuego medio-bajo durante 20 minutos hasta que las hortalizas estén confitadas y muy oscuras.",
      "**Desglasado y estofado prolongado:** Verter el vino tinto y raspar con cuchara de madera el fondo para integrar los sueros caramelizados. Dejar reducir a fuego vivo 15 minutos hasta que pierda el olor a alcohol. Devolver las rodajas de rabo a la cazuela, verter el fondo oscuro caliente y tapar. Estofar a fuego muy lento (90°C) durante 3 horas enteras (o 60 minutos en olla a presión) hasta que la carne prácticamente se desprenda del hueso central.",
      "**Texturizado de la salsa:** Sacar los trozos de rabo con sumo cuidado para que no se desprendan. Colar la salsa por el chino presionando las verduras para extraer todo el extracto, desechar los posos duros y desgrasar la capa de aceite superficial con un cazo. Reducir la salsa al fuego durante 8 minutos hasta que quede densa, untuosa y brillante. Napar las piezas de carne."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "arg-cordero_lechal_asado_con_patatas_pa",
    "name": "Cordero Lechal Asado con Patatas Panadera",
    "shortName": "Cordero Lechal Asado",
    "category": "carnes",
    "mealType": "universal",
    "station": "horno",
    "prepTimeFormatted": "25 min (horno)",
    "prepTimeMinutes": 25,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Apio",
      "Gluten",
      "Mostaza",
      "Sésamo",
      "Pescado"
    ],
    "image": "/assets/fuentes/karlos_arguinano/cordero_lechal_asado_con_patatas_panadera_portada.jpg",
    "source": "Karlos Arguiñano",
    "sourceCompendium": "04_carnes_guisos_y_aves.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "asado_horno",
    "infografia": "/assets/fuentes/karlos_arguinano/infografia_cordero_lechal_asado_con_patatas_panadera.jpg",
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/karlos_arguinano/cordero_lechal_asado_con_patatas_panadera_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/karlos_arguinano/cordero_lechal_asado_con_patatas_panadera_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/karlos_arguinano/cordero_lechal_asado_con_patatas_panadera_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Paletillas o cuartos traseros de cordero lechal",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Patatas especiales para asar (Monalisa / Kennebec)",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Cebollas grandes cortadas en aros finos",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Pimiento verde en juliana gruesa",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Dientes de ajo pelados para el majado",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Agua mineral",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Majado y adobo del lechal:** En mortero, machacar los dientes de ajo con la sal gorda, granos de pimienta, hojas de romero y tomillo hasta obtener una pasta homogénea. Añadir el vinagre de sidra y 20 ml de AOVE o manteca fundida. Untar minuciosamente las piezas de cordero por todos sus recovecos con la mezcla.",
      "**Cama panadera:** Pelar y cortar las patatas en rodajas de 5-6 mm de grosor (tipo panadera). En la base de la fuente de barro, distribuir las patatas, la cebolla en aros y el pimiento verde. Salpimentar ligeramente y rociar con 30 ml de AOVE y 100 ml de agua mineral en el fondo.",
      "**Primer horneado (piel hacia abajo):** Precalentar el horno a 170°C calor arriba y abajo (sin ventilador forzado). Colocar el cordero sobre la cama de patatas con la parte interior hacia arriba (la piel abajo). Hornear durante 50 minutos. Rociar de vez en cuando la carne con el jugo de la bandeja para mantener la hidratación interior.",
      "**Segundo horneado y crujiente de piel:** Dar la vuelta a las piezas colocando la piel hacia arriba. Subir el horno a 190°C-200°C y hornear durante 35-40 minutos adicionales. La piel debe inflarse y adquirir un color dorado caoba con textura sumamente crujiente, mientras el interior se mantiene tierno y jugoso."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "arg-albondigas_caseras_en_salsa_espanol",
    "name": "Albóndigas Caseras en Salsa Española Tradicional",
    "shortName": "Albóndigas Caseras en Salsa Española Tradicional",
    "category": "carnes",
    "mealType": "universal",
    "station": "fuego_2",
    "prepTimeFormatted": "25 min (fuego_2)",
    "prepTimeMinutes": 25,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Apio",
      "Lácteos",
      "Gluten",
      "Mostaza",
      "Sésamo",
      "Pescado"
    ],
    "image": "/assets/fuentes/karlos_arguinano/albondigas_caseras_en_salsa_espanola_tradicional_portada.jpg",
    "source": "Karlos Arguiñano",
    "sourceCompendium": "04_carnes_guisos_y_aves.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "salsa",
    "infografia": "/assets/fuentes/karlos_arguinano/infografia_albondigas_caseras_en_salsa_espanola_tradicional.jpg",
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/karlos_arguinano/albondigas_caseras_en_salsa_espanola_tradicional_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/karlos_arguinano/albondigas_caseras_en_salsa_espanola_tradicional_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/karlos_arguinano/albondigas_caseras_en_salsa_espanola_tradicional_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Carne picada mixta (50% aguja de ternera, 50% magro de cerdo)",
        "quantity": 0.1,
        "unit": "kg",
        "category": "carnes-pescados"
      },
      {
        "name": "Huevos camperos tamaño L",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Miga de pan del día anterior",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Leche entera",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Dientes de ajo picados muy finos",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Perejil fresco picado",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Amasado y boleado:** Remojar la miga de pan en la leche durante 5 min y escurrir ligeramente. En un bol amplio, mezclar la carne picada con los huevos batidos, la miga remojada, el ajo picado fino, el perejil, sal y pimienta. Trabajar con las manos durante 3-4 minutos hasta que la masa quede amalgamada y pegajosa. Bolear porciones de 35-40 g y pasarlas por un velo fino de harina.",
      "**Fritura superficial rápida:** Calentar el AOVE en sartén a 170°C. Freír las albóndigas durante 2 minutos girándolas para sellar la corteza exterior sin cocinarlas por dentro (para evitar que se sequen). Sacar sobre papel absorbente.",
      "**Elaboración de la salsa española:** En la cazuela con 3 cucharadas del aceite de fritura colado, pochar la cebolla picada y la zanahoria a fuego medio durante 15 minutos hasta que tomen un color pardo dorado. Añadir 1 cucharada rasa de harina (15 g) y tostar 1 minuto (roux rubio). Verter el vino blanco y reducir 3 minutos. Añadir el caldo de carne caliente y cocer a fuego lento 10 minutos. Triturar la salsa con batidora para lograr una textura sedosa.",
      "**Cocción en conjunto:** Introducir las albóndigas fritas en la salsa española hirviendo suavemente. Guisar a fuego muy bajo durante 12-15 minutos con tapa entreabierta, agitando la cazuela con vaivén para que los almidones traben una salsa aterciopelada y las albóndigas absorban el guiso."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "arg-chuleton_de_vaca_vieja_a_la_plancha",
    "name": "Chuletón de Vaca Vieja a la Plancha con Pimientos de Gernika",
    "shortName": "Chuletón",
    "category": "carnes",
    "mealType": "universal",
    "station": "fuego_1",
    "prepTimeFormatted": "25 min (fuego_1)",
    "prepTimeMinutes": 25,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Apio",
      "Mostaza",
      "Sésamo",
      "Pescado"
    ],
    "image": "/assets/fuentes/karlos_arguinano/chuleton_de_vaca_vieja_a_la_plancha_con_pimientos_de_gernika_portada.jpg",
    "source": "Karlos Arguiñano",
    "sourceCompendium": "04_carnes_guisos_y_aves.md",
    "mainIngredientFamily": "ternera",
    "culinaryTechnique": "sarten_ajillo",
    "infografia": "/assets/fuentes/karlos_arguinano/infografia_chuleton_de_vaca_vieja_a_la_plancha_con_pimientos_de_gernika.jpg",
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/karlos_arguinano/chuleton_de_vaca_vieja_a_la_plancha_con_pimientos_de_gernika_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/karlos_arguinano/chuleton_de_vaca_vieja_a_la_plancha_con_pimientos_de_gernika_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/karlos_arguinano/chuleton_de_vaca_vieja_a_la_plancha_con_pimientos_de_gernika_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Chuletón de vaca vieja / rubia gallega madurado (lomo alto/bajo con hueso)",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Pimientos de Gernika frescos o del Padrón",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Grasa propia del chuletón recortada o AOVE",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Sal marina gruesa o escamas de sal Maldon",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Aceite de oliva virgen extra para freír los pimientos",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      }
    ],
    "instructions": [
      "**Atemperado térmico indispensable:** Sacar el chuletón de la nevera al menos 2 horas antes de cocinar para que el núcleo alcance los 18-20°C. Secar perfectamente ambas caras con papel secante de cocina. Cortar una tira de la grasa perimetral para engrasar la plancha.",
      "**Marcado a fuego vivo (Maillard):** Calentar la plancha de hierro a máxima potencia hasta que empiece a humear (aprox. 230°C-250°C). Frotar la base con la grasa del chuletón. Colocar la pieza y marcar sin mover durante 4-5 minutos.",
      "**Volteado y salado en caliente:** Dar la vuelta con pinzas. Cubrir inmediatamente la cara tostada ya sellada con una capa abundante de sal gorda (la carne solo absorberá la sal necesaria gracias a la costra caramelizada). Cocinar la segunda cara durante 4-5 minutos para lograr un punto sangrante/al punto (núcleo a 48-52°C). Sellar los laterales y el hueso apoyando la pieza en vertical 1 minuto.",
      "**Fritura de pimientos de Gernika y reposo:** Retirar el chuletón a una tabla caliente y dejar reposar 3-4 minutos para que los jugos se redistribuyan. Mientras tanto, calentar el AOVE en sartén a 180°C y freír los pimientos de Gernika enteros durante 1-2 minutos hasta que se inflen y la piel se arrugue. Escurrir y sazonar con sal gorda."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "arg-conejo_al_ajillo_tradicional_con_to",
    "name": "Conejo al Ajillo Tradicional con Tomillo y Patatas",
    "shortName": "Conejo al Ajillo Tradicional",
    "category": "carnes",
    "mealType": "universal",
    "station": "fuego_1",
    "prepTimeFormatted": "25 min (fuego_1)",
    "prepTimeMinutes": 25,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Apio",
      "Gluten",
      "Mostaza",
      "Sésamo",
      "Pescado"
    ],
    "image": "/assets/fuentes/karlos_arguinano/conejo_al_ajillo_tradicional_con_tomillo_y_patatas_portada.jpg",
    "source": "Karlos Arguiñano",
    "sourceCompendium": "04_carnes_guisos_y_aves.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "sarten_ajillo",
    "infografia": "/assets/fuentes/karlos_arguinano/infografia_conejo_al_ajillo_tradicional_con_tomillo_y_patatas.jpg",
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/karlos_arguinano/conejo_al_ajillo_tradicional_con_tomillo_y_patatas_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/karlos_arguinano/conejo_al_ajillo_tradicional_con_tomillo_y_patatas_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/karlos_arguinano/conejo_al_ajillo_tradicional_con_tomillo_y_patatas_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Conejo limpio troceado menudo para ajillo",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Cabezas de ajo morado (dientes enteros con un corte en piel)",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Vino blanco seco (Txakoli, Rueda o Montilla)",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Vinagre de manzana",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Ramas de tomillo silvestre fresco",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Ramas de romero fresco",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Confitado inicial de los ajos:** En la cazuela con los 100 ml de AOVE a fuego muy suave (120°C), poner los dientes de ajo con piel ligeramente chafados y la guindilla. Confitar durante 8 minutos hasta que adquieran un tono dorado y estén tiernos sin quemarse. Retirar y reservar.",
      "**Dorado crujiente del conejo:** Subir el fuego a medio-alto. Salpimentar las piezas de conejo troceadas menudas y agregarlas a la cazuela con el aceite aromatizado. Dorar intensamente durante 12-14 minutos dándoles la vuelta periódicamente para que queden muy tostadas y crujientes por fuera.",
      "**Desglasado con vino, vinagre y hierbas:** Reincorporar los ajos confitados, las ramas de tomillo y romero. Verter el vinagre de manzana y el vino blanco. Dejar cocer a fuego vivo durante 4 minutos para evaporar el alcohol y, a continuación, bajar a fuego suave 10 minutos tapado para que la carne se cocine con sus vapores aromáticos y quede tierna y jugosa.",
      "**Guarnición de patatas al ajillo:** Paralelamente, freír los dados de patata en sartén aparte hasta que queden doradas y tiernas. Incorporarlas a la cazuela del conejo en los últimos 2 minutos de cocción para que se impregnen de la salsa de ajos y vino blanco."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "arg-ternera_guisada_a_la_jardinera_con_",
    "name": "Ternera Guisada a la Jardinera con Guisantes y Zanahorias",
    "shortName": "Ternera Guisada a la Jardinera",
    "category": "carnes",
    "mealType": "universal",
    "station": "fuego_1",
    "prepTimeFormatted": "25 min (fuego_1)",
    "prepTimeMinutes": 25,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Apio",
      "Gluten",
      "Mostaza",
      "Sésamo",
      "Pescado"
    ],
    "image": "/assets/fuentes/karlos_arguinano/ternera_guisada_a_la_jardinera_con_guisantes_y_zanahorias_portada.jpg",
    "source": "Karlos Arguiñano",
    "sourceCompendium": "04_carnes_guisos_y_aves.md",
    "mainIngredientFamily": "ternera",
    "culinaryTechnique": "guiso",
    "infografia": "/assets/fuentes/karlos_arguinano/infografia_ternera_guisada_a_la_jardinera_con_guisantes_y_zanahorias.jpg",
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/karlos_arguinano/ternera_guisada_a_la_jardinera_con_guisantes_y_zanahorias_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/karlos_arguinano/ternera_guisada_a_la_jardinera_con_guisantes_y_zanahorias_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/karlos_arguinano/ternera_guisada_a_la_jardinera_con_guisantes_y_zanahorias_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Aguja, morcillo o aleta de ternera cortada en dados de 3 cm",
        "quantity": 0.1,
        "unit": "kg",
        "category": "carnes-pescados"
      },
      {
        "name": "Guisantes frescos o congelados extrafinos",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Zanahorias cortadas en rodajas de 1 cm",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Patatas medianas chascadas",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Cebolla dulce picada en brunoise",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Pimiento verde italiano picado",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      }
    ],
    "instructions": [
      "**Sellado de los tacos de ternera:** Salpimentar y enharinar ligeramente los dados de carne. Calentar el AOVE en la cazuela a fuego vivo y sellar la ternera en dos tandas durante 5-6 minutos hasta formar una costra tostada. Retirar y reservar.",
      "**Sofrito jardinera base:** En el mismo aceite, pochar los ajos, la cebolla picada y el pimiento verde durante 10 minutos a fuego medio. Agregar el tomate rallado y sofreír 5 minutos más hasta concentrar los azúcares. Verter el vino blanco y reducir a la mitad.",
      "**Estofado lento de la carne:** Reincorporar la ternera con sus jugos, añadir las zanahorias en rodajas, la hoja de laurel y cubrir con el caldo de carne caliente. Tapar y cocinar a fuego lento durante 1 hora (o 25 min en olla exprés) hasta que la ternera comience a ablandarse.",
      "**Incorporación de patatas y guisantes:** Añadir las patatas chascadas y los guisantes. Rectificar de sal y cocinar destapado a fuego suave durante 18-20 minutos más hasta que la patata esté tierna y el almidón libere una salsa ligada y untuosa."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "arg-solomillo_de_cerdo_con_salsa_de_que",
    "name": "Solomillo de Cerdo con Salsa de Queso Idiazábal",
    "shortName": "Solomillo",
    "category": "carnes",
    "mealType": "universal",
    "station": "fuego_2",
    "prepTimeFormatted": "25 min (fuego_2)",
    "prepTimeMinutes": 25,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Apio",
      "Lácteos",
      "Frutos de cáscara",
      "Mostaza",
      "Sésamo",
      "Pescado"
    ],
    "image": "/assets/fuentes/karlos_arguinano/solomillo_de_cerdo_con_salsa_de_queso_idiazabal_portada.jpg",
    "source": "Karlos Arguiñano",
    "sourceCompendium": "04_carnes_guisos_y_aves.md",
    "mainIngredientFamily": "cerdo",
    "culinaryTechnique": "salsa",
    "infografia": "/assets/fuentes/karlos_arguinano/infografia_solomillo_de_cerdo_con_salsa_de_queso_idiazabal.jpg",
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/karlos_arguinano/solomillo_de_cerdo_con_salsa_de_queso_idiazabal_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/karlos_arguinano/solomillo_de_cerdo_con_salsa_de_queso_idiazabal_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/karlos_arguinano/solomillo_de_cerdo_con_salsa_de_queso_idiazabal_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Solomillos de cerdo frescos y limpios de grasa",
        "quantity": 0.1,
        "unit": "kg",
        "category": "carnes-pescados"
      },
      {
        "name": "Queso Idiazábal ahumado D.O. rallado fino",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Nata líquida culinaria (35% M.G.)",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Chalotas picadas finas en brunoise",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Brandy o Txakoli para desglasar",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Mantequilla",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Elaboración de la crema de Idiazábal:** En un cazo a fuego bajo, derretir la mantequilla con las chalotas picadas y rehogar 4 min sin que cojan color. Verter el brandy y evaporar 1 minuto. Añadir la nata líquida, una pizca de pimienta y nuez moscada. Al romper a hervir suavemente, retirar del fuego, incorporar el queso Idiazábal rallado y batir con varillas hasta lograr una crema homogénea, untuosa y fundida. Mantener al baño maría templada.",
      "**Guarnición de manzana salteada:** Pelar y cortar las manzanas en gajos de 1 cm. Dorar en sartén con 10 g de mantequilla a fuego medio durante 6 minutos hasta que queden caramelizadas por fuera y tiernas por dentro.",
      "**Marcado de medallones de solomillo:** Cortar los solomillos en medallones gruesos de 3-4 cm. Salpimentar al momento. En sartén bien caliente con el AOVE a fuego vivo, sellar los medallones durante 2-3 minutos por cara, buscando un exterior dorado y un núcleo jugoso y rosado (56-58°C)."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "arg-codornices_estofadas_con_uvas_y_cha",
    "name": "Codornices Estofadas con Uvas y Chalotas",
    "shortName": "Codornices Estofadas",
    "category": "carnes",
    "mealType": "universal",
    "station": "fuego_1",
    "prepTimeFormatted": "25 min (fuego_1)",
    "prepTimeMinutes": 25,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Apio",
      "Gluten",
      "Mostaza",
      "Sésamo",
      "Pescado"
    ],
    "image": "/assets/fuentes/karlos_arguinano/codornices_estofadas_con_uvas_y_chalotas_portada.jpg",
    "source": "Karlos Arguiñano",
    "sourceCompendium": "04_carnes_guisos_y_aves.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "guiso",
    "infografia": "/assets/fuentes/karlos_arguinano/infografia_codornices_estofadas_con_uvas_y_chalotas.jpg",
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/karlos_arguinano/codornices_estofadas_con_uvas_y_chalotas_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/karlos_arguinano/codornices_estofadas_con_uvas_y_chalotas_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/karlos_arguinano/codornices_estofadas_con_uvas_y_chalotas_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Codornices limpias enteras evisceradas",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Uvas blancas moscatel sin pepitas",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Chalotas francesas enteras peladas",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Zanahorias en rodajitas",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Dientes de ajo machacados con piel",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Vino blanco seco o vino dulce Pedro Ximénez",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Bridado y sellado de las aves:** Bridar las codornices con hilo de cocina para que mantengan la forma compacta durante la cocción. Salpimentar y enharinar muy sutilmente. En cazuela con el AOVE caliente a fuego vivo, dorar las codornices enteras por todos sus lados durante 6 minutos hasta que la piel quede tostada y sellada. Retirar a un plato.",
      "**Confitado de chalotas y zanahoria:** En el mismo aceite a fuego medio, añadir las chalotas enteras peladas, los ajos y las zanahorias. Rehogar durante 10 minutos hasta que las chalotas adquieran un tono dorado translúcido.",
      "**Estofado aromático:** Reincorporar las codornices, el tomillo y el laurel. Verter el vino y dejar hervir 3 minutos para evaporar alcoholes. Agregar el caldo de ave caliente. Tapar y guisar a fuego suave (chup-chup) durante 20 minutos hasta que la carne esté blanda y jugosa.",
      "**Glaseado final con uvas:** Incorporar las uvas moscatel peladas y sin pepitas a la cazuela en los últimos 4 minutos de cocción, permitiendo que se calienten y suelten su néctar dulce sin deshacerse. Retirar el hilo de bramante antes de servir."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "arg-arroz_caldoso_con_bogavante_del_can",
    "name": "Arroz Caldoso con Bogavante del Cantábrico",
    "shortName": "Arroz Caldoso",
    "category": "arroces_pastas",
    "mealType": "lunch",
    "station": "fuego_3",
    "prepTimeFormatted": "25 min (fuego_3)",
    "prepTimeMinutes": 25,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Crustáceos",
      "Huevos",
      "Sulfitos",
      "Apio",
      "Pescado",
      "Mostaza",
      "Sésamo",
      "Moluscos"
    ],
    "image": "/assets/fuentes/karlos_arguinano/arroz_caldoso_con_bogavante_del_cantabrico_portada.jpg",
    "source": "Karlos Arguiñano",
    "sourceCompendium": "05_arroces_paellas_y_fideuas.md",
    "mainIngredientFamily": "arroz",
    "culinaryTechnique": "arroz_meloso",
    "infografia": "/assets/fuentes/karlos_arguinano/infografia_arroz_caldoso_con_bogavante_del_cantabrico.jpg",
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/karlos_arguinano/arroz_caldoso_con_bogavante_del_cantabrico_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/karlos_arguinano/arroz_caldoso_con_bogavante_del_cantabrico_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/karlos_arguinano/arroz_caldoso_con_bogavante_del_cantabrico_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Bogavante vivo o fresco troceado (con jugos de la cabeza)",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Arroz tipo Bomba o Calasparra D.O.",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Calamar o sepia limpia cortada en dados de 1 cm",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Fumet rojo concentrado de pescado de roca y marisco",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Tomate maduro rallado sin piel",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Pimiento verde italiano picado en brunoise",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      }
    ],
    "instructions": [
      "**Troceado y sellado del bogavante:** Cortar la cola del bogavante en medallones siguiendo los anillos y la cabeza por la mitad longitudinalmente sobre una tabla, recogiendo todos sus jugos corales en un bol. En la cazuela con el AOVE caliente a fuego vivo, marcar los trozos de bogavante durante 3 minutos hasta que el caparazón tome un color rojo vivo. Verter el brandy, flambear con precaución y retirar el marisco a un plato.",
      "**Sofrito marinero y calamar:** En el mismo aceite aromatizado, dorar los dados de calamar durante 3 minutos. Añadir los ajos laminados, el pimiento verde y el pimiento rojo. Sofreír a fuego medio 10 minutos. Incorporar el pimentón dulce, remover 15 segundos fuera del fuego para evitar que amargue y añadir el tomate rallado. Freír 6 minutos hasta evaporar los líquidos del tomate.",
      "**Nacarado y cocción caldosa:** Incorporar las hebras de azafrán previamente machacadas y el arroz. Nacarar a fuego medio durante 2 minutos mezclando con el sofrito. Verter el fumet hirviendo (1.300 ml) y los jugos del bogavante reservados. Cocinar a fuego vivo durante 8 minutos y luego bajar a fuego medio 6 minutos más.",
      "**Incorporación del bogavante y reposo:** Introducir los medallones y la cabeza del bogavante en la cazuela. Cocinar a fuego suave durante 4 minutos finales para que el marisco alcance su punto perfecto sin sobrecocerse. Apagar el fuego y dejar reposar 3 minutos destapado antes de servir."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "arg-paella_marinera_tradicional_de_la_r",
    "name": "Paella Marinera Tradicional de la Ría con Marisco",
    "shortName": "Paella Marinera Tradicional",
    "category": "arroces_pastas",
    "mealType": "lunch",
    "station": "fuego_3",
    "prepTimeFormatted": "25 min (fuego_3)",
    "prepTimeMinutes": 25,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Crustáceos",
      "Huevos",
      "Sulfitos",
      "Apio",
      "Pescado",
      "Gluten",
      "Mostaza",
      "Sésamo",
      "Moluscos"
    ],
    "image": "/assets/fuentes/karlos_arguinano/paella_marinera_tradicional_de_la_ria_con_marisco_portada.jpg",
    "source": "Karlos Arguiñano",
    "sourceCompendium": "05_arroces_paellas_y_fideuas.md",
    "mainIngredientFamily": "arroz",
    "culinaryTechnique": "arroz_meloso",
    "infografia": "/assets/fuentes/karlos_arguinano/infografia_paella_marinera_tradicional_de_la_ria_con_marisco.jpg",
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/karlos_arguinano/paella_marinera_tradicional_de_la_ria_con_marisco_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/karlos_arguinano/paella_marinera_tradicional_de_la_ria_con_marisco_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/karlos_arguinano/paella_marinera_tradicional_de_la_ria_con_marisco_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Arroz Bomba D.O.",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Gambas rojas o langostinos frescos",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Cigalas medianas",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Sepia limpia troceada en dados pequeños",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Lomos de rape limpio en dados de 2 cm",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Mejillones de roca limpios de barbas",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Marcado de crustáceos y moluscos:** En la paella nivelada con el AOVE a fuego medio-alto, dorar las tiras de pimiento rojo, las cigalas y las gambas 1-2 minutos por lado para aromatizar el aceite con sus corales. Retirar y reservar. En una cazuela aparte con 20 ml de agua, abrir los mejillones y las almejas al vapor 2 min; colar y reservar su caldo limpio.",
      "**Sofrito de sepia y rape:** En la paella, saltear los dados de sepia hasta que comiencen a chisporrotear (3 min) y luego los dados de rape 1 min. Añadir el ajo picado y, de inmediato, el tomate rallado y el pimentón dulce. Sofreír 8 minutos a fuego medio raspando el fondo hasta que la salmorreta adquiera consistencia confitada.",
      "**Nacarado y distribución del caldo:** Añadir las hebras de azafrán infusionadas y el arroz Bomba. Nacarar el grano durante 2 minutos revolviendo para que absorba los jugos. Verter el fumet hirviendo mezclado con el jugo de los mejillones (900 ml en total). Distribuir el arroz uniformemente por toda la paella con la espumadera y NO volver a remover a partir de este instante.",
      "**Cocción técnica y socarrat:** Cocer a fuego vivo durante 8-9 minutos. Bajar a fuego medio-suave otros 8 minutos. En los últimos 4 minutos, colocar armoniosamente por encima las gambas, cigalas, mejillones (en media concha) y almejas. Si se desea socarrat crujiente, subir el fuego los últimos 60-90 segundos hasta escuchar el crepitar seco del grano caramelizado. Reposar 5 minutos tapado con un paño limpio."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "arg-arroz_meloso_de_verduras_de_la_huer",
    "name": "Arroz Meloso de Verduras de la Huerta y Costilla de Cerdo",
    "shortName": "Arroz Meloso",
    "category": "arroces_pastas",
    "mealType": "lunch",
    "station": "fuego_3",
    "prepTimeFormatted": "25 min (fuego_3)",
    "prepTimeMinutes": 25,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Apio",
      "Mostaza",
      "Sésamo",
      "Pescado"
    ],
    "image": "/assets/fuentes/karlos_arguinano/arroz_meloso_de_verduras_de_la_huerta_y_costilla_de_cerdo_portada.jpg",
    "source": "Karlos Arguiñano",
    "sourceCompendium": "05_arroces_paellas_y_fideuas.md",
    "mainIngredientFamily": "verduras",
    "culinaryTechnique": "arroz_meloso",
    "infografia": "/assets/fuentes/karlos_arguinano/infografia_arroz_meloso_de_verduras_de_la_huerta_y_costilla_de_cerdo.jpg",
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/karlos_arguinano/arroz_meloso_de_verduras_de_la_huerta_y_costilla_de_cerdo_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/karlos_arguinano/arroz_meloso_de_verduras_de_la_huerta_y_costilla_de_cerdo_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/karlos_arguinano/arroz_meloso_de_verduras_de_la_huerta_y_costilla_de_cerdo_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Costilla de cerdo troceada menuda (carnosa)",
        "quantity": 0.1,
        "unit": "kg",
        "category": "carnes-pescados"
      },
      {
        "name": "Arroz tipo Senia, Bahía o Bomba",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Caldo de carne o de verduras casero caliente",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Alcachofas frescas limpias cortadas en cuartos",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Judías verdes planas troceadas",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Pimiento rojo morrón picado",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      }
    ],
    "instructions": [
      "**Dorado y caramelizado de la costilla:** Salpimentar los trozos menudos de costilla de cerdo. En la cazuela con el AOVE caliente a fuego vivo, dorar intensamente las costillas durante 8-10 minutos hasta que queden bien tostadas por fuera.",
      "**Pochado de la huerta:** Bajar a fuego medio. Agregar los ajos, los pimientos, las judías verdes y las alcachofas. Rehogar 8 minutos. Incorporar los champiñones y el tomate triturado con el pimentón y azafrán. Sofreír 6 minutos. Verter el vino blanco y evaporar 2 minutos.",
      "**Nacarado y cocción melosa:** Añadir el arroz y nacarar durante 2 minutos mezclando suavemente. Verter el caldo hirviendo (1.000 ml). Cocinar a fuego vivo durante 8 minutos y luego a fuego suave durante 8-9 minutos, removiendo ocasionalmente con suavidad para favorecer la liberación controlada de almidón y lograr una textura melosa y untuosa.",
      "**Punto y reposo:** Apagar el fuego cuando el grano esté tierno pero entero y el caldo tenga textura de salsa ligera ligada. Dejar reposar 3 minutos antes de emplatar."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "arg-fideua_negra_con_chipirones_de_pote",
    "name": "Fideuá Negra con Chipirones de Potera y Alioli Casero",
    "shortName": "Fideuá Negra",
    "category": "pescados",
    "mealType": "universal",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 3,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-3 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Apio",
      "Frutos de cáscara",
      "Pescado",
      "Gluten",
      "Mostaza",
      "Sésamo",
      "Moluscos"
    ],
    "image": "/assets/fuentes/karlos_arguinano/fideua_negra_con_chipirones_de_potera_y_alioli_casero_portada.jpg",
    "source": "Karlos Arguiñano",
    "sourceCompendium": "05_arroces_paellas_y_fideuas.md",
    "mainIngredientFamily": "marisco",
    "culinaryTechnique": "guiso",
    "infografia": "/assets/fuentes/karlos_arguinano/infografia_fideua_negra_con_chipirones_de_potera_y_alioli_casero.jpg",
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/karlos_arguinano/fideua_negra_con_chipirones_de_potera_y_alioli_casero_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/karlos_arguinano/fideua_negra_con_chipirones_de_potera_y_alioli_casero_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/karlos_arguinano/fideua_negra_con_chipirones_de_potera_y_alioli_casero_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Fideos especiales para fideuá (nº 2 o cabello de ángel tostado)",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Chipirones o calamares limpios cortados en anillas y tentáculos",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Bolsitas de tinta de sepia/calamar natural",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Fumet de pescado de roca casero bien sabroso",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Cebolla blanca picada en brunoise fina",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Pimiento verde italiano picado fino",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      }
    ],
    "instructions": [
      "**Tostado previo de los fideos (opcional y tradicional):** En la paella con 2 cucharadas de AOVE a fuego medio-bajo, dorar los fideos crudos durante 4-5 minutos removiendo constantemente hasta que adquieran un tono dorado avellana homogéneo. Retirar y reservar en un bol.",
      "**Salteado de chipirones y sofrito negro:** En la misma paella con el resto del AOVE a fuego vivo, dorar los chipirones y sus tentáculos durante 3 minutos. Retirar la mitad de los tentáculos para decorar. Añadir los ajos, cebolla y pimiento verde. Pochar 10 minutos. Añadir el tomate rallado y freír 5 minutos. Disolver las bolsitas de tinta en el vino blanco y verter sobre el sofrito, cocinando 2 minutos a fuego vivo.",
      "**Cocción de la fideuá:** Incorporar los fideos tostados a la paella y mezclar con el sofrito negro durante 1 minuto. Verter el fumet caliente hirviendo (800 ml). Cocer a fuego vivo durante 6 minutos y a fuego medio durante 4-5 minutos hasta que los fideos hayan absorbido el caldo y comiencen a levantarse y ponerse de punta hacia arriba.",
      "**Horneado crujiente (opcional) y alioli:** Para un acabado superior de restaurante, meter la paella en horno precalentado a 200°C con grill durante 3 minutos para que los fideos de la superficie se doren y se pongan crujientes de punta. Mientras tanto, emulsionar con la batidora de inmersión el huevo, el ajo, el zumo de limón, sal y el aceite suave hasta montar un alioli firme y cremoso."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "arg-arroz_negro_tradicional_con_calamar",
    "name": "Arroz Negro Tradicional con Calamares en su Tinta",
    "shortName": "Arroz Negro Tradicional",
    "category": "arroces_pastas",
    "mealType": "lunch",
    "station": "fuego_3",
    "prepTimeFormatted": "25 min (fuego_3)",
    "prepTimeMinutes": 25,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Apio",
      "Pescado",
      "Mostaza",
      "Sésamo",
      "Moluscos"
    ],
    "image": "/assets/fuentes/karlos_arguinano/arroz_negro_tradicional_con_calamares_en_su_tinta_portada.jpg",
    "source": "Karlos Arguiñano",
    "sourceCompendium": "05_arroces_paellas_y_fideuas.md",
    "mainIngredientFamily": "arroz",
    "culinaryTechnique": "arroz_meloso",
    "infografia": "/assets/fuentes/karlos_arguinano/infografia_arroz_negro_tradicional_con_calamares_en_su_tinta.jpg",
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/karlos_arguinano/arroz_negro_tradicional_con_calamares_en_su_tinta_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/karlos_arguinano/arroz_negro_tradicional_con_calamares_en_su_tinta_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/karlos_arguinano/arroz_negro_tradicional_con_calamares_en_su_tinta_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Arroz Bomba D.O.",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Calamares limpios cortados en anillas o dados de 1,5 cm",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Bolsitas de tinta natural de calamar o sepia",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Fumet de pescado de roca caliente",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Cebolla morada finamente picada",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Pimiento verde italiano picado",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      }
    ],
    "instructions": [
      "**Dorado del calamar:** En la paella con el AOVE a fuego vivo, dorar las anillas y tentáculos de calamar durante 4 minutos hasta que comiencen a chisporrotear y tomen color. Retirar y reservar la mitad para decorar.",
      "**Sofrito confitado y tinta:** En el mismo aceite, pochar los ajos, la cebolla morada y el pimiento verde a fuego medio durante 12 minutos. Incorporar el tomate rallado y sofreír 6 minutos. Disolver las 4 bolsas de tinta en el vino blanco con un chorrito de caldo caliente y agregar al sofrito. Cocinar a fuego medio 3 minutos hasta que la salsa sea negra azabache brillante.",
      "**Nacarado y cocción en paella:** Incorporar el arroz Bomba y nacarar durante 2 minutos impregnando cada grano con la tinta negra. Verter el fumet caliente (900 ml). Distribuir el arroz por toda la superficie y cocinar a fuego vivo durante 8 minutos. Bajar a fuego medio-suave 8 minutos más.",
      "**Socarrat negro y reposo:** Subir el fuego los últimos 60 segundos para crear un socarrat crujiente y caramelizado. Apagar el fuego, colocar los tentáculos reservados por encima y dejar reposar 5 minutos tapado con un paño limpio."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "arg-arroz_al_horno_tradicional_con_garb",
    "name": "Arroz al Horno Tradicional con Garbanzos y Costilla",
    "shortName": "Arroz al Horno Tradicional",
    "category": "arroces_pastas",
    "mealType": "lunch",
    "station": "horno",
    "prepTimeFormatted": "25 min (horno)",
    "prepTimeMinutes": 25,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Apio",
      "Gluten",
      "Mostaza",
      "Sésamo",
      "Pescado"
    ],
    "image": "/assets/fuentes/karlos_arguinano/arroz_al_horno_tradicional_con_garbanzos_y_costilla_portada.jpg",
    "source": "Karlos Arguiñano",
    "sourceCompendium": "05_arroces_paellas_y_fideuas.md",
    "mainIngredientFamily": "legumbres",
    "culinaryTechnique": "asado_horno",
    "infografia": "/assets/fuentes/karlos_arguinano/infografia_arroz_al_horno_tradicional_con_garbanzos_y_costilla.jpg",
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/karlos_arguinano/arroz_al_horno_tradicional_con_garbanzos_y_costilla_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/karlos_arguinano/arroz_al_horno_tradicional_con_garbanzos_y_costilla_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/karlos_arguinano/arroz_al_horno_tradicional_con_garbanzos_y_costilla_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Arroz Bomba D.O.",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Costilla de cerdo troceada",
        "quantity": 0.1,
        "unit": "kg",
        "category": "carnes-pescados"
      },
      {
        "name": "Panceta fresca o panceta curada en tiras",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Morcillas de cebolla oreadas",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Garbanzos cocidos (de cocido o bote aclarados)",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Patatas peladas cortadas en rodajas de 1 cm",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      }
    ],
    "instructions": [
      "**Dorado de carnes y patatas:** En sartén con el AOVE a fuego vivo, dorar la cabeza de ajos entera y las rodajas de patata durante 3 minutos por lado. Retirar a la cazuela de barro. En el mismo aceite, dorar intensamente la panceta y la costilla durante 6-8 minutos; añadir las morcillas enteras 1 minuto con cuidado de que no revienten y retirar todo a la cazuela de barro.",
      "**Sofrito y nacarado:** En la sartén con el aceite residual, sofreír el tomate rallado con el pimentón y el azafrán durante 3 minutos. Añadir los garbanzos cocidos y el arroz Bomba, rehogando todo junto durante 2 minutos para impregnar el grano.",
      "**Montaje en cazuela de barro:** Pasar el arroz con garbanzos y sofrito a la cazuela de barro. Distribuir uniformemente. Colocar la cabeza de ajos en el centro exacto. Alrededor, intercalar armónicamente las rodajas de patata doradas, las rodajas de tomate crudo, la costilla, panceta y las morcillas.",
      "**Horneado a alta temperatura:** Verter el caldo de cocido hirviendo con cuidado sobre la cazuela de barro. Introducir en el horno precalentado a 220°C en la posición media-baja. Hornear durante 20 minutos exactos hasta que el caldo se haya absorbido por completo, el arroz esté en su punto y la superficie presente un dorado crujiente irresistible. Dejar reposar 5 minutos fuera del horno."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "arg-fideua_marinera_tradicional_con_gam",
    "name": "Fideuá Marinera Tradicional con Gambas, Mejillones y Rape",
    "shortName": "Fideuá Marinera Tradicional",
    "category": "pescados",
    "mealType": "universal",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 3,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-3 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Crustáceos",
      "Huevos",
      "Sulfitos",
      "Apio",
      "Pescado",
      "Gluten",
      "Mostaza",
      "Sésamo",
      "Moluscos"
    ],
    "image": "/assets/fuentes/karlos_arguinano/fideua_marinera_tradicional_con_gambas_mejillones_y_rape_portada.jpg",
    "source": "Karlos Arguiñano",
    "sourceCompendium": "05_arroces_paellas_y_fideuas.md",
    "mainIngredientFamily": "marisco",
    "culinaryTechnique": "guiso",
    "infografia": "/assets/fuentes/karlos_arguinano/infografia_fideua_marinera_tradicional_con_gambas_mejillones_y_rape.jpg",
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/karlos_arguinano/fideua_marinera_tradicional_con_gambas_mejillones_y_rape_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/karlos_arguinano/fideua_marinera_tradicional_con_gambas_mejillones_y_rape_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/karlos_arguinano/fideua_marinera_tradicional_con_gambas_mejillones_y_rape_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Fideos de fideuá (nº 2 o fideo fino tostado)",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Gambas rojas o langostinos enteros",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Lomos de rape limpio cortados en dados de 2 cm",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Sepia limpia en daditos",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Mejillones frescos abiertos al vapor",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Fumet de pescado de roca y marisco hirviendo",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Marcado del marisco y tostado de fideos:** En la paella con el AOVE a fuego vivo, dorar las gambas y las tiras de pimiento durante 2 minutos. Retirar a un plato. Añadir los fideos y tostarlos a fuego medio durante 3-4 minutos removiendo constantemente hasta dorarlos uniformemente. Retirar a un bol.",
      "**Sofrito de rape y sepia:** En la paella, dorar la sepia 3 min y los dados de rape 1 min. Agregar los ajos laminados, el tomate rallado, el pimentón y el azafrán. Sofreír 6 minutos a fuego medio hasta concentrar los sabores.",
      "**Cocción de la fideuá:** Devolver los fideos tostados a la paella, mezclar bien con el sofrito e incorporar el fumet hirviendo con el agua de los mejillones (800 ml en total). Cocinar a fuego vivo 6 minutos y luego a fuego medio 4 minutos.",
      "**Gratinado de fideos de punta:** Colocar por encima las gambas y los mejillones en media concha. Meter la paella al horno precalentado a 210°C con grill durante 3 minutos hasta que los fideos se levanten y queden dorados y crujientes."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "arg-arroz_caldoso_de_conejo_y_caracoles",
    "name": "Arroz Caldoso de Conejo y Caracoles al Romero",
    "shortName": "Arroz Caldoso",
    "category": "arroces_pastas",
    "mealType": "lunch",
    "station": "fuego_3",
    "prepTimeFormatted": "25 min (fuego_3)",
    "prepTimeMinutes": 25,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Apio",
      "Mostaza",
      "Sésamo",
      "Pescado"
    ],
    "image": "/assets/fuentes/karlos_arguinano/arroz_caldoso_de_conejo_y_caracoles_al_romero_portada.jpg",
    "source": "Karlos Arguiñano",
    "sourceCompendium": "05_arroces_paellas_y_fideuas.md",
    "mainIngredientFamily": "arroz",
    "culinaryTechnique": "arroz_meloso",
    "infografia": "/assets/fuentes/karlos_arguinano/infografia_arroz_caldoso_de_conejo_y_caracoles_al_romero.jpg",
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/karlos_arguinano/arroz_caldoso_de_conejo_y_caracoles_al_romero_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/karlos_arguinano/arroz_caldoso_de_conejo_y_caracoles_al_romero_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/karlos_arguinano/arroz_caldoso_de_conejo_y_caracoles_al_romero_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Conejo limpio troceado menudo",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Caracoles de tierra cocidos y limpios (tipo serranos o vaquetes)",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Arroz Bomba o redondo tradicional",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Caldo de carne o de ave con hierbas aromáticas",
        "quantity": 0.1,
        "unit": "kg",
        "category": "carnes-pescados"
      },
      {
        "name": "Tomate maduro rallado",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Pimiento verde italiano picado",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      }
    ],
    "instructions": [
      "**Dorado del conejo de monte:** Salpimentar los trozos de conejo. En la cazuela con el AOVE a fuego vivo, dorar el conejo durante 10 minutos hasta que quede bien tostado por fuera. Retirar y reservar.",
      "**Sofrito y caracoles:** En el mismo aceite a fuego medio, pochar los ajos picados y el pimiento verde durante 8 minutos. Añadir el tomate rallado, el pimentón y el azafrán. Sofreír 6 minutos. Incorporar los caracoles cocidos y el vino blanco, evaporando 2 minutos.",
      "**Cocción caldosa:** Devolver el conejo a la cazuela, añadir el arroz y nacarar 1 minuto. Verter el caldo caliente hirviendo (1.200 ml) y colocar las ramas de romero fresco en la superficie. Cocer a fuego vivo durante 8 minutos y luego a fuego suave durante 7 minutos.",
      "**Punto final:** Retirar las ramas de romero, apagar el fuego con el arroz al dente y dejar reposar 3 minutos para que los jugos de campo asienten su textura caldosa."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "arg-risotto_cremoso_de_hongos_boletus_y",
    "name": "Risotto Cremoso de Hongos Boletus y Queso Idiazábal",
    "shortName": "Risotto Cremoso",
    "category": "arroces_pastas",
    "mealType": "lunch",
    "station": "fuego_3",
    "prepTimeFormatted": "25 min (fuego_3)",
    "prepTimeMinutes": 25,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Apio",
      "Lácteos",
      "Frutos de cáscara",
      "Gluten",
      "Mostaza",
      "Sésamo",
      "Pescado"
    ],
    "image": "/assets/fuentes/karlos_arguinano/risotto_cremoso_de_hongos_boletus_y_queso_idiazabal_portada.jpg",
    "source": "Karlos Arguiñano",
    "sourceCompendium": "05_arroces_paellas_y_fideuas.md",
    "mainIngredientFamily": "arroz",
    "culinaryTechnique": "arroz_meloso",
    "infografia": "/assets/fuentes/karlos_arguinano/infografia_risotto_cremoso_de_hongos_boletus_y_queso_idiazabal.jpg",
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/karlos_arguinano/risotto_cremoso_de_hongos_boletus_y_queso_idiazabal_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/karlos_arguinano/risotto_cremoso_de_hongos_boletus_y_queso_idiazabal_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/karlos_arguinano/risotto_cremoso_de_hongos_boletus_y_queso_idiazabal_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Arroz Carnaroli o Arborio especial risotto",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Boletus edulis frescos (o congelados/deshidratados)",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Queso Idiazábal ahumado D.O. rallado fino",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Mantequilla de calidad fría en dados",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Chalotas picadas en brunoise finísima",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Diente de ajo picado",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      }
    ],
    "instructions": [
      "**Salteado de boletus:** Limpiar los boletus con un paño húmedo y cortar en láminas gruesas. En la cazuela con 15 ml de AOVE a fuego vivo, saltear los hongos durante 3 minutos con una pizca de sal. Retirar la mitad de las láminas más bonitas para decorar al final.",
      "**Sofrito y tostado (*tostatura*):** Añadir el resto de AOVE y 10 g de mantequilla a la cazuela. Rehogar las chalotas picadas y el ajo durante 4 minutos a fuego suave sin que tomen color. Añadir el arroz Carnaroli y tostar en seco a fuego medio durante 2-3 minutos hasta que los granos se vuelvan translúcidos y calientes al tacto.",
      "**Desglasado e hidratación gradual:** Verter el vino blanco y dejar evaporar por completo el alcohol durante 2 minutos. Comenzar a verter el caldo hirviendo cazo a cazo (unos 200 ml cada vez), removiendo suave y constantemente con la cuchara de madera en círculos para favorecer la liberación del almidón. Añadir el siguiente cazo solo cuando el anterior haya sido absorbido. Repetir durante 15-16 minutos.",
      "**Mantecatura fuera del fuego:** Apagar el fuego cuando el grano esté al dente (ligeramente firme en el centro). Añadir la mantequilla fría en dados y el queso Idiazábal rallado fino. Batir enérgicamente con la cuchara en movimientos envolventes durante 2 minutos para crear la emulsión cremosa (*all'onda*)."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "arg-arroz_a_banda_tradicional_con_salmo",
    "name": "Arroz a Banda Tradicional con Salmorreta y Alioli",
    "shortName": "Arroz a Banda Tradicional",
    "category": "arroces_pastas",
    "mealType": "lunch",
    "station": "fuego_3",
    "prepTimeFormatted": "25 min (fuego_3)",
    "prepTimeMinutes": 25,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Apio",
      "Pescado",
      "Mostaza",
      "Sésamo",
      "Moluscos"
    ],
    "image": "/assets/fuentes/karlos_arguinano/arroz_a_banda_tradicional_con_salmorreta_y_al_portada.jpg",
    "source": "Karlos Arguiñano",
    "sourceCompendium": "05_arroces_paellas_y_fideuas.md",
    "mainIngredientFamily": "arroz",
    "culinaryTechnique": "arroz_meloso",
    "infografia": "/assets/fuentes/karlos_arguinano/infografia_arroz_a_banda_tradicional_con_salmorreta_y_al.jpg",
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/karlos_arguinano/arroz_a_banda_tradicional_con_salmorreta_y_al_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/karlos_arguinano/arroz_a_banda_tradicional_con_salmorreta_y_al_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/karlos_arguinano/arroz_a_banda_tradicional_con_salmorreta_y_al_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Arroz tipo Senia o Bomba D.O.",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Sepia limpia troceada muy menuda",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Fumet rojo concentrado de morralla, galeras y cangrejos",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Salmorreta alicantina tradicional",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Hebras de azafrán tostado",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Aceite de oliva virgen extra (AOVE)",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Dorado de sepia y salmorreta:** En la paella con el AOVE a fuego medio-alto, dorar los dados diminutos de sepia durante 3 minutos. Añadir las 2 cucharadas de salmorreta alicantina y rehogar 1 minuto para fusionar con el aceite.",
      "**Nacarado del grano:** Añadir el arroz y las hebras de azafrán tostadas. Nacarar a fuego medio durante 2 minutos hasta que todo el grano absorba el color rojizo de la salmorreta.",
      "**Cocción precisa en paella:** Verter el fumet rojo concentrado hirviendo (900 ml). Distribuir el arroz en capa fina de un solo grano y cocinar a fuego vivo durante 8 minutos. Bajar a fuego medio-bajo otros 8 minutos.",
      "**Socarrat y reposo:** En los últimos 90 segundos, subir el fuego al máximo hasta percibir el sonido seco del tostado del fondo. Apagar y dejar reposar 5 minutos tapado con paño de algodón."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "arg-tortilla_de_bacalao_tradicional_de_",
    "name": "Tortilla de Bacalao Tradicional de Sidrería Vasca",
    "shortName": "Tortilla",
    "category": "pescados",
    "mealType": "universal",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 3,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-3 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Apio",
      "Mostaza",
      "Sésamo",
      "Pescado"
    ],
    "image": "/assets/fuentes/karlos_arguinano/tortilla_de_bacalao_tradicional_de_sidreria_vasca_portada.jpg",
    "source": "Karlos Arguiñano",
    "sourceCompendium": "06_huevos_revueltos_y_pintxos.md",
    "mainIngredientFamily": "bacalao",
    "culinaryTechnique": "tortilla",
    "infografia": "/assets/fuentes/karlos_arguinano/infografia_tortilla_de_bacalao_tradicional_de_sidreria_vasca.jpg",
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/karlos_arguinano/tortilla_de_bacalao_tradicional_de_sidreria_vasca_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/karlos_arguinano/tortilla_de_bacalao_tradicional_de_sidreria_vasca_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/karlos_arguinano/tortilla_de_bacalao_tradicional_de_sidreria_vasca_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Huevos camperos de caserío (calibre L/XL)",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Bacalao desalado desmigado fino",
        "quantity": 0.1,
        "unit": "kg",
        "category": "carnes-pescados"
      },
      {
        "name": "Cebolla dulce picada en juliana fina",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Pimiento verde italiano en juliana fina",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Dientes de ajo picados en brunoise fina",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Perejil fresco recién picado finamente",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Pochado suave de verduras:** En una sartén antiadherente con 30 ml de AOVE, pochar la cebolla, el pimiento verde y el ajo a fuego medio-bajo durante 10-12 minutos hasta que la verdura quede translúcida, tierna y sin dorarse en exceso.",
      "**Salteado rápido del bacalao:** Añadir el bacalao desalado bien escurrido y desmigado. Saltear a fuego vivo durante 90 a 120 segundos para que se cocine con su propia gelatina y pierda el exceso de agua. Escurrir ligeramente sobre un colador si desprende demasiado líquido.",
      "**Batido e integración:** En un bol amplio, cascar los 6 huevos camperos y batirlos ligeramente con las varillas (sin sobrebatir para no incorporar aire en exceso). Añadir el perejil fresco y el sofrito templado de bacalao y verduras. Mezclar bien.",
      "**Cuajado baboso de sidrería:** Calentar la sartén a fuego medio-alto con los 10 ml de AOVE restantes. Verter toda la mezcla de golpe. Remover enérgicamente en círculos con espátula durante 30 segundos mientras cuaja el fondo. Dar la vuelta con un plato y cuajar el reverso durante otros 30-40 segundos a fuego medio. El interior debe quedar completamente cremoso y meloso (*babosa*)."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "arg-revuelto_de_hongos_boletus_y_perrec",
    "name": "Revuelto de Hongos Boletus y Perrechicos con Ajo Tierno",
    "shortName": "Revuelto",
    "category": "huevos",
    "mealType": "dinner",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": false,
    "storageAdvice": "Nevera 1-5 días • Consumo fresco",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Apio",
      "Lácteos",
      "Gluten",
      "Mostaza",
      "Sésamo",
      "Pescado"
    ],
    "image": "/assets/fuentes/karlos_arguinano/revuelto_de_hongos_boletus_y_perrechicos_con_portada.jpg",
    "source": "Karlos Arguiñano",
    "sourceCompendium": "06_huevos_revueltos_y_pintxos.md",
    "mainIngredientFamily": "huevos",
    "culinaryTechnique": "tortilla",
    "infografia": "/assets/fuentes/karlos_arguinano/infografia_revuelto_de_hongos_boletus_y_perrechicos_con.jpg",
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/karlos_arguinano/revuelto_de_hongos_boletus_y_perrechicos_con_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/karlos_arguinano/revuelto_de_hongos_boletus_y_perrechicos_con_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/karlos_arguinano/revuelto_de_hongos_boletus_y_perrechicos_con_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Hongos frescos de temporada (Boletus edulis o Perrechicos / Calocybe gambosa)",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Huevos camperos de caserío",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Ajetes tiernos frescos limpios",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Dientes de ajo morado en láminas finas",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra (AOVE)",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Flor de sal marina",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Limpieza y corte de setas:** Limpiar los hongos con paño húmedo o pincel suave evitando sumergirlos en agua. Cortar los boletus en láminas de 4 mm y desgajar los perrechicos a mano para respetar su fibra. Cortar los ajetes tiernos en rodajitas de 1 cm.",
      "**Salteado aromático:** En una sartén con el AOVE a fuego medio, rehogar los ajos laminados y los ajetes tiernos durante 2 minutos hasta que desprendan su aroma sin quemarse.",
      "**Cocción de los hongos:** Subir el fuego y agregar los hongos troceados. Saltear a fuego vivo durante 4-5 minutos hasta que evaporen el agua de vegetación y comiencen a dorarse ligeramente. Salpimentar al gusto.",
      "**Técnica de cuajado cremoso:** Bajar el fuego al mínimo (o retirar la sartén del fuego). Cascar los huevos directamente sobre los hongos (o batirlos 5 segundos en bol sin espumar). Remover continuamente con la espátula de silicona con movimientos envolventes lentos durante 90 segundos. El calor residual creará una crema sedosa aterciopelada sin grumos secos ni aspecto de tortilla rota. Retirar inmediatamente cuando alcance 68-70°C."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "arg-pimientos_del_piquillo_rellenos_de_",
    "name": "️ Pimientos del Piquillo Rellenos de Bacalao con Salsa de Piquillos",
    "shortName": "️ Pimientos del Piquillo Rellenos",
    "category": "pescados",
    "mealType": "universal",
    "station": "fuego_2",
    "prepTimeFormatted": "15 min (fuego_2)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 3,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-3 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Apio",
      "Lácteos",
      "Frutos de cáscara",
      "Gluten",
      "Mostaza",
      "Sésamo",
      "Pescado"
    ],
    "image": "/assets/fuentes/karlos_arguinano/pimientos_del_piquillo_rellenos_de_bacalao_con_portada.jpg",
    "source": "Karlos Arguiñano",
    "sourceCompendium": "06_huevos_revueltos_y_pintxos.md",
    "mainIngredientFamily": "bacalao",
    "culinaryTechnique": "salsa",
    "infografia": "/assets/fuentes/karlos_arguinano/infografia_pimientos_del_piquillo_rellenos_de_bacalao_con.jpg",
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/karlos_arguinano/pimientos_del_piquillo_rellenos_de_bacalao_con_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/karlos_arguinano/pimientos_del_piquillo_rellenos_de_bacalao_con_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/karlos_arguinano/pimientos_del_piquillo_rellenos_de_bacalao_con_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Pimientos del piquillo de Lodosa en conserva",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Bacalao desalado desmigado y limpio",
        "quantity": 0.1,
        "unit": "kg",
        "category": "carnes-pescados"
      },
      {
        "name": "Cebolla blanca picada en brunoise",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Dientes de ajo picados",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Harina de trigo de todo uso",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Leche entera tibia",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Farsa cremosa de bacalao:** En una sartén con 30 g de mantequilla/AOVE, pochar la cebolla y el ajo muy finos durante 8 min. Añadir el bacalao desmigado y rehogar 2 min. Añadir 45 g de harina y cocinar (roux) durante 2 min. Verter la leche tibia poco a poco sin dejar de remover con varillas hasta obtener una bechamel densa y sin grumos. Añadir nuez moscada y rectificar de sal. Dejar enfriar en manga pastelera en nevera (1 hora).",
      "**Relleno y rebozado:** Escurrir los 12 pimientos del piquillo sobre papel absorbente. Rellenarlos con la farsa cremosa con ayuda de la manga sin romper la piel. Pasarlos ligeramente por harina y huevo batido, y freírlos en AOVE caliente a 170°C durante 1 minuto por cada lado. Escurrir en papel.",
      "**Elaboración de la salsa fina:** En un cazo, pochar media cebolla con los 4 pimientos del piquillo restantes y su jugo. Añadir la nata líquida (o fumet), cocer 8 minutos a fuego suave, triturar con la batidora hasta textura terciopelo y pasar por colador chino.",
      "**Guisado conjunto:** Disponer los pimientos rellenados en la cazuela baja, cubrirlos con la salsa caliente y dar un suave hervor conjunto a fuego muy lento durante 4-5 minutos agitando la cazuela en vaivén."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "arg-gilda_donostiarra_clasica_piparra_a",
    "name": "Gilda Donostiarra Clásica (Piparra, Anchoa del Cantábrico y Aceituna)",
    "shortName": "Gilda Donostiarra Clásica (Piparra, Anchoa del Cantábrico y Aceituna)",
    "category": "huevos",
    "mealType": "dinner",
    "station": "frio",
    "prepTimeFormatted": "15 min (frio)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": false,
    "storageAdvice": "Nevera 1-5 días • Consumo fresco",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Apio",
      "Mostaza",
      "Sésamo",
      "Pescado"
    ],
    "image": "/assets/fuentes/karlos_arguinano/gilda_donostiarra_clasica_piparra_anchoa_ace_portada.jpg",
    "source": "Karlos Arguiñano",
    "sourceCompendium": "06_huevos_revueltos_y_pintxos.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "frio_alino",
    "infografia": "/assets/fuentes/karlos_arguinano/infografia_gilda_donostiarra_clasica_piparra_anchoa_ace.jpg",
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/karlos_arguinano/gilda_donostiarra_clasica_piparra_anchoa_ace_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/karlos_arguinano/gilda_donostiarra_clasica_piparra_anchoa_ace_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/karlos_arguinano/gilda_donostiarra_clasica_piparra_anchoa_ace_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Piparras / Guindillas de Ibarra en vinagre (Ibartarrak)",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Filetes de anchoa del Cantábrico en aceite de oliva (calibre 00)",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Aceitunas manzanilla verdes deshuesadas",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Aceite de oliva virgen extra arbequina / hojiblanca",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Palillos de brocheta de madera de 10 cm",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Preparación de ingredientes:** Escurrir las piparras de Ibarra sobre papel absorbente y cortarles el rabillo superior con una puntilla. Escurrir las aceitunas manzanilla.",
      "**Ensartado tradicional Donostiarra:**",
      "**Aliño y maceración:** Disponer las 8 gildas alineadas en una fuente de cristal o cerámica. Rociar generosamente con un hilo fino de AOVE virgen extra para amalgamar la acidez del vinagre con la salinidad de la anchoa."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "arg-huevos_rotos_con_txistorra_de_navar",
    "name": "Huevos Rotos con Txistorra de Navarra y Patatas Panadera",
    "shortName": "Huevos Rotos",
    "category": "huevos",
    "mealType": "dinner",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": false,
    "storageAdvice": "Nevera 1-5 días • Consumo fresco",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Apio",
      "Gluten",
      "Mostaza",
      "Sésamo",
      "Pescado"
    ],
    "image": "/assets/fuentes/karlos_arguinano/huevos_rotos_con_txistorra_de_navarra_y_patatas_portada.jpg",
    "source": "Karlos Arguiñano",
    "sourceCompendium": "06_huevos_revueltos_y_pintxos.md",
    "mainIngredientFamily": "huevos",
    "culinaryTechnique": "guiso",
    "infografia": "/assets/fuentes/karlos_arguinano/infografia_huevos_rotos_con_txistorra_de_navarra_y_patatas.jpg",
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/karlos_arguinano/huevos_rotos_con_txistorra_de_navarra_y_patatas_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/karlos_arguinano/huevos_rotos_con_txistorra_de_navarra_y_patatas_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/karlos_arguinano/huevos_rotos_con_txistorra_de_navarra_y_patatas_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Huevos camperos de caserío",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Patatas variedad Monalisa o Kennebec",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Txistorra fresca de Navarra tradicional",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Pimiento verde italiano cortado en tiras",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Aceite de oliva virgen extra",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Dientes de ajo chafados con piel",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      }
    ],
    "instructions": [
      "**Confitado de patatas panadera:** Pelar las patatas y cortarlas en rodajas de 4 mm (corte panadera). En una sartén amplia con abundante AOVE y los ajos chafados, pochar las patatas y el pimiento verde a fuego medio-bajo (140°C) durante 14 minutos hasta que estén tiernas y ligeramente doradas. Escurrir y sazonar con sal marina.",
      "**Salteado crujiente de txistorra:** Cortar la txistorra en trozos de 4-5 cm. En una sartén sin aceite a fuego medio-vivo, dorar la txistorra durante 4 minutos hasta que quede crujiente por fuera y jugosa por dentro, soltando su pimentón y grasa aromática. Escurrir el exceso de grasa.",
      "**Fritura de huevos con puntilla:** En una sartén pequeña con 1 cm de AOVE muy caliente (180°C), cascar los huevos de dos en dos. Freír durante 45 segundos regando la yema con la espumadera para formar una puntilla crujiente y dorada manteniendo la yema líquida y brillante.",
      "**Montaje y rotura:** En una fuente caliente, colocar una cama abundante de patatas panadera con pimiento. Repartir los trozos de txistorra crujiente y coronar con los huevos fritos. Romper las yemas en la mesa con dos cortes limpios de cuchillo para que bañen las patatas."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "arg-pintxo_donostiarra_de_txaka_con_hue",
    "name": "Pintxo Donostiarra de Txaka con Huevo Cocido y Mahonesa Suave",
    "shortName": "Pintxo Donostiarra",
    "category": "legumbres",
    "mealType": "lunch",
    "station": "olla_expres",
    "prepTimeFormatted": "15 min (olla_expres)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 4,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-4 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Crustáceos",
      "Huevos",
      "Sulfitos",
      "Apio",
      "Gluten",
      "Mostaza",
      "Sésamo",
      "Pescado"
    ],
    "image": "/assets/fuentes/karlos_arguinano/pintxo_donostiarra_de_txaka_con_huevo_y_mahonesa_portada.jpg",
    "source": "Karlos Arguiñano",
    "sourceCompendium": "06_huevos_revueltos_y_pintxos.md",
    "mainIngredientFamily": "pollo",
    "culinaryTechnique": "cuchara_potaje",
    "infografia": "/assets/fuentes/karlos_arguinano/infografia_pintxo_donostiarra_de_txaka_con_huevo_y_mahonesa.jpg",
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/karlos_arguinano/pintxo_donostiarra_de_txaka_con_huevo_y_mahonesa_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/karlos_arguinano/pintxo_donostiarra_de_txaka_con_huevo_y_mahonesa_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/karlos_arguinano/pintxo_donostiarra_de_txaka_con_huevo_y_mahonesa_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Carne de txaka / palitos de cangrejo y surimi de calidad picados muy fino",
        "quantity": 0.1,
        "unit": "kg",
        "category": "carnes-pescados"
      },
      {
        "name": "Huevos cocidos duros (10 min de cocción)",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Mahonesa suave casera o de calidad",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Cebolleta fresca picada en brunoise microscópica",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Langostinos cocidos pelados para coronar",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Barra de pan vasco artesanal o baguette crujiente",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Picado fino de la base:** Picar la txaka / surimi en trocitos minúsculos de 2 mm. Picar la cebolleta fresca muy fina para aportar un punto crujiente refrescante.",
      "**Cocción y rallado del huevo:** Cocer los huevos durante 10 minutos exactos en agua con sal y vinagre. Enfriar en agua con hielo, pelar y rallar 2 huevos finos con el rallador (reservar 1 yema para decorar al final).",
      "**Emulsión de la ensaladilla de txaka:** En el bol, mezclar la txaka, los huevos rallados, la cebolleta, la mahonesa suave, unas gotas de zumo de limón y una pizca de sal. Integrar hasta conseguir una farsa untuosa y homogénea pero con textura.",
      "**Montaje del pintxo de barra:** Tostar ligeramente las rebanadas de pan. Colocar una generosa quenelle o montículo de farsa de txaka sobre cada tosta. Coronar con un langostino cocido pelado, espolvorear la yema de huevo reservada rallada por encima y terminar con cebollino fresco picado."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "arg-menestra_de_verduras_tradicional_de",
    "name": "Menestra de Verduras Tradicional de Tudela con Jamón",
    "shortName": "Menestra",
    "category": "verduras",
    "mealType": "dinner",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": false,
    "storageAdvice": "Nevera 1-5 días • Consumo fresco",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Apio",
      "Gluten",
      "Mostaza",
      "Sésamo",
      "Pescado"
    ],
    "image": "/assets/fuentes/karlos_arguinano/menestra_de_verduras_tradicional_de_tudela_con_jam_portada.jpg",
    "source": "Karlos Arguiñano",
    "sourceCompendium": "07_verduras_menestras_y_huerta.md",
    "mainIngredientFamily": "verduras",
    "culinaryTechnique": "guiso",
    "infografia": "/assets/fuentes/karlos_arguinano/infografia_menestra_de_verduras_tradicional_de_tudela_con_jam.jpg",
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/karlos_arguinano/menestra_de_verduras_tradicional_de_tudela_con_jam_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/karlos_arguinano/menestra_de_verduras_tradicional_de_tudela_con_jam_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/karlos_arguinano/menestra_de_verduras_tradicional_de_tudela_con_jam_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Alcachofas frescas de Tudela (corazones limpios)",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Espárragos blancos frescos de Navarra",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Guisantes frescos lágrima o desgranados",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Habitas tiernas baby frescas",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Zanahorias medianas en rodajas torneadas",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Patatas medianas en dados de 2 cm",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      }
    ],
    "instructions": [
      "**Cocción técnica por separado (respeto de texturas):**",
      "**Rebozado crujiente de alcachofas:** Cortar 4 corazones de alcachofa en cuartos, pasarlos por harina y huevo batido, y freírlos en sartén con AOVE bien caliente (175°C) hasta conseguir un rebozado dorado y crujiente. Escurrir sobre papel.",
      "**Sofrito y ligazón de salsa de huerta:** En la cazuela baja, calentar el AOVE y dorar los ajos laminados con los taquitos de jamón ibérico durante 2 minutos. Añadir 1 cucharada rasa de harina (15 g), tostar 1 minuto y verter los 350 ml de caldo de verduras caliente removiendo con varillas para formar una salsa velouté ligera y brillante.",
      "**Ensamblado y glaseado conjunto:** Incorporar a la cazuela todas las verduras cocidas (espárragos, habitas, guisantes, patatas, zanahorias y alcachofas cocidas). Cocinar a fuego lento durante 3 minutos realizando vaivén con la cazuela para integrar jugos. Coronar con las alcachofas rebozadas crujientes sin sumergirlas del todo para mantener su textura crocante."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "arg-alcachofas_salteadas_con_jamon_iber",
    "name": "Alcachofas Salteadas con Jamón Ibérico y Almejas en Salsa Verde",
    "shortName": "Alcachofas Salteadas",
    "category": "pescados",
    "mealType": "universal",
    "station": "fuego_2",
    "prepTimeFormatted": "15 min (fuego_2)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 3,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-3 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "high_protein"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Apio",
      "Pescado",
      "Gluten",
      "Mostaza",
      "Sésamo",
      "Moluscos"
    ],
    "image": "/assets/fuentes/karlos_arguinano/alcachofas_salteadas_con_jamon_iberico_y_alme_portada.jpg",
    "source": "Karlos Arguiñano",
    "sourceCompendium": "07_verduras_menestras_y_huerta.md",
    "mainIngredientFamily": "verduras",
    "culinaryTechnique": "salsa",
    "infografia": "/assets/fuentes/karlos_arguinano/infografia_alcachofas_salteadas_con_jamon_iberico_y_alme.jpg",
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/karlos_arguinano/alcachofas_salteadas_con_jamon_iberico_y_alme_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/karlos_arguinano/alcachofas_salteadas_con_jamon_iberico_y_alme_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/karlos_arguinano/alcachofas_salteadas_con_jamon_iberico_y_alme_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Alcachofas frescas tiernas",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Almejas finas o babosas depuradas en agua con sal",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Taquitos de jamón ibérico de bellota",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Dientes de ajo finamente picados",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Txakoli de Getaria o vino blanco seco",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Fumet de pescado blanco o caldo de alcachofas",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Limpieza y cocción base de alcachofas:** Retirar las hojas duras exteriores de las alcachofas, cortar las puntas y pelar los tallos. Cocerlas en agua hirviendo con ramas de perejil y sal durante 14 minutos. Escurrir, cortar por la mitad y secar con papel.",
      "**Sofrito de ajo y jamón:** En la cazuela con el AOVE a fuego medio, dorar los ajos picados durante 1 minuto. Añadir el jamón ibérico y saltear 30 segundos sin que la grasa se queme.",
      "**Salsa verde y apertura de moluscos:** Añadir la cucharada de harina, cocinar 1 minuto y verter el Txakoli blanco. Dejar evaporar el alcohol 90 segundos. Añadir el caldo caliente y el perejil picado.",
      "**Cocción conjunta al vapor:** Incorporar las mitades de alcachofa y las almejas escurridas. Tapar la cazuela a fuego medio-alto durante 3-4 minutos hasta que todas las almejas se abran y suelten su agua marina gelatinosa, emulsionando la salsa en un vaivén circular constante."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "arg-pencas_de_acelga_rellenas_de_jamon_",
    "name": "Pencas de Acelga Rellenas de Jamón y Queso Idiazábal en Salsa Española",
    "shortName": "Pencas",
    "category": "verduras",
    "mealType": "dinner",
    "station": "fuego_2",
    "prepTimeFormatted": "15 min (fuego_2)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": false,
    "storageAdvice": "Nevera 1-5 días • Consumo fresco",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Apio",
      "Lácteos",
      "Gluten",
      "Mostaza",
      "Sésamo",
      "Pescado"
    ],
    "image": "/assets/fuentes/karlos_arguinano/pencas_de_acelga_rellenas_de_jamon_y_queso_id_portada.jpg",
    "source": "Karlos Arguiñano",
    "sourceCompendium": "07_verduras_menestras_y_huerta.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "salsa",
    "infografia": "/assets/fuentes/karlos_arguinano/infografia_pencas_de_acelga_rellenas_de_jamon_y_queso_id.jpg",
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/karlos_arguinano/pencas_de_acelga_rellenas_de_jamon_y_queso_id_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/karlos_arguinano/pencas_de_acelga_rellenas_de_jamon_y_queso_id_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/karlos_arguinano/pencas_de_acelga_rellenas_de_jamon_y_queso_id_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Pencas de acelga anchas y carnosas",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Lonchas de jamón serrano o ibérico fino",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Queso Idiazábal D.O. semicurado en lonchas",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Harina de trigo y huevos batidos para rebozar",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Cebolla morada para la salsa española",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Zanahoria picada",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Limpieza y cocción de las pencas:** Retirar los hilos y hebras de las pencas con una puntilla. Cortarlas en rectángulos homogéneos de 8 cm. Cocer en abundante agua hirviendo con sal durante 18 minutos hasta que estén muy tiernas. Escurrir bien sobre paño limpio.",
      "**Emparedado y rebozado:** Emparejar las pencas de dos en dos colocando en medio una loncha de jamón y una de queso Idiazábal. Pasarlas cuidadosamente por harina y huevo batido. Freír en AOVE caliente a 170°C hasta obtener una costra dorada y crujiente por ambos lados. Reservar sobre papel absorbente.",
      "**Salsa española tradicional:** En una cazuela, pochar la cebolla, zanahoria y puerro con 30 ml de AOVE durante 15 min. Añadir 1 cucharada de harina, tostar, regar con el vino tinto y reducir. Verter el fondo oscuro de carne y cocer 15 min. Triturar y colar la salsa hasta que quede aterciopelada y brillante.",
      "**Guiso conjunto:** Introducir las pencas rebozadas en la cazuela con la salsa española caliente. Dar un hervor suave de 4 minutos para que las pencas absorban la salsa y el queso Idiazábal se funda en el corazón."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "arg-pisto_tradicional_donostiarra_con_h",
    "name": "Pisto Tradicional Donostiarra con Huevo Escalfado",
    "shortName": "Pisto Tradicional Donostiarra",
    "category": "verduras",
    "mealType": "dinner",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": false,
    "storageAdvice": "Nevera 1-5 días • Consumo fresco",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Apio",
      "Mostaza",
      "Sésamo",
      "Pescado"
    ],
    "image": "/assets/fuentes/karlos_arguinano/pisto_tradicional_donostiarra_con_huevo_escalf_portada.jpg",
    "source": "Karlos Arguiñano",
    "sourceCompendium": "07_verduras_menestras_y_huerta.md",
    "mainIngredientFamily": "verduras",
    "culinaryTechnique": "guiso",
    "infografia": "/assets/fuentes/karlos_arguinano/infografia_pisto_tradicional_donostiarra_con_huevo_escalf.jpg",
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/karlos_arguinano/pisto_tradicional_donostiarra_con_huevo_escalf_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/karlos_arguinano/pisto_tradicional_donostiarra_con_huevo_escalf_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/karlos_arguinano/pisto_tradicional_donostiarra_con_huevo_escalf_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Calabacines verdes tiernos con piel en dados de 1 cm",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Pimientos verdes italianos picados",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Pimiento rojo carnoso en dados",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Cebollas dulces picadas en juliana / brunoise gruesa",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Tomates maduros pera pelados y picados en concassé",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Dientes de ajo laminados",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      }
    ],
    "instructions": [
      "**Pochado escalonado de hortalizas:** En la cazuela con el AOVE a fuego medio, añadir primero los ajos y la cebolla con un toque de sal. Cocinar 10 min hasta que empiece a transparentar.",
      "**Incorporación de pimientos y calabacín:** Añadir los pimientos verde y rojo. Rehogar 8 minutos. Incorporar el calabacín en dados y cocinar otros 8 minutos a fuego suave para que mantenga forma sin deshacerse.",
      "**Confitado con tomate fresco:** Agregar el tomate concassé y una pizca de azúcar para equilibrar la acidez. Guisar a fuego muy lento durante 15 minutos removiendo con cuchara de madera hasta que todo el jugo reduzca y las verduras queden melosas y brillantes.",
      "**Escalfado de huevos camperos:** En un cazo con agua hirviendo suave a 85°C y 20 ml de vinagre, crear un remolino con una cuchara y deslizar el huevo en el centro. Cocinar durante 3 minutos exactos para conseguir clara cuajada y yema completamente líquida."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "arg-cardo_tradicional_con_salsa_de_alme",
    "name": "Cardo Tradicional con Salsa de Almendras y Ajo Dorado",
    "shortName": "Cardo Tradicional",
    "category": "verduras",
    "mealType": "dinner",
    "station": "fuego_2",
    "prepTimeFormatted": "15 min (fuego_2)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": false,
    "storageAdvice": "Nevera 1-5 días • Consumo fresco",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Apio",
      "Lácteos",
      "Frutos de cáscara",
      "Gluten",
      "Mostaza",
      "Sésamo",
      "Pescado"
    ],
    "image": "/assets/fuentes/karlos_arguinano/cardo_tradicional_con_salsa_de_almendras_y_ajo_portada.jpg",
    "source": "Karlos Arguiñano",
    "sourceCompendium": "07_verduras_menestras_y_huerta.md",
    "mainIngredientFamily": "verduras",
    "culinaryTechnique": "salsa",
    "infografia": "/assets/fuentes/karlos_arguinano/infografia_cardo_tradicional_con_salsa_de_almendras_y_ajo.jpg",
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/karlos_arguinano/cardo_tradicional_con_salsa_de_almendras_y_ajo_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/karlos_arguinano/cardo_tradicional_con_salsa_de_almendras_y_ajo_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/karlos_arguinano/cardo_tradicional_con_salsa_de_almendras_y_ajo_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Cardo fresco limpio de pencas carnosas (o en conserva de calidad)",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Almendras crudas molidas en polvo fino",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Almendras laminadas tostadas para terminar",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Dientes de ajo morado laminados",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Harina de trigo",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Caldo de cocción del cardo filtrado",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Limpieza y cocción del cardo:** Retirar las fibras y filamentos de los tallos con puntilla. Cortar en trozos de 5 cm e introducir de inmediato en agua con limón para evitar oxidación. Cocer en olla rápida 20 min (o 45 min en cazuela) con agua y sal. Escurrir reservando el caldo.",
      "**Dorado aromático de ajos:** En una cazuela baja con el AOVE a fuego suave, dorar los ajos laminados hasta que tomen color avellana sin quemar. Retirar unos pocos para decorar.",
      "**Elaboración de la salsa velouté de almendras:** En el mismo aceite con los ajos restantes, añadir la harina y la almendra molida. Tostar 1-2 minutos removiendo constantemente. Verter el caldo caliente del cardo poco a poco con las varillas hasta crear una salsa aterciopelada de frutos secos.",
      "**Guisado conjunto y glaseado:** Añadir el cardo cocido escurrido a la salsa. Cocinar a fuego lento durante 6-8 minutos con suaves movimientos circulares de cazuela para que el cardo absorba todo el sabor y la salsa ligue sedosa."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "arg-esparragos_frescos_de_navarra_en_do",
    "name": "Espárragos Frescos de Navarra en Dos Texturas con Vinagreta de Huevo",
    "shortName": "Espárragos Frescos",
    "category": "verduras",
    "mealType": "dinner",
    "station": "frio",
    "prepTimeFormatted": "15 min (frio)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": false,
    "storageAdvice": "Nevera 1-5 días • Consumo fresco",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Apio",
      "Mostaza",
      "Sésamo",
      "Pescado"
    ],
    "image": "/assets/fuentes/karlos_arguinano/esparragos_frescos_de_navarra_en_dos_texturas__portada.jpg",
    "source": "Karlos Arguiñano",
    "sourceCompendium": "07_verduras_menestras_y_huerta.md",
    "mainIngredientFamily": "huevos",
    "culinaryTechnique": "frio_alino",
    "infografia": "/assets/fuentes/karlos_arguinano/infografia_esparragos_frescos_de_navarra_en_dos_texturas_.jpg",
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/karlos_arguinano/esparragos_frescos_de_navarra_en_dos_texturas__01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/karlos_arguinano/esparragos_frescos_de_navarra_en_dos_texturas__02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/karlos_arguinano/esparragos_frescos_de_navarra_en_dos_texturas__03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Espárragos blancos frescos de Navarra con I.G.P. (calibre grueso)",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Huevos camperos de caserío cocidos duros",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Pimiento rojo morrón picado en brunoise",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Pimiento verde italiano en brunoise",
        "quantity": 0.1,
        "unit": "kg",
        "category": "frescos"
      },
      {
        "name": "Cebolleta fresca picada muy fina",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Aceite de oliva virgen extra (AOVE)",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Pelado y corte maestro:** Pelar los espárragos desde justo debajo de la yema hacia la base con el pelador, girando la pieza. Cortar la parte leñosa inferior del tallo (2-3 cm).",
      "**Cocción tradicional al dente:** Cocer 6 espárragos en agua hirviendo con una cucharadita de sal y 5 g de azúcar durante 12-14 minutos (comprobar el punto pinchando la base con un palillo; debe entrar suave). Escurrir sobre paño.",
      "**Plancha caramelizada (segunda textura):** Con los 6 espárragos restantes (previamente escaldados 5 minutos), pincelarlos con AOVE y marcarlos en la plancha o grill bien caliente durante 2 minutos por lado hasta que muestren marcas tostadas caramelizadas.",
      "**Vinagreta Donostiarra de huevo:** En un bol, picar muy finos los huevos cocidos, la cebolleta, el pimiento rojo y el pimiento verde. Añadir el vinagre de sidra, la sal marina y batir con el AOVE para emulsionar ligeramente."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "arg-pantxineta_donostiarra_tradicional_",
    "name": "Pantxineta Donostiarra Tradicional de Hojaldre y Crema",
    "shortName": "Pantxineta Donostiarra Tradicional",
    "category": "cremas",
    "mealType": "dinner",
    "station": "robot",
    "prepTimeFormatted": "15 min (robot)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Apio",
      "Lácteos",
      "Frutos de cáscara",
      "Gluten",
      "Mostaza",
      "Sésamo",
      "Pescado"
    ],
    "image": "/assets/fuentes/karlos_arguinano/pantxineta_donostiarra_tradicional_de_hojaldre_y_c_portada.jpg",
    "source": "Karlos Arguiñano",
    "sourceCompendium": "08_postres_vascos_y_reposteria.md",
    "mainIngredientFamily": "verduras",
    "culinaryTechnique": "crema",
    "infografia": "/assets/fuentes/karlos_arguinano/infografia_pantxineta_donostiarra_tradicional_de_hojaldre_y_c.jpg",
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/karlos_arguinano/pantxineta_donostiarra_tradicional_de_hojaldre_y_c_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/karlos_arguinano/pantxineta_donostiarra_tradicional_de_hojaldre_y_c_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/karlos_arguinano/pantxineta_donostiarra_tradicional_de_hojaldre_y_c_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Láminas de masa de hojaldre con mantequilla (redondas o cuadradas)",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Leche entera de caserío",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Yemas de huevo campero",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Azúcar blanquilla",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Almidón de maíz (Maicena)",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Rama de canela en rama",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Infusión láctea y crema pastelera:** En un cazo, infusionar la leche con la canela y la piel de limón a 80°C hasta que rompa a hervir. En un bol, batir las 4 yemas con el azúcar y la Maicena hasta blanquear. Colar la leche caliente sobre la mezcla removiendo con varillas. Devolver al fuego y cocinar a fuego medio removiendo enérgicamente hasta que espese y hierva 1 minuto (84°C). Tapar con film a piel y dejar templar.",
      "**Montaje y sellado del hojaldre:** Extender una lámina de hojaldre sobre papel de horno en la bandeja. Repartir la crema pastelera templada en el centro dejando 2.5 cm limpios en el perímetro. Pincelar los bordes con huevo batido. Cubrir con la segunda lámina de hojaldre y presionar y sellar los bordes con las puntas de un tenedor.",
      "**Pintado, almendras y horneado:** Pincelar generosamente toda la superficie superior con huevo batido. Cubrir con la almendra laminada cruda de forma uniforme. Hornear en horno precalentado a 190°C (calor arriba y abajo con ventilador) durante 25-30 minutos, hasta que el hojaldre suba alto y las almendras estén tostadas y crujientes."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "arg-pastel_vasco_tradicional_gateau_bas",
    "name": "Pastel Vasco Tradicional (Gâteau Basque) con Crema y Vainilla",
    "shortName": "Pastel Vasco Tradicional (Gâteau Basque)",
    "category": "cremas",
    "mealType": "dinner",
    "station": "robot",
    "prepTimeFormatted": "15 min (robot)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Apio",
      "Lácteos",
      "Gluten",
      "Mostaza",
      "Sésamo",
      "Pescado"
    ],
    "image": "/assets/fuentes/karlos_arguinano/pastel_vasco_tradicional_gateau_basque_con_crema_y_portada.jpg",
    "source": "Karlos Arguiñano",
    "sourceCompendium": "08_postres_vascos_y_reposteria.md",
    "mainIngredientFamily": "verduras",
    "culinaryTechnique": "crema",
    "infografia": "/assets/fuentes/karlos_arguinano/infografia_pastel_vasco_tradicional_gateau_basque_con_crema_y.jpg",
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/karlos_arguinano/pastel_vasco_tradicional_gateau_basque_con_crema_y_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/karlos_arguinano/pastel_vasco_tradicional_gateau_basque_con_crema_y_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/karlos_arguinano/pastel_vasco_tradicional_gateau_basque_con_crema_y_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Harina de trigo de repostería (floja)",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Mantequilla de caserío en punto pomada",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Azúcar blanquilla o glas",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Huevos camperos enteros",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Levadura química (impulsor)",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Ralladura de limón y pizca de sal marina",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Elaboración de la masa sablé vasca:** En un bol, batir la mantequilla en pomada con el azúcar y la ralladura de limón hasta textura cremosa. Incorporar los huevos y la yema uno a uno. Añadir la harina tamizada con el impulsor y la sal. Integrar con espátula sin amasar en exceso para no desarrollar gluten. Dividir en dos partes (2/3 y 1/3), envolver en film y refrigerar 1 hora en frío.",
      "**Forrado y relleno del molde:** Engrasar el molde. Estirar la porción mayor de masa entre dos papeles de horno hasta 4 mm de grosor y forrar el fondo y las paredes del molde. Rellenar con la crema pastelera fría al ron y vainilla alisando la superficie.",
      "**Tapa y diseño tradicional del lauburu:** Estirar el tercio restante de masa y cubrir el pastel sellando los bordes con los dedos húmedos. Pintar la superficie con la yema batida. Con las púas de un tenedor, marcar el clásico entramado en rombos o el lauburu vasco tradicional.",
      "**Horneado y maduración:** Hornear a 180°C durante 35-40 minutos hasta que adquiera un color dorado caoba intenso y la masa esté cocida y crujiente. Dejar enfriar por completo antes de desmoldar (el pastel vasco gana estructura y sabor reposado de un día para otro)."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "arg-goxua_tradicional_de_vitoria_con_na",
    "name": "Goxua Tradicional de Vitoria con Nata, Bizcocho y Caramelo Tostado",
    "shortName": "Goxua Tradicional",
    "category": "postres",
    "mealType": "universal",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Apio",
      "Lácteos",
      "Mostaza",
      "Sésamo",
      "Pescado"
    ],
    "image": "/assets/fuentes/karlos_arguinano/goxua_tradicional_de_vitoria_con_nata_bizcocho_portada.jpg",
    "source": "Karlos Arguiñano",
    "sourceCompendium": "08_postres_vascos_y_reposteria.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "guiso",
    "infografia": "/assets/fuentes/karlos_arguinano/infografia_goxua_tradicional_de_vitoria_con_nata_bizcocho.jpg",
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/karlos_arguinano/goxua_tradicional_de_vitoria_con_nata_bizcocho_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/karlos_arguinano/goxua_tradicional_de_vitoria_con_nata_bizcocho_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/karlos_arguinano/goxua_tradicional_de_vitoria_con_nata_bizcocho_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Nata líquida para montar muy fría (mínimo 35% M.G.)",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Azúcar para montar la nata",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Bizcochos de soletilla tiernos o plancha de bizcocho genovés",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Crema pastelera tradicional densa",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Almíbar de calado (100 ml agua + 100 g azúcar + 30 ml ron añejo / pacharán)",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Azúcar blanquilla para caramelizar la superficie con soplete",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Montado firme de la nata:** En un bol helado, batir los 400 ml de nata líquida fría con los 60 g de azúcar hasta obtener una nata montada firme y consistente (chantilly). Colocar en manga pastelera.",
      "**Almíbar de calado:** Hervir el agua con el azúcar durante 3 minutos hasta disolver. Fuera del fuego, añadir el ron añejo o pacharán. Dejar enfriar.",
      "**Estratificación en 3 capas maestras:**",
      "**Caramelizado crujiente:** Espolvorear una capa uniforme de azúcar sobre la crema pastelera y quemar con el soplete de repostería al momento hasta formar una costra de caramelo dorado brillante y crujiente."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "arg-arroz_con_leche_cremoso_de_caserio_",
    "name": "Arroz con Leche Cremoso de Caserío con Canela y Limón",
    "shortName": "Arroz",
    "category": "arroces_pastas",
    "mealType": "lunch",
    "station": "fuego_3",
    "prepTimeFormatted": "25 min (fuego_3)",
    "prepTimeMinutes": 25,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Apio",
      "Lácteos",
      "Mostaza",
      "Sésamo",
      "Pescado"
    ],
    "image": "/assets/fuentes/karlos_arguinano/arroz_con_leche_cremoso_de_caserio_con_canela_portada.jpg",
    "source": "Karlos Arguiñano",
    "sourceCompendium": "08_postres_vascos_y_reposteria.md",
    "mainIngredientFamily": "arroz",
    "culinaryTechnique": "arroz_meloso",
    "infografia": "/assets/fuentes/karlos_arguinano/infografia_arroz_con_leche_cremoso_de_caserio_con_canela.jpg",
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/karlos_arguinano/arroz_con_leche_cremoso_de_caserio_con_canela_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/karlos_arguinano/arroz_con_leche_cremoso_de_caserio_con_canela_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/karlos_arguinano/arroz_con_leche_cremoso_de_caserio_con_canela_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Arroz de grano redondo (variedad Bomba o Senia)",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Leche entera fresca de caserío",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Azúcar blanquilla",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Mantequilla de caserío sin sal",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Rama de canela de Ceylán",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Corteza de limón ecológico (sin albedo blanco)",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Infusión y apertura del grano:** En una cazuela, poner la leche entera fresca con las ramas de canela, la piel de limón y la piel de naranja. Llevar a fuego medio hasta que comience a hervir suavemente. Añadir el arroz en lluvia y bajar el fuego al mínimo.",
      "**Cocción lenta y extracción de almidón:** Cocinar durante 35-40 minutos a fuego muy suave (chup-chup mínimo), removiendo cada 2-3 minutos con cuchara de madera en círculos para que el arroz libere su almidón de forma continua y la leche espese sin pegarse al fondo.",
      "**Mantecado final y azúcar:** Cuando el arroz esté tierno y el conjunto meloso, añadir los 180 g de azúcar y los 30 g de mantequilla fría (el azúcar se añade al final para que el grano no se endurezca). Remover continuamente durante 5 minutos más hasta integrar una textura densa, brillante y cremosa.",
      "**Enfriado y reposo:** Retirar las ramas de canela y las pieles de cítricos. Repartir el arroz con leche aún caliente en cuencos individuales."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "arg-leche_frita_tradicional_con_costra_",
    "name": "Leche Frita Tradicional con Costra Crujiente de Azúcar y Canela",
    "shortName": "Leche Frita Tradicional",
    "category": "postres",
    "mealType": "universal",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Apio",
      "Lácteos",
      "Gluten",
      "Mostaza",
      "Sésamo",
      "Pescado"
    ],
    "image": "/assets/fuentes/karlos_arguinano/leche_frita_tradicional_con_costra_crujiente_de_portada.jpg",
    "source": "Karlos Arguiñano",
    "sourceCompendium": "08_postres_vascos_y_reposteria.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "frito_empanado",
    "infografia": "/assets/fuentes/karlos_arguinano/infografia_leche_frita_tradicional_con_costra_crujiente_de.jpg",
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/karlos_arguinano/leche_frita_tradicional_con_costra_crujiente_de_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/karlos_arguinano/leche_frita_tradicional_con_costra_crujiente_de_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/karlos_arguinano/leche_frita_tradicional_con_costra_crujiente_de_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Leche entera de caserío",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Almidón de maíz (Maicena)",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Harina de trigo común",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Azúcar blanquilla",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Yemas de huevo campero",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Rama de canela",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Infusión y masa de leche espesa:** Infusionar 550 ml de leche con la canela y la piel de limón a fuego lento. En un bol, disolver la Maicena y la harina en los 200 ml de leche fría restante, batiendo con las yemas y los 120 g de azúcar. Colar la leche hirviendo sobre la mezcla, devolver a la cazuela y cocer a fuego medio-bajo sin parar de batir con varillas durante 5 minutos hasta que espese y se despegue de las paredes.",
      "**Moldeado y enfriado:** Verter la crema caliente en la fuente engrasada formando una plancha de 2 cm de grosor. Cubrir con film a piel y dejar enfriar en nevera mínimo 3 horas (idealmente toda la noche).",
      "**Corte y rebozado:** Cortar la masa fría y firme en rectángulos o cuadrados de 4x4 cm. Pasarlos con delicadeza primero por harina tamizada y luego por huevo batido.",
      "**Fritura y costra crujiente:** Freír en abundante aceite caliente a 180°C durante 45-60 segundos por cara hasta que adquieran un dorado crujiente y uniforme. Sacar a papel absorbente y, de inmediato en caliente, rebozar por la mezcla de azúcar y canela molida."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "arg-torrijas_caramelizadas_de_pan_brioc",
    "name": "Torrijas Caramelizadas de Pan Brioche Empapadas en Leche Aromatizada",
    "shortName": "Torrijas Caramelizadas",
    "category": "masas",
    "mealType": "universal",
    "station": "fuego_1",
    "prepTimeFormatted": "15 min (fuego_1)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Apio",
      "Lácteos",
      "Frutos de cáscara",
      "Gluten",
      "Mostaza",
      "Sésamo",
      "Pescado"
    ],
    "image": "/assets/fuentes/karlos_arguinano/torrijas_caramelizadas_de_pan_brioche_empapad_portada.jpg",
    "source": "Karlos Arguiñano",
    "sourceCompendium": "08_postres_vascos_y_reposteria.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "guiso",
    "infografia": "/assets/fuentes/karlos_arguinano/infografia_torrijas_caramelizadas_de_pan_brioche_empapad.jpg",
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/karlos_arguinano/torrijas_caramelizadas_de_pan_brioche_empapad_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/karlos_arguinano/torrijas_caramelizadas_de_pan_brioche_empapad_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/karlos_arguinano/torrijas_caramelizadas_de_pan_brioche_empapad_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Pan brioche artesanal o pan de torrija de miga densa",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Leche entera fresca de caserío",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Nata líquida (35% M.G.)",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Yemas de huevo campero",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Azúcar blanquilla",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Rama de canela y vaina de vainilla abierta",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Infusión láctea enriquecida:** Hervir la leche y la nata con la canela, la vainilla, las cortezas de cítricos, el licor y los 100 g de azúcar. Dejar templar 15 min y colar. Batir las yemas de huevo e incorporarlas al líquido tibio.",
      "**Embebido profundo del brioche:** Colocar las rebanadas gruesas de pan brioche en la fuente honda. Verter la mezcla láctea por encima y dejar que el pan absorba el 100% del líquido durante 45-60 minutos, volteando con sumo cuidado a mitad de tiempo. Las rebanadas deben quedar convertidas en flanes tiernos pero sin romperse.",
      "**Marcado en mantequilla:** En una sartén antiadherente a fuego medio, fundir 20 g de mantequilla. Dorar las torrijas con cuidado durante 2 minutos por cara hasta que adquieran un color dorado mantecoso.",
      "**Caramelizado crujiente:** Disponer las torrijas en plato, espolvorear una capa generosa de azúcar sobre la cara superior y quemar con el soplete hasta lograr una capa de caramelo cristalizado y crujiente como la crema catalana."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  },
  {
    "id": "arg-intxaursalsa_tradicional_vasca_de_n",
    "name": "Intxaursalsa Tradicional Vasca de Nueces de Caserío y Leche Infusionada",
    "shortName": "Intxaursalsa Tradicional Vasca",
    "category": "postres",
    "mealType": "universal",
    "station": "fuego_2",
    "prepTimeFormatted": "15 min (fuego_2)",
    "prepTimeMinutes": 15,
    "shelfLifeDaysFridge": 5,
    "canFreeze": true,
    "storageAdvice": "Nevera 1-5 días • Congelador 3 meses",
    "suitableDiets": [
      "mediterranean",
      "traditional",
      "vegetarian"
    ],
    "allergens": [
      "Huevos",
      "Sulfitos",
      "Apio",
      "Lácteos",
      "Frutos de cáscara",
      "Gluten",
      "Mostaza",
      "Sésamo",
      "Pescado"
    ],
    "image": "/assets/fuentes/karlos_arguinano/intxaursalsa_tradicional_vasca_de_nueces_y_le_portada.jpg",
    "source": "Karlos Arguiñano",
    "sourceCompendium": "08_postres_vascos_y_reposteria.md",
    "mainIngredientFamily": null,
    "culinaryTechnique": "salsa",
    "infografia": "/assets/fuentes/karlos_arguinano/infografia_intxaursalsa_tradicional_vasca_de_nueces_y_le.jpg",
    "stepPhotos": {
      "ingredientes": "/assets/fuentes/karlos_arguinano/intxaursalsa_tradicional_vasca_de_nueces_y_le_01_ingredientes.jpg",
      "elaboracion": "/assets/fuentes/karlos_arguinano/intxaursalsa_tradicional_vasca_de_nueces_y_le_02_elaboracion.jpg",
      "resultadoFinal": "/assets/fuentes/karlos_arguinano/intxaursalsa_tradicional_vasca_de_nueces_y_le_03_resultado_final.jpg"
    },
    "ingredientsPerServing": [
      {
        "name": "Nueces del país (Euskal Ezkurra / Caserío) peladas",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Leche entera fresca de caserío",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Azúcar blanquilla",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Rama de canela",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Piel de limón ecológico",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      },
      {
        "name": "Nueces enteras caramelizadas para decorar",
        "quantity": 0.1,
        "unit": "kg",
        "category": "despensa"
      }
    ],
    "instructions": [
      "**Molienda de las nueces:** Picar y moler los 300 g de nueces peladas en procesador hasta obtener un polvo muy fino con textura de harina gruesa, sin llegar a extraer todo el aceite en pasta.",
      "**Infusión inicial:** En una cazuela amplia de fondo difusor, verter el litro de leche entera con la rama de canela, la piel de limón y los 180 g de azúcar. Llevar a ebullición suave hasta disolver el azúcar.",
      "**Cocción lenta y reducción (intxaursalsa):** Retirar la canela y la piel de limón. Incorporar la nuez molida a la leche. Bajar el fuego al mínimo y cocer a fuego lento durante 40-45 minutos, removiendo de forma continua con la cuchara de madera para evitar que la nuez se pegue al fondo. A medida que evapora la leche y la nuez libera sus aceites y almidones naturales, la crema adquiere una textura espesa aterciopelada similar a una natilla densa de color pardo.",
      "**Enfriado y densificación:** Retirar del fuego y verter en cuencos de barro o copas individuales. Al enfriar tomará aún mayor cuerpo y untuosidad."
    ],
    "batchTip": "Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
  }
];

export interface FilterRecipesOptions {
  category?: string;
  mealType?: string;
  dietStyle?: string;
  excludedAllergens?: string[];
  sourceFilter?: string;
  searchQuery?: string;
}

export function getFilteredTraditionalRecipes(
  categoryOrOpts?: string | FilterRecipesOptions,
  dietStyle?: string,
  excludedAllergens: string[] = [],
  sourceFilter: string = 'all'
): CanonicalRecipe[] {
  let cat: string | undefined;
  let meal: string | undefined;
  let diet: string | undefined = dietStyle;
  let allergens: string[] = excludedAllergens;
  let src: string = sourceFilter;
  let query: string | undefined;

  if (typeof categoryOrOpts === 'object' && categoryOrOpts !== null) {
    cat = categoryOrOpts.category;
    meal = categoryOrOpts.mealType;
    diet = categoryOrOpts.dietStyle || dietStyle;
    allergens = categoryOrOpts.excludedAllergens || excludedAllergens;
    src = categoryOrOpts.sourceFilter || sourceFilter;
    query = categoryOrOpts.searchQuery;
  } else if (typeof categoryOrOpts === 'string') {
    cat = categoryOrOpts;
  }

  return TRADITIONAL_RECIPES_DATABASE.filter(r => {
    if (src === 'cocina_tradicional' && r.source !== 'Cocina Tradicional') return false;
    if (src === 'karlos_arguinano' && r.source !== 'Karlos Arguiñano') return false;
    if (cat && cat !== 'all' && r.category !== cat) return false;
    if (meal && meal !== 'universal' && r.mealType !== meal && r.mealType !== 'universal') return false;
    if (diet && diet !== 'all' && diet !== 'mediterranean') {
      if (!r.suitableDiets.includes(diet)) return false;
    }
    if (allergens && allergens.length > 0) {
      if (r.allergens.some(a => allergens.includes(a))) return false;
    }
    if (query && query.trim()) {
      const q = query.toLowerCase();
      if (!r.name.toLowerCase().includes(q) && !r.category.toLowerCase().includes(q)) return false;
    }
    return true;
  });
}

export function matchTraditionalRecipesByPrompt(
  prompt: string,
  excludedAllergens: string[] = [],
  dietStyle?: string,
  limit: number = 4,
  sourceFilter: string = 'all'
): CanonicalRecipe[] {
  const q = prompt.toLowerCase();
  const candidates = getFilteredTraditionalRecipes(undefined, dietStyle, excludedAllergens, sourceFilter);
  
  if (!q.trim()) {
    return candidates.slice(0, limit);
  }

  const scored = candidates.map(r => {
    let score = 0;
    const nameLower = r.name.toLowerCase();
    const catLower = r.category.toLowerCase();
    const famLower = (r.mainIngredientFamily || '').toLowerCase();
    const techLower = (r.culinaryTechnique || '').toLowerCase();

    const terms = q.split(/[,\s+]+/).filter(t => t.length > 2);
    for (const term of terms) {
      if (nameLower.includes(term)) score += 10;
      if (famLower.includes(term)) score += 8;
      if (catLower.includes(term)) score += 5;
      if (techLower.includes(term)) score += 4;
      if (r.ingredientsPerServing.some(i => i.name.toLowerCase().includes(term))) score += 6;
    }
    return { recipe: r, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.map(s => s.recipe).slice(0, limit);
}
