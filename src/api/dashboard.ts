import { db } from '$lib/firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
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
