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
  IonThumbnail,
  IonImg,
} from '@ionic/react';
import {
  playCircleOutline,
  informationCircleOutline,
  flagOutline,
  eyeOutline,
  heartOutline,
} from 'ionicons/icons';
import './Page.css';

const SobreNosotros: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Sobre Nosotros</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Sobre Nosotros</IonTitle>
          </IonToolbar>
        </IonHeader>

        {/* Historia del Ministerio */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={informationCircleOutline} /> Historia del Ministerio
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>
              El Ministerio de Medio Ambiente y Recursos Naturales de la República Dominicana 
              fue creado en el año 2000 con el objetivo de proteger, conservar y gestionar 
              los recursos naturales del país. Desde su fundación, hemos trabajado 
              incansablemente para preservar la biodiversidad única de nuestra isla y 
              promover el desarrollo sostenible.
            </p>
            <p>
              Nuestra institución ha sido pionera en la implementación de políticas 
              ambientales innovadoras y en la creación de áreas protegidas que hoy 
              constituyen el 25% del territorio nacional.
            </p>
          </IonCardContent>
        </IonCard>

        {/* Misión */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={flagOutline} /> Nuestra Misión
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>
              <strong>Proteger y conservar los recursos naturales y la biodiversidad 
              de la República Dominicana, promoviendo el desarrollo sostenible y 
              la participación ciudadana en la gestión ambiental.</strong>
            </p>
            <p>
              Trabajamos para garantizar que las generaciones presentes y futuras 
              puedan disfrutar de un medio ambiente sano y equilibrado, fomentando 
              la conciencia ambiental y la responsabilidad compartida en el cuidado 
              de nuestros recursos naturales.
            </p>
          </IonCardContent>
        </IonCard>

        {/* Visión */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={eyeOutline} /> Nuestra Visión
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>
              <strong>Ser una institución líder en la gestión ambiental de América 
              Latina, reconocida por su excelencia en la conservación de la 
              biodiversidad y el desarrollo de políticas ambientales innovadoras.</strong>
            </p>
            <p>
              Aspiramos a que la República Dominicana sea un modelo de desarrollo 
              sostenible, donde la protección ambiental y el progreso económico 
              caminen de la mano, creando un futuro próspero para todos los dominicanos.
            </p>
          </IonCardContent>
        </IonCard>

        {/* Video Explicativo */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={playCircleOutline} /> Conoce Más Sobre Nosotros
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonItem>
              <IonThumbnail slot="start">
                <IonImg src="https://via.placeholder.com/120x90/4CAF50/FFFFFF?text=Video" />
              </IonThumbnail>
              <IonLabel>
                <h3>Ministerio de Medio Ambiente RD</h3>
                <p>Descubre nuestro compromiso con el medio ambiente</p>
              </IonLabel>
              <IonButton fill="clear" slot="end">
                <IonIcon icon={playCircleOutline} />
              </IonButton>
            </IonItem>
            <p style={{ marginTop: '10px', fontSize: '0.9em', color: '#666' }}>
              Este video te mostrará nuestro trabajo diario, nuestros logros y 
              nuestro compromiso con la protección del medio ambiente dominicano.
            </p>
          </IonCardContent>
        </IonCard>

        {/* Valores */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={heartOutline} /> Nuestros Valores
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonItem>
              <IonLabel>
                <h3>🌱 Sostenibilidad</h3>
                <p>Promovemos el desarrollo que satisface las necesidades del presente sin comprometer las futuras</p>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>
                <h3>🤝 Participación</h3>
                <p>Fomentamos la colaboración ciudadana en la protección ambiental</p>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>
                <h3>🔬 Excelencia</h3>
                <p>Buscamos la excelencia en todos nuestros programas y proyectos</p>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>
                <h3>🌍 Responsabilidad</h3>
                <p>Asumimos la responsabilidad de proteger nuestro patrimonio natural</p>
              </IonLabel>
            </IonItem>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default SobreNosotros;
