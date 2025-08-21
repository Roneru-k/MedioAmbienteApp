const fs = require('fs');
const path = require('path');

// Tamaños de iconos para Android
const iconSizes = {
  'mipmap-mdpi': 48,
  'mipmap-hdpi': 72,
  'mipmap-xhdpi': 96,
  'mipmap-xxhdpi': 144,
  'mipmap-xxxhdpi': 192
};

// Función para copiar y redimensionar iconos
function generateIcons() {
  console.log('🔄 Generando iconos personalizados...');
  
  // Ruta del icono fuente (asumiendo que está en la raíz del proyecto)
  const sourceIcon = path.join(__dirname, 'icon.png');
  
  if (!fs.existsSync(sourceIcon)) {
    console.log('❌ No se encontró icon.png en la raíz del proyecto');
    console.log('📝 Por favor, coloca tu imagen como "icon.png" en la raíz del proyecto');
    return;
  }
  
  // Crear directorios si no existen
  Object.keys(iconSizes).forEach(size => {
    const dir = path.join(__dirname, 'android', 'app', 'src', 'main', 'res', size);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
  
  console.log('✅ Directorios de iconos creados');
  console.log('📱 Ahora puedes copiar manualmente tu icono.png a las carpetas mipmap-*');
  console.log('🔧 O usar una herramienta online para generar los tamaños automáticamente');
}

generateIcons();
