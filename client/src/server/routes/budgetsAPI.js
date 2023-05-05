// @ts-nocheck
/* eslint-disable no-unused-vars */
import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc, query, where } from 'firebase/firestore'
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

export const addBudget = async (userID, budget) => {
  try {
    const collectionReference = collection(db, 'budgets');
    const recordsReference = query(collectionReference,
      where('userID', '==', userID)
    );
    const budgets = await getDocsUtility(recordsReference)
    .then((val) => {
      return val;
    });
    budgets[0].budgets.push(budget);
    const documentReference = doc(db, 'budgets', budgets[0].id);
    updateDoc(documentReference, {budgets: budgets[0].budgets});
    return true;
  } catch (error) {
    return false;
  }
}

export const deleteBudget = async (userID, index) => {
  try {
    const collectionReference = collection(db, 'budgets');
    const recordsReference = query(collectionReference,
      where('userID', '==', userID)
    );
    const budgets = await getDocsUtility(recordsReference)
    .then((val) => {
      return val;
    });
    if(budgets[0].budgets.length > index){
      budgets[0].budgets.filter((val, ind) => {
        return ind != index;
      })
      const documentReference = doc(db, 'budgets', budgets[0].id);
      updateDoc(documentReference, {budgets: budgets[0].budgets});
      return true;
    }else{
      return false;
    }
  } catch (error) {
    return false;
  }
};