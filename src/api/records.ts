import { db } from '$lib/firebase/firebase';
import { Timestamp, doc, getDoc } from 'firebase/firestore';

interface Record {
	amount: number;
	category: string;
	date: Timestamp;
	name: string;
	recordType: string;
	wallet: string;
	wallet2: string;
}
export const getAllRecords = async (userID: string) => {
	const docRef = doc(db, 'records', userID);
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		const data: Record[] = docSnap.data().records;
		return data;
	} else {
		console.log('No such document!');
		return [];
	}
};
