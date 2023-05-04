// @ts-nocheck
// stores.js
import { writable } from 'svelte/store';
import { auth } from '../routes/firebase';
export const authStore = writable(null);

auth.onAuthStateChanged(user => {
    console.log("stores setting user")
    authStore.set(user);
});