import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZxrTSIJ3Hm2mn5qMHY-SCOCXWy3WsuRc",
  authDomain: "crwn-clothing-db-aff83.firebaseapp.com",
  projectId: "crwn-clothing-db-aff83",
  storageBucket: "crwn-clothing-db-aff83.appspot.com",
  messagingSenderId: "52288475773",
  appId: "1:52288475773:web:1114c8f269f81c438b1714",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
