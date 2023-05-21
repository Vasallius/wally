// @ts-nocheck
/* eslint-disable no-unused-vars */
import { authStore } from '../stores/stores'
import { goto } from '$app/navigation';
import { db, auth } from './firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'

export const signUp = async (name, email, password) => {
  await createUserWithEmailAndPassword(auth, email, password)
    .then(cred => {
      goto('/login')

      const records = {
        records: []
      };

      const wallets = {
        wallets: [
          {
            name: "Cash",
            initial: 0,
            balance: 0,
            dailyBudget: 0,
            weeklyBudget: 0,
            active: "True",
          }
        ]
      };

      const categories = {
        categories: ['Food & Drinks', 'Shopping', 'Housing', 'Transportation', 'Vehicle', 'Life & Entertainment', 'Communication, PC', 'Financial expenses', 'Investments', 'Income', 'Others', 'Unknown']
      };

      const budgets = {
        budgets: {
          DayRecords: [],
          WeekRecords: [],
          MonthRecords: []
        }
      };

      const users = {
        name
      };
      
      setDoc(doc(db, "records", cred.user.uid), records);
      setDoc(doc(db, "wallets", cred.user.uid), wallets);
      setDoc(doc(db, "categories", cred.user.uid), categories);
      setDoc(doc(db, "users", cred.user.uid), users);
      setDoc(doc(db, "budgets", cred.user.uid), budgets);

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
