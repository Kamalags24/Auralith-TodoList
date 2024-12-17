import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyCoOgktItG5dc3ECT0akeOecUo41pyVZT8",
  authDomain: "auralith-todolist.firebaseapp.com",
  projectId: "auralith-todolist",
  storageBucket: "auralith-todolist.firebasestorage.app",
  messagingSenderId: "1003292053809",
  appId: "1:1003292053809:web:b07854309763e8129b6010",
  measurementId: "G-FJ81E08R0H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);

export default app;