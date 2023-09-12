// @ts-nocheck
/* eslint-disable no-unused-vars */
import { goto } from '$app/navigation';
import { auth, db } from '$lib/firebase/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { authStore } from '../stores/stores';

/**
 * A function that signs-up the user. Utilizes the
 * createUserWithEmailAndPassword() method from
 * firebase.
 * @param {string} name
 * @param {string} email
 * @param {string} password
 */
export const signUp = async (name, email, password) => {
	try {
		const cred = await createUserWithEmailAndPassword(auth, email, password);
		goto('/login');

		const records = {
			records: []
		};

		const wallets = {
			wallets: [
				{
					name: 'Cash',
					initial: 0,
					balance: 0,
					dailyBudget: 0,
					weeklyBudget: 0,
					active: 'True'
				}
			]
		};

		const categories = {
			categories: [
				'Food & Drinks',
				'Shopping',
				'Housing',
				'Transportation',
				'Vehicle',
				'Life & Entertainment',
				'Communication, PC',
				'Financial expenses',
				'Investments',
				'Income',
				'Others',
				'Unknown'
			]
		};

		const budgets = {
			budgets: {
				DayRecords: [],
				WeekRecords: [],
				MonthRecords: []
			}
		};

		const users = {
			name
		};

		await setDoc(doc(db, 'records', cred.user.uid), records);
		await setDoc(doc(db, 'wallets', cred.user.uid), wallets);
		await setDoc(doc(db, 'categories', cred.user.uid), categories);
		await setDoc(doc(db, 'users', cred.user.uid), users);
		await setDoc(doc(db, 'budgets', cred.user.uid), budgets);

		return '';
	} catch (err) {
		console.log('Error with signing up');
		console.log(err.message);
		return err.message;
	}
};

/**
 * A function that logs-in the user. Utilizes the
 * signInWithEmailAndPassword() method from firebase.
 * @param {string} email
 * @param {string} password
 * @returns A message that tells if there is an
 *  error upon login.
 */
export const logIn = async (email, password) => {
	return signInWithEmailAndPassword(auth, email, password)
		.then((cred) => {
			authStore.set(cred);
			goto('/dashboard');
			return '';
		})
		.catch((err) => {
			return err.message;
		});
};

/**
 * A function that logs-out the user.
 * @returns Redirects the user to the main menu
 * upon successful logout.
 */
export const logOut = () => {
	return signOut(auth)
		.then(() => {
			goto('/login');
		})
		.catch((err) => {
			console.log(err.message);
		});
};
