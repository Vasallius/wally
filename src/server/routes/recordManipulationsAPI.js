// @ts-nocheck
/* eslint-disable no-unused-vars */
import { db } from '$lib/firebase/firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';

/**
 * A function that adds a record.
 * @param {string} userID
 * @param {object} record
 * @returns A list of the updated records;
 */
export const addRecord = async (userID, record) => {
	const docRef = doc(db, 'records', userID);
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		const data = docSnap.data().records;
		let newRecord = record;
		newRecord['date'] = firebase.firestore.Timestamp.now();
		const oldrecords = [...data];
		const newrecords = oldrecords.concat(newRecord);
		await updateDoc(docRef, {
			records: newrecords
		}).then((val) => val);
		return newrecords;
	} else {
		console.log('No such document!');
	}
};

/**
 * A function that gets all the records for
 * a specific user.
 * @param {string} userID
 * @returns The list of all records.
 */
export const getAllRecords = async (userID) => {
	const docRef = doc(db, 'records', userID);
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		const data = docSnap.data().records;
		return data;
	} else {
		console.log('No such document!');
	}
};

/**
 * A function that gets a record using a
 * specified index.
 * @param {string} userID
 * @param {Number} index
 * @returns The record with the specified index.
 */
export const getRecord = async (userID, index) => {
	const collectionReference = collection(db, 'records');
	const recordsReference = query(collectionReference, where('userID', '==', userID));
	let record = [];
	const querySnap = await getDocs(recordsReference).then((val) => {
		val.forEach((doc) => {
			record.push({ ...doc.data(), id: doc.id });
		});
	});
	if (index >= record[0].records.length) {
		return null;
	} else {
		return record[0].records[index];
	}
};

/**
 * A function that deletes a record using a
 * specified index.
 * @param {string} userID
 * @param {Number} index
 * @returns A boolean value that tells whether
 * the operation was successful.
 */
export const deleteRecord = async (userID, index) => {
	const collectionReference = collection(db, 'records');
	const recordsReference = query(collectionReference, where('userID', '==', userID));
	let record = [];
	const querySnap = await getDocs(recordsReference).then((val) => {
		val.forEach((doc) => {
			record.push({ ...doc.data(), id: doc.id });
		});
	});
	if (index < record[0].records.length) {
		record[0].records = record[0].records.filter((val, ind) => {
			return ind != index;
		});
		const documentReference = doc(db, 'records', record[0].id);

		updateDoc(documentReference, { records: record[0].records });
		return true;
	} else {
		return false;
	}
};

/**
 * Edits a record based on the update values parameter.
 * @param {string} userID
 * @param {Number} index
 * @param {object} updateValues
 * @returns A boolean value if the update was successful
 * or not.
 */
export const editRecord = async (userID, index, updateValues) => {
	const collectionReference = collection(db, 'records');
	const recordsReference = query(collectionReference, where('userID', '==', userID));
	let record = [];
	const querySnap = await getDocs(recordsReference).then((val) => {
		val.forEach((doc) => {
			record.push({ ...doc.data(), id: doc.id });
		});
	});
	if (index < record[0].records.length) {
		for (const [key, values] of Object.entries(record[0].records[index])) {
			for (const [key2, values2] of Object.entries(updateValues)) {
				if (key == key2) {
					record[0].records[index][key] = values2;
					break;
				}
			}
		}

		const documentReference = doc(db, 'records', record[0].id);

		updateDoc(documentReference, { records: record[0].records });
		return true;
	} else {
		return false;
	}
};
