import { Recipe, DailyPlan, BatchCookingPlan, ReferenceChannel, UserNotebook, FridgeItem, GeneratedMenuPlan } from './types';

export const currentUser = {
  name: 'Cocinero',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDa22hHScqDx5XcNrcvHdwP5sBo5ghCgPPfO0mvZ_iHg4UHjq34jmx1IAUyjSB3hHUs5hsxhTQjVMO8tSRM_IW2C-G9bYqsoyJQ_-3zrqm7tAKTqnRMhB3hP6n1ATnGv6j4FC12ASS43oZe4IbhFrbPyyJdJPgi1N8ldGZ1fb30HPTKJnU8-_MRqyIxQQpMJOcWBIrL-F8wOw8tim-MczgQ2vEaM6ybS0HS9-RDhxI5zFQaYZEo_Xsj'
};

export const referenceChannels: ReferenceChannel[] = [
  {
    id: 'cocina-tradicional-es',
    name: 'Cocina Tradicional Española',
    author: 'Maestros del Recetario Popular',
    style: 'Cocina Casera Tradicional & Recetas Explicadas Paso a Paso',
    philosophy: 'Sabores auténticos de la abuela, trucos para que salgan perfectas a la primera, sin complicaciones.',
    keyTechniques: ['Bechamel cremosa sin grumos tamizada', 'Sofrito tradicional con ajo y vino montilla/jerez', 'Guisos con patata chascada para espesar caldo'],
    avatar: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'karlos-arguinano',
    name: 'Karlos Arguiñano - Rico y con Fundamento',
    author: 'Karlos Arguiñano',
    style: 'Cocina Casera Familiar & Saludable',
    philosophy: 'Rico, sano, con fundamento, productos de temporada y alegría en los fogones.',
    keyTechniques: ['Majado de ajo, perejil y sal gorda', 'Tronchado de patatas para liberar almidón', 'Pescados al horno con lecho de patata panadera'],
    avatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'batch-saludable-es',
    name: 'Batch Cooking & Cocina Saludable España',
    author: 'Futurlife21 & Being Biotiful',
    style: 'Planificación Semanal Antiinflamatoria & Salud Integral',
    philosophy: 'Cocinar 2 horas el domingo para comer sano toda la semana sin ultraprocesados.',
    keyTechniques: ['Asado en bloque de verduras de raíz', 'Centrifugado y secado hermético de hojas', 'Legumbres activadas en remojo con alga kombu'],
    avatar: 'https://images.unsplash.com/photo-1512485800893-b08ec1ea59b1?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'robin-food',
    name: 'Robin Food / David de Jorge',
    author: 'David de Jorge',
    style: 'Cocina Sin Bobadas & Guisos con Fundamento',
    philosophy: 'Mimo al producto, sofritos muy trabajados, caldos concentrados y raciones generosas.',
    keyTechniques: ['Sofrito de cebolla pochada 45 min', 'Desglasado con vino blanco', 'Guisos a fuego lento', 'Mantecado final de salsas'],
    avatar: 'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=150&auto=format&fit=crop&q=80'
  }
];

