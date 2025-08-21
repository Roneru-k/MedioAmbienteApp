import { Storage } from '@ionic/storage';

// Crear almacenamiento con configuración simplificada
const storage = new Storage();

// Inicializar storage de forma asíncrona
const initStorage = async () => {
  try {
    await storage.create();
    console.log('Ionic Storage inicializado ✅');
  } catch (error) {
    console.error('Error al inicializar storage:', error);
  }
};

// Inicializar inmediatamente
initStorage();

export default storage;
