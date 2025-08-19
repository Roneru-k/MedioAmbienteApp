import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonButton,
  IonToast,
} from '@ionic/react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';
import {
  homeOutline,
  logInOutline,
  shieldCheckmarkOutline,
  informationCircleOutline,
  listOutline,
  newspaperOutline,
  playCircleOutline,
  mapOutline,
  leafOutline,
  personOutline,
  peopleOutline,
  heartOutline,
  personAddOutline,
  logOutOutline,
  documentTextOutline,
  warningOutline,
  settingsOutline,
} from 'ionicons/icons';
import './Menu.css';

interface AppPage {
  title: string;
  url: string;
  iosIcon: string;
  mdIcon: string;
  requiresAuth?: boolean;
  publicOnly?: boolean; // Solo para usuarios no autenticados
}

const SimpleMenu: React.FC = () => {
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();
  const [showLogoutToast, setShowLogoutToast] = useState(false);

  // Páginas públicas (siempre visibles)
  const publicPages: AppPage[] = [
    { title: 'Inicio', url: '/home', iosIcon: homeOutline, mdIcon: homeOutline },
    { title: 'Sobre Nosotros', url: '/sobre-nosotros', iosIcon: informationCircleOutline, mdIcon: informationCircleOutline },
    { title: 'Servicios', url: '/servicios', iosIcon: listOutline, mdIcon: listOutline },
    { title: 'Noticias', url: '/noticias', iosIcon: newspaperOutline, mdIcon: newspaperOutline },
    { title: 'Videos Educativos', url: '/videos-educativos', iosIcon: playCircleOutline, mdIcon: playCircleOutline },
    { title: 'Áreas Protegidas', url: '/areas-protegidas', iosIcon: mapOutline, mdIcon: mapOutline },
    { title: 'Mapa de Áreas', url: '/mapa-areas-protegidas', iosIcon: mapOutline, mdIcon: mapOutline },
    { title: 'Medidas Ambientales', url: '/medidas-ambientales', iosIcon: leafOutline, mdIcon: leafOutline },
    { title: 'Equipo Ministerio', url: '/equipo-ministerio', iosIcon: personOutline, mdIcon: personOutline },
    { title: 'Voluntariado', url: '/voluntariado', iosIcon: peopleOutline, mdIcon: peopleOutline },
    { title: 'Acerca De', url: '/acerca-de', iosIcon: heartOutline, mdIcon: heartOutline },
  ];

  // Páginas solo para usuarios no autenticados
  const authPages: AppPage[] = [
    { title: 'Login', url: '/login', iosIcon: logInOutline, mdIcon: logInOutline, publicOnly: true },
    { title: 'Registro', url: '/register', iosIcon: personAddOutline, mdIcon: personAddOutline, publicOnly: true },
  ];

  // Páginas solo para usuarios autenticados
  const protectedPages: AppPage[] = [
    { title: 'Normativas Ambientales', url: '/normativas', iosIcon: documentTextOutline, mdIcon: documentTextOutline, requiresAuth: true },
    { title: 'Reportar Incidente', url: '/reportar', iosIcon: warningOutline, mdIcon: warningOutline, requiresAuth: true },
    { title: 'Mis Reportes', url: '/mis-reportes', iosIcon: listOutline, mdIcon: listOutline, requiresAuth: true },
    { title: 'Mapa de Reportes', url: '/mapa-reportes', iosIcon: mapOutline, mdIcon: mapOutline, requiresAuth: true },
    { title: 'Cambiar Contraseña', url: '/cambiar-contraseña', iosIcon: settingsOutline, mdIcon: settingsOutline, requiresAuth: true },
  ];

  // Función para manejar el logout
  const handleLogout = async () => {
    try {
      await logout();
      setShowLogoutToast(true);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <>
      <IonMenu contentId="main" type="overlay">
        <IonContent>
          <IonList id="main-list">
            <IonListHeader>
              Menú 🌱
            </IonListHeader>
            
            {/* Información del usuario si está autenticado */}
            {isAuthenticated && user && (
              <>
                <IonListHeader>Usuario</IonListHeader>
                <IonItem lines="none">
                  <IonIcon aria-hidden="true" slot="start" ios={personOutline} md={personOutline} />
                  <IonLabel>
                    <h3>{user.nombre} {user.apellido}</h3>
                    <p>{user.correo}</p>
                  </IonLabel>
                </IonItem>
              </>
            )}
            
            {/* Páginas principales */}
            <IonListHeader>Páginas Principales</IonListHeader>
            {publicPages.map((appPage, index) => (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  className={location.pathname === appPage.url ? 'selected' : ''}
                  routerLink={appPage.url}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <IonIcon aria-hidden="true" slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            ))}

            {/* Páginas de autenticación (solo para usuarios no autenticados) */}
            {!isAuthenticated && (
              <>
                <IonListHeader>Autenticación</IonListHeader>
                {authPages.map((appPage, index) => (
                  <IonMenuToggle key={index} autoHide={false}>
                    <IonItem
                      className={location.pathname === appPage.url ? 'selected' : ''}
                      routerLink={appPage.url}
                      routerDirection="none"
                      lines="none"
                      detail={false}
                    >
                      <IonIcon aria-hidden="true" slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                      <IonLabel>{appPage.title}</IonLabel>
                    </IonItem>
                  </IonMenuToggle>
                ))}
              </>
            )}

            {/* Páginas protegidas (solo para usuarios autenticados) */}
            {isAuthenticated && (
              <>
                <IonListHeader>Área Personal</IonListHeader>
                {protectedPages.map((appPage, index) => (
                  <IonMenuToggle key={index} autoHide={false}>
                    <IonItem
                      className={location.pathname === appPage.url ? 'selected' : ''}
                      routerLink={appPage.url}
                      routerDirection="none"
                      lines="none"
                      detail={false}
                    >
                      <IonIcon aria-hidden="true" slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                      <IonLabel>{appPage.title}</IonLabel>
                    </IonItem>
                  </IonMenuToggle>
                ))}
                
                {/* Botón de logout */}
                <IonMenuToggle autoHide={false}>
                  <IonItem
                    button
                    onClick={handleLogout}
                    lines="none"
                    detail={false}
                  >
                    <IonIcon aria-hidden="true" slot="start" ios={logOutOutline} md={logOutOutline} />
                    <IonLabel>Cerrar Sesión</IonLabel>
                  </IonItem>
                </IonMenuToggle>
              </>
            )}

            {/* Página de prueba de autenticación (solo en desarrollo) */}
            <IonListHeader>Desarrollo</IonListHeader>
            <IonMenuToggle autoHide={false}>
              <IonItem
                className={location.pathname === '/auth-test' ? 'selected' : ''}
                routerLink="/auth-test"
                routerDirection="none"
                lines="none"
                detail={false}
              >
                <IonIcon aria-hidden="true" slot="start" ios={shieldCheckmarkOutline} md={shieldCheckmarkOutline} />
                <IonLabel>Auth Test</IonLabel>
              </IonItem>
            </IonMenuToggle>
          </IonList>
        </IonContent>
      </IonMenu>
      
      <IonToast
        isOpen={showLogoutToast}
        onDidDismiss={() => setShowLogoutToast(false)}
        message="Sesión cerrada exitosamente"
        duration={2000}
        position="top"
        color="success"
      />
    </>
  );
};

export default SimpleMenu;
