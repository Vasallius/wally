<script>
	import { getDashboardRecords } from '../server/routes/dashboard_routes/dashboardCardsAPI';
	import RecordCard from './RecordCard.svelte';
	import { recordsStore, authStore } from '../server/stores/stores';
	import { onMount } from 'svelte';

	export let user;

	onMount(async () => {
		// Fetch the data from the database
		const initialData = await getDashboardRecords($authStore.user.uid, 'Cash');

		// Initialize the store value
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
