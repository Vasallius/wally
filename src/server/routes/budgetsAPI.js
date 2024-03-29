// @ts-nocheck
/* eslint-disable no-unused-vars */
import { db } from '$lib/firebase/firebase';
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { getActiveWallet } from './dashboard_routes/dashboardCardsAPI';
import { getExpenseRecords } from './dashboardsAPI';

/**
 * Utility function that returns a list of objects for
 * a specific collection reference.
 * @param {object} collectionReference
 * @returns A list of objects based on a collection
 * reference.
 */
const getDocsUtility = async (collectionReference) => {
	let documents = [];
	const querySnap = await getDocs(collectionReference);
	querySnap.forEach((doc) => {
		documents.push({ ...doc.data(), id: doc.id });
	});
	return documents;
};

/**
 * A function that adds a budget.
 * @param {string} userID
 * @param {string} label
 * @param {Number} budget
 * @param {string} interval
 * @returns A list of the updated budgets' list.
 */
export const addBudget = async (userID, label, budget, interval) => {
	const docRef = doc(db, 'budgets', userID);
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		const activeWallet = await getActiveWallet(userID);
		const expenseRecords = await getExpenseRecords(userID, activeWallet);
		let newRecords = expenseRecords.filter((val) => {
			return val.category == label;
		});
		let spentValue = 0;
		if (interval == 'Daily') {
			const today = new Date();
			newRecords = newRecords.filter((val) => {
				const currentDate = new Date(val.date.seconds * 1000);
				console.log(currentDate, today);
				return (
					currentDate.getDate() == today.getDate() &&
					currentDate.getMonth() == today.getMonth() &&
					currentDate.getFullYear() == today.getFullYear()
				);
			});
			for (let i = 0; i < newRecords.length; i++) {
				spentValue += newRecords[i].amount;
			}
		} else if (interval == 'Weekly') {
			const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
			const today = new Date();
			const res = [];
			const dayOfWeek = today.getDate();
			const startDate = new Date(today);
			startDate.setDate(startDate.getDate() - dayOfWeek);

			for (let i = 0; i < 7; i++) {
				const currentDate = new Date(startDate);
				currentDate.setDate(startDate.getDate() + i);
				res.push(currentDate.toLocaleDateString());
			}
			for (let i = 0; i < newRecords.length; i++) {
				for (let j = 0; j < 7; j++) {
					const currentDate = new Date(newRecords[i].date.seconds * 1000);
					if (
						currentDate.getDate() == today.getDate() &&
						currentDate.getMonth() == today.getMonth() &&
						currentDate.getFullYear() == today.getFullYear()
					) {
						spentValue += newRecords[i].amount;
						break;
					}
				}
			}
		} else {
			const today = new Date();
			newRecords = newRecords.filter((val) => {
				const currentDate = new Date(val.date.seconds * 1000 + val.date.nanoseconds);
				return (
					currentDate.getMonth() == today.getMonth() &&
					currentDate.getFullYear() == today.getFullYear()
				);
			});
			for (let i = 0; i < newRecords.length; i++) {
				spentValue += newRecords[i].amount;
			}
		}
		const data = docSnap.data().budgets;
		let newbudget = {
			title: label,
			spent: spentValue,
			budget: budget
		};
		if (interval == 'Daily') {
			let dayRecords = data.DayRecords;
			dayRecords.push(newbudget);
			let updatedData = { ...data, DayRecords: dayRecords };
			await updateDoc(docRef, {
				budgets: updatedData
			}).then((val) => val);
			return updatedData;
		} else if (interval == 'Weekly') {
			let WeekRecords = data.WeekRecords;
			WeekRecords.push(newbudget);
			let updatedData = { ...data, WeekRecords: WeekRecords };

			await updateDoc(docRef, {
				budgets: updatedData
			}).then((val) => val);

			return updatedData;
		} else if (interval == 'Monthly') {
			let MonthRecords = data.MonthRecords;
			MonthRecords.push(newbudget);
			let updatedData = { ...data, MonthRecords: MonthRecords };

			await updateDoc(docRef, {
				budgets: updatedData
			});
			return updatedData;
		}
	} else {
		return 'no document';
	}
};

/**
 * Gets the list of all budgets from a specific user.
 * @param {string} userID
 * @returns Returns a list of all budgets from a
 * specific user. If there are no budgets, it returns
 * a string instead.
 */
export const getBudgets = async (userID) => {
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

export const updateBudgets = async (userID, budgets) => {
	const docRef = doc(db, 'budgets', userID);
	const docSnap = await getDoc(docRef);
	if (docSnap.exists()) {
		await updateDoc(docRef, {
			budgets: budgets
		});
	} else {
		return 'NO BUDGETS';
	}
};

/**
 * Deletes a budget based on its index.
 * @param {string} userID
 * @param {Number} index
 * @returns A boolean value if the operation
 * was successful or not.
 */
export const deleteBudget = async (userID, index) => {
	try {
		const collectionReference = collection(db, 'budgets');
		const recordsReference = query(collectionReference, where('userID', '==', userID));
		const budgets = await getDocsUtility(recordsReference).then((val) => {
			return val;
		});
		if (budgets[0].budgets.length > index) {
			budgets[0].budgets.filter((_, ind) => {
				return ind != index;
			});
			const documentReference = doc(db, 'budgets', budgets[0].id);
			updateDoc(documentReference, { budgets: budgets[0].budgets });
			return true;
		} else {
			return false;
		}
	} catch (error) {
		return false;
	}
};

/**
 * Utitlity function that checks for special characters.
 * @param {string} string
 * @returns A boolean value that tells whether the string
 * contains a special character or not.
 */
const specialCharactersCheck = (string) => {
	const special_characters = '~`!@#$%^*()+={}[]|\\/:;"<>,.?';
	for (let i = 0; i < string.length; i++) {
		for (let j = 0; j < special_characters.length; j++) {
			if (special_characters[j] == string[i]) {
				return true;
			}
		}
	}
	return false;
};

/**
 * Checks if a string only contains space characters.
 * @param {string} string
 * @returns A boolean value that tells whether the string
 * is a space-only string.
 */
const spaceOnlyCheck = (string) => {
	for (let i = 0; i < string.length; i++) {
		if (string[i] != ' ') {
			return false;
		}
	}
	return true;
};

/**
 * Checks if the budget being added has valid inputs.
 * @param {object} budget
 * @param {string} interval
 * @param {object} budgetStores
 * @returns A list that contains a boolean that tells if the
 * inputs are valid and a message about the result.
 */
export const budgetErrorCheck = (budget, interval, budgetStores, action) => {
	if (action == 'edit') {
		if (budget.budget < 0) {
			return [false, 'Initial budget must be non-negative.'];
		}
		return [true, 'Valid'];
	} else {
		const intervals = { Monthly: 'MonthRecords', Weekly: 'WeekRecords', Daily: 'DayRecords' };
		const check = budgetStores[intervals[interval]].filter((budg) => {
			return budg.title == budget.title && budg.budget != 0;
		});
		if (check.length > 0) {
			return [false, 'Budget already exists.'];
		} else if (specialCharactersCheck(budget.title)) {
			return [false, 'Special character not allowed.'];
		} else if (budget.title.name === '') {
			return [false, 'Budget title must contain at least one character.'];
		} else if (spaceOnlyCheck(budget.title)) {
			return [false, 'Budget title must not contain space-only characters.'];
		} else if (budget.budget < 0) {
			return [false, 'Initial budget must be non-negative.'];
		} else {
			return [true, 'Valid'];
		}
	}
};
