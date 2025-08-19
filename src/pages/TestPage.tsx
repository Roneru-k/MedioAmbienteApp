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
  IonText
} from '@ionic/react';
import { checkmarkCircleOutline } from 'ionicons/icons';
import './Page.css';

const TestPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Prueba de Carga ✅</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={checkmarkCircleOutline} /> Aplicación Cargada Correctamente
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonText>
              <p>¡La aplicación se ha cargado exitosamente!</p>
              <p>Esto significa que:</p>
              <ul>
                <li>✅ React está funcionando</li>
                <li>✅ Ionic está funcionando</li>
                <li>✅ El enrutador está funcionando</li>
                <li>✅ Los componentes se están renderizando</li>
              </ul>
            </IonText>
            
            <IonButton expand="block" routerLink="/home" style={{ marginTop: '20px' }}>
              Ir al Inicio
            </IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default TestPage;
