<script>
	import SettingsNav from '../../../components/SettingsNav.svelte';
	import BudgetRecord from '../../../components/BudgetRecord.svelte';
	export const name = 'budget';
</script>

<SettingsNav>Budget</SettingsNav>
<div
	class="flex flex-row justify-between bg-agray-50 text-agray-600 text-base font-semibold px-8 py-1"
>
	Weekly
</div>
<BudgetRecord title="Transportation" budgetSpent={200} budget={600} />
<div
	class="flex flex-row justify-between bg-agray-50 text-agray-600 text-base font-semibold px-8 py-1"
>
	Daily
</div>
<BudgetRecord title="Entertainment" budgetSpent={200} budget={800} />
<BudgetRecord title="Food" budgetSpent={290} budget={300} />
