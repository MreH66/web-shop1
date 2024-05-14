import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {};

export const emailID = ""

const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const singInWithGooglePopup = () => signInWithPopup(auth, provider);

// console.log(firebaseApp);
export const db = getFirestore(app);

export const storage = getStorage(app);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

export async function userSingOut() {
  await signOut(auth);
}
