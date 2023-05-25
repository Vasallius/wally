// @ts-nocheck
/* eslint-disable no-unused-vars */
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db, auth} from './firebase'
import { updateEmail, updatePassword } from 'firebase/auth'
import { authStore } from '../stores/stores'

/**
 * Update the name of the user.
 * @param {string} name 
 * @param {string} userID 
 * @returns A boolean value that specifies whether the
 * operation was successful or not.
 */
const nameUpdate = async (name, userID) => {
  const docRef = doc(db, 'users', userID);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    await updateDoc(docRef, {name: name});
    return true;
  } else {
    return false;
  }
}

/**
 * Updates the email of the user.
 * @param {string} email 
 * @returns A boolean value that specifies whether the
 * operation was successful or not.
 */
const emailUpdate = (email) => {
  try {
    updateEmail(auth.currentUser, email).then(() => {
      return "Email update successful";
    }).catch((error) => {
      console.log(error.message);
      return "Email update failed";
    });
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Updates the password of the user.
 * @param {string} password 
 * @returns A boolean value that specifies whether the
 * operation was successful or not.
 */
const passwordUpdate = (password) => {
  try {
    updatePassword(auth.currentUser, password).then(() => {
      return "Password update successful";
    }).catch((error) => {
      console.log(error.message);
      return "Password update failed";
    });
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Updates the profile of the user based on the values
 * passed.
 * @param {string} name 
 * @param {string} email 
 * @param {string} password 
 * @param {string} userID 
 * @returns A boolean value that specifies whether the
 * operation was successful or not.
 */
export const updateProfile = async (name, email, password, userID) => {
  try {
    if (name != '') {
      await nameUpdate(name, userID).then(val => val);
    }
    if (email != '') {
      emailUpdate(email);
    }
    if (password != '') {
      passwordUpdate(password);
    }
    return true;
  } catch (error) {
    return false;
  }
}