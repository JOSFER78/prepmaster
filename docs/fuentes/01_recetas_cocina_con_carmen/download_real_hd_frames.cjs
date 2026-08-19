const fs = require('fs');
const path = require('path');
const https = require('https');

const DOCS_DIR = path.resolve(__dirname);
const ASSETS_DIR = path.join(DOCS_DIR, 'assets');

if (!fs.existsSync(ASSETS_DIR)) {
  fs.mkdirSync(ASSETS_DIR, { recursive: true });
}

function fetchBuffer(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(fetchBuffer(res.headers.location));
      }
      if (res.statusCode !== 200) {
        return resolve({ status: res.statusCode, buffer: null, size: 0, url });
      }
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => {
        const buf = Buffer.concat(chunks);
        resolve({ status: 200, buffer: buf, size: buf.length, url });
      });
    }).on('error', (err) => {
      resolve({ status: 500, buffer: null, size: 0, url, error: err.message });
    });
  });
}

async function downloadBestImage(urls, targetPath, minBytes = 5000) {
  for (const url of urls) {
    const res = await fetchBuffer(url);
    if (res.status === 200 && res.size >= minBytes) {
      fs.writeFileSync(targetPath, res.buffer);
      return { success: true, url, size: res.size, targetPath };
    }
  }
  // If none passed minBytes, pick the largest available if any > 0
  let best = null;
  for (const url of urls) {
    const res = await fetchBuffer(url);
    if (res.status === 200 && res.size > 0) {
      if (!best || res.size > best.size) {
        best = { ...res, url };
      }
    }
  }
  if (best && best.buffer) {
    fs.writeFileSync(targetPath, best.buffer);
    return { success: true, url: best.url, size: best.size, targetPath, warning: 'Size < minBytes' };
  }
  return { success: false, targetPath, error: 'All URLs failed' };
}

