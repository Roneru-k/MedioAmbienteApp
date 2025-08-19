import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';
import { useEffect, useState } from 'react';
import api from '../utils/api';

const Mapa: React.FC = () => {
  const [areas, setAreas] = useState<any[]>([]);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await api.get('areas-protegidas');
        setAreas(response.data);
      } catch (error) {
        console.error('Error al obtener áreas protegidas', error);
      }
    };
    fetchAreas();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mapa de Áreas Protegidas</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {/* Aquí se puede integrar un mapa real (Leaflet o Google Maps) */}
        {areas.map((area) => (
          <div key={area.id}>
            <p>{area.nombre} - Lat: {area.latitud} | Lon: {area.longitud}</p>
          </div>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Mapa;
