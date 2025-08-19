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
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import {
  homeOutline,
  newspaperOutline,
  listOutline,
  peopleOutline,
  mapOutline,
  warningOutline,
  logOutOutline
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
  { title: 'Noticias', url: '/noticias', iosIcon: newspaperOutline, mdIcon: newspaperOutline },
  { title: 'Servicios', url: '/servicios', iosIcon: listOutline, mdIcon: listOutline },
  { title: 'Voluntariado', url: '/voluntariado', iosIcon: peopleOutline, mdIcon: peopleOutline },
  { title: 'Reportar Daño', url: '/reportar', iosIcon: warningOutline, mdIcon: warningOutline },
  { title: 'Mis Reportes', url: '/mis-reportes', iosIcon: listOutline, mdIcon: listOutline },
  { title: 'Áreas Protegidas', url: '/areas-protegidas', iosIcon: mapOutline, mdIcon: mapOutline },
  { title: 'Mapa de Áreas', url: '/mapa', iosIcon: mapOutline, mdIcon: mapOutline },
  { title: 'Cerrar Sesión', url: '/login', iosIcon: logOutOutline, mdIcon: logOutOutline }
];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="main-list">
          <IonListHeader>Menú 🌱</IonListHeader>
          <IonNote>usuario@medioambiente.gob.do</IonNote>
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

export default Menu;
