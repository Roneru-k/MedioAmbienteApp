# 🌱 MedioAmbienteApp - Aplicación Móvil para la Gestión Ambiental

## 📋 Información del Proyecto

**Asignatura:** Desarrollo de Aplicaciones Móviles  
**Profesor:** [Nombre del Profesor]  
**Estudiantes:** 
- Keydel Moya (2023-1064) - Líder de Proyecto & Full Stack Developer
- Sander Rafaél Fernández Tolentino (2023-1001) - UX/UI Designer & Frontend Developer  
- Ronell Sebastián Medina Pineda (2023-1035) - Backend Developer & API Integration
- Carolin Cristal Ortiz Alcántara (2023-1333) - QA Engineer & Tester

**Fecha de Entrega:** Diciembre 2025  
**Tecnologías:** React, TypeScript, Ionic, Capacitor, Node.js

---

## 🎯 Objetivo del Proyecto

Desarrollar una aplicación móvil integral para el Ministerio de Medio Ambiente de la República Dominicana que permita a los ciudadanos reportar incidentes ambientales, acceder a información sobre normativas, áreas protegidas y participar en iniciativas de conservación ambiental.

---

## 🏗️ Arquitectura del Sistema

### **Frontend (Cliente)**
- **Framework:** React 18 con TypeScript
- **UI Framework:** Ionic 7 (Componentes nativos móviles)
- **Navegación:** React Router DOM
- **Estado Global:** React Context API
- **Estilos:** CSS3 con variables CSS de Ionic

### **Backend (Servidor)**
- **API REST:** Node.js con Express
- **Base de Datos:** MySQL
- **Autenticación:** JWT (JSON Web Tokens)
- **Almacenamiento:** Local Storage (Ionic Storage)

### **Despliegue**
- **Desarrollo:** Vite Dev Server (puerto 8102)
- **Producción:** Capacitor para Android/iOS
- **API:** Servidor de producción en adamix.net

---

## 📱 Funcionalidades Implementadas

### 🔐 **1. Sistema de Autenticación**

#### **Login (`src/pages/Login.tsx`)**
- **Funcionalidad:** Autenticación de usuarios registrados
- **Características:**
  - Validación de campos en tiempo real
  - Manejo de errores específicos (401, 404, 409)
  - Redirección automática después del login exitoso
  - Persistencia de sesión con Local Storage
- **Flujo:** Email/Contraseña → Validación → JWT Token → Redirección a Home

#### **Registro (`src/pages/Register.tsx`)**
- **Funcionalidad:** Creación de nuevas cuentas de usuario
- **Características:**
  - Validación de formato de email
  - Verificación de contraseñas coincidentes
  - Validación de campos obligatorios
  - Integración con API de registro
- **Flujo:** Datos personales → Validación → Creación de cuenta → Redirección a Login

#### **Recuperación de Contraseña (`src/pages/RecuperarContraseña.tsx`)**
- **Funcionalidad:** Recuperación de contraseña olvidada
- **Características:**
  - Proceso de 3 pasos: Email → Código → Nueva Contraseña
  - Código de verificación visible en pantalla
  - Botón de copiar código al portapapeles
  - Reenvío de código si es necesario
- **Flujo:** Email → Código enviado → Verificación → Nueva contraseña

#### **Cambio de Contraseña (`src/pages/CambiarContraseña.tsx`)**
- **Funcionalidad:** Cambio de contraseña para usuarios autenticados
- **Características:**
  - Proceso de 2 pasos: Solicitud de código → Verificación
  - Validación de contraseña actual
  - Código de verificación mostrado en pantalla
  - Cancelación del proceso
- **Flujo:** Contraseña actual → Solicitar código → Verificar → Cambiar

### 📊 **2. Gestión de Reportes Ambientales**

#### **Reportar Incidente (`src/pages/Reportar.tsx`)**
- **Funcionalidad:** Creación de reportes de incidentes ambientales
- **Características:**
  - **Ubicación Dual:** Automática (GPS) y Manual (coordenadas)
  - **Captura de Imágenes:** Cámara y galería con compresión Base64
  - **Categorización:** Tipos de incidentes ambientales
  - **Validación Completa:** Campos obligatorios y formatos
  - **Subida de Archivos:** Múltiples imágenes por reporte
