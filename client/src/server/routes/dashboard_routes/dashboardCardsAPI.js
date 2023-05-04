// @ts-nocheck
/* eslint-disable no-unused-vars */
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, onSnapshot, query, where, and } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { authUser1 } from '../../stores/stores';
import { get } from 'svelte/store';
const firebaseConfig = {
  apiKey: "AIzaSyATQg28EQd-b_C_98EgVFbIwjI-vr9IbFs",
  authDomain: "wally-55432.firebaseapp.com",
  projectId: "wally-55432",
  storageBucket: "wally-55432.appspot.com",
  messagingSenderId: "116738427703",
  appId: "1:116738427703:web:6f072f98620c5ce4d668b2"
};

initializeApp(firebaseConfig)

const db = getFirestore()
const auth = getAuth();
console.log(auth);

let newval = "";

const findFunction = async (recordType, userID) => {
  const coll = collection(db, 'records')
  // eslint-disable-next-line no-undef
  // console.log(auth.currentUser, newval);
  const incomeRecordsReference = query(coll,
    where('recordType', '==', recordType),
    where('userID', '==', userID)
  );
  let records = []
  const querySnap = await getDocs(incomeRecordsReference);
  querySnap.forEach((doc) => {
    records.push({...doc.data(), id: doc.id});
  });
  return records;
}

export const getMonthlySummary = async (userID) => {
  try {
    const expense = await findFunction('Expense', userID);
    const income = await findFunction('Income', userID);
    const totalExpense = expense.reduce((total, val) => {
      return total+val.balance;
    }, 0);
    const totalIncome = income.reduce((total, val) => {
      return total+val.balance;
    }, 0);
    return [totalIncome, totalExpense];
  } catch (error) {
    return [0, 0];
  }
};

const getDocsUtility = async (collectionReference) => {
  let wallets = []
  const querySnap = await getDocs(collectionReference);
  querySnap.forEach((doc) => {
    wallets.push({...doc.data(), id: doc.id});
  });
  return wallets;
}

export const getWallets = async () => {
  // const collectionReference = collection(db, 'wallets');
  // const querySnap = query(collectionReference, where('userID', '==', auth.currentUser.uid))
  // const wallets = await getDocsUtility(querySnap);
  // return wallets;
};

export const getIncomeRecords = async (userID) => {
  return await findFunction('Income', userID);
};

export const getExpenseRecords = async (userID) => {
  return await findFunction('Expense', userID);
};

export const getTransferRecords = async (userID) => {
  return await findFunction('Transfer', userID);
};