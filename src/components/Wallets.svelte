<script lang="ts">
	import { getWallets } from '$api/dashboard';
	import WalletItem from '$components/WalletItem.svelte';
	import { authStore, walletStores } from '$stores/stores';
	import { onMount } from 'svelte';

	onMount(async () => {
		const wallets = await getWallets($authStore.user.uid);
		walletStores.set(wallets);
	});
</script>

<div class="flex mx-3 mt-3.5 mb-1.5">
	<div class="text-header5 font-primary font-semibold">Wallets</div>
</div>
<div class="flex overflow-x-auto snap-x overflow-y-visible mx-3 walletscroll">
	{#if $walletStores}
		{#each $walletStores as wallet}
			<WalletItem label={wallet.name} amount={wallet.balance} active={wallet.active} />
		{/each}
	{:else}
		<p>Loading Wallets</p>
	{/if}
</div>

<style>
	/* Hide scrollbar for Chrome, Safari and Opera */
	.walletscroll::-webkit-scrollbar {
		display: none;
	}

	/* Hide scrollbar for IE, Edge and Firefox */
	.walletscroll {
		-ms-overflow-style: none; /* IE and Edge */
		scrollbar-width: none; /* Firefox */
	}
</style>
