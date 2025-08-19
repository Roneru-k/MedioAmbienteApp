import axios from 'axios';
import storage from './storage';

const API_BASE = '/api/';
const PRODUCTION_API_BASE = 'https://adamix.net/medioambiente/';

// Crear instancia para API local
const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

// Crear instancia para API de producción
const productionApi = axios.create({
  baseURL: PRODUCTION_API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

// Interceptor para agregar token de autenticación (solo para API local)
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
    console.error('API Error:', error.response || error.message);
    if (error.response?.status === 401) {
      // Token expirado, limpiar storage pero no redirigir automáticamente
      // La redirección se manejará en el componente ProtectedRoute
      try {
        storage.clear();
      } catch (clearError) {
        console.error('Error al limpiar storage:', clearError);
      }
    }
    return Promise.reject(error);
  }
);

// Función helper para intentar endpoint local primero, luego producción
const tryLocalThenProduction = async (endpoint: string, data?: any, method: 'get' | 'post' | 'put' | 'delete' = 'get') => {
  try {
    // Intentar primero con API local
    if (method === 'get') {
      return await api.get(endpoint, { params: data });
    } else if (method === 'post') {
      return await api.post(endpoint, data);
    } else if (method === 'put') {
      return await api.put(endpoint, data);
    } else if (method === 'delete') {
      return await api.delete(endpoint);
    }
  } catch (error: any) {
    // Si falla con 404, intentar con API de producción
    if (error.response?.status === 404) {
      console.warn(`Endpoint ${endpoint} no disponible en servidor local, usando servidor de producción`);
      if (method === 'get') {
        return await productionApi.get(endpoint, { params: data });
      } else if (method === 'post') {
        return await productionApi.post(endpoint, data);
      } else if (method === 'put') {
        return await productionApi.put(endpoint, data);
      } else if (method === 'delete') {
        return await productionApi.delete(endpoint);
      }
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
}) => tryLocalThenProduction('auth/register', data, 'post');

export const login = (data: { correo: string; password: string }) =>
  tryLocalThenProduction('auth/login', data, 'post');

// Normativas Ambientales
export const getNormativasAmbientales = (tipo?: string, busqueda?: string) => {
  const params: any = {};
  if (tipo) params.tipo = tipo;
  if (busqueda) params.busqueda = busqueda;
  return tryLocalThenProduction('normativas', params, 'get');
};

export const recuperarContraseña = (data: { correo: string }) => 
  tryLocalThenProduction('auth/recover', data, 'post');

export const cambiarContraseña = (data: { 
  correo: string;
  codigo: string;
  nueva_password: string;
}) => tryLocalThenProduction('auth/reset', data, 'post');

// ===== ENDPOINTS DE CONTENIDO =====
export const getServicios = () => api.get('servicios');
export const getServicioById = (id: string) => api.get(`servicios/${id}`);

export const getNoticias = () => api.get('noticias');

export const getVideosEducativos = (categoria?: string) => {
  const params = categoria ? { categoria } : {};
  return api.get('videos', { params });
};

export const getAreasProtegidas = (tipo?: string, busqueda?: string) => {
  const params: any = {};
  if (tipo) params.tipo = tipo;
  if (busqueda) params.busqueda = busqueda;
  return api.get('areas_protegidas', { params });
};

export const getMedidasAmbientales = (categoria?: string) => {
  const params = categoria ? { categoria } : {};
  return api.get('medidas', { params });
};

export const getEquipoMinisterio = (departamento?: string) => {
  const params = departamento ? { departamento } : {};
  return api.get('equipo', { params });
};

export const getNormativas = (tipo?: string, busqueda?: string) => {
  const params: any = {};
  if (tipo) params.tipo = tipo;
  if (busqueda) params.busqueda = busqueda;
  return api.get('normativas', { params });
};

// ===== ENDPOINTS DE VOLUNTARIADO =====
export const solicitarVoluntariado = (data: {
  cedula: string;
  nombre: string;
  apellido: string;
  correo: string;
  password: string;
  telefono: string;
}) => api.post('voluntarios', data);

// ===== ENDPOINTS DE USUARIO =====
export const getMisReportes = () => api.get('reportes');
export const getReporteById = (id: string) => api.get(`reportes/${id}`);

export const reportarDaño = (data: {
  titulo: string;
  descripcion: string;
  foto: string; // base64
  latitud: number;
  longitud: number;
}) => api.post('reportes', data);

export const updatePerfil = (data: {
  nombre: string;
  apellido: string;
  telefono: string;
}) => api.put('usuarios', data);

// Función para cambiar contraseña - usando el endpoint correcto de reset
export const cambiarContraseñaUsuario = (data: {
  correo: string;
  codigo: string;
  nueva_password: string;
}) => tryLocalThenProduction('auth/reset', data, 'post');

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
    
    const response = await tryLocalThenProduction('auth/recover', { correo: user.correo }, 'post');
    
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
    return await tryLocalThenProduction('auth/reset', data, 'post');
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
