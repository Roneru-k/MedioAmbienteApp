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
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonIcon,
  IonSearchbar,
  IonChip,
  IonBadge,
  IonModal,
  IonButtons,
  IonSpinner,
  IonToast,
  IonLoading,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonFab,
  IonFabButton,
  IonSelect,
  IonSelectOption,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonNote,
  IonSkeletonText,
  IonImg,
  IonThumbnail,
  IonBackButton
} from '@ionic/react';
import {
  listOutline,
  searchOutline,
  filterOutline,
  closeOutline,
  refreshOutline,
  warningOutline,
  checkmarkCircleOutline,
  timeOutline,
  locationOutline,
  documentTextOutline,
  imageOutline,
  calendarOutline,
  arrowBackOutline,
  eyeOutline,
  mapOutline,
  informationCircleOutline,
  alertCircleOutline,
  checkmarkOutline,
  closeCircleOutline,
  hourglassOutline
} from 'ionicons/icons';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getMisReportes, getReporteById } from '../utils/api';
import './Page.css';

interface Reporte {
  id: string;
  codigo: string;
  titulo: string;
  descripcion: string;
  foto: string;
  latitud: number;
  longitud: number;
  estado: 'pendiente' | 'en_revision' | 'resuelto' | 'rechazado';
  comentario_ministerio: string;
  fecha: string;
}

