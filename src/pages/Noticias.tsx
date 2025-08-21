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
  IonSpinner,
  IonText,
  IonBadge,
  IonModal,
  IonButtons,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/react';
import {
  newspaperOutline,
  timeOutline,
  calendarOutline,
  searchOutline,
  closeOutline,
  shareOutline,
  bookmarkOutline,
  eyeOutline,
  informationCircleOutline
} from 'ionicons/icons';
import { useState, useEffect } from 'react';
import { getNoticias } from '../utils/api';
import './Page.css';

interface Noticia {
  id: string;
  titulo: string;
  resumen: string;
  contenido: string;
  imagen: string;
  fecha: string;
  fecha_creacion: string;
}

const Noticias: React.FC = () => {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [filteredNoticias, setFilteredNoticias] = useState<Noticia[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [selectedNoticia, setSelectedNoticia] = useState<Noticia | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    loadNoticias();
  }, []);

  useEffect(() => {
    filterNoticias();
  }, [searchTerm, noticias]);

  const loadNoticias = async () => {
    try {
      setLoading(true);
      setError('');
      console.log('📰 Cargando noticias...');
      
      const response = await getNoticias();
      console.log('✅ Noticias cargadas exitosamente:', response.data);
      setNoticias(response.data);
      setFilteredNoticias(response.data);
    } catch (err: any) {
      console.error('❌ Error cargando noticias:', err);
      
      // Si es error de red, usar datos mock
      if (err.message === 'NETWORK_ERROR' || !err.response) {
        console.log('🌐 Usando datos mock para noticias');
        setError('No se pudo conectar con el servidor. Mostrando datos de demostración.');
      } else {
        setError('Error al cargar las noticias. Por favor, intenta de nuevo.');
      }
      
      // Datos mock para pruebas cuando la API no está disponible
      const mockNoticias = [
        {
          id: "000001",
          titulo: "Ministerio de Medio Ambiente lanza campaña de reforestación nacional",
          resumen: "Se plantarán más de 1 millón de árboles en todo el país durante 2025.",
          contenido: "El Ministerio de Medio Ambiente y Recursos Naturales anunció hoy el lanzamiento de la campaña nacional de reforestación más ambiciosa de la historia del país. La iniciativa busca plantar más de 1 millón de árboles en todas las provincias durante el año 2025, con el objetivo de recuperar la cobertura boscosa y combatir el cambio climático.\n\nEsta campaña forma parte del Plan Nacional de Desarrollo Sostenible y contará con la participación de voluntarios, organizaciones ambientales, empresas privadas y la comunidad en general. Los árboles serán plantados en áreas urbanas, rurales y en las principales cuencas hidrográficas del país.\n\nEl ministro destacó que esta iniciativa no solo ayudará a combatir el cambio climático, sino que también mejorará la calidad del aire, reducirá la erosión del suelo y creará espacios más saludables para todos los dominicanos.",
          imagen: "https://via.placeholder.com/400x200/4CAF50/FFFFFF?text=Reforestación+Nacional",
          fecha: "2025-01-15 14:30:00",
          fecha_creacion: "2025-01-15 10:00:00"
        },
        {
          id: "000002",
          titulo: "Nuevas medidas para proteger especies marinas en peligro",
          resumen: "Implementación de regulaciones estrictas para la conservación de la biodiversidad marina.",
          contenido: "El gobierno dominicano implementará nuevas medidas de protección para las especies marinas en peligro de extinción. Estas medidas incluyen la creación de nuevas áreas marinas protegidas y la regulación de actividades pesqueras en zonas sensibles.\n\nLas nuevas regulaciones protegerán especies como las tortugas marinas, los manatíes, los corales y los peces de arrecife, que son fundamentales para el ecosistema marino del Caribe. También se establecerán períodos de veda más estrictos y se implementarán sistemas de monitoreo satelital para las embarcaciones pesqueras.\n\nEsta iniciativa se desarrolla en colaboración con organizaciones internacionales de conservación marina y representa un paso importante hacia la protección de nuestros océanos y la sostenibilidad de la pesca en la región.",
          imagen: "https://via.placeholder.com/400x200/2196F3/FFFFFF?text=Protección+Marina",
          fecha: "2025-01-14 15:30:00",
          fecha_creacion: "2025-01-14 12:00:00"
        },
        {
          id: "000003",
          titulo: "Programa de reciclaje comunitario en Santiago",
          resumen: "Iniciativa pionera para promover la separación de residuos y el reciclaje en hogares.",
          contenido: "La ciudad de Santiago será pionera en la implementación de un programa integral de reciclaje comunitario. Este programa incluirá la instalación de contenedores especializados en puntos estratégicos de la ciudad, campañas de educación ambiental y la participación activa de las comunidades.\n\nEl programa se desarrollará en fases, comenzando con la separación de plásticos, papel y cartón, y expandiéndose posteriormente a otros materiales como vidrio, metal y residuos orgánicos. Cada hogar recibirá contenedores de separación y material educativo sobre las mejores prácticas de reciclaje.\n\nEsta iniciativa no solo ayudará a reducir la cantidad de residuos que llegan a los vertederos, sino que también creará empleos verdes y promoverá una cultura de sostenibilidad en la comunidad.",
          imagen: "https://via.placeholder.com/400x200/FF9800/FFFFFF?text=Reciclaje+Comunitario",
          fecha: "2025-01-13 16:45:00",
          fecha_creacion: "2025-01-13 13:30:00"
        }
      ];
      
      setNoticias(mockNoticias);
      setFilteredNoticias(mockNoticias);
    } finally {
      setLoading(false);
    }
  };

  const filterNoticias = () => {
    if (searchTerm.trim() === '') {
      setFilteredNoticias(noticias);
    } else {
      const filtered = noticias.filter(noticia =>
        noticia.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        noticia.resumen.toLowerCase().includes(searchTerm.toLowerCase()) ||
        noticia.contenido.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredNoticias(filtered);
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

  const formatDateShort = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-DO', {
      month: 'short',
      day: 'numeric'
    });
  };

  const handleShare = (noticia: Noticia) => {
    if (navigator.share) {
      navigator.share({
        title: noticia.titulo,
        text: noticia.resumen,
        url: window.location.href
      });
    } else {
      // Fallback para navegadores que no soportan Web Share API
      navigator.clipboard.writeText(`${noticia.titulo}\n${noticia.resumen}`);
      alert('Enlace copiado al portapapeles');
    }
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Hace menos de 1 hora';
    if (diffInHours < 24) return `Hace ${diffInHours} horas`;
    if (diffInHours < 48) return 'Hace 1 día';
    return formatDateShort(dateString);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Noticias Ambientales</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent fullscreen>
        {/* Barra de búsqueda */}
        <IonSearchbar
          value={searchTerm}
          onIonInput={(e) => setSearchTerm(e.detail.value!)}
          placeholder="Buscar noticias..."
          showClearButton="focus"
        />
        
        {/* Mensaje de error si existe */}
        {error && (
          <IonCard color="warning">
            <IonCardContent>
              <IonItem lines="none">
                <IonIcon icon={informationCircleOutline} slot="start" color="warning" />
                <IonLabel>
                  <h3>Información</h3>
                  <p>{error}</p>
                </IonLabel>
              </IonItem>
            </IonCardContent>
          </IonCard>
        )}
        
        {/* Loading spinner */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <IonSpinner name="crescent" />
            <p>Cargando noticias...</p>
          </div>
        )}
        
        {/* Lista de noticias */}
        {!loading && (
          <IonList>
            {filteredNoticias.map((noticia) => (
              <IonCard key={noticia.id} button onClick={() => setSelectedNoticia(noticia)}>
                <IonCardHeader>
                  <IonCardTitle>{noticia.titulo}</IonCardTitle>
                </IonCardHeader>
                
                <IonCardContent>
                  <IonItem lines="none">
                    <IonThumbnail slot="start">
                      <IonImg src={noticia.imagen} alt={noticia.titulo} />
                    </IonThumbnail>
                    <IonLabel>
                      <p>{noticia.resumen}</p>
                      <div style={{ marginTop: '8px' }}>
                        <IonChip color="primary" size="small">
                          <IonIcon icon={timeOutline} />
                          <IonLabel>{new Date(noticia.fecha).toLocaleDateString()}</IonLabel>
                        </IonChip>
                      </div>
                    </IonLabel>
                  </IonItem>
                </IonCardContent>
              </IonCard>
            ))}
          </IonList>
        )}
        
        {/* Mensaje si no hay noticias */}
        {!loading && filteredNoticias.length === 0 && (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <IonIcon icon={newspaperOutline} style={{ fontSize: '3rem', color: '#ccc' }} />
            <p>No se encontraron noticias</p>
          </div>
        )}
        
        {/* Modal para ver noticia completa */}
        <IonModal isOpen={!!selectedNoticia} onDidDismiss={() => setSelectedNoticia(null)}>
          {selectedNoticia && (
            <>
              <IonHeader>
                <IonToolbar>
                  <IonTitle>Noticia</IonTitle>
                  <IonButtons slot="end">
                    <IonButton onClick={() => setSelectedNoticia(null)}>
                      <IonIcon icon={closeOutline} />
                    </IonButton>
                  </IonButtons>
                </IonToolbar>
              </IonHeader>
              
              <IonContent>
                <IonCard>
                  <IonImg src={selectedNoticia.imagen} alt={selectedNoticia.titulo} />
                  <IonCardHeader>
                    <IonCardTitle>{selectedNoticia.titulo}</IonCardTitle>
                    <IonChip color="primary">
                      <IonIcon icon={calendarOutline} />
                      <IonLabel>{new Date(selectedNoticia.fecha).toLocaleDateString()}</IonLabel>
                    </IonChip>
                  </IonCardHeader>
                  
                  <IonCardContent>
                    <IonText>
                      <div style={{ whiteSpace: 'pre-line' }}>
                        {selectedNoticia.contenido}
                      </div>
                    </IonText>
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

export default Noticias;
