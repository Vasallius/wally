import { doc, getDoc } from 'firebase/firestore';
import { db } from '../server';

/**
 * Gets the list of all budgets from a specific user.
 * @param {string} userID
 * @returns Returns a list of all budgets from a
 * specific user. If there are no budgets, it returns
 * a string instead.
 */
export const getBudgets = async (userID: string) => {
	const docRef = doc(db, 'budgets', userID);
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		const data = docSnap.data().budgets;
		// console.log(data)
		return data;
	} else {
		return 'NO BUDGETS';
	}
};