async function run() {
  console.log('===============================================================');
  console.log('   EXTRACTOR HD OFICIAL DE YOUTUBE - COCINA CON CARMEN');
  console.log('===============================================================');
  console.log(`Directorio de recetas: ${DOCS_DIR}`);
  console.log(`Directorio de assets:  ${ASSETS_DIR}`);

  const mdFiles = fs.readdirSync(DOCS_DIR).filter(f => f.endsWith('.md'));
  console.log(`Archivos Markdown encontrados: ${mdFiles.length}`);

  const recipes = [];

  for (const file of mdFiles) {
    const filePath = path.join(DOCS_DIR, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const sections = content.split(/\n(?=##\s+)/);

    for (let sIdx = 1; sIdx < sections.length; sIdx++) {
      const sec = sections[sIdx];
      const lines = sec.split('\n');
      const header = lines[0].trim();
      if (!header.startsWith('## ')) continue;
      const title = header.replace(/^##\s+/, '').trim();
      if (/^(?:📖|📊|🛠️|🛡️|🌟|Índice|Mapa|Decálogo|Tabla|Matriz|Glosario|Colección|Manual|CONSEJOS|INTRODUCCIÓN)/i.test(title)) continue;

      const ytMatch = sec.match(/https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
      if (!ytMatch) continue;
      const ytId = ytMatch[1];

      const portadaMatch = sec.match(/!\[.*?\]\((assets\/(.+?)_portada\.jpg)\)/);
      let slug = portadaMatch ? portadaMatch[2] : null;

      if (!slug) {
        slug = title
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9]+/g, '_')
          .replace(/^_+|_+$/g, '')
          .substring(0, 45);
      }

      recipes.push({
        file,
        filePath,
        title,
        ytId,
        slug
      });
    }
  }

  console.log(`Total de recetas identificadas con YouTube ID: ${recipes.length}`);

  // Deduplicate downloads by slug + ytId
  const downloadTasks = new Map();

  for (const r of recipes) {
    const key = `${r.slug}_${r.ytId}`;
    if (!downloadTasks.has(key)) {
      downloadTasks.set(key, {
        slug: r.slug,
        ytId: r.ytId,
        title: r.title,
        frames: [
          {
            type: 'portada',
            file: `${r.slug}_portada.jpg`,
            urls: [
              `https://i.ytimg.com/vi/${r.ytId}/maxresdefault.jpg`,
              `https://i.ytimg.com/vi/${r.ytId}/sddefault.jpg`,
              `https://i.ytimg.com/vi/${r.ytId}/hqdefault.jpg`,
              `https://i.ytimg.com/vi/${r.ytId}/0.jpg`
            ],
            minBytes: 5000
          },
          {
            type: '01_ingredientes',
            file: `${r.slug}_01_ingredientes.jpg`,
            urls: [
              `https://i.ytimg.com/vi/${r.ytId}/hq1.jpg`,
              `https://i.ytimg.com/vi/${r.ytId}/1.jpg`
            ],
            minBytes: 5000
          },
          {
            type: '02_elaboracion',
            file: `${r.slug}_02_elaboracion.jpg`,
            urls: [
              `https://i.ytimg.com/vi/${r.ytId}/hq2.jpg`,
              `https://i.ytimg.com/vi/${r.ytId}/2.jpg`
            ],
            minBytes: 5000
          },
          {
            type: '03_resultado_final',
            file: `${r.slug}_03_resultado_final.jpg`,
            urls: [
              `https://i.ytimg.com/vi/${r.ytId}/hq3.jpg`,
              `https://i.ytimg.com/vi/${r.ytId}/3.jpg`
            ],
            minBytes: 5000
          }
        ]
      });
    }
  }

  console.log(`Descargando fotogramas para ${downloadTasks.size} recetas únicas (4 fotogramas cada una = ${downloadTasks.size * 4} imágenes)...`);

  const taskList = Array.from(downloadTasks.values());
  let completed = 0;
  let totalImages = 0;
  let validHdCount = 0;
  const errors = [];

  const CONCURRENCY = 8;
  async function worker(items) {
    for (const task of items) {
      for (const frame of task.frames) {
        const targetPath = path.join(ASSETS_DIR, frame.file);
        totalImages++;
        const res = await downloadBestImage(frame.urls, targetPath, frame.minBytes);
        if (res.success) {
          if (res.size >= 5000) {
            validHdCount++;
          } else {
            console.warn(`[WARN] Imagen baja resolución: ${frame.file} (${res.size} bytes)`);
          }
        } else {
          errors.push({ file: frame.file, ytId: task.ytId, error: res.error });
          console.error(`[ERROR] Falló descarga: ${frame.file} (YT: ${task.ytId})`);
        }
      }
      completed++;
      if (completed % 15 === 0 || completed === taskList.length) {
        console.log(`Progreso de descarga: ${completed}/${taskList.length} recetas procesadas...`);
      }
    }
  }

  // Chunk tasks for workers
  const chunks = Array.from({ length: CONCURRENCY }, () => []);
  taskList.forEach((task, idx) => {
    chunks[idx % CONCURRENCY].push(task);
  });

  await Promise.all(chunks.map(chunk => worker(chunk)));

  console.log('---------------------------------------------------------------');
  console.log(`Descarga finalizada:`);
  console.log(`- Total imágenes procesadas: ${totalImages}`);
  console.log(`- Imágenes válidas (>5 KB): ${validHdCount}`);
  console.log(`- Errores de descarga: ${errors.length}`);

  // Now ensure all 15 Markdown files reference the 4 images properly
  console.log('===============================================================');
  console.log('   ACTUALIZACIÓN Y VALIDACIÓN DE ARCHIVOS MARKDOWN');
  console.log('===============================================================');

  let updatedFilesCount = 0;

  for (const file of mdFiles) {
    const filePath = path.join(DOCS_DIR, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const sections = content.split(/\n(?=##\s+)/);
    let modified = false;

    for (let sIdx = 1; sIdx < sections.length; sIdx++) {
      let sec = sections[sIdx];
      const lines = sec.split('\n');
      const header = lines[0].trim();
      if (!header.startsWith('## ')) continue;
      const title = header.replace(/^##\s+/, '').trim();
      if (/^(?:📖|📊|🛠️|🛡️|🌟|Índice|Mapa|Decálogo|Tabla|Matriz|Glosario|Colección|Manual|CONSEJOS|INTRODUCCIÓN)/i.test(title)) continue;

      const ytMatch = sec.match(/https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
      if (!ytMatch) continue;

      const portadaMatch = sec.match(/!\[.*?\]\((assets\/(.+?)_portada\.jpg)\)/);
      if (!portadaMatch) continue;
      const slug = portadaMatch[2];

      const hq3Tag = `![Resultado Final y Emplatado](assets/${slug}_03_resultado_final.jpg)`;

      // If sec doesn't have 03_resultado_final, add it cleanly
      if (!sec.includes(`assets/${slug}_03_resultado_final.jpg`)) {
        // Look for end of Paso a Paso section or before '### 📦' or '### ❄️' or '---'
        const pasoHeaderRegex = /###\s+(?:👨‍🍳\s*)?Paso a Paso[\s\S]*?(?=\n###|\n---\s*\n##|$)/;
        const pasoMatch = sec.match(pasoHeaderRegex);

        if (pasoMatch) {
          const pasoBlock = pasoMatch[0];
          const trimmedPaso = pasoBlock.trimEnd();
          const updatedPaso = `${trimmedPaso}\n\n${hq3Tag}\n`;
          sec = sec.replace(pasoBlock, updatedPaso);
          sections[sIdx] = sec;
          modified = true;
        } else {
          // Append before next section or at end
          const splitIdx = sec.search(/\n###\s+📦/);
          if (splitIdx !== -1) {
            sec = sec.slice(0, splitIdx) + `\n\n${hq3Tag}\n` + sec.slice(splitIdx);
            sections[sIdx] = sec;
            modified = true;
          }
        }
      }
    }

    if (modified) {
      fs.writeFileSync(filePath, sections.join('\n'), 'utf8');
      updatedFilesCount++;
      console.log(`[MD ACTUALIZADO] ${file}`);
    } else {
      console.log(`[MD SIN CAMBIOS] ${file}`);
    }
  }

  // Count final image tags across all md files
  let total4ImageRecipes = 0;
  for (const file of mdFiles) {
    const filePath = path.join(DOCS_DIR, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const sections = content.split(/\n(?=##\s+)/);
    for (const sec of sections) {
      const ytMatch = sec.match(/https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
      if (ytMatch) {
        const hasPortada = sec.includes('_portada.jpg');
        const has01 = sec.includes('_01_ingredientes.jpg');
        const has02 = sec.includes('_02_elaboracion.jpg');
        const has03 = sec.includes('_03_resultado_final.jpg');
        if (hasPortada && has01 && has02 && has03) {
          total4ImageRecipes++;
        }
      }
    }
  }

  console.log('===============================================================');
  console.log(`RESUMEN FINAL:`);
  console.log(`- Archivos Markdown totales: ${mdFiles.length}`);
  console.log(`- Archivos Markdown actualizados: ${updatedFilesCount}`);
  console.log(`- Recetas con los 4 fotogramas HD oficiales incrustados: ${total4ImageRecipes} / 141`);
  console.log('===============================================================');
}

run().catch(console.error);