- **Flujo:** Seleccionar tipo → Ubicación → Descripción → Imágenes → Enviar

#### **Mis Reportes (`src/pages/MisReportes.tsx`)**
- **Funcionalidad:** Visualización y gestión de reportes del usuario
- **Características:**
  - Lista de reportes con estado (Pendiente, En Proceso, Resuelto)
  - Filtros por estado y fecha
  - Detalles completos de cada reporte
  - Imágenes asociadas
  - Historial de actualizaciones
- **Flujo:** Cargar reportes → Filtrar → Ver detalles → Seguimiento

#### **Mapa de Reportes (`src/pages/MapaReportes.tsx`)**
- **Funcionalidad:** Visualización geográfica de reportes
- **Características:**
  - Mapa interactivo con marcadores
  - Clustering de reportes cercanos
  - Información de incidentes en tiempo real
  - Filtros por tipo de incidente
- **Flujo:** Cargar mapa → Mostrar marcadores → Interactuar → Ver detalles

### 📚 **3. Información Ambiental**

#### **Normativas Ambientales (`src/pages/NormativasAmbientales.tsx`)**
- **Funcionalidad:** Acceso a normativas y regulaciones ambientales
- **Características:**
  - Lista categorizada de normativas
  - Búsqueda por título y contenido
  - Filtros por categoría y año
  - Vista detallada de cada normativa
  - Descarga de documentos PDF
- **Flujo:** Cargar normativas → Buscar/Filtrar → Ver detalles → Descargar

#### **Áreas Protegidas (`src/pages/AreasProtegidas.tsx`)**
- **Funcionalidad:** Información sobre áreas protegidas del país
- **Características:**
  - Lista de áreas protegidas con imágenes
  - Información detallada de cada área
  - Estadísticas de biodiversidad
  - Regulaciones específicas
  - Contacto de administradores
- **Flujo:** Cargar áreas → Seleccionar → Ver información → Contactar

#### **Mapa de Áreas Protegidas (`src/pages/MapaAreasProtegidas.tsx`)**
- **Funcionalidad:** Visualización geográfica de áreas protegidas
- **Características:**
  - Mapa interactivo con límites de áreas
  - Información detallada al hacer clic
  - Rutas de acceso
  - Restricciones y permisos
- **Flujo:** Cargar mapa → Mostrar áreas → Interactuar → Ver información

#### **Medidas Ambientales (`src/pages/MedidasAmbientales.tsx`)**
- **Funcionalidad:** Información sobre medidas de conservación
- **Características:**
  - Categorías de medidas (Agua, Aire, Suelo, Biodiversidad)
  - Guías prácticas de implementación
  - Beneficios ambientales
  - Casos de éxito
- **Flujo:** Seleccionar categoría → Ver medidas → Implementar → Seguimiento

### 📰 **4. Contenido Educativo**

#### **Noticias Ambientales (`src/pages/Noticias.tsx`)**
- **Funcionalidad:** Noticias y actualizaciones ambientales
- **Características:**
  - Noticias categorizadas
  - Búsqueda por palabras clave
  - Filtros por fecha y categoría
  - Compartir en redes sociales
  - Comentarios de usuarios
- **Flujo:** Cargar noticias → Filtrar → Leer → Compartir

#### **Videos Educativos (`src/pages/VideosEducativos.tsx`)**
- **Funcionalidad:** Contenido audiovisual educativo
- **Características:**
  - Videos categorizados por tema
  - Reproductor integrado
  - Listas de reproducción
  - Descargas para uso offline
  - Calificaciones y comentarios
- **Flujo:** Seleccionar categoría → Ver videos → Reproducir → Calificar

### 🤝 **5. Participación Ciudadana**

#### **Voluntariado (`src/pages/Voluntariado.tsx`)**
- **Funcionalidad:** Gestión de programas de voluntariado
- **Características:**
  - Formulario de inscripción
  - Programas disponibles
  - Calendario de actividades
  - Certificados de participación
  - Seguimiento de horas
- **Flujo:** Ver programas → Inscribirse → Participar → Recibir certificado

#### **Servicios (`src/pages/Servicios.tsx`)**
- **Funcionalidad:** Información sobre servicios del ministerio
- **Características:**
  - Catálogo de servicios
  - Requisitos y documentación
  - Procesos de solicitud
  - Contacto directo
  - Estado de trámites
