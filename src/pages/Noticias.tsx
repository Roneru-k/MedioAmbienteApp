import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel } from '@ionic/react';
import { useEffect, useState } from 'react';
import api from '../utils/api';

const Noticias: React.FC = () => {
  const [noticias, setNoticias] = useState<any[]>([]);

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const response = await api.get('noticias');
        setNoticias(response.data);
      } catch (error) {
        console.error('Error al obtener noticias', error);
      }
    };

    fetchNoticias();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Noticias Ambientales</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          {noticias.map((noticia) => (
            <IonItem key={noticia.id}>
              <IonLabel>{noticia.titulo}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Noticias;
