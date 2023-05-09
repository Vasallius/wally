// @ts-nocheck
/* eslint-disable no-unused-vars */
import { db, auth} from './routes/firebase'
import { collection, getDocs } from 'firebase/firestore'
import { addBudget, getAllBudgets, deleteBudget } from './routes/budgetsAPI';
import { signUp, logIn, logOut } from './routes/usersAPI';
import { 
  getAllCategories, 
  addCategory, 
  editCategory, 
  deleteCategory,
  getMonthlySummary,
  getWallets,
  getDashboardRecords,
  getIncomeRecords,
  getExpenseRecords,
  getTransferRecords,
} from './routes/dashboardsAPI';
import {
  addRecord,
  getRecord,
  deleteRecord,
  editRecord,
} from './routes/recordManipulationsAPI';

export {
  addBudget,
  getAllBudgets,
  deleteBudget,
  signUp,
  logIn,
  logOut,
  getAllCategories, 
  addCategory, 
  editCategory, 
  deleteCategory,
  getMonthlySummary,
  getWallets,
  getDashboardRecords,
  getIncomeRecords,
  getExpenseRecords,
  getTransferRecords,
  addRecord,
  getRecord,
  deleteRecord,
  editRecord,
  db,
  auth
}