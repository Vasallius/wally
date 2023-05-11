// @ts-nocheck
/* eslint-disable no-unused-vars */
import { collection, getDocs, doc, updateDoc, onSnapshot, query, where, and, getDoc } from 'firebase/firestore'
import {db,auth} from '../firebase'

const findFunction = async (recordType, userID, currentActiveWallet) => {
  const coll = collection(db, 'records')
  // eslint-disable-next-line no-undef
  const incomeRecordsReference = query(coll,
    where('userID', '==', userID)
  );
  let records = []
  const querySnap = await getDocs(incomeRecordsReference);
  querySnap.forEach((doc) => {
    records.push({ ...doc.data(), id: doc.id });
  });
  let specificRecords = records[0].records.filter((currentRecord) => {
    return currentRecord.recordType == recordType && currentRecord.wallet == currentActiveWallet;
  })
  return specificRecords;
}

export const getMonthlySummary = async (userID, currentActiveWallet) => {
  console.log("Getting monthly Summary")
  try {
    const expense = await findFunction('Expense', userID, currentActiveWallet);
    const income = await findFunction('Income', userID, currentActiveWallet);
    const totalExpense = expense.reduce((total, val) => {
      return total + val.amount;
    }, 0);
    const totalIncome = income.reduce((total, val) => {
      return total + val.amount;
    }, 0);
    return [totalIncome, totalExpense];
  } catch (error) {
    console.log("Error in getting monthly summary.")
    return [0, 0];
  }
};

const getDocsUtility = async (collectionReference) => {
  let wallets = []
  const querySnap = await getDocs(collectionReference);
  querySnap.forEach((doc) => {
    wallets.push({ ...doc.data(), id: doc.id });
  });
  return wallets;
}

export const getCategories = async (userID) => {
  const docRef = doc(db, 'categories', userID)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    const data = docSnap.data().categories;
    return data
  } else {
    console.log("ERROR")
    return "No Categories"
  }
}

export const getName = async (userID) => {
  const docRef = doc(db, 'users', userID);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data().name;
    console.log(data)
    return data
  } else {
    return "No User."
  }
}


export const getWallets = async (userID) => {
  const docRef = doc(db, 'wallets', userID);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data().wallets;
    return data
  } else {
    return "NO WALLETS"
  }
};

export const addWallet = async (userID, wallet) => {
  const docRef = doc(db, 'wallets', userID);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data().wallets;
    const oldwallets = [...data];
    const newwallets = oldwallets.concat(wallet);
    await updateDoc(docRef, {
      wallets: newwallets
    });
  } else {
    console.log("No such document!");
  }
}

export const getDashboardRecords = async (userID, currentActiveWallet) => {
  const docRef = doc(db, 'records', userID)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
      const data = docSnap.data().records;
      return data
    } else {
      return "NO WALLETS"
    }

  // need to implement showing records based on wallet
}

export const getIncomeRecords = async (userID, currentActiveWallet) => {
  return await findFunction('Income', userID, currentActiveWallet);
};

export const getExpenseRecords = async (userID, currentActiveWallet) => {
  return await findFunction('Expense', userID, currentActiveWallet);
};

export const getTransferRecords = async (userID, currentActiveWallet) => {
  return await findFunction('Transfer', userID, currentActiveWallet);
};