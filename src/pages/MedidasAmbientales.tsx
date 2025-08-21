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
  IonButton,
  IonIcon,
  IonModal,
  IonList,
  IonSearchbar,
  IonChip,
  IonBadge,
  IonSpinner,
  IonText,
  IonButtons,
  IonSegment,
  IonSegmentButton,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/react';
import {
  leafOutline,
  searchOutline,
  closeOutline,
  refreshOutline,
  thermometerOutline,
  pawOutline,
  waterOutline,
  bulbOutline,
  heartOutline,
  informationCircleOutline
} from 'ionicons/icons';
import { useState, useEffect } from 'react';
import { getMedidasAmbientales } from '../utils/api';
import './Page.css';

interface Medida {
  id: string;
  titulo: string;
  descripcion: string;
  categoria: string;
  icono: string;
  fecha_creacion: string;
}

const MedidasAmbientales: React.FC = () => {
  const [medidas, setMedidas] = useState<Medida[]>([]);
  const [filteredMedidas, setFilteredMedidas] = useState<Medida[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategoria, setSelectedCategoria] = useState<string>('');
  const [selectedMedida, setSelectedMedida] = useState<Medida | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  const categorias = [
    { value: '', label: 'Todas' },
    { value: 'consumo_responsable', label: 'Consumo Responsable' },
    { value: 'reciclaje', label: 'Reciclaje' },
    { value: 'conservacion', label: 'Conservación' },
    { value: 'cambio_climatico', label: 'Cambio Climático' },
    { value: 'biodiversidad', label: 'Biodiversidad' },
    { value: 'energia_renovable', label: 'Energía Renovable' },
    { value: 'agua', label: 'Agua' }
  ];

  useEffect(() => {
    loadMedidas();
  }, []);

  useEffect(() => {
    if (selectedCategoria) {
      // Si se selecciona una categoría, cargar desde la API
      loadMedidas(selectedCategoria);
    } else {
      // Si no hay categoría seleccionada, filtrar localmente
      filterMedidas();
    }
  }, [selectedCategoria]);

  useEffect(() => {
    // Filtrar por búsqueda solo cuando no hay categoría seleccionada
    if (!selectedCategoria) {
      filterMedidas();
    }
  }, [searchTerm, medidas]);

  const filterMedidas = () => {
    if (searchTerm.trim() === '') {
      setFilteredMedidas(medidas);
    } else {
      const filtered = medidas.filter(medida =>
        medida.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        medida.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
        medida.categoria.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredMedidas(filtered);
    }
  };

  const loadMedidas = async (categoria?: string) => {
    try {
      setLoading(true);
      const response = await getMedidasAmbientales(categoria);
      if (categoria) {
        // Si se está filtrando, actualizar solo las medidas filtradas
        setFilteredMedidas(response.data);
      } else {
        // Si se cargan todas las medidas, actualizar ambos estados
        setMedidas(response.data);
        setFilteredMedidas(response.data);
      }
      setError('');
    } catch (err: any) {
      console.error('Error cargando medidas:', err);
      
      // Datos mock para pruebas cuando la API no está disponible
      const mockMedidas = [
        {
          id: "000001",
          titulo: "Reduce el uso de plásticos desechables",
          descripcion: "Evita el uso de bolsas, botellas y envases plásticos de un solo uso. Opta por alternativas reutilizables como bolsas de tela y botellas de agua recargables.",
          categoria: "consumo_responsable",
          icono: "♿️",
          fecha_creacion: "2025-01-15 10:00:00"
        },
        {
          id: "000002",
          titulo: "Separa correctamente los residuos",
          descripcion: "Implementa un sistema de separación de residuos en tu hogar. Separa orgánicos, plásticos, papel, vidrio y residuos peligrosos.",
          categoria: "reciclaje",
          icono: "♻️",
          fecha_creacion: "2025-01-15 10:00:00"
        },
        {
          id: "000003",
          titulo: "Usa transporte público o bicicleta",
          descripcion: "Reduce las emisiones de CO2 utilizando transporte público, bicicleta o caminando para trayectos cortos.",
          categoria: "cambio_climatico",
          icono: "🚲",
          fecha_creacion: "2025-01-15 10:00:00"
        },
        {
          id: "000004",
          titulo: "Planta árboles nativos",
          descripcion: "Contribuye a la reforestación plantando especies nativas de tu región. Los árboles absorben CO2 y proporcionan hábitat para la fauna local.",
          categoria: "biodiversidad",
          icono: "🌳",
          fecha_creacion: "2025-01-15 10:00:00"
        },
        {
          id: "000005",
          titulo: "Instala paneles solares",
          descripcion: "Genera tu propia energía limpia instalando paneles solares en tu hogar. Reduce tu huella de carbono y ahorra en facturas eléctricas.",
          categoria: "energia_renovable",
          icono: "☀️",
          fecha_creacion: "2025-01-15 10:00:00"
        },
        {
          id: "000006",
          titulo: "Ahorra agua en el hogar",
          descripcion: "Instala dispositivos ahorradores de agua, repara fugas y adopta hábitos de consumo responsable de este recurso vital.",
          categoria: "agua",
          icono: "💧",
          fecha_creacion: "2025-01-15 10:00:00"
        },
        {
          id: "000007",
          titulo: "Consume productos locales",
          descripcion: "Compra productos de temporada y de productores locales. Reduce la huella de carbono del transporte y apoya la economía local.",
          categoria: "consumo_responsable",
          icono: "🏪",
          fecha_creacion: "2025-01-15 10:00:00"
        },
        {
          id: "000008",
          titulo: "Participa en limpiezas comunitarias",
          descripcion: "Únete a iniciativas de limpieza de playas, ríos y espacios públicos. Contribuye a mantener limpios los ecosistemas locales.",
          categoria: "conservacion",
          icono: "🧹",
          fecha_creacion: "2025-01-15 10:00:00"
        }
      ];
      
      setMedidas(mockMedidas);
      setFilteredMedidas(mockMedidas);
      setError('Usando datos de demostración (API no disponible)');
    } finally {
      setLoading(false);
    }
  };

  const handleCategoriaChange = (categoria: string) => {
    setSelectedCategoria(categoria);
    setSearchTerm(''); // Limpiar búsqueda al cambiar categoría
  };

  const getCategoriaIcon = (categoria: string) => {
    switch (categoria) {
      case 'consumo_responsable':
        return heartOutline;
      case 'reciclaje':
        return refreshOutline;
      case 'conservacion':
        return leafOutline;
      case 'cambio_climatico':
        return thermometerOutline;
      case 'biodiversidad':
        return pawOutline;
      case 'energia_renovable':
        return bulbOutline;
      case 'agua':
        return waterOutline;
      default:
        return leafOutline;
    }
  };

  const getCategoriaColor = (categoria: string) => {
    switch (categoria) {
      case 'consumo_responsable':
        return 'primary';
      case 'reciclaje':
        return 'success';
      case 'conservacion':
        return 'secondary';
      case 'cambio_climatico':
        return 'warning';
      case 'biodiversidad':
        return 'tertiary';
      case 'energia_renovable':
        return 'danger';
      case 'agua':
        return 'medium';
      default:
        return 'primary';
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
          <IonTitle>Medidas Ambientales</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Medidas Ambientales</IonTitle>
          </IonToolbar>
        </IonHeader>

        {/* Barra de búsqueda */}
        <IonSearchbar
          value={searchTerm}
          onIonInput={(e) => setSearchTerm(e.detail.value!)}
          placeholder="Buscar medidas ambientales..."
          showClearButton="focus"
          debounce={500}
        />

        {/* Filtro por categorías */}
        <div style={{ padding: '10px 0' }}>
          <IonSegment
            value={selectedCategoria}
            onIonChange={(e) => handleCategoriaChange(e.detail.value as string)}
            scrollable={true}
          >
            {categorias.map((categoria) => (
              <IonSegmentButton key={categoria.value} value={categoria.value}>
                <IonLabel>{categoria.label}</IonLabel>
              </IonSegmentButton>
            ))}
          </IonSegment>
          
          {/* Contador de resultados */}
          {!loading && !error && (
            <div style={{ 
              padding: '10px 16px', 
              fontSize: '0.9em', 
              color: '#666',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span>
                {filteredMedidas.length} medida{filteredMedidas.length !== 1 ? 's' : ''} encontrada{filteredMedidas.length !== 1 ? 's' : ''}
                {selectedCategoria && (
                  <span> de <strong>{getCategoriaLabel(selectedCategoria)}</strong></span>
                )}
                {searchTerm && (
                  <span> para "<strong>{searchTerm}</strong>"</span>
                )}
              </span>
              {(selectedCategoria || searchTerm) && (
                <IonButton 
                  fill="clear" 
                  size="small"
                  onClick={() => {
                    setSelectedCategoria('');
                    setSearchTerm('');
                    loadMedidas();
                  }}
                >
                  Limpiar filtros
                </IonButton>
              )}
            </div>
          )}
        </div>

        {/* Estado de carga */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <IonSpinner name="crescent" />
            <p>Cargando medidas ambientales...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <IonCard color={error.includes('demostración') ? 'warning' : 'danger'}>
            <IonCardContent>
              <IonText color="light">
                <p>{error}</p>
                {!error.includes('demostración') && (
                  <IonButton fill="outline" color="light" onClick={() => loadMedidas()}>
                    Reintentar
                  </IonButton>
                )}
              </IonText>
            </IonCardContent>
          </IonCard>
        )}

        {/* Lista de medidas */}
        {!loading && !error && (
          <IonGrid>
            <IonRow>
              {filteredMedidas.map((medida) => (
                <IonCol size="12" sizeMd="6" sizeLg="4" key={medida.id}>
                  <IonCard 
                    style={{ 
                      height: '100%', 
                      display: 'flex', 
                      flexDirection: 'column',
                      cursor: 'pointer'
                    }}
                    onClick={() => setSelectedMedida(medida)}
                  >
                    <IonCardHeader>
                      <IonCardTitle style={{ fontSize: '1.1em', margin: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '1.5em' }}>{medida.icono}</span>
                          {medida.titulo}
                        </div>
                      </IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent style={{ flex: 1 }}>
                      <p style={{ 
                        fontSize: '0.9em', 
                        lineHeight: '1.4', 
                        color: '#666',
                        marginBottom: '15px'
                      }}>
                        {medida.descripcion.length > 120 
                          ? `${medida.descripcion.substring(0, 120)}...`
                          : medida.descripcion
                        }
                      </p>
                      
                      <div style={{ marginTop: 'auto' }}>
                        <IonChip color={getCategoriaColor(medida.categoria)}>
                          <IonIcon icon={getCategoriaIcon(medida.categoria)} />
                          <IonLabel>{getCategoriaLabel(medida.categoria)}</IonLabel>
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
        {!loading && !error && filteredMedidas.length === 0 && (
          <IonCard>
            <IonCardContent>
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <IonIcon icon={searchOutline} size="large" style={{ color: '#ccc' }} />
                <h3 style={{ color: '#666', marginBottom: '10px' }}>No se encontraron medidas</h3>
                <p style={{ color: '#888', marginBottom: '15px' }}>
                  {searchTerm && selectedCategoria 
                    ? `No hay medidas de "${selectedCategoria}" que coincidan con "${searchTerm}"`
                    : searchTerm 
                    ? `No hay medidas que coincidan con "${searchTerm}"`
                    : selectedCategoria 
                    ? `No hay medidas de la categoría "${selectedCategoria}"`
                    : 'No hay medidas ambientales disponibles'
                  }
                </p>
                <IonButton 
                  fill="outline" 
                  size="small"
                  onClick={() => {
                    setSelectedCategoria('');
                    setSearchTerm('');
                    loadMedidas();
                  }}
                >
                  Ver todas las medidas
                </IonButton>
              </div>
            </IonCardContent>
          </IonCard>
        )}

        {/* Modal con detalles de la medida */}
        <IonModal isOpen={!!selectedMedida} onDidDismiss={() => setSelectedMedida(null)}>
          {selectedMedida && (
            <>
              <IonHeader>
                <IonToolbar>
                  <IonButtons slot="start">
                    <IonButton onClick={() => setSelectedMedida(null)}>
                      <IonIcon icon={closeOutline} />
                    </IonButton>
                  </IonButtons>
                  <IonTitle>Detalles de la Medida</IonTitle>
                </IonToolbar>
              </IonHeader>
              <IonContent>
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle style={{ fontSize: '1.3em', margin: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '2em' }}>{selectedMedida.icono}</span>
                        {selectedMedida.titulo}
                      </div>
                    </IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <div style={{ marginBottom: '15px' }}>
                      <IonBadge color={getCategoriaColor(selectedMedida.categoria)}>
                        <IonIcon icon={getCategoriaIcon(selectedMedida.categoria)} />
                        {getCategoriaLabel(selectedMedida.categoria)}
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
                        {selectedMedida.descripcion}
                      </p>
                    </div>

                    <div style={{ 
                      backgroundColor: '#e3f2fd', 
                      padding: '15px', 
                      borderRadius: '8px',
                      borderLeft: '4px solid #2196F3'
                    }}>
                      <h4 style={{ margin: '0 0 10px 0', color: '#1976d2' }}>
                        <IonIcon icon={leafOutline} /> ¿Por qué es importante?
                      </h4>
                      <p style={{ 
                        fontSize: '1em', 
                        lineHeight: '1.5', 
                        margin: 0,
                        color: '#333'
                      }}>
                        Esta medida contribuye significativamente a la protección del medio ambiente, 
                        ayudando a reducir la contaminación, conservar recursos naturales y promover 
                        un desarrollo sostenible para las futuras generaciones.
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

export default MedidasAmbientales;
