const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.join(__dirname, '..');
const releaseApk = path.join(rootDir, 'android/app/build/outputs/apk/release/app-release.apk');
const debugApk = path.join(rootDir, 'android/app/build/outputs/apk/debug/app-debug.apk');

const apkSrc = fs.existsSync(releaseApk) ? releaseApk : (fs.existsSync(debugApk) ? debugApk : null);

if (!apkSrc) {
  console.error('❌ No se encontró ningún APK compilado en android/app/build/outputs/apk/');
  console.log('💡 Ejecuta: cd android && ./gradlew assembleDebug (o assembleRelease)');
  process.exit(1);
}

const targetDirs = [
  path.join(rootDir, 'public/download'),
  path.join(rootDir, 'public/downloads'),
  path.join(rootDir, 'dist/download'),
  path.join(rootDir, 'dist/downloads')
];

targetDirs.forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

console.log(`📦 Empaquetando APK desde: ${path.relative(rootDir, apkSrc)} (${(fs.statSync(apkSrc).size / 1024 / 1024).toFixed(2)} MB)`);

// Leer versión
const versionJsonPath = path.join(rootDir, 'public/version.json');
let version = '1.0.0';
if (fs.existsSync(versionJsonPath)) {
  try {
    const vData = JSON.parse(fs.readFileSync(versionJsonPath, 'utf-8'));
    if (vData.version) version = vData.version;
  } catch (e) {}
}

const apkVersionedName = `touchef_v${version}.apk`;
const zipVersionedName = `touchef_v${version}.zip`;

// 1. Preparar APK con el nombre y versión explícita en temporal
const tempDir = path.join(rootDir, 'android/app/build/outputs/apk/temp_package');
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });
const tempVersionedApk = path.join(tempDir, apkVersionedName);
fs.copyFileSync(apkSrc, tempVersionedApk);

// 2. Copiar APK a todos los directorios destino con todas las variantes de nombre
targetDirs.forEach(dir => {
  fs.copyFileSync(apkSrc, path.join(dir, apkVersionedName));
  fs.copyFileSync(apkSrc, path.join(dir, `touchef-v${version}.apk`));
  fs.copyFileSync(apkSrc, path.join(dir, `touchefv${version}.apk`));
  fs.copyFileSync(apkSrc, path.join(dir, 'touchef.apk'));
});

// 3. Generar el ZIP comprimido conteniendo touchef_v1.0.0.apk
const primaryZip = path.join(targetDirs[0], zipVersionedName);
console.log(`⚡ Comprimiendo ${apkVersionedName} en archivo ZIP...`);
try {
  // Intentar con comando zip nativo de Linux
  execSync(`cd "${tempDir}" && zip -9 "${primaryZip}" "${apkVersionedName}"`, { stdio: 'inherit' });
} catch (err) {
  try {
    // Fallback con PowerShell si estuviese en Windows
    execSync(`powershell -Command "Compress-Archive -Path '${tempVersionedApk}' -DestinationPath '${primaryZip}' -Force"`);
  } catch (err2) {
    console.warn('Advertencia al generar ZIP:', err2.message);
  }
}

if (fs.existsSync(primaryZip)) {
  targetDirs.forEach(dir => {
    const mainZip = path.join(dir, zipVersionedName);
    if (mainZip !== primaryZip) {
      fs.copyFileSync(primaryZip, mainZip);
    }
    fs.copyFileSync(primaryZip, path.join(dir, `touchef-v${version}.zip`));
    fs.copyFileSync(primaryZip, path.join(dir, `touchef_${version}.zip`));
    fs.copyFileSync(primaryZip, path.join(dir, 'touchef.zip'));
  });
}

// Actualizar version.json
const updatedVersionData = {
  appName: 'TouChef',
  packageName: 'app.touchef.app',
  version: version,
  buildNumber: 100,
  releaseDate: new Date().toISOString(),
  apkFileName: apkVersionedName,
  zipFileName: zipVersionedName,
  apkDownloadUrl: `/download/${apkVersionedName}`,
  zipDownloadUrl: `/download/${zipVersionedName}`,
  sha1: 'E5:86:04:B7:37:9A:83:CA:5F:22:0C:9A:BF:57:84:8E:CA:4B:5A:7B',
  sha256: 'FA:D9:05:86:4C:88:6D:52:65:DD:3B:71:B7:28:52:D4:74:D7:AB:F7:8E:D8:3D:A4:9B:3A:D4:43:42:84:CF:5C'
};

fs.writeFileSync(path.join(rootDir, 'public/version.json'), JSON.stringify(updatedVersionData, null, 2));
if (fs.existsSync(path.join(rootDir, 'dist'))) {
  fs.writeFileSync(path.join(rootDir, 'dist/version.json'), JSON.stringify(updatedVersionData, null, 2));
}

// Limpiar temporal
try {
  if (fs.existsSync(tempVersionedApk)) fs.unlinkSync(tempVersionedApk);
  if (fs.existsSync(tempDir)) fs.rmdirSync(tempDir);
} catch (e) {}

console.log('✅ Archivos generados con éxito:');
console.log(`   - ${apkVersionedName} (${(fs.statSync(apkSrc).size / 1024 / 1024).toFixed(2)} MB)`);
if (fs.existsSync(primaryZip)) {
  console.log(`   - ${zipVersionedName} (${(fs.statSync(primaryZip).size / 1024 / 1024).toFixed(2)} MB)`);
}
console.log(`   - /download/${zipVersionedName} (Oficial con Nombre y Versión)`);
console.log(`   - /download/${apkVersionedName} (APK Directo)`);
console.log(`   - /download/touchef.zip (Alias de compatibilidad)`);
