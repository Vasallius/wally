// @ts-nocheck
/* eslint-disable no-unused-vars */
import { collection, getDocs, getDoc, addDoc, deleteDoc, onSnapshot, doc, updateDoc, query, where } from 'firebase/firestore'
import { db, auth } from './firebase'


export const addRecord = async (userID, record) => {
  const docRef = doc(db, 'records', userID);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data().records;
    let newRecord= record
    newRecord["date"] = new Date();

    const oldrecords = [...data];
    const newrecords = oldrecords.concat(newRecord);
    await updateDoc(docRef, {
      records: newrecords
    })
    return newrecords;
    ;
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

// export const getAllRecords = async (currentActiveWallet) => {
//   try {
//     const collectionReference = collection(db, 'records');
//     const snapQuery = query(collectionReference,
//       where('userID', '==', auth.currentUser.uid),
//       where('wallet', '==', currentActiveWallet)
//     );
//     const records = await getDocsUtility(snapQuery);
//     return records;
//   } catch (error) {
//     return [];
//   }
// }

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