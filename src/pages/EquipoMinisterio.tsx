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
  IonAvatar,
  IonIcon,
  IonButton,
  IonList,
  IonSearchbar,
  IonChip,
  IonBadge,
  IonSpinner,
  IonText,
  IonModal,
  IonButtons,
  IonSegment,
  IonSegmentButton,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/react';
import {
  personOutline,
  callOutline,
  mailOutline,
  businessOutline,
  starOutline,
  searchOutline,
  closeOutline,
  informationCircleOutline,
  peopleOutline
} from 'ionicons/icons';
import { useState, useEffect } from 'react';
import { getEquipoMinisterio } from '../utils/api';
import './Page.css';

interface Miembro {
  id: string;
  nombre: string;
  cargo: string;
  departamento: string;
  foto: string;
  biografia: string;
  orden: number;
  fecha_creacion: string;
}

const EquipoMinisterio: React.FC = () => {
  const [equipo, setEquipo] = useState<Miembro[]>([]);
  const [filteredEquipo, setFilteredEquipo] = useState<Miembro[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedDepartamento, setSelectedDepartamento] = useState<string>('');
  const [selectedMiembro, setSelectedMiembro] = useState<Miembro | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  const departamentos = [
    { value: '', label: 'Todos' },
    { value: 'Dirección General', label: 'Dirección General' },
    { value: 'Recursos Naturales', label: 'Recursos Naturales' },
    { value: 'Gestión Ambiental', label: 'Gestión Ambiental' },
    { value: 'Áreas Protegidas', label: 'Áreas Protegidas' },
    { value: 'Educación Ambiental', label: 'Educación Ambiental' },
    { value: 'Cambio Climático', label: 'Cambio Climático' },
    { value: 'Investigación', label: 'Investigación' },
    { value: 'Gestión de Residuos', label: 'Gestión de Residuos' }
  ];

  useEffect(() => {
    loadEquipo();
  }, []);

  useEffect(() => {
    if (selectedDepartamento) {
      // Si se selecciona un departamento, cargar desde la API
      loadEquipo(selectedDepartamento);
    } else {
      // Si no hay departamento seleccionado, filtrar localmente
      filterEquipo();
    }
  }, [selectedDepartamento]);

  useEffect(() => {
    // Filtrar por búsqueda solo cuando no hay departamento seleccionado
    if (!selectedDepartamento) {
      filterEquipo();
    }
  }, [searchTerm, equipo]);

  const filterEquipo = () => {
    if (searchTerm.trim() === '') {
      setFilteredEquipo(equipo);
    } else {
      const filtered = equipo.filter(miembro =>
        miembro.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        miembro.cargo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        miembro.departamento.toLowerCase().includes(searchTerm.toLowerCase()) ||
        miembro.biografia.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredEquipo(filtered);
    }
  };

  const loadEquipo = async (departamento?: string) => {
    try {
      setLoading(true);
      const response = await getEquipoMinisterio(departamento);
      if (departamento) {
        // Si se está filtrando, actualizar solo el equipo filtrado
        setFilteredEquipo(response.data);
      } else {
        // Si se cargan todos los miembros, actualizar ambos estados
        setEquipo(response.data);
        setFilteredEquipo(response.data);
      }
      setError('');
    } catch (err: any) {
      console.error('Error cargando equipo:', err);
      
      // Datos mock para pruebas cuando la API no está disponible
      const mockEquipo = [
        {
          id: "000001",
          nombre: "Dr. Juan Pérez",
          cargo: "Ministro de Medio Ambiente",
          departamento: "Dirección General",
          foto: "https://via.placeholder.com/150/4CAF50/FFFFFF?text=JP",
          biografia: "Doctor en Ciencias Ambientales con más de 20 años de experiencia en conservación y políticas ambientales. Ha liderado importantes iniciativas de protección ambiental y desarrollo sostenible en la República Dominicana.",
          orden: 1,
          fecha_creacion: "2025-01-15 10:00:00"
        },
        {
          id: "000002",
          nombre: "Ing. María Rodríguez",
          cargo: "Viceministra de Recursos Naturales",
          departamento: "Recursos Naturales",
          foto: "https://via.placeholder.com/150/2196F3/FFFFFF?text=MR",
          biografia: "Ingeniera forestal con especialización en gestión de recursos naturales y conservación de biodiversidad. Experta en políticas de conservación y manejo sostenible de ecosistemas.",
          orden: 2,
          fecha_creacion: "2025-01-15 10:00:00"
        },
        {
          id: "000003",
          nombre: "Dra. Ana Martínez",
          cargo: "Viceministra de Gestión Ambiental",
          departamento: "Gestión Ambiental",
          foto: "https://via.placeholder.com/150/FF9800/FFFFFF?text=AM",
          biografia: "Abogada ambientalista con amplia experiencia en normativas ambientales y derecho internacional. Ha participado en la elaboración de importantes leyes ambientales del país.",
          orden: 3,
          fecha_creacion: "2025-01-15 10:00:00"
        },
        {
          id: "000004",
          nombre: "Ing. Carlos González",
          cargo: "Director de Áreas Protegidas",
          departamento: "Áreas Protegidas",
          foto: "https://via.placeholder.com/150/8BC34A/FFFFFF?text=CG",
          biografia: "Especialista en gestión de áreas protegidas y conservación de ecosistemas marinos y terrestres. Ha trabajado en la protección de importantes reservas naturales del país.",
          orden: 4,
          fecha_creacion: "2025-01-15 10:00:00"
        },
        {
          id: "000005",
          nombre: "Lic. Patricia López",
          cargo: "Directora de Educación Ambiental",
          departamento: "Educación Ambiental",
          foto: "https://via.placeholder.com/150/9C27B0/FFFFFF?text=PL",
          biografia: "Educadora ambiental con experiencia en programas de concientización y participación ciudadana. Ha desarrollado numerosas campañas educativas sobre protección ambiental.",
          orden: 5,
          fecha_creacion: "2025-01-15 10:00:00"
        },
        {
          id: "000006",
          nombre: "Ing. Roberto Salcedo",
          cargo: "Director de Cambio Climático",
          departamento: "Cambio Climático",
          foto: "https://via.placeholder.com/150/607D8B/FFFFFF?text=RS",
          biografia: "Especialista en mitigación y adaptación al cambio climático con experiencia en proyectos internacionales. Ha representado al país en importantes cumbres climáticas.",
          orden: 6,
          fecha_creacion: "2025-01-15 10:00:00"
        },
        {
          id: "000007",
          nombre: "Dra. Yolanda León",
          cargo: "Directora de Investigación",
          departamento: "Investigación",
          foto: "https://via.placeholder.com/150/E91E63/FFFFFF?text=YL",
          biografia: "Bióloga marina con doctorado en ciencias ambientales y amplia experiencia en investigación científica. Ha publicado numerosos estudios sobre biodiversidad marina.",
          orden: 7,
          fecha_creacion: "2025-01-15 10:00:00"
        },
        {
          id: "000008",
          nombre: "Ing. José Rodríguez",
          cargo: "Director de Gestión de Residuos",
          departamento: "Gestión de Residuos",
          foto: "https://via.placeholder.com/150/795548/FFFFFF?text=JR",
          biografia: "Ingeniero ambiental especializado en gestión integral de residuos sólidos y economía circular. Ha implementado importantes programas de reciclaje en el país.",
          orden: 8,
          fecha_creacion: "2025-01-15 10:00:00"
        }
      ];
      
      setEquipo(mockEquipo);
      setFilteredEquipo(mockEquipo);
      setError('Usando datos de demostración (API no disponible)');
    } finally {
      setLoading(false);
    }
  };

  const handleDepartamentoChange = (departamento: string) => {
    setSelectedDepartamento(departamento);
    setSearchTerm(''); // Limpiar búsqueda al cambiar departamento
  };

  const getDepartamentoColor = (departamento: string) => {
    switch (departamento) {
      case 'Dirección General':
        return 'primary';
      case 'Recursos Naturales':
        return 'success';
      case 'Gestión Ambiental':
        return 'secondary';
      case 'Áreas Protegidas':
        return 'tertiary';
      case 'Educación Ambiental':
        return 'warning';
      case 'Cambio Climático':
        return 'danger';
      case 'Investigación':
        return 'medium';
      case 'Gestión de Residuos':
        return 'dark';
      default:
        return 'primary';
    }
  };

  const getDepartamentoLabel = (departamento: string) => {
    const dept = departamentos.find(d => d.value === departamento);
    return dept ? dept.label : departamento;
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Equipo del Ministerio</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Equipo del Ministerio</IonTitle>
          </IonToolbar>
        </IonHeader>

        {/* Barra de búsqueda */}
        <IonSearchbar
          value={searchTerm}
          onIonInput={(e) => setSearchTerm(e.detail.value!)}
          placeholder="Buscar por nombre, cargo o departamento..."
          showClearButton="focus"
          debounce={500}
        />

        {/* Filtro por departamentos */}
        <div style={{ padding: '10px 0' }}>
          <IonSegment
            value={selectedDepartamento}
            onIonChange={(e) => handleDepartamentoChange(e.detail.value as string)}
            scrollable={true}
          >
            {departamentos.map((depto) => (
              <IonSegmentButton key={depto.value} value={depto.value}>
                <IonLabel>{depto.label}</IonLabel>
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
                {filteredEquipo.length} miembro{filteredEquipo.length !== 1 ? 's' : ''} encontrado{filteredEquipo.length !== 1 ? 's' : ''}
                {selectedDepartamento && (
                  <span> de <strong>{getDepartamentoLabel(selectedDepartamento)}</strong></span>
                )}
                {searchTerm && (
                  <span> para "<strong>{searchTerm}</strong>"</span>
                )}
              </span>
              {(selectedDepartamento || searchTerm) && (
                <IonButton 
                  fill="clear" 
                  size="small"
                  onClick={() => {
                    setSelectedDepartamento('');
                    setSearchTerm('');
                    loadEquipo();
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
            <p>Cargando equipo del ministerio...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <IonCard color={error.includes('demostración') ? 'warning' : 'danger'}>
            <IonCardContent>
              <IonText color="light">
                <p>{error}</p>
                {!error.includes('demostración') && (
                  <IonButton fill="outline" color="light" onClick={() => loadEquipo()}>
                    Reintentar
                  </IonButton>
                )}
              </IonText>
            </IonCardContent>
          </IonCard>
        )}

        {/* Lista del equipo */}
        {!loading && !error && (
          <IonGrid>
            <IonRow>
              {filteredEquipo.map((miembro) => (
                <IonCol size="12" sizeMd="6" sizeLg="4" key={miembro.id}>
                  <IonCard 
                    style={{ 
                      height: '100%', 
                      display: 'flex', 
                      flexDirection: 'column',
                      cursor: 'pointer'
                    }}
                    onClick={() => setSelectedMiembro(miembro)}
                  >
                    <IonCardContent style={{ flex: 1, textAlign: 'center' }}>
                      <IonAvatar style={{ 
                        width: '80px', 
                        height: '80px', 
                        margin: '0 auto 15px auto',
                        border: '3px solid var(--ion-color-primary)'
                      }}>
                        <img src={miembro.foto} alt={miembro.nombre} />
                      </IonAvatar>
                      
                      <h3 style={{ 
                        fontSize: '1.1em', 
                        margin: '0 0 5px 0',
                        fontWeight: 'bold',
                        color: '#333'
                      }}>
                        {miembro.nombre}
                      </h3>
                      
                      <p style={{ 
                        fontSize: '0.9em', 
                        color: '#3880ff', 
                        fontWeight: 'bold',
                        margin: '0 0 10px 0'
                      }}>
                        {miembro.cargo}
                      </p>
                      
                      <IonChip color={getDepartamentoColor(miembro.departamento)}>
                        <IonIcon icon={businessOutline} />
                        <IonLabel>{miembro.departamento}</IonLabel>
                      </IonChip>
                      
                      <p style={{ 
                        fontSize: '0.8em', 
                        color: '#666',
                        marginTop: '10px',
                        lineHeight: '1.4'
                      }}>
                        {miembro.biografia.length > 100 
                          ? `${miembro.biografia.substring(0, 100)}...`
                          : miembro.biografia
                        }
                      </p>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        )}

        {/* Mensaje cuando no hay resultados */}
        {!loading && !error && filteredEquipo.length === 0 && (
          <IonCard>
            <IonCardContent>
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <IonIcon icon={searchOutline} size="large" style={{ color: '#ccc' }} />
                <h3 style={{ color: '#666', marginBottom: '10px' }}>No se encontraron miembros</h3>
                <p style={{ color: '#888', marginBottom: '15px' }}>
                  {searchTerm && selectedDepartamento 
                    ? `No hay miembros de "${selectedDepartamento}" que coincidan con "${searchTerm}"`
                    : searchTerm 
                    ? `No hay miembros que coincidan con "${searchTerm}"`
                    : selectedDepartamento 
                    ? `No hay miembros del departamento "${selectedDepartamento}"`
                    : 'No hay miembros del equipo disponibles'
                  }
                </p>
                <IonButton 
                  fill="outline" 
                  size="small"
                  onClick={() => {
                    setSelectedDepartamento('');
                    setSearchTerm('');
                    loadEquipo();
                  }}
                >
                  Ver todo el equipo
                </IonButton>
              </div>
            </IonCardContent>
          </IonCard>
        )}

        {/* Modal con detalles del miembro */}
        <IonModal isOpen={!!selectedMiembro} onDidDismiss={() => setSelectedMiembro(null)}>
          {selectedMiembro && (
            <>
              <IonHeader>
                <IonToolbar>
                  <IonButtons slot="start">
                    <IonButton onClick={() => setSelectedMiembro(null)}>
                      <IonIcon icon={closeOutline} />
                    </IonButton>
                  </IonButtons>
                  <IonTitle>Detalles del Miembro</IonTitle>
                </IonToolbar>
              </IonHeader>
              <IonContent>
                <IonCard>
                  <IonCardContent style={{ textAlign: 'center' }}>
                    <IonAvatar style={{ 
                      width: '120px', 
                      height: '120px', 
                      margin: '0 auto 20px auto',
                      border: '4px solid var(--ion-color-primary)'
                    }}>
                      <img src={selectedMiembro.foto} alt={selectedMiembro.nombre} />
                    </IonAvatar>
                    
                    <h2 style={{ 
                      fontSize: '1.4em', 
                      margin: '0 0 10px 0',
                      fontWeight: 'bold',
                      color: '#333'
                    }}>
                      {selectedMiembro.nombre}
                    </h2>
                    
                    <p style={{ 
                      fontSize: '1.1em', 
                      color: '#3880ff', 
                      fontWeight: 'bold',
                      margin: '0 0 15px 0'
                    }}>
                      {selectedMiembro.cargo}
                    </p>
                    
                    <IonChip color={getDepartamentoColor(selectedMiembro.departamento)}>
                      <IonIcon icon={businessOutline} />
                      <IonLabel>{selectedMiembro.departamento}</IonLabel>
                    </IonChip>
                    
                    <div style={{ 
                      backgroundColor: '#f8f9fa', 
                      padding: '20px', 
                      borderRadius: '8px',
                      marginTop: '20px',
                      borderLeft: '4px solid #4CAF50'
                    }}>
                      <h4 style={{ margin: '0 0 15px 0', color: '#4CAF50' }}>
                        <IonIcon icon={informationCircleOutline} /> Biografía
                      </h4>
                      <p style={{ 
                        fontSize: '1em', 
                        lineHeight: '1.6', 
                        margin: 0,
                        color: '#333',
                        textAlign: 'left'
                      }}>
                        {selectedMiembro.biografia}
                      </p>
                    </div>
                  </IonCardContent>
                </IonCard>
              </IonContent>
            </>
          )}
        </IonModal>

        {/* Información adicional */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={peopleOutline} /> Nuestro Compromiso
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>
              Nuestro equipo está comprometido con la protección del medio ambiente 
              y el desarrollo sostenible de la República Dominicana. Cada miembro 
              aporta su experiencia y dedicación para crear un futuro más verde 
              y próspero para todos los dominicanos.
            </p>
            <p>
              Si necesitas contactar a algún miembro específico del equipo, 
              puedes usar los botones de contacto en cada tarjeta o escribir 
              a la dirección general del ministerio.
            </p>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default EquipoMinisterio;
