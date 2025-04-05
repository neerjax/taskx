import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAONnov6YUcVY1XSdaUlQrCXj8tzOZs-ko",
  authDomain: "neerjax-task-tracker.firebaseapp.com",
  projectId: "neerjax-task-tracker",
  storageBucket: "neerjax-task-tracker.appspot.com",
  messagingSenderId: "689391473037",
  appId: "1:689391473037:web:84e4e9446d057975792dc4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);