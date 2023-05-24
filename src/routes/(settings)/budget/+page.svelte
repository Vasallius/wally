<script>
	import SettingsNav from '../../../components/SettingsNav.svelte';
	import BudgetRecord from '../../../components/BudgetRecord.svelte';
	import PopUpBudget from '../../../components/PopUpBudget.svelte';
	import { getBudgets, updateBudgets } from '../../../server/routes/budgetsAPI';
	import { onMount } from 'svelte';
	import {
		authStore,
		budgetStores,
		recordsStore,
		categoriesStore
	} from '../../../server/stores/stores';
	import { getAllRecords } from '../../../server/routes/recordManipulationsAPI';
	import { getCategories } from '../../../server/routes/dashboard_routes/dashboardCardsAPI';
	export const name = 'budget';
	let isModalOpen = false;
	let label = '';
	let budget = 0;
	let intervals = '';
	let expenses;

	function filterByDay(expenses) {
		const today = new Date();
		today.setHours(0, 0, 0, 0); // Set to the start of the day

		return expenses.filter((item) => {
			const itemDate = new Date(item.date.seconds * 1000);
			return itemDate >= today;
		});
	}

	function filterByWeek(expenses) {
		const startOfWeek = new Date();
		startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // Set to the start of the week
		startOfWeek.setHours(0, 0, 0, 0); // Set to the start of the day

		return expenses.filter((item) => {
			const itemDate = new Date(item.date.seconds * 1000);
			return itemDate >= startOfWeek;
		});
	}

	function filterByMonth(expenses) {
		const startOfMonth = new Date();
		startOfMonth.setDate(1); // Set to the start of the month
		startOfMonth.setHours(0, 0, 0, 0); // Set to the start of the day

		return expenses.filter((item) => {
			const itemDate = new Date(item.date.seconds * 1000);
			return itemDate >= startOfMonth;
		});
	}

	function sumAmountByCategory(expenses, categories, array) {
		return categories.map((category) => {
			const filteredExpenses = expenses.filter((item) => item.category === category);
			const totalSpent = filteredExpenses.reduce((sum, item) => sum + item.amount, 0);

			const result = array.find((el) => el.title === category);

			if (result) {
				const budget = result.budget || 0;
				return {
					title: category,
					spent: totalSpent,
					budget: budget
				};
			} else {
				return {
					title: category,
					spent: totalSpent,
					budget: 0
				};
			}
		});
	}
	const openPopUp = () => {
		isModalOpen = true;
	};
	let budgets;
	onMount(async () => {
		let records = await getAllRecords($authStore.user.uid);
		recordsStore.set(records);
		expenses = records.filter((item) => item.recordType === 'expense');
		let dayExpenses = filterByDay(expenses);
		let weeklyExpenses = filterByWeek(expenses);
		let monthlyExpenses = filterByMonth(expenses);
		const categories = await getCategories($authStore.user.uid);
		// Initialize the store value
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
		console.log(budgets);
		console.log(newBudgets);
		budgetStores.set(newBudgets);
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
				{#if item.budget > 0}
					<BudgetRecord title={item.title} budgetSpent={item.spent} budget={item.budget} />
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
		<!-- INSERT WEEKLY BUDGET RECORDS HERE -->
		{#if $budgetStores}
			{#each $budgetStores.WeekRecords as item}
				{#if item.budget > 0}
					<BudgetRecord title={item.title} budgetSpent={item.spent} budget={item.budget} />
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
					<BudgetRecord title={item.title} budgetSpent={item.spent} budget={item.budget} />
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

<!-- need - center (ayusin position!), bg, design   -->
<div class="absolute z-50 h-full m-auto">
	<PopUpBudget bind:isOpen={isModalOpen} {label} {budget} {intervals} />
</div>

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