- **Flujo:** Explorar servicios → Ver requisitos → Solicitar → Seguimiento

### ℹ️ **6. Información Institucional**

#### **Sobre Nosotros (`src/pages/SobreNosotros.tsx`)**
- **Funcionalidad:** Información sobre el ministerio
- **Características:**
  - Misión y visión
  - Estructura organizacional
  - Logros y proyectos
  - Contacto institucional
- **Flujo:** Información general → Estructura → Logros → Contacto

#### **Equipo del Ministerio (`src/pages/EquipoMinisterio.tsx`)**
- **Funcionalidad:** Directorio del personal del ministerio
- **Características:**
  - Información de funcionarios
  - Áreas de responsabilidad
  - Contacto directo
  - Horarios de atención
- **Flujo:** Buscar funcionario → Ver información → Contactar

#### **Acerca De (`src/pages/AcercaDe.tsx`)**
- **Funcionalidad:** Información sobre el proyecto de desarrollo
- **Características:**
  - Información del equipo de desarrollo
  - Tecnologías utilizadas
  - Metodología de desarrollo
  - Agradecimientos
- **Flujo:** Información del proyecto → Equipo → Tecnologías → Créditos

---

## 🔧 Componentes Técnicos

### **Contexto de Autenticación (`src/contexts/AuthContext.tsx`)**
- **Responsabilidad:** Gestión global del estado de autenticación
- **Funcionalidades:**
  - Estado de login/logout
  - Información del usuario
  - Token JWT
  - Persistencia de sesión
  - Redirección automática

### **Rutas Protegidas (`src/components/ProtectedRoute.tsx`)**
- **Responsabilidad:** Control de acceso a páginas privadas
- **Funcionalidades:**
  - Verificación de autenticación
  - Redirección automática
  - Loading states
  - Validación de token

### **API Service (`src/utils/api.tsx`)**
- **Responsabilidad:** Comunicación con el backend
- **Funcionalidades:**
  - Endpoints centralizados
  - Manejo de errores
  - Fallback a servidor de producción
  - Interceptores de requests
  - Headers de autenticación

### **Storage Service (`src/utils/storage.ts`)**
- **Responsabilidad:** Persistencia local de datos
- **Funcionalidades:**
  - Almacenamiento de tokens
  - Datos de usuario
  - Configuraciones
  - Cache de datos

---

## 🎨 Interfaz de Usuario

### **Diseño Responsivo**
- **Mobile-First:** Optimizado para dispositivos móviles
- **Adaptativo:** Se adapta a diferentes tamaños de pantalla
- **Accesible:** Cumple con estándares de accesibilidad

### **Navegación Intuitiva**
- **Menú Lateral:** Navegación principal con categorías
- **Breadcrumbs:** Indicadores de ubicación
- **Botones de Acción:** Accesos rápidos a funcionalidades

### **Feedback Visual**
- **Loading States:** Indicadores de carga
- **Toast Messages:** Notificaciones temporales
- **Error Handling:** Mensajes de error claros
- **Success Feedback:** Confirmaciones de acciones

---

## 🔒 Seguridad Implementada

### **Autenticación JWT**
- **Tokens de Acceso:** Autenticación segura
- **Refresh Tokens:** Renovación automática
- **Expiración:** Control de sesiones

### **Validación de Datos**
- **Frontend:** Validación en tiempo real
- **Backend:** Validación de servidor
- **Sanitización:** Prevención de XSS

### **Rutas Protegidas**
- **Middleware:** Verificación de autenticación
- **Redirección:** Control de acceso
- **Logout:** Limpieza de sesión

---

## 📊 Base de Datos

### **Entidades Principales**
- **Usuarios:** Información de usuarios registrados
- **Reportes:** Incidentes ambientales reportados
- **Normativas:** Documentos legales ambientales
- **Áreas Protegidas:** Información de conservación
- **Voluntariado:** Programas de participación

### **Relaciones**
- Usuario → Reportes (1:N)
- Reportes → Imágenes (1:N)
- Áreas → Normativas (N:N)
- Usuarios → Voluntariado (N:N)

---

## 🚀 Cómo Ejecutar el Proyecto

