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
  IonButton
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import storage from '../utils/storage';
import { useEffect, useState } from 'react';

const Home: React.FC = () => {
  const history = useHistory();
  const [userName, setUserName] = useState<string | null>('');

  useEffect(() => {
    // Obtener usuario del storage
    const loadUser = async () => {
      const user = await storage.get('user');
      if (!user) {
        history.push('/login'); // si no hay usuario, ir al login
      } else {
        setUserName(user.nombre || user.email || 'Usuario');
      }
    };
    loadUser();
  }, [history]);

  const handleLogout = async () => {
    await storage.clear(); // limpiar storage
    history.push('/login');   // redirigir al login
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Bienvenido 🌱</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Hola, {userName}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            Esta es la página de inicio de la app del Ministerio de Medio Ambiente.
            Aquí podrás navegar a todas las secciones después de iniciar sesión.
          </IonCardContent>
        </IonCard>

        <IonButton expand="block" color="danger" onClick={handleLogout}>
          Cerrar Sesión
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
