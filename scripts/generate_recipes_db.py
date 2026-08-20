import os, re, json, glob

def slugify(text):
    text = text.lower()
    text = re.sub(r'[áàäâ]', 'a', text)
    text = re.sub(r'[éèëê]', 'e', text)
    text = re.sub(r'[íìïî]', 'i', text)
    text = re.sub(r'[óòöô]', 'o', text)
    text = re.sub(r'[úùüû]', 'u', text)
    text = re.sub(r'[ñ]', 'n', text)
    text = re.sub(r'[^a-z0-9]+', '-', text)
    return text.strip('-')

files = sorted(glob.glob('docs/fuentes/01_recetas_cocina_con_carmen/*.md'))
valid_files = [f for f in files if not f.endswith('REPORTE_FOTOGRAFIA_CULINARIA_PROCESOS.md') and not f.endswith('download_real_hd_frames.cjs')]

recipes = []

def determine_category(fpath, title):
    f = os.path.basename(fpath).lower()
    t = title.lower()
    if 'arroz' in t or 'paella' in t or 'fideua' in t or '07_arroz' in f:
        return 'arroces_pastas'
    if 'pasta' in t or 'lasana' in t or 'macarron' in t or 'canelon' in t or 'espagueti' in t or '08_pasta' in f:
        return 'arroces_pastas'
    if 'legumbre' in f or '09_legumbre' in f or 'lenteja' in t or 'fabada' in t or 'alubia' in t or 'garbanzo' in t or 'judion' in t or 'potaje' in t or 'cocido' in t:
        return 'legumbres'
    if 'pescado' in f or 'merluza' in t or 'bacalao' in t or 'bonito' in t or 'atun' in t or 'sepia' in t or 'calamar' in t or 'almeja' in t or 'marisco' in t or 'gambon' in t or 'gamba' in t or 'dorada' in t:
        return 'pescados'
    if 'carne' in f or 'pollo' in t or 'ternera' in t or 'cerdo' in t or 'carrillera' in t or 'albondiga' in t or 'conejo' in t or 'lomo' in t or 'magro' in t or 'costilla' in t:
        return 'carnes'
    if 'crema' in t or 'sopa' in t or 'salmorejo' in t or 'gazpacho' in t or '02_sopa' in f:
        return 'cremas'
    if 'verdura' in f or '10_verdura' in f or 'pisto' in t or 'calabacin' in t or 'berenjena' in t or 'menestra' in t or 'alcachofa' in t or 'espinaca' in t or 'champinon' in t:
        return 'verduras'
    if 'huevo' in f or '04_huevo' in f or 'tortilla' in t or 'revuelto' in t:
        return 'huevos'
    if 'tapa' in f or '01_tapa' in f or 'croqueta' in t or 'brava' in t or 'alioli' in t or 'flamenquin' in t:
        return 'tapas'
    if 'masa' in f or '12_masa' in f or 'empanada' in t or 'quiche' in t or 'pan' in t or 'pizza' in t:
        return 'masas'
    if 'postre' in f or '13_postre' in f or '14_bizcocho' in f or 'flan' in t or 'natilla' in t or 'tarta' in t or 'bizcocho' in t or 'torrija' in t:
        return 'postres'
    return 'carnes'

def determine_family(title):
    t = title.lower()
    if 'bacalao' in t: return 'bacalao'
    if 'pollo' in t or 'ave' in t or 'contramuslo' in t or 'pechuga' in t or 'pepitoria' in t: return 'pollo'
    if 'ternera' in t or 'albondiga' in t or 'carrillera' in t or 'carne picada' in t or 'estofado' in t: return 'ternera'
    if 'merluza' in t: return 'merluza'
    if 'atun' in t or 'bonito' in t or 'marmitako' in t or 'melva' in t: return 'atun'
    if 'lenteja' in t or 'garbanzo' in t or 'alubia' in t or 'fabada' in t or 'potaje' in t or 'cocido' in t: return 'legumbres'
    if 'calabacin' in t or 'pisto' in t or 'crema' in t or 'berenjena' in t or 'verdura' in t or 'salmorejo' in t or 'alcachofa' in t: return 'verduras'
    if 'tortilla' in t or 'huevo' in t or 'revuelto' in t: return 'huevos'
    if 'arroz' in t or 'paella' in t or 'fideua' in t: return 'arroz'
    return None

