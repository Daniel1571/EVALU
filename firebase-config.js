// Importar SDKs de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCqoMBgP8qu5oCArF98rfHK0qPQI-WA8Ks",
  authDomain: "plataforma-cbtis-a0bd8.firebaseapp.com",
  projectId: "plataforma-cbtis-a0bd8",
  storageBucket: "plataforma-cbtis-a0bd8.firebasestorage.app",
  messagingSenderId: "581091123253",
  appId: "1:581091123253:web:697007c676c6a00727917c",
  measurementId: "G-ZRPFLWG0NW"
};

// Inicializar Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
