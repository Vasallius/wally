<script>
	// @ts-nocheck
	import { getActiveWallet } from '$api/wallets';
	import { onMount } from 'svelte';
	import { getWallets } from '../api/dashboard';
	import { activeWalletStore, authStore, monthlySummaryStores } from '../server/stores/stores.js';
	import NotificationIcon from './NotificationIcon.svelte';

	let activeWallet;
	let wallets;

	onMount(async () => {
		wallets = await getWallets($authStore.user.uid);
		activeWallet = getActiveWallet(wallets);
		activeWalletStore.set(activeWallet);
		console.log($monthlySummaryStores);
	});

	const date = new Date();
	const formattedDate = new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(date);
</script>

<header class="flex justify-between mx-3 my-4 db-nav">
	<div class="flex items-center">
		<div class="rounded mr-4">
			<a href="/menu"><img src="./Avatar.png" alt="profile" class="w-9 h-9" /></a>
		</div>
		<div class="font-primary font-semibold text-header5 text-black">Dashboard</div>
	</div>
	<div class="flex items-center">
		<NotificationIcon />
	</div>
</header>

<div class="db-summary mx-3">
	<div class="flex flex-col bg-agray-50 rounded-xl border border-agray-200 border-solid">
		<div class="mx-5 my-3 flex flex-row justify-between items-center">
			<div class="font-primary text-header5 text-agray-700 font-semibold">{formattedDate}</div>
		</div>
		{#if $monthlySummaryStores}
			<div class="mx-5 mb-2 flex flex-row justify-between items-center">
				<div class="font-primary font-normal text-gdark text-xs">Initial</div>
				<div class="font-primary font-semibold text-primary text-xs">
					₱{$monthlySummaryStores[4]}
				</div>
			</div>
			<div class="mx-5 mb-2 flex flex-row justify-between items-center">
				<div class="font-primary font-normal text-gdark text-xs">Total Income</div>
				<div class="font-primary font-semibold text-primary text-xs">
					+₱{$monthlySummaryStores[0]}
				</div>
			</div>
			<div class="mx-5 flex flex-row justify-between items-center pb-1.5">
				<div class="font-primary font-normal text-agray-700 text-xs">Total Expenses</div>
				<div class="font-primary font-semibold text-secondary text-xs">
					-₱{$monthlySummaryStores[1]}
				</div>
			</div>
			<div class="mx-5 flex flex-row justify-between items-center pb-1.5">
				<div class="font-primary font-normal text-agray-700 text-xs">Transfer in</div>
				<div class="font-primary font-semibold text-tertiary text-xs">
					{$monthlySummaryStores[2] > 0
						? `+₱${$monthlySummaryStores[2]}`
						: `-₱${$monthlySummaryStores[2] * -1}`}
				</div>
			</div>
			<div
				class="mx-5 flex flex-row justify-between items-center pb-1.5 border-b border-agray-400 mb-1.5"
			>
				<div class="font-primary font-normal text-agray-700 text-xs">Transfer Out</div>
				<div class="font-primary font-semibold text-tertiary text-xs">
					{$monthlySummaryStores[3] * -1 > 0
						? `+₱${$monthlySummaryStores[3] * -1}`
						: `-₱${$monthlySummaryStores[3]}`}
				</div>
			</div>
			<div class="mx-5 flex flex-row justify-between items-center pb-4">
				<div class="font-primary font-normal text-agray-700 text-xs">Total</div>
				<div class="font-primary font-semibold text-agray-700 text-xs">
					₱{$monthlySummaryStores[4] +
						$monthlySummaryStores[0] -
						$monthlySummaryStores[1] +
						$monthlySummaryStores[2] -
						$monthlySummaryStores[3]}
				</div>
			</div>
		{:else}
			<div class="error">Loading...</div>
		{/if}
	</div>
</div>
