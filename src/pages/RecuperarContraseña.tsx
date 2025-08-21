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
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonIcon,
  IonToast,
  IonLoading,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonNote,
  IonAlert,
  IonBackButton,
  IonButtons,
  IonSpinner
} from '@ionic/react';
import {
  mailOutline,
  keyOutline,
  checkmarkCircleOutline,
  arrowBackOutline,
  eyeOutline,
  eyeOffOutline,
  informationCircleOutline,
  lockClosedOutline,
  shieldCheckmarkOutline,
  refreshOutline,
  copyOutline
} from 'ionicons/icons';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { recuperarContraseña, cambiarContraseña } from '../utils/api';
import './Page.css';

interface RecoveryForm {
  correo: string;
  codigo: string;
  nueva_password: string;
  confirmar_password: string;
}

const RecuperarContraseña: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<RecoveryForm>({
    correo: '',
    codigo: '',
    nueva_password: '',
    confirmar_password: ''
  });
  const [loading, setLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertHeader, setAlertHeader] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [codigoEnviado, setCodigoEnviado] = useState(false);
  const [codigoRecibido, setCodigoRecibido] = useState('');

  const history = useHistory();

  // Validar email
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validar código
  const validateCode = (code: string) => {
    return code.length >= 4;
  };

  // Validar contraseña
  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  // Enviar código de recuperación
  const handleSendCode = async () => {
    if (!formData.correo.trim()) {
      setToastMsg('Por favor ingresa tu correo electrónico');
      return;
    }

    if (!validateEmail(formData.correo)) {
      setToastMsg('Por favor ingresa un correo electrónico válido');
      return;
    }

    try {
      setLoading(true);
      
      const response = await recuperarContraseña({
        correo: formData.correo.trim()
      });

      if (response.status === 200) {
        const { mensaje, codigo } = response.data;
        
        setCodigoRecibido(codigo);
        setToastMsg('Código enviado exitosamente');
        setCodigoEnviado(true);
        setCurrentStep(2);
      }
      
    } catch (error: any) {
      console.error('Error al enviar código:', error);
      
      if (error.response?.status === 400) {
        setToastMsg('Correo electrónico inválido. Verifica la información.');
      } else if (error.response?.status === 404) {
        setToastMsg('No se encontró una cuenta con este correo electrónico.');
      } else if (error.response?.data?.error) {
        setToastMsg(error.response.data.error);
      } else if (error.message === 'Network Error') {
        setToastMsg('Error de conexión. Verifica tu conexión a internet.');
      } else {
        setToastMsg('Error al enviar el código. Intenta de nuevo.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Verificar código y cambiar contraseña
  const handleChangePassword = async () => {
    // Validar código
    if (!formData.codigo.trim()) {
      setAlertMessage('Por favor ingresa el código de verificación.');
      setAlertHeader('Código requerido');
      setShowAlert(true);
      return;
    }

    if (!validateCode(formData.codigo)) {
      setAlertMessage('El código debe tener al menos 4 caracteres.');
      setAlertHeader('Código inválido');
      setShowAlert(true);
      return;
    }

    // Validar contraseña
    if (!validatePassword(formData.nueva_password)) {
      setAlertMessage('La contraseña debe tener al menos 6 caracteres.');
      setAlertHeader('Contraseña muy corta');
      setShowAlert(true);
      return;
    }

    // Validar confirmación
    if (formData.nueva_password !== formData.confirmar_password) {
      setAlertMessage('Las contraseñas no coinciden.');
      setAlertHeader('Contraseñas no coinciden');
      setShowAlert(true);
      return;
    }

    try {
      setLoading(true);
      
      const response = await cambiarContraseña({
        correo: formData.correo.trim(),
        codigo: formData.codigo.trim(),
        nueva_password: formData.nueva_password
      });

      if (response.status === 200) {
        setToastMsg('¡Contraseña cambiada exitosamente! Ya puedes iniciar sesión.');
        setCurrentStep(3);
        
        // Redirigir al login después de un delay
        setTimeout(() => {
          history.push('/login');
        }, 3000);
      }
      
    } catch (error: any) {
      console.error('Error al cambiar contraseña:', error);
      
      if (error.response?.status === 400) {
        setToastMsg('Datos inválidos. Verifica el código y la contraseña.');
      } else if (error.response?.status === 404) {
        setToastMsg('Código inválido o expirado.');
      } else if (error.response?.data?.error) {
        setToastMsg(error.response.data.error);
      } else if (error.message === 'Network Error') {
        setToastMsg('Error de conexión. Verifica tu conexión a internet.');
      } else {
        setToastMsg('Error al cambiar la contraseña. Intenta de nuevo.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Reenviar código
  const handleResendCode = async () => {
    try {
      setLoading(true);
      
      const response = await recuperarContraseña({
        correo: formData.correo.trim()
      });

      if (response.status === 200) {
        const { codigo } = response.data;
        setCodigoRecibido(codigo);
        setToastMsg('Nuevo código enviado exitosamente');
      }
      
    } catch (error: any) {
      console.error('Error al reenviar código:', error);
      setToastMsg('Error al reenviar el código. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  // Copiar código al portapapeles
  const copiarCodigo = async () => {
    try {
      await navigator.clipboard.writeText(codigoRecibido);
      setToastMsg('Código copiado al portapapeles');
    } catch (error) {
      console.error('Error al copiar código:', error);
      setToastMsg('No se pudo copiar el código automáticamente');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/login" icon={arrowBackOutline} />
          </IonButtons>
          <IonTitle>Recuperar Contraseña 🔐</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {/* Información inicial */}
        <IonCard style={{ marginBottom: '20px' }}>
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={informationCircleOutline} color="primary" /> Proceso de Recuperación
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p style={{ margin: '0 0 12px 0', color: '#666', lineHeight: '1.5' }}>
              <strong>Sigue estos pasos para recuperar tu contraseña:</strong>
            </p>
            <p style={{ margin: '0', color: '#666', lineHeight: '1.5', fontSize: '0.9em' }}>
              1. Ingresa tu correo electrónico<br/>
              2. Recibe y verifica el código<br/>
              3. Establece tu nueva contraseña
            </p>
          </IonCardContent>
        </IonCard>

        {/* Indicador de pasos personalizado */}
        <IonCard style={{ marginBottom: '20px' }}>
          <IonCardContent>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              padding: '16px 0'
            }}>
              {/* Paso 1 */}
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                flex: 1
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: currentStep >= 1 ? '#4CAF50' : '#e9ecef',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '8px',
                  color: currentStep >= 1 ? 'white' : '#666'
                }}>
                  <IonIcon 
                    icon={currentStep >= 1 ? checkmarkCircleOutline : mailOutline} 
                    style={{ fontSize: '20px' }}
                  />
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ 
                    fontSize: '12px', 
                    fontWeight: '600',
                    color: currentStep >= 1 ? '#4CAF50' : '#666',
                    marginBottom: '2px'
                  }}>
                    Enviar Código
                  </div>
                  <div style={{ 
                    fontSize: '10px', 
                    color: '#999'
                  }}>
                    Ingresa tu correo
                  </div>
                </div>
              </div>

              {/* Línea conectora */}
              <div style={{ 
                flex: 1, 
                height: '2px', 
                backgroundColor: currentStep >= 2 ? '#4CAF50' : '#e9ecef',
                margin: '0 8px',
                marginTop: '-20px'
              }} />

              {/* Paso 2 */}
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                flex: 1
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: currentStep >= 2 ? '#4CAF50' : '#e9ecef',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '8px',
                  color: currentStep >= 2 ? 'white' : '#666'
                }}>
                  <IonIcon 
                    icon={currentStep >= 2 ? checkmarkCircleOutline : keyOutline} 
                    style={{ fontSize: '20px' }}
                  />
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ 
                    fontSize: '12px', 
                    fontWeight: '600',
                    color: currentStep >= 2 ? '#4CAF50' : '#666',
                    marginBottom: '2px'
                  }}>
                    Verificar
                  </div>
                  <div style={{ 
                    fontSize: '10px', 
                    color: '#999'
                  }}>
                    Ingresa el código
                  </div>
                </div>
              </div>

              {/* Línea conectora */}
              <div style={{ 
                flex: 1, 
                height: '2px', 
                backgroundColor: currentStep >= 3 ? '#4CAF50' : '#e9ecef',
                margin: '0 8px',
                marginTop: '-20px'
              }} />

              {/* Paso 3 */}
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                flex: 1
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: currentStep >= 3 ? '#4CAF50' : '#e9ecef',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '8px',
                  color: currentStep >= 3 ? 'white' : '#666'
                }}>
                  <IonIcon 
                    icon={currentStep >= 3 ? checkmarkCircleOutline : lockClosedOutline} 
                    style={{ fontSize: '20px' }}
                  />
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ 
                    fontSize: '12px', 
                    fontWeight: '600',
                    color: currentStep >= 3 ? '#4CAF50' : '#666',
                    marginBottom: '2px'
                  }}>
                    Completado
                  </div>
                  <div style={{ 
                    fontSize: '10px', 
                    color: '#999'
                  }}>
                    Contraseña cambiada
                  </div>
                </div>
              </div>
            </div>
          </IonCardContent>
        </IonCard>

        {/* Formulario de recuperación */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={shieldCheckmarkOutline} /> Recuperación de Contraseña
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonGrid>
              {/* Paso 1: Enviar código */}
              {currentStep === 1 && (
                <>
                  <IonRow>
                    <IonCol size="12">
                      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                        <IonIcon 
                          icon={mailOutline} 
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
                          Enviar Código de Verificación
                        </h3>
                        <p style={{ 
                          margin: 0, 
                          color: '#666',
                          fontSize: '0.9em',
                          lineHeight: '1.5'
                        }}>
                          Ingresa tu correo electrónico para recibir un código de verificación.
                        </p>
                      </div>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol size="12">
                      <IonItem style={{ marginBottom: '24px', '--padding-start': '0', '--padding-end': '0' }}>
                        <IonLabel position="floating" style={{ marginBottom: '8px', fontWeight: '500' }}>
                          <IonIcon icon={mailOutline} style={{ marginRight: '4px' }} />
                          Correo Electrónico *
                        </IonLabel>
                        <IonInput
                          value={formData.correo}
                          onIonChange={(e) => setFormData(prev => ({ ...prev, correo: e.detail.value! }))}
                          placeholder="usuario@ejemplo.com"
                          type="email"
                          style={{ marginTop: '4px' }}
                        />
                      </IonItem>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol size="12">
                      <IonButton
                        expand="block"
                        onClick={handleSendCode}
                        disabled={loading || !validateEmail(formData.correo)}
                        style={{
                          height: '52px',
                          fontSize: '16px',
                          fontWeight: '600',
                          '--border-radius': '12px'
                        }}
                      >
                        {loading ? (
                          <>
                            <IonSpinner name="crescent" slot="start" />
                            Enviando...
                          </>
                        ) : (
                          <>
                            <IonIcon icon={mailOutline} slot="start" />
                            Enviar Código
                          </>
                        )}
                      </IonButton>
                    </IonCol>
                  </IonRow>
                </>
              )}

              {/* Paso 2: Verificar código y cambiar contraseña */}
              {currentStep === 2 && (
                <>
                  <IonRow>
                    <IonCol size="12">
                      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                        <IonIcon 
                          icon={keyOutline} 
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
                          Verificar Código y Cambiar Contraseña
                        </h3>
                        <p style={{ 
                          margin: 0, 
                          color: '#666',
                          fontSize: '0.9em',
                          lineHeight: '1.5'
                        }}>
                          Ingresa el código recibido y tu nueva contraseña.
                        </p>
                      </div>
                    </IonCol>
                  </IonRow>
                  
                  <IonRow>
                    <IonCol size="12">
                      <div style={{ 
                        backgroundColor: '#e8f5e8', 
                        padding: '12px', 
                        borderRadius: '8px',
                        marginBottom: '16px',
                        border: '1px solid #4CAF50'
                      }}>
                        <p style={{ margin: '0', fontSize: '0.9em', color: '#2e7d32' }}>
                          <IonIcon icon={checkmarkCircleOutline} style={{ marginRight: '4px' }} />
                          <strong>Paso 2:</strong> Se ha generado un código de verificación para <strong>{formData.correo}</strong>. 
                          Copia el código y pégalo en el campo de abajo:
                        </p>
                      </div>
                      
                      <div style={{ 
                        fontSize: '24px', 
                        fontWeight: 'bold', 
                        color: '#856404',
                        letterSpacing: '4px', 
                        fontFamily: 'monospace',
                        backgroundColor: '#fff',
                        padding: '12px',
                        borderRadius: '6px',
                        border: '2px dashed #ffc107',
                        position: 'relative',
                        textAlign: 'center',
                        marginBottom: '16px'
                      }}>
                        {codigoRecibido}
                        <IonButton
                          fill="clear"
                          size="small"
                          onClick={copiarCodigo}
                          style={{
                            position: 'absolute',
                            top: '4px',
                            right: '4px',
                            '--padding-start': '4px',
                            '--padding-end': '4px',
                            minHeight: '24px',
                            height: '24px'
                          }}
                        >
                          <IonIcon icon={copyOutline} style={{ fontSize: '16px' }} />
                        </IonButton>
                      </div>
                      
                      <IonItem style={{ marginBottom: '16px', '--padding-start': '0', '--padding-end': '0' }}>
                        <IonLabel position="floating" style={{ marginBottom: '8px', fontWeight: '500' }}>
                          <IonIcon icon={keyOutline} style={{ marginRight: '4px' }} />
                          Código de Verificación *
                        </IonLabel>
                        <IonInput
                          value={formData.codigo}
                          onIonChange={(e) => setFormData(prev => ({ ...prev, codigo: e.detail.value! }))}
                          placeholder="Pega el código aquí"
                          maxlength={10}
                          style={{ marginTop: '4px' }}
                        />
                      </IonItem>
                      <IonNote style={{ fontSize: '0.8em', color: '#666', marginBottom: '16px' }}>
                        Código enviado a: {formData.correo}
                      </IonNote>
                    </IonCol>
                  </IonRow>

                  <IonRow>
                    <IonCol size="12" sizeMd="6">
                      <IonItem style={{ marginBottom: '16px', '--padding-start': '0', '--padding-end': '0' }}>
                        <IonLabel position="floating" style={{ marginBottom: '8px', fontWeight: '500' }}>
                          <IonIcon icon={lockClosedOutline} style={{ marginRight: '4px' }} />
                          Nueva Contraseña *
                        </IonLabel>
                        <IonInput
                          value={formData.nueva_password}
                          onIonChange={(e) => setFormData(prev => ({ ...prev, nueva_password: e.detail.value! }))}
                          placeholder="Nueva contraseña"
                          type={showPassword ? 'text' : 'password'}
                          style={{ marginTop: '4px' }}
                        />
                        <IonButton
                          fill="clear"
                          slot="end"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          <IonIcon icon={showPassword ? eyeOffOutline : eyeOutline} />
                        </IonButton>
                      </IonItem>
                      <IonNote style={{ fontSize: '0.8em', color: '#666', marginBottom: '16px' }}>
                        Mínimo 6 caracteres
                      </IonNote>
                    </IonCol>
                    <IonCol size="12" sizeMd="6">
                      <IonItem style={{ marginBottom: '16px', '--padding-start': '0', '--padding-end': '0' }}>
                        <IonLabel position="floating" style={{ marginBottom: '8px', fontWeight: '500' }}>
                          <IonIcon icon={lockClosedOutline} style={{ marginRight: '4px' }} />
                          Confirmar Contraseña *
                        </IonLabel>
                        <IonInput
                          value={formData.confirmar_password}
                          onIonChange={(e) => setFormData(prev => ({ ...prev, confirmar_password: e.detail.value! }))}
                          placeholder="Confirma la contraseña"
                          type={showConfirmPassword ? 'text' : 'password'}
                          style={{ marginTop: '4px' }}
                        />
                        <IonButton
                          fill="clear"
                          slot="end"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          <IonIcon icon={showConfirmPassword ? eyeOffOutline : eyeOutline} />
                        </IonButton>
                      </IonItem>
                    </IonCol>
                  </IonRow>

                  <IonRow>
                    <IonCol size="12">
                      <IonButton
                        expand="block"
                        onClick={handleChangePassword}
                        disabled={loading || !formData.codigo || !formData.nueva_password || !formData.confirmar_password}
                        style={{
                          height: '52px',
                          fontSize: '16px',
                          fontWeight: '600',
                          '--border-radius': '12px',
                          marginBottom: '16px'
                        }}
                      >
                        {loading ? (
                          <>
                            <IonSpinner name="crescent" slot="start" />
                            Cambiando Contraseña...
                          </>
                        ) : (
                          <>
                            <IonIcon icon={lockClosedOutline} slot="start" />
                            Cambiar Contraseña
                          </>
                        )}
                      </IonButton>
                    </IonCol>
                  </IonRow>

                  <IonRow>
                    <IonCol size="12">
                      <div style={{ textAlign: 'center' }}>
                        <IonButton
                          fill="clear"
                          onClick={handleResendCode}
                          disabled={loading}
                          style={{ 
                            fontSize: '14px',
                            '--color': '#4CAF50',
                            fontWeight: '500'
                          }}
                        >
                          <IonIcon icon={refreshOutline} slot="start" />
                          Reenviar Código
                        </IonButton>
                      </div>
                    </IonCol>
                  </IonRow>
                </>
              )}

              {/* Paso 3: Completado */}
              {currentStep === 3 && (
                <>
                  <IonRow>
                    <IonCol size="12">
                      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                        <IonIcon 
                          icon={checkmarkCircleOutline} 
                          style={{ 
                            fontSize: '64px', 
                            color: '#4CAF50',
                            marginBottom: '16px'
                          }} 
                        />
                        <h3 style={{ 
                          margin: '0 0 12px 0', 
                          color: '#333',
                          fontSize: '1.5em'
                        }}>
                          ¡Contraseña Cambiada Exitosamente!
                        </h3>
                        <p style={{ 
                          margin: '0 0 24px 0', 
                          color: '#666',
                          fontSize: '1em',
                          lineHeight: '1.5'
                        }}>
                          Tu contraseña ha sido actualizada. Ya puedes iniciar sesión con tu nueva contraseña.
                        </p>
                        <IonButton
                          expand="block"
                          onClick={() => history.push('/login')}
                          style={{
                            height: '52px',
                            fontSize: '16px',
                            fontWeight: '600',
                            '--border-radius': '12px'
                          }}
                        >
                          <IonIcon icon={mailOutline} slot="start" />
                          Ir al Login
                        </IonButton>
                      </div>
                    </IonCol>
                  </IonRow>
                </>
              )}
            </IonGrid>
          </IonCardContent>
        </IonCard>

        {/* Alert para validaciones */}
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={alertHeader}
          message={alertMessage}
          buttons={['OK']}
        />

        {/* Toast para mensajes */}
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

export default RecuperarContraseña;
