import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import SimpleMenu from './components/SimpleMenu';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';

/* Páginas */
import Page from './pages/Page';
import Login from './pages/Login';
import Register from './pages/Register';
import RecuperarContraseña from './pages/RecuperarContraseña';
import Home from './pages/Home';
import Noticias from './pages/Noticias';
import Servicios from './pages/Servicios';
import Voluntariado from './pages/Voluntariado';
import Reportar from './pages/Reportar';
import MisReportes from './pages/MisReportes';
import AreasProtegidas from './pages/AreasProtegidas';
import MapaAreasProtegidas from './pages/MapaAreasProtegidas';
import Mapa from './pages/Mapa';
import SobreNosotros from './pages/SobreNosotros';
import VideosEducativos from './pages/VideosEducativos';
import MedidasAmbientales from './pages/MedidasAmbientales';
import EquipoMinisterio from './pages/EquipoMinisterio';
import AcercaDe from './pages/AcercaDe';
import NormativasAmbientales from './pages/NormativasAmbientales';
import MapaReportes from './pages/MapaReportes';
import CambiarContraseña from './pages/CambiarContraseña';
import AuthTest from './pages/AuthTest';
import TestPage from './pages/TestPage';
import SimpleHome from './pages/SimpleHome';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Ionic Dark Mode */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <AuthProvider>
        <IonReactRouter>
          <IonSplitPane contentId="main">
            {/* Menú lateral */}
            <SimpleMenu />

            {/* Contenido principal */}
            <IonRouterOutlet id="main">
              {/* Ruta por defecto */}
              <Route path="/" exact={true}>
                <Redirect to="/home" />
              </Route>

              {/* Página de prueba */}
              <Route path="/test" exact component={TestPage} />

              {/* Login */}
              <Route path="/login" exact component={Login} />

              {/* Register */}
              <Route path="/register" exact component={Register} />

              {/* Recuperar Contraseña */}
              <Route path="/recuperar-contraseña" exact component={RecuperarContraseña} />

              {/* Home */}
              <Route path="/home" exact component={SimpleHome} />

            {/* Páginas principales (acceso libre) */}
            <Route path="/sobre-nosotros" exact component={SobreNosotros} />
            <Route path="/servicios" exact component={Servicios} />
            <Route path="/noticias" exact component={Noticias} />
            <Route path="/videos-educativos" exact component={VideosEducativos} />
            <Route path="/areas-protegidas" exact component={AreasProtegidas} />
            <Route path="/mapa-areas-protegidas" exact component={MapaAreasProtegidas} />
            <Route path="/mapa" exact component={Mapa} />
            <Route path="/medidas-ambientales" exact component={MedidasAmbientales} />
            <Route path="/equipo-ministerio" exact component={EquipoMinisterio} />
            <Route path="/voluntariado" exact component={Voluntariado} />
            <Route path="/acerca-de" exact component={AcercaDe} />

            {/* Páginas de usuario (requieren login) */}
            <ProtectedRoute path="/normativas" exact component={NormativasAmbientales} />
            <ProtectedRoute path="/reportar" exact component={Reportar} />
            <ProtectedRoute path="/mis-reportes" exact component={MisReportes} />
            <ProtectedRoute path="/mapa-reportes" exact component={MapaReportes} />
            <ProtectedRoute path="/cambiar-contraseña" exact component={CambiarContraseña} />
            
            {/* Página de prueba de autenticación */}
            <Route path="/auth-test" exact component={AuthTest} />

            {/* Páginas dinámicas del folder */}
            <Route path="/folder/:name" exact component={Page} />
          </IonRouterOutlet>
        </IonSplitPane>
        </IonReactRouter>
      </AuthProvider>
    </IonApp>
  );
};

export default App;
