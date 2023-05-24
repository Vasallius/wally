/* eslint-disable no-undef */
// @ts-nocheck
/* eslint-disable no-unused-vars */
import { authStore } from '../stores/stores'
import { db, auth } from './firebase'
import { doc, getDoc } from 'firebase/firestore'
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
  for(let i=0; i<docSnap.data().wallets.length; i++){
    if (docSnap.data().wallets[i].name === walletName) {
      return [docSnap.data().wallets[i], i];
    }
  }
  return [{}, -1];
}

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
    const firstCheck = await editWallet(userUID, firstWallet[1], {balance: firstWallet[0].balance});
    if (!firstCheck) {
      return false;
    }
    const secondCheck = await editWallet(userUID, secondWallet[1], {balance: secondWallet[0].balance});
    if (!secondCheck) {
      return false;
    }
    return true;
  }
}

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
    return [false, "Wallet already exists."];
  } else if (wallet.name.match(/\W/)) {
    return [false, "No special characters allowed."];
  } else if (wallet.name === '') {
    return [false, "Wallet name must contain at least one character."];
  } else if (wallet.initial < 0) {
    return [false, "Initial amount must be non-negative."];
  } else {
    return [true, "Valid"];
  }
}