export const userNotebooks: UserNotebook[] = [
  {
    id: 'nb-trad-1',
    title: 'Croquetas de Jamón Cremosas (Cocina Tradicional)',
    channelId: 'cocina-tradicional-es',
    content: 'Tostar la harina en la mantequilla durante 3 minutos (roux) para quitar el sabor a crudo. Verter la leche entera caliente poco a poco remviendo con varillas sin parar. Añadir el jamón al final y reposar la masa tapada a piel en la nevera 12h.',
    tags: ['Croquetas', 'Cocina Tradicional', 'Bechamel'],
    updatedAt: '2026-08-06'
  },
  {
    id: 'nb-trad-2',
    title: 'Pollo en Salsa Tradicional (Cocina Tradicional)',
    channelId: 'cocina-tradicional-es',
    content: 'Dorar bien los trozos de pollo salpimentados con ajos enteros en camisa. Retirar pollo, pochar cebolla y pimiento, desglasar con vino blanco de Montilla/Jerez. Triturar la salsa para un acabado fino y espeso.',
    tags: ['Pollo', 'Cocina Tradicional', 'Guisos', 'Salsas'],
    updatedAt: '2026-08-06'
  },
  {
    id: 'nb-arguinano-1',
    title: 'Merluza en Salsa Verde con Almejas (Karlos Arguiñano)',
    channelId: 'karlos-arguinano',
    content: 'Hacer un sofrito de ajos picaditos en AOVE sin que se quemen. Añadir 1 cucharada de harina, cocinar 1 min y verter txakoli y caldo de pescado. Incorporar la merluza y las almejas; mover la cazuela en vaivén constante con abundante perejil fresco picado.',
    tags: ['Pescado', 'Karlos Arguiñano', 'Salsa Verde', 'Basco'],
    updatedAt: '2026-08-06'
  },
  {
    id: 'nb-arguinano-2',
    title: 'Patatas a la Riojana con Fundamento (Karlos Arguiñano)',
    channelId: 'karlos-arguinano',
    content: 'Tronchar (chascar) las patatas con el cuchillo para que suelten el almidón y mechen el caldo. Rehogar el chorizo en rodajas con pimiento choricero y laurél. Cubrir con agua y cocer a fuego lento 35 min destapado.',
    tags: ['Patatas', 'Karlos Arguiñano', 'Riojana', 'Guiso'],
    updatedAt: '2026-08-06'
  },
  {
    id: 'nb-batch-1',
    title: 'Bases de Verduras Asadas en Bloque (Batch Cooking Saludable)',
    channelId: 'batch-saludable-es',
    content: 'Cortar calabaza, boniato, calabacín y cebolla roja en dados homogéneos. Pincelar con AOVE, tomillo y orégano. Hornear 35 min a 200°C. Almacenar en tarros de cristal divididos para usar como guarnición o cremas durante 5 días.',
    tags: ['Batch Cooking', 'Verduras', 'Futurlife', 'Horno'],
    updatedAt: '2026-08-06'
  },
  {
    id: 'nb-batch-2',
    title: 'Conservación de Hojas Verdes 7 Días (Cocina Saludable)',
    channelId: 'batch-saludable-es',
    content: 'Lavar la lechuga/espinaca y centrifugar 2 veces hasta eliminar cualquier gota de humedad. Guardar en recipiente de vidrio colocando un papel de cocina absorvente en la base y otro arriba. Mantiene el crujiente fresco.',
    tags: ['Conservación', 'Ensaladas', 'Batch Cooking', 'Saludable'],
    updatedAt: '2026-08-06'
  }
];

export const initialFridgeStock: FridgeItem[] = [
  { id: 'f1', name: 'Ternera para guiso / mechada', quantity: 1200, unit: 'g', category: 'carnes-pescados', daysLeft: 5 },
  { id: 'f2', name: 'Lomos de merluza fresca', quantity: 800, unit: 'g', category: 'carnes-pescados', daysLeft: 3 },
  { id: 'f3', name: 'Cebollas dulces', quantity: 6, unit: 'unidades', category: 'frescos', daysLeft: 14 },
  { id: 'f4', name: 'Zanahorias', quantity: 8, unit: 'unidades', category: 'frescos', daysLeft: 12 },
  { id: 'f5', name: 'Pimientos verdes y rojos', quantity: 4, unit: 'unidades', category: 'frescos', daysLeft: 6 },
  { id: 'f6', name: 'Garbanzos cocidos en tarro', quantity: 800, unit: 'g', category: 'despensa', daysLeft: 90 },
  { id: 'f7', name: 'Lentejas pardinas secas', quantity: 500, unit: 'g', category: 'despensa', daysLeft: 180 },
  { id: 'f8', name: 'Tomate triturado natural', quantity: 1, unit: 'kg', category: 'despensa', daysLeft: 60 },
  { id: 'f9', name: 'Caldo de ave y verduras artesano', quantity: 2, unit: 'litros', category: 'refrigerados', daysLeft: 7 },
  { id: 'f10', name: 'Ajo y Perejil fresco', quantity: 1, unit: 'manojo', category: 'frescos', daysLeft: 8 },
  { id: 'f11', name: 'Aceite de oliva virgen extra', quantity: 1, unit: 'litro', category: 'especias', daysLeft: 300 }
];

