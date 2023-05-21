<script>
	// @ts-nocheck
	import WalletItem from './WalletItem.svelte';
	import { onMount } from 'svelte';
	// import { getWallets } from '../server';
	import {
		getWallets,
		getDashboardRecords,
		getActiveWallet
	} from '../server/routes/dashboard_routes/dashboardCardsAPI';
	import { authStore, walletStores } from '../server/stores/stores';
	import { createEventDispatcher } from 'svelte';
	export let user;
	export let recordsStore;
	let dispatch = createEventDispatcher();
	onMount(async () => {
		const wallets = await getWallets(user.uid);
		walletStores.set(wallets);
	});

	const updateRecords = (e) => {
		dispatch('updateRecords', e.detail);
	};
</script>

<div class="flex mx-3 mt-3.5 mb-1.5">
	<div class="text-header5 font-primary font-semibold">Wallets</div>
</div>
<div class="grid grid-cols-3 carousel mx-3">
	{#if $walletStores}
		{#each $walletStores as wallet, index}
			<WalletItem
				label={wallet.name}
				amount={wallet.balance}
				active={wallet.active}
				{index}
				{recordsStore}
				on:updateRecords={updateRecords}
			/>
		{/each}
	{:else}
		<p>Loading Wallets</p>
	{/if}
</div>
