/* eslint-disable no-undef */
// @ts-nocheck
/* eslint-disable no-unused-vars */
import { db } from '$lib/firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { editWallet } from './dashboard_routes/dashboardCardsAPI';

/**
 * A function that searches a wallet from a given user
 * using the specified wallet name.
 * @param {string} walletName
 * @returns A list containing a wallet object and its
 * corresponding index.
 */
const getWalletUtility = async (walletName) => {
	const docRef = doc(db, 'wallets', $authStore.user.uid);
	const docSnap = await getDoc(docRef);
	for (let i = 0; i < docSnap.data().wallets.length; i++) {
		if (docSnap.data().wallets[i].name === walletName) {
			return [docSnap.data().wallets[i], i];
		}
	}
	return [{}, -1];
};

/**
 * A function that transfers money from one wallet to
 * another, also considers the possibility of errors
 * and negative values.
 * @param {string} firstWalletName
 * @param {string} secondWalletName
 * @param {Number} amount
 * @returns A boolean value if transfer is successful.
 */
export const transferMoney = async (firstWalletName, secondWalletName, amount) => {
	let userUID = $authStore.user.uid;
	let firstWallet = await getWalletUtility(firstWalletName);
	let secondWallet = await getWalletUtility(secondWalletName);
	if (amount > firstWallet[0].balance || firstWallet[1] == -1 || secondWallet[1] == -1) {
		return false;
	} else {
		firstWallet[0].balance -= amount;
		secondWallet[0].balance += amount;
		const firstCheck = await editWallet(userUID, firstWallet[1], {
			balance: firstWallet[0].balance
		});
		if (!firstCheck) {
			return false;
		}
		const secondCheck = await editWallet(userUID, secondWallet[1], {
			balance: secondWallet[0].balance
		});
		if (!secondCheck) {
			return false;
		}
		return true;
	}
};

/**
 * Utitlity function that checks for special characters.
 * @param {string} string
 * @returns A boolean value that tells whether the string
 * contains a special character or not.
 */
const specialCharactersCheck = (string) => {
	const special_characters = '~`!@#$%^*()+={}[]|\\/:;"<>,.?';
	for (let i = 0; i < string.length; i++) {
		for (let j = 0; j < special_characters.length; j++) {
			if (special_characters[j] == string[i]) {
				return true;
			}
		}
	}
	return false;
};

/**
 * Checks if a string only contains space characters.
 * @param {string} string
 * @returns A boolean value that tells whether the string
 * is a space-only string.
 */
const spaceOnlyCheck = (string) => {
	for (let i = 0; i < string.length; i++) {
		if (string[i] != ' ') {
			return false;
		}
	}
	return true;
};

/**
 * A function that checks the inputs passed when
 * adding a new wallet.
 * @param {object} wallet
 * @returns A list that contains a boolean value that
 * tells if the inputs are valid and a text containing
 * the message.
 */
export const walletErrorCheck = (wallet, walletStores) => {
	const check = walletStores.filter((wall) => {
		return wall.name == wallet.name;
	});
	if (check.length > 0) {
		return [false, 'Wallet already exists.'];
	} else if (specialCharactersCheck(wallet.name)) {
		return [false, 'Special character not allowed.'];
	} else if (wallet.name === '') {
		return [false, 'Wallet name must contain at least one character.'];
	} else if (spaceOnlyCheck(wallet.name)) {
		return [false, 'Wallet name must not contain space-only characters.'];
	} else if (wallet.initial < 0) {
		return [false, 'Initial amount must be non-negative.'];
	} else {
		return [true, 'Valid'];
	}
};
