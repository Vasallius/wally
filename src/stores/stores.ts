// @ts-nocheck
// stores.js

interface Wallet {
	active: string;
	balance: number;
	dailyBudget: number;
	initial: number;
	name: string;
	weeklyBudget: number;
}

interface Record {
	amount: number;
	category: string;
	date: Timestamp;
	name: string;
	recordType: string;
	wallet: string;
	wallet2: string;
}

interface Notif {
	title: string;
	content: string;
}
import type { UserCredential } from 'firebase/auth';
import { writable } from 'svelte/store';
export const authStore = writable<UserCredential | null>(null);
export const recordsStore = writable<Record[] | null>(null);
export const categoriesStore = writable(null);
export const walletStores = writable<Walletp[] | null>(null);
export const activeWalletStore = writable<Wallet | null | undefined>(null);
export const budgetStores = writable(null);
export const monthlySummaryStores = writable<number[] | null>(null);
export const notificationsStore = writable<Notif[] | null>(null);
