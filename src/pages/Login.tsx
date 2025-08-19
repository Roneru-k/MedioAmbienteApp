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
  IonLoading,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonIcon,
  IonText
} from '@ionic/react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { login, recuperarContraseña } from '../utils/api';
import storage from '../utils/storage';
import { 
  personOutline, 
  lockClosedOutline, 
  mailOutline,
  leafOutline,
  heartOutline
} from 'ionicons/icons';

const Login: React.FC = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [showRecuperar, setShowRecuperar] = useState(false);
  const [recuperarEmail, setRecuperarEmail] = useState('');

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
      const response = await login({ correo: email, password });
      
      const { token, usuario } = response.data;

      // Guardar token y usuario en storage local
      await storage.set('token', token);
      await storage.set('user', usuario);

      setLoading(false);
      setToastMsg('¡Bienvenido!');
      setTimeout(() => {
        history.push('/home');
      }, 1000);
    } catch (error: any) {
      setLoading(false);
      setToastMsg(
        error.response?.data?.error || 'Error al iniciar sesión. Verifica tus credenciales.'
      );
    }
  };

  const handleRecuperarContraseña = async () => {
    if (!recuperarEmail) {
      setToastMsg('Por favor ingresa tu correo electrónico');
      return;
    }

    try {
      setLoading(true);
      await recuperarContraseña({ correo: recuperarEmail });
      setLoading(false);
      setToastMsg('Se ha enviado un código de recuperación a tu correo');
      setShowRecuperar(false);
      setRecuperarEmail('');
    } catch (error: any) {
      setLoading(false);
      setToastMsg(
        error.response?.data?.error || 'Error al enviar el código de recuperación'
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
        
        {/* Logo y título */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <IonIcon 
            icon={leafOutline} 
            size="large" 
            style={{ fontSize: '4rem', color: '#4CAF50' }} 
          />
          <h1 style={{ margin: '10px 0', color: '#4CAF50' }}>
            MedioAmbienteApp
          </h1>
          <p style={{ color: '#666', margin: 0 }}>
            Ministerio de Medio Ambiente de la República Dominicana
          </p>
        </div>

        {/* Formulario de login */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={personOutline} /> Iniciar Sesión
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonItem>
              <IonLabel position="floating">
                <IonIcon icon={mailOutline} /> Correo electrónico
              </IonLabel>
              <IonInput
                type="email"
                value={email}
                onIonChange={(e) => setEmail(e.detail.value!)}
                placeholder="usuario@ejemplo.com"
              />
            </IonItem>
            
            <IonItem>
              <IonLabel position="floating">
                <IonIcon icon={lockClosedOutline} /> Contraseña
              </IonLabel>
              <IonInput
                type="password"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}
                placeholder="Ingresa tu contraseña"
              />
            </IonItem>

            <IonButton 
              expand="block" 
              className="ion-margin-top" 
              onClick={handleLogin}
              style={{ marginTop: '20px' }}
            >
              Iniciar Sesión
            </IonButton>

            {/* Botón temporal para pruebas */}
            <IonButton 
              expand="block" 
              fill="outline"
              className="ion-margin-top" 
              onClick={() => {
                // Mock login para pruebas
                storage.set('user', { nombre: 'Usuario Prueba', correo: 'test@test.com' });
                storage.set('token', 'mock-token');
                history.push('/home');
              }}
              style={{ marginTop: '10px' }}
            >
              🔧 Acceso Temporal (Pruebas)
            </IonButton>

            <div style={{ textAlign: 'center', marginTop: '15px' }}>
              <IonButton 
                onClick={() => setShowRecuperar(true)}
                style={{ fontSize: '0.9em' }}
              >
                ¿Olvidaste tu contraseña?
              </IonButton>
            </div>
          </IonCardContent>
        </IonCard>

        {/* Información adicional */}
        <IonCard>
          <IonCardContent>
            <div style={{ textAlign: 'center' }}>
              <IonIcon icon={heartOutline} style={{ color: '#4CAF50' }} />
              <IonText>
                <p style={{ margin: '10px 0', fontSize: '0.9em', color: '#666' }}>
                  Únete a nosotros en la protección del medio ambiente
                </p>
              </IonText>
            </div>
          </IonCardContent>
        </IonCard>

        {/* Modal de recuperar contraseña */}
        {showRecuperar && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <IonCard style={{ margin: '20px', maxWidth: '400px' }}>
              <IonCardHeader>
                <IonCardTitle>Recuperar Contraseña</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <p>Ingresa tu correo electrónico para recibir un enlace de recuperación:</p>
                <IonItem>
                  <IonLabel position="floating">Correo electrónico</IonLabel>
                  <IonInput
                    type="email"
                    value={recuperarEmail}
                    onIonChange={(e) => setRecuperarEmail(e.detail.value!)}
                  />
                </IonItem>
                <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                  <IonButton 
                    expand="block" 
                    onClick={handleRecuperarContraseña}
                  >
                    Enviar
                  </IonButton>
                  <IonButton 
                    expand="block" 
                    fill="outline"
                    onClick={() => setShowRecuperar(false)}
                  >
                    Cancelar
                  </IonButton>
                </div>
              </IonCardContent>
            </IonCard>
          </div>
        )}

        <IonLoading isOpen={loading} message="Procesando..." />
        <IonToast
          isOpen={!!toastMsg}
          message={toastMsg}
          duration={3000}
          onDidDismiss={() => setToastMsg('')}
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;
