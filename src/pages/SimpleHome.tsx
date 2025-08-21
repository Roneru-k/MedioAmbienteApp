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
  logInOutline,
  warningOutline,
  documentTextOutline,
  personOutline
} from 'ionicons/icons';
import { useAuth } from '../contexts/AuthContext';
import './Page.css';

const SimpleHome: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

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
              {isAuthenticated && user 
                ? `Bienvenido, ${user.nombre} ${user.apellido}`
                : 'Bienvenido al Ministerio de Medio Ambiente'
              }
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonText style={{ color: 'white' }}>
              <p>
                {isAuthenticated 
                  ? 'Accede a todas las funcionalidades disponibles para usuarios registrados.'
                  : 'Promoviendo la conservación y el desarrollo sostenible en la República Dominicana.'
                }
              </p>
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
              {isAuthenticated ? (
                // Contenido para usuarios autenticados
                <IonCard style={{ textAlign: 'center', height: '120px' }}>
                  <IonCardContent>
                    <IonIcon icon={warningOutline} style={{ fontSize: '2em', color: '#F44336', marginBottom: '8px' }} />
                    <IonText>
                      <p style={{ margin: '0', fontSize: '0.9em' }}>Reportar Incidente</p>
                    </IonText>
                    <IonButton 
                      fill="clear" 
                      size="small" 
                      routerLink="/reportar"
                      style={{ marginTop: '8px' }}
                    >
                      Reportar
                    </IonButton>
                  </IonCardContent>
                </IonCard>
              ) : (
                // Contenido para usuarios no autenticados
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
              )}
            </IonCol>
          </IonRow>
        </IonGrid>

        {/* Funcionalidades específicas para usuarios autenticados */}
        {isAuthenticated && (
          <IonCard style={{ marginBottom: '20px' }}>
            <IonCardHeader>
              <IonCardTitle>Funcionalidades de Usuario</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonGrid>
                <IonRow>
                  <IonCol size="6">
                    <IonButton 
                      expand="block" 
                      fill="outline" 
                      routerLink="/normativas"
                      style={{ marginBottom: '8px' }}
                    >
                      <IonIcon icon={documentTextOutline} slot="start" />
                      Normativas
                    </IonButton>
                  </IonCol>
                  <IonCol size="6">
                    <IonButton 
                      expand="block" 
                      fill="outline" 
                      routerLink="/mis-reportes"
                      style={{ marginBottom: '8px' }}
                    >
                      <IonIcon icon={personOutline} slot="start" />
                      Mis Reportes
                    </IonButton>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol size="6">
                    <IonButton 
                      expand="block" 
                      fill="outline" 
                      routerLink="/mapa-reportes"
                      style={{ marginBottom: '8px' }}
                    >
                      <IonIcon icon={mapOutline} slot="start" />
                      Mapa Reportes
                    </IonButton>
                  </IonCol>
                  <IonCol size="6">
                    <IonButton 
                      expand="block" 
                      fill="outline" 
                      routerLink="/cambiar-contraseña"
                      style={{ marginBottom: '8px' }}
                    >
                      <IonIcon icon={personOutline} slot="start" />
                      Cambiar Contraseña
                    </IonButton>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCardContent>
          </IonCard>
        )}

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
              {isAuthenticated ? (
                <>
                  <p>✅ <strong>Acceso Completo:</strong> Todas las funcionalidades están disponibles</p>
                  <p>✅ <strong>Reportes:</strong> Puedes reportar incidentes ambientales</p>
                  <p>✅ <strong>Normativas:</strong> Acceso a normativas ambientales</p>
                  <p>✅ <strong>Perfil:</strong> Gestiona tu información personal</p>
                </>
              ) : (
                <p>🔐 <strong>Requieren Login:</strong> Normativas, Reportes, Perfil de Usuario</p>
              )}
            </IonText>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default SimpleHome;
