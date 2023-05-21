<script>
	// @ts-nocheck
	import { getWallets } from '../server';
	import WalletRecord from './WalletRecord.svelte';
	import { authStore, walletStores } from '../server/stores/stores';
	import { onMount } from 'svelte';

	onMount(async () => {
		const wallets = await getWallets($authStore.user.uid);
		walletStores.set(wallets);
	});
</script>

{#if $walletStores}
	{#each $walletStores as wallet}
		<WalletRecord title={wallet.name} balance={wallet.balance} />
	{/each}
{:else}
	<p>Loading Wallets</p>
{/if}
