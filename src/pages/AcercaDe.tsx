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
  IonGrid,
  IonRow,
  IonCol,
  IonToast
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
  informationCircleOutline,
  timeOutline,
  locationOutline
} from 'ionicons/icons';
import { useState } from 'react';
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
  email?: string;
}

const AcercaDe: React.FC = () => {
  const [toastMsg, setToastMsg] = useState('');

  const equipo: Desarrollador[] = [
    {
      id: 1,
      nombre: "Carlos Manuel Rodríguez",
      matricula: "2021-1234",
      telefono: "+1 (809) 555-0101",
      telegram: "carlosrodriguez_dev",
      foto: "https://via.placeholder.com/150/4CAF50/FFFFFF?text=CM",
      rol: "Desarrollador Full Stack & Líder de Proyecto",
      descripcion: "Estudiante de Desarrollo de Software con especialización en aplicaciones móviles. Apasionado por la tecnología y el medio ambiente.",
      habilidades: ["React Native", "TypeScript", "Ionic", "Node.js", "Git"],
      github: "https://github.com/carlosrodriguez",
      linkedin: "https://linkedin.com/in/carlosrodriguez",
      email: "carlos.rodriguez@itla.edu.do"
    },
    {
      id: 2,
      nombre: "Ana Sofía Martínez",
      matricula: "2021-5678",
      telefono: "+1 (809) 555-0102",
      telegram: "anasofia_ui",
      foto: "https://via.placeholder.com/150/2196F3/FFFFFF?text=AS",
      rol: "Diseñadora UX/UI & Frontend",
      descripcion: "Estudiante de Diseño de Software con enfoque en experiencia de usuario y diseño de interfaces intuitivas.",
      habilidades: ["Figma", "React", "CSS3", "Prototipado", "Diseño Responsivo"],
      github: "https://github.com/anasofia",
      linkedin: "https://linkedin.com/in/anasofia",
      email: "ana.martinez@itla.edu.do"
    },
    {
      id: 3,
      nombre: "Luis Miguel Fernández",
      matricula: "2021-9012",
      telefono: "+1 (809) 555-0103",
      telegram: "luismiguel_api",
      foto: "https://via.placeholder.com/150/FF9800/FFFFFF?text=LM",
      rol: "Desarrollador Backend & API",
      descripcion: "Estudiante de Desarrollo de Software especializado en desarrollo de APIs y gestión de bases de datos.",
      habilidades: ["Node.js", "Express", "MongoDB", "PostgreSQL", "REST APIs"],
      github: "https://github.com/luismiguel",
      linkedin: "https://linkedin.com/in/luismiguel",
      email: "luis.fernandez@itla.edu.do"
    },
    {
      id: 4,
      nombre: "María Elena González",
      matricula: "2021-3456",
      telefono: "+1 (809) 555-0104",
      telegram: "mariaelena_qa",
      foto: "https://via.placeholder.com/150/9C27B0/FFFFFF?text=ME",
      rol: "Tester & QA Engineer",
      descripcion: "Estudiante de Desarrollo de Software con experiencia en testing automatizado y control de calidad.",
      habilidades: ["Jest", "Cypress", "Testing Manual", "JIRA", "Selenium"],
      github: "https://github.com/mariaelena",
      linkedin: "https://linkedin.com/in/mariaelena",
      email: "maria.gonzalez@itla.edu.do"
    },
    {
      id: 5,
      nombre: "José Antonio Pérez",
      matricula: "2021-7890",
      telefono: "+1 (809) 555-0105",
      telegram: "joseantonio_dev",
      foto: "https://via.placeholder.com/150/607D8B/FFFFFF?text=JA",
      rol: "Desarrollador Frontend & Mobile",
      descripcion: "Estudiante de Desarrollo de Software especializado en tecnologías frontend y desarrollo móvil.",
      habilidades: ["React", "TypeScript", "Ionic", "Capacitor", "PWA"],
      github: "https://github.com/joseantonio",
      linkedin: "https://linkedin.com/in/joseantonio",
      email: "jose.perez@itla.edu.do"
    }
  ];

  const handleCall = (telefono: string, nombre: string) => {
    if (navigator.userAgent.includes('Mobile')) {
      window.location.href = `tel:${telefono}`;
    } else {
      setToastMsg(`Para llamar a ${nombre}: ${telefono}`);
    }
  };

  const handleTelegram = (telegram: string, nombre: string) => {
    const telegramUrl = `https://t.me/${telegram}`;
    window.open(telegramUrl, '_blank');
    setToastMsg(`Abriendo Telegram de ${nombre}`);
  };

  const handleEmail = (email: string, nombre: string) => {
    const mailtoUrl = `mailto:${email}?subject=Consulta sobre MedioAmbienteApp`;
    window.location.href = mailtoUrl;
    setToastMsg(`Abriendo email de ${nombre}`);
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
              <IonChip color="success">
                <IonIcon icon={bulbOutline} />
                <IonLabel>Capacitor</IonLabel>
              </IonChip>
            </div>
          </IonCardContent>
        </IonCard>

        {/* Información del curso */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={schoolOutline} /> Información del Proyecto
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                <IonCol size="6">
                  <IonItem lines="none">
                    <IonIcon icon={timeOutline} slot="start" color="primary" />
                    <IonLabel>
                      <h3>Período</h3>
                      <p>2-2025</p>
                    </IonLabel>
                  </IonItem>
                </IonCol>
                <IonCol size="6">
                  <IonItem lines="none">
                    <IonIcon icon={locationOutline} slot="start" color="primary" />
                    <IonLabel>
                      <h3>Institución</h3>
                      <p>ITLA</p>
                    </IonLabel>
                  </IonItem>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="6">
                  <IonItem lines="none">
                    <IonIcon icon={codeOutline} slot="start" color="primary" />
                    <IonLabel>
                      <h3>Curso</h3>
                      <p>Desarrollo de Apps Móviles</p>
                    </IonLabel>
                  </IonItem>
                </IonCol>
                <IonCol size="6">
                  <IonItem lines="none">
                    <IonIcon icon={personOutline} slot="start" color="primary" />
                    <IonLabel>
                      <h3>Equipo</h3>
                      <p>5 Desarrolladores</p>
                    </IonLabel>
                  </IonItem>
                </IonCol>
              </IonRow>
            </IonGrid>
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
              únicas para crear esta aplicación innovadora que contribuirá a la protección 
              ambiental en la República Dominicana.
            </p>
          </IonCardContent>
        </IonCard>

        {/* Lista del equipo */}
        <IonGrid>
          <IonRow>
            {equipo.map((desarrollador) => (
              <IonCol size="12" sizeMd="6" key={desarrollador.id}>
                <IonCard>
                  <IonCardContent>
                    <div style={{ textAlign: 'center', marginBottom: '15px' }}>
                      <IonAvatar style={{ 
                        width: '80px', 
                        height: '80px', 
                        margin: '0 auto 10px auto',
                        border: '3px solid var(--ion-color-primary)'
                      }}>
                        <img src={desarrollador.foto} alt={desarrollador.nombre} />
                      </IonAvatar>
                      
                      <h3 style={{ 
                        fontSize: '1.1em', 
                        margin: '0 0 5px 0',
                        fontWeight: 'bold',
                        color: '#333'
                      }}>
                        {desarrollador.nombre}
                      </h3>
                      
                      <p style={{ 
                        fontSize: '0.9em', 
                        color: '#3880ff', 
                        fontWeight: 'bold',
                        margin: '0 0 10px 0'
                      }}>
                        {desarrollador.rol}
                      </p>
                      
                      <IonChip color="medium">
                        <IonIcon icon={schoolOutline} />
                        <IonLabel>{desarrollador.matricula}</IonLabel>
                      </IonChip>
                    </div>
                    
                    <p style={{ 
                      fontSize: '0.9em', 
                      lineHeight: '1.4', 
                      color: '#666',
                      marginBottom: '15px'
                    }}>
                      {desarrollador.descripcion}
                    </p>
                    
                    {/* Habilidades */}
                    <div style={{ marginBottom: '15px' }}>
                      <h4 style={{ fontSize: '0.9em', margin: '0 0 8px 0', color: '#333' }}>
                        Habilidades:
                      </h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                                                 {desarrollador.habilidades.map((habilidad, index) => (
                           <IonChip key={index} color="light">
                             <IonLabel>{habilidad}</IonLabel>
                           </IonChip>
                         ))}
                      </div>
                    </div>

                    {/* Botones de contacto */}
                    <div style={{ display: 'flex', gap: '5px', justifyContent: 'center' }}>
                      <IonButton 
                        fill="outline" 
                        size="small"
                        onClick={() => handleCall(desarrollador.telefono, desarrollador.nombre)}
                      >
                        <IonIcon icon={callOutline} />
                      </IonButton>
                      
                      <IonButton 
                        fill="outline" 
                        size="small"
                        onClick={() => handleTelegram(desarrollador.telegram, desarrollador.nombre)}
                      >
                        <IonIcon icon={logoTelegram} />
                      </IonButton>
                      
                      <IonButton 
                        fill="outline" 
                        size="small"
                        onClick={() => handleEmail(desarrollador.email!, desarrollador.nombre)}
                      >
                        <IonIcon icon={mailOutline} />
                      </IonButton>
                    </div>

                    {/* Enlaces sociales */}
                    {(desarrollador.github || desarrollador.linkedin) && (
                      <div style={{ 
                        display: 'flex', 
                        gap: '5px', 
                        justifyContent: 'center',
                        marginTop: '10px'
                      }}>
                        {desarrollador.github && (
                          <IonButton 
                            fill="clear" 
                            size="small"
                            onClick={() => window.open(desarrollador.github, '_blank')}
                          >
                            <IonIcon icon={logoGithub} />
                          </IonButton>
                        )}
                        
                        {desarrollador.linkedin && (
                          <IonButton 
                            fill="clear" 
                            size="small"
                            onClick={() => window.open(desarrollador.linkedin, '_blank')}
                          >
                            <IonIcon icon={logoLinkedin} />
                          </IonButton>
                        )}
                      </div>
                    )}
                  </IonCardContent>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>

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
              durante todo el proceso de desarrollo, especialmente al profesor 
              <strong> [Nombre del Profesor]</strong> por su invaluable orientación.
            </p>
            
            <div style={{ 
              backgroundColor: '#f8f9fa', 
              padding: '15px', 
              borderRadius: '8px',
              marginTop: '15px',
              borderLeft: '4px solid #4CAF50'
            }}>
              <h4 style={{ margin: '0 0 10px 0', color: '#4CAF50' }}>
                <IonIcon icon={informationCircleOutline} /> Información Técnica
              </h4>
              <p style={{ margin: '0 0 5px 0', fontSize: '0.9em' }}>
                <strong>Versión:</strong> 1.0.0
              </p>
              <p style={{ margin: '0 0 5px 0', fontSize: '0.9em' }}>
                <strong>Fecha de lanzamiento:</strong> Diciembre 2024
              </p>
              <p style={{ margin: '0 0 5px 0', fontSize: '0.9em' }}>
                <strong>Institución:</strong> Instituto Tecnológico de Las Américas (ITLA)
              </p>
              <p style={{ margin: '0 0 5px 0', fontSize: '0.9em' }}>
                <strong>Repositorio:</strong> <a href="https://github.com/itla/medioambiente-app" target="_blank" rel="noopener noreferrer">GitHub</a>
              </p>
            </div>
          </IonCardContent>
        </IonCard>

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

export default AcercaDe;
