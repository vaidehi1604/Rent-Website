import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getStorage, ref} from "firebase/storage"
import { getFirestore } from "firebase/firestore";
// const FirebaseContext=
const firebaseConfig = {
  apiKey: "AIzaSyCIHhTw9WwP-hCz97maURQ2KoVfsDXhpTI",
  authDomain: "rent-app-dafe4.firebaseapp.com",
  projectId: "rent-app-dafe4",
  storageBucket: "rent-app-dafe4.appspot.com",
  messagingSenderId: "580517801663",
  appId: "1:580517801663:web:4a96a68556093b2ad2600a",
  databaseURL: "https://rent-app-dafe4-default-rtdb.firebaseio.com/",
};
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage=getStorage(app)


