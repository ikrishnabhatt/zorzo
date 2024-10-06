import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyAetfZIOMP7aEGQ_vGbS9i_epKlCUmJvrg",
	authDomain: "zorzo-42e5f.firebaseapp.com",
  	projectId: "zorzo-42e5f",
  	storageBucket: "zorzo-42e5f.appspot.com",
  	messagingSenderId: "936276485821",
  	appId: "1:936276485821:web:3068395a9018503b1e79d4",
  	measurementId: "G-R5YXXKQRFW"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage, getFirestore};
