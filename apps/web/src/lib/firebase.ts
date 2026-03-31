import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

// As variáveis VITE_ ficam acessíveis via import.meta.env
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

// Inicializa o app Firebase — isso só roda uma vez graças ao module caching do ES
export const app = initializeApp(firebaseConfig)

// Auth já configurado com os providers que você habilitou no Console
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()

// Firestore na região southamerica-east1 (já configurado no Console)
export const db = getFirestore(app)
