<script>
	// @ts-nocheck

	import WalletItem from './WalletItem.svelte';

	import { getDashboardRecords, getWallets } from '../server';
	export let user;

	// Retrieve the user's wallets from the server
	async function fetchWallets() {
		return getWallets(user.uid);
	}

	// Set the `promise` variable to the result of calling `fetchWallets()`
	let promise = fetchWallets();
</script>

<div class="flex mx-3 mt-3.5 mb-1.5">
	<div class="text-header5 font-primary font-semibold">Wallets</div>
</div>
<div class="grid grid-cols-3 carousel mx-3">
	{#await promise then wallets}
		{#each wallets as wallet}
			<WalletItem label={wallet.name} amount={wallet.balance} active={wallet.active} />
		{/each}
	{:catch error}
		<div class="error">Error: {error.message}</div>
	{/await}
</div>
