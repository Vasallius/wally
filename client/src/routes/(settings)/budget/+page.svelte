<script>
	import SettingsNav from '../../../components/SettingsNav.svelte';
	import BudgetRecord from '../../../components/BudgetRecord.svelte';
	import PopUpBudget from '../../../components/PopUpBudget.svelte';
	

	export const name = 'budget';
	let isModalOpen = false;
  	let label = '';
  	let budget = 0;
  	let intervals = '';

	export let MonthRecords = [
		{ id: 0, component: BudgetRecord, title:"Shopping", budgetSpent:200, budget:1000 },
	];
	let WeekRecords = [
		{ id: 0, component: BudgetRecord, title:"Transportation", budgetSpent:500, budget:700 },	
	];
	let DayRecords = [
		{ id: 0, component: BudgetRecord, title:"Food", budgetSpent:290, budget:300 },
		{ id: 1, component: BudgetRecord, title:"Entertainment", budgetSpent:50, budget:200 },
	];

  	const openPopUp = () => {
    	isModalOpen = true;
  	};
	
</script>

<SettingsNav>Budget</SettingsNav>
<div
	class="flex flex-row justify-between bg-agray-50 text-agray-600 text-base font-semibold px-8 py-1"
>
	Monthly
</div>
<div>
	<!-- INSERT MONTHLY BUDGET RECORDS HERE -->

	{#each MonthRecords as item}
		<svelte:component this={item.component} title={item.title} budgetSpent={item.budgetSpent} budget={item.budget}/>
	{/each}

</div>

<div
	class="flex flex-row justify-between bg-agray-50 text-agray-600 text-base font-semibold px-8 py-1"
>
	Weekly
</div>
<div>
	<!-- INSERT WEEKLY BUDGET RECORDS HERE -->

	{#each WeekRecords as item}
		<svelte:component this={item.component} title={item.title} budgetSpent={item.budgetSpent} budget={item.budget}/>
	{/each}

</div>

<div
	class="flex flex-row justify-between bg-agray-50 text-agray-600 text-base font-semibold px-8 py-1"
>
	Daily
</div>
<div>
	<!-- INSERT DAILY BUDGET RECORDS HERE -->

	{#each DayRecords as item}
		<svelte:component this={item.component} title={item.title} budgetSpent={item.budgetSpent} budget={item.budget}/>
	{/each}

</div>

<div class="flex flex-col mt-auto relative">
	<button on:click={openPopUp} class="w-14 h-14 absolute bottom-8 right-8 rounded-full bg-primary text-3xl text-center text-white font-primary hover:opacity-90 pb-1"> + </button>
</div>

<!-- need - center (ayusin position!), bg, design   --> 
<div class="flex absolute z-50 h-full max-w-full m-auto">
	<PopUpBudget
		bind:isOpen={isModalOpen}
		label={label}
		budget={budget}
		intervals={intervals}
	/>
</div>