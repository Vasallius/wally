// @ts-nocheck
/* eslint-disable no-unused-vars */
import { collection, getDocs, doc, updateDoc, onSnapshot, query, where, and, getDoc } from 'firebase/firestore'
import {db,auth} from '../firebase'
import { authStore, walletStores } from '../../stores/stores';

/**
 * A function that gets all the records for a specific
 * wallet of a user.
 * @param {string} recordType 
 * @param {string} userID 
 * @param {string} currentActiveWallet 
 * @returns A filtered list that contains all records
 * of a specific record and wallet.
 */
const getRecords = async (recordType, userID, currentActiveWallet) => {
  const docRef = doc(db, 'records', userID);
  const docSnap = await getDoc(docRef);
  return docSnap.data().records.filter((currentRecord) => {
    return currentRecord.recordType == recordType && currentRecord.wallet == currentActiveWallet;
  })
}

export const sumRecords = function(array, recordType, walletname) {
  return array.reduce((total, current) => {
    if (current.recordType === recordType && current.wallet === walletname) {
      return total + current.amount;
    } else {
      return total;
    }
  }, 0);
}

export const  sumTransferFrom = function(array, walletname) {
  let transfer = array.filter(
    (wallet) => wallet.recordType == 'transfer' && wallet.wallet == walletname
  );
  let sum = transfer.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0);
  return sum;
}

export const  sumTransferTo = function(array, walletname) {
  let transfer = array.filter(
    (wallet) => wallet.recordType == 'transfer' && wallet.wallet2 == walletname
  );
  let sum = transfer.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0);
  return sum;
}

// USELESS 
// export const getMonthlySummary = async (userID, currentActiveWallet) => {
//   try {
//     const expense = await getRecords('expense', userID, currentActiveWallet);
//     const income = await getRecords('income', userID, currentActiveWallet);
//     const totalExpense = expense.reduce((total, val) => {
//       return total + val.amount;
//     }, 0);
//     const totalIncome = income.reduce((total, val) => {
//       return total + val.amount;
//     }, 0);
//     return [totalIncome, totalExpense];
//   } catch (error) {
//     console.log("Error in getting monthly summary.")
//     return [0, 0];
//   }
// };

/**
 * Searches for the current active wallet for a
 * user.
 * @param {string} userID 
 * @returns A string that contains the name of the
 * current active wallet.
 */
export const getActiveWallet = async (userID) => {
  const docRef = doc(db, 'wallets', userID);
  const docSnap = await getDoc(docRef);
  const document = docSnap.data().wallets.filter((currentWallet) => {
    return currentWallet.active == "True";
  })
  return document[0].name;
}

/**
 * Returns a list that contains all categories.
 * @param {string} userID 
 * @returns A list that contains all categories
 * a user have.
 */
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

/**
 * Returns the name of the current authenticated
 * user.
 * @param {string} userID 
 * @returns A string.
 */
export const getName = async (userID) => {
  const docRef = doc(db, 'users', userID);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data().name;
    return data
  } else {
    return "No User."
  }
}

/**
 * A function that returns the list of wallets for the
 * specified user.
 * @param {string} userID 
 * @returns A list that contains the wallets for the
 * specified user.
 */
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

/**
 * Updates the properties of a specific wallet. 
 * @param {string} userID 
 * @param {object} wallet 
 * @returns An updated list of wallets.
 */
export const updateWallets = async (userID, wallet) => {
  const docRef = doc(db, 'wallets', userID);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    await updateDoc(docRef, {
      wallets: wallet
    });
  } else {
    return "NO WALLETS"
  }
};

/**
 * Updates the properties of a specific record. 
 * @param {string} userID 
 * @param {object} records 
 * @returns An updated list of records.
 */
export const updateRecords = async (userID, records) => {
  const docRef = doc(db, 'records', userID);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    await updateDoc(docRef, {
      records: records
    });
  } else {
    return "NO records"
  }
};

/**
 * Updates the properties of a specific category. 
 * @param {string} userID 
 * @param {object} categories 
 * @returns An updated list of categories.
 */