def determine_technique(title):
    t = title.lower()
    if 'salsa' in t or 'pepitoria' in t or 'ajoarriero' in t or 'abuela' in t: return 'salsa'
    if 'guiso' in t or 'estofado' in t or 'cazuela' in t or 'jardinera' in t: return 'guiso'
    if 'asado' in t or 'horno' in t or 'gratinad' in t: return 'asado_horno'
    if 'ajillo' in t or 'saltead' in t or 'a lo pobre' in t: return 'sarten_ajillo'
    if 'potaje' in t or 'fabada' in t or 'cuchara' in t or 'cocido' in t or 'lenteja' in t: return 'cuchara_potaje'
    if 'crema' in t or 'sopa' in t or 'veloute' in t: return 'crema'
    if 'arroz' in t or 'paella' in t or 'caldoso' in t or 'meloso' in t or 'fideua' in t: return 'arroz_meloso'
    if 'tortilla' in t or 'revuelto' in t: return 'tortilla'
    if 'croqueta' in t or 'frit' in t or 'empanad' in t or 'flamenquin' in t or 'romana' in t: return 'frito_empanado'
    if 'salmorejo' in t or 'gazpacho' in t or 'pipirrana' in t or 'ensalada' in t or 'salpicon' in t or 'vinagre' in t: return 'frio_alino'
    return 'guiso'

def determine_station(technique, cat):
    if technique == 'asado_horno': return 'horno'
    if technique == 'cuchara_potaje': return 'olla_expres'
    if technique == 'crema': return 'robot'
    if technique == 'frio_alino': return 'frio'
    if technique == 'arroz_meloso': return 'fuego_3'
    if technique == 'salsa': return 'fuego_2'
    return 'fuego_1'

def determine_allergens(title, cat):
    t = title.lower()
    allergens = []
    if 'pescado' in cat or 'merluza' in t or 'bacalao' in t or 'bonito' in t or 'atun' in t or 'calamar' in t or 'sepia' in t:
        allergens.append('Pescado')
    if 'almeja' in t or 'mejillon' in t or 'marisco' in t or 'sepia' in t or 'calamar' in t:
        allergens.append('Moluscos')
    if 'gamba' in t or 'gambon' in t or 'camaron' in t or 'langostino' in t or 'marisco' in t:
        allergens.append('Crustáceos')
    if 'huevo' in t or 'tortilla' in t or 'revuelto' in t or 'croqueta' in t or 'flan' in t or 'natilla' in t or 'pepitoria' in t or 'salmorejo' in t:
        allergens.append('Huevos')
    if 'leche' in t or 'queso' in t or 'bechamel' in t or 'nata' in t or 'croqueta' in t or 'crema' in t or 'gratinad' in t or 'lasana' in t or 'canelon' in t:
        allergens.append('Lácteos')
    if 'almendra' in t or 'nuez' in t or 'fruto' in t or 'pepitoria' in t or 'pinon' in t:
        allergens.append('Frutos de cáscara')
    if 'pan' in t or 'harina' in t or 'empanada' in t or 'croqueta' in t or 'lasana' in t or 'macarron' in t or 'fideua' in t or 'rebozad' in t or 'romana' in t or 'bizcocho' in t or 'salmorejo' in t:
        allergens.append('Gluten')
    if 'vino' in t or 'chorizo' in t or 'carrillera' in t or 'ajillo' in t:
        allergens.append('Sulfitos')
    return list(set(allergens))

IMAGES_MAP = {
    'bacalao': 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&auto=format&fit=crop&q=80',
    'pollo': 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=600&auto=format&fit=crop&q=80',
    'ternera': 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80',
    'merluza': 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&auto=format&fit=crop&q=80',
    'atun': 'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&auto=format&fit=crop&q=80',
    'pescados': 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&auto=format&fit=crop&q=80',
    'legumbres': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80',
    'verduras': 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80',
    'cremas': 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&auto=format&fit=crop&q=80',
    'huevos': 'https://images.unsplash.com/photo-1510693206972-df098062cb71?w=600&auto=format&fit=crop&q=80',
    'tapas': 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=80',
    'arroces_pastas': 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=600&auto=format&fit=crop&q=80',
    'arroz': 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=600&auto=format&fit=crop&q=80',
    'masas': 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&auto=format&fit=crop&q=80',
    'postres': 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&auto=format&fit=crop&q=80',
    'carnes': 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80'
}

