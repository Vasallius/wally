import type { Timestamp } from 'firebase/firestore';
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

interface budgetRecord {
	budget: number;
	spent: number;
	title: string;
}
interface Budget {
	DayRecords: budgetRecord[];
	WeekRecords: budgetRecord[];
	MonthRecords: budgetRecord[];
}

import type { UserCredential } from 'firebase/auth';
import { writable } from 'svelte/store';
export const authStore = writable<UserCredential | null>(null);
export const recordsStore = writable<Record[] | null>(null);
export const categoriesStore = writable<string[] | null>(null);
export const walletStores = writable<Wallet[] | null>(null);
export const activeWalletStore = writable<Wallet | null | undefined>(null);
export const budgetStores = writable<Budget | null>(null);
export const monthlySummaryStores = writable<number[] | null>(null);
export const notificationsStore = writable<Notif[] | null>(null);
