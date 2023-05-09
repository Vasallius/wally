// @ts-nocheck
/* eslint-disable no-unused-vars */
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, where } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

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
  let categories = []
  const querySnap = await getDocs(collectionReference);
  querySnap.forEach((doc) => {
    categories.push({...doc.data(), id: doc.id});
  });
  return categories;
}

export const getAllCategories = async () => {
  try {
    const collectionReference = collection(db, 'categories');
    const snapQuery = query(collectionReference, where("userID", '==', auth.currentUser.uid));
    const categories = await getDocsUtility(snapQuery);
    return categories;
  } catch (error) {
    return [];
  }
}

export const addCategory = async (userID, category) => {
  try {
    const collectionReference = collection(db, 'categories');
    const recordsReference = query(collectionReference,
      where('userID', '==', userID)
    );
    const categories = await getDocsUtility(recordsReference)
    .then((val) => {
      return val;
    });
    categories[0].categories.push(category.name);
    const documentReference = doc(db, 'categories', categories[0].id);
    updateDoc(documentReference, {categories: categories[0].categories});
    return true;
  } catch (error) {
    return false;
  }
}

export const editCategory = async (userID, categoryIndex, updatedName) => {
  try {
    const collectionReference = collection(db, 'categories');
    const recordsReference = query(collectionReference,
      where('userID', '==', userID)
    );
    const categories = await getDocsUtility(recordsReference)
    .then((val) => {
      return val;
    });
    if(categories[0].categories.length > categoryIndex){
      categories[0].categories[categoryIndex] = updatedName;
      const documentReference = doc(db, 'categories', categories[0].id);
      updateDoc(documentReference, {categories: categories[0].categories});
      return true;
    }else{
      return false;
    }
  } catch (error) {
    return false;
  }
}

export const deleteCategory = async (userID, categoryIndex) => {
  try {
    const collectionReference = collection(db, 'categories');
    const recordsReference = query(collectionReference,
      where('userID', '==', userID)
    );
    const categories = await getDocsUtility(recordsReference)
    .then((val) => {
      return val;
    });
    if(categories[0].categories.length > categoryIndex){
      categories[0].categories = categories[0].categories.filter((val, ind) => {
        return ind != categoryIndex;
      })
      const documentReference = doc(db, 'categories', categories[0].id);
      updateDoc(documentReference, {categories: categories[0].categories});
      return true;
    }else{
      return false;
    }
  } catch (error) {
    return false;
  }
}