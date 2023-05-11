<script>
	// @ts-nocheck

	import {
		getDashboardRecords,
		getIncomeRecords,
		getExpenseRecords,
		getTransferRecords,
		getActiveWallet
	} from '../server/routes/dashboard_routes/dashboardCardsAPI';
	import RecordCard from './RecordCard.svelte';
	import { recordsStore } from '../server/stores/stores';
	import { onMount } from 'svelte';

	export let user;
	export let recordType;

	onMount(async () => {
		const currentActiveWallet = await getActiveWallet(user.uid);
		// Fetch the data from the database
		let initialData = await getDashboardRecords(user.uid, currentActiveWallet);
		if (recordType == 'income') {
			initialData = await getIncomeRecords(user.uid, currentActiveWallet);
		} else if (recordType == 'expense') {
			initialData = await getExpenseRecords(user.uid, currentActiveWallet);
		} else if (recordType == 'transfer') {
			initialData = await getTransferRecords(user.uid, currentActiveWallet);
		}
		recordsStore.set(initialData);
	});

	function convertTimestamp(timestamp) {
		const date = new Date(timestamp.seconds * 1000);
		return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
	}
</script>

{#if $recordsStore}
	{#each $recordsStore as record}
		<RecordCard
			category={record.category}
			wallet={record.wallet}
			amount={record.amount}
			date={convertTimestamp(record.date)}
		/>
	{/each}
{:else}
	<p>Loading user data...</p>
{/if}
