<script>
	import { getDashboardRecords } from '../server/routes/dashboard_routes/dashboardCardsAPI';
	import RecordCard from './RecordCard.svelte';

	// @ts-ignore
	export let user;

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
				date={record.dateIssued}
			/>
		{/each}
	{/await}
</div>
