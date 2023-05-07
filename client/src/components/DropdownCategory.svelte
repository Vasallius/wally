<script>
	export let CategoryRecords = [
		{ id: 0, category: 'Shopping' },
		{ id: 1, category: 'Essentials' }
	];
</script>

<div class="w-full mx-auto form-inline flex flex-col items-center">
	<label
		for="category-select"
		class="font-primary font-semibold text-super-sm top-[15px] relative uppercase text-accent-blue"
	>
		Category
	</label>
	<select
		class="rounded-lg border-2 border-[#4F8CE265] text-accent-blue pt-3 pb-1 text-sm font-primary font-bold appearance-none w-full  text-center"
		id="category-select"
	>
		{#each CategoryRecords as item}
			<option class="text-slate-700" value={item.category}>{item.category}</option>
		{/each}
	</select>
</div>
