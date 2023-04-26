// @ts-nocheck
/* eslint-disable no-unused-vars */
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs } from 'firebase/firestore'
import { addBudget, getAllBudgets, deleteBudget } from './routes/budgetsAPI';
import { signUp, logIn, logOut } from './routes/usersAPI';
import { 
  getAllCategories, 
  addCategory, 
  editCategory, 
  deleteCategory, 
  addSubcategory, 
  deleteSubcategory,
  getMonthlySummary,
  getWallets,
  getIncomeRecords,
  getExpenseRecords,
  getTransferRecords,
} from './routes/dashboardsAPI';
import {
  addRecord,
  getAllRecords,
  getRecord,
  deleteRecord,
  editRecord,
} from './routes/recordManipulationsAPI';

const firebaseConfig = {
  apiKey: "AIzaSyATQg28EQd-b_C_98EgVFbIwjI-vr9IbFs",
  authDomain: "wally-55432.firebaseapp.com",
  projectId: "wally-55432",
  storageBucket: "wally-55432.appspot.com",
  messagingSenderId: "116738427703",
  appId: "1:116738427703:web:6f072f98620c5ce4d668b2"
};

initializeApp(firebaseConfig)

const db = getFirestore()

const colRef = collection(db, 'budgets')

export const testFunc = () => {
  getDocs(colRef)
  .then((snapshot) => {
    let books = []
    snapshot.docs.forEach(doc => {
      books.push({ ...doc.data(), id: doc.id })
    })
    console.log(books)
  })
};

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
  addSubcategory, 
  deleteSubcategory,
  getMonthlySummary,
  getWallets,
  getIncomeRecords,
  getExpenseRecords,
  getTransferRecords,
  addRecord,
  getAllRecords,
  getRecord,
  deleteRecord,
  editRecord,
}