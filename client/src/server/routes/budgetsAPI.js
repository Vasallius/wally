// @ts-nocheck
/* eslint-disable no-unused-vars */
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, query, where } from 'firebase/firestore'
import { getAuth } from 'firebase/auth';

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
const auth = getAuth()

const getDocsUtility = async (collectionReference) => {
  let wallets = []
  const querySnap = await getDocs(collectionReference);
  querySnap.forEach((doc) => {
    wallets.push({...doc.data(), id: doc.id});
  });
  return wallets;
}

export const getAllBudgets = async () => {
  const collectionReference = collection(db, 'budgets');
  const snapQuery = query(collectionReference, where('userID', '==', auth.currentUser.uid));
  return await getDocsUtility(snapQuery);
};

export const addBudget = (budget) => {
  const collectionReference = collection(db, 'budgets');
  
  addDoc(collectionReference, budget)
};


/**
 * 
 * documentID: Refers to the document ID of the budget document to be deleted. 
 * formReference: Refers to the form submitted.
 */
export const deleteBudget = (documentID) => {
  const documentReference = doc(db, 'budgets', documentID);

  deleteDoc(documentReference)
};