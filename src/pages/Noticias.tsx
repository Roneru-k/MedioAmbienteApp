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
  IonBackButton
} from '@ionic/react';
import {
  newspaperOutline,
  timeOutline,
  personOutline,
  searchOutline,
  closeOutline,
  shareOutline,
  bookmarkOutline
} from 'ionicons/icons';
import { useState, useEffect } from 'react';
import { getNoticias } from '../utils/api';
import './Page.css';

interface Noticia {
  id: number;
  titulo: string;
  descripcion: string;
  contenido: string;
  imagen: string;
  fecha: string;
  autor: string;
  categoria: string;
  tags: string[];
  vista_previa?: string;
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
    if (searchTerm.trim() === '') {
      setFilteredNoticias(noticias);
    } else {
      handleSearch(searchTerm);
    }
  }, [searchTerm, noticias]);

  const loadNoticias = async () => {
    try {
      setLoading(true);
      const response = await getNoticias();
      setNoticias(response.data);
      setFilteredNoticias(response.data);
      setError('');
    } catch (err: any) {
      console.error('Error cargando noticias:', err);
      
      // Datos mock para pruebas cuando la API no está disponible
      const mockNoticias = [
        {
          id: 1,
          titulo: "Nueva iniciativa de reforestación en Santo Domingo",
          descripcion: "El Ministerio de Medio Ambiente lanza programa masivo de plantación de árboles",
          contenido: "El Ministerio de Medio Ambiente y Recursos Naturales anunció hoy una nueva iniciativa para reforestar las principales áreas urbanas de Santo Domingo. El programa incluirá la plantación de más de 10,000 árboles nativos en parques, avenidas y espacios públicos.\n\nEsta iniciativa forma parte del plan nacional de desarrollo sostenible y busca mejorar la calidad del aire, reducir la temperatura urbana y crear espacios más saludables para los ciudadanos.\n\nEl proyecto comenzará en el próximo mes y contará con la participación de voluntarios, organizaciones ambientales y la comunidad en general.",
          imagen: "https://via.placeholder.com/400x200/4CAF50/FFFFFF?text=Reforestación",
          fecha: "2025-01-15T10:00:00Z",
          autor: "Ministerio de Medio Ambiente",
          categoria: "Conservación",
          tags: ["reforestación", "santo domingo", "árboles", "sostenibilidad"]
        },
        {
          id: 2,
          titulo: "Protección de especies marinas en las costas dominicanas",
          descripcion: "Nuevas medidas para proteger la biodiversidad marina",
          contenido: "El gobierno dominicano implementará nuevas medidas de protección para las especies marinas en peligro de extinción. Estas medidas incluyen la creación de nuevas áreas marinas protegidas y la regulación de actividades pesqueras.\n\nLas nuevas regulaciones protegerán especies como las tortugas marinas, los manatíes y los corales, que son fundamentales para el ecosistema marino del Caribe.\n\nEsta iniciativa se desarrolla en colaboración con organizaciones internacionales de conservación marina y representa un paso importante hacia la protección de nuestros océanos.",
          imagen: "https://via.placeholder.com/400x200/2196F3/FFFFFF?text=Protección+Marina",
          fecha: "2025-01-14T15:30:00Z",
          autor: "Dirección de Recursos Marinos",
          categoria: "Biodiversidad",
          tags: ["especies marinas", "protección", "biodiversidad", "océanos"]
        },
        {
          id: 3,
          titulo: "Programa de reciclaje comunitario en Santiago",
          descripcion: "Santiago se convierte en modelo de gestión de residuos",
          contenido: "La ciudad de Santiago implementará un programa integral de reciclaje comunitario que servirá como modelo para otras ciudades del país. El programa incluye la separación de residuos en origen, centros de acopio comunitarios y educación ambiental.\n\nLos ciudadanos recibirán contenedores especiales para separar plásticos, papel, vidrio y residuos orgánicos. El programa también incluye incentivos para las comunidades que logren mayores tasas de reciclaje.\n\nEsta iniciativa busca reducir la cantidad de residuos que llegan a los vertederos y promover una cultura de consumo responsable.",
          imagen: "https://via.placeholder.com/400x200/8BC34A/FFFFFF?text=Reciclaje",
          fecha: "2025-01-13T09:15:00Z",
          autor: "Ayuntamiento de Santiago",
          categoria: "Gestión de Residuos",
          tags: ["reciclaje", "santiago", "residuos", "comunidad"]
        }
      ];
      
      setNoticias(mockNoticias);
      setFilteredNoticias(mockNoticias);
      setError('Usando datos de demostración (API no disponible)');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    if (query.trim() === '') {
      setFilteredNoticias(noticias);
      return;
    }

    try {
      setLoading(true);
      // Since buscarNoticias is not in the API documentation, we'll filter locally
      const filtered = noticias.filter(noticia =>
        noticia.titulo.toLowerCase().includes(query.toLowerCase()) ||
        noticia.descripcion.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredNoticias(filtered);
    } catch (err: any) {
      console.error('Error en búsqueda:', err);
      // If search fails, filter locally
      const filtered = noticias.filter(noticia =>
        noticia.titulo.toLowerCase().includes(query.toLowerCase()) ||
        noticia.descripcion.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredNoticias(filtered);
    } finally {
      setLoading(false);
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

  const handleShare = (noticia: Noticia) => {
    if (navigator.share) {
      navigator.share({
        title: noticia.titulo,
        text: noticia.descripcion,
        url: window.location.href
      });
    } else {
      // Fallback para navegadores que no soportan Web Share API
      navigator.clipboard.writeText(`${noticia.titulo}\n${noticia.descripcion}`);
      alert('Enlace copiado al portapapeles');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Noticias Ambientales</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Noticias Ambientales</IonTitle>
          </IonToolbar>
        </IonHeader>

        {/* Barra de búsqueda */}
        <IonSearchbar
          value={searchTerm}
          onIonInput={(e) => setSearchTerm(e.detail.value!)}
          placeholder="Buscar noticias..."
          showClearButton="focus"
          debounce={500}
        />

        {/* Estado de carga */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <IonSpinner name="crescent" />
            <p>Cargando noticias...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <IonCard color={error.includes('demostración') ? 'warning' : 'danger'}>
            <IonCardContent>
              <IonText color="light">
                <p>{error}</p>
                {!error.includes('demostración') && (
                  <IonButton fill="outline" color="light" onClick={loadNoticias}>
                    Reintentar
                  </IonButton>
                )}
              </IonText>
            </IonCardContent>
          </IonCard>
        )}

        {/* Lista de noticias */}
        {!loading && !error && (
          <IonList>
            {filteredNoticias.map((noticia) => (
              <IonCard key={noticia.id}>
                <IonCardContent>
                  <IonItem button onClick={() => setSelectedNoticia(noticia)}>
                    <IonThumbnail slot="start">
                      <IonImg 
                        src={noticia.imagen || 'https://via.placeholder.com/100x100/4CAF50/FFFFFF?text=Noticia'} 
                        alt={noticia.titulo}
                      />
                    </IonThumbnail>
                    <IonLabel>
                      <h2>{noticia.titulo}</h2>
                      <p>{noticia.descripcion}</p>
                      <div style={{ marginTop: '8px' }}>
                        <IonChip color="primary" size="small">
                          <IonIcon icon={timeOutline} />
                          <IonLabel>{formatDate(noticia.fecha)}</IonLabel>
                        </IonChip>
                        <IonChip color="secondary" size="small">
                          <IonIcon icon={personOutline} />
                          <IonLabel>{noticia.autor}</IonLabel>
                        </IonChip>
                        {noticia.categoria && (
                          <IonChip color="tertiary" size="small">
                            <IonLabel>{noticia.categoria}</IonLabel>
                          </IonChip>
                        )}
                      </div>
                    </IonLabel>
                  </IonItem>
                  
                  {/* Botones de acción */}
                  <IonItem lines="none">
                    <IonButton 
                      fill="clear" 
                      slot="start" 
                      size="small"
                      onClick={() => setSelectedNoticia(noticia)}
                    >
                      Leer más
                    </IonButton>
                    <IonButton 
                      fill="clear" 
                      slot="end" 
                      size="small"
                      onClick={() => handleShare(noticia)}
                    >
                      <IonIcon icon={shareOutline} />
                      Compartir
                    </IonButton>
                  </IonItem>
                </IonCardContent>
              </IonCard>
            ))}
          </IonList>
        )}

        {/* Mensaje cuando no hay resultados */}
        {!loading && !error && filteredNoticias.length === 0 && (
          <IonCard>
            <IonCardContent>
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <IonIcon icon={searchOutline} size="large" style={{ color: '#ccc' }} />
                <p>No se encontraron noticias con los criterios de búsqueda</p>
              </div>
            </IonCardContent>
          </IonCard>
        )}

        {/* Modal con detalles de la noticia */}
        <IonModal isOpen={!!selectedNoticia} onDidDismiss={() => setSelectedNoticia(null)}>
          {selectedNoticia && (
            <>
              <IonHeader>
                <IonToolbar>
                  <IonButtons slot="start">
                    <IonButton onClick={() => setSelectedNoticia(null)}>
                      <IonIcon icon={closeOutline} />
                    </IonButton>
                  </IonButtons>
                  <IonTitle>Noticia</IonTitle>
                  <IonButtons slot="end">
                    <IonButton onClick={() => handleShare(selectedNoticia)}>
                      <IonIcon icon={shareOutline} />
                    </IonButton>
                  </IonButtons>
                </IonToolbar>
              </IonHeader>
              <IonContent>
                <IonCard>
                  <IonImg 
                    src={selectedNoticia.imagen || 'https://via.placeholder.com/400x200/4CAF50/FFFFFF?text=Noticia'} 
                    alt={selectedNoticia.titulo}
                  />
                  <IonCardHeader>
                    <IonCardTitle>{selectedNoticia.titulo}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <div style={{ marginBottom: '15px' }}>
                      <IonBadge color="primary">
                        <IonIcon icon={timeOutline} />
                        {formatDate(selectedNoticia.fecha)}
                      </IonBadge>
                      <IonBadge color="secondary" style={{ marginLeft: '8px' }}>
                        <IonIcon icon={personOutline} />
                        {selectedNoticia.autor}
                      </IonBadge>
                      {selectedNoticia.categoria && (
                        <IonBadge color="tertiary" style={{ marginLeft: '8px' }}>
                          {selectedNoticia.categoria}
                        </IonBadge>
                      )}
                    </div>
                    
                    <p style={{ fontSize: '1.1em', lineHeight: '1.6', marginBottom: '15px' }}>
                      {selectedNoticia.descripcion}
                    </p>
                    
                    <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                      {selectedNoticia.contenido}
                    </div>
                    
                    {/* Tags */}
                    {selectedNoticia.tags && selectedNoticia.tags.length > 0 && (
                      <div style={{ marginTop: '20px' }}>
                        <h4>Etiquetas:</h4>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                          {selectedNoticia.tags.map((tag, index) => (
                            <IonChip key={index} size="small" color="medium">
                              {tag}
                            </IonChip>
                          ))}
                        </div>
                      </div>
                    )}
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
