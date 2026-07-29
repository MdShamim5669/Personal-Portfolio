import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDu2UmOvQGG1ROt4bbpTozt3s0M6fOkTZ8",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "tamjiudulislamshamim.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "tamjiudulislamshamim",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "tamjiudulislamshamim.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "830803512621",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:830803512621:web:3709c31f9a36223f9b97a4",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-QWYMT8MBL1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics (safely checking browser support)
export let analytics;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export default app;
