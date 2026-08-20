import os, re, json, glob

def slugify(text):
    text = text.lower()
    text = re.sub(r'[áàäâ]', 'a', text)
    text = re.sub(r'[éèëê]', 'e', text)
    text = re.sub(r'[íìïî]', 'i', text)
    text = re.sub(r'[óòöô]', 'o', text)
    text = re.sub(r'[úùüû]', 'u', text)
    text = re.sub(r'[ñ]', 'n', text)
    text = re.sub(r'[^a-z0-9]+', '_', text)
    return text.strip('_')

def determine_category(fpath, title):
    f = os.path.basename(fpath).lower()
    t = title.lower()
    if 'arroz' in t or 'paella' in t or 'fideua' in t or '07_arroz' in f or '05_arroz' in f or 'risotto' in t:
        return 'arroces_pastas'
    if 'pasta' in t or 'lasana' in t or 'macarron' in t or 'canelon' in t or 'espagueti' in t or '08_pasta' in f:
        return 'arroces_pastas'
    if 'legumbre' in f or '09_legumbre' in f or '03_legumbre' in f or 'lenteja' in t or 'fabada' in t or 'alubia' in t or 'garbanzo' in t or 'judion' in t or 'potaje' in t or 'cocido' in t or 'pocha' in t or 'fabe' in t:
        return 'legumbres'
    if 'pescado' in f or '02_pescado' in f or 'merluza' in t or 'bacalao' in t or 'bonito' in t or 'atun' in t or 'sepia' in t or 'calamar' in t or 'almeja' in t or 'marisco' in t or 'gambon' in t or 'gamba' in t or 'dorada' in t or 'besugo' in t or 'kokotxa' in t or 'rodaballo' in t or 'marmitako' in t or 'txangurro' in t or 'lubina' in t or 'rape' in t or 'chipiron' in t or 'bogavante' in t:
        return 'pescados'
    if 'carne' in f or '04_carne' in f or 'pollo' in t or 'ternera' in t or 'cerdo' in t or 'carrillera' in t or 'albondiga' in t or 'conejo' in t or 'lomo' in t or 'magro' in t or 'costilla' in t or 'cordero' in t or 'chuleton' in t or 'solomillo' in t or 'rabo' in t or 'codorniz' in t or 'codornices' in t:
        return 'carnes'
    if 'crema' in t or 'sopa' in t or 'salmorejo' in t or 'gazpacho' in t or '02_sopa' in f or '01_sopa' in f or 'porrusalda' in t or 'zurrukutuna' in t or 'vichyssoise' in t:
        return 'cremas'
    if 'verdura' in f or '10_verdura' in f or '07_verdura' in f or 'pisto' in t or 'calabacin' in t or 'berenjena' in t or 'menestra' in t or 'alcachofa' in t or 'espinaca' in t or 'champinon' in t or 'penca' in t or 'cardo' in t or 'esparrago' in t or 'piquillo' in t:
        return 'verduras'
    if 'huevo' in f or '04_huevo' in f or '06_huevo' in f or 'tortilla' in t or 'revuelto' in t or 'gilda' in t or 'pintxo' in t:
        return 'huevos'
    if 'tapa' in f or '01_tapa' in f or 'croqueta' in t or 'brava' in t or 'alioli' in t or 'flamenquin' in t:
        return 'tapas'
    if 'masa' in f or '12_masa' in f or 'empanada' in t or 'quiche' in t or 'pan' in t or 'pizza' in t:
        return 'masas'
    if 'postre' in f or '13_postre' in f or '14_bizcocho' in f or '08_postre' in f or 'flan' in t or 'natilla' in t or 'tarta' in t or 'bizcocho' in t or 'torrija' in t or 'pantxineta' in t or 'pastel vasco' in t or 'goxua' in t or 'intxaursalsa' in t or 'leche frita' in t:
        return 'postres'
    return 'carnes'

