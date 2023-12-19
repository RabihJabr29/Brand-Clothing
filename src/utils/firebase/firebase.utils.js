import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  doc, // this is to get the doc instance the others are for getting and setting the document data
  getDoc,
  setDoc,
} from "firebase/firestore";

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

// Initialize Providers
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

// Getting the Authentication
export const auth = getAuth();

// Sign-in methods
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

// Initializing the database

export const db = getFirestore();

// Creating a user document from the user authentication object (uid)

export const createUserDocumentFromAuth = async (
  userAuth,
  additionInformation = {}
) => {
  if (!userAuth) return;

  // we want to get the authentication token from the login and store it in our firestore database
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionInformation,
      });
    } catch (error) {
      console.log("error creating the user " + error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return signInWithEmailAndPassword(auth, email, password);
};
