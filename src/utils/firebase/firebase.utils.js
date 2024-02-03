import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc, // this is to get the doc instance the others are for getting and setting the document data
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
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
export const signInWithGooglePopup = async () => {
  return await signInWithPopup(auth, googleProvider);
};

export const signInWithGoogleRedirect = async () => {
  return await signInWithRedirect(auth, googleProvider);
};

// Initializing the database
export const db = getFirestore();

// This is a one timer method that we launched using useEffect to populate the categories from withing the CategoriesContext with data=SHOP_DATA
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);
  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("done");
};

// get the categories data from the firestore database
export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((accumulator, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    accumulator[title.toLowerCase()] = items;
    return accumulator;
  }, {});

  return categoryMap;
};

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

export const signOutUser = async () => {
  await signOut(auth);
};

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
