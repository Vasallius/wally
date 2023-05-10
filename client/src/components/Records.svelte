<script>
	import { getDashboardRecords } from '../server/routes/dashboard_routes/dashboardCardsAPI';
	import RecordCard from './RecordCard.svelte';
	import { recordsStore, authStore } from '../server/stores/stores';
	import { onMount } from 'svelte';

	// @ts-ignore
	export let user;

	const months = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec'
	];

	onMount(async () => {
		// Fetch the data from the database
		const initialData = await getDashboardRecords($authStore.user.uid, 'Cash');

		// Initialize the store value
		recordsStore.set(initialData);
	});

	async function fetchDashboardRecords() {
		// @ts-ignore
		return getDashboardRecords(user.uid, 'Cash');
	}

	// @ts-ignore
	let promise = fetchDashboardRecords();
	function convertTimestamp(timestamp) {
		const date = new Date(timestamp.seconds * 1000);
		return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
	}
	console.log(promise);
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
