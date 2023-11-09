import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.en.AUTH_DOMAIN,
  projectId:  process.en.PROJECT_ID,
  storageBucket:  process.en.STORAGE_BUCKET,
  messagingSenderId:  process.en.MESSAGING_SENDER_ID,
  appId:  process.en.APP_ID,
  measurementId:  process.en.MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };