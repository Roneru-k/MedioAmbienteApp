import React, { useEffect } from 'react';
import { Route, Redirect, RouteProps, useHistory } from 'react-router-dom';
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
  const history = useHistory();

  // Verificar si el token existe en storage al montar el componente
  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await storage.get('token');
        if (!token && isAuthenticated) {
          // Si no hay token pero el estado dice que está autenticado, hacer logout
          await logout();
          history.push('/login');
        }
      } catch (error) {
        console.error('Error verificando token:', error);
        if (isAuthenticated) {
          await logout();
          history.push('/login');
        }
      }
    };

    if (!loading) {
      checkToken();
    }
  }, [loading, isAuthenticated, logout, history]);

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
