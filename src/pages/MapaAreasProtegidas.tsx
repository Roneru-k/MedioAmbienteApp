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
  IonSegment,
  IonSegmentButton,
  IonSpinner,
  IonText,
  IonBadge,
  IonModal,
  IonButtons,
  IonGrid,
  IonRow,
  IonCol,
  IonFab,
  IonFabButton
} from '@ionic/react';
import {
  locationOutline,
  mapOutline,
  searchOutline,
  closeOutline,
  shareOutline,
  leafOutline,
  triangleOutline,
  waterOutline,
  pawOutline,
  informationCircleOutline,
  navigateOutline,
  layersOutline,
  refreshOutline
} from 'ionicons/icons';
import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getAreasProtegidas } from '../utils/api';
import './Page.css';

// Configuración de iconos personalizados para Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Iconos personalizados para diferentes tipos de áreas
const createCustomIcon = (tipo: string) => {
  const iconColors = {
    parque_nacional: '#3880ff',
    reserva_cientifica: '#2dd36f',
    monumento_natural: '#3dc2ff',
    refugio_vida_silvestre: '#92949c'
  };

  const color = iconColors[tipo as keyof typeof iconColors] || '#3880ff';

  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        background-color: ${color};
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 10px;
        font-weight: bold;
      ">
        ${tipo === 'parque_nacional' ? '🏔️' : 
          tipo === 'reserva_cientifica' ? '🍃' : 
          tipo === 'monumento_natural' ? '💧' : '🐾'}
      </div>
    `,
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  });
};

interface AreaProtegida {
  id: string;
  nombre: string;
  tipo: string;
  descripcion: string;
  ubicacion: string;
  superficie: string;
  imagen: string;
  latitud: number;
  longitud: number;
  fecha_creacion: string;
}

// Componente para centrar el mapa en República Dominicana
const MapCenter: React.FC<{ areas: AreaProtegida[] }> = ({ areas }) => {
  const map = useMap();
  
  useEffect(() => {
    if (areas.length > 0) {
      const bounds = L.latLngBounds(areas.map(area => [area.latitud, area.longitud]));
      map.fitBounds(bounds, { padding: [20, 20] });
    } else {
      // Centrar en República Dominicana si no hay áreas
      map.setView([18.735693, -70.162651], 8);
    }
  }, [areas, map]);

  return null;
};

const MapaAreasProtegidas: React.FC = () => {
  const [areas, setAreas] = useState<AreaProtegida[]>([]);
  const [filteredAreas, setFilteredAreas] = useState<AreaProtegida[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedTipo, setSelectedTipo] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [selectedArea, setSelectedArea] = useState<AreaProtegida | null>(null);
  const [error, setError] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);

  const tipos = [
    { value: '', label: 'Todas' },
    { value: 'parque_nacional', label: 'Parque Nacional' },
    { value: 'reserva_cientifica', label: 'Reserva Científica' },
    { value: 'monumento_natural', label: 'Monumento Natural' },
    { value: 'refugio_vida_silvestre', label: 'Refugio de Vida Silvestre' }
  ];

  useEffect(() => {
    loadAreas();
  }, []);

  useEffect(() => {
    if (selectedTipo) {
      // Si se selecciona un tipo, cargar desde la API
      loadAreas(selectedTipo);
    } else {
      // Si no hay tipo seleccionado, filtrar localmente
      filterAreas();
    }
  }, [selectedTipo]);

  useEffect(() => {
    // Filtrar por búsqueda solo cuando no hay tipo seleccionado
    if (!selectedTipo) {
      filterAreas();
    }
  }, [searchTerm, areas]);

  const loadAreas = async (tipo?: string, busqueda?: string) => {
    try {
      setLoading(true);
      const response = await getAreasProtegidas(tipo, busqueda);
      if (tipo || busqueda) {
        // Si se está filtrando, actualizar solo las áreas filtradas
        setFilteredAreas(response.data);
      } else {
        // Si se cargan todas las áreas, actualizar ambos estados
        setAreas(response.data);
        setFilteredAreas(response.data);
      }
      setError('');
    } catch (err: any) {
      console.error('Error cargando áreas protegidas:', err);
      
      // Datos mock para pruebas cuando la API no está disponible
      const mockAreas = [
        {
          id: "000001",
          nombre: "Parque Nacional Los Haitises",
          tipo: "parque_nacional",
          descripcion: "Uno de los parques nacionales más importantes del país, caracterizado por sus mogotes, manglares y cuevas con arte rupestre taíno.",
          ubicacion: "Bahía de Samaná, Hato Mayor y Monte Plata",
          superficie: "1,600 km²",
          imagen: "https://via.placeholder.com/400x200/4CAF50/FFFFFF?text=Los+Haitises",
          latitud: 19.0333,
          longitud: -69.5833,
          fecha_creacion: "2025-01-15 10:00:00"
        },
        {
          id: "000002",
          nombre: "Reserva Científica Ébano Verde",
          tipo: "reserva_cientifica",
          descripcion: "Protege bosques nublados y especies endémicas como el ébano verde, árbol emblemático en peligro de extinción.",
          ubicacion: "Cordillera Central, La Vega",
          superficie: "23.1 km²",
          imagen: "https://via.placeholder.com/400x200/8BC34A/FFFFFF?text=Ébano+Verde",
          latitud: 19.05,
          longitud: -70.5167,
          fecha_creacion: "2025-01-15 10:00:00"
        },
        {
          id: "000003",
          nombre: "Monumento Natural Salto de la Jalda",
          tipo: "monumento_natural",
          descripcion: "Cascada de 80 metros de altura, la más alta del Caribe, rodeada de bosque húmedo tropical.",
          ubicacion: "Miches, El Seibo",
          superficie: "5.2 km²",
          imagen: "https://via.placeholder.com/400x200/2196F3/FFFFFF?text=Salto+Jalda",
          latitud: 18.8833,
          longitud: -69.0333,
          fecha_creacion: "2025-01-14 15:30:00"
        },
        {
          id: "000004",
          nombre: "Refugio de Vida Silvestre Laguna de Rincón",
          tipo: "refugio_vida_silvestre",
          descripcion: "Laguna costera que alberga una gran diversidad de aves acuáticas y especies marinas.",
          ubicacion: "Cabo Rojo, Pedernales",
          superficie: "28.5 km²",
          imagen: "https://via.placeholder.com/400x200/00BCD4/FFFFFF?text=Laguna+Rincón",
          latitud: 17.9167,
          longitud: -71.6667,
          fecha_creacion: "2025-01-14 12:00:00"
        },
        {
          id: "000005",
          nombre: "Reserva Científica Valle Nuevo",
          tipo: "reserva_cientifica",
          descripcion: "Altiplano más elevado del Caribe, con ecosistemas únicos de páramo andino y bosques de pino criollo.",
          ubicacion: "Cordillera Central",
          superficie: "910 km²",
          imagen: "https://via.placeholder.com/400x200/795548/FFFFFF?text=Valle+Nuevo",
          latitud: 18.7167,
          longitud: -70.6667,
          fecha_creacion: "2025-01-13 09:15:00"
        },
        {
          id: "000006",
          nombre: "Parque Nacional Jaragua",
          tipo: "parque_nacional",
          descripcion: "Parque nacional más grande del país, con ecosistemas áridos, playas vírgenes y cuevas prehistóricas.",
          ubicacion: "Península de Barahona",
          superficie: "1,374 km²",
          imagen: "https://via.placeholder.com/400x200/FF9800/FFFFFF?text=Jaragua",
          latitud: 17.4833,
          longitud: -71.5167,
          fecha_creacion: "2025-01-13 14:20:00"
        },
        {
          id: "000007",
          nombre: "Monumento Natural Pico Duarte",
          tipo: "monumento_natural",
          descripcion: "Punto más alto del Caribe con 3,087 metros, con bosques de pino criollo y vistas panorámicas.",
          ubicacion: "Cordillera Central, La Vega",
          superficie: "15.8 km²",
          imagen: "https://via.placeholder.com/400x200/607D8B/FFFFFF?text=Pico+Duarte",
          latitud: 19.0167,
          longitud: -70.9667,
          fecha_creacion: "2025-01-12 11:45:00"
        },
        {
          id: "000008",
          nombre: "Refugio de Vida Silvestre Laguna de Oviedo",
          tipo: "refugio_vida_silvestre",
          descripcion: "Laguna hipersalina que alberga flamencos rosados y otras aves migratorias.",
          ubicacion: "Península de Barahona, Pedernales",
          superficie: "32.7 km²",
          imagen: "https://via.placeholder.com/400x200/E91E63/FFFFFF?text=Laguna+Oviedo",
          latitud: 17.7667,
          longitud: -71.4,
          fecha_creacion: "2025-01-12 16:30:00"
        },
        {
          id: "000009",
          nombre: "Parque Nacional Sierra de Bahoruco",
          tipo: "parque_nacional",
          descripcion: "Montañas con bosques nublados y secos, hábitat de especies endémicas únicas.",
          ubicacion: "Sierra de Bahoruco, Independencia",
          superficie: "1,100 km²",
          imagen: "https://via.placeholder.com/400x200/9C27B0/FFFFFF?text=Sierra+Bahoruco",
          latitud: 18.2667,
          longitud: -71.5833,
          fecha_creacion: "2025-01-11 13:15:00"
        },
        {
          id: "000010",
          nombre: "Reserva Científica Loma Quita Espuela",
          tipo: "reserva_cientifica",
          descripcion: "Protege las nacientes de importantes ríos del Cibao y alberga especies endémicas de flora y fauna.",
          ubicacion: "San Francisco de Macorís, Duarte",
          superficie: "72.5 km²",
          imagen: "https://via.placeholder.com/400x200/3F51B5/FFFFFF?text=Quita+Espuela",
          latitud: 19.35,
          longitud: -70.15,
          fecha_creacion: "2025-01-11 10:00:00"
        }
      ];
      
      setAreas(mockAreas);
      setFilteredAreas(mockAreas);
      setError('Usando datos de demostración (API no disponible)');
    } finally {
      setLoading(false);
    }
  };

  const filterAreas = () => {
    if (searchTerm.trim() === '') {
      setFilteredAreas(areas);
    } else {
      const filtered = areas.filter(area =>
        area.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        area.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
        area.ubicacion.toLowerCase().includes(searchTerm.toLowerCase()) ||
        area.tipo.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredAreas(filtered);
    }
  };

  const handleTipoChange = (tipo: string) => {
    setSelectedTipo(tipo);
    setSearchTerm(''); // Limpiar búsqueda al cambiar tipo
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'parque_nacional':
        return triangleOutline;
      case 'reserva_cientifica':
        return leafOutline;
      case 'monumento_natural':
        return waterOutline;
      case 'refugio_vida_silvestre':
        return pawOutline;
      default:
        return locationOutline;
    }
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'parque_nacional':
        return 'primary';
      case 'reserva_cientifica':
        return 'success';
      case 'monumento_natural':
        return 'secondary';
      case 'refugio_vida_silvestre':
        return 'tertiary';
      default:
        return 'medium';
    }
  };

  const getTipoLabel = (tipo: string) => {
    const tipoObj = tipos.find(t => t.value === tipo);
    return tipoObj ? tipoObj.label : tipo;
  };

  const handleViewMap = (area: AreaProtegida) => {
    const url = `https://www.google.com/maps?q=${area.latitud},${area.longitud}`;
    window.open(url, '_blank');
  };

  const handleShare = (area: AreaProtegida) => {
    if (navigator.share) {
      navigator.share({
        title: area.nombre,
        text: `${area.nombre} - ${area.descripcion}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(`${area.nombre}\n${area.descripcion}\nUbicación: ${area.ubicacion}`);
      alert('Información copiada al portapapeles');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mapa de Áreas Protegidas</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => setShowFilters(!showFilters)}>
              <IonIcon icon={layersOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Mapa de Áreas Protegidas</IonTitle>
          </IonToolbar>
        </IonHeader>

        {/* Filtros superpuestos */}
        {showFilters && (
          <div style={{
            position: 'absolute',
            top: '60px',
            left: '10px',
            right: '10px',
            zIndex: 1000,
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            padding: '15px'
          }}>
            {/* Barra de búsqueda */}
            <IonSearchbar
              value={searchTerm}
              onIonInput={(e) => setSearchTerm(e.detail.value!)}
              placeholder="Buscar áreas protegidas..."
              showClearButton="focus"
              debounce={500}
            />

            {/* Filtro por tipos */}
            <div style={{ padding: '10px 0' }}>
              <IonSegment
                value={selectedTipo}
                onIonChange={(e) => handleTipoChange(e.detail.value as string)}
                scrollable={true}
              >
                {tipos.map((tipo) => (
                  <IonSegmentButton key={tipo.value} value={tipo.value}>
                    <IonLabel>{tipo.label}</IonLabel>
                  </IonSegmentButton>
                ))}
              </IonSegment>
              
              {/* Contador de resultados */}
              {!loading && !error && (
                <div style={{ 
                  padding: '10px 0', 
                  fontSize: '0.9em', 
                  color: '#666',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span>
                    {filteredAreas.length} área{filteredAreas.length !== 1 ? 's' : ''} encontrada{filteredAreas.length !== 1 ? 's' : ''}
                    {selectedTipo && (
                      <span> de <strong>{getTipoLabel(selectedTipo)}</strong></span>
                    )}
                    {searchTerm && (
                      <span> para "<strong>{searchTerm}</strong>"</span>
                    )}
                  </span>
                  {(selectedTipo || searchTerm) && (
                    <IonButton 
                      fill="clear" 
                      size="small"
                      onClick={() => {
                        setSelectedTipo('');
                        setSearchTerm('');
                        loadAreas();
                      }}
                    >
                      Limpiar filtros
                    </IonButton>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Estado de carga */}
        {loading && (
          <div style={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)',
            zIndex: 1000,
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <IonSpinner name="crescent" />
            <p>Cargando mapa...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div style={{
            position: 'absolute',
            top: '60px',
            left: '10px',
            right: '10px',
            zIndex: 1000
          }}>
            <IonCard color={error.includes('demostración') ? 'warning' : 'danger'}>
              <IonCardContent>
                <IonText color="light">
                  <p>{error}</p>
                  {!error.includes('demostración') && (
                    <IonButton fill="outline" color="light" onClick={() => loadAreas()}>
                      Reintentar
                    </IonButton>
                  )}
                </IonText>
              </IonCardContent>
            </IonCard>
          </div>
        )}

        {/* Mapa */}
        {!loading && (
          <div style={{ 
            height: '100%', 
            width: '100%',
            marginTop: showFilters ? '200px' : '0'
          }}>
            <MapContainer
              center={[18.735693, -70.162651]}
              zoom={8}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              <MapCenter areas={filteredAreas} />
              
              {filteredAreas.map((area) => (
                <Marker
                  key={area.id}
                  position={[area.latitud, area.longitud]}
                  icon={createCustomIcon(area.tipo)}
                  eventHandlers={{
                    click: () => setSelectedArea(area)
                  }}
                >
                  <Popup>
                    <div style={{ minWidth: '200px' }}>
                      <h3 style={{ margin: '0 0 10px 0', fontSize: '1.1em' }}>
                        {area.nombre}
                      </h3>
                      <IonChip color={getTipoColor(area.tipo)} size="small">
                        <IonIcon icon={getTipoIcon(area.tipo)} />
                        <IonLabel>{getTipoLabel(area.tipo)}</IonLabel>
                      </IonChip>
                      <p style={{ 
                        fontSize: '0.9em', 
                        margin: '10px 0',
                        color: '#666'
                      }}>
                        {area.descripcion.length > 100 
                          ? `${area.descripcion.substring(0, 100)}...`
                          : area.descripcion
                        }
                      </p>
                      <IonButton 
                        size="small" 
                        fill="clear"
                        onClick={() => setSelectedArea(area)}
                      >
                        Ver detalles
                      </IonButton>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        )}

        {/* Botón flotante para recargar */}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton 
            onClick={() => loadAreas()}
            color="primary"
          >
            <IonIcon icon={refreshOutline} />
          </IonFabButton>
        </IonFab>

        {/* Modal con detalles del área */}
        <IonModal isOpen={!!selectedArea} onDidDismiss={() => setSelectedArea(null)}>
          {selectedArea && (
            <>
              <IonHeader>
                <IonToolbar>
                  <IonButtons slot="start">
                    <IonButton onClick={() => setSelectedArea(null)}>
                      <IonIcon icon={closeOutline} />
                    </IonButton>
                  </IonButtons>
                  <IonTitle>Detalles del Área</IonTitle>
                  <IonButtons slot="end">
                    <IonButton onClick={() => handleShare(selectedArea)}>
                      <IonIcon icon={shareOutline} />
                    </IonButton>
                  </IonButtons>
                </IonToolbar>
              </IonHeader>
              <IonContent>
                <IonCard>
                  <IonImg 
                    src={selectedArea.imagen} 
                    alt={selectedArea.nombre}
                    style={{ height: '250px', objectFit: 'cover' }}
                  />
                  <IonCardHeader>
                    <IonCardTitle style={{ fontSize: '1.3em', margin: 0 }}>
                      {selectedArea.nombre}
                    </IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <div style={{ marginBottom: '15px' }}>
                      <IonBadge color={getTipoColor(selectedArea.tipo)}>
                        <IonIcon icon={getTipoIcon(selectedArea.tipo)} />
                        {getTipoLabel(selectedArea.tipo)}
                      </IonBadge>
                      <IonBadge color="secondary" style={{ marginLeft: '8px' }}>
                        <IonIcon icon={locationOutline} />
                        {selectedArea.superficie}
                      </IonBadge>
                    </div>
                    
                    <div style={{ 
                      backgroundColor: '#f8f9fa', 
                      padding: '15px', 
                      borderRadius: '8px',
                      marginBottom: '20px',
                      borderLeft: '4px solid #4CAF50'
                    }}>
                      <h4 style={{ margin: '0 0 10px 0', color: '#4CAF50' }}>
                        <IonIcon icon={informationCircleOutline} /> Descripción
                      </h4>
                      <p style={{ 
                        fontSize: '1.1em', 
                        lineHeight: '1.6', 
                        margin: 0,
                        color: '#333'
                      }}>
                        {selectedArea.descripcion}
                      </p>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                      <h4 style={{ marginBottom: '10px', color: '#1976d2' }}>
                        <IonIcon icon={mapOutline} /> Información de Ubicación
                      </h4>
                      <IonItem lines="none">
                        <IonIcon icon={locationOutline} slot="start" color="primary" />
                        <IonLabel>
                          <h3>Ubicación</h3>
                          <p>{selectedArea.ubicacion}</p>
                        </IonLabel>
                      </IonItem>
                      <IonItem lines="none">
                        <IonIcon icon={mapOutline} slot="start" color="primary" />
                        <IonLabel>
                          <h3>Coordenadas</h3>
                          <p>{selectedArea.latitud}, {selectedArea.longitud}</p>
                        </IonLabel>
                      </IonItem>
                      <IonItem lines="none">
                        <IonIcon icon={triangleOutline} slot="start" color="primary" />
                        <IonLabel>
                          <h3>Superficie</h3>
                          <p>{selectedArea.superficie}</p>
                        </IonLabel>
                      </IonItem>
                    </div>

                    <IonButton 
                      expand="block" 
                      color="primary"
                      onClick={() => handleViewMap(selectedArea)}
                      style={{ marginBottom: '10px' }}
                    >
                      <IonIcon icon={navigateOutline} slot="start" />
                      Ver en Google Maps
                    </IonButton>
                    
                    <IonButton 
                      expand="block" 
                      fill="outline"
                      onClick={() => handleShare(selectedArea)}
                    >
                      <IonIcon icon={shareOutline} slot="start" />
                      Compartir Área
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

export default MapaAreasProtegidas;
