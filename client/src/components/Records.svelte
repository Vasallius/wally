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
		return getDashboardRecords(user.uid);
	}

	// @ts-ignore
	let promise = fetchRecords();
	console.log(promise);
</script>

<div class="flex flex-col mx-3">
	{#await promise then records}
		{#each records as record}
			<RecordCard
				category={record.category}
				wallet={record.wallet}
				amount={record.amount}
				date={`${months[new Date(record.date).getMonth()]} ${new Date(record.date).getDate()}, ${new Date(record.date).getFullYear()}`}
			/>
		{/each}
	{/await}
</div>
