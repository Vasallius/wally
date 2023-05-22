/* eslint-disable no-undef */
// @ts-nocheck
/* eslint-disable no-unused-vars */
import { authStore } from '../stores/stores'
import { db, auth } from './firebase'
import { doc, getDoc } from 'firebase/firestore'
import { editWallet } from './dashboard_routes/dashboardCardsAPI';

/**
 * Return props of specific wallet.
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

export const walletErrorCheck = (wallet) => {
  // console.log(wallet.initial);
  if (wallet.name === '' || wallet.initial <= 0) {
    return [false, "Invalid inputs"];
  } else {
    return [true, "Valid"];
  }
}