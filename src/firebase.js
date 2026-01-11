import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAkVdIS1k9rs8N7hY2K0PRMOwavT49J8X8",
    authDomain: "vivendodapalavra-96344.firebaseapp.com",
    projectId: "vivendodapalavra-96344",
    storageBucket: "vivendodapalavra-96344.firebasestorage.app",
    messagingSenderId: "20387452668",
    appId: "1:20387452668:web:326c22eafa97948f7d6979"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
