import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel } from '@ionic/react';
import { useEffect, useState } from 'react';
import api from '../utils/api';

const Servicios: React.FC = () => {
  const [servicios, setServicios] = useState<any[]>([]);

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const response = await api.get('servicios');
        setServicios(response.data);
      } catch (error) {
        console.error('Error al obtener servicios', error);
      }
    };

    fetchServicios();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Servicios</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          {servicios.map((servicio) => (
            <IonItem key={servicio.id}>
              <IonLabel>{servicio.nombre}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Servicios;
