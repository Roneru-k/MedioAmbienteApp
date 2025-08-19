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
  IonTextarea,
  IonButton,
  IonIcon,
  IonToast,
  IonLoading,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonFab,
  IonFabButton,
  IonModal,
  IonButtons,
  IonSpinner,
  IonChip,
  IonBadge,
  IonNote,
  IonImg,
  IonThumbnail,
  IonAlert,
  IonBackButton
} from '@ionic/react';
import {
  cameraOutline,
  locationOutline,
  warningOutline,
  checkmarkCircleOutline,
  closeOutline,
  refreshOutline,
  informationCircleOutline,
  arrowBackOutline,
  trashOutline,
  saveOutline,
  mapOutline,
  timeOutline,
  documentTextOutline,
  imageOutline,
  locationSharp
} from 'ionicons/icons';
import { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { reportarDaño, getGeolocation } from '../utils/api';
import './Page.css';

interface ReporteForm {
  titulo: string;
  descripcion: string;
  foto: string;
  latitud: number;
  longitud: number;
}

const Reportar: React.FC = () => {
  const [formData, setFormData] = useState<ReporteForm>({
    titulo: '',
    descripcion: '',
    foto: '',
    latitud: 0,
    longitud: 0
  });
  const [loading, setLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [showCamera, setShowCamera] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertHeader, setAlertHeader] = useState('');
  const [alertButtons, setAlertButtons] = useState<string[]>(['OK']);

  const history = useHistory();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Validaciones
  const validateForm = () => {
    if (!formData.titulo.trim()) {
      setAlertMessage('Por favor ingresa un título para el reporte.');
      setAlertHeader('Título requerido');
      setShowAlert(true);
      return false;
    }
    if (!formData.descripcion.trim()) {
      setAlertMessage('Por favor describe el daño ambiental observado.');
      setAlertHeader('Descripción requerida');
      setShowAlert(true);
      return false;
    }
    if (formData.descripcion.trim().length < 20) {
      setAlertMessage('La descripción debe tener al menos 20 caracteres para ser más detallada.');
      setAlertHeader('Descripción muy corta');
      setShowAlert(true);
      return false;
    }
    if (!formData.foto) {
      setAlertMessage('Por favor toma una foto del daño ambiental para documentar el reporte.');
      setAlertHeader('Foto requerida');
      setShowAlert(true);
      return false;
    }
    if (formData.latitud === 0 && formData.longitud === 0) {
      setAlertMessage('Por favor obtén la ubicación del daño ambiental.');
      setAlertHeader('Ubicación requerida');
      setShowAlert(true);
      return false;
    }
    return true;
  };

  // Obtener ubicación automática
  const getCurrentLocation = async () => {
    try {
      setLocationLoading(true);
      setLocationError('');
      
      const coords = await getGeolocation();
      setFormData(prev => ({
        ...prev,
        latitud: coords.lat,
        longitud: coords.lng
      }));
      
      setToastMsg('Ubicación obtenida exitosamente');
      setShowLocationModal(false);
      
    } catch (error: any) {
      console.error('Error al obtener ubicación:', error);
      setLocationError(
        error.code === 1 ? 'Acceso denegado a la ubicación. Permite el acceso en tu navegador.' :
        error.code === 2 ? 'No se pudo obtener la ubicación. Verifica tu conexión.' :
        error.code === 3 ? 'Tiempo de espera agotado. Intenta de nuevo.' :
        'Error al obtener la ubicación. Intenta de nuevo.'
      );
    } finally {
      setLocationLoading(false);
    }
  };

  // Capturar foto
  const handleCameraClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validar tipo de archivo
      if (!file.type.startsWith('image/')) {
        setToastMsg('Por favor selecciona una imagen válida');
        return;
      }

      // Validar tamaño (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setToastMsg('La imagen debe ser menor a 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setFormData(prev => ({
          ...prev,
          foto: result
        }));
        setToastMsg('Foto capturada exitosamente');
      };
      reader.readAsDataURL(file);
    }
  };

  // Eliminar foto
  const removePhoto = () => {
    setFormData(prev => ({
      ...prev,
      foto: ''
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Enviar reporte
  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      
      const reporteData = {
        titulo: formData.titulo.trim(),
        descripcion: formData.descripcion.trim(),
        foto: formData.foto,
        latitud: formData.latitud,
        longitud: formData.longitud
      };

      await reportarDaño(reporteData);
      
      setToastMsg('¡Reporte enviado exitosamente! El Ministerio revisará tu denuncia.');
      
      // Limpiar formulario
      setFormData({
        titulo: '',
        descripcion: '',
        foto: '',
        latitud: 0,
        longitud: 0
      });
      
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      // Redirigir a mis reportes después de un delay
      setTimeout(() => {
        history.push('/mis-reportes');
      }, 2000);

    } catch (error: any) {
      console.error('Error al enviar reporte:', error);
      setToastMsg(
        error.response?.data?.error || 'Error al enviar el reporte. Intenta de nuevo.'
      );
    } finally {
      setLoading(false);
    }
  };

  // Formatear coordenadas
  const formatCoordinates = (lat: number, lng: number) => {
    if (lat === 0 && lng === 0) return 'No obtenida';
    return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" icon={arrowBackOutline} />
          </IonButtons>
          <IonTitle>Reportar Daño Ambiental 🚨</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {/* Información inicial */}
        <IonCard style={{ marginBottom: '20px' }}>
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={warningOutline} color="danger" /> Información Importante
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p style={{ margin: '0 0 12px 0', color: '#666', lineHeight: '1.5' }}>
              <strong>Tu reporte es confidencial y será revisado por el Ministerio de Medio Ambiente.</strong>
            </p>
            <p style={{ margin: '0', color: '#666', lineHeight: '1.5', fontSize: '0.9em' }}>
              • Proporciona información detallada y precisa<br/>
              • Toma una foto clara del daño ambiental<br/>
              • Asegúrate de que la ubicación sea correcta<br/>
              • El Ministerio te contactará si necesita más información
            </p>
          </IonCardContent>
        </IonCard>

        {/* Formulario */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={documentTextOutline} /> Datos del Reporte
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                <IonCol size="12">
                  {/* Título */}
                  <IonItem style={{ marginBottom: '16px', '--padding-start': '0', '--padding-end': '0' }}>
                    <IonLabel position="floating" style={{ marginBottom: '8px', fontWeight: '500' }}>
                      Título del Reporte *
                    </IonLabel>
                    <IonInput
                      value={formData.titulo}
                      onIonChange={(e) => setFormData(prev => ({ ...prev, titulo: e.detail.value! }))}
                      placeholder="Ej: Contaminación en río Ozama"
                      maxlength={100}
                      style={{ marginTop: '4px' }}
                    />
                  </IonItem>

                  {/* Descripción */}
                  <IonItem style={{ marginBottom: '16px', '--padding-start': '0', '--padding-end': '0' }}>
                    <IonLabel position="floating" style={{ marginBottom: '8px', fontWeight: '500' }}>
                      Descripción Detallada *
                    </IonLabel>
                    <IonTextarea
                      value={formData.descripcion}
                      onIonChange={(e) => setFormData(prev => ({ ...prev, descripcion: e.detail.value! }))}
                      placeholder="Describe el daño ambiental observado, incluyendo detalles como el tipo de contaminación, extensión del área afectada, posibles causas, etc."
                      rows={4}
                      maxlength={1000}
                      style={{ marginTop: '4px' }}
                    />
                  </IonItem>
                  <IonNote style={{ fontSize: '0.8em', color: '#666', marginBottom: '16px' }}>
                    {formData.descripcion.length}/1000 caracteres
                  </IonNote>

                  {/* Foto */}
                  <div style={{ marginBottom: '20px' }}>
                    <IonLabel style={{ 
                      display: 'block', 
                      marginBottom: '8px', 
                      fontWeight: '500',
                      color: '#495057'
                    }}>
                      <IonIcon icon={imageOutline} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                      Foto del Daño Ambiental *
                    </IonLabel>
                    
                    {formData.foto ? (
                      <div style={{ position: 'relative', marginBottom: '12px' }}>
                        <IonThumbnail style={{ width: '100%', height: '200px', borderRadius: '8px' }}>
                          <IonImg src={formData.foto} alt="Foto del daño ambiental" />
                        </IonThumbnail>
                        <IonButton
                          fill="clear"
                          color="danger"
                          size="small"
                          style={{ 
                            position: 'absolute', 
                            top: '8px', 
                            right: '8px',
                            '--background': 'rgba(255, 255, 255, 0.9)',
                            '--color': '#dc3545'
                          }}
                          onClick={removePhoto}
                        >
                          <IonIcon icon={trashOutline} />
                        </IonButton>
                      </div>
                    ) : (
                      <div 
                        style={{
                          border: '2px dashed #ccc',
                          borderRadius: '8px',
                          padding: '40px 20px',
                          textAlign: 'center',
                          backgroundColor: '#f8f9fa',
                          cursor: 'pointer'
                        }}
                        onClick={handleCameraClick}
                      >
                        <IonIcon 
                          icon={cameraOutline} 
                          style={{ fontSize: '48px', color: '#666', marginBottom: '12px' }} 
                        />
                        <p style={{ margin: '0', color: '#666' }}>
                          Toca para tomar una foto del daño ambiental
                        </p>
                        <p style={{ margin: '8px 0 0 0', fontSize: '0.8em', color: '#999' }}>
                          Máximo 5MB
                        </p>
                      </div>
                    )}
                    
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      capture="environment"
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                    />
                  </div>

                  {/* Ubicación */}
                  <div style={{ marginBottom: '24px' }}>
                    <IonLabel style={{ 
                      display: 'block', 
                      marginBottom: '8px', 
                      fontWeight: '500',
                      color: '#495057'
                    }}>
                      <IonIcon icon={locationOutline} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                      Ubicación del Daño *
                    </IonLabel>
                    
                    <div style={{
                      border: '1px solid #e9ecef',
                      borderRadius: '8px',
                      padding: '16px',
                      backgroundColor: '#f8f9fa',
                      marginBottom: '12px'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <p style={{ margin: '0 0 4px 0', fontSize: '0.9em', color: '#666' }}>
                            Coordenadas:
                          </p>
                          <p style={{ margin: 0, fontWeight: '500', color: '#333' }}>
                            {formatCoordinates(formData.latitud, formData.longitud)}
                          </p>
                        </div>
                        <IonButton
                          fill="outline"
                          size="small"
                          onClick={() => setShowLocationModal(true)}
                        >
                          <IonIcon icon={locationSharp} slot="start" />
                          Obtener Ubicación
                        </IonButton>
                      </div>
                    </div>
                  </div>

                  {/* Botón de envío */}
                  <IonButton
                    expand="block"
                    onClick={handleSubmit}
                    disabled={loading}
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
                        Enviando Reporte...
                      </>
                    ) : (
                      <>
                        <IonIcon icon={saveOutline} slot="start" />
                        Enviar Reporte
                      </>
                    )}
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>

        {/* Modal de ubicación */}
        <IonModal isOpen={showLocationModal} onDidDismiss={() => setShowLocationModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Obtener Ubicación</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setShowLocationModal(false)}>
                  <IonIcon icon={closeOutline} />
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>

          <IonContent className="ion-padding">
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <IonIcon 
                icon={locationOutline} 
                style={{ fontSize: '64px', color: '#4CAF50', marginBottom: '20px' }} 
              />
              
              <h3 style={{ margin: '0 0 12px 0', color: '#333' }}>
                Obtener Ubicación Actual
              </h3>
              
              <p style={{ margin: '0 0 24px 0', color: '#666', lineHeight: '1.5' }}>
                Para obtener tu ubicación actual, necesitamos acceso a tu GPS. 
                Esto nos ayudará a ubicar exactamente dónde está ocurriendo el daño ambiental.
              </p>

              {locationError && (
                <div style={{
                  backgroundColor: '#fff3cd',
                  border: '1px solid #ffeaa7',
                  borderRadius: '8px',
                  padding: '12px',
                  marginBottom: '20px',
                  color: '#856404'
                }}>
                  <IonIcon icon={warningOutline} style={{ marginRight: '8px' }} />
                  {locationError}
                </div>
              )}

              <IonButton
                expand="block"
                onClick={getCurrentLocation}
                disabled={locationLoading}
                style={{ marginBottom: '12px' }}
              >
                {locationLoading ? (
                  <>
                    <IonSpinner name="crescent" slot="start" />
                    Obteniendo ubicación...
                  </>
                ) : (
                  <>
                    <IonIcon icon={locationSharp} slot="start" />
                    Obtener Mi Ubicación
                  </>
                )}
              </IonButton>

              <IonButton
                fill="clear"
                onClick={() => setShowLocationModal(false)}
              >
                Cancelar
              </IonButton>
            </div>
          </IonContent>
        </IonModal>

        {/* Alert para validaciones */}
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={alertHeader}
          message={alertMessage}
          buttons={alertButtons}
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

export default Reportar;
