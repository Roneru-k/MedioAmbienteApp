import axios from 'axios';

const API_BASE = 'https://adamix.net/medioambiente/';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

// Interceptor para manejar errores globales
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response || error.message);
    return Promise.reject(error);
  }
);

// Funciones auxiliares
export const getNoticias = () => api.get('noticias');
export const getServicios = () => api.get('servicios');
export const getAreasProtegidas = () => api.get('areas-protegidas');
export const reportarDaño = (data: any) => api.post('reportar', data);
export const voluntariado = (data: any) => api.post('voluntariado', data);

export default api;
