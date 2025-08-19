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
  IonThumbnail,
  IonImg,
  IonButton,
  IonIcon,
  IonChip,
  IonSearchbar,
  IonList,
  IonSegment,
  IonSegmentButton,
  IonSpinner,
  IonToast,
  IonBadge,
  IonModal,
  IonButtons,
  IonBackButton,
  IonText
} from '@ionic/react';
import {
  playCircleOutline,
  timeOutline,
  calendarOutline,
  searchOutline,
  closeOutline,
  shareOutline,
  refreshOutline as recycleOutline
} from 'ionicons/icons';
import { useState, useEffect } from 'react';
import { getVideosEducativos } from '../utils/api';
import './Page.css';

interface Video {
  id: string;
  titulo: string;
  descripcion: string;
  url: string;
  thumbnail: string;
  categoria: string;
  duracion: string;
  fecha_creacion: string;
}

const VideosEducativos: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<Video[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategoria, setSelectedCategoria] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [error, setError] = useState<string>('');

  const categorias = [
    { value: '', label: 'Todas' },
    { value: 'reciclaje', label: 'Reciclaje' },
    { value: 'conservacion', label: 'Conservación' },
    { value: 'cambio_climatico', label: 'Cambio Climático' },
    { value: 'biodiversidad', label: 'Biodiversidad' }
  ];

  useEffect(() => {
    loadVideos();
  }, []);

  useEffect(() => {
    filterVideos();
  }, [searchTerm, selectedCategoria, videos]);

  const loadVideos = async () => {
    try {
      setLoading(true);
      const response = await getVideosEducativos();
      setVideos(response.data);
      setFilteredVideos(response.data);
      setError('');
    } catch (err: any) {
      console.error('Error cargando videos:', err);
      
      // Datos mock para pruebas cuando la API no está disponible
      const mockVideos = [
        {
          id: "000001",
          titulo: "Cómo reciclar en casa",
          descripcion: "Aprende las técnicas básicas para separar y reciclar los residuos de tu hogar.",
          url: "https://www.youtube.com/watch?v=uW9Qk0OAPio",
          thumbnail: "https://img.youtube.com/vi/uW9Qk0OAPio/hqdefault.jpg",
          categoria: "reciclaje",
          duracion: "12:45",
          fecha_creacion: "2025-01-15 10:00:00"
        },
        {
          id: "000002",
          titulo: "Conservación de especies marinas",
          descripcion: "Descubre la importancia de proteger nuestros océanos y sus habitantes.",
          url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
          categoria: "conservacion",
          duracion: "18:30",
          fecha_creacion: "2025-01-14 15:30:00"
        },
        {
          id: "000003",
          titulo: "Impacto del cambio climático en RD",
          descripcion: "Análisis de cómo el cambio climático afecta a la República Dominicana.",
          url: "https://www.youtube.com/watch?v=9bZkp7q19f0",
          thumbnail: "https://img.youtube.com/vi/9bZkp7q19f0/hqdefault.jpg",
          categoria: "cambio_climatico",
          duracion: "25:15",
          fecha_creacion: "2025-01-13 09:15:00"
        },
        {
          id: "000004",
          titulo: "Biodiversidad de las islas del Caribe",
          descripcion: "Explora la rica biodiversidad que caracteriza a las islas caribeñas.",
          url: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
          thumbnail: "https://img.youtube.com/vi/jNQXAC9IVRw/hqdefault.jpg",
          categoria: "biodiversidad",
          duracion: "22:00",
          fecha_creacion: "2025-01-12 14:20:00"
        }
      ];
      
      setVideos(mockVideos);
      setFilteredVideos(mockVideos);
      setError('Usando datos de demostración (API no disponible)');
    } finally {
      setLoading(false);
    }
  };

  const filterVideos = () => {
    let filtered = videos;

    // Filtrar por categoría
    if (selectedCategoria) {
      filtered = filtered.filter(video => video.categoria === selectedCategoria);
    }

    // Filtrar por búsqueda
    if (searchTerm.trim()) {
      filtered = filtered.filter(video =>
        video.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredVideos(filtered);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-DO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handlePlayVideo = (video: Video) => {
    window.open(video.url, '_blank');
  };

  const handleShare = (video: Video) => {
    if (navigator.share) {
      navigator.share({
        title: video.titulo,
        text: video.descripcion,
        url: video.url
      });
    } else {
      // Fallback para navegadores que no soportan Web Share API
      navigator.clipboard.writeText(`${video.titulo}\n${video.descripcion}\n${video.url}`);
      alert('Enlace del video copiado al portapapeles');
    }
  };

  const getCategoriaLabel = (categoria: string) => {
    const cat = categorias.find(c => c.value === categoria);
    return cat ? cat.label : categoria;
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Videos Educativos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Videos Educativos</IonTitle>
          </IonToolbar>
        </IonHeader>

        {/* Barra de búsqueda */}
        <IonSearchbar
          value={searchTerm}
          onIonInput={(e) => setSearchTerm(e.detail.value!)}
          placeholder="Buscar videos..."
          showClearButton="focus"
          debounce={500}
        />

        {/* Filtro por categorías */}
        <IonSegment
          value={selectedCategoria}
          onIonChange={(e) => setSelectedCategoria(e.detail.value as string)}
          scrollable={true}
        >
          {categorias.map((categoria) => (
            <IonSegmentButton key={categoria.value} value={categoria.value}>
              <IonLabel>{categoria.label}</IonLabel>
            </IonSegmentButton>
          ))}
        </IonSegment>

        {/* Estado de carga */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <IonSpinner name="crescent" />
            <p>Cargando videos...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <IonCard color={error.includes('demostración') ? 'warning' : 'danger'}>
            <IonCardContent>
              <IonText color="light">
                <p>{error}</p>
                {!error.includes('demostración') && (
                  <IonButton fill="outline" color="light" onClick={loadVideos}>
                    Reintentar
                  </IonButton>
                )}
              </IonText>
            </IonCardContent>
          </IonCard>
        )}

        {/* Lista de videos */}
        {!loading && !error && (
          <IonList>
            {filteredVideos.map((video) => (
              <IonCard key={video.id}>
                <IonCardContent>
                  <IonItem button onClick={() => setSelectedVideo(video)}>
                    <IonThumbnail slot="start">
                      <IonImg 
                        src={video.thumbnail} 
                        alt={video.titulo}
                      />
                    </IonThumbnail>
                    <IonLabel>
                      <h2>{video.titulo}</h2>
                      <p>{video.descripcion}</p>
                      <div style={{ marginTop: '8px' }}>
                        <IonChip color="primary">
                          <IonIcon icon={timeOutline} />
                          <IonLabel>{video.duracion}</IonLabel>
                        </IonChip>
                        <IonChip color="secondary">
                          <IonIcon icon={calendarOutline} />
                          <IonLabel>{formatDate(video.fecha_creacion)}</IonLabel>
                        </IonChip>
                        <IonChip color="tertiary">
                          <IonIcon icon={recycleOutline} />
                          <IonLabel>{getCategoriaLabel(video.categoria)}</IonLabel>
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
                      onClick={() => handlePlayVideo(video)}
                    >
                      <IonIcon icon={playCircleOutline} />
                      Ver Video
                    </IonButton>
                    <IonButton 
                      fill="clear" 
                      slot="end" 
                      size="small"
                      onClick={() => setSelectedVideo(video)}
                    >
                      Detalles
                    </IonButton>
                  </IonItem>
                </IonCardContent>
              </IonCard>
            ))}
          </IonList>
        )}

        {/* Mensaje cuando no hay resultados */}
        {!loading && !error && filteredVideos.length === 0 && (
          <IonCard>
            <IonCardContent>
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <IonIcon icon={searchOutline} size="large" style={{ color: '#ccc' }} />
                <p>No se encontraron videos con los criterios de búsqueda</p>
              </div>
            </IonCardContent>
          </IonCard>
        )}

        {/* Modal con detalles del video */}
        <IonModal isOpen={!!selectedVideo} onDidDismiss={() => setSelectedVideo(null)}>
          {selectedVideo && (
            <>
              <IonHeader>
                <IonToolbar>
                  <IonButtons slot="start">
                    <IonButton onClick={() => setSelectedVideo(null)}>
                      <IonIcon icon={closeOutline} />
                    </IonButton>
                  </IonButtons>
                  <IonTitle>Detalles del Video</IonTitle>
                  <IonButtons slot="end">
                    <IonButton onClick={() => handleShare(selectedVideo)}>
                      <IonIcon icon={shareOutline} />
                    </IonButton>
                  </IonButtons>
                </IonToolbar>
              </IonHeader>
              <IonContent>
                <IonCard>
                  <IonImg 
                    src={selectedVideo.thumbnail} 
                    alt={selectedVideo.titulo}
                  />
                  <IonCardHeader>
                    <IonCardTitle>{selectedVideo.titulo}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <div style={{ marginBottom: '15px' }}>
                      <IonBadge color="primary">
                        <IonIcon icon={timeOutline} />
                        {selectedVideo.duracion}
                      </IonBadge>
                      <IonBadge color="secondary" style={{ marginLeft: '8px' }}>
                        <IonIcon icon={calendarOutline} />
                        {formatDate(selectedVideo.fecha_creacion)}
                      </IonBadge>
                      <IonBadge color="tertiary" style={{ marginLeft: '8px' }}>
                        <IonIcon icon={recycleOutline} />
                        {getCategoriaLabel(selectedVideo.categoria)}
                      </IonBadge>
                    </div>
                    
                    <p style={{ fontSize: '1.1em', lineHeight: '1.6', marginBottom: '15px' }}>
                      {selectedVideo.descripcion}
                    </p>
                    
                    <IonButton 
                      expand="block" 
                      color="primary"
                      onClick={() => handlePlayVideo(selectedVideo)}
                      style={{ marginBottom: '10px' }}
                    >
                      <IonIcon icon={playCircleOutline} slot="start" />
                      Ver en YouTube
                    </IonButton>
                    
                    <IonButton 
                      expand="block" 
                      fill="outline"
                      onClick={() => handleShare(selectedVideo)}
                    >
                      <IonIcon icon={shareOutline} slot="start" />
                      Compartir Video
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

export default VideosEducativos;
