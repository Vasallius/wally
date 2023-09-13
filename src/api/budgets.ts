import { doc, getDoc } from 'firebase/firestore';
import { db } from '../server';

interface budgetRecord {
	budget: number;
	spent: number;
	title: string;
}
interface Budget {
	DayRecords: budgetRecord[];
	WeekRecords: budgetRecord[];
	MonthRecords: budgetRecord[];
	[key: string]: budgetRecord[]; // Index signature
}
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
		const data: Budget = docSnap.data().budgets;
		return data;
	} else {
		return {
			DayRecords: [],
			WeekRecords: [],
			MonthRecords: []
		};
	}
};
