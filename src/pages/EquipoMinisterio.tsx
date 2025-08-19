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
} from '@ionic/react';
import {
  personOutline,
  callOutline,
  mailOutline,
  businessOutline,
  starOutline,
  searchOutline,
} from 'ionicons/icons';
import { useState } from 'react';
import './Page.css';

interface Miembro {
  id: number;
  nombre: string;
  cargo: string;
  departamento: string;
  email: string;
  telefono: string;
  foto: string;
  descripcion: string;
  experiencia: string;
  especialidad: string[];
}

const EquipoMinisterio: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedDepartamento, setSelectedDepartamento] = useState<string>('todos');

  const equipo: Miembro[] = [
    {
      id: 1,
      nombre: "Dr. Miguel Ceara Hatton",
      cargo: "Ministro de Medio Ambiente",
      departamento: "Dirección General",
      email: "ministro@medioambiente.gob.do",
      telefono: "+1 (809) 567-4300",
      foto: "https://via.placeholder.com/150/4CAF50/FFFFFF?text=MC",
      descripcion: "Economista y ambientalista con más de 30 años de experiencia en políticas públicas ambientales.",
      experiencia: "30+ años",
      especialidad: ["Políticas Ambientales", "Desarrollo Sostenible", "Economía Verde"]
    },
    {
      id: 2,
      nombre: "Ing. José Rafael Almonte",
      cargo: "Viceministro de Recursos Naturales",
      departamento: "Recursos Naturales",
      email: "viceministro.rn@medioambiente.gob.do",
      telefono: "+1 (809) 567-4301",
      foto: "https://via.placeholder.com/150/2196F3/FFFFFF?text=JA",
      descripcion: "Ingeniero forestal especializado en gestión de recursos naturales y conservación de biodiversidad.",
      experiencia: "25 años",
      especialidad: ["Gestión Forestal", "Biodiversidad", "Conservación"]
    },
    {
      id: 3,
      nombre: "Dra. Milagros De Camps",
      cargo: "Viceministra de Gestión Ambiental",
      departamento: "Gestión Ambiental",
      email: "viceministra.ga@medioambiente.gob.do",
      telefono: "+1 (809) 567-4302",
      foto: "https://via.placeholder.com/150/FF9800/FFFFFF?text=MD",
      descripcion: "Abogada ambientalista con amplia experiencia en normativas ambientales y derecho internacional.",
      experiencia: "20 años",
      especialidad: ["Derecho Ambiental", "Normativas", "Cooperación Internacional"]
    },
    {
      id: 4,
      nombre: "Ing. José Elías González",
      cargo: "Director de Áreas Protegidas",
      departamento: "Áreas Protegidas",
      email: "director.ap@medioambiente.gob.do",
      telefono: "+1 (809) 567-4303",
      foto: "https://via.placeholder.com/150/8BC34A/FFFFFF?text=JG",
      descripcion: "Especialista en gestión de áreas protegidas y conservación de ecosistemas marinos y terrestres.",
      experiencia: "18 años",
      especialidad: ["Áreas Protegidas", "Ecosistemas Marinos", "Conservación"]
    },
    {
      id: 5,
      nombre: "Lic. Patricia Abreu",
      cargo: "Directora de Educación Ambiental",
      departamento: "Educación Ambiental",
      email: "directora.ea@medioambiente.gob.do",
      telefono: "+1 (809) 567-4304",
      foto: "https://via.placeholder.com/150/9C27B0/FFFFFF?text=PA",
      descripcion: "Educadora ambiental con experiencia en programas de concientización y participación ciudadana.",
      experiencia: "15 años",
      especialidad: ["Educación Ambiental", "Participación Ciudadana", "Comunicación"]
    },
    {
      id: 6,
      nombre: "Ing. Roberto Salcedo",
      cargo: "Director de Cambio Climático",
      departamento: "Cambio Climático",
      email: "director.cc@medioambiente.gob.do",
      telefono: "+1 (809) 567-4305",
      foto: "https://via.placeholder.com/150/607D8B/FFFFFF?text=RS",
      descripcion: "Especialista en mitigación y adaptación al cambio climático con experiencia en proyectos internacionales.",
      experiencia: "12 años",
      especialidad: ["Cambio Climático", "Mitigación", "Adaptación"]
    },
    {
      id: 7,
      nombre: "Dra. Yolanda León",
      cargo: "Directora de Investigación",
      departamento: "Investigación",
      email: "directora.inv@medioambiente.gob.do",
      telefono: "+1 (809) 567-4306",
      foto: "https://via.placeholder.com/150/E91E63/FFFFFF?text=YL",
      descripcion: "Bióloga marina con doctorado en ciencias ambientales y amplia experiencia en investigación científica.",
      experiencia: "22 años",
      especialidad: ["Investigación Científica", "Biología Marina", "Ciencias Ambientales"]
    },
    {
      id: 8,
      nombre: "Ing. Carlos Rodríguez",
      cargo: "Director de Gestión de Residuos",
      departamento: "Gestión de Residuos",
      email: "director.gr@medioambiente.gob.do",
      telefono: "+1 (809) 567-4307",
      foto: "https://via.placeholder.com/150/795548/FFFFFF?text=CR",
      descripcion: "Ingeniero ambiental especializado en gestión integral de residuos sólidos y economía circular.",
      experiencia: "16 años",
      especialidad: ["Gestión de Residuos", "Economía Circular", "Tecnologías Limpias"]
    }
  ];

  const departamentos = [
    { id: 'todos', nombre: 'Todos los Departamentos' },
    { id: 'Dirección General', nombre: 'Dirección General' },
    { id: 'Recursos Naturales', nombre: 'Recursos Naturales' },
    { id: 'Gestión Ambiental', nombre: 'Gestión Ambiental' },
    { id: 'Áreas Protegidas', nombre: 'Áreas Protegidas' },
    { id: 'Educación Ambiental', nombre: 'Educación Ambiental' },
    { id: 'Cambio Climático', nombre: 'Cambio Climático' },
    { id: 'Investigación', nombre: 'Investigación' },
    { id: 'Gestión de Residuos', nombre: 'Gestión de Residuos' }
  ];

  const filteredEquipo = equipo.filter(miembro => {
    const matchesDepartamento = selectedDepartamento === 'todos' || miembro.departamento === selectedDepartamento;
    const matchesSearch = miembro.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         miembro.cargo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         miembro.especialidad.some(esp => esp.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesDepartamento && matchesSearch;
  });

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
          placeholder="Buscar por nombre, cargo o especialidad..."
          showClearButton="focus"
        />

        {/* Filtros por departamento */}
        <div style={{ padding: '10px', overflowX: 'auto' }}>
          <div style={{ display: 'flex', gap: '8px', minWidth: 'max-content' }}>
            {departamentos.map((depto) => (
              <IonChip
                key={depto.id}
                color={selectedDepartamento === depto.id ? 'primary' : 'medium'}
                onClick={() => setSelectedDepartamento(depto.id)}
                style={{ cursor: 'pointer' }}
              >
                {depto.nombre}
              </IonChip>
            ))}
          </div>
        </div>

        {/* Lista del equipo */}
        <IonList>
          {filteredEquipo.map((miembro) => (
            <IonCard key={miembro.id}>
              <IonCardContent>
                <IonItem>
                  <IonAvatar slot="start">
                    <img src={miembro.foto} alt={miembro.nombre} />
                  </IonAvatar>
                  <IonLabel>
                    <h2>{miembro.nombre}</h2>
                    <h3 style={{ color: '#3880ff', fontWeight: 'bold' }}>{miembro.cargo}</h3>
                    <p>
                      <IonIcon icon={businessOutline} style={{ marginRight: '5px' }} />
                      {miembro.departamento}
                    </p>
                    <p style={{ fontSize: '0.9em', color: '#666' }}>
                      <IonIcon icon={starOutline} style={{ marginRight: '5px' }} />
                      {miembro.experiencia} de experiencia
                    </p>
                    
                    {/* Especialidades */}
                    <div style={{ marginTop: '8px' }}>
                      {miembro.especialidad.map((esp, index) => (
                        <IonChip key={index} size="small" color="secondary">
                          {esp}
                        </IonChip>
                      ))}
                    </div>
                  </IonLabel>
                </IonItem>

                {/* Información de contacto */}
                <IonItem lines="none">
                  <IonButton fill="clear" slot="start" size="small">
                    <IonIcon icon={mailOutline} />
                    <IonLabel>Email</IonLabel>
                  </IonButton>
                  <IonButton fill="clear" slot="end" size="small">
                    <IonIcon icon={callOutline} />
                    <IonLabel>Llamar</IonLabel>
                  </IonButton>
                </IonItem>

                {/* Descripción */}
                <div style={{ padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '8px', marginTop: '10px' }}>
                  <p style={{ fontSize: '0.9em', lineHeight: '1.4', margin: 0 }}>
                    {miembro.descripcion}
                  </p>
                </div>
              </IonCardContent>
            </IonCard>
          ))}
        </IonList>

        {filteredEquipo.length === 0 && (
          <IonCard>
            <IonCardContent>
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <IonIcon icon={searchOutline} size="large" style={{ color: '#ccc' }} />
                <p>No se encontraron miembros del equipo con los filtros seleccionados</p>
              </div>
            </IonCardContent>
          </IonCard>
        )}

        {/* Información adicional */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={personOutline} /> Nuestro Compromiso
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
