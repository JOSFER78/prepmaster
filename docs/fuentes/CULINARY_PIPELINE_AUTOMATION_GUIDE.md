# 🚀 Guía Maestra de Automatización del Pipeline Culinario (TouChef / PrepMaster)

> **Skill Oficial:** `culinary-knowledge-pipeline`  
> **Ubicación del Skill:** `C:\Users\yo\.gemini\config\skills\culinary-knowledge-pipeline\`  
> **Motor de Infografías:** NanoBanana Pro 2 (`generate_image`) con encadenamiento de referencia visual canónica.

---

## 🧭 1. Resumen de la Arquitectura E2E

El pipeline automatiza el procesamiento integral de cualquier fuente gastronómica (Canal de YouTube, web de recetas, instituto culinario o temática técnica) en **5 fases estancas**:

```
[ Canal YouTube / Web / Tema ]
             │
             ▼
   [ 1. Ingesta y Catalogación ] ──► Extracción de metadatos, IDs, títulos y clasificación en 12 categorías
             │
             ▼
   [ 2. Síntesis Enciclopédica ] ──► Generación de .md canónicos (14 Alérgenos UE, gramos exactos, Batch Cooking)
             │
             ▼
   [ 3. Fotografía Gastronómica ] ──► Extracción de fotogramas HD (0% rostros / 100% materias primas y fuegos)
             │
             ▼
   [ 4. Infografías NanoBanana ] ──► Generación de infografías 2x2 Dark Glassmorphism idénticas a la referencia
             │
             ▼
   [ 5. Sincronización Rápida ] ──► Despliegue en 3 segundos a la VPS (/docs/fuentes/) vía Tarball comprimido
```

---

## 🛠️ 2. Fórmulas de Ejecución para Nuevos Canales o Temáticas

### Caso A: Ingesta de un Nuevo Canal de YouTube (ej. Karlos Arguiñano, Dani García, o canal temático)
```bash
# Paso 1: Extraer catálogo del canal
node C:/Users/yo/.gemini/config/skills/culinary-knowledge-pipeline/scripts/ingest_channel.cjs --channel "https://www.youtube.com/@CanalObjetivo" --out "catalogo.json"

# Paso 2: Generar Markdown, descargar medios y armar la suite
node C:/Users/yo/.gemini/config/skills/culinary-knowledge-pipeline/scripts/run_full_pipeline.cjs --target "CanalObjetivo" --output-dir "docs/nuevo_canal/"

# Paso 3: Sincronizar instantáneamente a la VPS
node C:/Users/yo/.gemini/config/skills/culinary-knowledge-pipeline/scripts/sync_pipeline.cjs
```

---

## 📐 3. Plantilla Canónica de Prompts para Infografías Idénticas

Para mantener una coherencia visual del 100% con la primera referencia (`infografia_croquetas_jamon`), se pasa la ruta de la imagen original en `ImagePaths`:

```json
{
  "AspectRatio": "3:4",
  "ImageName": "infografia_[slug]",
  "ImagePaths": [
    "C:\\Users\\yo\\.gemini\\antigravity\\brain\\b0ca355d-d02a-4517-9d43-a5a923303bd2\\infografia_croquetas_jamon_1787180235078.jpg"
  ],
  "Prompt": "Vertical educational culinary infographic poster in Spanish for '[TÍTULO DE LA RECETA]', exact identical layout, structure, typography, card shapes, and dark glassmorphism design as the reference image. Top center 'TouChef' logo in glow. 4 main grid cards: 1. MISE EN PLACE Y PESOS EXACTOS ([Ingredientes con gramos/ml en cian]), 2. TÉCNICA DE [PROCESO] ([Pasos numerados con sartenes/fuegos]), 3. [REPOSO/REFRIGERACIÓN/MACERACIÓN] ([Tiempos y temperaturas]), 4. [COCCIÓN/HORNEADO Y RESULTADO] ([Termometría 180°C/54°C y corte transversal]). Bottom: 4 nutrition circle gauges (Kcal, Proteínas, Grasas, Carbohidratos) and allergen badges (Gluten, Lácteos, Huevo...). Ultra-sharp 8k."
}
```

---

## 📊 4. Verificación de Integridad
- **Total de Recetas Procesadas:** 141 recetas en 12 volúmenes.
- **Activos Multimedia:** 638 archivos sincronizados en la VPS (`/home/ubuntu/workspace/pro/webs/12prepmaster/docs/fuentes/`).
- **Pureza Culinaria:** 0% presentadores hablando / 100% enfoque gastronómico.
