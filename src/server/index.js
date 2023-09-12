// @ts-nocheck
/* eslint-disable no-unused-vars */
import { auth, db } from '$lib/firebase/firebase';
import { addBudget, deleteBudget } from './routes/budgetsAPI';
import {
	addCategory,
	deleteCategory,
	editCategory,
	getAllCategories,
	getDashboardRecords,
	getExpenseRecords,
	getIncomeRecords,
	getTransferRecords,
	getWallets
} from './routes/dashboardsAPI';
import { addRecord, deleteRecord, editRecord, getRecord } from './routes/recordManipulationsAPI';
import { logIn, logOut, signUp } from './routes/usersAPI';

export {
	addBudget,
	addCategory,
	addRecord,
	auth,
	db,
	deleteBudget,
	deleteCategory,
	deleteRecord,
	editCategory,
	editRecord,
	getAllCategories,
	getDashboardRecords,
	getExpenseRecords,
	getIncomeRecords,
	getRecord,
	getTransferRecords,
	getWallets,
	logIn,
	logOut,
	signUp
};
