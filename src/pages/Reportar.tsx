import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonInput, IonItem, IonLabel, IonButton, IonToast,
  IonTextarea, IonImg
} from '@ionic/react';
import { useState } from 'react';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import api from '../utils/api';

const Reportar: React.FC = () => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [foto, setFoto] = useState<string | null>(null);
  const [latitud, setLatitud] = useState('');
  const [longitud, setLongitud] = useState('');
  const [toastMsg, setToastMsg] = useState('');

  // Función para tomar foto
  const tomarFoto = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
      });
      setFoto(image.dataUrl || null);
    } catch (error) {
      console.log('Error al tomar la foto:', error);
    }
  };

  // Enviar reporte
  const handleSubmit = async () => {
    try {
      await api.post('reportar', { titulo, descripcion, foto, latitud, longitud });
      setToastMsg('Reporte enviado con éxito');
      // Limpiar formulario
      setTitulo('');
      setDescripcion('');
      setFoto(null);
      setLatitud('');
      setLongitud('');
    } catch (error) {
      setToastMsg('Error al enviar reporte');
      console.error(error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Reportar Daño Ambiental</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">Título</IonLabel>
          <IonInput
            value={titulo}
            placeholder="Escribe un título descriptivo"
            onIonChange={(e) => setTitulo(e.detail.value!)}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Descripción</IonLabel>
          <IonTextarea
            value={descripcion}
            placeholder="Describe el daño ambiental"
            onIonChange={(e) => setDescripcion(e.detail.value!)}
            rows={4}
          />
        </IonItem>

        <IonItem lines="none">
          <IonButton expand="block" onClick={tomarFoto}>Tomar Foto / Seleccionar Imagen</IonButton>
        </IonItem>

        {foto && (
          <IonItem lines="none">
            <IonImg src={foto} />
          </IonItem>
        )}

        <IonItem>
          <IonLabel position="stacked">Latitud</IonLabel>
          <IonInput
            value={latitud}
            placeholder="Ej: 18.482"
            onIonChange={(e) => setLatitud(e.detail.value!)}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Longitud</IonLabel>
          <IonInput
            value={longitud}
            placeholder="Ej: -69.931"
            onIonChange={(e) => setLongitud(e.detail.value!)}
          />
        </IonItem>

        <IonButton expand="block" color="primary" onClick={handleSubmit} style={{ marginTop: '1rem' }}>
          Enviar Reporte
        </IonButton>

        <IonToast
          isOpen={!!toastMsg}
          message={toastMsg}
          duration={2000}
          onDidDismiss={() => setToastMsg('')}
        />
      </IonContent>
    </IonPage>
  );
};

export default Reportar;
