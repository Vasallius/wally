<script>
	// @ts-nocheck
	import { Bell } from 'svelte-bootstrap-icons';
	import { getWallets } from '../server';
	import { getMonthlySummary } from './../server/routes/dashboard_routes/dashboardCardsAPI.js';
	import { monthlySummaryStores, authStore } from '../server/stores/stores.js';
	import { activeWalletStore } from '../server/stores/stores.js';
	import { onMount } from 'svelte';
	import NotificationIcon from './NotificationIcon.svelte';

	let activeWallet;
	let wallets;

	function getActiveWallet(wallets) {
		return wallets.find((wallet) => wallet.active == 'True');
	}

	// Frongz no need to pass active wallet as a prop, nakastore na sa activewalletstore, thanks
	onMount(async () => {
		wallets = await getWallets($authStore.user.uid);
		activeWallet = getActiveWallet(wallets);
		activeWalletStore.set(activeWallet);
	});

	const date = new Date();
	const formattedDate = new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(date);
	let promise = [0, 0];
	(async () => {
		promise = await getMonthlySummary($authStore.user.uid, activeWallet);
	})();
</script>

<div class="flex justify-between mx-3 my-4 db-nav">
	<div class="flex items-center">
		<div class="rounded mr-4">
			<a href="/menu"><img src="./Avatar.png" alt="profile" class="w-9 h-9" /></a>
		</div>
		<div class="font-primary font-semibold text-header5 text-black">Dashboard</div>
	</div>
	<div class="flex items-center">
		<NotificationIcon/>
	</div>
</div>
<div class="db-summary mx-3">
	<div class="flex flex-col bg-agray-50 rounded-xl border border-agray-200 border-solid">
		<div class="mx-5 my-3 flex flex-row justify-between items-center">
			<div class="font-primary text-header5 text-agray-700 font-semibold">{formattedDate}</div>
		</div>
		{#if $monthlySummaryStores !== null}
			<div class="mx-5 mb-2 flex flex-row justify-between items-center">
				<div class="font-primary font-normal text-gdark text-xs">Total Income</div>
				<div class="font-primary font-semibold text-primary text-xs">
					₱{$monthlySummaryStores[0]}
				</div>
			</div>
			<div
				class="mx-5 flex flex-row justify-between items-center pb-1.5 border-b border-sky-500 mb-1.5"
			>
				<div class="font-primary font-normal text-agray-700 text-xs">Total Expenses</div>
				<div class="font-primary font-semibold text-secondary text-xs">
					-₱{$monthlySummaryStores[1]}
				</div>
			</div>
			<div class="mx-5 flex flex-row justify-between items-center pb-4">
				<div class="font-primary font-normal text-agray-700 text-xs">Total</div>
				<div class="font-primary font-semibold text-agray-700 text-xs">
					₱{$monthlySummaryStores[0] - $monthlySummaryStores[1]}
				</div>
			</div>
		{:else}
			<div class="error">Loading...</div>
		{/if}
	</div>
</div>