const MisReportes: React.FC = () => {
  const [reportes, setReportes] = useState<Reporte[]>([]);
  const [filteredReportes, setFilteredReportes] = useState<Reporte[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEstado, setSelectedEstado] = useState<string>('');
  const [selectedReporte, setSelectedReporte] = useState<Reporte | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const history = useHistory();

  // Estados disponibles
  const estadosReportes = [
    { value: '', label: 'Todos los estados', icon: listOutline, color: 'medium' },
    { value: 'pendiente', label: 'Pendiente', icon: hourglassOutline, color: 'warning' },
    { value: 'en_revision', label: 'En Revisión', icon: timeOutline, color: 'primary' },
    { value: 'resuelto', label: 'Resuelto', icon: checkmarkCircleOutline, color: 'success' },
    { value: 'rechazado', label: 'Rechazado', icon: closeCircleOutline, color: 'danger' }
  ];

  // Obtener icono por estado
  const getEstadoIcon = (estado: string) => {
    const estadoObj = estadosReportes.find(e => e.value === estado);
    return estadoObj ? estadoObj.icon : hourglassOutline;
  };

  // Obtener color por estado
  const getEstadoColor = (estado: string) => {
    const estadoObj = estadosReportes.find(e => e.value === estado);
    return estadoObj ? estadoObj.color : 'medium';
  };

  // Obtener label por estado
  const getEstadoLabel = (estado: string) => {
    const estadoObj = estadosReportes.find(e => e.value === estado);
    return estadoObj ? estadoObj.label : 'Desconocido';
  };

  // Cargar reportes
  const loadReportes = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await getMisReportes();
      setReportes(response.data);
      setFilteredReportes(response.data);
      
    } catch (error: any) {
      console.error('Error al cargar reportes:', error);
      if (error.response?.status === 401) {
        setError('No tienes autorización para ver tus reportes. Inicia sesión nuevamente.');
        setToastMsg('Error de autenticación. Redirigiendo al login...');
        setTimeout(() => {
          history.push('/login');
        }, 3000);
      } else {
        setError('Error al cargar tus reportes. Intenta de nuevo.');
        setToastMsg('Error de conexión. Verifica tu conexión a internet.');
      }
      
      // Datos de ejemplo para desarrollo
      setReportes([
        {
          id: '1',
          codigo: 'RPT-2024-001',
          titulo: 'Contaminación en río Ozama',
          descripcion: 'Se observa acumulación de basura y desechos industriales en las orillas del río Ozama, específicamente en la zona de Santo Domingo Este.',
          foto: 'https://via.placeholder.com/400x300/4CAF50/FFFFFF?text=Contaminación+Río',
          latitud: 18.4861,
          longitud: -69.9312,
          estado: 'pendiente',
          comentario_ministerio: '',
          fecha: '2024-12-15T10:30:00.000Z'
        },
        {
          id: '2',
          codigo: 'RPT-2024-002',
          titulo: 'Deforestación en Parque Nacional',
          descripcion: 'Se detectó tala ilegal de árboles en el Parque Nacional Los Haitises. El área afectada es aproximadamente de 2 hectáreas.',
          foto: 'https://via.placeholder.com/400x300/FF9800/FFFFFF?text=Deforestación',
          latitud: 19.0333,
          longitud: -69.3833,
          estado: 'en_revision',
          comentario_ministerio: 'Reporte recibido. Equipo de inspección asignado para verificación in situ.',
          fecha: '2024-12-10T14:20:00.000Z'
        },
        {
          id: '3',
          codigo: 'RPT-2024-003',
          titulo: 'Vertido de químicos en playa',
          descripcion: 'Se observa vertido de sustancias químicas en la playa de Boca Chica. El agua presenta coloración anormal.',
          foto: 'https://via.placeholder.com/400x300/2196F3/FFFFFF?text=Vertido+Químicos',
          latitud: 18.4539,
          longitud: -69.6089,
          estado: 'resuelto',
          comentario_ministerio: 'Problema resuelto. Se identificó la fuente del vertido y se aplicaron las sanciones correspondientes.',
          fecha: '2024-12-05T09:15:00.000Z'
        },
        {
          id: '4',
          codigo: 'RPT-2024-004',
          titulo: 'Acumulación de residuos sólidos',
          descripcion: 'Gran acumulación de residuos sólidos en el vertedero de Duquesa. Se requiere atención inmediata.',
          foto: 'https://via.placeholder.com/400x300/9C27B0/FFFFFF?text=Residuos+Sólidos',
          latitud: 18.5200,
          longitud: -70.0000,
          estado: 'rechazado',
          comentario_ministerio: 'Reporte rechazado. El área mencionada está bajo gestión municipal.',
          fecha: '2024-12-01T16:45:00.000Z'
        },
        {
          id: '5',
          codigo: 'RPT-2024-005',
          titulo: 'Contaminación del aire en zona industrial',
          descripcion: 'Emisiones excesivas de humo y partículas en la zona industrial de Haina. Afecta la calidad del aire.',
          foto: 'https://via.placeholder.com/400x300/607D8B/FFFFFF?text=Contaminación+Aire',
          latitud: 18.4167,
          longitud: -70.0333,
          estado: 'pendiente',
          comentario_ministerio: '',
          fecha: '2024-11-28T11:30:00.000Z'
        }
      ]);
      setFilteredReportes([
        {
          id: '1',
          codigo: 'RPT-2024-001',
          titulo: 'Contaminación en río Ozama',
          descripcion: 'Se observa acumulación de basura y desechos industriales en las orillas del río Ozama, específicamente en la zona de Santo Domingo Este.',
          foto: 'https://via.placeholder.com/400x300/4CAF50/FFFFFF?text=Contaminación+Río',
          latitud: 18.4861,
          longitud: -69.9312,
          estado: 'pendiente',
          comentario_ministerio: '',
          fecha: '2024-12-15T10:30:00.000Z'
        },
        {
          id: '2',
          codigo: 'RPT-2024-002',
          titulo: 'Deforestación en Parque Nacional',
          descripcion: 'Se detectó tala ilegal de árboles en el Parque Nacional Los Haitises. El área afectada es aproximadamente de 2 hectáreas.',
          foto: 'https://via.placeholder.com/400x300/FF9800/FFFFFF?text=Deforestación',
          latitud: 19.0333,
          longitud: -69.3833,
          estado: 'en_revision',
          comentario_ministerio: 'Reporte recibido. Equipo de inspección asignado para verificación in situ.',
          fecha: '2024-12-10T14:20:00.000Z'
        },
        {
          id: '3',
          codigo: 'RPT-2024-003',
          titulo: 'Vertido de químicos en playa',
          descripcion: 'Se observa vertido de sustancias químicas en la playa de Boca Chica. El agua presenta coloración anormal.',
          foto: 'https://via.placeholder.com/400x300/2196F3/FFFFFF?text=Vertido+Químicos',
          latitud: 18.4539,
          longitud: -69.6089,
          estado: 'resuelto',
          comentario_ministerio: 'Problema resuelto. Se identificó la fuente del vertido y se aplicaron las sanciones correspondientes.',
          fecha: '2024-12-05T09:15:00.000Z'
        },
        {
          id: '4',
          codigo: 'RPT-2024-004',
          titulo: 'Acumulación de residuos sólidos',
          descripcion: 'Gran acumulación de residuos sólidos en el vertedero de Duquesa. Se requiere atención inmediata.',
          foto: 'https://via.placeholder.com/400x300/9C27B0/FFFFFF?text=Residuos+Sólidos',
          latitud: 18.5200,
          longitud: -70.0000,
          estado: 'rechazado',
          comentario_ministerio: 'Reporte rechazado. El área mencionada está bajo gestión municipal.',
          fecha: '2024-12-01T16:45:00.000Z'
        },
        {
          id: '5',
          codigo: 'RPT-2024-005',
          titulo: 'Contaminación del aire en zona industrial',
          descripcion: 'Emisiones excesivas de humo y partículas en la zona industrial de Haina. Afecta la calidad del aire.',
          foto: 'https://via.placeholder.com/400x300/607D8B/FFFFFF?text=Contaminación+Aire',
          latitud: 18.4167,
          longitud: -70.0333,
          estado: 'pendiente',
          comentario_ministerio: '',
          fecha: '2024-11-28T11:30:00.000Z'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Filtrar reportes
  const filterReportes = () => {
    let filtered = reportes;

    // Filtrar por estado
    if (selectedEstado) {
      filtered = filtered.filter(reporte => reporte.estado === selectedEstado);
    }

    // Filtrar por búsqueda
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(reporte =>
        reporte.titulo.toLowerCase().includes(term) ||
        reporte.descripcion.toLowerCase().includes(term) ||
        reporte.codigo.toLowerCase().includes(term)
      );
    }

    setFilteredReportes(filtered);
  };

  // Efectos
  useEffect(() => {
    loadReportes();
  }, []);

  useEffect(() => {
    filterReportes();
  }, [selectedEstado, searchTerm, reportes]);

  // Abrir modal con detalles
  const openReporteDetails = (reporte: Reporte) => {
    setSelectedReporte(reporte);
    setShowModal(true);
  };

  // Formatear fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-DO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Formatear coordenadas
  const formatCoordinates = (lat: number, lng: number) => {
    return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
  };

  // Obtener contador por estado
  const getEstadoCount = (estado: string) => {
    return reportes.filter(reporte => reporte.estado === estado).length;
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" icon={arrowBackOutline} />
          </IonButtons>
          <IonTitle>Mis Reportes 📋</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={loadReportes} disabled={loading}>
              <IonIcon icon={refreshOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {/* Filtros */}
        <IonCard style={{ margin: '16px' }}>
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={filterOutline} /> Filtros
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                <IonCol size="12" sizeMd="6">
                  <IonSearchbar
                    value={searchTerm}
                    onIonChange={(e) => setSearchTerm(e.detail.value!)}
                    placeholder="Buscar reportes..."
                    showClearButton="focus"
                    style={{ marginBottom: '16px' }}
                  />
                </IonCol>
                <IonCol size="12" sizeMd="6">
                  <IonSelect
                    value={selectedEstado}
                    onIonChange={(e) => setSelectedEstado(e.detail.value)}
                    placeholder="Filtrar por estado"
                    interface="popover"
                    style={{ marginBottom: '16px' }}
                  >
                    {estadosReportes.map((estado) => (
                      <IonSelectOption key={estado.value} value={estado.value}>
                        {estado.label}
                      </IonSelectOption>
                    ))}
                  </IonSelect>
                </IonCol>
              </IonRow>
            </IonGrid>

            {/* Contador de resultados */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginTop: '8px'
            }}>
              <IonText color="medium">
                {filteredReportes.length} reporte{filteredReportes.length !== 1 ? 's' : ''} encontrado{filteredReportes.length !== 1 ? 's' : ''}
              </IonText>
              {(selectedEstado || searchTerm) && (
                <IonButton
                  fill="clear"
                  size="small"
                  onClick={() => {
                    setSelectedEstado('');
                    setSearchTerm('');
                  }}
                >
                  Limpiar filtros
                </IonButton>
              )}
            </div>
          </IonCardContent>
        </IonCard>

        {/* Estadísticas rápidas */}
        <IonCard style={{ margin: '0 16px 16px 16px' }}>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                <IonCol size="6" sizeMd="3">
                                     <div style={{ textAlign: 'center', padding: '8px' }}>
                     <IonChip color="warning">
                       <IonIcon icon={hourglassOutline} />
                       <IonLabel>{getEstadoCount('pendiente')}</IonLabel>
                     </IonChip>
                     <p style={{ margin: '4px 0 0 0', fontSize: '0.8em', color: '#666' }}>Pendientes</p>
                   </div>
                </IonCol>
                <IonCol size="6" sizeMd="3">
                  <div style={{ textAlign: 'center', padding: '8px' }}>
                    <IonChip color="primary">
                      <IonIcon icon={timeOutline} />
                      <IonLabel>{getEstadoCount('en_revision')}</IonLabel>
                    </IonChip>
                    <p style={{ margin: '4px 0 0 0', fontSize: '0.8em', color: '#666' }}>En Revisión</p>
                  </div>
                </IonCol>
                <IonCol size="6" sizeMd="3">
                  <div style={{ textAlign: 'center', padding: '8px' }}>
                    <IonChip color="success">
                      <IonIcon icon={checkmarkCircleOutline} />
                      <IonLabel>{getEstadoCount('resuelto')}</IonLabel>
                    </IonChip>
                    <p style={{ margin: '4px 0 0 0', fontSize: '0.8em', color: '#666' }}>Resueltos</p>
                  </div>
                </IonCol>
                <IonCol size="6" sizeMd="3">
                  <div style={{ textAlign: 'center', padding: '8px' }}>
                    <IonChip color="danger">
                      <IonIcon icon={closeCircleOutline} />
                      <IonLabel>{getEstadoCount('rechazado')}</IonLabel>
                    </IonChip>
                    <p style={{ margin: '4px 0 0 0', fontSize: '0.8em', color: '#666' }}>Rechazados</p>
                  </div>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>

        {/* Lista de reportes */}
        {loading ? (
          <div style={{ padding: '16px' }}>
            {[...Array(5)].map((_, index) => (
              <IonCard key={index} style={{ marginBottom: '16px' }}>
                <IonCardContent>
                  <IonSkeletonText animated style={{ width: '60%', height: '20px', marginBottom: '8px' }} />
                  <IonSkeletonText animated style={{ width: '40%', height: '16px', marginBottom: '12px' }} />
                  <IonSkeletonText animated style={{ width: '100%', height: '16px', marginBottom: '4px' }} />
                  <IonSkeletonText animated style={{ width: '80%', height: '16px' }} />
                </IonCardContent>
              </IonCard>
            ))}
          </div>
        ) : error ? (
          <IonCard style={{ margin: '16px' }}>
            <IonCardContent style={{ textAlign: 'center', padding: '32px' }}>
              <IonIcon 
                icon={warningOutline} 
                style={{ fontSize: '48px', color: '#ff6b35', marginBottom: '16px' }} 
              />
              <h3 style={{ color: '#ff6b35', marginBottom: '8px' }}>Error</h3>
              <p style={{ color: '#666', margin: 0 }}>{error}</p>
              <IonButton 
                fill="outline" 
                style={{ marginTop: '16px' }}
                onClick={loadReportes}
              >
                Reintentar
              </IonButton>
            </IonCardContent>
          </IonCard>
        ) : filteredReportes.length === 0 ? (
          <IonCard style={{ margin: '16px' }}>
            <IonCardContent style={{ textAlign: 'center', padding: '32px' }}>
              <IonIcon 
                icon={searchOutline} 
                style={{ fontSize: '48px', color: '#666', marginBottom: '16px' }} 
              />
              <h3 style={{ color: '#666', marginBottom: '8px' }}>No se encontraron reportes</h3>
              <p style={{ color: '#666', margin: 0 }}>
                {searchTerm || selectedEstado 
                  ? 'Intenta ajustar los filtros de búsqueda'
                  : 'No tienes reportes registrados. ¡Crea tu primer reporte!'
                }
              </p>
              {!searchTerm && !selectedEstado && (
                <IonButton 
                  fill="outline" 
                  style={{ marginTop: '16px' }}
                  onClick={() => history.push('/reportar')}
                >
                  Crear Reporte
                </IonButton>
              )}
            </IonCardContent>
          </IonCard>
        ) : (
          <div style={{ padding: '0 16px 16px 16px' }}>
            {filteredReportes.map((reporte) => (
              <IonCard key={reporte.id} style={{ marginBottom: '16px' }}>
                <IonCardContent>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ 
                        margin: '0 0 8px 0', 
                        fontSize: '1.1em', 
                        fontWeight: '600',
                        color: '#333',
                        lineHeight: '1.3'
                      }}>
                        {reporte.titulo}
                      </h3>
                      
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
                        <IonChip color={getEstadoColor(reporte.estado)}>
                          <IonIcon icon={getEstadoIcon(reporte.estado)} />
                          <IonLabel>{getEstadoLabel(reporte.estado)}</IonLabel>
                        </IonChip>
                        
                        <IonChip color="medium">
                          <IonIcon icon={documentTextOutline} />
                          <IonLabel>{reporte.codigo}</IonLabel>
                        </IonChip>
                        
                        <IonChip color="light">
                          <IonIcon icon={calendarOutline} />
                          <IonLabel>{formatDate(reporte.fecha)}</IonLabel>
                        </IonChip>
                      </div>
                    </div>
                  </div>

                  <p style={{ 
                    margin: '0 0 16px 0', 
                    color: '#666', 
                    fontSize: '0.9em',
                    lineHeight: '1.5'
                  }}>
                    {reporte.descripcion.length > 150 
                      ? `${reporte.descripcion.substring(0, 150)}...`
                      : reporte.descripcion
                    }
                  </p>

                  {/* Vista previa de la foto */}
                  {reporte.foto && (
                    <div style={{ marginBottom: '16px' }}>
                      <IonThumbnail style={{ width: '100%', height: '120px', borderRadius: '8px' }}>
                        <IonImg src={reporte.foto} alt="Foto del reporte" />
                      </IonThumbnail>
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <IonButton
                      fill="outline"
                      size="small"
                      onClick={() => openReporteDetails(reporte)}
                    >
                      <IonIcon icon={eyeOutline} slot="start" />
                      Ver Detalles
                    </IonButton>
                    
                    <IonButton
                      fill="outline"
                      size="small"
                      color="secondary"
                      onClick={() => history.push(`/mapa-reportes?lat=${reporte.latitud}&lng=${reporte.longitud}`)}
                    >
                      <IonIcon icon={mapOutline} slot="start" />
                      Ver en Mapa
                    </IonButton>
                  </div>
                </IonCardContent>
              </IonCard>
            ))}
          </div>
        )}

        {/* Modal de detalles */}
        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Detalles del Reporte</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setShowModal(false)}>
                  <IonIcon icon={closeOutline} />
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>

          <IonContent className="ion-padding">
            {selectedReporte && (
              <div>
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle style={{ fontSize: '1.2em', marginBottom: '16px' }}>
                      {selectedReporte.titulo}
                    </IonCardTitle>
                    
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                      <IonChip color={getEstadoColor(selectedReporte.estado)}>
                        <IonIcon icon={getEstadoIcon(selectedReporte.estado)} />
                        <IonLabel>{getEstadoLabel(selectedReporte.estado)}</IonLabel>
                      </IonChip>
                      
                      <IonChip color="medium">
                        <IonIcon icon={documentTextOutline} />
                        <IonLabel>{selectedReporte.codigo}</IonLabel>
                      </IonChip>
                      
                      <IonChip color="light">
                        <IonIcon icon={calendarOutline} />
                        <IonLabel>{formatDate(selectedReporte.fecha)}</IonLabel>
                      </IonChip>
                    </div>
                  </IonCardHeader>

                  <IonCardContent>
                    <h4 style={{ margin: '0 0 12px 0', color: '#333', fontWeight: '600' }}>
                      Descripción
                    </h4>
                    <p style={{ 
                      margin: '0 0 20px 0', 
                      color: '#666', 
                      lineHeight: '1.6',
                      fontSize: '0.95em'
                    }}>
                      {selectedReporte.descripcion}
                    </p>

                    {/* Foto */}
                    {selectedReporte.foto && (
                      <div style={{ marginBottom: '20px' }}>
                        <h4 style={{ margin: '0 0 12px 0', color: '#333', fontWeight: '600' }}>
                          <IonIcon icon={imageOutline} style={{ marginRight: '8px' }} />
                          Evidencia Fotográfica
                        </h4>
                        <IonThumbnail style={{ width: '100%', height: '200px', borderRadius: '8px' }}>
                          <IonImg src={selectedReporte.foto} alt="Foto del reporte" />
                        </IonThumbnail>
                      </div>
                    )}

                    {/* Ubicación */}
                    <div style={{ marginBottom: '20px' }}>
                      <h4 style={{ margin: '0 0 12px 0', color: '#333', fontWeight: '600' }}>
                        <IonIcon icon={locationOutline} style={{ marginRight: '8px' }} />
                        Ubicación
                      </h4>
                      <p style={{ margin: '0 0 8px 0', color: '#666' }}>
                        <strong>Coordenadas:</strong> {formatCoordinates(selectedReporte.latitud, selectedReporte.longitud)}
                      </p>
                      <IonButton
                        fill="outline"
                        size="small"
                        onClick={() => {
                          setShowModal(false);
                          history.push(`/mapa-reportes?lat=${selectedReporte.latitud}&lng=${selectedReporte.longitud}`);
                        }}
                      >
                        <IonIcon icon={mapOutline} slot="start" />
                        Ver en Mapa
                      </IonButton>
                    </div>

                    {/* Comentario del Ministerio */}
                    {selectedReporte.comentario_ministerio && (
                      <div style={{ 
                        marginTop: '20px',
                        padding: '16px',
                        backgroundColor: '#f8f9fa',
                        borderRadius: '8px',
                        border: '1px solid #e9ecef'
                      }}>
                        <h4 style={{ margin: '0 0 12px 0', color: '#333', fontWeight: '600' }}>
                          <IonIcon icon={informationCircleOutline} style={{ marginRight: '8px' }} />
                          Comentario del Ministerio
                        </h4>
                        <p style={{ 
                          margin: 0, 
                          color: '#666', 
                          lineHeight: '1.5',
                          fontSize: '0.95em'
                        }}>
                          {selectedReporte.comentario_ministerio}
                        </p>
                      </div>
                    )}
                  </IonCardContent>
                </IonCard>
              </div>
            )}
          </IonContent>
        </IonModal>

        {/* FAB para crear nuevo reporte */}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => history.push('/reportar')}>
            <IonIcon icon={documentTextOutline} />
          </IonFabButton>
        </IonFab>

        {/* Toast para mensajes */}
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

export default MisReportes;
