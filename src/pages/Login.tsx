import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonToast,
  IonLoading,
  IonIcon,
  IonText,
  IonBackButton,
  IonButtons,
  IonGrid,
  IonRow,
  IonCol,
  IonChip
} from '@ionic/react';
import {
  personOutline,
  lockClosedOutline,
  mailOutline,
  eyeOutline,
  eyeOffOutline,
  logInOutline,
  arrowBackOutline,
  informationCircleOutline,
  shieldCheckmarkOutline
} from 'ionicons/icons';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { login } from '../utils/api';
import { useAuth } from '../contexts/AuthContext';
import './Page.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [showRecovery, setShowRecovery] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [recoveryLoading, setRecoveryLoading] = useState(false);
  
  const history = useHistory();
  const { login: authLogin } = useAuth();

  const handleLogin = async () => {
    // Validaciones
    if (!email.trim()) {
      setToastMsg('Por favor ingresa tu correo electrónico');
      return;
    }
    if (!password) {
      setToastMsg('Por favor ingresa tu contraseña');
      return;
    }

    try {
      setLoading(true);
      const response = await login({
        correo: email.trim(),
        password
      });

      // Guardar token y datos del usuario
      authLogin(response.data.token, response.data.usuario);
      
      setToastMsg('¡Inicio de sesión exitoso!');
      
      // Redirigir al inicio después de un breve delay
      setTimeout(() => {
        history.push('/');
      }, 1500);
      
    } catch (error: any) {
      console.error('Error en login:', error);
      setToastMsg(
        error.response?.data?.error || 'Error al iniciar sesión. Verifica tus credenciales.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordRecovery = async () => {
    if (!recoveryEmail.trim()) {
      setToastMsg('Por favor ingresa tu correo electrónico');
      return;
    }

    try {
      setRecoveryLoading(true);
      // Aquí iría la llamada a la API de recuperación de contraseña
      // Por ahora simulamos el proceso
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setToastMsg('Se ha enviado un enlace de recuperación a tu correo electrónico');
      setShowRecovery(false);
      setRecoveryEmail('');
      
    } catch (error: any) {
      console.error('Error en recuperación:', error);
      setToastMsg('Error al enviar el enlace de recuperación. Intenta de nuevo.');
    } finally {
      setRecoveryLoading(false);
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" icon={arrowBackOutline} />
          </IonButtons>
          <IonTitle>Iniciar Sesión</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent className="ion-padding">
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          minHeight: '80vh',
          padding: '20px 0'
        }}>
          
          {/* Logo y título */}
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <div style={{
              width: '80px',
              height: '80px',
              backgroundColor: '#4CAF50',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto',
              boxShadow: '0 4px 12px rgba(76, 175, 80, 0.3)'
            }}>
              <IonIcon 
                icon={shieldCheckmarkOutline} 
                style={{ 
                  fontSize: '40px', 
                  color: 'white' 
                }} 
              />
            </div>
            <h2 style={{ 
              margin: '0 0 8px 0', 
              color: '#333',
              fontSize: '1.8em',
              fontWeight: '600'
            }}>
              Bienvenido
            </h2>
            <p style={{ 
              margin: 0, 
              color: '#666',
              fontSize: '1em'
            }}>
              Accede a tu cuenta del Ministerio de Medio Ambiente
            </p>
          </div>

          {/* Formulario de login */}
          <IonCard style={{ 
            borderRadius: '16px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
            margin: '0 16px',
            maxWidth: '400px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            <IonCardContent style={{ padding: '32px 24px' }}>
              
              {!showRecovery ? (
                <>
                  {/* Campo de email */}
                  <div style={{ marginBottom: '20px' }}>
                    <IonLabel style={{ 
                      display: 'block',
                      marginBottom: '8px', 
                      fontWeight: '500',
                      color: '#495057',
                      fontSize: '14px'
                    }}>
                      <IonIcon icon={mailOutline} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                      Correo Electrónico *
                    </IonLabel>
                    <IonItem style={{ 
                      '--padding-start': '16px', 
                      '--padding-end': '16px',
                      '--border-radius': '12px',
                      '--background': '#f8f9fa',
                      '--border-width': '1px',
                      '--border-style': 'solid',
                      '--border-color': '#e9ecef',
                      '--min-height': '48px'
                    }}>
                      <IonInput
                        type="email"
                        value={email}
                        onIonChange={(e) => setEmail(e.detail.value!)}
                        placeholder="usuario@ejemplo.com"
                        style={{ 
                          '--padding-start': '0',
                          '--padding-end': '0',
                          fontSize: '16px'
                        }}
                      />
                    </IonItem>
                  </div>

                  {/* Campo de contraseña */}
                  <div style={{ marginBottom: '28px' }}>
                    <IonLabel style={{ 
                      display: 'block',
                      marginBottom: '8px', 
                      fontWeight: '500',
                      color: '#495057',
                      fontSize: '14px'
                    }}>
                      <IonIcon icon={lockClosedOutline} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                      Contraseña *
                    </IonLabel>
                    <IonItem style={{ 
                      '--padding-start': '16px', 
                      '--padding-end': '16px',
                      '--border-radius': '12px',
                      '--background': '#f8f9fa',
                      '--border-width': '1px',
                      '--border-style': 'solid',
                      '--border-color': '#e9ecef',
                      '--min-height': '48px'
                    }}>
                      <IonInput
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onIonChange={(e) => setPassword(e.detail.value!)}
                        placeholder="Ingresa tu contraseña"
                        style={{ 
                          '--padding-start': '0',
                          '--padding-end': '0',
                          fontSize: '16px'
                        }}
                      />
                      <IonButton
                        fill="clear"
                        slot="end"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ 
                          '--padding-start': '8px', 
                          '--padding-end': '8px',
                          '--color': '#666'
                        }}
                      >
                        <IonIcon icon={showPassword ? eyeOffOutline : eyeOutline} />
                      </IonButton>
                    </IonItem>
                  </div>

                  {/* Botón de login */}
                  <IonButton
                    expand="block"
                    onClick={handleLogin}
                    disabled={loading || !email.trim() || !password}
                    style={{ 
                      height: '52px',
                      fontSize: '16px',
                      fontWeight: '600',
                      '--border-radius': '12px',
                      marginBottom: '20px',
                      '--box-shadow': '0 4px 12px rgba(76, 175, 80, 0.3)'
                    }}
                  >
                    {loading ? (
                      <>
                        <IonIcon icon={logInOutline} slot="start" />
                        Iniciando Sesión...
                      </>
                    ) : (
                      <>
                        <IonIcon icon={logInOutline} slot="start" />
                        Iniciar Sesión
                      </>
                    )}
                  </IonButton>

                  {/* Enlace de recuperación */}
                  <div style={{ textAlign: 'center' }}>
                    <IonButton
                      fill="clear"
                      onClick={() => setShowRecovery(true)}
                      style={{ 
                        fontSize: '14px',
                        '--color': '#4CAF50',
                        fontWeight: '500',
                        '--padding-start': '8px',
                        '--padding-end': '8px'
                      }}
                    >
                      ¿Olvidaste tu contraseña?
                    </IonButton>
                  </div>
                </>
              ) : (
                <>
                  {/* Formulario de recuperación */}
                  <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <IonIcon 
                      icon={informationCircleOutline} 
                      style={{ 
                        fontSize: '48px', 
                        color: '#4CAF50',
                        marginBottom: '12px'
                      }} 
                    />
                    <h3 style={{ 
                      margin: '0 0 8px 0', 
                      color: '#333',
                      fontSize: '1.3em'
                    }}>
                      Recuperar Contraseña
                    </h3>
                    <p style={{ 
                      margin: 0, 
                      color: '#666',
                      fontSize: '0.9em',
                      lineHeight: '1.5'
                    }}>
                      Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
                    </p>
                  </div>

                  <div style={{ marginBottom: '28px' }}>
                    <IonLabel style={{ 
                      display: 'block',
                      marginBottom: '8px', 
                      fontWeight: '500',
                      color: '#495057',
                      fontSize: '14px'
                    }}>
                      <IonIcon icon={mailOutline} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                      Correo Electrónico *
                    </IonLabel>
                    <IonItem style={{ 
                      '--padding-start': '16px', 
                      '--padding-end': '16px',
                      '--border-radius': '12px',
                      '--background': '#f8f9fa',
                      '--border-width': '1px',
                      '--border-style': 'solid',
                      '--border-color': '#e9ecef',
                      '--min-height': '48px'
                    }}>
                      <IonInput
                        type="email"
                        value={recoveryEmail}
                        onIonChange={(e) => setRecoveryEmail(e.detail.value!)}
                        placeholder="usuario@ejemplo.com"
                        style={{ 
                          '--padding-start': '0',
                          '--padding-end': '0',
                          fontSize: '16px'
                        }}
                      />
                    </IonItem>
                  </div>

                  <IonButton
                    expand="block"
                    onClick={handlePasswordRecovery}
                    disabled={recoveryLoading || !validateEmail(recoveryEmail)}
                    style={{ 
                      height: '52px',
                      fontSize: '16px',
                      fontWeight: '600',
                      '--border-radius': '12px',
                      marginBottom: '20px',
                      '--box-shadow': '0 4px 12px rgba(76, 175, 80, 0.3)'
                    }}
                  >
                    {recoveryLoading ? (
                      <>
                        <IonIcon icon={mailOutline} slot="start" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <IonIcon icon={mailOutline} slot="start" />
                        Enviar Enlace de Recuperación
                      </>
                    )}
                  </IonButton>

                  <div style={{ textAlign: 'center' }}>
                    <IonButton
                      fill="clear"
                      onClick={() => setShowRecovery(false)}
                      style={{ 
                        fontSize: '14px',
                        '--color': '#666',
                        fontWeight: '500',
                        '--padding-start': '8px',
                        '--padding-end': '8px'
                      }}
                    >
                      Volver al Login
                    </IonButton>
                  </div>
                </>
              )}
            </IonCardContent>
          </IonCard>

          {/* Información adicional */}
          <div style={{ 
            textAlign: 'center', 
            marginTop: '24px',
            padding: '0 16px'
          }}>
            <IonChip color="light" style={{ marginBottom: '12px' }}>
              <IonIcon icon={shieldCheckmarkOutline} color="success" />
              <IonLabel style={{ color: '#495057' }}>
                Acceso Seguro
              </IonLabel>
            </IonChip>
            
            <p style={{ 
              margin: '0',
              fontSize: '0.85em',
              color: '#666',
              lineHeight: '1.5'
            }}>
              Tus datos están protegidos con encriptación de nivel bancario. 
              Solo personal autorizado tiene acceso a tu información.
            </p>
          </div>
        </div>

        <IonLoading isOpen={loading || recoveryLoading} message="Procesando..." />
        <IonToast
          isOpen={!!toastMsg}
          message={toastMsg}
          duration={4000}
          onDidDismiss={() => setToastMsg('')}
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;
