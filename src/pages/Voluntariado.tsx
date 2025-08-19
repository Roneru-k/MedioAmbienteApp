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
  IonList,
  IonListHeader,
  IonGrid,
  IonRow,
  IonCol,
  IonChip,
  IonBadge
} from '@ionic/react';
import {
  peopleOutline,
  checkmarkOutline,
  informationCircleOutline,
  heartOutline,
  leafOutline,
  waterOutline,
  globeOutline,
  timeOutline,
  locationOutline
} from 'ionicons/icons';
import { useState } from 'react';
import { solicitarVoluntariado } from '../utils/api';
import './Page.css';

const Voluntariado: React.FC = () => {
  const [cedula, setCedula] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [telefono, setTelefono] = useState('');
  const [loading, setLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const requisitos = [
    "Ser mayor de 18 años",
    "Tener cédula dominicana válida",
    "Disponibilidad de tiempo (mínimo 4 horas semanales)",
    "Compromiso con la protección ambiental",
    "Disposición para trabajar en equipo",
    "Buena condición física para actividades al aire libre"
  ];

  const actividades = [
    {
      titulo: "Reforestación",
      descripcion: "Participar en jornadas de plantación de árboles",
      icono: leafOutline,
      color: "success"
    },
    {
      titulo: "Limpieza de Playas",
      descripcion: "Ayudar en la limpieza de costas y playas",
      icono: waterOutline,
      color: "primary"
    },
    {
      titulo: "Educación Ambiental",
      descripcion: "Impartir talleres y charlas educativas",
      icono: informationCircleOutline,
      color: "secondary"
    },
    {
      titulo: "Monitoreo Ambiental",
      descripcion: "Participar en estudios y monitoreo de especies",
      icono: globeOutline,
      color: "tertiary"
    },
    {
      titulo: "Conservación",
      descripcion: "Trabajar en áreas protegidas y reservas",
      icono: leafOutline,
      color: "success"
    },
    {
      titulo: "Emergencias",
      descripcion: "Responder a emergencias ambientales",
      icono: heartOutline,
      color: "danger"
    }
  ];

  const beneficios = [
    "Capacitación gratuita en temas ambientales",
    "Certificado de voluntariado oficial",
    "Experiencia laboral en el sector ambiental",
    "Networking con profesionales del medio ambiente",
    "Participación en eventos y conferencias",
    "Descuentos en actividades del ministerio",
    "Reconocimiento público por contribuciones destacadas"
  ];

  const handleSubmit = async () => {
    // Validaciones
    if (!cedula.trim()) {
      setToastMsg('Por favor ingresa tu número de cédula');
      return;
    }
    if (!nombre.trim()) {
      setToastMsg('Por favor ingresa tu nombre');
      return;
    }
    if (!apellido.trim()) {
      setToastMsg('Por favor ingresa tu apellido');
      return;
    }
    if (!email.trim()) {
      setToastMsg('Por favor ingresa tu correo electrónico');
      return;
    }
    if (!password) {
      setToastMsg('Por favor ingresa una contraseña');
      return;
    }
    if (password !== confirmPassword) {
      setToastMsg('Las contraseñas no coinciden');
      return;
    }
    if (password.length < 6) {
      setToastMsg('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    if (!telefono.trim()) {
      setToastMsg('Por favor ingresa tu número de teléfono');
      return;
    }

    try {
      setLoading(true);
      await solicitarVoluntariado({
        cedula: cedula.trim(),
        nombre: nombre.trim(),
        apellido: apellido.trim(),
        correo: email.trim(),
        password,
        telefono: telefono.trim()
      });

      setToastMsg('¡Solicitud enviada exitosamente! Te contactaremos pronto.');
      
      // Limpiar formulario
      setCedula('');
      setNombre('');
      setApellido('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setTelefono('');
      
    } catch (error: any) {
      console.error('Error enviando solicitud:', error);
      setToastMsg(
        error.response?.data?.error || 'Error al enviar la solicitud. Por favor, intenta de nuevo.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Voluntariado Ambiental</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        
        {/* Información general */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={peopleOutline} /> ¡Únete a Nuestro Equipo!
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>
              El voluntariado ambiental es una oportunidad única para contribuir 
              directamente a la protección del medio ambiente en la República Dominicana. 
              Como voluntario, participarás en actividades de conservación, educación 
              ambiental y respuesta a emergencias.
            </p>
          </IonCardContent>
        </IonCard>

        {/* Requisitos */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Requisitos para Ser Voluntario</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList>
              {requisitos.map((requisito, index) => (
                <IonItem key={index}>
                  <IonIcon icon={checkmarkOutline} slot="start" color="success" />
                  <IonLabel>{requisito}</IonLabel>
                </IonItem>
              ))}
            </IonList>
          </IonCardContent>
        </IonCard>

        {/* Actividades */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Actividades en las que Participarás</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                {actividades.map((actividad, index) => (
                  <IonCol size="6" key={index}>
                    <IonCard color="light">
                      <IonCardContent style={{ textAlign: 'center', padding: '10px' }}>
                        <IonIcon 
                          icon={actividad.icono} 
                          size="large" 
                          color={actividad.color as any}
                          style={{ marginBottom: '8px' }}
                        />
                        <h4 style={{ margin: '8px 0', fontSize: '0.9em' }}>
                          {actividad.titulo}
                        </h4>
                        <p style={{ fontSize: '0.8em', margin: 0, color: '#666' }}>
                          {actividad.descripcion}
                        </p>
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                ))}
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>

        {/* Beneficios */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Beneficios del Voluntariado</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList>
              {beneficios.map((beneficio, index) => (
                <IonItem key={index}>
                  <IonIcon icon={heartOutline} slot="start" color="primary" />
                  <IonLabel>{beneficio}</IonLabel>
                </IonItem>
              ))}
            </IonList>
          </IonCardContent>
        </IonCard>

        {/* Formulario de solicitud */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Solicitar Ser Voluntario</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p style={{ marginBottom: '20px', color: '#666' }}>
              Completa el siguiente formulario para solicitar ser voluntario. 
              Revisaremos tu solicitud y te contactaremos en un plazo máximo de 5 días hábiles.
            </p>

            <IonItem>
              <IonLabel position="floating">Número de Cédula *</IonLabel>
              <IonInput
                value={cedula}
                onIonChange={(e) => setCedula(e.detail.value!)}
                placeholder="Ej: 123-4567890-1"
                maxlength={13}
              />
            </IonItem>

            <IonItem>
              <IonLabel position="floating">Nombre *</IonLabel>
              <IonInput
                value={nombre}
                onIonChange={(e) => setNombre(e.detail.value!)}
                placeholder="Ej: Juan Carlos"
                maxlength={100}
              />
            </IonItem>

            <IonItem>
              <IonLabel position="floating">Apellido *</IonLabel>
              <IonInput
                value={apellido}
                onIonChange={(e) => setApellido(e.detail.value!)}
                placeholder="Ej: Pérez"
                maxlength={100}
              />
            </IonItem>

            <IonItem>
              <IonLabel position="floating">Correo Electrónico *</IonLabel>
              <IonInput
                type="email"
                value={email}
                onIonChange={(e) => setEmail(e.detail.value!)}
                placeholder="usuario@ejemplo.com"
              />
            </IonItem>

            <IonItem>
              <IonLabel position="floating">Teléfono *</IonLabel>
              <IonInput
                type="tel"
                value={telefono}
                onIonChange={(e) => setTelefono(e.detail.value!)}
                placeholder="Ej: 809-555-0101"
              />
            </IonItem>

            <IonItem>
              <IonLabel position="floating">Contraseña *</IonLabel>
              <IonInput
                type="password"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}
                placeholder="Mínimo 6 caracteres"
              />
            </IonItem>

            <IonItem>
              <IonLabel position="floating">Confirmar Contraseña *</IonLabel>
              <IonInput
                type="password"
                value={confirmPassword}
                onIonChange={(e) => setConfirmPassword(e.detail.value!)}
                placeholder="Repite tu contraseña"
              />
            </IonItem>

            <IonButton
              expand="block"
              onClick={handleSubmit}
              disabled={loading || !cedula || !nombre || !apellido || !email || !password || !confirmPassword || !telefono}
              style={{ marginTop: '20px' }}
            >
              {loading ? (
                <>
                  <IonIcon icon={timeOutline} slot="start" />
                  Enviando Solicitud...
                </>
              ) : (
                <>
                  <IonIcon icon={checkmarkOutline} slot="start" />
                  Enviar Solicitud
                </>
              )}
            </IonButton>

            <div style={{ marginTop: '15px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
              <IonText color="medium">
                <p style={{ margin: 0, fontSize: '0.85em' }}>
                  <strong>Nota:</strong> Al enviar esta solicitud, aceptas recibir 
                  comunicaciones del Ministerio de Medio Ambiente relacionadas con 
                  el voluntariado. Tus datos serán tratados con confidencialidad.
                </p>
              </IonText>
            </div>
          </IonCardContent>
        </IonCard>

        <IonLoading isOpen={loading} message="Enviando solicitud..." />
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

export default Voluntariado;