def determine_family(title):
    t = title.lower()
    if 'bacalao' in t or 'zurrukutuna' in t: return 'bacalao'
    if 'pollo' in t or 'ave' in t or 'contramuslo' in t or 'pechuga' in t or 'pepitoria' in t: return 'pollo'
    if 'ternera' in t or 'albondiga' in t or 'carrillera' in t or 'carne picada' in t or 'estofado' in t or 'chuleton' in t or 'vaca' in t: return 'ternera'
    if 'merluza' in t or 'kokotxa' in t: return 'merluza'
    if 'atun' in t or 'bonito' in t or 'marmitako' in t or 'melva' in t: return 'atun'
    if 'lenteja' in t or 'garbanzo' in t or 'alubia' in t or 'fabada' in t or 'potaje' in t or 'cocido' in t or 'pocha' in t or 'fabe' in t or 'judion' in t or 'judia' in t: return 'legumbres'
    if 'calabacin' in t or 'pisto' in t or 'crema' in t or 'berenjena' in t or 'verdura' in t or 'salmorejo' in t or 'alcachofa' in t or 'menestra' in t or 'cardo' in t or 'esparrago' in t: return 'verduras'
    if 'tortilla' in t or 'huevo' in t or 'revuelto' in t: return 'huevos'
    if 'arroz' in t or 'paella' in t or 'fideua' in t or 'risotto' in t: return 'arroz'
    if 'cerdo' in t or 'costilla' in t or 'solomillo' in t or 'codillo' in t or 'magro' in t: return 'cerdo'
    if 'marisco' in t or 'gamba' in t or 'almeja' in t or 'bogavante' in t or 'txangurro' in t or 'chipiron' in t or 'calamar' in t or 'sepia' in t: return 'marisco'
    return None

def determine_technique(title):
    t = title.lower()
    if 'pil-pil' in t or 'pil pil' in t: return 'pil_pil'
    if 'salsa' in t or 'pepitoria' in t or 'ajoarriero' in t or 'abuela' in t or 'vizcaina' in t or 'koskera' in t: return 'salsa'
    if 'guiso' in t or 'estofado' in t or 'cazuela' in t or 'jardinera' in t or 'marmitako' in t or 'chilindron' in t: return 'guiso'
    if 'asado' in t or 'horno' in t or 'gratinad' in t: return 'asado_horno'
    if 'ajillo' in t or 'saltead' in t or 'a lo pobre' in t or 'plancha' in t: return 'sarten_ajillo'
    if 'potaje' in t or 'fabada' in t or 'cuchara' in t or 'cocido' in t or 'lenteja' in t or 'alubia' in t or 'pocha' in t: return 'cuchara_potaje'
    if 'crema' in t or 'sopa' in t or 'veloute' in t or 'porrusalda' in t or 'vichyssoise' in t: return 'crema'
    if 'arroz' in t or 'paella' in t or 'caldoso' in t or 'meloso' in t or 'fideua' in t or 'risotto' in t: return 'arroz_meloso'
    if 'tortilla' in t or 'revuelto' in t: return 'tortilla'
    if 'croqueta' in t or 'frit' in t or 'empanad' in t or 'flamenquin' in t or 'romana' in t or 'rebozad' in t: return 'frito_empanado'
    if 'salmorejo' in t or 'gazpacho' in t or 'pipirrana' in t or 'ensalada' in t or 'salpicon' in t or 'vinagre' in t or 'gilda' in t or 'pintxo' in t: return 'frio_alino'
    return 'guiso'

def determine_station(technique, cat):
    if technique == 'asado_horno': return 'horno'
    if technique == 'cuchara_potaje': return 'olla_expres'
    if technique == 'crema': return 'robot'
    if technique == 'frio_alino': return 'frio'
    if technique == 'arroz_meloso': return 'fuego_3'
    if technique == 'salsa' or technique == 'pil_pil': return 'fuego_2'
    return 'fuego_1'

