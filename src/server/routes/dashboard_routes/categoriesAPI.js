// @ts-nocheck
/* eslint-disable no-unused-vars */
import { auth, db } from '$lib/firebase/firebase';
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';

/**
 * Returns a list of categories.
 * @param {object} collectionReference
 * @returns A list of categories for the specified
 * collection reference.
 */
const getDocsUtility = async (collectionReference) => {
	let categories = [];
	const querySnap = await getDocs(collectionReference);
	querySnap.forEach((doc) => {
		categories.push({ ...doc.data(), id: doc.id });
	});
	return categories;
};

/**
 * A function that gets all categories.
 * @returns A list of categories for the current user.
 */
export const getAllCategories = async () => {
	try {
		const collectionReference = collection(db, 'categories');
		const snapQuery = query(collectionReference, where('userID', '==', auth.currentUser.uid));
		const categories = await getDocsUtility(snapQuery);
		return categories;
	} catch (error) {
		return [];
	}
};

/**
 * Adds a category.
 * @param {string} userID
 * @param {object} category
 * @returns A list of the updated categories' list.
 */
export const addCategory = async (userID, category) => {
	const docRef = doc(db, 'categories', userID);
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		const data = docSnap.data().categories;
		let newCategory = category;

		const oldcategories = [...data];
		const newcategories = oldcategories.concat(newCategory);
		await updateDoc(docRef, {
			categories: newcategories
		});
		return newcategories;
	} else {
		console.log('No such document!');
	}

	try {
		const collectionReference = collection(db, 'categories');
		const recordsReference = query(collectionReference, where('userID', '==', userID));
		const categories = await getDocsUtility(recordsReference).then((val) => {
			return val;
		});
		categories[0].categories.push(category.name);
		const documentReference = doc(db, 'categories', categories[0].id);
		updateDoc(documentReference, { categories: categories[0].categories });
		return true;
	} catch (error) {
		return false;
	}
};

/**
 * Updates the label for a category.
 * @param {string} userID
 * @param {Number} categoryIndex
 * @param {string} updatedName
 * @returns A boolean that tells whether the operation
 * was successful or not.
 */
export const editCategory = async (userID, categoryIndex, updatedName) => {
	try {
		const collectionReference = collection(db, 'categories');
		const recordsReference = query(collectionReference, where('userID', '==', userID));
		const categories = await getDocsUtility(recordsReference).then((val) => {
			return val;
		});
		if (categories[0].categories.length > categoryIndex) {
			categories[0].categories[categoryIndex] = updatedName;
			const documentReference = doc(db, 'categories', categories[0].id);
			updateDoc(documentReference, { categories: categories[0].categories });
			return true;
		} else {
			return false;
		}
	} catch (error) {
		return false;
	}
};

/**
 * Deletes a category.
 * @param {string} userID
 * @param {Number} categoryIndex
 * @returns A boolean value that tells if the
 * operation was successful or not.
 */
export const deleteCategory = async (userID, categoryIndex) => {
	try {
		const collectionReference = collection(db, 'categories');
		const recordsReference = query(collectionReference, where('userID', '==', userID));
		const categories = await getDocsUtility(recordsReference).then((val) => {
			return val;
		});
		if (categories[0].categories.length > categoryIndex) {
			categories[0].categories = categories[0].categories.filter((val, ind) => {
				return ind != categoryIndex;
			});
			const documentReference = doc(db, 'categories', categories[0].id);
			updateDoc(documentReference, { categories: categories[0].categories });
			return true;
		} else {
			return false;
		}
	} catch (error) {
		return false;
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
 * Checks if the category being added has valid inputs.
 * @param {string} categories
 * @param {object} categoriesStore
 * @returns A list that contains a boolean that tells if the
 * inputs are valid and a message about the result.
 */
export const categoriesErrorCheck = (categories, categoriesStore) => {
	const check = categoriesStore.filter((categ) => {
		return categ == categories;
	});
	if (check.length > 0) {
		return [false, 'Category already exists.'];
	} else if (specialCharactersCheck(categories)) {
		return [false, 'Special character not allowed.'];
	} else if (categories === '') {
		return [false, 'Category name must contain at least one character.'];
	} else if (spaceOnlyCheck(categories)) {
		return [false, 'Category name must not contain space-only characters.'];
	} else {
		return [true, 'Valid'];
	}
};
