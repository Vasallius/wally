import {
    getAuth,
    onAuthStateChanged,
    type User,
    signInWithEmailAndPassword
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { onMount } from 'svelte';
let username = '';
let fullname = '';
let email = '';
let password = '';
let user: User | null;

const firebaseConfig = {
    apiKey: 'AIzaSyDTLyLUaVgvIihRMDLOXypjqfBenGh2fQk',
    authDomain: 'wally-75d4e.firebaseapp.com',
    projectId: 'wally-75d4e',
    storageBucket: 'wally-75d4e.appspot.com',
    messagingSenderId: '518053974573',
    appId: '1:518053974573:web:8aa5410f6c4b98ffd75ea4'
};
const app = initializeApp(firebaseConfig);

const login = () => {
    console.log('test');
    console.log('email and pass');
    console.log(email, password);
    const auth = getAuth(app);

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
};

onMount(async () => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (newUser) => {
        user = newUser;
    });
});