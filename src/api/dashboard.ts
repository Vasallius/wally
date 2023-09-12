import { db } from '$lib/firebase/firebase';
import { Timestamp, doc, getDoc } from 'firebase/firestore';

/**
 * A function that returns the list of wallets for the
 * specified user.
 * @param  userID
 * @returns A list that contains the wallets for the
 * specified user.
 */
export const getWallets = async (userID: string) => {
	const docRef = doc(db, 'wallets', userID);
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		const data = docSnap.data().wallets;
		return data;
	} else {
		return 'NO WALLETS';
	}
};

interface Record {
	amount: number;
	category: string;
	date: Timestamp;
	name: string;
	recordType: string;
	wallet: string;
	wallet2: string;
}

// /**
//  * a function that gets all the records for a specific
//  * wallet of a user.
//  * @param {string} recordtype
//  * @param {string} userid
//  * @param {string} currentactivewallet
//  * @returns a filtered list that contains all records
//  * of a specific record and wallet.
//  */
const getRecords = async (recordType: string, userID: string, currentActiveWallet: string) => {
	const docRef = doc(db, 'records', userID);
	const docSnap = await getDoc(docRef);
	const data = docSnap.data();
	if (data) {
		return data.records.filter((currentRecord: Record) => {
			return currentRecord.recordType == recordType && currentRecord.wallet == currentActiveWallet;
		});
	} else {
		return 'NO RECORDS';
	}
};

/**
 * This function sums the amounts of the records that match the provided record type and wallet name.
 *
 * @param {Record[]} array - The array of records to be processed.
 * @param {string} recordType - The type of record to be included in the sum.
 * @param {string} walletName - The wallet name of the records to be included in the sum.
 * @returns {number} The total sum of the amounts of the matching records.
 */
export const sumRecords = function (array: Record[], recordType: string, walletName: string) {
	return array.reduce((total: number, current: Record) => {
		if (current.recordType === recordType && current.wallet === walletName) {
			return total + current.amount;
		} else {
			return total;
		}
	}, 0);
};

/**
 * Calculates the sum of the amounts transferred from the specified wallet.
 * @function
 * @param {Record[]} array - Array of record objects.
 * @param {string} walletName - Name of the wallet.
 * @returns {number} Sum of the amount of the matching records.
 */ export const sumTransferFrom = function (array: Record[], walletName: string) {
	let transfer = array.filter(
		(wallet) => wallet.recordType == 'transfer' && wallet.wallet == walletName
	);
	let sum = transfer.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0);
	return sum;
};

/**
 * Calculates the sum of the amounts transferred to the specified wallet.
 * @function
 * @param {Record[]} array - Array of record objects.
 * @param {string} walletName - Name of the wallet.
 * @returns {number} Sum of the amount of the matching records.
 */
export const sumTransferTo = function (array: Record[], walletName: string) {
	let transfer = array.filter(
		(wallet) => wallet.recordType == 'transfer' && wallet.wallet2 == walletName
	);
	let sum = transfer.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0);
	return sum;
};
