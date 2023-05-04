// @ts-nocheck
/* eslint-disable no-unused-vars */
import { db , auth } from './firebase'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'

// const firebaseConfig = {
//   apiKey: "AIzaSyATQg28EQd-b_C_98EgVFbIwjI-vr9IbFs",
//   authDomain: "wally-55432.firebaseapp.com",
//   projectId: "wally-55432",
//   storageBucket: "wally-55432.appspot.com",
//   messagingSenderId: "116738427703",
//   appId: "1:116738427703:web:6f072f98620c5ce4d668b2"
// };

// initializeApp(firebaseConfig)



// export const auth = getAuth();

export const signUp = async (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then(cred => {
      console.log('user created:', cred.user)
      return true;
    })
    .catch(err => {
      console.log(err.message)
      return false;
    })
}

export const logIn = (email, password) => {
  console.log("Email:", email, "Password:", password);


  
  signInWithEmailAndPassword(auth, email, password)
    .then(cred => {
      console.log('user logged in:', cred.user)
      window.location.href = '/dashboard'; // redirect to dashboard
      return '';
    })
    .catch(err => {
      return err.message;
    })
}


export const logOut = () => {
  try {
    signOut(auth)
    .then(() => {
      console.log("User logged out")
    })
    .catch((err) => {
      console.log(err.message)
    })
    return true;
  } catch (error) {
    return false;
  }
}
