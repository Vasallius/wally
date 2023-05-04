// @ts-nocheck
/* eslint-disable no-unused-vars */
import { collection, getDocs, addDoc, deleteDoc, doc, query, where } from 'firebase/firestore'
import { db, auth} from './firebase'



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