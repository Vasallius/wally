// @ts-nocheck
/* eslint-disable no-unused-vars */
import { db, auth } from './firebase'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { authStore, isLoading } from '../stores/stores'
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
  return new Promise((resolve, reject) => {
    try {
      signOut(auth)
        .then(() => {
          resolve(true);
          ; // redirect to dashboard
        })
        .catch((err) => {
          console.log(err.message);
          reject(false);
        });
    } catch (error) {
      reject(false);
    }
  });
}
