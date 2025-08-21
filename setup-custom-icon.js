import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🎨 Configurando icono personalizado para la app...');

// Buscar imágenes en el proyecto que podamos usar como icono
const possibleIcons = [
  'icon.png',
  'logo.png',
  'app-icon.png',
  'favicon.png',
  'public/icon.png',
  'public/logo.png',
  'src/assets/icon.png',
  'src/assets/logo.png'
];

let foundIcon = null;
for (const iconPath of possibleIcons) {
  if (fs.existsSync(iconPath)) {
    foundIcon = iconPath;
    console.log(`✅ Encontrada imagen: ${iconPath}`);
    break;
  }
}

if (!foundIcon) {
  console.log('❌ No se encontró ninguna imagen para usar como icono');
  console.log('📝 Por favor, coloca tu imagen como "icon.png" en la raíz del proyecto');
  console.log('🔧 O copia manualmente tu imagen a las carpetas de iconos de Android');
  
  // Mostrar las rutas donde puedes colocar tu imagen
  console.log('\n📁 Rutas donde puedes colocar tu icono:');
  console.log('   android/app/src/main/res/mipmap-mdpi/ic_launcher.png (48x48)');
  console.log('   android/app/src/main/res/mipmap-hdpi/ic_launcher.png (72x72)');
  console.log('   android/app/src/main/res/mipmap-xhdpi/ic_launcher.png (96x96)');
  console.log('   android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png (144x144)');
  console.log('   android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png (192x192)');
  
  console.log('\n💡 Consejos:');
  console.log('   1. Usa una imagen cuadrada (1:1 ratio)');
  console.log('   2. Formato PNG recomendado');
  console.log('   3. Fondo transparente para mejor resultado');
  console.log('   4. Puedes usar herramientas online como:');
  console.log('      - https://appicon.co/');
  console.log('      - https://www.appicon.co/');
  console.log('      - https://makeappicon.com/');
  
  process.exit(0);
}

// Si encontramos una imagen, la copiamos a las carpetas de iconos
console.log(`🔄 Copiando ${foundIcon} como icono de la app...`);

const androidIconPaths = [
  'android/app/src/main/res/mipmap-mdpi/ic_launcher.png',
  'android/app/src/main/res/mipmap-hdpi/ic_launcher.png',
  'android/app/src/main/res/mipmap-xhdpi/ic_launcher.png',
  'android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png',
  'android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png'
];

androidIconPaths.forEach(iconPath => {
  try {
    // Crear directorio si no existe
    const dir = path.dirname(iconPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // Copiar la imagen
    fs.copyFileSync(foundIcon, iconPath);
    console.log(`✅ Copiado a: ${iconPath}`);
  } catch (error) {
    console.log(`❌ Error copiando a ${iconPath}: ${error.message}`);
  }
});

console.log('\n🎉 ¡Icono personalizado configurado!');
console.log('📱 Ahora puedes generar el APK con tu icono personalizado');
console.log('🔧 Ejecuta: npx cap sync android');
