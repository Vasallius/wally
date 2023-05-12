// @ts-nocheck
/* eslint-disable no-unused-vars */
import { collection, getDoc, getDocs, addDoc, deleteDoc, updateDoc, doc, query, where } from 'firebase/firestore'
import { db, auth} from './firebase'
import { budgetStores } from '../stores/stores';
import { getExpenseRecords } from './dashboardsAPI';
import { getActiveWallet } from './dashboard_routes/dashboardCardsAPI';



const getDocsUtility = async (collectionReference) => {
  let wallets = []
  const querySnap = await getDocs(collectionReference);
  querySnap.forEach((doc) => {
    wallets.push({...doc.data(), id: doc.id});
  });
  return wallets;
}

export const addBudget = async(userID, label,budget, interval) => {
  const docRef = doc(db, 'budgets', userID);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const activeWallet = await getActiveWallet(userID);
    const expenseRecords = await getExpenseRecords(userID, activeWallet);
    let newRecords = expenseRecords.filter((val) => {
      return val.category == label;
    })
    let spentValue = 0;
    if (interval == "Daily") {
      const today = new Date();
      newRecords = newRecords.filter((val) => {
        const currentDate = new Date(val.date.seconds*1000 + val.date.nanoseconds);
        return currentDate.getDate() == today.getDate() &&
                currentDate.getMonth() == today.getMonth() &&
                currentDate.getFullYear() == today.getFullYear();
      });
      for(let i=0; i<newRecords.length; i++){
        spentValue+= newRecords[i].amount;
      }
    } else if(interval == "Weekly") {
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
      for(let i=0; i<newRecords.length; i++){
        for(let j=0; j<7; j++){
          const currentDate = new Date(newRecords[i].date.seconds*1000 + newRecords[i].date.nanoseconds);
          if(currentDate.getDate() == today.getDate() &&
          currentDate.getMonth() == today.getMonth() &&
          currentDate.getFullYear() == today.getFullYear()){
            spentValue += newRecords[i].amount;
            break;
          }
        }
      }
    } else {
      const today = new Date();
      newRecords = newRecords.filter((val) => {
        const currentDate = new Date(val.date.seconds*1000 + val.date.nanoseconds);
        return currentDate.getMonth() == today.getMonth() && currentDate.getFullYear() == today.getFullYear();
      });
      for(let i=0; i<newRecords.length; i++){
        spentValue+= newRecords[i].amount;
      }
    }
    const data = docSnap.data().budgets;
    let newbudget = {
      title: label,
      spent: spentValue,
      budget: budget
    }
    console.log("CHECKING FOR INTERVALS")
    if (interval == "Daily"){
      let dayRecords = data.DayRecords
      dayRecords.push(newbudget)
      let updatedData = { ...data, DayRecords: dayRecords };
      console.log(updatedData)
      await updateDoc(docRef, {
        budgets: updatedData
      })

      return updatedData

    } else if (interval == "Weekly"){
      let WeekRecords = data.WeekRecords
      WeekRecords.push(newbudget)
      let updatedData = { ...data, WeekRecords: WeekRecords };

      await updateDoc(docRef, {
        budgets: updatedData
      })

      return updatedData


    } else if (interval == "Monthly") {
      let MonthRecords = data.MonthRecords
      MonthRecords.push(newbudget)
      let updatedData = { ...data, MonthRecords: MonthRecords };

      await updateDoc(docRef, {
        budgets: updatedData
      })
      return updatedData

    }

    
  } else {
    return "no document"
    // console.log("No such document!");
  }
}


export const getBudgets = async (userID) => {
  const docRef = doc(db, 'budgets', userID);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data().budgets;
    console.log(data)
    return data
  } else {
    return "NO WALLETS"
  }
}


export const getAllBudgets = async () => {
  const collectionReference = collection(db, 'budgets');
  const snapQuery = query(collectionReference, where('userID', '==', auth.currentUser.uid));
  return await getDocsUtility(snapQuery);
};

// export const addBudget = async (userID, budget) => {
//   try {
//     const collectionReference = collection(db, 'budgets');
//     const recordsReference = query(collectionReference,
//       where('userID', '==', userID)
//     );
//     const budgets = await getDocsUtility(recordsReference)
//     .then((val) => {
//       return val;
//     });
//     budgets[0].budgets.push(budget);
//     const documentReference = doc(db, 'budgets', budgets[0].id);
//     updateDoc(documentReference, {budgets: budgets[0].budgets});
//     return true;
//   } catch (error) {
//     return false;
//   }
// }

export const deleteBudget = async (userID, index) => {
  try {
    const collectionReference = collection(db, 'budgets');
    const recordsReference = query(collectionReference,
      where('userID', '==', userID)
    );
    const budgets = await getDocsUtility(recordsReference)
    .then((val) => {
      return val;
    });
    if(budgets[0].budgets.length > index){
      budgets[0].budgets.filter((val, ind) => {
        return ind != index;
      })
      const documentReference = doc(db, 'budgets', budgets[0].id);
      updateDoc(documentReference, {budgets: budgets[0].budgets});
      return true;
    }else{
      return false;
    }
  } catch (error) {
    return false;
  }
};