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
  IonChip,
  IonBadge,
} from '@ionic/react';
import {
  personOutline,
  callOutline,
  mailOutline,
  schoolOutline,
  logoGithub,
  logoLinkedin,
  chatbubbleOutline as logoTelegram,
  heartOutline,
  codeOutline,
  bulbOutline,
} from 'ionicons/icons';
import './Page.css';

interface Desarrollador {
  id: number;
  nombre: string;
  matricula: string;
  telefono: string;
  telegram: string;
  foto: string;
  rol: string;
  descripcion: string;
  habilidades: string[];
  github?: string;
  linkedin?: string;
}

const AcercaDe: React.FC = () => {
  const equipo: Desarrollador[] = [
    {
      id: 1,
      nombre: "Juan Carlos Pérez",
      matricula: "2021-1234",
      telefono: "+1 (809) 555-0101",
      telegram: "@juanperez_dev",
      foto: "https://via.placeholder.com/150/4CAF50/FFFFFF?text=JP",
      rol: "Desarrollador Full Stack",
      descripcion: "Especialista en React Native y desarrollo móvil con experiencia en aplicaciones ambientales.",
      habilidades: ["React Native", "TypeScript", "Ionic", "Node.js", "MongoDB"],
      github: "https://github.com/juanperez",
      linkedin: "https://linkedin.com/in/juanperez"
    },
    {
      id: 2,
      nombre: "María González",
      matricula: "2021-5678",
      telefono: "+1 (809) 555-0102",
      telegram: "@mariagonzalez_ui",
      foto: "https://via.placeholder.com/150/2196F3/FFFFFF?text=MG",
      rol: "Diseñadora UX/UI",
      descripcion: "Diseñadora apasionada por crear experiencias de usuario intuitivas y accesibles.",
      habilidades: ["Figma", "Adobe XD", "Prototipado", "Investigación UX", "Diseño Responsivo"],
      github: "https://github.com/mariagonzalez",
      linkedin: "https://linkedin.com/in/mariagonzalez"
    },
    {
      id: 3,
      nombre: "Carlos Rodríguez",
      matricula: "2021-9012",
      telefono: "+1 (809) 555-0103",
      telegram: "@carlosrodriguez_api",
      foto: "https://via.placeholder.com/150/FF9800/FFFFFF?text=CR",
      rol: "Desarrollador Backend",
      descripcion: "Especialista en APIs y bases de datos con enfoque en escalabilidad y seguridad.",
      habilidades: ["Node.js", "Express", "PostgreSQL", "Docker", "AWS"],
      github: "https://github.com/carlosrodriguez",
      linkedin: "https://linkedin.com/in/carlosrodriguez"
    },
    {
      id: 4,
      nombre: "Ana Martínez",
      matricula: "2021-3456",
      telefono: "+1 (809) 555-0104",
      telegram: "@anamartinez_qa",
      foto: "https://via.placeholder.com/150/9C27B0/FFFFFF?text=AM",
      rol: "Tester & QA",
      descripcion: "Profesional de calidad de software con experiencia en testing automatizado y manual.",
      habilidades: ["Selenium", "Jest", "Cypress", "Testing Manual", "JIRA"],
      github: "https://github.com/anamartinez",
      linkedin: "https://linkedin.com/in/anamartinez"
    },
    {
      id: 5,
      nombre: "Luis Fernández",
      matricula: "2021-7890",
      telefono: "+1 (809) 555-0105",
      telegram: "@luisfernandez_dev",
      foto: "https://via.placeholder.com/150/607D8B/FFFFFF?text=LF",
      rol: "Desarrollador Frontend",
      descripcion: "Especialista en React y tecnologías frontend modernas con pasión por la accesibilidad.",
      habilidades: ["React", "TypeScript", "CSS3", "Webpack", "Accessibility"],
      github: "https://github.com/luisfernandez",
      linkedin: "https://linkedin.com/in/luisfernandez"
    }
  ];

  const handleCall = (telefono: string) => {
    window.open(`tel:${telefono}`, '_self');
  };

  const handleTelegram = (telegram: string) => {
    window.open(`https://t.me/${telegram.replace('@', '')}`, '_blank');
  };

  const handleEmail = (nombre: string) => {
    const email = `${nombre.toLowerCase().replace(' ', '.')}@itla.edu.do`;
    window.open(`mailto:${email}`, '_self');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Acerca De</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Acerca De</IonTitle>
          </IonToolbar>
        </IonHeader>

        {/* Información del proyecto */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={codeOutline} /> MedioAmbienteApp
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>
              <strong>MedioAmbienteApp</strong> es una aplicación móvil desarrollada para el 
              Ministerio de Medio Ambiente de la República Dominicana, con el objetivo de 
              promover la conciencia ambiental y facilitar la participación ciudadana en 
              la protección del medio ambiente.
            </p>
            <p>
              Esta aplicación fue desarrollada como proyecto final del curso de 
              <strong> Desarrollo de Aplicaciones Móviles</strong> en el 
              <strong> Instituto Tecnológico de Las Américas (ITLA)</strong>.
            </p>
            
            <div style={{ marginTop: '15px' }}>
              <IonChip color="primary">
                <IonIcon icon={bulbOutline} />
                <IonLabel>React Native</IonLabel>
              </IonChip>
              <IonChip color="secondary">
                <IonIcon icon={bulbOutline} />
                <IonLabel>Ionic Framework</IonLabel>
              </IonChip>
              <IonChip color="tertiary">
                <IonIcon icon={bulbOutline} />
                <IonLabel>TypeScript</IonLabel>
              </IonChip>
            </div>
          </IonCardContent>
        </IonCard>

        {/* Equipo de desarrollo */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={personOutline} /> Equipo de Desarrollo
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>
              Nuestro equipo está compuesto por estudiantes apasionados por la tecnología 
              y comprometidos con el medio ambiente. Cada miembro aportó sus habilidades 
              únicas para crear esta aplicación innovadora.
            </p>
          </IonCardContent>
        </IonCard>

        {/* Lista del equipo */}
        <IonList>
          {equipo.map((desarrollador) => (
            <IonCard key={desarrollador.id}>
              <IonCardContent>
                <IonItem>
                  <IonAvatar slot="start">
                    <img src={desarrollador.foto} alt={desarrollador.nombre} />
                  </IonAvatar>
                  <IonLabel>
                    <h2>{desarrollador.nombre}</h2>
                    <h3 style={{ color: '#3880ff', fontWeight: 'bold' }}>{desarrollador.rol}</h3>
                    <p>
                      <IonIcon icon={schoolOutline} style={{ marginRight: '5px' }} />
                      Matrícula: {desarrollador.matricula}
                    </p>
                    <p style={{ fontSize: '0.9em', lineHeight: '1.4', marginTop: '8px' }}>
                      {desarrollador.descripcion}
                    </p>
                    
                    {/* Habilidades */}
                    <div style={{ marginTop: '10px' }}>
                      {desarrollador.habilidades.map((habilidad, index) => (
                        <IonChip key={index} size="small" color="medium">
                          {habilidad}
                        </IonChip>
                      ))}
                    </div>
                  </IonLabel>
                </IonItem>

                {/* Botones de contacto */}
                <IonItem lines="none">
                  <IonButton 
                    fill="clear" 
                    slot="start" 
                    size="small"
                    onClick={() => handleCall(desarrollador.telefono)}
                  >
                    <IonIcon icon={callOutline} />
                    <IonLabel>Llamar</IonLabel>
                  </IonButton>
                  
                  <IonButton 
                    fill="clear" 
                    slot="start" 
                    size="small"
                    onClick={() => handleTelegram(desarrollador.telegram)}
                  >
                    <IonIcon icon={logoTelegram} />
                    <IonLabel>Telegram</IonLabel>
                  </IonButton>
                  
                  <IonButton 
                    fill="clear" 
                    slot="end" 
                    size="small"
                    onClick={() => handleEmail(desarrollador.nombre)}
                  >
                    <IonIcon icon={mailOutline} />
                    <IonLabel>Email</IonLabel>
                  </IonButton>
                </IonItem>

                {/* Enlaces sociales */}
                {(desarrollador.github || desarrollador.linkedin) && (
                  <IonItem lines="none">
                    {desarrollador.github && (
                      <IonButton 
                        fill="clear" 
                        slot="start" 
                        size="small"
                        onClick={() => window.open(desarrollador.github, '_blank')}
                      >
                        <IonIcon icon={logoGithub} />
                        <IonLabel>GitHub</IonLabel>
                      </IonButton>
                    )}
                    
                    {desarrollador.linkedin && (
                      <IonButton 
                        fill="clear" 
                        slot="end" 
                        size="small"
                        onClick={() => window.open(desarrollador.linkedin, '_blank')}
                      >
                        <IonIcon icon={logoLinkedin} />
                        <IonLabel>LinkedIn</IonLabel>
                      </IonButton>
                    )}
                  </IonItem>
                )}
              </IonCardContent>
            </IonCard>
          ))}
        </IonList>

        {/* Información adicional */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={heartOutline} /> Agradecimientos
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>
              Agradecemos al <strong>Ministerio de Medio Ambiente</strong> por confiar en nuestro 
              equipo para desarrollar esta aplicación que contribuirá a la protección del 
              medio ambiente en la República Dominicana.
            </p>
            <p>
              También agradecemos a nuestros profesores del ITLA por su guía y apoyo 
              durante todo el proceso de desarrollo.
            </p>
            <p>
              <strong>Versión:</strong> 1.0.0<br />
              <strong>Fecha de lanzamiento:</strong> Diciembre 2024<br />
              <strong>Institución:</strong> Instituto Tecnológico de Las Américas (ITLA)
            </p>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default AcercaDe;