export const sampleGeneratedMenuPlans: Record<string, GeneratedMenuPlan> = {
  AUTO_BATCH: {
    id: 'plan-auto-batch',
    title: 'Menú Batch Cooking Familiar Semanal',
    mode: 'AUTO_BATCH',
    peopleCount: 4,
    daysCount: 5,
    referenceChannelName: 'Robin Food / David de Jorge',
    items: [
      {
        dayName: 'Lunes',
        mealType: 'Almuerzo',
        dishName: 'Lentejas Estofadas con Sofrito Lento y Verduras (Robin Food)',
        servings: 4,
        prepTime: 'Ración lista de Batch',
        isFromFridge: true,
        referenceStyleApplied: 'Sofrito caramelizado de 40 min y caldo de ave concentrado.',
        ingredients: [
          { name: 'Lentejas pardinas', quantity: 400, unit: 'g', category: 'Despensa' },
          { name: 'Cebolla dulce', quantity: 2, unit: 'unidades', category: 'Frescos' },
          { name: 'Zanahoria', quantity: 2, unit: 'unidades', category: 'Frescos' },
          { name: 'Caldo de ave', quantity: 1, unit: 'litro', category: 'Refrigerados' }
        ],
        instructions: [
          'Regenerar en cazo a fuego medio añadiendo 50ml de caldo.',
          'Servir con un chorrito de AOVE en crudo y piparras picadas.'
        ]
      },
      {
        dayName: 'Martes',
        mealType: 'Cena',
        dishName: 'Ternera Mechada en su Jugo con Verduras Horneadas',
        servings: 4,
        prepTime: 'Ración al vacío lista',
        isFromFridge: true,
        referenceStyleApplied: 'Horneado lento con vino blanco y aromáticas.',
        ingredients: [
          { name: 'Ternera para mechada', quantity: 800, unit: 'g', category: 'Carnes & Pescados' },
          { name: 'Pimientos asados', quantity: 2, unit: 'unidades', category: 'Frescos' }
        ],
        instructions: [
          'Calentar la bolsa de vacío en baño maría 10 min a 70°C.',
          'Napar la carne lonchada con su jugo reducido.'
        ]
      }
    ],
    batchCookingSummary: {
      totalTime: '2 horas 30 min',
      sessionsCount: 1,
      recommendedTechniques: [
        'Envasado al vacío de raciones del día 3 al 5.',
        'Centrifugado y secado total de hojas verdes para ensaladas duraderas.'
      ]
    }
  }
};

export const mainBatchPlan: BatchCookingPlan = {

  id: 'batch-semanal-familiar',
  title: 'Mañana de Batch Cooking Saludable',
  description: 'Prepara en solo 2.5 horas la comida para toda la semana para varias personas: guiso de lentejas con verduras, ternera mechada en su jugo, bases de ensaladas crujientes y guarniciones de cereales.',
  prepTime: '2h 30 min',
  defaultServings: 5,
  totalMealsPrepared: 15,
  tags: ['Batch Cooking 100%', 'Envasado al Vacío', 'Apto Congelador', 'Saludable'],
  dishes: [
    {
      name: 'Lentejas Estofadas con Verduras (4-6 porciones)',
      servings: 5,
      calories: 380,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOm8Ee7RmIjD1WIvNmPMFkpcO5oXlhA_9GGrqjvlN8PEraYsDMZBT186PpNhduwZJKxBawUdeC8-oRrKGfw9kzUZctDUh1srEVBCZcNkJTks_E53kQq1RUjsv0aCHidCLC7kjf5Zefc0aBsIopE0SqYc9105RzdEQ4OZWZpgQ1uKFG1YjmqUSK98QClm50Aydzd0iiM8BLMCSL4OMmc4ok-rjNH-HFJd0C0y3jHklUuLU8wBLdPoy2'
    },
    {
      name: 'Ternera Mechada en su Jugo al Horno (5 porciones)',
      servings: 5,
      calories: 490,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZt0fPpxWCge4oe9Kpf-rf9nXmBe1HBhf7duKvzK8OQEgLZQga1RU0JoIl-Wh6WgPXuaxv9aCK6Qx0MEH68Isrqr2CWbzVlJAl2zbWzHhcSiwbEBqADFVML3WgV5UJscISCphj8SwTSMwc7G90XjzdnLP4PuG2Nrib3baEX9RmQmkQ30bte28cpwFKHehbj4JxxZZ0mfD-3_4BgimjHnRgjUxndoXWEXLmGiIJ-XTED9ZsBEAnerAt'
    },
    {
      name: 'Mix de Hojas Frescas y Vegetales Crujientes (6 porciones)',
      servings: 6,
      calories: 120,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-j1sLbiufmj31GUmI6AFyXA9CtJf-ifKnTH8fNBoxgzVdC0eny0FcFX93r7AvBBw9oSwz-SJF_ADsUt8NWO8FbiOUOt92FJxGfK5ZMtPbuyC7wNm3woG0HOevIQPEKfUReXxvJRCK4vtOLTiLddjm_KA8EFqbOmTFQK0yRwXXNHND3PCMJ4DoBKKEsJFLI2k_tjMcJhf1kA0PKh2ienvb-8NARqMOBxAEezl1DRMbm7QJYF2Rgcg9'
    }
  ],
  ingredientGroups: [
    {
      category: 'Proteínas & Legumbres',
      items: [
        { name: 'Lentejas pardinas (secas o cocidas)', baseQuantity: 500, unit: 'g', notes: 'Para 4-6 raciones' },
        { name: 'Carne de ternera para asar / mechada', baseQuantity: 1.2, unit: 'kg', notes: 'Para 5 raciones' },
        { name: 'Garbanzos cocidos', baseQuantity: 400, unit: 'g', notes: 'Para ensaladas y bowls' }
      ]
    },
    {
      category: 'Verduras & Hortalizas',
      items: [
        { name: 'Cebollas grandes & ajos', baseQuantity: 4, unit: 'unidades', notes: 'Base para sofritos y asado' },
        { name: 'Zanahorias y calabacines', baseQuantity: 6, unit: 'unidades', notes: 'Sofrito y asado' },
        { name: 'Pimientos (rojos y verdes)', baseQuantity: 4, unit: 'unidades', notes: 'Para hornear' },
        { name: 'Mix de lechugas, espinacas y rúculla', baseQuantity: 400, unit: 'g', notes: 'Secadas adecuadamente para 6 porciones' }
      ]
    },
    {
      category: 'Granos, Grasas & Condimentos',
      items: [
        { name: 'Quinoa o Arroz Integral', baseQuantity: 400, unit: 'g', notes: 'Cocinar en lote' },
        { name: 'Aceite de oliva virgen extra', baseQuantity: 150, unit: 'ml' },
        { name: 'Especias (laurel, pimentón, tomillo, romero)', baseQuantity: 1, unit: 'al gusto' }
      ]
    }
  ],
  timeline: [
    {
      timeBlock: '00:00 - 00:25',
      title: 'Mise en Place y Encendido de Horno',
      description: 'Picar todas las verduras en bloque (cebollas, ajos, zanahorias, pimientos). Precalentar el horno a 190°C.',
      icon: 'Scissors',
      tasks: [
        'Sellar la ternera en cazuela grande y pasar a bandeja de horno con aromáticas.',
        'Picar sofrito común para lentejas y verduras asadas.'
      ]
    },
    {
      timeBlock: '00:25 - 01:15',
      title: 'Cocción Simultánea (Fuego y Horno)',
      description: 'Aprovechar la cocción pasiva para preparar las legumbres y hornear proteínas y verduras.',
      icon: 'Flame',
      tasks: [
        'Iniciar el guiso de lentejas a fuego lento (40 min).',
        'Introducir la ternera y la bandeja de verduras al horno (50 min).',
        'Cocinar la quinoa / arroz en un cazo separado (15 min).'
      ]
    },
    {
      timeBlock: '01:15 - 01:45',
      title: 'Lavado de Hoja Verde y Vinagretas',
      description: 'Preparar la base de ensaladas secando bien la verdura para que dure 6 días crujiente.',
      icon: 'Leaf',
      tasks: [
        'Lavar, centrifugar y secar completamente las hojas de ensalada.',
        'Emulsionar vinagretas en tarros de cristal separados (no mezclar hasta comer).'
      ]
    },
    {
      timeBlock: '01:45 - 02:30',
      title: 'Enfriamiento Rápido, Vacío y Congelación',
      description: 'Empacar adecuadamente para garantizar máxima seguridad alimentaria y sabor.',
      icon: 'Wind',
      tasks: [
        'Enfriar los guisos y carnes a temperatura ambiente rápida sobre bandeja.',
        'Envasar al vacío las raciones de ternera y lentejas que se consumirán del día 4 al 7.',
        'Etiquetar bolsas y recipientes con fecha y método (Nevera vs Congelador).'
      ]
    }
  ],
  storageProtocols: [
    {
      title: 'Envasado al Vacío (Bolsas o Tuppers Apto Vacío)',
      technique: 'Extracción de oxígeno con envasadora',
      duration: '7 a 10 días en refrigeración (0-4°C)',
      description: 'Al eliminar el aire se frena la oxidación y proliferación bacteriana. Ideal para carnes mechadas, legumbres cocidas y guisos sin patata.'
    },
    {
      title: 'Congelación Rápida (-18°C)',
      technique: 'Porcionado individual / familiar previo',
      duration: 'Hasta 3 meses',
      description: 'Congelar en raciones para 1 o varias personas. Descongelar en nevera 24h antes de consumir para preservar textura.'
    },
    {
      title: 'Conservación en Cristal Hermético para Ensaladas',
      technique: 'Capas secas + servilleta de papel en la parte superior',
      duration: '5 a 6 días en refrigeración',
      description: 'Guardar las hojas bien secas sin aliño. Añadir el aliño en el momento exacto de servir.'
    }
  ]
};

