// @ts-nocheck
/* eslint-disable no-unused-vars */
import { collection, getDocs, doc, updateDoc, onSnapshot, query, where, and, getDoc } from 'firebase/firestore'
import {db,auth} from '../firebase'
import { authStore, walletStores } from '../../stores/stores';

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

export const getActiveWallet = async (userID) => {
  const docRef = doc(db, 'wallets', userID);
  const docSnap = await getDoc(docRef);
  const document = docSnap.data().wallets.filter((currentWallet) => {
    return currentWallet.active == "True";
  })
  return document[0].name;
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

const dateUtility = (record) => {
  return Number(new Date(record.date.second*1000 + record.date.nanoseconds));
}

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

export const getIncomeRecords = async (userID, currentActiveWallet) => {
  const incomeRecords = await getRecords('income', userID, currentActiveWallet).then(val => val);
  return incomeRecords.sort((firstRecord, secondRecord) => {
    return dateUtility(secondRecord)-dateUtility(firstRecord);
  });
};

export const getExpenseRecords = async (userID, currentActiveWallet) => {
  const incomeRecords = await getRecords('expense', userID, currentActiveWallet).then(val => val);
  return incomeRecords.sort((firstRecord, secondRecord) => {
    return dateUtility(secondRecord)-dateUtility(firstRecord);
  });
};

export const getTransferRecords = async (userID, currentActiveWallet) => {
  const incomeRecords = await getRecords('transfer', userID, currentActiveWallet).then(val => val);
  return incomeRecords.sort((firstRecord, secondRecord) => {
    return dateUtility(secondRecord)-dateUtility(firstRecord);
  });
};

/**
 * edit
 */
export const alertNotification = () => {

}

export const recordErrorCheck = (record, walletStores) => {
  console.log(record);
  if(record.amount <= 0) {
    return [false,"Non-positive value"];
  } else if (record.recordType === 'expense') {
    const activeWallet = walletStores.filter((wallet) => {
      return wallet.active == 'True';
    })[0];
    console.log(activeWallet);
    if (activeWallet.balance < record.amount) {
      return [false, "Negative balance"];
    } else {
      return [true, "Valid"];
    }
  } else {
    return [true, "Valid"];
  }
}