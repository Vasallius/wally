<script>
	import SettingsNav from '../../../components/SettingsNav.svelte';
	import BudgetRecord from '../../../components/BudgetRecord.svelte';
	import PopUpBudget from '../../../components/PopUpBudget.svelte';
	import { getBudgets } from '../../../server/routes/budgetsAPI';
	import { onMount } from 'svelte';
	import { authStore, budgetStores } from '../../../server/stores/stores';

	export const name = 'budget';
	let isModalOpen = false;
	let label = '';
	let budget = 0;
	let intervals = '';

	export let MonthRecords = [{ id: 0, title: 'Shopping', budgetSpent: 200, budget: 1000 }];
	let WeekRecords = [{ id: 0, title: 'Transportation', budgetSpent: 500, budget: 700 }];
	let DayRecords = [
		{ id: 0, title: 'Food', budgetSpent: 290, budget: 300 },
		{ id: 1, title: 'Entertainment', budgetSpent: 50, budget: 200 }
	];

	const openPopUp = () => {
		isModalOpen = true;
	};

	onMount(async () => {
		const budgets = await getBudgets($authStore.user.uid);
		budgetStores.set(budgets);
	});
</script>

<SettingsNav redirect="menu">Budget</SettingsNav>

<div class="max-h-full flex flex-col overflow-y-scroll">
	<div
		class="flex flex-row justify-between bg-agray-50 text-agray-600 text-base font-semibold px-8 py-1"
	>
		Monthly
	</div>
	<div>
		<!-- INSERT MONTHLY BUDGET RECORDS HERE -->
		{#if $budgetStores}
			{#each $budgetStores.MonthRecords as item}
				<BudgetRecord title={item.title} budgetSpent={item.spent} budget={item.budget} />
			{/each}
		{:else}
			<p>Loading Wallets</p>
		{/if}
	</div>
	<div
		class="flex flex-row justify-between bg-agray-50 text-agray-600 text-base font-semibold px-8 py-1"
	>
		Weekly
	</div>
	<div>
		<!-- INSERT WEEKLY BUDGET RECORDS HERE -->
		{#if $budgetStores}
			{#each $budgetStores.WeekRecords as item}
				<BudgetRecord title={item.title} budgetSpent={item.spent} budget={item.budget} />
			{/each}
		{:else}
			<p>Loading Wallets</p>
		{/if}
	</div>
	<div
		class="flex flex-row justify-between bg-agray-50 text-agray-600 text-base font-semibold px-8 py-1"
	>
		Daily
	</div>
	<div>
		{#if $budgetStores}
			{#each $budgetStores.DayRecords as item}
				<BudgetRecord title={item.title} budgetSpent={item.spent} budget={item.budget} />
			{/each}
		{:else}
			<p>Loading Wallets</p>
		{/if}
	</div>
</div>

<div class="flex flex-col mt-auto relative">
	<button
		on:click={openPopUp}
		class="w-14 h-14 absolute bottom-8 right-8 rounded-full bg-primary text-3xl text-center text-white font-primary hover:opacity-90 pb-1"
	>
		+
	</button>
</div>

<!-- need - center (ayusin position!), bg, design   -->
<div class="absolute z-50 h-full m-auto">
	<PopUpBudget bind:isOpen={isModalOpen} {label} {budget} {intervals} />
</div>

<style>
	::-webkit-scrollbar {
		width: 4px;
	}

	::-webkit-scrollbar-track {
		background: #ffffff00;
	}

	::-webkit-scrollbar-thumb {
		background: #e3e3e3;
		border-radius: 10px;
	}
</style>
