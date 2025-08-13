// Firebase v9+ modular SDK
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// import { getAnalytics } from 'firebase/analytics'; // Uncomment if you want analytics

const firebaseConfig = {
  apiKey: "AIzaSyCyYJ31XD-WvzjGyKQKwjdWMXb-5cE9qrw",
  authDomain: "foodfly-6784b.firebaseapp.com",
  projectId: "foodfly-6784b",
  storageBucket: "foodfly-6784b.appspot.com", // fixed typo
  messagingSenderId: "357807540407",
  appId: "1:357807540407:web:781bab66bf73ee0a9ae532",
  measurementId: "G-79CC7KGZHJ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// export const analytics = getAnalytics(app); // Uncomment if you want analytics