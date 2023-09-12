// src/lib/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: import.meta.env.VITE_APIKEY,
	authDomain: import.meta.env.VITE_AUTHDOMAIN,
	projectId: import.meta.env.VITE_PROJECTID,
	storageBucket: import.meta.env.VITE_STORAGEBUCKET,
	messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
	appId: import.meta.env.VITE_APPID
};

initializeApp(firebaseConfig);

export const db = getFirestore();
export const auth = getAuth();
