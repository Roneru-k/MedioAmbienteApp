# 🌱 MedioAmbienteApp - Ministerio de Medio Ambiente RD

Aplicación móvil oficial del Ministerio de Medio Ambiente de la República Dominicana para promover la conciencia ambiental, participación ciudadana y acceso a información ambiental.

## 🚀 Estado Actual

**✅ Aplicación funcionando correctamente**
- ✅ Todas las rutas configuradas y funcionales
- ✅ Menú lateral operativo
- ✅ Componentes sin errores de importación
- ✅ API actualizada según documentación oficial
- ✅ Acceso temporal para pruebas sin autenticación real
- ✅ Datos mock para demostración cuando la API no está disponible

## 🔧 Problemas Solucionados

### ✅ Error de CORS
- **Problema:** La API devuelve múltiples valores en `Access-Control-Allow-Origin`
- **Solución:** Configurado proxy local en Vite para evitar problemas de CORS
- **Estado:** Resuelto

### ✅ Iconos no encontrados
- **Problema:** Iconos `warning`, `map`, `newspaper`, `people` no se cargaban
- **Solución:** Importados correctamente desde `ionicons/icons`
- **Estado:** Resuelto

### ✅ Conflicto de puertos
- **Problema:** Aplicación intentaba usar puerto 8100 pero corría en 8102
- **Solución:** Configurado puerto 8102 en `vite.config.ts`
- **Estado:** Resuelto

## 📱 Funcionalidades Implementadas

### 🔐 Autenticación
- ✅ Login con API real
- ✅ Recuperación de contraseña
- ✅ Acceso temporal para pruebas
- ✅ Gestión de sesiones

### 📰 Contenido
- ✅ Noticias ambientales con datos mock
- ✅ Servicios del ministerio
- ✅ Videos educativos
- ✅ Áreas protegidas
- ✅ Medidas ambientales
- ✅ Equipo del ministerio

### 🛠️ Herramientas de Usuario
- ✅ Reportar daños ambientales
- ✅ Ver mis reportes
- ✅ Voluntariado
- ✅ Normativas ambientales
- ✅ Cambiar contraseña

## 🚀 Instrucciones de Uso

### 1. Instalación
```bash
npm install
```

### 2. Ejecutar en desarrollo
```bash
npm run dev
```

### 3. Acceder a la aplicación
- **URL:** `http://localhost:8102/`
- **Acceso:** Usar el botón "🔧 Acceso Temporal (Pruebas)"

### 4. Navegación
- Usar el menú lateral para navegar entre páginas
- Todas las funcionalidades están disponibles para pruebas

## 🔧 Configuración Técnica

### Proxy API
```typescript
// vite.config.ts
proxy: {
  '/api': {
    target: 'https://adamix.net',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api/, '/medioambiente'),
    secure: false
  }
}
```

### API Base URL
```typescript
// src/utils/api.tsx
const API_BASE = '/api/';
```

## 📊 Datos de Demostración

Cuando la API no está disponible, la aplicación usa datos mock para demostración:

### Noticias Mock
- Nueva iniciativa de reforestación en Santo Domingo
- Protección de especies marinas
- Programa de reciclaje comunitario en Santiago

### Funcionalidades Mock
- Formularios funcionales con validación
- Navegación completa
- Interfaz de usuario responsive

## 🐛 Troubleshooting

### Error de CORS
Si ves errores de CORS:
1. La aplicación automáticamente usa datos mock
2. El proxy local debería resolver el problema
3. Verificar que el servidor esté corriendo en puerto 8102

### Iconos no se muestran
Si los iconos no aparecen:
1. Verificar que estén importados correctamente
2. Usar iconos de `ionicons/icons`
3. No usar strings para nombres de iconos

### Vistas no se cargan
Si las vistas no se muestran:
1. Usar el botón "🔧 Acceso Temporal (Pruebas)"
2. Verificar que no haya errores en la consola
3. Limpiar el cache del navegador

## 📱 Tecnologías Utilizadas

- **Framework:** Ionic React 8.7.2
- **Librería:** React 19.0.0
- **Nativo:** Capacitor 7.4.2
- **Build:** Vite 5.2.14
- **HTTP:** Axios
- **UI:** Ionic Components
- **Iconos:** Ionicons
- **Sliders:** Swiper 11.2.10

## 🌍 API Endpoints

### Autenticación
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/register` - Registro
- `POST /api/auth/recuperar-password` - Recuperar contraseña
- `POST /api/auth/cambiar-password` - Cambiar contraseña

### Contenido
- `GET /api/noticias` - Noticias ambientales
- `GET /api/servicios` - Servicios del ministerio
- `GET /api/videos` - Videos educativos
- `GET /api/areas_protegidas` - Áreas protegidas
- `GET /api/medidas-ambientales` - Medidas ambientales
- `GET /api/equipo` - Equipo del ministerio
- `GET /api/normativas` - Normativas ambientales

### Usuario
- `GET /api/reportes` - Mis reportes
- `POST /api/reportes` - Crear reporte
- `PUT /api/perfil` - Actualizar perfil
- `POST /api/voluntarios` - Solicitar voluntariado

## 📄 Licencia

Este proyecto es propiedad del Ministerio de Medio Ambiente de la República Dominicana.

## 👥 Equipo de Desarrollo

Desarrollado para el **Proyecto Final de Apps ITLA 2-2025**.

---

**¡La aplicación está lista para el Ministerio de Medio Ambiente de la República Dominicana!** 🇩🇴🌱
