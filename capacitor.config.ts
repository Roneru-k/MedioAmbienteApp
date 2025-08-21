import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ionic.medioambienteapp',
  appName: 'medioambienteapp',
  webDir: 'dist',
  plugins: {
    // Configuración de iconos personalizados
    SplashScreen: {
      launchShowDuration: 3000,
      backgroundColor: "#3880ff",
      showSpinner: true,
      spinnerColor: "#999999"
    }
  }
};

export default config;
