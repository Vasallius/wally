// @ts-nocheck
/* eslint-disable no-unused-vars */
import { authStore } from '../stores/stores'
import { goto } from '$app/navigation';
import { db, auth } from './firebase'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { getFirestore, collection, getDocs, addDoc, deleteDoc, onSnapshot, doc, updateDoc, query, where } from 'firebase/firestore'

export const signUp = async (email, password) => {
  await createUserWithEmailAndPassword(auth, email, password)
    .then(cred => {
      console.log('user created:', cred.user);

      const records = {
        userID: cred.user.uid,
        records: []
      };

      const wallets = {
        userID: cred.user.uid,
        wallets: [
          {
            name: "Cash",
            balance: 0,
            dailyBudget: 0,
            weeklyBudget: 0,
            active: "True",
          }
        ]
      };

      const categories = {
        userID: cred.user.uid,
        categories: []
      };

      const budgets = {
        userID: cred.user.uid,
        budgets: []
      };

      const recordsReference = collection(db, 'records');
      addDoc(recordsReference, records);

      const walletsReference = collection(db, 'wallets');
      addDoc(walletsReference, wallets);

      const categoryReference = collection(db, 'categories');
      addDoc(categoryReference, categories);

      const budgetsReference = collection(db, 'budgets');
      addDoc(budgetsReference, budgets);

      return true;
    })
    .catch(err => {
      console.log(err.message);
      return false;
    });
}

export const logIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then(cred => {
      authStore.set(cred)
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
