<script lang="ts">
	import { onMount } from 'svelte';
	import { authStore } from '../server/stores/stores';
	import { getWallets } from '../server';
	import Wallet from './Wallet.svelte';

	let walletRecords = [
		{ id: 0, name: 'Cash', balance: 600 },
		{ id: 1, name: 'Maya', balance: 1200 },
		{ id: 2, name: 'Bank (BPI)', balance: 20000 }
	];

	export let labelName: string;
	export let selectedWallet: string = walletRecords[0].name;

	onMount(async () => {
		walletRecords = await getWallets($authStore.user.uid);
		selectedWallet = walletRecords[0].name;
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
		{#each walletRecords as item}
			<option class="text-slate-700" value={item.name}>{item.name}</option>
		{/each}
	</select>
</div>
