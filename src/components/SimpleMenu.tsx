import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
} from '@ionic/react';
import { useLocation } from 'react-router-dom';
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
} from 'ionicons/icons';
import './Menu.css';

interface AppPage {
  title: string;
  url: string;
  iosIcon: string;
  mdIcon: string;
}

const appPages: AppPage[] = [
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
  { title: 'Login', url: '/login', iosIcon: logInOutline, mdIcon: logInOutline },
  { title: 'Registro', url: '/register', iosIcon: personAddOutline, mdIcon: personAddOutline },
  { title: 'Auth Test', url: '/auth-test', iosIcon: shieldCheckmarkOutline, mdIcon: shieldCheckmarkOutline },
];

const SimpleMenu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="main-list">
          <IonListHeader>
            Menú 🌱
          </IonListHeader>
          
          {/* Páginas principales */}
          <IonListHeader>Páginas Principales</IonListHeader>
          {appPages.map((appPage, index) => (
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
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default SimpleMenu;
