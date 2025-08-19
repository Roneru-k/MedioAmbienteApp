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
  IonModal,
  IonList,
  IonSearchbar,
  IonChip,
  IonBadge,
  IonFab,
  IonFabButton,
  IonFabList,
} from '@ionic/react';
import {
  mapOutline,
  locationOutline,
  calendarOutline,
  warningOutline,
  closeOutline,
  searchOutline,
  filterOutline,
  eyeOutline,
  checkmarkCircleOutline,
  timeOutline,
  alertCircleOutline,
} from 'ionicons/icons';
import { useState } from 'react';
import './Page.css';

interface Reporte {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: string;
  estado: 'pendiente' | 'en_revision' | 'resuelto' | 'rechazado';
  latitud: number;
  longitud: number;
  foto: string;
  comentario?: string;
  categoria: string;
  prioridad: 'baja' | 'media' | 'alta' | 'urgente';
}

const MapaReportes: React.FC = () => {
  const [selectedReporte, setSelectedReporte] = useState<Reporte | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedEstado, setSelectedEstado] = useState<string>('todos');
  const [showMap, setShowMap] = useState<boolean>(true);

  const reportes: Reporte[] = [
    {
      id: 1,
      titulo: "Basura en Playa Boca Chica",
      descripcion: "Acumulación de residuos plásticos en la playa que afecta la fauna marina",
      fecha: "15/12/2024",
      estado: "en_revision",
      latitud: 18.4539,
      longitud: -69.6064,
      foto: "https://via.placeholder.com/300x200/FF5722/FFFFFF?text=Basura+Playa",
      comentario: "Equipo de limpieza asignado para el 20/12/2024",
      categoria: "Contaminación Marina",
      prioridad: "alta"
    },
    {
      id: 2,
      titulo: "Tala Ilegal en Parque Nacional",
      descripcion: "Actividad de tala no autorizada en área protegida",
      fecha: "10/12/2024",
      estado: "pendiente",
      latitud: 18.4861,
      longitud: -70.1622,
      foto: "https://via.placeholder.com/300x200/8BC34A/FFFFFF?text=Tala+Ilegal",
      categoria: "Deforestación",
      prioridad: "urgente"
    },
    {
      id: 3,
      titulo: "Vertido de Aguas Residuales",
      descripcion: "Descarga de aguas residuales sin tratamiento al río",
      fecha: "08/12/2024",
      estado: "resuelto",
      latitud: 18.4790,
      longitud: -69.9312,
      foto: "https://via.placeholder.com/300x200/2196F3/FFFFFF?text=Aguas+Residuales",
      comentario: "Problema resuelto. Se instaló sistema de tratamiento",
      categoria: "Contaminación Hídrica",
      prioridad: "alta"
    },
    {
      id: 4,
      titulo: "Quema de Basura",
      descripcion: "Incendio de residuos que genera contaminación atmosférica",
      fecha: "05/12/2024",
      estado: "rechazado",
      latitud: 18.4569,
      longitud: -69.9512,
      foto: "https://via.placeholder.com/300x200/FF9800/FFFFFF?text=Quema+Basura",
      comentario: "Reporte duplicado. Ya fue atendido anteriormente",
      categoria: "Contaminación Atmosférica",
      prioridad: "media"
    },
    {
      id: 5,
      titulo: "Caza Furtiva",
      descripcion: "Actividad de caza no autorizada en área protegida",
      fecha: "03/12/2024",
      estado: "en_revision",
      latitud: 18.5234,
      longitud: -70.1234,
      foto: "https://via.placeholder.com/300x200/9C27B0/FFFFFF?text=Caza+Furtiva",
      comentario: "Guardaparques investigando el caso",
      categoria: "Fauna Silvestre",
      prioridad: "urgente"
    },
    {
      id: 6,
      titulo: "Minería Ilegal",
      descripcion: "Extracción no autorizada de materiales en río",
      fecha: "01/12/2024",
      estado: "pendiente",
      latitud: 18.4567,
      longitud: -69.7890,
      foto: "https://via.placeholder.com/300x200/607D8B/FFFFFF?text=Minería+Ilegal",
      categoria: "Minería Ilegal",
      prioridad: "alta"
    }
  ];

  const estados = [
    { id: 'todos', nombre: 'Todos', color: 'primary' },
    { id: 'pendiente', nombre: 'Pendiente', color: 'warning' },
    { id: 'en_revision', nombre: 'En Revisión', color: 'secondary' },
    { id: 'resuelto', nombre: 'Resuelto', color: 'success' },
    { id: 'rechazado', nombre: 'Rechazado', color: 'danger' }
  ];

  const filteredReportes = reportes.filter(reporte => {
    const matchesEstado = selectedEstado === 'todos' || reporte.estado === selectedEstado;
    const matchesSearch = reporte.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reporte.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reporte.categoria.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesEstado && matchesSearch;
  });

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'pendiente': return 'warning';
      case 'en_revision': return 'secondary';
      case 'resuelto': return 'success';
      case 'rechazado': return 'danger';
      default: return 'medium';
    }
  };

  const getPrioridadColor = (prioridad: string) => {
    switch (prioridad) {
      case 'baja': return 'success';
      case 'media': return 'warning';
      case 'alta': return 'danger';
      case 'urgente': return 'danger';
      default: return 'medium';
    }
  };

  const getEstadoIcon = (estado: string) => {
    switch (estado) {
      case 'pendiente': return timeOutline;
      case 'en_revision': return alertCircleOutline;
      case 'resuelto': return checkmarkCircleOutline;
      case 'rechazado': return closeOutline;
      default: return warningOutline;
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mapa de Reportes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Mapa de Reportes</IonTitle>
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
            {estados.map((estado) => (
              <IonChip
                key={estado.id}
                color={selectedEstado === estado.id ? 'primary' : 'medium'}
                onClick={() => setSelectedEstado(estado.id)}
                style={{ cursor: 'pointer' }}
              >
                {estado.nombre}
              </IonChip>
            ))}
          </div>
        </div>

        {/* Vista de mapa o lista */}
        <div style={{ padding: '10px' }}>
          <IonButton
            fill="outline"
            size="small"
            onClick={() => setShowMap(!showMap)}
          >
            <IonIcon icon={showMap ? mapOutline : listOutline} slot="start" />
            {showMap ? 'Ver Lista' : 'Ver Mapa'}
          </IonButton>
        </div>

        {showMap ? (
          /* Vista de mapa */
          <div style={{ 
            height: '400px', 
            backgroundColor: '#f0f0f0', 
            margin: '10px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}>
            <div style={{ textAlign: 'center' }}>
              <IonIcon icon={mapOutline} size="large" style={{ color: '#ccc', fontSize: '64px' }} />
              <p style={{ color: '#666', marginTop: '10px' }}>Mapa Interactivo</p>
              <p style={{ color: '#999', fontSize: '0.9em' }}>
                Aquí se mostraría el mapa con los reportes marcados
              </p>
            </div>
            
            {/* Marcadores de reportes */}
            {filteredReportes.map((reporte) => (
              <div
                key={reporte.id}
                style={{
                  position: 'absolute',
                  left: `${((reporte.longitud + 70) / 0.4) * 100}%`,
                  top: `${((18.5 - reporte.latitud) / 0.1) * 100}%`,
                  width: '20px',
                  height: '20px',
                  backgroundColor: getEstadoColor(reporte.estado) === 'success' ? '#4CAF50' : 
                                   getEstadoColor(reporte.estado) === 'warning' ? '#FF9800' : 
                                   getEstadoColor(reporte.estado) === 'danger' ? '#F44336' : '#2196F3',
                  borderRadius: '50%',
                  border: '2px solid white',
                  cursor: 'pointer',
                  transform: 'translate(-50%, -50%)'
                }}
                onClick={() => setSelectedReporte(reporte)}
                title={reporte.titulo}
              />
            ))}
          </div>
        ) : (
          /* Vista de lista */
          <IonList>
            {filteredReportes.map((reporte) => (
              <IonCard key={reporte.id}>
                <IonCardContent>
                  <IonItem button onClick={() => setSelectedReporte(reporte)}>
                    <IonIcon icon={getEstadoIcon(reporte.estado)} slot="start" color={getEstadoColor(reporte.estado)} />
                    <IonLabel>
                      <h2>{reporte.titulo}</h2>
                      <p>{reporte.descripcion}</p>
                      <div style={{ marginTop: '8px' }}>
                        <IonBadge color={getEstadoColor(reporte.estado)}>
                          {reporte.estado.replace('_', ' ')}
                        </IonBadge>
                        <IonBadge color={getPrioridadColor(reporte.prioridad)} style={{ marginLeft: '8px' }}>
                          {reporte.prioridad}
                        </IonBadge>
                        <IonChip size="small" color="medium" style={{ marginLeft: '8px' }}>
                          <IonIcon icon={calendarOutline} />
                          <IonLabel>{reporte.fecha}</IonLabel>
                        </IonChip>
                      </div>
                    </IonLabel>
                  </IonItem>
                </IonCardContent>
              </IonCard>
            ))}
          </IonList>
        )}

        {/* Modal con detalles del reporte */}
        <IonModal isOpen={!!selectedReporte} onDidDismiss={() => setSelectedReporte(null)}>
          {selectedReporte && (
            <>
              <IonHeader>
                <IonToolbar>
                  <IonTitle>Reporte #{selectedReporte.id}</IonTitle>
                  <IonButton slot="end" fill="clear" onClick={() => setSelectedReporte(null)}>
                    <IonIcon icon={closeOutline} />
                  </IonButton>
                </IonToolbar>
              </IonHeader>
              <IonContent>
                <IonCard>
                  <IonCardContent>
                    <h2 style={{ color: '#3880ff', marginBottom: '10px' }}>
                      {selectedReporte.titulo}
                    </h2>
                    
                    <div style={{ marginBottom: '15px' }}>
                      <IonBadge color={getEstadoColor(selectedReporte.estado)}>
                        {selectedReporte.estado.replace('_', ' ')}
                      </IonBadge>
                      <IonBadge color={getPrioridadColor(selectedReporte.prioridad)} style={{ marginLeft: '8px' }}>
                        Prioridad: {selectedReporte.prioridad}
                      </IonBadge>
                      <IonChip size="small" color="medium" style={{ marginLeft: '8px' }}>
                        <IonIcon icon={calendarOutline} />
                        <IonLabel>{selectedReporte.fecha}</IonLabel>
                      </IonChip>
                    </div>

                    <h3>Descripción:</h3>
                    <p style={{ fontSize: '1em', lineHeight: '1.6', marginBottom: '15px' }}>
                      {selectedReporte.descripcion}
                    </p>

                    <h3>Categoría:</h3>
                    <p style={{ fontSize: '1em', marginBottom: '15px' }}>
                      {selectedReporte.categoria}
                    </p>

                    <h3>Ubicación:</h3>
                    <p style={{ fontSize: '1em', marginBottom: '15px' }}>
                      <IonIcon icon={locationOutline} style={{ marginRight: '5px' }} />
                      Lat: {selectedReporte.latitud}, Long: {selectedReporte.longitud}
                    </p>

                    {selectedReporte.comentario && (
                      <>
                        <h3>Comentario del Ministerio:</h3>
                        <p style={{ fontSize: '1em', lineHeight: '1.6', marginBottom: '15px', fontStyle: 'italic' }}>
                          {selectedReporte.comentario}
                        </p>
                      </>
                    )}

                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                      <img 
                        src={selectedReporte.foto} 
                        alt={selectedReporte.titulo}
                        style={{ 
                          maxWidth: '100%', 
                          height: 'auto', 
                          borderRadius: '8px',
                          border: '1px solid #ddd'
                        }} 
                      />
                    </div>
                  </IonCardContent>
                </IonCard>
              </IonContent>
            </>
          )}
        </IonModal>

        {filteredReportes.length === 0 && (
          <IonCard>
            <IonCardContent>
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <IonIcon icon={searchOutline} size="large" style={{ color: '#ccc' }} />
                <p>No se encontraron reportes con los filtros seleccionados</p>
              </div>
            </IonCardContent>
          </IonCard>
        )}

        {/* FAB para acciones rápidas */}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton>
            <IonIcon icon={filterOutline} />
          </IonFabButton>
          <IonFabList side="top">
            <IonFabButton size="small" onClick={() => setSelectedEstado('todos')}>
              <IonIcon icon={eyeOutline} />
            </IonFabButton>
            <IonFabButton size="small" onClick={() => setSelectedEstado('pendiente')}>
              <IonIcon icon={timeOutline} />
            </IonFabButton>
            <IonFabButton size="small" onClick={() => setSelectedEstado('resuelto')}>
              <IonIcon icon={checkmarkCircleOutline} />
            </IonFabButton>
          </IonFabList>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default MapaReportes;
