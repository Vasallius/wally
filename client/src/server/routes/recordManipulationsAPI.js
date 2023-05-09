// @ts-nocheck
/* eslint-disable no-unused-vars */
import { collection, getDocs, addDoc, deleteDoc, onSnapshot, doc, updateDoc, query, where } from 'firebase/firestore'
import { db, auth} from './firebase'


export const addRecord = async (userID, record) => {
  const collectionReference = collection(db, 'records');
  const recordsReference = query(collectionReference,
    where('userID', '==', userID)
  );
  const records = await getDocsUtility(recordsReference)
  .then((val) => {
    return val;
  });
  record["date"] = new Date();
  records[0].records.push(record);
  const documentReference = doc(db, 'records', records[0].id);
  updateDoc(documentReference, {records: records[0].records});
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

export const getRecord = async (userID, index) => {
  const collectionReference = collection(db, 'records');
  const recordsReference = query(collectionReference, where('userID', '==', userID));
  let record = [];
  const querySnap = await getDocs(recordsReference)
  .then((val) => {
    val.forEach((doc) => {
      record.push({...doc.data(), id: doc.id});
    })
  });
  if(index >= record[0].records.length){
    return null;
  } else{
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
      record.push({...doc.data(), id: doc.id});
    })
  });
  if(index < record[0].records.length){
    record[0].records = record[0].records.filter((val, ind) => {
      return ind != index;
    })
    const documentReference = doc(db, 'records', record[0].id)
  
    updateDoc(documentReference, {records: record[0].records});
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
      record.push({...doc.data(), id: doc.id});
    })
  });
  if(index < record[0].records.length){
    for(const [key, values] of Object.entries(record[0].records[index])){
      for(const [key2, values2] of Object.entries(updateValues)){
        if(key == key2){
          record[0].records[index][key] = values2;
          break;
        }
      }
    }
    
    const documentReference = doc(db, 'records', record[0].id)
  
    updateDoc(documentReference, {records: record[0].records});
    return true;
  } else {
    return false;
  }
}