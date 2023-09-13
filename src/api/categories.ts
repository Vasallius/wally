import { doc, getDoc } from 'firebase/firestore';
import { db } from '../server';

/**
 * Returns a list that contains all categories.
 * @param {string} userID
 * @returns A list that contains all categories
 * a user have.
 */
export const getCategories = async (userID: string) => {
	const docRef = doc(db, 'categories', userID);
	const docSnap = await getDoc(docRef);
	if (docSnap.exists()) {
		const data: string[] = docSnap.data().categories;
		return data;
	} else {
		console.log('ERROR');
		return [];
	}
};
