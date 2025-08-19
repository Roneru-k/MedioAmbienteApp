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
  IonSpinner,
  IonCheckbox
} from '@ionic/react';
import {
  personAddOutline,
  saveOutline,
  checkmarkCircleOutline,
  warningOutline,
  arrowBackOutline,
  eyeOutline,
  eyeOffOutline,
  informationCircleOutline,
  documentOutline,
  mailOutline,
  callOutline,
  schoolOutline,
  lockClosedOutline
} from 'ionicons/icons';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { register } from '../utils/api';
import { useAuth } from '../contexts/AuthContext';
import './Page.css';

interface RegisterForm {
  cedula: string;
  nombre: string;
  apellido: string;
  correo: string;
  password: string;
  telefono: string;
  matricula: string;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<RegisterForm>({
    cedula: '',
    nombre: '',
    apellido: '',
    correo: '',
    password: '',
    telefono: '',
    matricula: ''
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertHeader, setAlertHeader] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const history = useHistory();
  const { login } = useAuth();

  // Validar formulario
  const validateForm = () => {
    // Validar cédula (formato dominicano)
    const cedulaRegex = /^\d{11}$/;
    if (!cedulaRegex.test(formData.cedula)) {
      setAlertMessage('La cédula debe tener exactamente 11 dígitos numéricos.');
      setAlertHeader('Cédula inválida');
      setShowAlert(true);
      return false;
    }

    // Validar nombre
    if (!formData.nombre.trim()) {
      setAlertMessage('Por favor ingresa tu nombre.');
      setAlertHeader('Nombre requerido');
      setShowAlert(true);
      return false;
    }

    // Validar apellido
    if (!formData.apellido.trim()) {
      setAlertMessage('Por favor ingresa tu apellido.');
      setAlertHeader('Apellido requerido');
      setShowAlert(true);
      return false;
    }

    // Validar correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.correo)) {
      setAlertMessage('Por favor ingresa un correo electrónico válido.');
      setAlertHeader('Correo inválido');
      setShowAlert(true);
      return false;
    }

    // Validar contraseña
    if (formData.password.length < 6) {
      setAlertMessage('La contraseña debe tener al menos 6 caracteres.');
      setAlertHeader('Contraseña muy corta');
      setShowAlert(true);
      return false;
    }

    // Validar confirmación de contraseña
    if (formData.password !== confirmPassword) {
      setAlertMessage('Las contraseñas no coinciden.');
      setAlertHeader('Contraseñas no coinciden');
      setShowAlert(true);
      return false;
    }

    // Validar teléfono (formato dominicano)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.telefono.replace(/\D/g, ''))) {
      setAlertMessage('El teléfono debe tener 10 dígitos numéricos.');
      setAlertHeader('Teléfono inválido');
      setShowAlert(true);
      return false;
    }

    // Validar matrícula
    if (!formData.matricula.trim()) {
      setAlertMessage('Por favor ingresa tu número de matrícula.');
      setAlertHeader('Matrícula requerida');
      setShowAlert(true);
      return false;
    }

    // Validar términos y condiciones
    if (!acceptTerms) {
      setAlertMessage('Debes aceptar los términos y condiciones para continuar.');
      setAlertHeader('Términos requeridos');
      setShowAlert(true);
      return false;
    }

