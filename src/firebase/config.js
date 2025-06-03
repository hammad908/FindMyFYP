import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCO3nOPE3UGCUL6BSKt5HSPTbcgD7EXy7U",
  authDomain: "fyp-supervisor-finder-89d59.firebaseapp.com",
  projectId: "fyp-supervisor-finder-89d59",
  storageBucket: "fyp-supervisor-finder-89d59.appspot.com",
  messagingSenderId: "357739817095",
  appId: "1:357739817095:web:c0e422b183d125639e7022",
  measurementId: "G-GPZ8QC3YCS"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