export const trendingRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Quinoa Power Bowl',
    time: '15 min',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-j1sLbiufmj31GUmI6AFyXA9CtJf-ifKnTH8fNBoxgzVdC0eny0FcFX93r7AvBBw9oSwz-SJF_ADsUt8NWO8FbiOUOt92FJxGfK5ZMtPbuyC7wNm3woG0HOevIQPEKfUReXxvJRCK4vtOLTiLddjm_KA8EFqbOmTFQK0yRwXXNHND3PCMJ4DoBKKEsJFLI2k_tjMcJhf1kA0PKh2ienvb-8NARqMOBxAEezl1DRMbm7QJYF2Rgcg9',
  },
  {
    id: '2',
    title: 'Salmon & Asparagus',
    time: '25 min',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAoIDr2VE7O6pqBrildRXSYECWvlsUbfFT8o_Ze72Li65-HPOx1HP9jJtww4-ca-qBQI8m7Vl-EQRcmLmDnuTrhrG4TseFZIpxpbnu62YwdkOvD_zh185GflD5sfqEjhWDIADiJzfh5tReXt-I1wSvCZgXLyGNsCbP8uZUDWQ6QJFwcgaFteSSaLGGFC7ly3WsiLGEuWg8VtmqoySR_6dqd5Y5tH-_Q3pJ2i83sp6fzCQ_AbP1ibCD6',
  }
];

