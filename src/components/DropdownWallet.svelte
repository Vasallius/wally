<script lang="ts">
	import { getWallets } from '$api/dashboard';
	import { authStore, walletStores } from '$stores/stores';
	import { onMount } from 'svelte';

	export let labelName: string;
	export let selectedWallet: string;

	onMount(async () => {
		const wallets = await getWallets($authStore.user.uid);
		walletStores.set(wallets);
		selectedWallet = $walletStores[0].name;
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
		class="rounded-lg border-2 border-[#00C09F65] text-accent-green pt-3 pb-1 text-sm font-primary font-bold appearance-none w-full text-center"
		name={labelName}
	>
		{#each $walletStores as item}
			<option class="text-slate-700" value={item.name}>{item.name}</option>
		{/each}
	</select>
</div>
