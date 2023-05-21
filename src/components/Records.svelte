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
	import { authStore, recordsStore } from '../server/stores/stores';
	import { onMount } from 'svelte';

	export let recordType;

	onMount(async () => {
		const currentActiveWallet = await getActiveWallet($authStore.user.uid);
		// Fetch the data from the database
		let initialData = await getDashboardRecords($authStore.user.uid, currentActiveWallet);
		if (recordType == 'income') {
			initialData = await getIncomeRecords($authStore.user.uid, currentActiveWallet);
		} else if (recordType == 'expense') {
			initialData = await getExpenseRecords($authStore.user.uid, currentActiveWallet);
		} else if (recordType == 'transfer') {
			initialData = await getTransferRecords($authStore.user.uid, currentActiveWallet);
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
			recordType={record.recordType}
		/>
	{/each}
{:else}
	<p>Loading user data...</p>
{/if}
