// @ts-nocheck
/* eslint-disable no-unused-vars */
import { collection, getDocs, addDoc, deleteDoc, onSnapshot, doc, updateDoc, query, where } from 'firebase/firestore'
import { db, auth} from './firebase'


export const addRecord = (record) => {
  const collectionReference = collection(db, 'records');
  
  addDoc(collectionReference, record)
}

const getDocsUtility = async (collectionReference) => {
  let records = []
  const querySnap = await getDocs(collectionReference);
  querySnap.forEach((doc) => {
    records.push({...doc.data(), id: doc.id});
  });
  return records;
};

export const getAllRecords = async () => {
  try {
    const collectionReference = collection(db, 'records');
    const snapQuery = query(collectionReference, where('userID', '==', auth.currentUser.uid));
    const records = await getDocsUtility(snapQuery);
    return records;
  } catch (error) {
    return [];
  }
}

export const getRecord = (recordID) => {
  const documentReference = doc(db, 'records', recordID);

  onSnapshot(documentReference, (doc) => {
    return {...doc.data, id: doc.id};
  })
}

export const deleteRecord = (recordID) => {
  try {
    const documentReference = doc(db, 'records', recordID);

    deleteDoc(documentReference)
    return true;
  } catch (error) {
    return false;
  }
}

export const editRecord = (recordID, updateValues) => {
  try {
    const documentReference = doc(db, 'records', recordID)

    updateDoc(documentReference, updateValues)

    return true;
  } catch (error) {
    return false;
  }
}