// @ts-nocheck
/* eslint-disable no-unused-vars */
import { authStore } from '../stores/stores'
import { goto } from '$app/navigation';
import { db , auth } from './firebase'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { getFirestore, collection, getDocs, addDoc, deleteDoc, onSnapshot, doc, updateDoc, query, where } from 'firebase/firestore'
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
  await createUserWithEmailAndPassword(auth, email, password)
    .then(cred => {
      console.log('user created:', cred.user)
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
      }
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