### **Requisitos Previos**
```bash
Node.js >= 18.19.0
npm >= 10.2.3
Ionic CLI >= 7.2.1
```

### **Instalación**
```bash
# Clonar el repositorio
git clone [URL_DEL_REPOSITORIO]
cd MedioAmbienteApp

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

### **Acceso a la Aplicación**
- **URL Local:** http://localhost:8102
- **URL de Red:** http://[IP]:8102

### **Comandos Útiles**
```bash
# Desarrollo
npm run dev

# Construcción para producción
npm run build

# Construcción para Android
ionic capacitor build android

# Construcción para iOS
ionic capacitor build ios
```

---

## 📈 Métricas del Proyecto

### **Código**
- **Líneas de Código:** ~15,000 líneas
- **Archivos TypeScript:** 25+ archivos
- **Componentes React:** 20+ componentes
- **Páginas:** 18 páginas principales

### **Funcionalidades**
- **Sistema de Autenticación:** Completo
- **Gestión de Reportes:** Completa
- **Información Ambiental:** Completa
- **Participación Ciudadana:** Completa
- **Contenido Educativo:** Completo

### **Tecnologías Utilizadas**
- **Frontend:** React, TypeScript, Ionic
- **Backend:** Node.js, Express, MySQL
- **Autenticación:** JWT
- **Almacenamiento:** Local Storage
- **Despliegue:** Capacitor

---

## 🎯 Logros del Proyecto

### **✅ Objetivos Cumplidos**
- [x] Sistema de autenticación completo
- [x] Gestión de reportes ambientales
- [x] Información de normativas y áreas protegidas
- [x] Contenido educativo y noticias
- [x] Sistema de voluntariado
- [x] Interfaz responsiva y accesible
- [x] Integración con APIs externas
- [x] Persistencia de datos local
- [x] Manejo de errores robusto
- [x] Documentación completa

### **🚀 Funcionalidades Avanzadas**
- **Ubicación Dual:** GPS automático y coordenadas manuales
- **Gestión de Imágenes:** Captura, compresión y almacenamiento
- **Mapas Interactivos:** Visualización geográfica de datos
- **Flujo de Contraseñas:** Recuperación y cambio seguro
- **API Robusta:** Fallback automático a servidor de producción
- **UX Optimizada:** Feedback visual y navegación intuitiva

---

## 📚 Aprendizajes Adquiridos

### **Tecnologías Móviles**
- Desarrollo con Ionic y Capacitor
- Componentes nativos móviles
- Gestión de estado en React
- Navegación y routing

### **Integración de APIs**
- Comunicación cliente-servidor
- Manejo de autenticación JWT
- Gestión de errores HTTP
- Fallback y redundancia

### **Experiencia de Usuario**
- Diseño mobile-first
- Feedback visual y estados de carga
- Validación en tiempo real
- Accesibilidad web

### **Arquitectura de Software**
- Separación de responsabilidades
- Patrones de diseño React
- Gestión de estado global
- Componentes reutilizables

---

## 🔮 Próximos Pasos

### **Mejoras Futuras**
- [ ] Notificaciones push
- [ ] Modo offline completo
- [ ] Sincronización de datos
- [ ] Análisis de datos y reportes
- [ ] Integración con redes sociales
- [ ] Gamificación y recompensas

### **Escalabilidad**
- [ ] Microservicios
- [ ] Base de datos distribuida
- [ ] CDN para contenido multimedia
- [ ] Load balancing
- [ ] Monitoreo y analytics

---

## 📞 Contacto del Equipo

**Líder del Proyecto:** Keydel Moya  
**Email:** keydel.moya@itla.edu.do  
**GitHub:** https://github.com/keydelmoya

**Equipo de Desarrollo:**
- **Frontend:** Sander Fernández (sander.fernandez@itla.edu.do)
- **Backend:** Ronell Medina (ronell.medina@itla.edu.do)
- **QA:** Carolin Ortiz (carolin.ortiz@itla.edu.do)

---

## 📄 Licencia

Este proyecto fue desarrollado como trabajo académico para la asignatura de Desarrollo de Aplicaciones Móviles en el Instituto Tecnológico de Las Américas (ITLA).

---

*Documento generado el 20 de agosto de 2025*  
*Versión del proyecto: 1.0.0*
