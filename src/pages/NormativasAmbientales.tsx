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
  IonSkeletonText
} from '@ionic/react';
import {
  documentOutline,
  calendarOutline,
  searchOutline,
  filterOutline,
  closeOutline,
  downloadOutline,
  informationCircleOutline,
  refreshOutline,
  warningOutline,
  checkmarkCircleOutline,
  timeOutline,
  locationOutline,
  peopleOutline,
  leafOutline,
  waterOutline,
  earthOutline,
  flameOutline,
  trashOutline,
  constructOutline,
  businessOutline
} from 'ionicons/icons';
import { useState, useEffect } from 'react';
import { getNormativasAmbientales } from '../utils/api';
import './Page.css';

interface Normativa {
  id: string;
  titulo: string;
  tipo: string;
  numero: string;
  fecha_publicacion: string;
  descripcion: string;
  url_documento: string;
}

const NormativasAmbientales: React.FC = () => {
  const [normativas, setNormativas] = useState<Normativa[]>([]);
  const [filteredNormativas, setFilteredNormativas] = useState<Normativa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTipo, setSelectedTipo] = useState<string>('');
  const [selectedNormativa, setSelectedNormativa] = useState<Normativa | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  // Tipos de normativas disponibles
  const tiposNormativas = [
    { value: 'leyes', label: 'Leyes', icon: documentOutline, color: 'primary' },
    { value: 'decretos', label: 'Decretos', icon: businessOutline, color: 'secondary' },
    { value: 'resoluciones', label: 'Resoluciones', icon: checkmarkCircleOutline, color: 'success' },
    { value: 'reglamentos', label: 'Reglamentos', icon: constructOutline, color: 'warning' },
    { value: 'normas', label: 'Normas Técnicas', icon: informationCircleOutline, color: 'medium' }
  ];

  // Categorías temáticas para colores
  const getCategoriaColor = (tipo: string) => {
    const categorias: { [key: string]: string } = {
      'agua': 'primary',
      'aire': 'secondary',
      'suelo': 'success',
      'biodiversidad': 'warning',
      'residuos': 'danger',
      'energia': 'tertiary',
      'construccion': 'medium'
    };
    
    const tipoLower = tipo.toLowerCase();
    for (const [categoria, color] of Object.entries(categorias)) {
      if (tipoLower.includes(categoria)) return color;
    }
    return 'primary';
  };

  // Cargar normativas
  const loadNormativas = async () => {
    try {
      setLoading(true);
      setError('');
      
      const params: any = {};
      if (selectedTipo) params.tipo = selectedTipo;
      if (searchTerm) params.busqueda = searchTerm;
      
      const response = await getNormativasAmbientales(selectedTipo, searchTerm);
      setNormativas(response.data);
      setFilteredNormativas(response.data);
      
    } catch (error: any) {
      console.error('Error al cargar normativas:', error);
      if (error.response?.status === 401) {
        setError('No tienes autorización para ver las normativas. Inicia sesión nuevamente.');
        setToastMsg('Error de autenticación. Redirigiendo al login...');
        setTimeout(() => {
          window.location.href = '/login';
        }, 3000);
      } else {
        setError('Error al cargar las normativas. Intenta de nuevo.');
        setToastMsg('Error de conexión. Verifica tu conexión a internet.');
      }
      
      // Datos de ejemplo para desarrollo
      setNormativas([
        {
          id: '1',
          titulo: 'Ley General de Medio Ambiente y Recursos Naturales',
          tipo: 'leyes',
          numero: '64-00',
          fecha_publicacion: '2000-08-18',
          descripcion: 'Ley marco que establece las bases para la protección del medio ambiente y el uso sostenible de los recursos naturales en la República Dominicana.',
          url_documento: 'https://ejemplo.com/ley-64-00.pdf'
        },
        {
          id: '2',
          titulo: 'Decreto sobre Gestión Integral de Residuos Sólidos',
          tipo: 'decretos',
          numero: '233-13',
          fecha_publicacion: '2013-07-15',
          descripcion: 'Decreto que regula la gestión integral de residuos sólidos para proteger la salud pública y el medio ambiente.',
          url_documento: 'https://ejemplo.com/decreto-233-13.pdf'
        },
        {
          id: '3',
          titulo: 'Resolución sobre Estándares de Calidad del Aire',
          tipo: 'resoluciones',
          numero: '002-2018',
          fecha_publicacion: '2018-03-20',
          descripcion: 'Establece los estándares nacionales de calidad del aire para proteger la salud de la población.',
          url_documento: 'https://ejemplo.com/resolucion-002-2018.pdf'
        },
        {
          id: '4',
          titulo: 'Reglamento de Evaluación de Impacto Ambiental',
          tipo: 'reglamentos',
          numero: 'R-01-2020',
          fecha_publicacion: '2020-01-10',
          descripcion: 'Reglamento que establece los procedimientos para la evaluación de impacto ambiental de proyectos.',
          url_documento: 'https://ejemplo.com/reglamento-r-01-2020.pdf'
        },
        {
          id: '5',
          titulo: 'Norma Técnica para Monitoreo de Aguas Residuales',
          tipo: 'normas',
          numero: 'NT-001-2021',
          fecha_publicacion: '2021-06-15',
          descripcion: 'Norma técnica que establece los parámetros y métodos para el monitoreo de aguas residuales.',
          url_documento: 'https://ejemplo.com/norma-nt-001-2021.pdf'
        }
      ]);
      setFilteredNormativas([
        {
          id: '1',
          titulo: 'Ley General de Medio Ambiente y Recursos Naturales',
          tipo: 'leyes',
          numero: '64-00',
          fecha_publicacion: '2000-08-18',
          descripcion: 'Ley marco que establece las bases para la protección del medio ambiente y el uso sostenible de los recursos naturales en la República Dominicana.',
          url_documento: 'https://ejemplo.com/ley-64-00.pdf'
        },
        {
          id: '2',
          titulo: 'Decreto sobre Gestión Integral de Residuos Sólidos',
          tipo: 'decretos',
          numero: '233-13',
          fecha_publicacion: '2013-07-15',
          descripcion: 'Decreto que regula la gestión integral de residuos sólidos para proteger la salud pública y el medio ambiente.',
          url_documento: 'https://ejemplo.com/decreto-233-13.pdf'
        },
        {
          id: '3',
          titulo: 'Resolución sobre Estándares de Calidad del Aire',
          tipo: 'resoluciones',
          numero: '002-2018',
          fecha_publicacion: '2018-03-20',
          descripcion: 'Establece los estándares nacionales de calidad del aire para proteger la salud de la población.',
          url_documento: 'https://ejemplo.com/resolucion-002-2018.pdf'
        },
        {
          id: '4',
          titulo: 'Reglamento de Evaluación de Impacto Ambiental',
          tipo: 'reglamentos',
          numero: 'R-01-2020',
          fecha_publicacion: '2020-01-10',
          descripcion: 'Reglamento que establece los procedimientos para la evaluación de impacto ambiental de proyectos.',
          url_documento: 'https://ejemplo.com/reglamento-r-01-2020.pdf'
        },
        {
          id: '5',
          titulo: 'Norma Técnica para Monitoreo de Aguas Residuales',
          tipo: 'normas',
          numero: 'NT-001-2021',
          fecha_publicacion: '2021-06-15',
          descripcion: 'Norma técnica que establece los parámetros y métodos para el monitoreo de aguas residuales.',
          url_documento: 'https://ejemplo.com/norma-nt-001-2021.pdf'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Filtrar normativas
  const filterNormativas = () => {
    let filtered = normativas;

    // Filtrar por tipo
    if (selectedTipo) {
      filtered = filtered.filter(normativa => normativa.tipo === selectedTipo);
    }

    // Filtrar por búsqueda
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(normativa =>
        normativa.titulo.toLowerCase().includes(term) ||
        normativa.descripcion.toLowerCase().includes(term) ||
        normativa.numero.toLowerCase().includes(term)
      );
    }

    setFilteredNormativas(filtered);
  };

  // Efectos
  useEffect(() => {
    loadNormativas();
  }, []);

  useEffect(() => {
    filterNormativas();
  }, [selectedTipo, searchTerm, normativas]);

  // Abrir modal con detalles
  const openNormativaDetails = (normativa: Normativa) => {
    setSelectedNormativa(normativa);
    setShowModal(true);
  };

  // Descargar documento
  const downloadDocument = (url: string, titulo: string) => {
    try {
      const link = document.createElement('a');
      link.href = url;
      link.download = `${titulo}.pdf`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setToastMsg('Descarga iniciada');
    } catch (error) {
      setToastMsg('Error al descargar el documento');
    }
  };

  // Formatear fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-DO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Obtener icono por tipo
  const getTipoIcon = (tipo: string) => {
    const tipoObj = tiposNormativas.find(t => t.value === tipo);
    return tipoObj ? tipoObj.icon : documentOutline;
  };

  // Obtener color por tipo
  const getTipoColor = (tipo: string) => {
    const tipoObj = tiposNormativas.find(t => t.value === tipo);
    return tipoObj ? tipoObj.color : 'primary';
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Normativas Ambientales 📋</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={loadNormativas} disabled={loading}>
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
                    placeholder="Buscar normativas..."
                    showClearButton="focus"
                    style={{ marginBottom: '16px' }}
                  />
                </IonCol>
                <IonCol size="12" sizeMd="6">
                  <IonSelect
                    value={selectedTipo}
                    onIonChange={(e) => setSelectedTipo(e.detail.value)}
                    placeholder="Seleccionar tipo"
                    interface="popover"
                    style={{ marginBottom: '16px' }}
                  >
                    <IonSelectOption value="">Todos los tipos</IonSelectOption>
                    {tiposNormativas.map((tipo) => (
                      <IonSelectOption key={tipo.value} value={tipo.value}>
                        {tipo.label}
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
                {filteredNormativas.length} normativa{filteredNormativas.length !== 1 ? 's' : ''} encontrada{filteredNormativas.length !== 1 ? 's' : ''}
              </IonText>
              {(selectedTipo || searchTerm) && (
                <IonButton
                  fill="clear"
                  size="small"
                  onClick={() => {
                    setSelectedTipo('');
                    setSearchTerm('');
                  }}
                >
                  Limpiar filtros
                </IonButton>
              )}
            </div>
          </IonCardContent>
        </IonCard>

        {/* Lista de normativas */}
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
                onClick={loadNormativas}
              >
                Reintentar
              </IonButton>
            </IonCardContent>
          </IonCard>
        ) : filteredNormativas.length === 0 ? (
          <IonCard style={{ margin: '16px' }}>
            <IonCardContent style={{ textAlign: 'center', padding: '32px' }}>
              <IonIcon 
                icon={searchOutline} 
                style={{ fontSize: '48px', color: '#666', marginBottom: '16px' }} 
              />
              <h3 style={{ color: '#666', marginBottom: '8px' }}>No se encontraron normativas</h3>
              <p style={{ color: '#666', margin: 0 }}>
                {searchTerm || selectedTipo 
                  ? 'Intenta ajustar los filtros de búsqueda'
                  : 'No hay normativas disponibles en este momento'
                }
              </p>
            </IonCardContent>
          </IonCard>
        ) : (
          <div style={{ padding: '0 16px 16px 16px' }}>
            {filteredNormativas.map((normativa) => (
              <IonCard key={normativa.id} style={{ marginBottom: '16px' }}>
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
                        {normativa.titulo}
                      </h3>
                      
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
                        <IonChip color={getTipoColor(normativa.tipo)}>
                          <IonIcon icon={getTipoIcon(normativa.tipo)} />
                          <IonLabel>
                            {tiposNormativas.find(t => t.value === normativa.tipo)?.label || normativa.tipo}
                          </IonLabel>
                        </IonChip>
                        
                        <IonChip color="medium">
                          <IonIcon icon={documentOutline} />
                          <IonLabel>{normativa.numero}</IonLabel>
                        </IonChip>
                        
                        <IonChip color="light">
                          <IonIcon icon={calendarOutline} />
                          <IonLabel>{formatDate(normativa.fecha_publicacion)}</IonLabel>
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
                    {normativa.descripcion.length > 150 
                      ? `${normativa.descripcion.substring(0, 150)}...`
                      : normativa.descripcion
                    }
                  </p>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <IonButton
                      fill="outline"
                      size="small"
                      onClick={() => openNormativaDetails(normativa)}
                    >
                      <IonIcon icon={informationCircleOutline} slot="start" />
                      Ver Detalles
                    </IonButton>
                    
                    {normativa.url_documento && (
                      <IonButton
                        fill="outline"
                        size="small"
                        color="success"
                        onClick={() => downloadDocument(normativa.url_documento, normativa.titulo)}
                      >
                        <IonIcon icon={downloadOutline} slot="start" />
                        Descargar
                      </IonButton>
                    )}
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
              <IonTitle>Detalles de la Normativa</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setShowModal(false)}>
                  <IonIcon icon={closeOutline} />
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>

          <IonContent className="ion-padding">
            {selectedNormativa && (
              <div>
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle style={{ fontSize: '1.2em', marginBottom: '16px' }}>
                      {selectedNormativa.titulo}
                    </IonCardTitle>
                    
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                      <IonChip color={getTipoColor(selectedNormativa.tipo)}>
                        <IonIcon icon={getTipoIcon(selectedNormativa.tipo)} />
                        <IonLabel>
                          {tiposNormativas.find(t => t.value === selectedNormativa.tipo)?.label || selectedNormativa.tipo}
                        </IonLabel>
                      </IonChip>
                      
                      <IonChip color="medium">
                        <IonIcon icon={documentOutline} />
                        <IonLabel>{selectedNormativa.numero}</IonLabel>
                      </IonChip>
                      
                      <IonChip color="light">
                        <IonIcon icon={calendarOutline} />
                        <IonLabel>{formatDate(selectedNormativa.fecha_publicacion)}</IonLabel>
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
                      {selectedNormativa.descripcion}
                    </p>

                    {selectedNormativa.url_documento && (
                      <div style={{ marginTop: '20px' }}>
                        <IonButton
                          expand="block"
                          color="success"
                          onClick={() => downloadDocument(selectedNormativa.url_documento, selectedNormativa.titulo)}
                        >
                          <IonIcon icon={downloadOutline} slot="start" />
                          Descargar Documento Completo
                        </IonButton>
                      </div>
                    )}
                  </IonCardContent>
                </IonCard>
              </div>
            )}
          </IonContent>
        </IonModal>

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

export default NormativasAmbientales;
