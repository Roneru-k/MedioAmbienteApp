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
      const response = await getNoticias();
      setNoticias(response.data);
      setFilteredNoticias(response.data);
      setError('');
    } catch (err: any) {
      console.error('Error cargando noticias:', err);
      
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
          titulo: "Programa integral de reciclaje en Santiago",
          resumen: "Santiago se convierte en modelo de gestión sostenible de residuos sólidos.",
          contenido: "La ciudad de Santiago implementará un programa integral de reciclaje comunitario que servirá como modelo para otras ciudades del país. El programa incluye la separación de residuos en origen, centros de acopio comunitarios, educación ambiental y un sistema de incentivos para las comunidades.\n\nLos ciudadanos recibirán contenedores especiales para separar plásticos, papel, vidrio, metales y residuos orgánicos. El programa también incluye la instalación de puntos de reciclaje en espacios públicos, escuelas y centros comerciales.\n\nEsta iniciativa busca reducir la cantidad de residuos que llegan a los vertederos en un 60% durante el primer año y promover una cultura de consumo responsable y economía circular en la región.",
          imagen: "https://via.placeholder.com/400x200/8BC34A/FFFFFF?text=Reciclaje+Santiago",
          fecha: "2025-01-13 09:15:00",
          fecha_creacion: "2025-01-13 08:00:00"
        },
        {
          id: "000004",
          titulo: "Instalación de paneles solares en edificios públicos",
          resumen: "Gobierno inicia transición hacia energías renovables en instituciones estatales.",
          contenido: "El gobierno dominicano inició un programa masivo de instalación de paneles solares en edificios públicos de todo el país. Esta iniciativa forma parte del plan de transición energética hacia fuentes renovables y busca reducir la dependencia de combustibles fósiles.\n\nEl programa comenzará con 50 edificios gubernamentales en Santo Domingo, incluyendo ministerios, hospitales y escuelas públicas. Se espera que esta primera fase genere suficiente energía para abastecer el equivalente a 5,000 hogares y reduzca las emisiones de CO2 en 2,000 toneladas anuales.\n\nLa inversión total del programa asciende a 50 millones de dólares y se espera que se complete en los próximos 3 años, beneficiando a más de 200 edificios públicos en todo el territorio nacional.",
          imagen: "https://via.placeholder.com/400x200/FF9800/FFFFFF?text=Energía+Solar",
          fecha: "2025-01-12 16:45:00",
          fecha_creacion: "2025-01-12 14:00:00"
        },
        {
          id: "000005",
          titulo: "Nueva área protegida en la Cordillera Central",
          resumen: "Creación del Parque Nacional Valle Nuevo II para proteger ecosistemas únicos.",
          contenido: "El Ministerio de Medio Ambiente anunció la creación de una nueva área protegida en la Cordillera Central, que será conocida como Parque Nacional Valle Nuevo II. Esta nueva reserva protegerá más de 15,000 hectáreas de bosque nublado y páramo, hábitat de especies endémicas únicas.\n\nLa nueva área protegida alberga más de 200 especies de aves, 50 especies de mamíferos y cientos de especies de plantas endémicas. También protege importantes fuentes de agua que abastecen a varias provincias del país.\n\nEsta declaración representa un paso importante en la conservación de la biodiversidad dominicana y fortalece el sistema nacional de áreas protegidas, que ahora cuenta con más de 120 áreas bajo protección legal.",
          imagen: "https://via.placeholder.com/400x200/795548/FFFFFF?text=Valle+Nuevo",
          fecha: "2025-01-11 11:20:00",
          fecha_creacion: "2025-01-11 09:00:00"
        }
      ];
      
      setNoticias(mockNoticias);
      setFilteredNoticias(mockNoticias);
      setError('Usando datos de demostración (API no disponible)');
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
          <IonGrid>
            <IonRow>
              {filteredNoticias.map((noticia) => (
                <IonCol size="12" sizeMd="6" sizeLg="4" key={noticia.id}>
                  <IonCard 
                    style={{ 
                      height: '100%', 
                      display: 'flex', 
                      flexDirection: 'column',
                      cursor: 'pointer'
                    }}
                    onClick={() => setSelectedNoticia(noticia)}
                  >
                    <IonImg 
                      src={noticia.imagen || 'https://via.placeholder.com/400x200/4CAF50/FFFFFF?text=Noticia'} 
                      alt={noticia.titulo}
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                    <IonCardHeader>
                      <IonCardTitle style={{ fontSize: '1.1em', margin: 0 }}>
                        {noticia.titulo}
                      </IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent style={{ flex: 1 }}>
                      <p style={{ 
                        fontSize: '0.9em', 
                        lineHeight: '1.4', 
                        color: '#666',
                        marginBottom: '15px'
                      }}>
                        {noticia.resumen}
                      </p>
                      
                      <div style={{ marginTop: 'auto' }}>
                        <IonChip color="primary">
                          <IonIcon icon={timeOutline} />
                          <IonLabel>{getTimeAgo(noticia.fecha)}</IonLabel>
                        </IonChip>
                        <IonChip color="secondary">
                          <IonIcon icon={calendarOutline} />
                          <IonLabel>{formatDateShort(noticia.fecha_creacion)}</IonLabel>
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
                    style={{ height: '250px', objectFit: 'cover' }}
                  />
                  <IonCardHeader>
                    <IonCardTitle style={{ fontSize: '1.3em', margin: 0 }}>
                      {selectedNoticia.titulo}
                    </IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <div style={{ marginBottom: '15px' }}>
                      <IonBadge color="primary">
                        <IonIcon icon={timeOutline} />
                        {formatDate(selectedNoticia.fecha)}
                      </IonBadge>
                      <IonBadge color="secondary" style={{ marginLeft: '8px' }}>
                        <IonIcon icon={calendarOutline} />
                        Creado: {formatDate(selectedNoticia.fecha_creacion)}
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
                        <IonIcon icon={newspaperOutline} /> Resumen
                      </h4>
                      <p style={{ 
                        fontSize: '1.1em', 
                        lineHeight: '1.6', 
                        margin: 0,
                        color: '#333'
                      }}>
                        {selectedNoticia.resumen}
                      </p>
                    </div>
                    
                    <div style={{ 
                      whiteSpace: 'pre-wrap', 
                      lineHeight: '1.8',
                      fontSize: '1em',
                      color: '#444'
                    }}>
                      {selectedNoticia.contenido}
                    </div>
                    
                    <div style={{ 
                      marginTop: '25px', 
                      padding: '15px', 
                      backgroundColor: '#f0f8ff',
                      borderRadius: '8px',
                      border: '1px solid #e3f2fd'
                    }}>
                      <h4 style={{ margin: '0 0 10px 0', color: '#1976d2' }}>
                        <IonIcon icon={informationCircleOutline} /> Información Adicional
                      </h4>
                      <p style={{ margin: 0, fontSize: '0.9em', color: '#666' }}>
                        Esta noticia fue publicada por el Ministerio de Medio Ambiente y Recursos Naturales 
                        de la República Dominicana. Para más información, contacta a través de nuestros 
                        canales oficiales.
                      </p>
                    </div>
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
