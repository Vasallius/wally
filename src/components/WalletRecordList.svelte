<script>
	// @ts-nocheck
	import { getWallets } from '../server';
	import WalletRecord from './WalletRecord.svelte';
	import { walletStore } from '../server/stores/stores';
	import { onDestroy } from 'svelte';

	export let user;

	let wallets = [];
	$: {
		// Listener for the 'walletAdded' custom event
		const walletAddedListener = (event) => {
			fetchWallets();
		};

		// Register the listener
		document.addEventListener('walletAdded', walletAddedListener);

		// Cleanup function to remove the listener when the component is destroyed
		onDestroy(() => {
			document.removeEventListener('walletAdded', walletAddedListener);
		});

		async function fetchWallets() {
			wallets = await getWallets(user.uid);
		}

		fetchWallets();
	}
</script>

{#each wallets as wallet}
	<WalletRecord title={wallet.name} balance={wallet.balance} />
{/each}
