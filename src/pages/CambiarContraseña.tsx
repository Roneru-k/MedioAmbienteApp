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
  IonSegment,
  IonSegmentButton,
  IonNote,
  IonAlert,
  IonBackButton,
  IonButtons,
  IonSpinner
} from '@ionic/react';
import {
  personOutline,
  lockClosedOutline,
  saveOutline,
  checkmarkCircleOutline,
  warningOutline,
  arrowBackOutline,
  eyeOutline,
  eyeOffOutline,
  informationCircleOutline,
  refreshOutline,
  closeOutline,
  copyOutline
} from 'ionicons/icons';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { updatePerfil, cambiarContraseñaUsuarioRobusto, completarCambioContraseña } from '../utils/api';
import { useAuth } from '../contexts/AuthContext';
import './Page.css';

interface PerfilForm {
  nombre: string;
  apellido: string;
  telefono: string;
}

interface PasswordForm {
  password_actual: string;
  nueva_password: string;
  confirmar_password: string;
  codigo_verificacion?: string;
}

const CambiarContraseña: React.FC = () => {
  const [activeSegment, setActiveSegment] = useState<'perfil' | 'password'>('perfil');
  const [perfilData, setPerfilData] = useState<PerfilForm>({
    nombre: '',
    apellido: '',
    telefono: ''
  });
  const [passwordData, setPasswordData] = useState<PasswordForm>({
    password_actual: '',
    nueva_password: '',
    confirmar_password: '',
    codigo_verificacion: ''
  });
  const [loading, setLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertHeader, setAlertHeader] = useState('');
  const [showPassword, setShowPassword] = useState({
    actual: false,
    nueva: false,
    confirmar: false
  });
  const [requiereCodigo, setRequiereCodigo] = useState(false);
  const [correoUsuario, setCorreoUsuario] = useState('');
  const [codigoRecibido, setCodigoRecibido] = useState('');

  const history = useHistory();
  const { user, updateUser } = useAuth();

  // Cargar datos del usuario al iniciar
  useEffect(() => {
    if (user) {
      setPerfilData({
        nombre: user.nombre || '',
        apellido: user.apellido || '',
        telefono: user.telefono || ''
      });
    }
  }, [user]);

  // Validar formulario de perfil
  const validatePerfilForm = () => {
    if (!perfilData.nombre.trim()) {
      setAlertMessage('Por favor ingresa tu nombre.');
      setAlertHeader('Nombre requerido');
      setShowAlert(true);
      return false;
    }
    if (!perfilData.apellido.trim()) {
      setAlertMessage('Por favor ingresa tu apellido.');
      setAlertHeader('Apellido requerido');
      setShowAlert(true);
      return false;
    }
    if (!perfilData.telefono.trim()) {
      setAlertMessage('Por favor ingresa tu número de teléfono.');
      setAlertHeader('Teléfono requerido');
      setShowAlert(true);
      return false;
    }
    
    // Validar formato de teléfono (formato dominicano)
    const phoneRegex = /^(\+1|1)?[-.\s]?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/;
    if (!phoneRegex.test(perfilData.telefono.replace(/\s/g, ''))) {
      setAlertMessage('Por favor ingresa un número de teléfono válido.');
      setAlertHeader('Teléfono inválido');
      setShowAlert(true);
      return false;
    }
    
    return true;
  };

  // Validar formulario de contraseña
  const validatePasswordForm = () => {
    if (!requiereCodigo) {
      // Validación inicial (sin código)
      if (!passwordData.password_actual.trim()) {
        setAlertMessage('Por favor ingresa tu contraseña actual.');
        setAlertHeader('Contraseña actual requerida');
        setShowAlert(true);
        return false;
      }
      if (!passwordData.nueva_password.trim()) {
        setAlertMessage('Por favor ingresa tu nueva contraseña.');
        setAlertHeader('Nueva contraseña requerida');
        setShowAlert(true);
        return false;
      }
      if (passwordData.nueva_password.length < 6) {
        setAlertMessage('La nueva contraseña debe tener al menos 6 caracteres.');
        setAlertHeader('Contraseña muy corta');
        setShowAlert(true);
        return false;
      }
      if (passwordData.nueva_password === passwordData.password_actual) {
        setAlertMessage('La nueva contraseña debe ser diferente a la actual.');
        setAlertHeader('Contraseña inválida');
        setShowAlert(true);
        return false;
      }
      if (passwordData.nueva_password !== passwordData.confirmar_password) {
        setAlertMessage('Las contraseñas no coinciden.');
        setAlertHeader('Contraseñas no coinciden');
        setShowAlert(true);
        return false;
      }
    } else {
      // Validación con código
      if (!passwordData.codigo_verificacion?.trim()) {
        setAlertMessage('Por favor ingresa el código de verificación enviado a tu correo.');
        setAlertHeader('Código requerido');
        setShowAlert(true);
        return false;
      }
    }
    
    return true;
  };

  // Actualizar perfil
  const handleUpdatePerfil = async () => {
    if (!validatePerfilForm()) return;

    try {
      setLoading(true);
      
      const response = await updatePerfil({
        nombre: perfilData.nombre.trim(),
        apellido: perfilData.apellido.trim(),
        telefono: perfilData.telefono.trim()
      });

      if (response.status === 200) {
        setToastMsg('¡Perfil actualizado exitosamente!');
        
        // Actualizar el contexto del usuario
        if (updateUser && user) {
          updateUser({
            ...user,
            nombre: perfilData.nombre.trim(),
            apellido: perfilData.apellido.trim(),
            telefono: perfilData.telefono.trim()
          });
        }
      }

    } catch (error: any) {
      console.error('Error al actualizar perfil:', error);
      
      if (error.response?.status === 401) {
        setToastMsg('Sesión expirada. Por favor inicia sesión nuevamente.');
        setTimeout(() => {
          history.push('/login');
        }, 2000);
      } else if (error.response?.status === 400) {
        setToastMsg('Datos inválidos. Verifica la información ingresada.');
      } else if (error.response?.data?.error) {
        setToastMsg(error.response.data.error);
      } else {
        setToastMsg('Error al actualizar el perfil. Intenta de nuevo.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Cambiar contraseña
  const handleChangePassword = async () => {
    if (!validatePasswordForm()) return;

    try {
      setLoading(true);
      
      if (!requiereCodigo) {
        // Paso 1: Solicitar código de verificación
        const response = await cambiarContraseñaUsuarioRobusto({
          password_actual: passwordData.password_actual,
          nueva_password: passwordData.nueva_password,
          confirmar_password: passwordData.confirmar_password
        });

        if (response.status === 200) {
          const responseData = response.data as any;
          
          if (responseData?.requiereCodigo) {
            setRequiereCodigo(true);
            setCorreoUsuario(responseData.correo);
            setCodigoRecibido(responseData.codigo);
            setToastMsg('Código de verificación generado. Ingresa el código para completar el cambio de contraseña.');
          } else if (responseData?.success) {
            setToastMsg('¡Contraseña cambiada exitosamente! (Modo simulación)');
            // Limpiar formulario
            setPasswordData({
              password_actual: '',
              nueva_password: '',
              confirmar_password: '',
              codigo_verificacion: ''
            });
            setRequiereCodigo(false);
          }
        }
      } else {
        // Paso 2: Completar cambio con código
        const response = await completarCambioContraseña({
          correo: correoUsuario,
          codigo: passwordData.codigo_verificacion!,
          nueva_password: passwordData.nueva_password
        });

        if (response.status === 200) {
          setToastMsg('¡Contraseña cambiada exitosamente!');
          // Limpiar formulario
          setPasswordData({
            password_actual: '',
            nueva_password: '',
            confirmar_password: '',
            codigo_verificacion: ''
          });
          setRequiereCodigo(false);
          setCodigoRecibido('');
        }
      }

    } catch (error: any) {
      console.error('Error al cambiar contraseña:', error);
      
      if (error.response?.status === 401) {
        setToastMsg('Sesión expirada. Por favor inicia sesión nuevamente.');
        setTimeout(() => {
          history.push('/login');
        }, 2000);
      } else if (error.response?.status === 400) {
        setToastMsg('Datos inválidos. Verifica la información ingresada.');
      } else if (error.response?.status === 405) {
        setToastMsg('Función de cambio de contraseña no disponible en este momento. Contacta al administrador.');
      } else if (error.message && error.message.includes('no está disponible')) {
        setToastMsg(error.message);
      } else if (error.response?.data?.error) {
        setToastMsg(error.response.data.error);
      } else {
        setToastMsg('Error al cambiar la contraseña. Intenta de nuevo.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Cancelar proceso de cambio de contraseña
  const cancelarCambioContraseña = () => {
    setRequiereCodigo(false);
    setPasswordData({
      password_actual: '',
      nueva_password: '',
      confirmar_password: '',
      codigo_verificacion: ''
    });
    setCodigoRecibido('');
    setToastMsg('Proceso de cambio de contraseña cancelado');
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

  // Toggle mostrar/ocultar contraseña
  const togglePasswordVisibility = (field: 'actual' | 'nueva' | 'confirmar') => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  // Formatear teléfono mientras se escribe
  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return value;
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" icon={arrowBackOutline} />
          </IonButtons>
          <IonTitle>Mi Perfil 👤</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {/* Segmento para cambiar entre perfil y contraseña */}
        <IonSegment 
          value={activeSegment} 
          onIonChange={(e) => setActiveSegment(e.detail.value as 'perfil' | 'password')}
          style={{ marginBottom: '20px' }}
        >
          <IonSegmentButton value="perfil">
            <IonIcon icon={personOutline} />
            <IonLabel>Perfil</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="password">
            <IonIcon icon={lockClosedOutline} />
            <IonLabel>Contraseña</IonLabel>
          </IonSegmentButton>
        </IonSegment>

        {/* Formulario de Perfil */}
        {activeSegment === 'perfil' && (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>
                <IonIcon icon={personOutline} /> Información Personal
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonGrid>
                <IonRow>
                  <IonCol size="12" sizeMd="6">
                    <IonItem style={{ marginBottom: '16px', '--padding-start': '0', '--padding-end': '0' }}>
                      <IonLabel position="floating" style={{ marginBottom: '8px', fontWeight: '500' }}>
                        Nombre *
                      </IonLabel>
                      <IonInput
                        value={perfilData.nombre}
                        onIonChange={(e) => setPerfilData(prev => ({ ...prev, nombre: e.detail.value! }))}
                        placeholder="Tu nombre"
                        maxlength={50}
                        style={{ marginTop: '4px' }}
                      />
                    </IonItem>
                  </IonCol>
                  <IonCol size="12" sizeMd="6">
                    <IonItem style={{ marginBottom: '16px', '--padding-start': '0', '--padding-end': '0' }}>
                      <IonLabel position="floating" style={{ marginBottom: '8px', fontWeight: '500' }}>
                        Apellido *
                      </IonLabel>
                      <IonInput
                        value={perfilData.apellido}
                        onIonChange={(e) => setPerfilData(prev => ({ ...prev, apellido: e.detail.value! }))}
                        placeholder="Tu apellido"
                        maxlength={50}
                        style={{ marginTop: '4px' }}
                      />
                    </IonItem>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol size="12">
                    <IonItem style={{ marginBottom: '24px', '--padding-start': '0', '--padding-end': '0' }}>
                      <IonLabel position="floating" style={{ marginBottom: '8px', fontWeight: '500' }}>
                        Teléfono *
                      </IonLabel>
                      <IonInput
                        value={perfilData.telefono}
                        onIonChange={(e) => {
                          const formatted = formatPhoneNumber(e.detail.value!);
                          setPerfilData(prev => ({ ...prev, telefono: formatted }));
                        }}
                        placeholder="(809) 123-4567"
                        type="tel"
                        maxlength={15}
                        style={{ marginTop: '4px' }}
                      />
                    </IonItem>
                    <IonNote style={{ fontSize: '0.8em', color: '#666', marginBottom: '16px' }}>
                      Formato: (809) 123-4567
                    </IonNote>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol size="12">
                    <IonButton
                      expand="block"
                      onClick={handleUpdatePerfil}
                      disabled={loading || !perfilData.nombre.trim() || !perfilData.apellido.trim() || !perfilData.telefono.trim()}
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
                          Actualizando...
                        </>
                      ) : (
                        <>
                          <IonIcon icon={saveOutline} slot="start" />
                          Actualizar Perfil
                        </>
                      )}
                    </IonButton>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCardContent>
          </IonCard>
        )}

        {/* Formulario de Contraseña */}
        {activeSegment === 'password' && (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>
                <IonIcon icon={lockClosedOutline} /> Cambiar Contraseña
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              {!requiereCodigo ? (
                // Paso 1: Formulario inicial
                <IonGrid>
                  <IonRow>
                    <IonCol size="12">
                      <div style={{ 
                        backgroundColor: '#e3f2fd', 
                        padding: '12px', 
                        borderRadius: '8px',
                        marginBottom: '16px',
                        border: '1px solid #2196F3'
                      }}>
                        <p style={{ margin: '0', fontSize: '0.9em', color: '#1976d2' }}>
                          <IonIcon icon={informationCircleOutline} style={{ marginRight: '4px' }} />
                          <strong>Paso 1:</strong> Ingresa tu contraseña actual y la nueva contraseña. Se enviará un código de verificación a tu correo electrónico.
                        </p>
                      </div>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol size="12">
                      <IonItem style={{ marginBottom: '16px', '--padding-start': '0', '--padding-end': '0' }}>
                        <IonLabel position="floating" style={{ marginBottom: '8px', fontWeight: '500' }}>
                          Contraseña Actual *
                        </IonLabel>
                        <IonInput
                          value={passwordData.password_actual}
                          onIonChange={(e) => setPasswordData(prev => ({ ...prev, password_actual: e.detail.value! }))}
                          placeholder="Tu contraseña actual"
                          type={showPassword.actual ? 'text' : 'password'}
                          style={{ marginTop: '4px' }}
                        />
                        <IonButton
                          fill="clear"
                          slot="end"
                          onClick={() => togglePasswordVisibility('actual')}
                        >
                          <IonIcon icon={showPassword.actual ? eyeOffOutline : eyeOutline} />
                        </IonButton>
                      </IonItem>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol size="12">
                      <IonItem style={{ marginBottom: '16px', '--padding-start': '0', '--padding-end': '0' }}>
                        <IonLabel position="floating" style={{ marginBottom: '8px', fontWeight: '500' }}>
                          Nueva Contraseña *
                        </IonLabel>
                        <IonInput
                          value={passwordData.nueva_password}
                          onIonChange={(e) => setPasswordData(prev => ({ ...prev, nueva_password: e.detail.value! }))}
                          placeholder="Nueva contraseña"
                          type={showPassword.nueva ? 'text' : 'password'}
                          style={{ marginTop: '4px' }}
                        />
                        <IonButton
                          fill="clear"
                          slot="end"
                          onClick={() => togglePasswordVisibility('nueva')}
                        >
                          <IonIcon icon={showPassword.nueva ? eyeOffOutline : eyeOutline} />
                        </IonButton>
                      </IonItem>
                      <IonNote style={{ fontSize: '0.8em', color: '#666', marginBottom: '16px' }}>
                        Mínimo 6 caracteres
                      </IonNote>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol size="12">
                      <IonItem style={{ marginBottom: '24px', '--padding-start': '0', '--padding-end': '0' }}>
                        <IonLabel position="floating" style={{ marginBottom: '8px', fontWeight: '500' }}>
                          Confirmar Nueva Contraseña *
                        </IonLabel>
                        <IonInput
                          value={passwordData.confirmar_password}
                          onIonChange={(e) => setPasswordData(prev => ({ ...prev, confirmar_password: e.detail.value! }))}
                          placeholder="Confirma la nueva contraseña"
                          type={showPassword.confirmar ? 'text' : 'password'}
                          style={{ marginTop: '4px' }}
                        />
                        <IonButton
                          fill="clear"
                          slot="end"
                          onClick={() => togglePasswordVisibility('confirmar')}
                        >
                          <IonIcon icon={showPassword.confirmar ? eyeOffOutline : eyeOutline} />
                        </IonButton>
                      </IonItem>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol size="12">
                      <IonButton
                        expand="block"
                        onClick={handleChangePassword}
                        disabled={loading || !passwordData.password_actual.trim() || !passwordData.nueva_password.trim() || !passwordData.confirmar_password.trim()}
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
                            Enviando Código...
                          </>
                        ) : (
                          <>
                            <IonIcon icon={lockClosedOutline} slot="start" />
                            Solicitar Código de Verificación
                          </>
                        )}
                      </IonButton>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              ) : (
                // Paso 2: Ingresar código de verificación
                <IonGrid>
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
                          <strong>Paso 2:</strong> Se ha generado un código de verificación para <strong>{correoUsuario}</strong>. 
                          Ingresa el código para completar el cambio de contraseña.
                        </p>
                      </div>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol size="12">
                      <div style={{ 
                        backgroundColor: '#fff3cd', 
                        padding: '16px', 
                        borderRadius: '8px',
                        marginBottom: '16px',
                        border: '1px solid #ffc107',
                        textAlign: 'center'
                      }}>
                        <p style={{ margin: '0 0 8px 0', fontSize: '0.9em', color: '#856404', fontWeight: '600' }}>
                          <IonIcon icon={informationCircleOutline} style={{ marginRight: '4px' }} />
                          Código de Verificación:
                        </p>
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
                          position: 'relative'
                        }}>
                          {codigoRecibido}
                          <IonButton
                            fill="clear"
                            size="small"
                            onClick={copiarCodigo}
                            style={{
                              position: 'absolute',
                              right: '8px',
                              top: '50%',
                              transform: 'translateY(-50%)',
                              '--padding-start': '8px',
                              '--padding-end': '8px',
                              minHeight: '32px'
                            }}
                          >
                            <IonIcon icon={copyOutline} style={{ fontSize: '16px' }} />
                          </IonButton>
                        </div>
                        <p style={{ margin: '8px 0 0 0', fontSize: '0.8em', color: '#856404' }}>
                          Copia este código y pégalo en el campo de abajo
                        </p>
                      </div>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol size="12">
                      <IonItem style={{ marginBottom: '24px', '--padding-start': '0', '--padding-end': '0' }}>
                        <IonLabel position="floating" style={{ marginBottom: '8px', fontWeight: '500' }}>
                          Código de Verificación *
                        </IonLabel>
                        <IonInput
                          value={passwordData.codigo_verificacion}
                          onIonChange={(e) => setPasswordData(prev => ({ ...prev, codigo_verificacion: e.detail.value! }))}
                          placeholder="Ingresa el código de 6 dígitos"
                          type="text"
                          maxlength={6}
                          style={{ marginTop: '4px' }}
                        />
                      </IonItem>
                      <IonNote style={{ fontSize: '0.8em', color: '#666', marginBottom: '16px' }}>
                        Ingresa el código mostrado arriba para verificar tu identidad
                      </IonNote>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol size="6">
                      <IonButton
                        expand="block"
                        onClick={handleChangePassword}
                        disabled={loading || !passwordData.codigo_verificacion?.trim()}
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
                            Cambiando...
                          </>
                        ) : (
                          <>
                            <IonIcon icon={checkmarkCircleOutline} slot="start" />
                            Confirmar Cambio
                          </>
                        )}
                      </IonButton>
                    </IonCol>
                    <IonCol size="6">
                      <IonButton
                        expand="block"
                        color="danger"
                        fill="outline"
                        onClick={cancelarCambioContraseña}
                        style={{
                          height: '52px',
                          fontSize: '16px',
                          fontWeight: '600',
                          '--border-radius': '12px',
                          marginTop: '16px'
                        }}
                      >
                        <IonIcon icon={closeOutline} slot="start" />
                        Cancelar
                      </IonButton>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              )}
            </IonCardContent>
          </IonCard>
        )}

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
                  Información Importante
                </h4>
                <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.85em', lineHeight: '1.4', color: '#666' }}>
                  <li>Los cambios se aplicarán inmediatamente</li>
                  <li>Tu información es confidencial y segura</li>
                  <li>La contraseña debe tener al menos 6 caracteres</li>
                  <li>Puedes cambiar tu información en cualquier momento</li>
                </ul>
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

export default CambiarContraseña;
