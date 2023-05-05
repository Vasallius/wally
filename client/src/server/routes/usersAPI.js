// @ts-nocheck
/* eslint-disable no-unused-vars */
import { auth } from './firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { authStore } from '../stores/stores'
import { goto } from '$app/navigation';

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
  return signInWithEmailAndPassword(auth, email, password)
    .then(cred => {
      authStore.set(cred)
      console.log(cred)
      goto('/dashboard')
      return '';
    })
    .catch(err => {
      return err.message;
    })
}


export const logOut = () => {
  return signOut(auth)
    .then(() => {
      goto('/login')
      // redirect to dashboard
    })
    .catch((err) => {
      console.log(err.message);
    });
};