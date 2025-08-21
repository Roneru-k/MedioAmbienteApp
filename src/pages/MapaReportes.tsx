import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonIcon,
  IonText,
  IonBackButton,
  IonButtons
} from '@ionic/react';
import {
  mapOutline,
  arrowBackOutline,
  constructOutline
} from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import './Page.css';

const MapaReportes: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" icon={arrowBackOutline} />
          </IonButtons>
          <IonTitle>Mapa de Reportes 🗺️</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonCard style={{ margin: '20px', textAlign: 'center' }}>
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={constructOutline} style={{ fontSize: '48px', color: '#ff6b35', marginBottom: '16px' }} />
              <br />
              En Desarrollo
            </IonCardTitle>
          </IonCardHeader>
          
          <IonCardContent>
            <IonText color="medium">
              <p style={{ fontSize: '1.1em', lineHeight: '1.6', marginBottom: '24px' }}>
                El mapa de reportes estará disponible próximamente. 
                Esta funcionalidad permitirá visualizar todos los reportes 
                ambientales en un mapa interactivo.
              </p>
              
              <p style={{ fontSize: '0.9em', color: '#666', marginBottom: '24px' }}>
                Mientras tanto, puedes:
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <IonButton
                  fill="outline"
                  onClick={() => history.push('/mis-reportes')}
                >
                  <IonIcon icon={mapOutline} slot="start" />
                  Ver Mis Reportes
                </IonButton>
                
                <IonButton
                  fill="outline"
                  onClick={() => history.push('/reportar')}
                >
                  <IonIcon icon={mapOutline} slot="start" />
                  Crear Nuevo Reporte
                </IonButton>
              </div>
            </IonText>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default MapaReportes;
