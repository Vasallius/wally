// @ts-nocheck
/* eslint-disable no-unused-vars */
import { initializeApp } from 'firebase/app'
import { getFirestore, doc, updateDoc } from 'firebase/firestore'

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

export const editProfile = (userID, updateValues, formReference) => {
  try {
    const documentReference = doc(db, 'records', userID)

    updateDoc(documentReference, updateValues)
      .then(() => {
        formReference.reset();
      });

    return true;
  } catch (error) {
    return false;
  }
}