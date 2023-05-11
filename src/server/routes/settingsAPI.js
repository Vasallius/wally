// @ts-nocheck
/* eslint-disable no-unused-vars */
import { doc, updateDoc } from 'firebase/firestore'
import { db, auth} from './firebase'


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