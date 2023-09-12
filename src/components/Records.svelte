<script>
	// @ts-nocheck
	import { getWallets } from '$api/dashboard';
	import { onMount } from 'svelte';
	import { getAllRecords } from '../server/routes/recordManipulationsAPI';
	import { activeWalletStore, authStore, recordsStore } from '../server/stores/stores';
	import RecordCard from './RecordCard.svelte';

	export let recordType;

	let activeWallet;
	let wallets;
	let records;

	function getActiveWallet(wallets) {
		return wallets.find((wallet) => wallet.active == 'True');
	}

	onMount(async () => {
		wallets = await getWallets($authStore.user.uid);
		records = await getAllRecords($authStore.user.uid);
		activeWallet = getActiveWallet(wallets);
		activeWalletStore.set(activeWallet);

		recordsStore.set(records);
		console.log(records, recordType);
	});

	function convertTimestamp(timestamp) {
		const date = new Date(timestamp.seconds * 1000);
		return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
	}
</script>

{#if $recordsStore}
	{#each $recordsStore as record}
		{#if record.wallet == $activeWalletStore?.name && recordType == 'all'}
			<RecordCard
				category={record.category}
				wallet={record.wallet}
				wallet2={record.wallet2}
				amount={record.amount}
				date={convertTimestamp(record.date)}
				recordType={record.recordType}
			/>
		{:else if (record.wallet == $activeWalletStore?.name || record.wallet2 == $activeWalletStore?.name) && record.recordType == 'transfer'}
			<RecordCard
				category={record.category}
				wallet={record.wallet}
				wallet2={record.wallet2}
				amount={record.amount}
				date={convertTimestamp(record.date)}
				recordType={record.recordType}
			/>
		{:else if record.wallet == $activeWalletStore?.name && record.recordType == recordType}
			<RecordCard
				category={record.category}
				wallet={record.wallet}
				wallet2={record.wallet2}
				amount={record.amount}
				date={convertTimestamp(record.date)}
				recordType={record.recordType}
			/>
		{/if}
	{/each}
{:else}
	<p>Loading user data...</p>
{/if}
