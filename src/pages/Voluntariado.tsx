import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonItem, IonLabel, IonButton, IonToast } from '@ionic/react';
import { useState } from 'react';
import api from '../utils/api';

const Voluntariado: React.FC = () => {
  const [cedula, setCedula] = useState('');
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [toastMsg, setToastMsg] = useState('');

  const handleSubmit = async () => {
    try {
      await api.post('voluntariado', { cedula, nombre, email, telefono });
      setToastMsg('Solicitud enviada con éxito');
    } catch (error) {
      setToastMsg('Error al enviar solicitud');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Voluntariado</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel>Cédula</IonLabel>
          <IonInput value={cedula} onIonChange={(e) => setCedula(e.detail.value!)} />
        </IonItem>
        <IonItem>
          <IonLabel>Nombre</IonLabel>
          <IonInput value={nombre} onIonChange={(e) => setNombre(e.detail.value!)} />
        </IonItem>
        <IonItem>
          <IonLabel>Email</IonLabel>
          <IonInput value={email} onIonChange={(e) => setEmail(e.detail.value!)} />
        </IonItem>
        <IonItem>
          <IonLabel>Teléfono</IonLabel>
          <IonInput value={telefono} onIonChange={(e) => setTelefono(e.detail.value!)} />
        </IonItem>
        <IonButton expand="block" onClick={handleSubmit}>Enviar Solicitud</IonButton>
        <IonToast isOpen={!!toastMsg} message={toastMsg} duration={2000} onDidDismiss={() => setToastMsg('')} />
      </IonContent>
    </IonPage>
  );
};

export default Voluntariado;
