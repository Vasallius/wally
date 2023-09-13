import { getBudgets } from '$api/budgets';
/**
 * Creates a list of notifications.
 * @param {string} userID
 * @returns A list of notifications.
 */
export const notificationsList = async (userID: string) => {
	const budgetsList = await getBudgets(userID);
	const keys = ['DayRecords', 'WeekRecords', 'MonthRecords'];
	const interval = ['Daily', 'Weekly', 'Monthly'];
	const res = [];
	for (let j = 0; j < 3; j++) {
		for (let i = 0; i < budgetsList[keys[j]].length; i++) {
			if (budgetsList[keys[j]][i].budget != 0) {
				if (
					budgetsList[keys[j]][i].spent >= budgetsList[keys[j]][i].budget * 0.75 &&
					budgetsList[keys[j]][i].spent < budgetsList[keys[j]][i].budget
				) {
					res.push({
						title: `[${budgetsList[keys[j]][i].title}] ${interval[j]} Budget Limit`,
						content: 'Your money spent is nearing the budget limit.'
					});
				} else if (budgetsList[keys[j]][i].spent == budgetsList[keys[j]][i].budget) {
					res.push({
						title: `[${budgetsList[keys[j]][i].title}] ${interval[j]} Budget Reached  `,
						content: `You have already spent your total budget.`
					});
				} else {
					res.push({
						title: `[${budgetsList[keys[j]][i].title}] ${interval[j]} Budget Exceeded  `,
						content: `You have spent ₱${budgetsList[keys[j]][i].spent} which is over your budget ₱${
							budgetsList[keys[j]][i].budget
						}`
					});
				}
			}
		}
	}
	return res;
};
