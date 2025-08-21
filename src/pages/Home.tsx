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
  IonButton,
  IonImg,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonChip,
} from '@ionic/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  leafOutline,
  waterOutline,
  heartOutline,
  globeOutline,
  peopleOutline,
  warningOutline,
  mapOutline,
  newspaperOutline,
  logInOutline,
} from 'ionicons/icons';

const Home: React.FC = () => {
  const history = useHistory();
  const { isAuthenticated, user } = useAuth();

  // Configuración del slider
  const slideOpts = {
    initialSlide: 0,
    speed: 400,
    autoplay: {
      delay: 5000,
    },
  };

  // Datos del slider
  const sliderData = [
    {
      id: 1,
      image: "https://via.placeholder.com/800x400/4CAF50/FFFFFF?text=Protección+Ambiental",
      title: "Protección Ambiental",
      subtitle: "Cuidando nuestro futuro",
      description: "Juntos podemos crear un mundo más sostenible para las próximas generaciones.",
      icon: leafOutline,
      color: "success"
    },
    {
      id: 2,
      image: "https://via.placeholder.com/800x400/2196F3/FFFFFF?text=Conservación+Marina",
      title: "Conservación Marina",
      subtitle: "Protegiendo nuestros océanos",
      description: "Nuestras playas y mares son el tesoro natural de la República Dominicana.",
      icon: waterOutline,
      color: "primary"
    },
    {
      id: 3,
      image: "https://via.placeholder.com/800x400/8BC34A/FFFFFF?text=Reforestación",
      title: "Reforestación",
      subtitle: "Plantando el futuro",
      description: "Cada árbol que plantamos es un paso hacia un planeta más verde.",
      icon: leafOutline,
      color: "success"
    },
    {
      id: 4,
      image: "https://via.placeholder.com/800x400/FF9800/FFFFFF?text=Participación+Ciudadana",
      title: "Participación Ciudadana",
      subtitle: "Tu voz importa",
      description: "La participación de todos es fundamental para proteger nuestro medio ambiente.",
      icon: peopleOutline,
      color: "warning"
    },
    {
      id: 5,
      image: "https://via.placeholder.com/800x400/9C27B0/FFFFFF?text=Desarrollo+Sostenible",
      title: "Desarrollo Sostenible",
      subtitle: "Crecimiento responsable",
      description: "Promovemos el desarrollo que respeta y protege nuestros recursos naturales.",
      icon: globeOutline,
      color: "secondary"
    }
  ];

  // Acciones rápidas
  const quickActions = [
    { title: 'Reportar Daño', icon: warningOutline, color: 'danger', url: '/reportar' },
    { title: 'Áreas Protegidas', icon: mapOutline, color: 'success', url: '/areas-protegidas' },
    { title: 'Noticias', icon: newspaperOutline, color: 'primary', url: '/noticias' },
    { title: 'Voluntariado', icon: peopleOutline, color: 'warning', url: '/voluntariado' },
  ];

  const userName = user?.nombre || user?.correo || 'Usuario';

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Bienvenido 🌱</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {/* Slider principal */}
        <Swiper
          modules={[Autoplay, Pagination]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          style={{ height: '300px' }}
        >
          {sliderData.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div style={{ 
                position: 'relative', 
                height: '300px',
                background: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                color: 'white',
                padding: '20px'
              }}>
                <IonIcon icon={slide.icon} size="large" style={{ marginBottom: '10px' }} />
                <h1 style={{ margin: '0 0 10px 0', fontSize: '2em', fontWeight: 'bold' }}>
                  {slide.title}
                </h1>
                <h2 style={{ margin: '0 0 15px 0', fontSize: '1.2em', opacity: 0.9 }}>
                  {slide.subtitle}
                </h2>
                <p style={{ margin: 0, fontSize: '1em', opacity: 0.8, maxWidth: '600px' }}>
                  {slide.description}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Mensaje de bienvenida */}
        <IonCard style={{ margin: '20px' }}>
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={heartOutline} /> 
              {isAuthenticated ? `¡Hola, ${userName}!` : '¡Bienvenido!'}
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>
              Bienvenido a la aplicación oficial del Ministerio de Medio Ambiente de la República Dominicana. 
              Aquí encontrarás toda la información y herramientas necesarias para contribuir a la protección 
              de nuestro medio ambiente.
            </p>
            {isAuthenticated ? (
              <p>
                <strong>¡Tu participación es fundamental para crear un futuro más sostenible!</strong>
              </p>
            ) : (
              <p>
                <strong>Inicia sesión para acceder a todas las funciones y reportar daños ambientales.</strong>
              </p>
            )}
          </IonCardContent>
        </IonCard>

        {/* Acciones rápidas */}
        <IonCard style={{ margin: '20px' }}>
          <IonCardHeader>
            <IonCardTitle>Acciones Rápidas</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                {quickActions.map((action, index) => (
                  <IonCol size="6" key={index}>
                    <IonButton
                      expand="block"
                      color={action.color as any}
                      fill="outline"
                      style={{ height: '80px', marginBottom: '10px' }}
                      onClick={() => history.push(action.url)}
                    >
                      <div style={{ textAlign: 'center' }}>
                        <IonIcon icon={action.icon} size="large" />
                        <div style={{ fontSize: '0.8em', marginTop: '5px' }}>
                          {action.title}
                        </div>
                      </div>
                    </IonButton>
                  </IonCol>
                ))}
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>

        {/* Estadísticas rápidas */}
        <IonCard style={{ margin: '20px' }}>
          <IonCardHeader>
            <IonCardTitle>Nuestro Impacto</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                <IonCol size="6">
                  <div style={{ textAlign: 'center', padding: '10px' }}>
                    <IonIcon icon={leafOutline} size="large" color="success" />
                    <h3 style={{ margin: '10px 0 5px 0', color: '#4CAF50' }}>25%</h3>
                    <p style={{ margin: 0, fontSize: '0.9em' }}>Territorio Protegido</p>
                  </div>
                </IonCol>
                <IonCol size="6">
                  <div style={{ textAlign: 'center', padding: '10px' }}>
                    <IonIcon icon={peopleOutline} size="large" color="primary" />
                    <h3 style={{ margin: '10px 0 5px 0', color: '#2196F3' }}>10M+</h3>
                    <p style={{ margin: 0, fontSize: '0.9em' }}>Árboles Plantados</p>
                  </div>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="6">
                  <div style={{ textAlign: 'center', padding: '10px' }}>
                    <IonIcon icon={waterOutline} size="large" color="secondary" />
                    <h3 style={{ margin: '10px 0 5px 0', color: '#9C27B0' }}>150+</h3>
                    <p style={{ margin: 0, fontSize: '0.9em' }}>Áreas Protegidas</p>
                  </div>
                </IonCol>
                <IonCol size="6">
                  <div style={{ textAlign: 'center', padding: '10px' }}>
                    <IonIcon icon={leafOutline} size="large" color="success" />
                    <h3 style={{ margin: '10px 0 5px 0', color: '#4CAF50' }}>500+</h3>
                    <p style={{ margin: 0, fontSize: '0.9em' }}>Especies Protegidas</p>
                  </div>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>

        {/* Acciones de autenticación */}
        <div style={{ padding: '20px' }}>
          {isAuthenticated ? (
            <IonButton 
              expand="block" 
              color="success"
              onClick={() => history.push('/voluntariado')}
            >
              <IonIcon icon={peopleOutline} slot="start" />
              Únete al Voluntariado
            </IonButton>
          ) : (
            <IonButton 
              expand="block" 
              color="primary"
              onClick={() => history.push('/login')}
            >
              <IonIcon icon={logInOutline} slot="start" />
              Iniciar Sesión
            </IonButton>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
