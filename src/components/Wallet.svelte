<script>
	// @ts-nocheck
	import WalletItem from './WalletItem.svelte';
	import { onMount } from 'svelte';
	import { getWallets } from '../server';
	import { walletStores } from '../server/stores/stores';

	export let user;

	onMount(async () => {
		const wallets = await getWallets(user.uid);
		walletStores.set(wallets);
	});
</script>

<div class="flex mx-3 mt-3.5 mb-1.5">
	<div class="text-header5 font-primary font-semibold">Wallets</div>
</div>
<div class="grid grid-cols-3 carousel mx-3">
	{#if $walletStores}
		{#each $walletStores as wallet, index}
			<WalletItem label={wallet.name} amount={wallet.balance} active={wallet.active} index={index} />
		{/each}
	{:else}
		<p>Loading Wallets</p>
	{/if}
</div>
