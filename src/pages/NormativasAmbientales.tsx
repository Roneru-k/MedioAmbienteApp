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
} from '@ionic/react';
import {
  documentOutline,
  calendarOutline,
  checkmarkCircleOutline,
  closeOutline,
  searchOutline,
  downloadOutline,
  informationCircleOutline,
} from 'ionicons/icons';
import { useState } from 'react';
import './Page.css';

interface Normativa {
  id: number;
  titulo: string;
  numero: string;
  tipo: 'ley' | 'decreto' | 'resolucion' | 'reglamento';
  fecha: string;
  estado: 'vigente' | 'modificada' | 'derogada';
  descripcion: string;
  contenido: string;
  categoria: string;
  url?: string;
}

const NormativasAmbientales: React.FC = () => {
  const [selectedNormativa, setSelectedNormativa] = useState<Normativa | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedTipo, setSelectedTipo] = useState<string>('todos');

  const normativas: Normativa[] = [
    {
      id: 1,
      titulo: "Ley General de Medio Ambiente y Recursos Naturales",
      numero: "Ley 64-00",
      tipo: "ley",
      fecha: "18/08/2000",
      estado: "vigente",
      descripcion: "Ley marco que establece las bases para la protección del medio ambiente y los recursos naturales.",
      contenido: "Esta ley establece los principios, objetivos y mecanismos para la protección del medio ambiente y los recursos naturales de la República Dominicana. Incluye disposiciones sobre gestión ambiental, participación ciudadana, evaluación de impacto ambiental y sanciones.",
      categoria: "Marco Legal",
      url: "https://medioambiente.gob.do/ley-64-00"
    },
    {
      id: 2,
      titulo: "Ley Sectorial de Áreas Protegidas",
      numero: "Ley 202-04",
      tipo: "ley",
      fecha: "30/07/2004",
      estado: "vigente",
      descripcion: "Ley que regula la conservación y manejo de las áreas protegidas del país.",
      contenido: "Esta ley establece el Sistema Nacional de Áreas Protegidas (SINAP) y regula la conservación, protección y manejo de las áreas protegidas de la República Dominicana.",
      categoria: "Áreas Protegidas",
      url: "https://medioambiente.gob.do/ley-202-04"
    },
    {
      id: 3,
      titulo: "Reglamento de Evaluación de Impacto Ambiental",
      numero: "Decreto 125-12",
      tipo: "decreto",
      fecha: "15/03/2012",
      estado: "vigente",
      descripcion: "Reglamento que establece los procedimientos para la evaluación de impacto ambiental.",
      contenido: "Este reglamento establece los procedimientos, criterios y metodologías para la evaluación de impacto ambiental de proyectos, obras o actividades que puedan causar daños al medio ambiente.",
      categoria: "Evaluación Ambiental",
      url: "https://medioambiente.gob.do/decreto-125-12"
    },
    {
      id: 4,
      titulo: "Ley de Gestión Integral de Residuos Sólidos",
      numero: "Ley 225-20",
      tipo: "ley",
      fecha: "20/10/2020",
      estado: "vigente",
      descripcion: "Ley que regula la gestión integral de residuos sólidos en el país.",
      contenido: "Esta ley establece el marco legal para la gestión integral de residuos sólidos, promoviendo la reducción, reutilización, reciclaje y valorización de los mismos.",
      categoria: "Gestión de Residuos",
      url: "https://medioambiente.gob.do/ley-225-20"
    },
    {
      id: 5,
      titulo: "Resolución sobre Normas de Calidad del Aire",
      numero: "Resolución 002-2018",
      tipo: "resolucion",
      fecha: "15/01/2018",
      estado: "vigente",
      descripcion: "Establece las normas de calidad del aire ambiente para la República Dominicana.",
      contenido: "Esta resolución establece los límites máximos permisibles de contaminantes en el aire ambiente y los procedimientos para su monitoreo y control.",
      categoria: "Calidad del Aire",
      url: "https://medioambiente.gob.do/resolucion-002-2018"
    },
    {
      id: 6,
      titulo: "Reglamento de Gestión de Residuos Peligrosos",
      numero: "Decreto 233-13",
      tipo: "decreto",
      fecha: "20/08/2013",
      estado: "vigente",
      descripcion: "Reglamento para la gestión integral de residuos peligrosos.",
      contenido: "Este reglamento establece las normas técnicas y procedimientos para la gestión integral de residuos peligrosos, desde su generación hasta su disposición final.",
      categoria: "Residuos Peligrosos",
      url: "https://medioambiente.gob.do/decreto-233-13"
    },
    {
      id: 7,
      titulo: "Ley de Aguas",
      numero: "Ley 5852",
      tipo: "ley",
      fecha: "10/04/1962",
      estado: "modificada",
      descripcion: "Ley que regula el uso y aprovechamiento de las aguas en el país.",
      contenido: "Esta ley establece el régimen jurídico para el uso, aprovechamiento y conservación de las aguas superficiales y subterráneas de la República Dominicana.",
      categoria: "Recursos Hídricos",
      url: "https://medioambiente.gob.do/ley-5852"
    },
    {
      id: 8,
      titulo: "Resolución sobre Normas de Emisión de Contaminantes",
      numero: "Resolución 005-2019",
      tipo: "resolucion",
      fecha: "20/03/2019",
      estado: "vigente",
      descripcion: "Establece las normas de emisión de contaminantes atmosféricos para fuentes fijas.",
      contenido: "Esta resolución establece los límites máximos permisibles de emisión de contaminantes atmosféricos para fuentes fijas y móviles.",
      categoria: "Contaminación Atmosférica",
      url: "https://medioambiente.gob.do/resolucion-005-2019"
    }
  ];

  const tipos = [
    { id: 'todos', nombre: 'Todas', color: 'primary' },
    { id: 'ley', nombre: 'Leyes', color: 'success' },
    { id: 'decreto', nombre: 'Decretos', color: 'warning' },
    { id: 'resolucion', nombre: 'Resoluciones', color: 'secondary' },
    { id: 'reglamento', nombre: 'Reglamentos', color: 'tertiary' }
  ];

  const filteredNormativas = normativas.filter(normativa => {
    const matchesTipo = selectedTipo === 'todos' || normativa.tipo === selectedTipo;
    const matchesSearch = normativa.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         normativa.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         normativa.categoria.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTipo && matchesSearch;
  });

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'vigente': return 'success';
      case 'modificada': return 'warning';
      case 'derogada': return 'danger';
      default: return 'medium';
    }
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'ley': return 'success';
      case 'decreto': return 'warning';
      case 'resolucion': return 'secondary';
      case 'reglamento': return 'tertiary';
      default: return 'primary';
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Normativas Ambientales</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Normativas Ambientales</IonTitle>
          </IonToolbar>
        </IonHeader>

        {/* Barra de búsqueda */}
        <IonSearchbar
          value={searchTerm}
          onIonInput={(e) => setSearchTerm(e.detail.value!)}
          placeholder="Buscar normativas..."
          showClearButton="focus"
        />

        {/* Filtros por tipo */}
        <div style={{ padding: '10px', overflowX: 'auto' }}>
          <div style={{ display: 'flex', gap: '8px', minWidth: 'max-content' }}>
            {tipos.map((tipo) => (
              <IonChip
                key={tipo.id}
                color={selectedTipo === tipo.id ? 'primary' : 'medium'}
                onClick={() => setSelectedTipo(tipo.id)}
                style={{ cursor: 'pointer' }}
              >
                {tipo.nombre}
              </IonChip>
            ))}
          </div>
        </div>

        {/* Lista de normativas */}
        <IonList>
          {filteredNormativas.map((normativa) => (
            <IonCard key={normativa.id}>
              <IonCardContent>
                <IonItem button onClick={() => setSelectedNormativa(normativa)}>
                  <IonIcon icon={documentOutline} slot="start" color="primary" />
                  <IonLabel>
                    <h2>{normativa.titulo}</h2>
                    <p style={{ color: '#3880ff', fontWeight: 'bold' }}>{normativa.numero}</p>
                    <p>{normativa.descripcion}</p>
                    <div style={{ marginTop: '8px' }}>
                      <IonBadge color={getTipoColor(normativa.tipo)}>
                        {normativa.tipo.toUpperCase()}
                      </IonBadge>
                      <IonBadge color={getEstadoColor(normativa.estado)} style={{ marginLeft: '8px' }}>
                        {normativa.estado}
                      </IonBadge>
                      <IonChip size="small" color="medium" style={{ marginLeft: '8px' }}>
                        <IonIcon icon={calendarOutline} />
                        <IonLabel>{normativa.fecha}</IonLabel>
                      </IonChip>
                    </div>
                  </IonLabel>
                </IonItem>
              </IonCardContent>
            </IonCard>
          ))}
        </IonList>

        {/* Modal con detalles */}
        <IonModal isOpen={!!selectedNormativa} onDidDismiss={() => setSelectedNormativa(null)}>
          {selectedNormativa && (
            <>
              <IonHeader>
                <IonToolbar>
                  <IonTitle>{selectedNormativa.numero}</IonTitle>
                  <IonButton slot="end" fill="clear" onClick={() => setSelectedNormativa(null)}>
                    <IonIcon icon={closeOutline} />
                  </IonButton>
                </IonToolbar>
              </IonHeader>
              <IonContent>
                <IonCard>
                  <IonCardContent>
                    <h2 style={{ color: '#3880ff', marginBottom: '10px' }}>
                      {selectedNormativa.titulo}
                    </h2>
                    
                    <div style={{ marginBottom: '15px' }}>
                      <IonBadge color={getTipoColor(selectedNormativa.tipo)}>
                        {selectedNormativa.tipo.toUpperCase()}
                      </IonBadge>
                      <IonBadge color={getEstadoColor(selectedNormativa.estado)} style={{ marginLeft: '8px' }}>
                        {selectedNormativa.estado}
                      </IonBadge>
                      <IonChip size="small" color="medium" style={{ marginLeft: '8px' }}>
                        <IonIcon icon={calendarOutline} />
                        <IonLabel>{selectedNormativa.fecha}</IonLabel>
                      </IonChip>
                    </div>

                    <h3>Descripción:</h3>
                    <p style={{ fontSize: '1em', lineHeight: '1.6', marginBottom: '15px' }}>
                      {selectedNormativa.descripcion}
                    </p>

                    <h3>Contenido:</h3>
                    <p style={{ fontSize: '1em', lineHeight: '1.6', marginBottom: '15px' }}>
                      {selectedNormativa.contenido}
                    </p>

                    <h3>Categoría:</h3>
                    <p style={{ fontSize: '1em', marginBottom: '15px' }}>
                      {selectedNormativa.categoria}
                    </p>

                    {selectedNormativa.url && (
                      <IonButton 
                        expand="block" 
                        color="primary"
                        onClick={() => window.open(selectedNormativa.url, '_blank')}
                      >
                        <IonIcon icon={downloadOutline} slot="start" />
                        Ver Documento Completo
                      </IonButton>
                    )}
                  </IonCardContent>
                </IonCard>
              </IonContent>
            </>
          )}
        </IonModal>

        {filteredNormativas.length === 0 && (
          <IonCard>
            <IonCardContent>
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <IonIcon icon={searchOutline} size="large" style={{ color: '#ccc' }} />
                <p>No se encontraron normativas con los filtros seleccionados</p>
              </div>
            </IonCardContent>
          </IonCard>
        )}
      </IonContent>
    </IonPage>
  );
};

export default NormativasAmbientales;
