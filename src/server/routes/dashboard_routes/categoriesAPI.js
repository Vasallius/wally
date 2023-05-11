// @ts-nocheck
/* eslint-disable no-unused-vars */
import { collection, getDocs, getDoc, updateDoc, doc, query, where } from 'firebase/firestore'
import {db,auth} from '../firebase'

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
  const docRef = doc(db, 'categories', userID);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data().categories;
    let newCategory= category

    const oldcategories = [...data];
    const newcategories = oldcategories.concat(newCategory);
    await updateDoc(docRef, {
      categories: newcategories
    })
    return newcategories;
    ;
  } else {
    console.log("No such document!");
  }



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