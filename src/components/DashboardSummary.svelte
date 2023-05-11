<script>
	// @ts-nocheck
	import { Bell } from 'svelte-bootstrap-icons';

	import { getMonthlySummary } from './../server/routes/dashboard_routes/dashboardCardsAPI.js';

	export let user;

	const date = new Date();
	const formattedDate = new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(date);

	async function fetchMonthlySummary() {
		return getMonthlySummary(user.uid, 'Cash');
	}

	let promise = fetchMonthlySummary();
</script>

<div class="flex justify-between mx-3 my-4 db-nav">
	<div class="flex">
		<div class="flex items-center">
			<a href="/menu"><div class="w-4 h-4 my-auto bg-light-green rounded-full mr-5" /></a>
		</div>
		<div class="font-primary font-semibold text-header5 text-black">Dashboard</div>
	</div>
	<div class="flex items-center">
		<a href="/notification">
			<Bell fill="var(--agray-600)" width={20} height={20} />
		</a>
	</div>
</div>
<div class="db-summary mx-3">
	<div class="flex flex-col bg-agray-50 rounded-xl border border-agray-200 border-solid">
		<div class="mx-5 my-3 flex flex-row justify-between items-center ">
			<div class="font-primary text-header5 text-agray-700 font-semibold">{formattedDate}</div>

			<img class="w-4 h-4 my-auto" src="/ThreeDots.svg" alt="background" />
		</div>
		{#await promise then monthlySummary}
			<div class="mx-5  mb-2 flex flex-row justify-between items-center ">
				<div class="font-primary  font-normal  text-gdark text-xs">Total Income</div>
				<div class="font-primary  font-semibold text-primary text-xs">₱{monthlySummary[0]}</div>
			</div>
			<div
				class="mx-5  flex flex-row justify-between items-center pb-1.5 border-b border-sky-500 mb-1.5"
			>
				<div class="font-primary  font-normal  text-agray-700 text-xs">Total Expenses</div>
				<div class="font-primary  font-semibold text-secondary text-xs">
					-₱{monthlySummary[1]}
				</div>
			</div>
			<div class="mx-5  flex flex-row justify-between items-center pb-4">
				<div class="font-primary  font-normal  text-agray-700 text-xs">Total</div>
				<div class="font-primary  font-semibold text-agray-700 text-xs">
					₱{monthlySummary[0] - monthlySummary[1]}
				</div>
			</div>
		{:catch error}
			<div class="error">Error: {error.message}</div>
		{/await}
	</div>
</div>
