import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel } from '@ionic/react';
import { useEffect, useState } from 'react';
import api from '../utils/api';
import storage from '../utils/storage';

const MisReportes: React.FC = () => {
  const [reportes, setReportes] = useState<any[]>([]);

  useEffect(() => {
    const fetchReportes = async () => {
      try {
        const user = await storage.get('user');
        if (!user) return;
        const response = await api.get(`reportes?userId=${user.id}`);
        setReportes(response.data);
      } catch (error) {
        console.error('Error al obtener reportes', error);
      }
    };
    fetchReportes();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mis Reportes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          {reportes.map((reporte) => (
            <IonItem key={reporte.id}>
              <IonLabel>
                <h2>{reporte.titulo}</h2>
                <p>{reporte.descripcion}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default MisReportes;
