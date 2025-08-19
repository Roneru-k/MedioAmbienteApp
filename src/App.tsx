import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from './components/Menu';

/* Páginas */
import Page from './pages/Page';
import Login from './pages/Login';
import Home from './pages/Home';
import Noticias from './pages/Noticias';
import Servicios from './pages/Servicios';
import Voluntariado from './pages/Voluntariado';
import Reportar from './pages/Reportar';
import MisReportes from './pages/MisReportes';
import AreasProtegidas from './pages/AreasProtegidas';
import Mapa from './pages/Mapa';

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
      <IonReactRouter>
        <IonSplitPane contentId="main">
          {/* Menú lateral */}
          <Menu />

          {/* Contenido principal */}
          <IonRouterOutlet id="main">
            {/* Ruta por defecto */}
            <Route path="/" exact={true}>
              <Redirect to="/login" />
            </Route>

            {/* Login */}
            <Route path="/login" exact component={Login} />

            {/* Home */}
            <Route path="/home" exact component={Home} />

            {/* Noticias */}
            <Route path="/noticias" exact component={Noticias} />

            {/* Servicios */}
            <Route path="/servicios" exact component={Servicios} />

            {/* Voluntariado */}
            <Route path="/voluntariado" exact component={Voluntariado} />

            {/* Reportar daño ambiental */}
            <Route path="/reportar" exact component={Reportar} />

            {/* Mis reportes */}
            <Route path="/mis-reportes" exact component={MisReportes} />

            {/* Áreas protegidas */}
            <Route path="/areas-protegidas" exact component={AreasProtegidas} />

            {/* Mapa de áreas */}
            <Route path="/mapa" exact component={Mapa} />

            {/* Páginas dinámicas del folder */}
            <Route path="/folder/:name" exact component={Page} />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
