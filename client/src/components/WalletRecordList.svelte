<script>
	// @ts-nocheck
	import { getWallets } from '../server';
	import WalletRecord from './WalletRecord.svelte';
	export let user;

	// Retrieve the user's wallets from the server
	async function fetchWallets() {
		return getWallets(user.uid);
	}

	let promise = fetchWallets();
</script>

{#await promise then wallets}
	{#each wallets as wallet}
		<WalletRecord title={wallet.name} balance={wallet.balance} />
	{/each}
{:catch error}
	<div class="error">Error: {error.message}</div>
{/await}