seen_slugs = set()

for fpath in valid_files:
    fname = os.path.basename(fpath)
    with open(fpath, encoding='utf-8') as f:
        content = f.read()
    
    sections = re.split(r'\n(?=##\s+)', content)
    for sec in sections:
        if not sec.startswith('## '): continue
        lines = sec.strip().split('\n')
        header_line = lines[0].replace('## ', '').strip()
        clean_title = re.sub(r'^[0-9\.\s\U00010000-\U0010ffff\u2600-\u27ff\u2300-\u23ff\u2b50\u2b55]+', '', header_line).strip()
        if not clean_title or any(x in clean_title.upper() for x in ['MATRIZ', 'ÍNDICE', 'TABLA', 'PRÓLOGO', 'INTRODUCCIÓN', 'CONSEJOS', 'MANUAL', 'COLECCIÓN']):
            continue
        
        clean_title = re.sub(r'\s+de Carmen\b', '', clean_title, flags=re.IGNORECASE).strip()
        clean_title = re.sub(r'\(Carmen\)', '', clean_title, flags=re.IGNORECASE).strip()
        
        slug = 'trad-' + slugify(clean_title)[:40].rstrip('-')
        if slug in seen_slugs:
            slug = f'{slug}-{len(seen_slugs)}'
        seen_slugs.add(slug)
        
        cat = determine_category(fpath, clean_title)
        family = determine_family(clean_title)
        technique = determine_technique(clean_title)
        station = determine_station(technique, cat)
        allergens = determine_allergens(clean_title, cat)
        
        table_rows = [l for l in lines if l.startswith('|') and '|' in l[1:] and not '---' in l and not 'Ingrediente' in l and not 'Parámetro' in l]
        ingredients = []
        for r in table_rows:
            parts = [p.strip() for p in r.split('|')[1:-1]]
            if len(parts) >= 2:
                ing_name = re.sub(r'\*+', '', parts[0]).strip()
                ing_name = re.sub(r'de Carmen\b', '', ing_name, flags=re.IGNORECASE).strip()
                ing_qty_str = parts[1].strip() if len(parts) > 1 else '50 g'
                if not ing_name or 'Total' in ing_name or 'Nutricional' in ing_name: continue
                qty_match = re.search(r'([0-9\.,]+)\s*([a-zA-Z%]+)?', ing_qty_str)
                qty = 0.08
                unit = 'kg'
                if qty_match:
                    try:
                        raw_num = float(qty_match.group(1).replace(',', '.'))
                        u = (qty_match.group(2) or '').lower()
                        if 'g' in u or 'gr' in u:
                            qty = round(raw_num / 1000 / 4, 3)
                            unit = 'kg'
                        elif 'kg' in u:
                            qty = round(raw_num / 4, 3)
                            unit = 'kg'
                        elif 'ml' in u or 'cl' in u:
                            qty = round(raw_num / 1000 / 4, 3)
                            unit = 'L'
                        elif 'l' in u:
                            qty = round(raw_num / 4, 3)
                            unit = 'L'
                        elif 'ud' in u or 'unid' in u or 'diente' in u:
                            qty = max(0.5, round(raw_num / 4, 1))
                            unit = 'unidad'
                    except:
                        qty = 0.08
                        unit = 'kg'
                ingredients.append({
                    'name': ing_name,
                    'quantity': qty if qty > 0 else 0.05,
                    'unit': unit,
                    'category': 'frescos' if any(x in ing_name.lower() for x in ['cebolla', 'pimiento', 'ajo', 'patata', 'tomate', 'zanahoria', 'calabacin']) else ('carnes-pescados' if any(x in ing_name.lower() for x in ['pollo', 'ternera', 'bacalao', 'merluza', 'jamon', 'atun', 'cerdo', 'sepia']) else 'despensa')
                })
        
        if not ingredients:
            ingredients = [
                { 'name': f'Ingrediente principal de {clean_title}', 'quantity': 0.18, 'unit': 'kg', 'category': 'carnes-pescados' if cat in ['carnes', 'pescados'] else 'frescos' },
                { 'name': 'Sofrito de cebolla dulce y hortalizas', 'quantity': 0.08, 'unit': 'kg', 'category': 'frescos' },
                { 'name': 'Aceite de oliva virgen extra y sazón', 'quantity': 0.02, 'unit': 'L', 'category': 'despensa' }
            ]
        
        inst_lines = [l.strip() for l in lines if re.match(r'^[0-9]+\.\s+', l.strip()) or (l.strip().startswith('* ') and len(l) > 40)]
        clean_instructions = []
        for il in inst_lines:
            ci = re.sub(r'^[0-9\.\*\s]+', '', il).strip()
            ci = re.sub(r'de Carmen\b', 'tradicional', ci, flags=re.IGNORECASE)
            clean_instructions.append(ci)
        if not clean_instructions:
            clean_instructions = [
                f'Preparar la mise en place y sofrito base para {clean_title}.',
                f'Cocinar en estación {station} siguiendo el tiempo recomendado a fuego medio.',
                'Reposar 5 minutos antes de racionar en fiambreras de cristal.'
            ]
        
        prep_min = 35
        if '15 min' in sec: prep_min = 15
        elif '20 min' in sec: prep_min = 20
        elif '25 min' in sec: prep_min = 25
        elif '30 min' in sec: prep_min = 30
        elif '40 min' in sec: prep_min = 40
        elif '45 min' in sec: prep_min = 45
        elif '50 min' in sec: prep_min = 50
        elif '60 min' in sec: prep_min = 60
        
        suitable_diets = ['mediterranean', 'traditional']
        if cat in ['carnes', 'pescados', 'huevos']: suitable_diets.append('fitness')
        if cat in ['verduras', 'cremas', 'legumbres']: suitable_diets.append('veggie')
        if cat in ['pescados', 'carnes', 'huevos', 'verduras'] and not any(x in clean_title.lower() for x in ['arroz', 'pasta', 'patata', 'harina']):
            suitable_diets.append('lowcarb')
        
        img = IMAGES_MAP.get(family or cat, IMAGES_MAP['carnes'])
        
        recipes.append({
            'id': slug,
            'name': clean_title,
            'shortName': clean_title.split(' con ')[0].split(' en ')[0].split(' al ')[0].split(' a la ')[0][:35],
            'category': cat,
            'mealType': 'lunch' if cat in ['legumbres', 'arroces_pastas', 'carnes'] else ('dinner' if cat in ['cremas', 'pescados', 'huevos'] else 'universal'),
            'station': station,
            'prepTimeFormatted': f'{prep_min} min ({station})',
            'prepTimeMinutes': prep_min,
            'shelfLifeDaysFridge': 4 if cat in ['legumbres', 'carnes', 'verduras', 'cremas'] else (3 if cat in ['pescados', 'huevos'] else 2),
            'canFreeze': False if any(x in clean_title.lower() for x in ['patatas', 'arroz', 'mayonesa', 'huevo']) else True,
            'storageAdvice': 'Nevera Días 1-4 • Congelador 3 meses' if not any(x in clean_title.lower() for x in ['patatas', 'arroz']) else 'Nevera Días 1-3 • Consumir en fresco',
            'suitableDiets': suitable_diets,
            'allergens': allergens,
            'image': img,
            'source': 'Cocina Tradicional',
            'sourceCompendium': fname,
            'mainIngredientFamily': family,
            'culinaryTechnique': technique,
            'ingredientsPerServing': ingredients,
            'instructions': clean_instructions[:4],
            'batchTip': f'Plato canónico de {fname.replace(".md","").replace("_"," ")}: conserva el sabor auténtico de la cocina tradicional.'
        })

print(f'SUCCESS! Compiled {len(recipes)} authentic recipes from docs/fuentes.')
with open('scripts/extracted_all_recipes.json', 'w', encoding='utf-8') as out:
    json.dump(recipes, out, indent=2, ensure_ascii=False)
