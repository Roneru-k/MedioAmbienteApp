import { useAuth } from '../contexts/AuthContext';
import { useHistory } from 'react-router-dom';

export const useAuthGuard = () => {
  const { isAuthenticated, loading, logout } = useAuth();
  const history = useHistory();

  const handleAuthError = (error: any, customMessage?: string) => {
    console.error('Auth Error:', error);
    
    if (error.response?.status === 401) {
      const message = customMessage || 'Sesión expirada. Inicia sesión nuevamente.';
      
      // Hacer logout y redirigir al login
      logout();
      
      setTimeout(() => {
        history.push('/login');
      }, 2000);
      
      return { isAuthError: true, message };
    }
    
    return { isAuthError: false, message: error.message || 'Error desconocido' };
  };

  return {
    isAuthenticated,
    loading,
    logout,
    handleAuthError
  };
};
