import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA-CaJ_FgXV1jGkaLnSnioiEsLte5e2SYY",
  authDomain: "mtos-de3a5.firebaseapp.com",
  projectId: "mtos-de3a5",
  storageBucket: "mtos-de3a5.appspot.com",
  messagingSenderId: "371277872017",
  appId: "1:371277872017:web:103440044003ddc384b830",
  measurementId: "G-J70XHG4PD9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };