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
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/react';
import {
  leafOutline,
  earthOutline,
  waterOutline,
  flameOutline,
  checkmarkCircleOutline,
  mapOutline,
  peopleOutline,
  logInOutline
} from 'ionicons/icons';
import './Page.css';

const SimpleHome: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Medio Ambiente RD 🌱</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {/* Banner principal */}
        <IonCard style={{ 
          background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
          color: 'white',
          marginBottom: '20px'
        }}>
          <IonCardHeader>
            <IonCardTitle style={{ color: 'white', fontSize: '1.5em' }}>
              <IonIcon icon={leafOutline} style={{ marginRight: '8px' }} />
              Bienvenido al Ministerio de Medio Ambiente
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonText style={{ color: 'white' }}>
              <p>Promoviendo la conservación y el desarrollo sostenible en la República Dominicana.</p>
            </IonText>
          </IonCardContent>
        </IonCard>

        {/* Acciones rápidas */}
        <IonGrid>
          <IonRow>
            <IonCol size="6">
              <IonCard style={{ textAlign: 'center', height: '120px' }}>
                <IonCardContent>
                  <IonIcon icon={leafOutline} style={{ fontSize: '2em', color: '#4CAF50', marginBottom: '8px' }} />
                  <IonText>
                    <p style={{ margin: '0', fontSize: '0.9em' }}>Medidas Ambientales</p>
                  </IonText>
                  <IonButton 
                    fill="clear" 
                    size="small" 
                    routerLink="/medidas-ambientales"
                    style={{ marginTop: '8px' }}
                  >
                    Ver Medidas
                  </IonButton>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size="6">
              <IonCard style={{ textAlign: 'center', height: '120px' }}>
                <IonCardContent>
                  <IonIcon icon={mapOutline} style={{ fontSize: '2em', color: '#2196F3', marginBottom: '8px' }} />
                  <IonText>
                    <p style={{ margin: '0', fontSize: '0.9em' }}>Áreas Protegidas</p>
                  </IonText>
                  <IonButton 
                    fill="clear" 
                    size="small" 
                    routerLink="/areas-protegidas"
                    style={{ marginTop: '8px' }}
                  >
                    Ver Áreas
                  </IonButton>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="6">
              <IonCard style={{ textAlign: 'center', height: '120px' }}>
                <IonCardContent>
                  <IonIcon icon={peopleOutline} style={{ fontSize: '2em', color: '#FF9800', marginBottom: '8px' }} />
                  <IonText>
                    <p style={{ margin: '0', fontSize: '0.9em' }}>Voluntariado</p>
                  </IonText>
                  <IonButton 
                    fill="clear" 
                    size="small" 
                    routerLink="/voluntariado"
                    style={{ marginTop: '8px' }}
                  >
                    Ser Voluntario
                  </IonButton>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size="6">
              <IonCard style={{ textAlign: 'center', height: '120px' }}>
                <IonCardContent>
                  <IonIcon icon={logInOutline} style={{ fontSize: '2em', color: '#9C27B0', marginBottom: '8px' }} />
                  <IonText>
                    <p style={{ margin: '0', fontSize: '0.9em' }}>Iniciar Sesión</p>
                  </IonText>
                  <IonButton 
                    fill="clear" 
                    size="small" 
                    routerLink="/login"
                    style={{ marginTop: '8px' }}
                  >
                    Login
                  </IonButton>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>

        {/* Información adicional */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Funcionalidades Disponibles</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonText>
              <p>✅ <strong>Acceso Libre:</strong> Todas las páginas principales están disponibles</p>
              <p>✅ <strong>Navegación:</strong> Menú lateral funcional con todas las opciones</p>
              <p>✅ <strong>Contenido:</strong> Información ambiental, áreas protegidas, medidas</p>
              <p>✅ <strong>Voluntariado:</strong> Formulario de solicitud disponible</p>
              <p>🔐 <strong>Requieren Login:</strong> Normativas, Reportes, Perfil de Usuario</p>
            </IonText>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default SimpleHome;
