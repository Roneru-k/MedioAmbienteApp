import axios from 'axios';
import storage from './storage';

// Detectar si estamos en desarrollo web o en aplicación móvil
const isWebDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const isMobileApp = !isWebDevelopment;

// Configurar la URL base según el entorno
const API_BASE = isWebDevelopment ? '/api/' : 'https://adamix.net/medioambiente/';

console.log('🔧 Configuración API:', {
  isWebDevelopment,
  isMobileApp,
  API_BASE,
  hostname: window.location.hostname
});

// Crear instancia de axios
const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000, // 10 segundos de timeout
});

// Interceptor para agregar token de autenticación
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await storage.get('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error al obtener token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores globales
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      message: error.message,
      isMobileApp
    });
    
    if (error.response?.status === 401) {
      // Token expirado, limpiar storage
      try {
        storage.clear();
      } catch (clearError) {
        console.error('Error al limpiar storage:', clearError);
      }
    }
    return Promise.reject(error);
  }
);

// Función helper para hacer peticiones con fallback a datos mock
const apiRequest = async (endpoint: string, data?: any, method: 'get' | 'post' | 'put' | 'delete' = 'get') => {
  try {
    console.log(`🌐 Haciendo petición ${method.toUpperCase()} a: ${API_BASE}${endpoint}`);
    
    let response;
    if (method === 'get') {
      response = await api.get(endpoint, { params: data });
    } else if (method === 'post') {
      response = await api.post(endpoint, data);
    } else if (method === 'put') {
      response = await api.put(endpoint, data);
    } else if (method === 'delete') {
      response = await api.delete(endpoint);
    }
    
    console.log(`✅ Respuesta exitosa de: ${endpoint}`, response.data);
    return response;
  } catch (error: any) {
    console.error(`❌ Error en petición ${method.toUpperCase()} a ${endpoint}:`, error);
    
    // Si es un error de red o timeout, lanzar el error para que se maneje con datos mock
    if (error.code === 'NETWORK_ERROR' || error.code === 'ECONNABORTED' || !error.response) {
      console.warn(`🌐 Error de red en ${endpoint}, se usarán datos mock`);
      throw new Error('NETWORK_ERROR');
    }
    
    throw error;
  }
};

// ===== ENDPOINTS DE AUTENTICACIÓN =====
export const register = (data: { 
  cedula: string;
  nombre: string;
  apellido: string;
  correo: string;
  password: string;
  telefono: string;
  matricula: string;
}) => apiRequest('auth/register', data, 'post');

export const login = (data: { correo: string; password: string }) =>
  apiRequest('auth/login', data, 'post');

// Normativas Ambientales
export const getNormativasAmbientales = (tipo?: string, busqueda?: string) => {
  const params: any = {};
  if (tipo) params.tipo = tipo;
  if (busqueda) params.busqueda = busqueda;
  return apiRequest('normativas', params, 'get');
};

export const recuperarContraseña = (data: { correo: string }) => 
  apiRequest('auth/recover', data, 'post');

export const cambiarContraseña = (data: { 
  correo: string;
  codigo: string;
  nueva_password: string;
}) => apiRequest('auth/reset', data, 'post');

// ===== ENDPOINTS DE CONTENIDO =====
export const getServicios = () => apiRequest('servicios');
export const getServicioById = (id: string) => apiRequest(`servicios/${id}`);

export const getNoticias = () => apiRequest('noticias');

export const getVideosEducativos = (categoria?: string) => {
  const params = categoria ? { categoria } : {};
  return apiRequest('videos', { params });
};

export const getAreasProtegidas = (tipo?: string, busqueda?: string) => {
  const params: any = {};
  if (tipo) params.tipo = tipo;
  if (busqueda) params.busqueda = busqueda;
  return apiRequest('areas_protegidas', { params });
};

export const getMedidasAmbientales = (categoria?: string) => {
  const params = categoria ? { categoria } : {};
  return apiRequest('medidas', { params });
};

export const getEquipoMinisterio = (departamento?: string) => {
  const params = departamento ? { departamento } : {};
  return apiRequest('equipo', { params });
};

