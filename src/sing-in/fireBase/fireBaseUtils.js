import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAI_eheDed8CMl4_Gtl_9J3-wXBMhOme3k",
  authDomain: "web-shop-fashion.firebaseapp.com",
  projectId: "web-shop-fashion",
  storageBucket: "web-shop-fashion.appspot.com",
  messagingSenderId: "799153726306",
  appId: "1:799153726306:web:91ec4b731b5a23e856023b",
};

const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const singInWithGooglePopup = () => signInWithPopup(auth, provider);

// console.log(firebaseApp);
export const db = getFirestore(app);
