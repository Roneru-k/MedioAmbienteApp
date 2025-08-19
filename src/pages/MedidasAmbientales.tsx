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
  IonButtons
} from '@ionic/react';
import {
  leafOutline,
  searchOutline,
  closeOutline,
  refreshOutline as recycleOutline,
  thermometerOutline,
  pawOutline
} from 'ionicons/icons';
import { useState, useEffect } from 'react';
import { getMedidasAmbientales } from '../utils/api';
import './Page.css';

interface Medida {
  id: number;
  titulo: string;
  descripcion: string;
  categoria: string;
  impacto: string;
  dificultad: string;
  tiempo_implementacion: string;
  beneficios: string[];
  pasos: string[];
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
    { value: 'reciclaje', label: 'Reciclaje' },
    { value: 'conservacion', label: 'Conservación' },
    { value: 'cambio_climatico', label: 'Cambio Climático' },
    { value: 'biodiversidad', label: 'Biodiversidad' }
  ];

  useEffect(() => {
    loadMedidas();
  }, []);

  useEffect(() => {
    filterMedidas();
  }, [searchTerm, selectedCategoria, medidas]);

  const filterMedidas = () => {
    let filtered = medidas;

    // Filtrar por categoría
    if (selectedCategoria) {
      filtered = filtered.filter(medida => medida.categoria === selectedCategoria);
    }

    // Filtrar por búsqueda
    if (searchTerm.trim()) {
      filtered = filtered.filter(medida =>
        medida.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        medida.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredMedidas(filtered);
  };

  const loadMedidas = async () => {
    try {
      setLoading(true);
      const response = await getMedidasAmbientales();
      setMedidas(response.data);
      setFilteredMedidas(response.data);
      setError('');
    } catch (err: any) {
      console.error('Error cargando medidas:', err);
      
      // Datos mock para pruebas cuando la API no está disponible
      const mockMedidas = [
        {
          id: 1,
          titulo: "Separación de residuos en casa",
          descripcion: "Aprende a separar correctamente los residuos orgánicos, plásticos, papel y vidrio.",
          categoria: "reciclaje",
          impacto: "Alto",
          dificultad: "Baja",
          tiempo_implementacion: "1 semana",
          beneficios: ["Reduce la contaminación", "Ahorra recursos", "Crea empleos verdes"],
          pasos: [
            "Consigue contenedores separados",
            "Identifica los tipos de residuos",
            "Lava los envases antes de reciclar",
            "Lleva los residuos al centro de acopio"
          ]
        },
        {
          id: 2,
          titulo: "Uso de energía solar",
          descripcion: "Instala paneles solares para generar energía limpia y renovable.",
          categoria: "cambio_climatico",
          impacto: "Muy Alto",
          dificultad: "Media",
          tiempo_implementacion: "1 mes",
          beneficios: ["Reduce emisiones de CO2", "Ahorra en factura eléctrica", "Energía renovable"],
          pasos: [
            "Evalúa el consumo energético",
            "Consulta con especialistas",
            "Instala los paneles solares",
            "Conecta al sistema eléctrico"
          ]
        },
        {
          id: 3,
          titulo: "Conservación de especies nativas",
          descripcion: "Protege y promueve la biodiversidad local plantando especies nativas.",
          categoria: "biodiversidad",
          impacto: "Alto",
          dificultad: "Baja",
          tiempo_implementacion: "2 semanas",
          beneficios: ["Mantiene ecosistemas", "Atrae fauna local", "Mejora la calidad del aire"],
          pasos: [
            "Identifica especies nativas de tu zona",
            "Prepara el terreno adecuadamente",
            "Planta en la época correcta",
            "Riega y cuida regularmente"
          ]
        }
      ];
      
      setMedidas(mockMedidas);
      setFilteredMedidas(mockMedidas);
      setError('Usando datos de demostración (API no disponible)');
    } finally {
      setLoading(false);
    }
  };

  const getImpactColor = (impacto: string) => {
    switch (impacto) {
      case 'alto': return 'success';
      case 'medio': return 'warning';
      case 'bajo': return 'secondary';
      default: return 'primary';
    }
  };

  const getDificultadColor = (dificultad: string) => {
    switch (dificultad) {
      case 'facil': return 'success';
      case 'medio': return 'warning';
      case 'dificil': return 'danger';
      default: return 'primary';
    }
  };

  const getCategoriaIcon = (categoria: string) => {
    switch (categoria) {
      case 'reciclaje':
        return recycleOutline;
      case 'conservacion':
        return leafOutline;
      case 'cambio_climatico':
        return thermometerOutline;
      case 'biodiversidad':
        return pawOutline;
      default:
        return leafOutline;
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
          placeholder="Buscar medidas..."
          showClearButton="focus"
          debounce={500}
        />

        {/* Filtros por categoría */}
        <div style={{ padding: '10px' }}>
          {categorias.map((categoria) => (
            <IonChip
              key={categoria.value}
              color={selectedCategoria === categoria.value ? 'primary' : 'medium'}
              onClick={() => setSelectedCategoria(categoria.value)}
              style={{ cursor: 'pointer' }}
            >
              {categoria.label}
            </IonChip>
          ))}
        </div>

        {/* Estado de carga */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <IonSpinner name="crescent" />
            <p>Cargando medidas...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <IonCard color={error.includes('demostración') ? 'warning' : 'danger'}>
            <IonCardContent>
              <IonText color="light">
                <p>{error}</p>
                {!error.includes('demostración') && (
                  <IonButton fill="outline" color="light" onClick={loadMedidas}>
                    Reintentar
                  </IonButton>
                )}
              </IonText>
            </IonCardContent>
          </IonCard>
        )}

        {/* Lista de medidas */}
        {!loading && !error && (
          <IonList>
            {filteredMedidas.map((medida) => (
              <IonCard key={medida.id}>
                <IonCardContent>
                  <IonItem button onClick={() => setSelectedMedida(medida)}>
                    <IonIcon icon={getCategoriaIcon(medida.categoria)} slot="start" />
                    <IonLabel>
                      <h2>{medida.titulo}</h2>
                      <p>{medida.descripcion}</p>
                      <div style={{ marginTop: '8px' }}>
                        <IonBadge color={getImpactColor(medida.impacto)}>
                          Impacto: {medida.impacto}
                        </IonBadge>
                        <IonBadge color="secondary" style={{ marginLeft: '8px' }}>
                          Dificultad: {medida.dificultad}
                        </IonBadge>
                        <IonChip color="tertiary">
                          <IonLabel>{getCategoriaLabel(medida.categoria)}</IonLabel>
                        </IonChip>
                      </div>
                    </IonLabel>
                  </IonItem>
                </IonCardContent>
              </IonCard>
            ))}
          </IonList>
        )}

        {/* Mensaje cuando no hay resultados */}
        {!loading && !error && filteredMedidas.length === 0 && (
          <IonCard>
            <IonCardContent>
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <IonIcon icon={searchOutline} size="large" style={{ color: '#ccc' }} />
                <p>No se encontraron medidas con los criterios de búsqueda</p>
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
                    <IonCardTitle>
                      <IonIcon icon={getCategoriaIcon(selectedMedida.categoria)} />
                      {selectedMedida.titulo}
                    </IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <p style={{ fontSize: '1.1em', lineHeight: '1.6', marginBottom: '15px' }}>
                      {selectedMedida.descripcion}
                    </p>
                    
                    <div style={{ marginBottom: '15px' }}>
                      <IonBadge color={getImpactColor(selectedMedida.impacto)}>
                        Impacto: {selectedMedida.impacto}
                      </IonBadge>
                      <IonBadge color="secondary" style={{ marginLeft: '8px' }}>
                        Dificultad: {selectedMedida.dificultad}
                      </IonBadge>
                      <IonBadge color="tertiary" style={{ marginLeft: '8px' }}>
                        Tiempo: {selectedMedida.tiempo_implementacion}
                      </IonBadge>
                    </div>

                    <h4>Beneficios:</h4>
                    <ul>
                      {selectedMedida.beneficios.map((beneficio, index) => (
                        <li key={index}>{beneficio}</li>
                      ))}
                    </ul>

                    <h4>Pasos para implementar:</h4>
                    <ol>
                      {selectedMedida.pasos.map((paso, index) => (
                        <li key={index}>{paso}</li>
                      ))}
                    </ol>
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
