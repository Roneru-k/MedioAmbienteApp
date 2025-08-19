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
  IonIcon,
  IonText,
  IonList,
  IonToggle,
  IonAlert,
  IonToast,
} from '@ionic/react';
import {
  lockClosedOutline,
  eyeOutline,
  eyeOffOutline,
  checkmarkCircleOutline,
  alertCircleOutline,
  shieldCheckmarkOutline,
} from 'ionicons/icons';
import { useState } from 'react';
import './Page.css';

const CambiarContraseña: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showCurrentPassword, setShowCurrentPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [showSuccessToast, setShowSuccessToast] = useState<boolean>(false);
  const [showErrorAlert, setShowErrorAlert] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Validaciones de contraseña
  const passwordValidations = {
    length: newPassword.length >= 8,
    uppercase: /[A-Z]/.test(newPassword),
    lowercase: /[a-z]/.test(newPassword),
    number: /\d/.test(newPassword),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
  };

  const isPasswordValid = Object.values(passwordValidations).every(Boolean);
  const doPasswordsMatch = newPassword === confirmPassword && newPassword !== '';

  const handleChangePassword = async () => {
    // Validaciones
    if (!currentPassword) {
      setErrorMessage('Debe ingresar su contraseña actual');
      setShowErrorAlert(true);
      return;
    }

    if (!isPasswordValid) {
      setErrorMessage('La nueva contraseña no cumple con los requisitos de seguridad');
      setShowErrorAlert(true);
      return;
    }

    if (!doPasswordsMatch) {
      setErrorMessage('Las contraseñas no coinciden');
      setShowErrorAlert(true);
      return;
    }

    try {
      // Aquí se haría la llamada a la API para cambiar la contraseña
      // const response = await api.post('/cambiar-contraseña', {
      //   currentPassword,
      //   newPassword
      // });

      // Simular llamada exitosa
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Limpiar formulario
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      
      // Mostrar mensaje de éxito
      setShowSuccessToast(true);
    } catch (error) {
      setErrorMessage('Error al cambiar la contraseña. Intente nuevamente.');
      setShowErrorAlert(true);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Cambiar Contraseña</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Cambiar Contraseña</IonTitle>
          </IonToolbar>
        </IonHeader>

        {/* Información de seguridad */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={shieldCheckmarkOutline} /> Seguridad de la Contraseña
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>
              Para garantizar la seguridad de su cuenta, su nueva contraseña debe cumplir 
              con los siguientes requisitos:
            </p>
            <IonList>
              <IonItem>
                <IonIcon 
                  icon={passwordValidations.length ? checkmarkCircleOutline : alertCircleOutline} 
                  slot="start" 
                  color={passwordValidations.length ? 'success' : 'medium'} 
                />
                <IonLabel>
                  <IonText color={passwordValidations.length ? 'success' : 'medium'}>
                    Mínimo 8 caracteres
                  </IonText>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonIcon 
                  icon={passwordValidations.uppercase ? checkmarkCircleOutline : alertCircleOutline} 
                  slot="start" 
                  color={passwordValidations.uppercase ? 'success' : 'medium'} 
                />
                <IonLabel>
                  <IonText color={passwordValidations.uppercase ? 'success' : 'medium'}>
                    Al menos una letra mayúscula
                  </IonText>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonIcon 
                  icon={passwordValidations.lowercase ? checkmarkCircleOutline : alertCircleOutline} 
                  slot="start" 
                  color={passwordValidations.lowercase ? 'success' : 'medium'} 
                />
                <IonLabel>
                  <IonText color={passwordValidations.lowercase ? 'success' : 'medium'}>
                    Al menos una letra minúscula
                  </IonText>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonIcon 
                  icon={passwordValidations.number ? checkmarkCircleOutline : alertCircleOutline} 
                  slot="start" 
                  color={passwordValidations.number ? 'success' : 'medium'} 
                />
                <IonLabel>
                  <IonText color={passwordValidations.number ? 'success' : 'medium'}>
                    Al menos un número
                  </IonText>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonIcon 
                  icon={passwordValidations.special ? checkmarkCircleOutline : alertCircleOutline} 
                  slot="start" 
                  color={passwordValidations.special ? 'success' : 'medium'} 
                />
                <IonLabel>
                  <IonText color={passwordValidations.special ? 'success' : 'medium'}>
                    Al menos un carácter especial (!@#$%^&*)
                  </IonText>
                </IonLabel>
              </IonItem>
            </IonList>
          </IonCardContent>
        </IonCard>

        {/* Formulario de cambio de contraseña */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={lockClosedOutline} /> Cambiar Contraseña
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList>
              {/* Contraseña actual */}
              <IonItem>
                <IonLabel position="stacked">
                  Contraseña Actual <IonText color="danger">*</IonText>
                </IonLabel>
                <IonInput
                  type={showCurrentPassword ? 'text' : 'password'}
                  value={currentPassword}
                  onIonInput={(e) => setCurrentPassword(e.detail.value!)}
                  placeholder="Ingrese su contraseña actual"
                  required
                />
                <IonButton
                  fill="clear"
                  slot="end"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  <IonIcon icon={showCurrentPassword ? eyeOffOutline : eyeOutline} />
                </IonButton>
              </IonItem>

              {/* Nueva contraseña */}
              <IonItem>
                <IonLabel position="stacked">
                  Nueva Contraseña <IonText color="danger">*</IonText>
                </IonLabel>
                <IonInput
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onIonInput={(e) => setNewPassword(e.detail.value!)}
                  placeholder="Ingrese su nueva contraseña"
                  required
                />
                <IonButton
                  fill="clear"
                  slot="end"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  <IonIcon icon={showNewPassword ? eyeOffOutline : eyeOutline} />
                </IonButton>
              </IonItem>

              {/* Confirmar nueva contraseña */}
              <IonItem>
                <IonLabel position="stacked">
                  Confirmar Nueva Contraseña <IonText color="danger">*</IonText>
                </IonLabel>
                <IonInput
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onIonInput={(e) => setConfirmPassword(e.detail.value!)}
                  placeholder="Confirme su nueva contraseña"
                  required
                />
                <IonButton
                  fill="clear"
                  slot="end"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <IonIcon icon={showConfirmPassword ? eyeOffOutline : eyeOutline} />
                </IonButton>
              </IonItem>
            </IonList>

            {/* Indicador de coincidencia de contraseñas */}
            {newPassword && confirmPassword && (
              <div style={{ marginTop: '10px', padding: '10px', borderRadius: '8px', backgroundColor: doPasswordsMatch ? '#e8f5e8' : '#ffe8e8' }}>
                <IonText color={doPasswordsMatch ? 'success' : 'danger'}>
                  <IonIcon icon={doPasswordsMatch ? checkmarkCircleOutline : alertCircleOutline} />
                  {doPasswordsMatch ? ' Las contraseñas coinciden' : ' Las contraseñas no coinciden'}
                </IonText>
              </div>
            )}

            {/* Botón de cambio */}
            <IonButton
              expand="block"
              color="primary"
              onClick={handleChangePassword}
              disabled={!currentPassword || !isPasswordValid || !doPasswordsMatch}
              style={{ marginTop: '20px' }}
            >
              <IonIcon icon={lockClosedOutline} slot="start" />
              Cambiar Contraseña
            </IonButton>
          </IonCardContent>
        </IonCard>

        {/* Información adicional */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Recomendaciones de Seguridad</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <ul style={{ paddingLeft: '20px', margin: 0 }}>
              <li>No comparta su contraseña con nadie</li>
              <li>No use la misma contraseña en múltiples cuentas</li>
              <li>Cambie su contraseña regularmente</li>
              <li>No use información personal fácil de adivinar</li>
              <li>Considere usar un gestor de contraseñas</li>
            </ul>
          </IonCardContent>
        </IonCard>

        {/* Toast de éxito */}
        <IonToast
          isOpen={showSuccessToast}
          onDidDismiss={() => setShowSuccessToast(false)}
          message="Contraseña cambiada exitosamente"
          duration={3000}
          color="success"
          position="top"
        />

        {/* Alert de error */}
        <IonAlert
          isOpen={showErrorAlert}
          onDidDismiss={() => setShowErrorAlert(false)}
          header="Error"
          message={errorMessage}
          buttons={['OK']}
        />
      </IonContent>
    </IonPage>
  );
};

export default CambiarContraseña;
