#!/usr/bin/env python3
"""
Extractor Audiovisual y Enriquecedor de Markdown para TouChef / 12PrepMaster
Descubre vídeos oficiales, extrae fotogramas clave de alta resolución con ffmpeg y yt-dlp,
y actualiza los documentos Markdown con trazabilidad y material gráfico real.
"""

import os
import re
import sys
import json
import subprocess
import urllib.request
import unicodedata
from pathlib import Path

BASE_DIR = Path("/home/ubuntu/workspace/pro/webs/12prepmaster/docs/fuentes")

def slugify(text):
    text = unicodedata.normalize('NFKD', text).encode('ascii', 'ignore').decode('utf-8')
    text = re.sub(r'[^\w\s-]', '', text).strip().lower()
    return re.sub(r'[-\s]+', '_', text)

def search_youtube_video(query):
    """Busca el video oficial usando yt-dlp y devuelve metadatos estructurados."""
    cmd = [
        "yt-dlp",
        "--dump-json",
        "--no-warnings",
        "--default-search", "ytsearch1",
        f"ytsearch1:{query}"
    ]
    try:
        res = subprocess.run(cmd, capture_output=True, text=True, timeout=30)
        if res.returncode == 0 and res.stdout.strip():
            data = json.loads(res.stdout.strip().split("\n")[0])
            return {
                "id": data.get("id"),
                "title": data.get("title"),
                "url": f"https://www.youtube.com/watch?v={data.get('id')}",
                "duration": data.get("duration", 300),
                "thumbnail": data.get("thumbnail"),
                "webpage_url": data.get("webpage_url")
            }
    except Exception as e:
        print(f"  [!] Error buscando video para '{query}': {e}")
    return None