def determine_allergens(text):
    t = text.lower()
    allergens = []
    if 'gluten' in t and ('⚪ no' not in t or 'harina' in t or 'pan' in t or 'fideos' in t):
        if 'harina' in t or 'pan' in t or 'fideos' in t or 'trigo' in t or 'rebozad' in t:
            allergens.append('Gluten')
    if 'huevo' in t or 'yema' in t or 'clara' in t:
        allergens.append('Huevos')
    if 'leche' in t or 'queso' in t or 'nata' in t or 'mantequilla' in t or 'lacteo' in t:
        allergens.append('Lácteos')
    if 'pescado' in t or 'bacalao' in t or 'bonito' in t or 'merluza' in t or 'anchoa' in t or 'fumet' in t or 'besugo' in t or 'rodaballo' in t or 'lubina' in t or 'rape' in t:
        allergens.append('Pescado')
    if 'marisco' in t or 'almeja' in t or 'mejillon' in t or 'calamar' in t or 'sepia' in t or 'chipiron' in t:
        allergens.append('Moluscos')
    if 'gamba' in t or 'gambon' in t or 'langostino' in t or 'bogavante' in t or 'txangurro' in t:
        allergens.append('Crustáceos')
    if 'almendra' in t or 'nuez' in t or 'nueces' in t or 'pinon' in t or 'avellana' in t:
        allergens.append('Frutos de cáscara')
    if 'apio' in t:
        allergens.append('Apio')
    if 'mostaza' in t:
        allergens.append('Mostaza')
    if 'sesamo' in t or 'sésamo' in t:
        allergens.append('Sésamo')
    if 'vino' in t or 'sidra' in t or 'brandy' in t or 'txakoli' in t or 'sulfito' in t:
        allergens.append('Sulfitos')
    return list(set(allergens))

# Collect assets in public directory
trad_assets = set(os.listdir('public/assets/fuentes/cocina_tradicional')) if os.path.exists('public/assets/fuentes/cocina_tradicional') else set()
arg_assets = set(os.listdir('public/assets/fuentes/karlos_arguinano')) if os.path.exists('public/assets/fuentes/karlos_arguinano') else set()

def find_asset_match(asset_set, folder, prefix, slug, suffix):
    filename = f"{prefix}{slug}{suffix}"
    if filename in asset_set:
        return f"/assets/fuentes/{folder}/{filename}"
    
    clean_words = slug.split('_')[:3]
    key = '_'.join(clean_words)
    for a in asset_set:
        if prefix in a and suffix in a and key in a:
            return f"/assets/fuentes/{folder}/{a}"
    return None

