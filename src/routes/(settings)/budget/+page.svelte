<script lang="ts">
	import {
		filterByDay,
		filterByMonth,
		filterByWeek,
		getBudgets,
		sumAmountByCategory
	} from '$api/budgets';
	import { getCategories } from '$api/categories';
	import { getAllRecords } from '$api/records';
	import { goto } from '$app/navigation';
	import BudgetRecord from '$components/BudgetRecord.svelte';
	import PopUpBudget from '$components/PopUpBudget.svelte';
	import SettingsNav from '$components/SettingsNav.svelte';
	import { authStore, budgetStores, categoriesStore, recordsStore } from '$stores/stores';
	import type { Timestamp } from 'firebase/firestore';
	import { onMount } from 'svelte';

	export const name = 'budget';

	interface Record {
		amount: number;
		category: string;
		date: Timestamp;
		name: string;
		recordType: string;
		wallet: string;
		wallet2: string;
	}
	let isModalOpen = false;
	let label = '';
	let budget = 0;
	let intervals = '';
	let expenses: Record[];

	const openPopUp = () => {
		isModalOpen = true;
	};

	let budgets;
	onMount(async () => {
		if ($authStore) {
			let records = await getAllRecords($authStore.user.uid);
			recordsStore.set(records);
			expenses = records.filter((item) => item.recordType === 'expense');

			let dayExpenses = filterByDay(expenses);
			let weeklyExpenses = filterByWeek(expenses);
			let monthlyExpenses = filterByMonth(expenses);

			const categories = await getCategories($authStore.user.uid);
			categoriesStore.set(categories);
			budgets = await getBudgets($authStore.user.uid);

			const dayAmountByCategory = sumAmountByCategory(dayExpenses, categories, budgets.DayRecords);
			const weekAmountByCategory = sumAmountByCategory(
				weeklyExpenses,
				categories,
				budgets.WeekRecords
			);
			const monthAmountByCategory = sumAmountByCategory(
				monthlyExpenses,
				categories,
				budgets.MonthRecords
			);
			let newBudgets = {
				DayRecords: dayAmountByCategory,
				WeekRecords: weekAmountByCategory,
				MonthRecords: monthAmountByCategory
			};

			budgetStores.set(newBudgets);
		}
	});

	const redirect = () => {
		goto('/login');
	};
</script>

{#if $authStore}
	<SettingsNav redirect="menu">Budget</SettingsNav>

	<div class="max-h-full flex flex-col overflow-y-scroll">
		<div
			class="flex flex-row justify-between bg-agray-50 text-agray-600 text-base font-semibold px-8 py-1"
		>
			Monthly
		</div>
		<div>
			{#if $budgetStores}
				{#each $budgetStores.MonthRecords as item}
					{#if item.budget > 0}
						<BudgetRecord
							title={item.title}
							budgetSpent={item.spent}
							budget={item.budget}
							interval={'Monthly'}
						/>
					{/if}
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
			{#if $budgetStores}
				{#each $budgetStores.WeekRecords as item}
					{#if item.budget > 0}
						<BudgetRecord
							title={item.title}
							budgetSpent={item.spent}
							budget={item.budget}
							interval={'Weekly'}
						/>
					{/if}
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
					{#if item.budget > 0}
						<BudgetRecord
							title={item.title}
							budgetSpent={item.spent}
							budget={item.budget}
							interval={'Daily'}
						/>
					{/if}
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

	<div class="absolute z-50 h-full m-auto">
		<PopUpBudget bind:isOpen={isModalOpen} {label} {budget} {intervals} />
	</div>
{:else}
	<div on:load={redirect} />
{/if}

<style>
	::-webkit-scrollbar {
		width: 0px;
	}

	::-webkit-scrollbar-track {
		background: #ffffff00;
	}

	::-webkit-scrollbar-thumb {
		background: #e3e3e300;
		border-radius: 10px;
	}
</style>
