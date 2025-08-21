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
  IonList,
  IonItem,
  IonLabel,
  IonBadge,
  IonBackButton,
  IonButtons
} from '@ionic/react';
import {
  shieldCheckmarkOutline,
  shieldOutline,
  personOutline,
  keyOutline,
  arrowBackOutline,
  refreshOutline
} from 'ionicons/icons';
import { useAuth } from '../contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import './Page.css';

const AuthTest: React.FC = () => {
  const { isAuthenticated, user, token, loading } = useAuth();
  const history = useHistory();

  const testProtectedRoute = () => {
    history.push('/normativas');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" icon={arrowBackOutline} />
          </IonButtons>
          <IonTitle>Prueba de Autenticación 🔐</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={shieldCheckmarkOutline} /> Estado de Autenticación
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList>
              <IonItem>
                <IonLabel>
                  <IonIcon icon={loading ? refreshOutline : (isAuthenticated ? shieldCheckmarkOutline : shieldOutline)} />
                  Estado
                </IonLabel>
                <IonBadge slot="end" color={isAuthenticated ? 'success' : 'danger'}>
                  {loading ? 'Cargando...' : (isAuthenticated ? 'Autenticado' : 'No Autenticado')}
                </IonBadge>
              </IonItem>

              {isAuthenticated && user && (
                <>
                  <IonItem>
                    <IonLabel>
                      <IonIcon icon={personOutline} />
                      Usuario
                    </IonLabel>
                    <IonText slot="end">
                      {user.nombre} {user.apellido}
                    </IonText>
                  </IonItem>

                  <IonItem>
                    <IonLabel>
                      <IonIcon icon={personOutline} />
                      Email
                    </IonLabel>
                    <IonText slot="end">
                      {user.correo}
                    </IonText>
                  </IonItem>

                  <IonItem>
                    <IonLabel>
                      <IonIcon icon={personOutline} />
                      ID
                    </IonLabel>
                    <IonText slot="end">
                      {user.id}
                    </IonText>
                  </IonItem>

                  <IonItem>
                    <IonLabel>
                      <IonIcon icon={personOutline} />
                      Teléfono
                    </IonLabel>
                    <IonText slot="end">
                      {user.telefono}
                    </IonText>
                  </IonItem>
                </>
              )}

              <IonItem>
                <IonLabel>
                  <IonIcon icon={keyOutline} />
                  Token
                </IonLabel>
                <IonText slot="end" style={{ fontSize: '0.8em', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {token ? `${token.substring(0, 20)}...` : 'No disponible'}
                </IonText>
              </IonItem>
            </IonList>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Pruebas</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonButton
              expand="block"
              onClick={testProtectedRoute}
              disabled={!isAuthenticated}
              style={{ marginBottom: '12px' }}
            >
              Probar Ruta Protegida (Normativas)
            </IonButton>

            <IonButton
              expand="block"
              fill="outline"
              onClick={() => history.push('/login')}
            >
              Ir al Login
            </IonButton>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Información</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonText>
              <p>Esta página te permite verificar el estado actual de la autenticación en la aplicación.</p>
              <p><strong>Estado:</strong> {isAuthenticated ? '✅ Autenticado' : '❌ No autenticado'}</p>
              <p><strong>Cargando:</strong> {loading ? '✅ Sí' : '❌ No'}</p>
            </IonText>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default AuthTest;
