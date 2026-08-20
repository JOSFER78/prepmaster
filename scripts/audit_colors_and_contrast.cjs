const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, '..', 'src');

const INVALID_COLOR_TOKENS = [
  'zinc-850', 'stone-850', 'neutral-850', 'gray-850', 'slate-850',
  'zinc-925', 'stone-925', 'neutral-925',
  'zinc-750', 'stone-750',
];

const LIGHT_BG_PATTERNS = [
  'bg-white', 'bg-zinc-50', 'bg-zinc-100', 'bg-stone-50', 'bg-stone-100', 'bg-gray-50', 'bg-gray-100'
];

let issues = [];

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  lines.forEach((line, idx) => {
    const lineNum = idx + 1;

    // 1. Check for invalid color tokens
    INVALID_COLOR_TOKENS.forEach(token => {
      if (line.includes(token)) {
        issues.push({
          file: filePath.replace(SRC_DIR, 'src'),
          line: lineNum,
          type: 'INVALID_TOKEN',
          message: `Uso de token de color inexistente en Tailwind: '${token}'`,
          content: line.trim()
        });
      }
    });

    // 2. Check for light bg without dark counterpart in classNames
    const classMatch = line.match(/className=(?:\{`|["'])(.*?)(?:`\}|["'])/);
    if (classMatch) {
      const classStr = classMatch[1];
      const tokens = classStr.split(/\s+/);

      const hasLightBg = tokens.some(t => LIGHT_BG_PATTERNS.includes(t));
      const hasDarkBg = tokens.some(t => t.startsWith('dark:bg-') || t.startsWith('dark:from-') || t.includes('glass-surface'));

      if (hasLightBg && !hasDarkBg && !line.includes('dark:') && !line.includes('btn-hero') && !line.includes('rounded-full')) {
        // Exclude some intentionally white/fixed items if any
        issues.push({
          file: filePath.replace(SRC_DIR, 'src'),
          line: lineNum,
          type: 'MISSING_DARK_BG',
          message: `Contenedor con fondo claro (${tokens.filter(t => LIGHT_BG_PATTERNS.includes(t)).join(', ')}) sin clase 'dark:bg-*'`,
          content: line.trim()
        });
      }
    }
  });
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(f => {
    const fullPath = path.join(dir, f);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walkDir(fullPath);
    } else if (f.endsWith('.tsx') || f.endsWith('.ts')) {
      scanFile(fullPath);
    }
  });
}

walkDir(SRC_DIR);

console.log(`\n=== 🔍 AUDITORÍA DE COLORES, CONTRASTES Y CLASES CSS TOUCHEF ===`);
console.log(`Total de incidencias detectadas: ${issues.length}\n`);

const invalidTokens = issues.filter(i => i.type === 'INVALID_TOKEN');
const missingDarkBg = issues.filter(i => i.type === 'MISSING_DARK_BG');

console.log(`❌ Tokens de color inválidos (${invalidTokens.length}):`);
invalidTokens.forEach(i => {
  console.log(`  [${i.file}:${i.line}] ${i.message}`);
});

console.log(`\n⚠️ Fondos claros sin alternativa dark (${missingDarkBg.length}):`);
missingDarkBg.slice(0, 30).forEach(i => {
  console.log(`  [${i.file}:${i.line}] ${i.message}\n    -> ${i.content}`);
});

if (missingDarkBg.length > 30) {
  console.log(`  ... y ${missingDarkBg.length - 30} más.`);
}
