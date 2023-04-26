// @ts-nocheck
/* eslint-disable no-unused-vars */
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, addDoc, deleteDoc, onSnapshot, doc, updateDoc, query, where } from 'firebase/firestore'
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