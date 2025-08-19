import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonButton,
  IonToast,
  IonLoading
} from '@ionic/react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import storage from '../utils/storage';

const API_BASE = 'https://adamix.net/medioambiente/';

const Login: React.FC = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  // Mantener sesión activa si ya hay usuario en storage
  useEffect(() => {
    const checkUser = async () => {
      const user = await storage.get('user');
      if (user) history.push('/home');
    };
    checkUser();
  }, [history]);

  const handleLogin = async () => {
    if (!email || !password) {
      setToastMsg('Por favor completa todos los campos');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${API_BASE}auth/login`, {
        email,
        password
      });

      const { token, user } = response.data;

      // Guardar token y usuario en storage local
      await storage.set('token', token);
      await storage.set('user', user);

      setLoading(false);
      history.push('/home');
    } catch (error: any) {
      setLoading(false);
      setToastMsg(
        error.response?.data?.message || 'Error al iniciar sesión'
      );
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login - Medio Ambiente 🌱</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="floating">Correo electrónico</IonLabel>
          <IonInput
            type="email"
            value={email}
            onIonChange={(e) => setEmail(e.detail.value!)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Contraseña</IonLabel>
          <IonInput
            type="password"
            value={password}
            onIonChange={(e) => setPassword(e.detail.value!)}
          />
        </IonItem>

        <IonButton expand="block" className="ion-margin-top" onClick={handleLogin}>
          Iniciar Sesión
        </IonButton>

        <IonLoading isOpen={loading} message="Iniciando sesión..." />
        <IonToast
          isOpen={!!toastMsg}
          message={toastMsg}
          duration={2000}
          onDidDismiss={() => setToastMsg('')}
          color="danger"
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;
