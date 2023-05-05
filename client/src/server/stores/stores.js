// @ts-nocheck
// stores.js
import { writable } from 'svelte/store';
import { auth } from '../routes/firebase';
export const authStore = writable(null);
export const isLoading = writable(true);
export const isLoggingOut = writable(false);

