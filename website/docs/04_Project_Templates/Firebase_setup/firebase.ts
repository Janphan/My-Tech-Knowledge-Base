// Firebase Configuration Template
// Replace the placeholder values below with your actual Firebase project configuration
// You can find these values in your Firebase Console:
// 1. Go to https://console.firebase.google.com/
// 2. Select your project
// 3. Go to Project Settings > General > Your apps
// 4. Copy the config values from your web app

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // Replace these with your actual Firebase config values
  apiKey: "your-api-key-here",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456",
  measurementId: "G-ABCDEFGHIJ", // Optional - only if using Analytics
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services for use in your app
export const auth = getAuth(app);
export const db = getFirestore(app);

// Optional: Export the app instance if needed elsewhere
export default app;
