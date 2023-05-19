<script lang="ts">
	import { onMount } from 'svelte';
	import { getCategories } from '../server/routes/dashboard_routes/dashboardCardsAPI';
	import { authStore } from '../server/stores/stores';

	export let categoryRecords = ['Food & Drinks'];

	export let selectedCategory: string;

	onMount(async () => {
		categoryRecords = await getCategories($authStore.user.uid);
		selectedCategory = categoryRecords[0];
	});
</script>

<div class="w-full mx-auto form-inline flex flex-col items-center">
	<label
		for="category-select"
		class="font-primary font-semibold text-super-sm top-[15px] relative uppercase text-accent-blue"
	>
		Category
	</label>
	<select
		bind:value={selectedCategory}
		class="rounded-lg border-2 border-[#4F8CE265] text-accent-blue pt-3 pb-1 text-sm font-primary font-bold appearance-none w-full  text-center"
		id="category-select"
	>
		{#each categoryRecords as item}
			<option class="text-slate-700" value={item}>{item}</option>
		{/each}
	</select>
</div>
