<script>
	// @ts-nocheck
	import { getWallets } from '../server';
	import WalletRecord from './WalletRecord.svelte';
	import { walletStores } from '../server/stores/stores';
	import { onMount } from 'svelte';

	export let user;
	onMount(async () => {
		const wallets = await getWallets(user.uid);
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
