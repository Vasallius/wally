// @ts-nocheck
/* eslint-disable no-unused-vars */
import 'firebase/compat/firestore';
import { getBudgets } from './budgetsAPI';

/**
 * Creates a list of notifications.
 * @param {string} userID 
 * @returns A list of notifications.
 */
export const notificationsList = async (userID) => {
  const budgetsList = await getBudgets(userID);
  console.log(budgetsList);
  const keys = ["DayRecords", "WeekRecords", "MonthRecords"];
  const interval = ["DAILY", "WEEKLY", "MONTHLY"];
  const res = [];
  for(let j=0; j<3; j++){
    for(let i=0; i<budgetsList[keys[j]].length; i++){
      console.log(budgetsList[keys[j]][i]);
      if ( budgetsList[keys[j]][i].spent >= budgetsList[keys[j]][i].budget*0.9 &&
            budgetsList[keys[j]][i].spent <= budgetsList[keys[j]][i].budget ) {
        res.push({
          title: `${interval[j]} BUDGET LIMIT`,
          content: "Your money spent is nearing the budget limit.",
        });
      } else if (budgetsList[keys[j]][i].spent > budgetsList[keys[j]][i].budget) {
        res.push({
          title: `${interval[j]} BUDGET EXCEEDED`,
          content: `You have spent $${budgetsList[keys[j]][i].spent} which is over your budget $${budgetsList[keys[j]][i].budget}`,
        });
      }
    }
  }
  
  return res;
}