export const updateCategories = async (userID, categories) => {
  const docRef = doc(db, 'categories', userID);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    await updateDoc(docRef, {
      categories: categories
    });
  } else {
    return "NO categories"
  }
};

/**
 * Adds a wallet.
 * @param {string} userID 
 * @param {object} wallet 
 * @returns An updated list containing the newly added
 * wallet.
 */
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
    return newwallets
  } else {
    console.log("No such document!");
  }
}


// Nothing uses this!
export const editWallet = async (userID, walletIndex, newValues) => {
  const docRef = doc(db, 'wallets', userID);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data().wallets;
    const oldwallets = [...data];
    for(const key in newValues){
      oldwallets[walletIndex][key] = newValues[key];
    }
    await updateDoc(docRef, {
      wallets: oldwallets
    });
    return true
  } else {
    console.log("No such document!");
    return false
  }
}

/**
 * Returns the Number equivalent of a date.
 * @param {object} record 
 * @returns The Number equivalent of a date.
 */
const dateUtility = (record) => {
  return Number(new Date(record.date.second*1000 + record.date.nanoseconds));
}

/**
 * Filters the record shown in the dashboard.
 * @param {string} userID 
 * @param {string} currentActiveWallet 
 * @returns A filtered list containing the records shown
 * in the dashboard.
 */
export const getDashboardRecords = async (userID, currentActiveWallet) => {
  const docRef = doc(db, 'records', userID)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
      const records = docSnap.data().records.filter((currentRecord) => {
        return currentRecord.wallet == currentActiveWallet;
      })
      const data = records.sort((firstRecord, secondRecord) => {
        return dateUtility(secondRecord) - dateUtility(firstRecord);
      });
      return data
    } else {
      return "NO WALLETS"
    }

  // need to implement showing records based on wallet
}

/**
 * Returns a list of records under the income record type.
 * @param {string} userID 
 * @param {string} currentActiveWallet 
 * @returns A list of records under the income record type.
 */
export const getIncomeRecords = async (userID, currentActiveWallet) => {
  const incomeRecords = await getRecords('income', userID, currentActiveWallet).then(val => val);
  return incomeRecords.sort((firstRecord, secondRecord) => {
    return dateUtility(secondRecord)-dateUtility(firstRecord);
  });
};

/**
 * Returns a list of records under the expense record type.
 * @param {string} userID 
 * @param {string} currentActiveWallet 
 * @returns A list of records under the expense record type.
 */
export const getExpenseRecords = async (userID, currentActiveWallet) => {
  const incomeRecords = await getRecords('expense', userID, currentActiveWallet).then(val => val);
  return incomeRecords.sort((firstRecord, secondRecord) => {
    return dateUtility(secondRecord)-dateUtility(firstRecord);
  });
};

/**
 * Returns a list of records under the transfer record type.
 * @param {string} userID 
 * @param {string} currentActiveWallet 
 * @returns A list of records under the transfer record type.
 */
export const getTransferRecords = async (userID, currentActiveWallet) => {
  const incomeRecords = await getRecords('transfer', userID, currentActiveWallet).then(val => val);
  return incomeRecords.sort((firstRecord, secondRecord) => {
    return dateUtility(secondRecord)-dateUtility(firstRecord);
  });
};

/**
 * Checks if the record being added has valid inputs.
 * @param {object} record 
 * @param {object} walletStores 
 * @returns A list that contains a boolean that tells if the
 * inputs are valid and a message about the result.
 */
export const recordErrorCheck = (record, walletStores) => {
  if(record.amount <= 0) {
    return [false,"Income must be positive."];
  } else if (record.recordType === 'expense') {
    const activeWallet = walletStores.filter((wallet) => {
      return wallet.active == 'True';
    })[0];
    console.log(activeWallet);
    if (activeWallet.balance < record.amount) {
      return [false, "Your expense is over your current balance."];
    } else {
      return [true, "Valid"];
    }
  } else {
    return [true, "Valid"];
  }
}