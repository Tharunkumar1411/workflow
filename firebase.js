import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBqEHqJjhQglQd9RMXcpCle2k8yAl0yeEQ",
    authDomain: "workflow-3669c.firebaseapp.com",
    projectId: "workflow-3669c",
    storageBucket: "workflow-3669c.firebasestorage.app",
    messagingSenderId: "449042202224",
    appId: "1:449042202224:web:fb3b39ce69333ea2a4feb5",
    measurementId: "G-CBPKVSXNW9"
};
  
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
export default firebaseApp;