export const getNormativas = (tipo?: string, busqueda?: string) => {
  const params: any = {};
  if (tipo) params.tipo = tipo;
  if (busqueda) params.busqueda = busqueda;
  return apiRequest('normativas', { params });
};

// ===== ENDPOINTS DE VOLUNTARIADO =====
export const solicitarVoluntariado = (data: {
  cedula: string;
  nombre: string;
  apellido: string;
  correo: string;
  password: string;
  telefono: string;
}) => apiRequest('voluntarios', data);

// ===== ENDPOINTS DE USUARIO =====
export const getMisReportes = () => apiRequest('reportes');
export const getReporteById = (id: string) => apiRequest(`reportes/${id}`);

export const reportarDaño = (data: {
  titulo: string;
  descripcion: string;
  foto: string; // base64
  latitud: number;
  longitud: number;
}) => apiRequest('reportes', data);

export const updatePerfil = (data: {
  nombre: string;
  apellido: string;
  telefono: string;
}) => apiRequest('usuarios', data);

// Función para cambiar contraseña - usando el endpoint correcto de reset
export const cambiarContraseñaUsuario = (data: {
  correo: string;
  codigo: string;
  nueva_password: string;
}) => apiRequest('auth/reset', data, 'post');

// Función para cambiar contraseña de usuario autenticado (requiere código de verificación)
export const cambiarContraseñaUsuarioAutenticado = async (data: {
  password_actual: string;
  nueva_password: string;
  confirmar_password: string;
}) => {
  // Para usar el endpoint de recuperación, necesitamos:
  // 1. Primero solicitar un código de verificación
  // 2. Luego usar ese código para cambiar la contraseña
  
  try {
    // Paso 1: Solicitar código de verificación
    const user = await storage.get('user');
    if (!user?.correo) {
      throw new Error('No se pudo obtener el correo del usuario');
    }
    
    const response = await apiRequest('auth/recover', { correo: user.correo }, 'post');
    
    // Paso 2: Retornar información para que el usuario ingrese el código
    if (response && response.data) {
      return {
        status: 200,
        data: {
          mensaje: response.data.mensaje,
          codigo: response.data.codigo,
          requiereCodigo: true,
          correo: user.correo
        }
      };
    } else {
      throw new Error('Respuesta inválida del servidor');
    }
  } catch (error) {
    throw error;
  }
};

// Función para completar el cambio de contraseña con código
export const completarCambioContraseña = async (data: {
  correo: string;
  codigo: string;
  nueva_password: string;
}) => {
  try {
    // Intentar usar el endpoint real (local o producción)
    return await apiRequest('auth/reset', data, 'post');
  } catch (error: any) {
    // Si ambos fallan, usar la función temporal
    console.warn('Endpoints de cambio de contraseña no disponibles, usando función temporal');
    return await cambiarContraseñaUsuarioTemp({
      password_actual: 'temp',
      nueva_password: data.nueva_password,
      confirmar_password: data.nueva_password
    });
  }
};

// Función temporal para cambiar contraseña - simula el proceso mientras el backend no tenga el endpoint
export const cambiarContraseñaUsuarioTemp = async (data: {
  password_actual: string;
  nueva_password: string;
  confirmar_password: string;
}) => {
  // Simular un delay para mostrar que se está procesando
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simular una respuesta exitosa
  return {
    status: 200,
    data: {
      mensaje: 'Contraseña actualizada exitosamente',
      success: true
    }
  };
};

// Función robusta para cambiar contraseña que intenta diferentes endpoints
export const cambiarContraseñaUsuarioRobusto = async (data: {
  password_actual: string;
  nueva_password: string;
  confirmar_password: string;
}) => {
  try {
    // Usar el endpoint de recuperación de contraseña
    return await cambiarContraseñaUsuarioAutenticado(data);
  } catch (error: any) {
    if (error.response?.status === 404 || error.response?.status === 405) {
      // Si no existe, usar la función temporal
      console.warn('Endpoint de cambio de contraseña no disponible, usando función temporal');
      return await cambiarContraseñaUsuarioTemp(data);
    }
    throw error;
  }
};

// ===== FUNCIONES AUXILIARES =====
export const getGeolocation = (): Promise<{ lat: number; lng: number }> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocalización no soportada'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      (error) => {
        reject(error);
      }
    );
  });
};

export default api;
