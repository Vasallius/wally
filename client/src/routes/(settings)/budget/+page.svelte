<script>
	import SettingsNav from '../../../components/SettingsNav.svelte';
	import BudgetRecord from '../../../components/BudgetRecord.svelte';
	export const name = 'budget';
</script>

<SettingsNav>Budget</SettingsNav>
<div class= "flex flex-row justify-between bg-agray-50 text-agray-600 text-base font-semibold px-8 py-1"> Weekly </div>
<BudgetRecord title="Transportation" balance={600} percent={0}/>
<BudgetRecord title="Entertainment" balance={600} percent={89} />
<div class= "flex flex-row justify-between bg-agray-50 text-agray-600 text-base font-semibold px-8 py-1"> Daily </div>
<BudgetRecord title="Food" balance={600} percent={45}/>

<div class="flex flex-col mt-auto relative">
	<button class="w-14 h-14 absolute bottom-8 right-8 rounded-full bg-primary text-3xl text-center text-white font-primary hover:opacity-90"> + </button>
</div>