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
  IonImg,
  IonButton,
  IonIcon,
  IonChip,
  IonSearchbar,
  IonList,
  IonSpinner,
  IonText,
  IonBadge,
  IonModal,
  IonButtons,
  IonGrid,
  IonRow,
  IonCol,
  IonFab,
  IonFabButton,
  IonFabList,
  IonToast
} from '@ionic/react';
import {
  listOutline,
  searchOutline,
  closeOutline,
  timeOutline,
  locationOutline,
  warningOutline,
  checkmarkOutline,
  closeCircleOutline,
  addOutline,
  eyeOutline,
  trashOutline
} from 'ionicons/icons';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getMisReportes } from '../utils/api';
import storage from '../utils/storage';
import './Page.css';

interface Reporte {
  id: number;
  codigo: string;
  titulo: string;
  descripcion: string;
  foto: string;
  latitud: number;
  longitud: number;
  categoria: string;
  estado: 'pendiente' | 'en_revision' | 'aprobado' | 'rechazado' | 'resuelto';
  fecha: string;
  comentario_ministerio?: string;
  fecha_actualizacion?: string;
}

const MisReportes: React.FC = () => {
  const history = useHistory();
  const [reportes, setReportes] = useState<Reporte[]>([]);
  const [filteredReportes, setFilteredReportes] = useState<Reporte[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedEstado, setSelectedEstado] = useState<string>('todos');
  const [loading, setLoading] = useState(true);
  const [selectedReporte, setSelectedReporte] = useState<Reporte | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    loadReportes();
  }, []);

  useEffect(() => {
    filterReportes();
  }, [searchTerm, selectedEstado, reportes]);

  const loadReportes = async () => {
    try {
      setLoading(true);
      const response = await getMisReportes();
      setReportes(response.data);
      setFilteredReportes(response.data);
      setError('');
    } catch (err: any) {
      console.error('Error cargando reportes:', err);
      if (err.response?.status === 401) {
        setError('Debes iniciar sesión para ver tus reportes');
        history.push('/login');
      } else {
        setError('Error al cargar los reportes. Por favor, intenta de nuevo.');
      }
    } finally {
      setLoading(false);
    }
  };

  const filterReportes = () => {
    let filtered = reportes;

    // Filtrar por búsqueda
    if (searchTerm.trim()) {
      filtered = filtered.filter(reporte =>
        reporte.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reporte.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reporte.codigo.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por estado
    if (selectedEstado !== 'todos') {
      filtered = filtered.filter(reporte => reporte.estado === selectedEstado);
    }

    setFilteredReportes(filtered);
  };

  const handleDeleteReporte = async (id: number) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este reporte?')) {
      return;
    }

    try {
      // Note: Delete endpoint is not available in the API documentation
      // For now, we'll just show a message
      setToastMsg('Función de eliminación no disponible en este momento');
    } catch (error: any) {
      console.error('Error eliminando reporte:', error);
      setToastMsg('Error al eliminar el reporte');
    }
  };

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

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'pendiente': return 'warning';
      case 'en_revision': return 'primary';
      case 'aprobado': return 'success';
      case 'rechazado': return 'danger';
      case 'resuelto': return 'success';
      default: return 'medium';
    }
  };

  const getEstadoIcon = (estado: string) => {
    switch (estado) {
      case 'pendiente': return timeOutline;
      case 'en_revision': return timeOutline;
      case 'aprobado': return checkmarkOutline;
      case 'rechazado': return closeCircleOutline;
      case 'resuelto': return checkmarkOutline;
      default: return timeOutline;
    }
  };

  const getEstadoText = (estado: string) => {
    switch (estado) {
      case 'pendiente': return 'Pendiente';
      case 'en_revision': return 'En Revisión';
      case 'aprobado': return 'Aprobado';
      case 'rechazado': return 'Rechazado';
      case 'resuelto': return 'Resuelto';
      default: return estado;
    }
  };

  const [toastMsg, setToastMsg] = useState('');

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mis Reportes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Mis Reportes</IonTitle>
          </IonToolbar>
        </IonHeader>

        {/* Barra de búsqueda */}
        <IonSearchbar
          value={searchTerm}
          onIonInput={(e) => setSearchTerm(e.detail.value!)}
          placeholder="Buscar reportes..."
          showClearButton="focus"
        />

        {/* Filtros por estado */}
        <div style={{ padding: '10px', overflowX: 'auto' }}>
          <div style={{ display: 'flex', gap: '8px', minWidth: 'max-content' }}>
            <IonChip
              color={selectedEstado === 'todos' ? 'primary' : 'medium'}
              onClick={() => setSelectedEstado('todos')}
              style={{ cursor: 'pointer' }}
            >
              Todos
            </IonChip>
            <IonChip
              color={selectedEstado === 'pendiente' ? 'warning' : 'medium'}
              onClick={() => setSelectedEstado('pendiente')}
              style={{ cursor: 'pointer' }}
            >
              Pendientes
            </IonChip>
            <IonChip
              color={selectedEstado === 'en_revision' ? 'primary' : 'medium'}
              onClick={() => setSelectedEstado('en_revision')}
              style={{ cursor: 'pointer' }}
            >
              En Revisión
            </IonChip>
            <IonChip
              color={selectedEstado === 'aprobado' ? 'success' : 'medium'}
              onClick={() => setSelectedEstado('aprobado')}
              style={{ cursor: 'pointer' }}
            >
              Aprobados
            </IonChip>
            <IonChip
              color={selectedEstado === 'resuelto' ? 'success' : 'medium'}
              onClick={() => setSelectedEstado('resuelto')}
              style={{ cursor: 'pointer' }}
            >
              Resueltos
            </IonChip>
            <IonChip
              color={selectedEstado === 'rechazado' ? 'danger' : 'medium'}
              onClick={() => setSelectedEstado('rechazado')}
              style={{ cursor: 'pointer' }}
            >
              Rechazados
            </IonChip>
          </div>
        </div>

        {/* Estado de carga */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <IonSpinner name="crescent" />
            <p>Cargando reportes...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <IonCard color="danger">
            <IonCardContent>
              <IonText color="light">
                <p>{error}</p>
                <IonButton fill="outline" color="light" onClick={loadReportes}>
                  Reintentar
                </IonButton>
              </IonText>
            </IonCardContent>
          </IonCard>
        )}

        {/* Lista de reportes */}
        {!loading && !error && (
          <IonList>
            {filteredReportes.map((reporte) => (
              <IonCard key={reporte.id}>
                <IonCardContent>
                  <IonItem button onClick={() => setSelectedReporte(reporte)}>
                    <IonImg 
                      src={reporte.foto || 'https://via.placeholder.com/80x80/4CAF50/FFFFFF?text=Reporte'} 
                      slot="start"
                      style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                      alt={reporte.titulo}
                    />
                    <IonLabel>
                      <h2>{reporte.titulo}</h2>
                      <p style={{ fontSize: '0.9em', marginBottom: '5px' }}>
                        Código: {reporte.codigo}
                      </p>
                      <p style={{ fontSize: '0.8em', color: '#666' }}>
                        {reporte.descripcion.substring(0, 100)}...
                      </p>
                      <div style={{ marginTop: '8px' }}>
                        <IonBadge color={getEstadoColor(reporte.estado)}>
                          <IonIcon icon={getEstadoIcon(reporte.estado)} />
                          {getEstadoText(reporte.estado)}
                        </IonBadge>
                        <IonChip color="medium" style={{ marginLeft: '8px' }}>
                          <IonIcon icon={timeOutline} />
                          <IonLabel>{formatDate(reporte.fecha)}</IonLabel>
                        </IonChip>
                      </div>
                    </IonLabel>
                  </IonItem>
                  
                  {/* Botones de acción */}
                  <IonItem lines="none">
                    <IonButton 
                      fill="clear" 
                      slot="start" 
                      size="small"
                      onClick={() => setSelectedReporte(reporte)}
                    >
                      <IonIcon icon={eyeOutline} />
                      Ver Detalles
                    </IonButton>
                    <IonButton 
                      fill="clear" 
                      slot="end" 
                      size="small"
                      color="danger"
                      onClick={() => handleDeleteReporte(reporte.id)}
                    >
                      <IonIcon icon={trashOutline} />
                      Eliminar
                    </IonButton>
                  </IonItem>
                </IonCardContent>
              </IonCard>
            ))}
          </IonList>
        )}

        {/* Mensaje cuando no hay resultados */}
        {!loading && !error && filteredReportes.length === 0 && (
          <IonCard>
            <IonCardContent>
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <IonIcon icon={searchOutline} size="large" style={{ color: '#ccc' }} />
                <p>No se encontraron reportes con los filtros seleccionados</p>
                {reportes.length === 0 && (
                  <IonButton 
                    fill="outline" 
                    onClick={() => history.push('/reportar')}
                    style={{ marginTop: '10px' }}
                  >
                    <IonIcon icon={addOutline} slot="start" />
                    Crear Primer Reporte
                  </IonButton>
                )}
              </div>
            </IonCardContent>
          </IonCard>
        )}

        {/* Modal con detalles del reporte */}
        <IonModal isOpen={!!selectedReporte} onDidDismiss={() => setSelectedReporte(null)}>
          {selectedReporte && (
            <>
              <IonHeader>
                <IonToolbar>
                  <IonButtons slot="start">
                    <IonButton onClick={() => setSelectedReporte(null)}>
                      <IonIcon icon={closeOutline} />
                    </IonButton>
                  </IonButtons>
                  <IonTitle>Detalles del Reporte</IonTitle>
                </IonToolbar>
              </IonHeader>
              <IonContent>
                <IonCard>
                  <IonImg 
                    src={selectedReporte.foto || 'https://via.placeholder.com/400x200/4CAF50/FFFFFF?text=Reporte'} 
                    alt={selectedReporte.titulo}
                  />
                  <IonCardHeader>
                    <IonCardTitle>{selectedReporte.titulo}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonGrid>
                      <IonRow>
                        <IonCol size="6">
                          <strong>Código:</strong> {selectedReporte.codigo}
                        </IonCol>
                        <IonCol size="6">
                          <strong>Categoría:</strong> {selectedReporte.categoria}
                        </IonCol>
                      </IonRow>
                      <IonRow>
                        <IonCol size="6">
                          <strong>Fecha:</strong> {formatDate(selectedReporte.fecha)}
                        </IonCol>
                        <IonCol size="6">
                          <strong>Estado:</strong>
                          <IonBadge color={getEstadoColor(selectedReporte.estado)} style={{ marginLeft: '5px' }}>
                            {getEstadoText(selectedReporte.estado)}
                          </IonBadge>
                        </IonCol>
                      </IonRow>
                      <IonRow>
                        <IonCol size="6">
                          <strong>Latitud:</strong> {selectedReporte.latitud.toFixed(6)}
                        </IonCol>
                        <IonCol size="6">
                          <strong>Longitud:</strong> {selectedReporte.longitud.toFixed(6)}
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                    
                    <div style={{ marginTop: '15px' }}>
                      <h4>Descripción:</h4>
                      <p style={{ lineHeight: '1.6' }}>{selectedReporte.descripcion}</p>
                    </div>
                    
                    {selectedReporte.comentario_ministerio && (
                      <div style={{ marginTop: '15px' }}>
                        <h4>Comentario del Ministerio:</h4>
                        <p style={{ lineHeight: '1.6', color: '#666' }}>
                          {selectedReporte.comentario_ministerio}
                        </p>
                      </div>
                    )}
                    
                    {selectedReporte.fecha_actualizacion && (
                      <div style={{ marginTop: '15px' }}>
                        <h4>Última Actualización:</h4>
                        <p>{formatDate(selectedReporte.fecha_actualizacion)}</p>
                      </div>
                    )}
                  </IonCardContent>
                </IonCard>
              </IonContent>
            </>
          )}
        </IonModal>

        {/* FAB para crear nuevo reporte */}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => history.push('/reportar')}>
            <IonIcon icon={addOutline} />
          </IonFabButton>
        </IonFab>

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
