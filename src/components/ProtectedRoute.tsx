import React, { useEffect } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { IonLoading } from '@ionic/react';
import storage from '../utils/storage';

interface ProtectedRouteProps extends RouteProps {
  component: React.ComponentType<any>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  component: Component, 
  ...rest 
}) => {
  const { isAuthenticated, loading, logout } = useAuth();

  // Verificar si el token existe en storage al montar el componente
  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await storage.get('token');
        if (!token && isAuthenticated) {
          // Si no hay token pero el estado dice que está autenticado, hacer logout
          logout();
        }
      } catch (error) {
        console.error('Error verificando token:', error);
        if (isAuthenticated) {
          logout();
        }
      }
    };

    if (!loading) {
      checkToken();
    }
  }, [loading, isAuthenticated, logout]);

  if (loading) {
    return <IonLoading isOpen={true} message="Verificando autenticación..." />;
  }

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
