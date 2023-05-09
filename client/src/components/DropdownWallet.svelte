<script lang="ts">
	import { onMount } from 'svelte';

	let WalletRecords = [
		{ id: 0, title: 'Cash', balance: 600 },
		{ id: 1, title: 'Maya', balance: 1200 },
		{ id: 2, title: 'Bank (BPI)', balance: 20000 }
	];

	export let labelName: string;
	export let selectedWallet: string = WalletRecords[0].title;

	onMount(() => {
		selectedWallet = WalletRecords[0].title;
	});
</script>

<div class="w-full mx-auto form-inline flex flex-col items-center">
	<label
		for={labelName}
		class="font-primary font-semibold text-super-sm top-[15px] relative uppercase text-accent-green"
	>
		{labelName}
	</label>
	<select
		bind:value={selectedWallet}
		class="rounded-lg border-2 border-[#00C09F65] text-accent-green pt-3 pb-1 text-sm font-primary font-bold appearance-none w-full  text-center"
		name={labelName}
	>
		{#each WalletRecords as item}
			<option class="text-slate-700" value={item.title}>{item.title}</option>
		{/each}
	</select>
</div>
