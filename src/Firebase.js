import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "@firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAbinUixOU6kLTgquG0QSjBC1e6lIGOQqI",
  authDomain: "utamaduni-wa-kenya.firebaseapp.com",
  projectId: "utamaduni-wa-kenya",
  storageBucket: "utamaduni-wa-kenya.appspot.com",
  messagingSenderId: "49527629128",
  appId: "1:49527629128:web:fe6c630e9c648c8367bf7d",
  measurementId: "G-DZQB0H53C4",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { auth, analytics, db, provider };
