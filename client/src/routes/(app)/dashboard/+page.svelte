<script>
	// @ts-nocheck

	import DashboardSummary from './../../../components/DashboardSummary.svelte';
	import { logOut } from '../../../server/routes/usersAPI';
	import { db, auth } from '../../../server/routes/firebase';
	import RecordCard from '../../../components/RecordCard.svelte';
	import {
		getDashboardRecords,
		getMonthlySummary,
		getWallets,
		addRecord,
		getRecord,
		deleteRecord,
		editRecord,
		deleteCategory,
		editCategory
	} from '../../../server';
	import Wallet from '../../../components/Wallet.svelte';
	import RecordBar from '../../../components/RecordBar.svelte';
	import { authStore } from '../../../server/stores/stores';
	import { goto } from '$app/navigation';
	import Records from '../../../components/Records.svelte';

	let monthlySummary = [0, 0];
	let records = [];
	let wallets = [
		{ name: 'wah', balance: -1 },
		{ name: 'wah', balance: -1 }
	];
	let user = null;

	(
		async () => {
			// let ret = await editCategory($authStore.user.uid, 2, "Sample Category").then(val => val);
			// console.log(ret)
		}
	)();

	async function handleLogout() {
		const success = await logOut();
	}
	// onAuthStateChanged(auth, async (currentUser) => {
	// 	console.log('state changed');
	// 	user = currentUser;
	// 	if(user !== null){
	// 		monthlySummary = await getMonthlySummary(user.uid)
	// 		.then((val) => {
	// 			return val
	// 		});
	// 		records = await getDashboardRecords(user.uid)
	// 		.then((val) => {
	// 			return val;
	// 		});
	// 		wallets = await getWallets(user.uid)
	// 		.then((val) => {
	// 			return val
	// 		});
	// 		let record = {
	// 			balance: 2500,
	// 			category: "Others",
	// 			dateIssued: "something",
	// 			name: "House fix",
	// 			recordType: "Expense",
	// 			subcategory: ""
	// 		};
	// 		// let v = await addRecord(user.uid, record)
	// 		// let v = await editRecord("p9icAjw87yZEpmoCqI6faCofcrC3", 0, {balance: 3000});
	// 		// console.log(v);
	// 	}
	// 	console.log('Current user:', user);
	// });
</script>

{#if $authStore}
	<button on:click={handleLogout}>Logout</button>
	<div>
		<DashboardSummary user={$authStore.user} />
		<Wallet user={$authStore.user} />
		<RecordBar />
		<Records user={$authStore.user} />
	</div>
{:else}
	<div>You must be authenticated to access the dashboard.</div>
{/if}
