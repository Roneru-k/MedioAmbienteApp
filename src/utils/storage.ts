import { Storage } from '@ionic/storage';
import localforage from 'localforage';

// Crear almacenamiento con prioridad: IndexedDB -> LocalStorage
const storage = new Storage({
  name: '__medioambiente_storage', // nombre de la base de datos
  driverOrder: [localforage.INDEXEDDB, localforage.LOCALSTORAGE],
});

storage.create().then(() => {
  console.log('Ionic Storage inicializado ✅');
});

export default storage;