export const weeklyPlan: DailyPlan[] = [
  {
    day: 'Domingo',
    isPrepDay: true,
    meals: []
  },
  {
    day: 'Lunes',
    totalKcal: 970,
    macros: { c: 95, p: 65, g: 38 },
    meals: [
      {
        id: 'm1',
        type: 'LUNCH',
        title: 'Lentejas Estofadas con Verduras (Prep)',
        calories: 420,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOm8Ee7RmIjD1WIvNmPMFkpcO5oXlhA_9GGrqjvlN8PEraYsDMZBT186PpNhduwZJKxBawUdeC8-oRrKGfw9kzUZctDUh1srEVBCZcNkJTks_E53kQq1RUjsv0aCHidCLC7kjf5Zefc0aBsIopE0SqYc9105RzdEQ4OZWZpgQ1uKFG1YjmqUSK98QClm50Aydzd0iiM8BLMCSL4OMmc4ok-rjNH-HFJd0C0y3jHklUuLU8wBLdPoy2',
        macros: { c: 55, p: 25, g: 12 }
      },
      {
        id: 'm2',
        type: 'DINNER',
        title: 'Ternera Mechada con Vegetales Asados',
        calories: 550,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZt0fPpxWCge4oe9Kpf-rf9nXmBe1HBhf7duKvzK8OQEgLZQga1RU0JoIl-Wh6WgPXuaxv9aCK6Qx0MEH68Isrqr2CWbzVlJAl2zbWzHhcSiwbEBqADFVML3WgV5UJscISCphj8SwTSMwc7G90XjzdnLP4PuG2Nrib3baEX9RmQmkQ30bte28cpwFKHehbj4JxxZZ0mfD-3_4BgimjHnRgjUxndoXWEXLmGiIJ-XTED9ZsBEAnerAt',
        macros: { c: 30, p: 48, g: 20 }
      }
    ]
  },
  {
    day: 'Martes',
    totalKcal: 420,
    macros: { c: 55, p: 15, g: 16 },
    meals: [
      {
        id: 'm3',
        type: 'PREPPED LUNCH',
        title: 'Ensalada Crujiente con Garbanzos & Quinoa',
        calories: 420,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEwqy9qwm5EAOnGR7bdBqaLgDJ8Zi-WJn-P6W09AjNd7Fc6nw9tqPoO_mke3PFkiq-B6F8OjebmAz_bhsj3CKnd4FGt1Qd06Fbx82KKYUwNJpgahsGJ9wRXlFtb9j__IynTXfln06KXScIGLiiOT3lMiZVmmTnuivYBuCnXNIf_C5kt6ThjhaWLsJ49U1hVWZ5S_q9PcmPm-SfAmZzT2l6O_PwyMBUPPyYX2cwc0h9ftrjkTQQ--Ow',
        macros: { c: 55, p: 15, g: 16 }
      },
      {
        id: 'm4',
        type: 'DINNER',
        title: 'Ternera Mechada al Vacío (Recongelada / Conservada)',
        calories: 480,
      }
    ]
  },
  {
    day: 'Miércoles',
    totalKcal: 480,
    macros: { c: 60, p: 35, g: 12 },
    meals: [
      {
        id: 'm5',
        type: 'PREPPED LUNCH',
        title: 'Lentejas Estofadas (Ración 2 de Batch)',
        calories: 480,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVGnzTsK6Nay6hXJKvij8SliMrblh1vMvHJzObOur5khZOfJ5o02lqufrdP6zNpeR-h92snwuicnFl7t15ieDedl_Dki6kfGq1xjkv8bPGL_VZwf7cb3x5emOntSp8moIseJMjV3TfSwx6UYFtfcX8KnCMw31Mo3Q8B9nMopCcVLQPDP1lLPRm_Wt1qQeDjhzaXC0MfBkeBjGBiRY3pmSqPYQeu7bk0p1h1GZXPd-EJ6HnUXhKJKae',
        macros: { c: 60, p: 35, g: 12 }
      },
      {
        id: 'm6',
        type: 'DINNER',
        title: 'Planifica una comida',
      }
    ]
  }
];

export const detailedRecipe: Recipe = {
  id: 'r1',
  title: 'Bowls Mediterráneos Asados',
  description: 'Un bowl vibrante y rico en nutrientes, perfecto para la preparación semanal. Vegetales asados, hummus cremoso y garbanzos crujientes.',
  time: '45 min',
  servings: 4,
  calories: 420,
  tags: ['Vegano', 'Sin Gluten'],
  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhaOvV7nDEjMcWeh35lzxCZcgOYdn5yE4tngArKWv_4g3XgvELI5xmelYB08tGP496O7Phz_Z6Fao_5jF4mIkfs1-H_YzgFAksWLZMZaSXPxJIuTjcPGTPaAjw4BlKPH1-y4AwGF6v3GFLhWEpAmZcOVi1cMZYT0YF2-o1mnh5Zu9YSzL-Ghviem-XbBWdwTYd3QOFIYyxehSjFJ0O2MsaVxcNqGycjhRhFV6-uGT5TKt9KHBhc50Z'
};

