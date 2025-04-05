const firebaseConfig = {
  apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY,
  authDomain: import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.PUBLIC_FIREBASE_APP_ID,
  measurementId: import.meta.env.PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Inicialización condicional para SSR
let app;
let db;
let auth;

if (typeof window !== "undefined") {
  const { initializeApp } = require("firebase/app");
  const { getFirestore } = require("firebase/firestore");
  const { getAuth } = require("firebase/auth");

  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  auth = getAuth(app);
} else {
  // Configuración para SSR (opcional)
  const { initializeApp } = await import("firebase/app");
  const { getFirestore } = await import("firebase/firestore");

  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
}

export { db, auth };
