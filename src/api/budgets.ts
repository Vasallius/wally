import type { Timestamp } from 'firebase/firestore';
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

interface Record {
	amount: number;
	category: string;
	date: Timestamp;
	name: string;
	recordType: string;
	wallet: string;
	wallet2: string;
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

export function filterByDay(expenses: Record[]) {
	const today = new Date();
	today.setHours(0, 0, 0, 0); // Set to the start of the day

	return expenses.filter((item) => {
		const itemDate = new Date(item.date.seconds * 1000);
		return itemDate >= today;
	});
}

export function filterByWeek(expenses: Record[]) {
	const startOfWeek = new Date();
	startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // Set to the start of the week
	startOfWeek.setHours(0, 0, 0, 0); // Set to the start of the day

	return expenses.filter((item) => {
		const itemDate = new Date(item.date.seconds * 1000);
		return itemDate >= startOfWeek;
	});
}

export function filterByMonth(expenses: Record[]) {
	const startOfMonth = new Date();
	startOfMonth.setDate(1); // Set to the start of the month
	startOfMonth.setHours(0, 0, 0, 0); // Set to the start of the day

	return expenses.filter((item) => {
		const itemDate = new Date(item.date.seconds * 1000);
		return itemDate >= startOfMonth;
	});
}

export function sumAmountByCategory(
	expenses: Record[],
	categories: string[],
	array: budgetRecord[]
) {
	return categories.map((category) => {
		const filteredExpenses = expenses.filter((item) => item.category === category);
		const totalSpent = filteredExpenses.reduce((sum, item) => sum + item.amount, 0);

		const result = array.find((el) => el.title === category);

		if (result) {
			const budget = result.budget || 0;
			return {
				title: category,
				spent: totalSpent,
				budget: budget
			};
		} else {
			return {
				title: category,
				spent: totalSpent,
				budget: 0
			};
		}
	});
}