def extract_frame_from_stream(video_url, timestamp_sec, output_path):
    """Extrae un fotograma exacto desde la URL de stream usando yt-dlp y ffmpeg."""
    if output_path.exists() and output_path.stat().st_size > 1000:
        return True
    
    output_path.parent.mkdir(parents=True, exist_ok=True)
    
    # 1. Obtener URL directa del stream de vídeo
    cmd_url = ["yt-dlp", "-f", "best[ext=mp4]/best", "-g", video_url]
    try:
        res_url = subprocess.run(cmd_url, capture_output=True, text=True, timeout=25)
        if res_url.returncode != 0 or not res_url.stdout.strip():
            return False
        stream_url = res_url.stdout.strip().split("\n")[0]
        
        # 2. Extraer fotograma con ffmpeg y convertir a WebP
        hh = int(timestamp_sec // 3600)
        mm = int((timestamp_sec % 3600) // 60)
        ss = int(timestamp_sec % 60)
        time_str = f"{hh:02d}:{mm:02d}:{ss:02d}"
        
        cmd_ffmpeg = [
            "ffmpeg", "-y",
            "-ss", time_str,
            "-i", stream_url,
            "-vframes", "1",
            "-vf", "scale=1280:-1",
            "-q:v", "80",
            str(output_path)
        ]
        res_ff = subprocess.run(cmd_ffmpeg, capture_output=True, text=True, timeout=30)
        return output_path.exists() and output_path.stat().st_size > 1000
    except Exception as e:
        print(f"  [!] Error extrayendo frame a {timestamp_sec}s: {e}")
        return False

def download_thumbnail(thumb_url, output_path):
    """Descarga el thumbnail oficial de YouTube en alta definición."""
    if output_path.exists() and output_path.stat().st_size > 1000:
        return True
    try:
        output_path.parent.mkdir(parents=True, exist_ok=True)
        urllib.request.urlretrieve(thumb_url, str(output_path))
        return True
    except Exception as e:
        print(f"  [!] Error descargando thumbnail: {e}")
        return False

def process_recipe_section(section_text, category_folder):
    """Procesa una sección de receta individual, extrae medios y devuelve el markdown enriquecido."""
    lines = section_text.split("\n")
    header = lines[0]
    
    # Extraer nombre limpio de la receta
    clean_title = re.sub(r'^#+\s*([^\w\s]*\s*)?', '', header).strip()
    clean_title = re.sub(r'^\d+[\.\)]\s*', '', clean_title).strip()
    clean_name = clean_title.split("(")[0].split("—")[0].strip()
    
    slug = slugify(clean_name)[:40]
    assets_dir = category_folder / "assets"
    
    print(f"\n[+] Procesando receta: {clean_name} (Slug: {slug})")
    
    # Buscar en YouTube
    yt_info = search_youtube_video(f"Cocina con Carmen {clean_name}")
    if not yt_info:
        yt_info = search_youtube_video(f"receta {clean_name}")
    
    if not yt_info:
        print(f"  [-] No se encontró vídeo para: {clean_name}")
        return section_text
    
    vid_url = yt_info["url"]
    dur = yt_info["duration"] or 300
    print(f"  [*] Vídeo encontrado: {yt_info['title']} ({vid_url}) - Duración: {dur}s")
    
    # Tiempos de extracción
    t_ingredientes = max(5, int(dur * 0.08))
    t_proceso = int(dur * 0.45)
    t_final = max(10, int(dur * 0.92))
    
    img_portada = assets_dir / f"{slug}_portada.jpg"
    img_ingredientes = assets_dir / f"{slug}_01_ingredientes.webp"
    img_proceso = assets_dir / f"{slug}_02_proceso.webp"
    img_final = assets_dir / f"{slug}_03_resultado_final.webp"
    
    # Descargar thumbnail
    if yt_info.get("thumbnail"):
        download_thumbnail(yt_info["thumbnail"], img_portada)
    
    # Extraer frames
    ok_ing = extract_frame_from_stream(vid_url, t_ingredientes, img_ingredientes)
    ok_proc = extract_frame_from_stream(vid_url, t_proceso, img_proceso)
    ok_fin = extract_frame_from_stream(vid_url, t_final, img_final)
    
    # Inyectar en Markdown
    media_badge = f"\n> 📺 **Vídeo Oficial de Elaboración:** [{yt_info['title']}]({vid_url})\n"
    
    # Comprobar si ya tiene el badge
    if "Vídeo Oficial de Elaboración" not in section_text:
        # Insertar tras el header o subtítulo
        lines.insert(1, media_badge)
    
    # Inyectar imagen de resultado final al inicio si existe
    if img_portada.exists() and f"{slug}_portada.jpg" not in section_text:
        lines.insert(2, f"\n![{clean_name} - Presentación](assets/{slug}_portada.jpg)\n")
    elif img_final.exists() and f"{slug}_03_resultado_final.webp" not in section_text:
        lines.insert(2, f"\n![{clean_name} - Resultado Final](assets/{slug}_03_resultado_final.webp)\n")
    
    new_text = "\n".join(lines)
    
    # Inyectar imagen de ingredientes en la sección de ingredientes si existe
    if img_ingredientes.exists() and f"{slug}_01_ingredientes.webp" not in new_text:
        if "### ⚖️ Ingredientes Exactos" in new_text:
            new_text = new_text.replace(
                "### ⚖️ Ingredientes Exactos",
                f"### ⚖️ Ingredientes Exactos\n\n![Mise en Place e Ingredientes](assets/{slug}_01_ingredientes.webp)\n"
            )
        elif "### Ingredientes" in new_text:
            new_text = new_text.replace(
                "### Ingredientes",
                f"### Ingredientes\n\n![Mise en Place e Ingredientes](assets/{slug}_01_ingredientes.webp)\n"
            )
            
    # Inyectar imagen de proceso en el paso a paso
    if img_proceso.exists() and f"{slug}_02_proceso.webp" not in new_text:
        if "### 👨‍🍳 Paso a Paso" in new_text:
            new_text = new_text.replace(
                "### 👨‍🍳 Paso a Paso",
                f"### 👨‍🍳 Paso a Paso\n\n![Técnica de Cocción y Elaboración](assets/{slug}_02_proceso.webp)\n"
            )
        elif "### Paso a Paso" in new_text:
            new_text = new_text.replace(
                "### Paso a Paso",
                f"### Paso a Paso\n\n![Técnica de Cocción y Elaboración](assets/{slug}_02_proceso.webp)\n"
            )
            
    return new_text

def process_markdown_file(file_path):
    print(f"\n=======================================================")
    print(f"📖 Analizando archivo: {file_path.name}")
    print(f"=======================================================")
    
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Dividir por encabezados de recetas (## ...)
    sections = re.split(r'(?=\n##\s+)', content)
    updated_sections = []
    
    for sec in sections:
        if sec.startswith("\n## ") or sec.startswith("## "):
            # Es una receta
            new_sec = process_recipe_section(sec, file_path.parent)
            updated_sections.append(new_sec)
        else:
            updated_sections.append(sec)
            
    updated_content = "".join(updated_sections)
    
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(updated_content)
        
    print(f"[✓] Archivo actualizado: {file_path.name}")

def main():
    recetas_dir = BASE_DIR / "01_recetas_cocina_con_carmen"
    if not recetas_dir.exists():
        print(f"Directorio no encontrado: {recetas_dir}")
        return
        
    md_files = sorted(list(recetas_dir.glob("*.md")))
    print(f"Encontrados {len(md_files)} archivos Markdown en {recetas_dir}")
    
    for md_file in md_files:
        process_markdown_file(md_file)
        
    print("\n🎉 ¡Proceso de extracción audiovisual y enriquecimiento completado con éxito!")

if __name__ == "__main__":
    main()
