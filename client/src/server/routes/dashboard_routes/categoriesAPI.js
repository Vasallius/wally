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

export const addCategory = (category) => {
  const collectionReference = collection(db, 'categories');
  
  addDoc(collectionReference, category)
}

export const editCategory = (categoryID, updateValues) => {
  try {
    const documentReference = doc(db, 'categories', categoryID)

    updateDoc(documentReference, updateValues)

    return true;
  } catch (error) {
    return false;
  }
}

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

export const deleteCategory = (categoryID) => {
  try {
    const documentReference = doc(db, 'categories', categoryID);

    deleteDoc(documentReference)

    return true;
  } catch (error) {
    return false;
  }
}

export const addSubcategory = async (categoryID, subcategory) => {
  try {
    const docReference = doc(db, "categories", categoryID);
    let snap = await getDoc(docReference);
    let updatedSubcategory = snap.data().subcategories;
    updatedSubcategory.push(subcategory);
    await updateDoc(docReference, { subcategories: updatedSubcategory });
    return true;
  } catch (error) {
    return false;
  }
}

export const deleteSubcategory = async (categoryID, subcategory) => {
  try {
    const docReference = doc(db, "categories", categoryID);
    let snap = await getDoc(docReference);
    let updatedSubcategory = snap.data().subcategories;
    updatedSubcategory = updatedSubcategory.filter((val) => {
      return val != subcategory;
    });
    await updateDoc(docReference, { subcategories: updatedSubcategory });
    return true;
  } catch (error) {
    return false;
  }
}