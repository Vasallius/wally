// @ts-nocheck
/* eslint-disable no-unused-vars */
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, doc, updateDoc, onSnapshot, query, where, and, getDoc } from 'firebase/firestore'
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
    console.log(data)
    return data
  } else {
    console.log("ERROR")
    return "No Categories"
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
  const coll = collection(db, 'records')
  // eslint-disable-next-line no-undef
  const incomeRecordsReference = query(coll,
    where('userID', '==', userID)
  );
  let records = []
  const querySnap = await getDocs(incomeRecordsReference)
    .then((val) => {
      val.forEach((doc) => {
        records.push({ ...doc.data(), id: doc.id });
      })
    });
  // console.log(records[0].records, "smth");
  records[0].records = records[0].records.filter((currentDoc) => {
    return currentDoc.wallet == currentActiveWallet;
  });
  records[0].records = records[0].records.sort(
    (firstDate, secondDate) => Number(new Date(secondDate.date)) - Number(new Date(firstDate.date))
  );
  console.log(records[0].records, "yah");
  return records[0].records;
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