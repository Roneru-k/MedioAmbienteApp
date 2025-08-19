import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Storage } from '@ionic/storage';

interface Usuario {
  id: string;
  cedula: string;
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: Usuario | null;
  token: string | null;
  login: (token: string, user: Usuario) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Inicializar storage
const storage = new Storage();
storage.create();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<Usuario | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Verificar si hay sesión guardada al cargar la aplicación
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const savedToken = await storage.get('token');
        const savedUser = await storage.get('user');
        
        if (savedToken && savedUser) {
          setToken(savedToken);
          setUser(savedUser);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error al verificar autenticación:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (newToken: string, newUser: Usuario) => {
    try {
      await storage.set('token', newToken);
      await storage.set('user', newUser);
      
      setToken(newToken);
      setUser(newUser);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error al guardar datos de autenticación:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await storage.remove('token');
      await storage.remove('user');
      
      setToken(null);
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const value: AuthContextType = {
    isAuthenticated,
    user,
    token,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
