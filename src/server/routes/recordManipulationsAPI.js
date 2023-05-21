// @ts-nocheck
/* eslint-disable no-unused-vars */
import { collection, getDocs, getDoc, addDoc, deleteDoc, onSnapshot, doc, updateDoc, query, where } from 'firebase/firestore'
import { db, auth } from './firebase'
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

export const addRecord = async (userID, record) => {
  const docRef = doc(db, 'records', userID);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data().records;
    let newRecord= record
    newRecord["date"] = firebase.firestore.Timestamp.now();

    const oldrecords = [...data];
    const newrecords = oldrecords.concat(newRecord);
    await updateDoc(docRef, {
      records: newrecords
    })
    console.log("new records")
    console.log(newrecords)
    return newrecords;
    ;
  } else {
    console.log("No such document!");
  }
  
}

export const getAllRecords = async (userID)=>{
  const docRef = doc(db, 'records', userID);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data().records;
    return data
  } else {
    console.log("No such document!");
  }
}

const getDocsUtility = async (collectionReference) => {
  let records = []
  const querySnap = await getDocs(collectionReference);
  querySnap.forEach((doc) => {
    records.push({ ...doc.data(), id: doc.id });
  });
  return records;
};


export const getRecord = async (userID, index) => {
  const collectionReference = collection(db, 'records');
  const recordsReference = query(collectionReference, where('userID', '==', userID));
  let record = [];
  const querySnap = await getDocs(recordsReference)
    .then((val) => {
      val.forEach((doc) => {
        record.push({ ...doc.data(), id: doc.id });
      })
    });
  if (index >= record[0].records.length) {
    return null;
  } else {
    return record[0].records[index];
  }
}

export const deleteRecord = async (userID, index) => {
  const collectionReference = collection(db, 'records');
  const recordsReference = query(collectionReference, where('userID', '==', userID));
  let record = [];
  const querySnap = await getDocs(recordsReference)
    .then((val) => {
      val.forEach((doc) => {
        record.push({ ...doc.data(), id: doc.id });
      })
    });
  if (index < record[0].records.length) {
    record[0].records = record[0].records.filter((val, ind) => {
      return ind != index;
  })
    const documentReference = doc(db, 'records', record[0].id)

    updateDoc(documentReference, { records: record[0].records });
    return true;
  } else {
    return false;
  }
}

export const editRecord = async (userID, index, updateValues) => {
  const collectionReference = collection(db, 'records');
  const recordsReference = query(collectionReference, where('userID', '==', userID));
  let record = [];
  const querySnap = await getDocs(recordsReference)
    .then((val) => {
      val.forEach((doc) => {
        record.push({ ...doc.data(), id: doc.id });
      })
    });
  if (index < record[0].records.length) {
    for (const [key, values] of Object.entries(record[0].records[index])) {
      for (const [key2, values2] of Object.entries(updateValues)) {
        if (key == key2) {
          record[0].records[index][key] = values2;
          break;
        }
      }
    }

    const documentReference = doc(db, 'records', record[0].id)

    updateDoc(documentReference, { records: record[0].records });
    return true;
  } else {
    return false;
  }
}