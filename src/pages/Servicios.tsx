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
  IonIcon,
  IonButton,
  IonSpinner,
  IonText,
  IonGrid,
  IonRow,
  IonCol,
  IonSearchbar,
  IonModal,
  IonButtons,
  IonBadge,
  IonChip
} from '@ionic/react';
import {
  searchOutline,
  closeOutline,
  calendarOutline,
  informationCircleOutline,
  callOutline,
  mailOutline,
  locationOutline,
  timeOutline
} from 'ionicons/icons';
import { useState, useEffect } from 'react';
import { getServicios } from '../utils/api';
import './Page.css';

interface Servicio {
  id: string;
  nombre: string;
  descripcion: string;
  icono: string;
  fecha_creacion: string;
}

const Servicios: React.FC = () => {
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [filteredServicios, setFilteredServicios] = useState<Servicio[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [selectedServicio, setSelectedServicio] = useState<Servicio | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    loadServicios();
  }, []);

  useEffect(() => {
    filterServicios();
  }, [searchTerm, servicios]);

  const loadServicios = async () => {
    try {
      setLoading(true);
      const response = await getServicios();
      setServicios(response.data);
      setFilteredServicios(response.data);
      setError('');
    } catch (err: any) {
      console.error('Error cargando servicios:', err);
      
      // Datos mock para pruebas cuando la API no está disponible
      const mockServicios = [
        {
          id: "000001",
          nombre: "Permisos Ambientales",
          descripcion: "Gestión y tramitación de permisos ambientales para proyectos y actividades que impactan el medio ambiente. Incluye evaluación de impacto ambiental, autorizaciones de vertidos, y permisos de explotación de recursos naturales.",
          icono: "🏭",
          fecha_creacion: "2025-01-15 10:00:00"
        },
        {
          id: "000002",
          nombre: "Denuncias Ambientales",
          descripcion: "Recepción y seguimiento de denuncias sobre daños al medio ambiente. Sistema de reportes ciudadanos para identificar y resolver problemas ambientales en la comunidad.",
          icono: "📢",
          fecha_creacion: "2025-01-15 10:00:00"
        },
        {
          id: "000003",
          nombre: "Educación Ambiental",
          descripcion: "Programas educativos y de concienciación ambiental para escuelas, comunidades y empresas. Talleres, charlas y materiales educativos sobre protección ambiental.",
          icono: "📚",
          fecha_creacion: "2025-01-14 15:30:00"
        },
        {
          id: "000004",
          nombre: "Monitoreo de Calidad del Aire",
          descripcion: "Sistema de monitoreo continuo de la calidad del aire en diferentes zonas del país. Informes periódicos y alertas cuando se superan los límites establecidos.",
          icono: "🌬️",
          fecha_creacion: "2025-01-14 09:15:00"
        },
        {
          id: "000005",
          nombre: "Gestión de Residuos",
          descripcion: "Asesoría y supervisión en la gestión integral de residuos sólidos. Incluye planes de manejo, reciclaje y disposición final de residuos.",
          icono: "♻️",
          fecha_creacion: "2025-01-13 14:20:00"
        },
        {
          id: "000006",
          nombre: "Protección de Áreas Protegidas",
          descripcion: "Conservación y manejo de parques nacionales, reservas científicas y otras áreas protegidas. Control de acceso y actividades permitidas.",
          icono: "🌿",
          fecha_creacion: "2025-01-13 11:45:00"
        },
        {
          id: "000007",
          nombre: "Control de Contaminación",
          descripcion: "Inspección y control de fuentes de contaminación industrial, comercial y doméstica. Medidas correctivas y sanciones cuando sea necesario.",
          icono: "🔍",
          fecha_creacion: "2025-01-12 16:30:00"
        },
        {
          id: "000008",
          nombre: "Asesoría Técnica",
          descripcion: "Asesoría técnica especializada en temas ambientales para empresas, instituciones y particulares. Consultoría en normativas y mejores prácticas.",
          icono: "⚙️",
          fecha_creacion: "2025-01-12 10:00:00"
        }
      ];
      
      setServicios(mockServicios);
      setFilteredServicios(mockServicios);
      setError('Usando datos de demostración (API no disponible)');
    } finally {
      setLoading(false);
    }
  };

  const filterServicios = () => {
    if (searchTerm.trim() === '') {
      setFilteredServicios(servicios);
    } else {
      const filtered = servicios.filter(servicio =>
        servicio.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        servicio.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredServicios(filtered);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-DO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getServicioIcon = (icono: string) => {
    // Si el icono es un emoji, lo mostramos directamente
    if (icono.match(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u)) {
      return icono;
    }
    // Si no, usamos un icono por defecto
    return '🏛️';
  };

  const handleContactar = (servicio: Servicio) => {
    // Aquí se podría abrir un modal de contacto o redirigir a un formulario
    alert(`Para más información sobre ${servicio.nombre}, contacta al Ministerio de Medio Ambiente.`);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Servicios del Ministerio</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Servicios del Ministerio</IonTitle>
          </IonToolbar>
        </IonHeader>

        {/* Barra de búsqueda */}
        <IonSearchbar
          value={searchTerm}
          onIonInput={(e) => setSearchTerm(e.detail.value!)}
          placeholder="Buscar servicios..."
          showClearButton="focus"
          debounce={500}
        />

        {/* Estado de carga */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <IonSpinner name="crescent" />
            <p>Cargando servicios...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <IonCard color={error.includes('demostración') ? 'warning' : 'danger'}>
            <IonCardContent>
              <IonText color="light">
                <p>{error}</p>
                {!error.includes('demostración') && (
                  <IonButton fill="outline" color="light" onClick={loadServicios}>
                    Reintentar
                  </IonButton>
                )}
              </IonText>
            </IonCardContent>
          </IonCard>
        )}

        {/* Lista de servicios */}
        {!loading && !error && (
          <IonGrid>
            <IonRow>
              {filteredServicios.map((servicio) => (
                <IonCol size="12" sizeMd="6" sizeLg="4" key={servicio.id}>
                  <IonCard 
                    style={{ 
                      height: '100%', 
                      display: 'flex', 
                      flexDirection: 'column',
                      cursor: 'pointer'
                    }}
                    onClick={() => setSelectedServicio(servicio)}
                  >
                    <IonCardHeader>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '10px',
                        marginBottom: '10px'
                      }}>
                        <span style={{ fontSize: '2em' }}>
                          {getServicioIcon(servicio.icono)}
                        </span>
                        <IonCardTitle style={{ fontSize: '1.1em', margin: 0 }}>
                          {servicio.nombre}
                        </IonCardTitle>
                      </div>
                    </IonCardHeader>
                    <IonCardContent style={{ flex: 1 }}>
                      <p style={{ 
                        fontSize: '0.9em', 
                        lineHeight: '1.4', 
                        color: '#666',
                        marginBottom: '15px'
                      }}>
                        {servicio.descripcion.length > 120 
                          ? `${servicio.descripcion.substring(0, 120)}...`
                          : servicio.descripcion
                        }
                      </p>
                      
                      <div style={{ marginTop: 'auto' }}>
                        <IonChip color="primary" size="small">
                          <IonIcon icon={calendarOutline} />
                          <IonLabel>{formatDate(servicio.fecha_creacion)}</IonLabel>
                        </IonChip>
                      </div>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        )}

        {/* Mensaje cuando no hay resultados */}
        {!loading && !error && filteredServicios.length === 0 && (
          <IonCard>
            <IonCardContent>
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <IonIcon icon={searchOutline} size="large" style={{ color: '#ccc' }} />
                <p>No se encontraron servicios con los criterios de búsqueda</p>
              </div>
            </IonCardContent>
          </IonCard>
        )}

        {/* Modal con detalles del servicio */}
        <IonModal isOpen={!!selectedServicio} onDidDismiss={() => setSelectedServicio(null)}>
          {selectedServicio && (
            <>
              <IonHeader>
                <IonToolbar>
                  <IonButtons slot="start">
                    <IonButton onClick={() => setSelectedServicio(null)}>
                      <IonIcon icon={closeOutline} />
                    </IonButton>
                  </IonButtons>
                  <IonTitle>Detalles del Servicio</IonTitle>
                </IonToolbar>
              </IonHeader>
              <IonContent>
                <IonCard>
                  <IonCardHeader>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '15px',
                      marginBottom: '10px'
                    }}>
                      <span style={{ fontSize: '3em' }}>
                        {getServicioIcon(selectedServicio.icono)}
                      </span>
                      <div>
                        <IonCardTitle style={{ fontSize: '1.3em', margin: 0 }}>
                          {selectedServicio.nombre}
                        </IonCardTitle>
                        <IonBadge color="primary" style={{ marginTop: '5px' }}>
                          <IonIcon icon={calendarOutline} />
                          {formatDate(selectedServicio.fecha_creacion)}
                        </IonBadge>
                      </div>
                    </div>
                  </IonCardHeader>
                  <IonCardContent>
                    <p style={{ 
                      fontSize: '1.1em', 
                      lineHeight: '1.6', 
                      marginBottom: '20px',
                      color: '#333'
                    }}>
                      {selectedServicio.descripcion}
                    </p>

                    <div style={{ marginBottom: '20px' }}>
                      <h4 style={{ marginBottom: '10px', color: '#4CAF50' }}>
                        <IonIcon icon={informationCircleOutline} /> Información del Servicio
                      </h4>
                      <IonItem lines="none">
                        <IonIcon icon={timeOutline} slot="start" color="primary" />
                        <IonLabel>
                          <h3>Horario de Atención</h3>
                          <p>Lunes a Viernes: 8:00 AM - 5:00 PM</p>
                        </IonLabel>
                      </IonItem>
                      <IonItem lines="none">
                        <IonIcon icon={locationOutline} slot="start" color="primary" />
                        <IonLabel>
                          <h3>Ubicación</h3>
                          <p>Av. Cayetano Germosén, Santo Domingo, RD</p>
                        </IonLabel>
                      </IonItem>
                      <IonItem lines="none">
                        <IonIcon icon={callOutline} slot="start" color="primary" />
                        <IonLabel>
                          <h3>Teléfono</h3>
                          <p>+1 (809) 567-4300</p>
                        </IonLabel>
                      </IonItem>
                      <IonItem lines="none">
                        <IonIcon icon={mailOutline} slot="start" color="primary" />
                        <IonLabel>
                          <h3>Email</h3>
                          <p>info@medioambiente.gob.do</p>
                        </IonLabel>
                      </IonItem>
                    </div>

                    <IonButton 
                      expand="block" 
                      color="primary"
                      onClick={() => handleContactar(selectedServicio)}
                      style={{ marginBottom: '10px' }}
                    >
                      <IonIcon icon={callOutline} slot="start" />
                      Contactar sobre este Servicio
                    </IonButton>
                    
                    <IonButton 
                      expand="block" 
                      fill="outline"
                      onClick={() => setSelectedServicio(null)}
                    >
                      Cerrar
                    </IonButton>
                  </IonCardContent>
                </IonCard>
              </IonContent>
            </>
          )}
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Servicios;
