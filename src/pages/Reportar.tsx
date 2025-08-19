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
  IonTextarea,
  IonButton,
  IonIcon,
  IonSelect,
  IonSelectOption,
  IonToast,
  IonLoading,
  IonImg,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonBadge,
  IonSpinner
} from '@ionic/react';
import {
  cameraOutline,
  locationOutline,
  warningOutline,
  checkmarkOutline,
  closeOutline,
  trashOutline,
  imageOutline
} from 'ionicons/icons';
import { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { reportarDaño, getGeolocation } from '../utils/api';
import storage from '../utils/storage';
import './Page.css';

const Reportar: React.FC = () => {
  const history = useHistory();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [foto, setFoto] = useState<string>('');
  const [fotoFile, setFotoFile] = useState<File | null>(null);
  const [latitud, setLatitud] = useState<number | null>(null);
  const [longitud, setLongitud] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [gettingLocation, setGettingLocation] = useState(false);

  const handleFotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFotoFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setFoto(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTakePhoto = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const removeFoto = () => {
    setFoto('');
    setFotoFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getCurrentLocation = async () => {
    try {
      setGettingLocation(true);
      const coords = await getGeolocation();
      setLatitud(coords.lat);
      setLongitud(coords.lng);
      setToastMsg('Ubicación obtenida correctamente');
    } catch (error: any) {
      console.error('Error obteniendo ubicación:', error);
      setToastMsg('Error al obtener la ubicación. Verifica que tengas permisos de ubicación.');
    } finally {
      setGettingLocation(false);
    }
  };

  const handleSubmit = async () => {
    // Validaciones
    if (!titulo.trim()) {
      setToastMsg('Por favor ingresa un título para el reporte');
      return;
    }
    if (!descripcion.trim()) {
      setToastMsg('Por favor ingresa una descripción del problema');
      return;
    }
    if (!foto) {
      setToastMsg('Por favor toma o selecciona una foto del problema');
      return;
    }
    if (!latitud || !longitud) {
      setToastMsg('Por favor obtén la ubicación del problema');
      return;
    }

    try {
      setLoading(true);
      
      // Enviar reporte
      await reportarDaño({
        titulo: titulo.trim(),
        descripcion: descripcion.trim(),
        foto: foto, // Assuming foto is already in base64 string
        latitud,
        longitud,
        categoria: 'otro' // Assuming 'otro' is the default category if not provided
      });

      setToastMsg('Reporte enviado correctamente. Gracias por tu contribución.');
      
      // Limpiar formulario
      setTitulo('');
      setDescripcion('');
      setFoto('');
      setFotoFile(null);
      setLatitud(null);
      setLongitud(null);
      
      // Redirigir después de un momento
      setTimeout(() => {
        history.push('/mis-reportes');
      }, 2000);
      
    } catch (error: any) {
      console.error('Error enviando reporte:', error);
      setToastMsg(
        error.response?.data?.message || 'Error al enviar el reporte. Por favor, intenta de nuevo.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Reportar Daño Ambiental</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={warningOutline} /> Reportar Problema Ambiental
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p style={{ marginBottom: '20px', color: '#666' }}>
              Ayúdanos a proteger el medio ambiente reportando problemas ambientales 
              que encuentres en tu comunidad.
            </p>

            {/* Título */}
            <IonItem>
              <IonLabel position="floating">Título del Reporte *</IonLabel>
              <IonInput
                value={titulo}
                onIonChange={(e) => setTitulo(e.detail.value!)}
                placeholder="Ej: Acumulación de basura en el parque"
                maxlength={100}
              />
            </IonItem>

            {/* Descripción */}
            <IonItem>
              <IonLabel position="floating">Descripción del Problema *</IonLabel>
              <IonTextarea
                value={descripcion}
                onIonChange={(e) => setDescripcion(e.detail.value!)}
                placeholder="Describe detalladamente el problema ambiental que has observado..."
                rows={4}
                maxlength={500}
              />
            </IonItem>

            {/* Foto */}
            <IonItem>
              <IonLabel>Foto del Problema *</IonLabel>
              <IonButton
                fill="outline"
                slot="end"
                onClick={handleTakePhoto}
                disabled={loading}
              >
                <IonIcon icon={cameraOutline} slot="start" />
                {foto ? 'Cambiar Foto' : 'Tomar Foto'}
              </IonButton>
            </IonItem>

            {/* Input de archivo oculto */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFotoChange}
              style={{ display: 'none' }}
            />

            {/* Vista previa de la foto */}
            {foto && (
              <IonCard>
                <IonCardContent>
                  <div style={{ position: 'relative' }}>
                    <IonImg src={foto} alt="Vista previa" />
                    <IonButton
                      fill="clear"
                      color="danger"
                      style={{
                        position: 'absolute',
                        top: '5px',
                        right: '5px',
                        minWidth: 'auto',
                        padding: '5px'
                      }}
                      onClick={removeFoto}
                    >
                      <IonIcon icon={trashOutline} />
                    </IonButton>
                  </div>
                </IonCardContent>
              </IonCard>
            )}

            {/* Ubicación */}
            <IonItem>
              <IonLabel>Ubicación *</IonLabel>
              <IonButton
                fill="outline"
                slot="end"
                onClick={getCurrentLocation}
                disabled={loading || gettingLocation}
              >
                {gettingLocation ? (
                  <IonSpinner name="crescent" />
                ) : (
                  <IonIcon icon={locationOutline} slot="start" />
                )}
                {latitud && longitud ? 'Ubicación Obtenida' : 'Obtener Ubicación'}
              </IonButton>
            </IonItem>

            {/* Mostrar coordenadas si están disponibles */}
            {latitud && longitud && (
              <IonCard color="light">
                <IonCardContent>
                  <IonGrid>
                    <IonRow>
                      <IonCol size="6">
                        <strong>Latitud:</strong> {latitud.toFixed(6)}
                      </IonCol>
                      <IonCol size="6">
                        <strong>Longitud:</strong> {longitud.toFixed(6)}
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </IonCardContent>
              </IonCard>
            )}

            {/* Botón de envío */}
            <IonButton
              expand="block"
              onClick={handleSubmit}
              disabled={loading || !titulo || !descripcion || !foto || !latitud || !longitud}
              style={{ marginTop: '20px' }}
            >
              {loading ? (
                <>
                  <IonSpinner name="crescent" />
                  Enviando Reporte...
                </>
              ) : (
                <>
                  <IonIcon icon={checkmarkOutline} slot="start" />
                  Enviar Reporte
                </>
              )}
            </IonButton>

            {/* Información adicional */}
            <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
              <IonText color="medium">
                <p style={{ margin: '0 0 10px 0', fontSize: '0.9em' }}>
                  <strong>Información importante:</strong>
                </p>
                <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.85em' }}>
                  <li>Tu reporte será revisado por el personal del Ministerio</li>
                  <li>Mantendremos tu información confidencial</li>
                  <li>Te notificaremos sobre el estado de tu reporte</li>
                  <li>Los campos marcados con * son obligatorios</li>
                </ul>
              </IonText>
            </div>
          </IonCardContent>
        </IonCard>

        <IonLoading isOpen={loading} message="Enviando reporte..." />
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
