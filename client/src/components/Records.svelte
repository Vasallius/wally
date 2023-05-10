<script>
	import { getDashboardRecords } from '../server/routes/dashboard_routes/dashboardCardsAPI';
	import RecordCard from './RecordCard.svelte';

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

	async function fetchRecords() {
		// @ts-ignore
		return getDashboardRecords(user.uid, 'Cash');
	}

	// @ts-ignore
	let promise = fetchRecords();
	function convertTimestamp(timestamp) {
		const date = new Date(timestamp.seconds * 1000);
		return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
	}
	console.log(promise);
</script>

{#await promise then records}
	{#each records as record}
		<RecordCard
			category={record.category}
			wallet={record.wallet}
			amount={record.amount}
			date={convertTimestamp(record.date)}
		/>
	{/each}
{/await}