    return true;
  };

  // Registrar usuario
  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      
      const response = await register({
        cedula: formData.cedula,
        nombre: formData.nombre.trim(),
        apellido: formData.apellido.trim(),
        correo: formData.correo.trim(),
        password: formData.password,
        telefono: formData.telefono,
        matricula: formData.matricula.trim()
      });

      if (response.status === 201) {
        const { token, usuario } = response.data;
        
        // Iniciar sesión automáticamente
        await login(token, usuario);
        
        setToastMsg('¡Registro exitoso! Bienvenido a la aplicación.');
        
        // Redirigir al home después de un delay
        setTimeout(() => {
          history.push('/home');
        }, 2000);
      }

    } catch (error: any) {
      console.error('Error al registrar:', error);
      
      if (error.response?.status === 400) {
        setToastMsg('Datos inválidos. Verifica la información ingresada.');
      } else if (error.response?.status === 409) {
        setToastMsg('El usuario ya existe. Intenta con otro correo o cédula.');
      } else if (error.response?.data?.error) {
        setToastMsg(error.response.data.error);
      } else if (error.message === 'Network Error') {
        setToastMsg('Error de conexión. Verifica tu conexión a internet.');
      } else {
        setToastMsg('Error al registrar. Intenta de nuevo.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Formatear teléfono mientras se escribe
  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 10) {
      return cleaned;
    }
    return cleaned.substring(0, 10);
  };

  // Formatear cédula mientras se escribe
  const formatCedula = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 11) {
      return cleaned;
    }
    return cleaned.substring(0, 11);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/login" icon={arrowBackOutline} />
          </IonButtons>
          <IonTitle>Registro 👤</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {/* Información inicial */}
        <IonCard style={{ marginBottom: '20px' }}>
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={informationCircleOutline} color="primary" /> Información Importante
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p style={{ margin: '0 0 12px 0', color: '#666', lineHeight: '1.5' }}>
              <strong>Completa el formulario con tus datos personales para crear tu cuenta.</strong>
            </p>
            <p style={{ margin: '0', color: '#666', lineHeight: '1.5', fontSize: '0.9em' }}>
              • Todos los campos son obligatorios<br/>
              • La cédula debe tener 11 dígitos<br/>
              • El teléfono debe tener 10 dígitos<br/>
              • La contraseña debe tener al menos 6 caracteres
            </p>
          </IonCardContent>
        </IonCard>

        {/* Formulario de registro */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={personAddOutline} /> Datos Personales
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                <IonCol size="12" sizeMd="6">
                  <IonItem style={{ marginBottom: '16px', '--padding-start': '0', '--padding-end': '0' }}>
                    <IonLabel position="floating" style={{ marginBottom: '8px', fontWeight: '500' }}>
                      <IonIcon icon={documentOutline} style={{ marginRight: '4px' }} />
                      Cédula *
                    </IonLabel>
                    <IonInput
                      value={formData.cedula}
                      onIonChange={(e) => {
                        const formatted = formatCedula(e.detail.value!);
                        setFormData(prev => ({ ...prev, cedula: formatted }));
                      }}
                      placeholder="00100000000"
                      type="number"
                      maxlength={11}
                      style={{ marginTop: '4px' }}
                    />
                  </IonItem>
                  <IonNote style={{ fontSize: '0.8em', color: '#666', marginBottom: '16px' }}>
                    11 dígitos sin guiones
                  </IonNote>
                </IonCol>
                <IonCol size="12" sizeMd="6">
                  <IonItem style={{ marginBottom: '16px', '--padding-start': '0', '--padding-end': '0' }}>
                    <IonLabel position="floating" style={{ marginBottom: '8px', fontWeight: '500' }}>
                      <IonIcon icon={schoolOutline} style={{ marginRight: '4px' }} />
                      Matrícula *
                    </IonLabel>
                    <IonInput
                      value={formData.matricula}
                      onIonChange={(e) => setFormData(prev => ({ ...prev, matricula: e.detail.value! }))}
                      placeholder="2021-0123"
                      maxlength={20}
                      style={{ marginTop: '4px' }}
                    />
                  </IonItem>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="12" sizeMd="6">
                  <IonItem style={{ marginBottom: '16px', '--padding-start': '0', '--padding-end': '0' }}>
                    <IonLabel position="floating" style={{ marginBottom: '8px', fontWeight: '500' }}>
                      <IonIcon icon={personAddOutline} style={{ marginRight: '4px' }} />
                      Nombre *
                    </IonLabel>
                    <IonInput
                      value={formData.nombre}
                      onIonChange={(e) => setFormData(prev => ({ ...prev, nombre: e.detail.value! }))}
                      placeholder="Tu nombre"
                      maxlength={50}
                      style={{ marginTop: '4px' }}
                    />
                  </IonItem>
                </IonCol>
                <IonCol size="12" sizeMd="6">
                  <IonItem style={{ marginBottom: '16px', '--padding-start': '0', '--padding-end': '0' }}>
                    <IonLabel position="floating" style={{ marginBottom: '8px', fontWeight: '500' }}>
                      <IonIcon icon={personAddOutline} style={{ marginRight: '4px' }} />
                      Apellido *
                    </IonLabel>
                    <IonInput
                      value={formData.apellido}
                      onIonChange={(e) => setFormData(prev => ({ ...prev, apellido: e.detail.value! }))}
                      placeholder="Tu apellido"
                      maxlength={50}
                      style={{ marginTop: '4px' }}
                    />
                  </IonItem>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="12">
                  <IonItem style={{ marginBottom: '16px', '--padding-start': '0', '--padding-end': '0' }}>
                    <IonLabel position="floating" style={{ marginBottom: '8px', fontWeight: '500' }}>
                      <IonIcon icon={mailOutline} style={{ marginRight: '4px' }} />
                      Correo Electrónico *
                    </IonLabel>
                    <IonInput
                      value={formData.correo}
                      onIonChange={(e) => setFormData(prev => ({ ...prev, correo: e.detail.value! }))}
                      placeholder="tu@email.com"
                      type="email"
                      maxlength={100}
                      style={{ marginTop: '4px' }}
                    />
                  </IonItem>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="12">
                  <IonItem style={{ marginBottom: '16px', '--padding-start': '0', '--padding-end': '0' }}>
                    <IonLabel position="floating" style={{ marginBottom: '8px', fontWeight: '500' }}>
                      <IonIcon icon={callOutline} style={{ marginRight: '4px' }} />
                      Teléfono *
                    </IonLabel>
                    <IonInput
                      value={formData.telefono}
                      onIonChange={(e) => {
                        const formatted = formatPhoneNumber(e.detail.value!);
                        setFormData(prev => ({ ...prev, telefono: formatted }));
                      }}
                      placeholder="8095551234"
                      type="tel"
                      maxlength={10}
                      style={{ marginTop: '4px' }}
                    />
                  </IonItem>
                  <IonNote style={{ fontSize: '0.8em', color: '#666', marginBottom: '16px' }}>
                    10 dígitos sin guiones ni espacios
                  </IonNote>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="12" sizeMd="6">
                  <IonItem style={{ marginBottom: '16px', '--padding-start': '0', '--padding-end': '0' }}>
                    <IonLabel position="floating" style={{ marginBottom: '8px', fontWeight: '500' }}>
                      <IonIcon icon={lockClosedOutline} style={{ marginRight: '4px' }} />
                      Contraseña *
                    </IonLabel>
                    <IonInput
                      value={formData.password}
                      onIonChange={(e) => setFormData(prev => ({ ...prev, password: e.detail.value! }))}
                      placeholder="Tu contraseña"
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
                      value={confirmPassword}
                      onIonChange={(e) => setConfirmPassword(e.detail.value!)}
                      placeholder="Confirma tu contraseña"
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
              
              {/* Términos y condiciones */}
              <IonRow>
                <IonCol size="12">
                  <IonItem style={{ marginBottom: '24px', '--padding-start': '0', '--padding-end': '0' }}>
                    <IonCheckbox
                      checked={acceptTerms}
                      onIonChange={(e) => setAcceptTerms(e.detail.checked)}
                      slot="start"
                    />
                    <IonLabel style={{ fontSize: '0.9em', lineHeight: '1.4' }}>
                      Acepto los <IonText color="primary" style={{ cursor: 'pointer' }}>términos y condiciones</IonText> y la{' '}
                      <IonText color="primary" style={{ cursor: 'pointer' }}>política de privacidad</IonText> *
                    </IonLabel>
                  </IonItem>
                </IonCol>
              </IonRow>

              <IonRow>
                <IonCol size="12">
                  <IonButton
                    expand="block"
                    onClick={handleRegister}
                    disabled={loading || !formData.cedula || !formData.nombre || !formData.apellido || !formData.correo || !formData.password || !formData.telefono || !formData.matricula || !confirmPassword || !acceptTerms}
                    style={{
                      height: '52px',
                      fontSize: '16px',
                      fontWeight: '600',
                      '--border-radius': '12px',
                      marginTop: '16px'
                    }}
                  >
                    {loading ? (
                      <>
                        <IonSpinner name="crescent" slot="start" />
                        Registrando...
                      </>
                    ) : (
                      <>
                        <IonIcon icon={saveOutline} slot="start" />
                        Crear Cuenta
                      </>
                    )}
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>

        {/* Información adicional */}
        <IonCard style={{ marginTop: '20px' }}>
          <IonCardContent>
            <div style={{ 
              display: 'flex', 
              alignItems: 'flex-start', 
              gap: '12px',
              padding: '12px',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px',
              border: '1px solid #e9ecef'
            }}>
              <IonIcon 
                icon={informationCircleOutline} 
                style={{ 
                  fontSize: '20px', 
                  color: '#007bff',
                  marginTop: '2px'
                }} 
              />
              <div>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '0.9em', fontWeight: '600', color: '#333' }}>
                  ¿Ya tienes una cuenta?
                </h4>
                <p style={{ margin: '0 0 12px 0', fontSize: '0.85em', lineHeight: '1.4', color: '#666' }}>
                  Si ya tienes una cuenta, puedes iniciar sesión con tu correo y contraseña.
                </p>
                <IonButton
                  fill="outline"
                  size="small"
                  onClick={() => history.push('/login')}
                >
                  Ir al Login
                </IonButton>
              </div>
            </div>
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

export default Register;
