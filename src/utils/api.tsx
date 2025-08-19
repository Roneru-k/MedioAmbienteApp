import axios from 'axios';
import storage from './storage';

const API_BASE = '/api/';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

// Interceptor para agregar token de autenticación
api.interceptors.request.use(
  async (config) => {
    const token = await storage.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
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
      // Token expirado, redirigir al login
      storage.clear();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ===== ENDPOINTS DE AUTENTICACIÓN =====
export const register = (data: { 
  cedula: string;
  nombre: string;
  apellido: string;
  correo: string;
  password: string;
  telefono: string;
  matricula: string;
}) => api.post('auth/register', data);

export const login = (data: { correo: string; password: string }) =>
  api.post('auth/login', data);

// Normativas Ambientales
export const getNormativasAmbientales = (tipo?: string, busqueda?: string) => {
  const params: any = {};
  if (tipo) params.tipo = tipo;
  if (busqueda) params.busqueda = busqueda;
  return api.get('normativas', { params });
};

export const recuperarContraseña = (data: { correo: string }) => 
  api.post('auth/recuperar-password', data);

export const cambiarContraseña = (data: { 
  correo: string;
  codigo: string;
  nueva_password: string;
}) => api.post('auth/cambiar-password', data);

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
}) => api.put('perfil', data);

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
