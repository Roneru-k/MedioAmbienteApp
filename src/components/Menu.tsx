import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonAccordion,
  IonAccordionGroup,
  IonButton,
  IonAvatar,
} from '@ionic/react';

import { useLocation, useHistory } from 'react-router-dom';
import {
  homeOutline,
  newspaperOutline,
  listOutline,
  peopleOutline,
  mapOutline,
  warningOutline,
  logOutOutline,
  informationCircleOutline,
  playCircleOutline,
  leafOutline,
  personOutline,
  documentOutline,
  locationOutline,
  lockClosedOutline,
  heartOutline,
  logInOutline,
} from 'ionicons/icons';
import { useAuth } from '../contexts/AuthContext';
import './Menu.css';

interface AppPage {
  title: string;
  url: string;
  iosIcon: string;
  mdIcon: string;
  section?: string;
}

const appPages: AppPage[] = [
  // Páginas principales
  { title: 'Inicio', url: '/home', iosIcon: homeOutline, mdIcon: homeOutline, section: 'main' },
  { title: 'Sobre Nosotros', url: '/sobre-nosotros', iosIcon: informationCircleOutline, mdIcon: informationCircleOutline, section: 'main' },
  { title: 'Servicios', url: '/servicios', iosIcon: listOutline, mdIcon: listOutline, section: 'main' },
  { title: 'Noticias Ambientales', url: '/noticias', iosIcon: newspaperOutline, mdIcon: newspaperOutline, section: 'main' },
  { title: 'Videos Educativos', url: '/videos-educativos', iosIcon: playCircleOutline, mdIcon: playCircleOutline, section: 'main' },
  { title: 'Áreas Protegidas', url: '/areas-protegidas', iosIcon: mapOutline, mdIcon: mapOutline, section: 'main' },
  { title: 'Mapa de Áreas Protegidas', url: '/mapa-areas-protegidas', iosIcon: mapOutline, mdIcon: mapOutline, section: 'main' },
  { title: 'Medidas Ambientales', url: '/medidas-ambientales', iosIcon: leafOutline, mdIcon: leafOutline, section: 'main' },
  { title: 'Equipo del Ministerio', url: '/equipo-ministerio', iosIcon: personOutline, mdIcon: personOutline, section: 'main' },
  { title: 'Voluntariado', url: '/voluntariado', iosIcon: peopleOutline, mdIcon: peopleOutline, section: 'main' },
  { title: 'Acerca De', url: '/acerca-de', iosIcon: heartOutline, mdIcon: heartOutline, section: 'main' },
  
  // Páginas de usuario (requieren login)
  { title: 'Normativas Ambientales', url: '/normativas', iosIcon: documentOutline, mdIcon: documentOutline, section: 'user' },
  { title: 'Reportar Daño Ambiental', url: '/reportar', iosIcon: warningOutline, mdIcon: warningOutline, section: 'user' },
  { title: 'Mis Reportes', url: '/mis-reportes', iosIcon: listOutline, mdIcon: listOutline, section: 'user' },
  { title: 'Mapa de Reportes', url: '/mapa-reportes', iosIcon: locationOutline, mdIcon: locationOutline, section: 'user' },
  { title: 'Cambiar Contraseña', url: '/cambiar-contraseña', iosIcon: lockClosedOutline, mdIcon: lockClosedOutline, section: 'user' },
  
  // Acción de cerrar sesión
  { title: 'Cerrar Sesión', url: '/login', iosIcon: logOutOutline, mdIcon: logOutOutline, section: 'logout' }
];

const Menu: React.FC = () => {
  const location = useLocation();
  const history = useHistory();
  const { isAuthenticated, user, logout } = useAuth();

  const mainPages = appPages.filter(page => page.section === 'main');
  const userPages = appPages.filter(page => page.section === 'user');
  const logoutPage = appPages.find(page => page.section === 'logout');

  const handleLogout = async () => {
    await logout();
    history.push('/login');
  };

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="main-list">
          <IonListHeader>Menú 🌱</IonListHeader>
          
          {isAuthenticated ? (
            <>
              {/* Información del usuario */}
              <div style={{ 
                padding: '16px', 
                borderBottom: '1px solid var(--ion-color-light)',
                marginBottom: '8px'
              }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  marginBottom: '8px' 
                }}>
                  <IonAvatar style={{ 
                    width: '40px', 
                    height: '40px', 
                    marginRight: '12px',
                    backgroundColor: '#4CAF50'
                  }}>
                    <IonIcon icon={personOutline} style={{ fontSize: '20px' }} />
                  </IonAvatar>
                  <div>
                    <div style={{ 
                      fontWeight: '600', 
                      fontSize: '14px',
                      color: '#333'
                    }}>
                      {user?.nombre} {user?.apellido}
                    </div>
                    <div style={{ 
                      fontSize: '12px',
                      color: '#666'
                    }}>
                      {user?.correo}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <IonNote style={{ padding: '16px' }}>
              Inicia sesión para acceder a todas las funciones
            </IonNote>
          )}
          
          {/* Páginas principales */}
          <IonListHeader>Páginas Principales</IonListHeader>
          {mainPages.map((appPage, index) => (
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

          {/* Páginas de usuario (requieren login) */}
          {isAuthenticated ? (
            <>
              <IonListHeader>Mi Cuenta 🔐</IonListHeader>
              {userPages.map((appPage, index) => (
                <IonMenuToggle key={`user-${index}`} autoHide={false}>
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

              {/* Cerrar sesión */}
              <IonMenuToggle autoHide={false}>
                <IonItem
                  onClick={handleLogout}
                  lines="none"
                  detail={false}
                  color="danger"
                  button
                >
                  <IonIcon aria-hidden="true" slot="start" ios={logOutOutline} md={logOutOutline} />
                  <IonLabel>Cerrar Sesión</IonLabel>
                </IonItem>
              </IonMenuToggle>
            </>
          ) : (
            <>
              {/* Botón de login cuando no está autenticado */}
              <IonMenuToggle autoHide={false}>
                <IonItem
                  routerLink="/login"
                  routerDirection="none"
                  lines="none"
                  detail={false}
                  color="primary"
                  button
                >
                  <IonIcon aria-hidden="true" slot="start" ios={logInOutline} md={logInOutline} />
                  <IonLabel>Iniciar Sesión</IonLabel>
                </IonItem>
              </IonMenuToggle>
            </>
          )}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
