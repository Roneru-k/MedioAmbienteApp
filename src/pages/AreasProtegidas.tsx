import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonSearchbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import api from '../utils/api';

const AreasProtegidas: React.FC = () => {
  const [areas, setAreas] = useState<any[]>([]);
  const [searchText, setSearchText] = useState('');

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

  const filteredAreas = areas.filter((area) =>
    area.nombre.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Áreas Protegidas</IonTitle>
        </IonToolbar>
        <IonSearchbar
          value={searchText}
          onIonInput={(e) => setSearchText(e.detail.value!)}
          debounce={300}
        />
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          {filteredAreas.map((area) => (
            <IonItem key={area.id}>
              <IonLabel>
                <h2>{area.nombre}</h2>
                <p>{area.descripcion}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default AreasProtegidas;