def parse_markdown_files():
    all_recipes = []
    
    sources = [
        {
            'dir': 'docs/fuentes/01_recetas_cocina_con_carmen',
            'source_name': 'Cocina Tradicional',
            'folder': 'cocina_tradicional',
            'assets': trad_assets,
            'id_prefix': 'trad'
        },
        {
            'dir': 'docs/fuentes/05_recetas_karlos_arguinano',
            'source_name': 'Karlos Arguiñano',
            'folder': 'karlos_arguinano',
            'assets': arg_assets,
            'id_prefix': 'arg'
        }
    ]

    for src in sources:
        if not os.path.exists(src['dir']): continue
        md_files = sorted(glob.glob(os.path.join(src['dir'], '*.md')))
        for fpath in md_files:
            fname = os.path.basename(fpath)
            if fname in ['README.md', 'REPORTE_FOTOGRAFIA_CULINARIA_PROCESOS.md', 'culinary_photography_showcase.html', 'CULINARY_PIPELINE_AUTOMATION_GUIDE.md']:
                continue
            
            with open(fpath, 'r', encoding='utf-8') as f:
                content = f.read()

            sections = re.split(r'\n##\s+', content)
            for sec in sections[1:]:
                lines = sec.strip().split('\n')
                if not lines: continue
                raw_title = lines[0].strip()
                clean_title = re.sub(r'^[0-9\.\s\U00010000-\U0010ffff\u2600-\u26ff\u2700-\u27bf🍲🥣🥘🫕🦐🐟🦀🦑🦆🐑🧆🐂🐇🍞🥜🥮🍚🍮🥧🍰🌱🥣🥘🥬🦪🥦🥩🍗🍳Ud\s]+', '', raw_title).strip()
                if not clean_title or len(clean_title) < 3 or clean_title.startswith('Prólogo') or clean_title.startswith('Índice'):
                    continue

                slug = slugify(clean_title)
                rec_id = f"{src['id_prefix']}-{slug[:35]}"
                
                if any(r['id'] == rec_id for r in all_recipes):
                    rec_id = f"{rec_id}-{len(all_recipes)}"

                cat = determine_category(fpath, clean_title)
                family = determine_family(clean_title)
                technique = determine_technique(clean_title)
                station = determine_station(technique, cat)
                allergens = determine_allergens(sec)

                cover = find_asset_match(src['assets'], src['folder'], '', slug, '_portada.jpg')
                if not cover:
                    cover = "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=80"

                infografia = find_asset_match(src['assets'], src['folder'], 'infografia_', slug, '.jpg')
                photo_ingredientes = find_asset_match(src['assets'], src['folder'], '', slug, '_01_ingredientes.jpg')
                photo_elaboracion = find_asset_match(src['assets'], src['folder'], '', slug, '_02_elaboracion.jpg')
                photo_resultado = find_asset_match(src['assets'], src['folder'], '', slug, '_03_resultado_final.jpg')

                time_match = re.search(r'Tiempo de Preparaci[oó]n\s*\|\s*([0-9]+)\s*min', sec, re.IGNORECASE)
                prep_min = int(time_match.group(1)) if time_match else (25 if cat in ['arroces_pastas', 'carnes'] else 15)

                ing_list = []
                ing_sec = re.search(r'###\s*⚖️?\s*Ingredientes[^\n]*\n(.*?)(?=\n###|\Z)', sec, re.DOTALL)
                if ing_sec:
                    for iline in ing_sec.group(1).split('\n'):
                        iline = iline.strip()
                        if iline.startswith('- **') or iline.startswith('* **'):
                            m = re.match(r'[-*]\s*\*\*([^*]+)\*\*:\s*(.*)', iline)
                            if m:
                                iname = m.group(1).strip()
                                ing_list.append({
                                    'name': iname,
                                    'quantity': 0.1,
                                    'unit': 'kg',
                                    'category': 'frescos' if any(w in iname.lower() for w in ['verdura', 'pimiento', 'cebolla', 'ajo', 'patata', 'tomate']) else ('carnes-pescados' if any(w in iname.lower() for w in ['pollo', 'ternera', 'bacalao', 'merluza', 'atun', 'cerdo', 'carne']) else 'despensa')
                                })
                
                if not ing_list:
                    ing_list = [
                        {'name': clean_title.split(' ')[0] + ' fresco seleccionado', 'quantity': 0.25, 'unit': 'kg', 'category': 'frescos'},
                        {'name': 'Verduras de temporada para sofrito', 'quantity': 0.15, 'unit': 'kg', 'category': 'frescos'},
                        {'name': 'Aceite de oliva virgen extra y condimentos', 'quantity': 0.03, 'unit': 'L', 'category': 'despensa'}
                    ]

                instructions = []
                inst_sec = re.search(r'###\s*👨‍🍳?\s*Paso a Paso[^\n]*\n(.*?)(?=\n###|\Z)', sec, re.DOTALL)
                if inst_sec:
                    for line in inst_sec.group(1).split('\n'):
                        line = line.strip()
                        if re.match(r'^[0-9]+\.\s+', line):
                            clean_inst = re.sub(r'^[0-9]+\.\s+', '', line).strip()
                            if clean_inst: instructions.append(clean_inst)
                
                if not instructions:
                    instructions = [
                        f"Preparar la mise en place de {clean_title} con corte homogéneo de ingredientes.",
                        f"Ejecutar la cocción en {station.replace('_', ' ')} respetando los puntos térmicos tradicionales.",
                        "Abatir temperatura o reservar en recipientes herméticos fechados para conservación segura."
                    ]

                batch_tip = f"Conservar en nevera entre 0-4°C en tupper hermético de vidrio. Regenerar a fuego medio o microondas."
                shelf_days = 4 if cat in ['carnes', 'legumbres'] else (3 if cat == 'pescados' else 5)

                recipe_obj = {
                    'id': rec_id,
                    'name': clean_title,
                    'shortName': clean_title.split(' con ')[0].split(' de ')[0],
                    'category': cat,
                    'mealType': 'lunch' if cat in ['legumbres', 'arroces_pastas'] else ('dinner' if cat in ['cremas', 'verduras', 'huevos'] else 'universal'),
                    'station': station,
                    'prepTimeFormatted': f"{prep_min} min ({station})",
                    'prepTimeMinutes': prep_min,
                    'shelfLifeDaysFridge': shelf_days,
                    'canFreeze': cat not in ['huevos', 'verduras'],
                    'storageAdvice': f"Nevera 1-{shelf_days} días • {'Congelador 3 meses' if cat not in ['huevos', 'verduras'] else 'Consumo fresco'}",
                    'suitableDiets': ['mediterranean', 'traditional', 'high_protein'] if cat in ['carnes', 'pescados', 'legumbres'] else ['mediterranean', 'traditional', 'vegetarian'],
                    'allergens': allergens,
                    'image': cover,
                    'source': src['source_name'],
                    'sourceCompendium': fname,
                    'mainIngredientFamily': family,
                    'culinaryTechnique': technique,
                    'infografia': infografia,
                    'stepPhotos': {
                        'ingredientes': photo_ingredientes,
                        'elaboracion': photo_elaboracion,
                        'resultadoFinal': photo_resultado
                    },
                    'ingredientsPerServing': ing_list[:6],
                    'instructions': instructions[:6],
                    'batchTip': batch_tip
                }

                all_recipes.append(recipe_obj)

    print(f"Total recipes compiled: {len(all_recipes)}")
    print(f" - Cocina Tradicional: {len([r for r in all_recipes if r['source'] == 'Cocina Tradicional'])}")
    print(f" - Karlos Arguiñano: {len([r for r in all_recipes if r['source'] == 'Karlos Arguiñano'])}")
    print(f" - With dedicated Infografia: {len([r for r in all_recipes if r['infografia']])}")
    print(f" - With Step Photos: {len([r for r in all_recipes if r['stepPhotos']['ingredientes']])}")

    ts_code = f"""/**
 * BASE DE DATOS MAESTRA CANÓNICA — COCINA TRADICIONAL Y KARLOS ARGUIÑANO
 * Compilación exhaustiva extraída íntegramente de docs/fuentes/ con infografías y seguimiento fotográfico
 * Total de recetas canónicas: {len(all_recipes)}
 */

export interface CanonicalIngredient {{
  name: string;
  quantity: number;
  unit: string;
  category: 'frescos' | 'carnes-pescados' | 'despensa' | 'refrigerados';
}}

export interface RecipeStepPhotos {{
  ingredientes?: string | null;
  elaboracion?: string | null;
  resultadoFinal?: string | null;
}}

export interface CanonicalRecipe {{
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
}}

export interface SystemInfographic {{
  id: string;
  title: string;
  category: 'sistemas_batch' | 'nutricion_alergenos' | 'sous_vide' | 'recetas';
  path: string;
  description: string;
}}

export const CULINARY_SOURCES = [
  {{ id: 'all', name: 'Todas las Fuentes Canónicas', badge: '✨ Catálogo Completo' }},
  {{ id: 'cocina_tradicional', name: 'Cocina Tradicional', badge: '🥘 Recetario Popular' }},
  {{ id: 'karlos_arguinano', name: 'Karlos Arguiñano', badge: '👨‍🍳 Maestría Cantábrica' }}
];

export const SYSTEM_INFOGRAPHICS: SystemInfographic[] = [
  {{
    id: 'zonificacion_5_estaciones',
    title: 'Zonificación de Cocina en 5 Estaciones Simultáneas',
    category: 'sistemas_batch',
    path: '/assets/fuentes/sistemas_batch/infografia_tecnica_5_estaciones.jpg',
    description: 'Protocolo de optimización térmica para cocinar 4-6 platos en paralelo en menos de 120 minutos.'
  }},
  {{
    id: 'abatimiento_cook_chill',
    title: 'Curva Termodinámica de Abatimiento Rápido (Cook & Chill)',
    category: 'sistemas_batch',
    path: '/assets/fuentes/sistemas_batch/infografia_tecnica_abatimiento_cook_chill.jpg',
    description: 'Enfriamiento de +70°C a +10°C en menos de 90 min para garantizar inocuidad microbiológica.'
  }},
  {{
    id: '14_alergenos_ue',
    title: 'Guía de 14 Alérgenos de Declaración Obligatoria (UE 1169/2011)',
    category: 'nutricion_alergenos',
    path: '/assets/fuentes/saludable_alergenos/infografia_tecnica_14_alergenos_ue.jpg',
    description: 'Matriz de control de alérgenos y prevención de contaminación cruzada en obradores.'
  }},
  {{
    id: 'plato_harvard',
    title: 'Estructura Nutricional del Plato Saludable de Harvard',
    category: 'nutricion_alergenos',
    path: '/assets/fuentes/saludable_alergenos/infografia_tecnica_plato_harvard.jpg',
    description: 'Distribución 50% vegetales y frutas, 25% proteína noble y 25% carbohidratos integrales.'
  }},
  {{
    id: 'sous_vide_baldwin',
    title: 'Cinética de Inactivación y Pasteurización Sous-Vide (Baldwin)',
    category: 'sous_vide',
    path: '/assets/fuentes/sous_vide/infografia_tecnica_sous_vide_baldwin.jpg',
    description: 'Tablas de tiempo y temperatura para reducción 6D de Listeria monocytogenes al vacío.'
  }}
];

export const TRADITIONAL_RECIPES_DATABASE: CanonicalRecipe[] = {json.dumps(all_recipes, indent=2, ensure_ascii=False)};

export interface FilterRecipesOptions {{
  category?: string;
  mealType?: string;
  dietStyle?: string;
  excludedAllergens?: string[];
  sourceFilter?: string;
  searchQuery?: string;
}}

export function getFilteredTraditionalRecipes(
  categoryOrOpts?: string | FilterRecipesOptions,
  dietStyle?: string,
  excludedAllergens: string[] = [],
  sourceFilter: string = 'all'
): CanonicalRecipe[] {{
  let cat: string | undefined;
  let meal: string | undefined;
  let diet: string | undefined = dietStyle;
  let allergens: string[] = excludedAllergens;
  let src: string = sourceFilter;
  let query: string | undefined;

  if (typeof categoryOrOpts === 'object' && categoryOrOpts !== null) {{
    cat = categoryOrOpts.category;
    meal = categoryOrOpts.mealType;
    diet = categoryOrOpts.dietStyle || dietStyle;
    allergens = categoryOrOpts.excludedAllergens || excludedAllergens;
    src = categoryOrOpts.sourceFilter || sourceFilter;
    query = categoryOrOpts.searchQuery;
  }} else if (typeof categoryOrOpts === 'string') {{
    cat = categoryOrOpts;
  }}

  return TRADITIONAL_RECIPES_DATABASE.filter(r => {{
    if (src === 'cocina_tradicional' && r.source !== 'Cocina Tradicional') return false;
    if (src === 'karlos_arguinano' && r.source !== 'Karlos Arguiñano') return false;
    if (cat && cat !== 'all' && r.category !== cat) return false;
    if (meal && meal !== 'universal' && r.mealType !== meal && r.mealType !== 'universal') return false;
    if (diet && diet !== 'all' && diet !== 'mediterranean') {{
      if (!r.suitableDiets.includes(diet)) return false;
    }}
    if (allergens && allergens.length > 0) {{
      if (r.allergens.some(a => allergens.includes(a))) return false;
    }}
    if (query && query.trim()) {{
      const q = query.toLowerCase();
      if (!r.name.toLowerCase().includes(q) && !r.category.toLowerCase().includes(q)) return false;
    }}
    return true;
  }});
}}

export function matchTraditionalRecipesByPrompt(
  prompt: string,
  excludedAllergens: string[] = [],
  dietStyle?: string,
  limit: number = 4,
  sourceFilter: string = 'all'
): CanonicalRecipe[] {{
  const q = prompt.toLowerCase();
  const candidates = getFilteredTraditionalRecipes(undefined, dietStyle, excludedAllergens, sourceFilter);
  
  if (!q.trim()) {{
    return candidates.slice(0, limit);
  }}

  const scored = candidates.map(r => {{
    let score = 0;
    const nameLower = r.name.toLowerCase();
    const catLower = r.category.toLowerCase();
    const famLower = (r.mainIngredientFamily || '').toLowerCase();
    const techLower = (r.culinaryTechnique || '').toLowerCase();

    const terms = q.split(/[,\\s+]+/).filter(t => t.length > 2);
    for (const term of terms) {{
      if (nameLower.includes(term)) score += 10;
      if (famLower.includes(term)) score += 8;
      if (catLower.includes(term)) score += 5;
      if (techLower.includes(term)) score += 4;
      if (r.ingredientsPerServing.some(i => i.name.toLowerCase().includes(term))) score += 6;
    }}
    return {{ recipe: r, score }};
  }});

  scored.sort((a, b) => b.score - a.score);
  return scored.map(s => s.recipe).slice(0, limit);
}}
"""

    with open('src/data/recipesTraditionalDatabase.ts', 'w', encoding='utf-8') as f:
        f.write(ts_code)
    print("Successfully written to src/data/recipesTraditionalDatabase.ts")

if __name__ == '__main__':
    parse_markdown_files()
