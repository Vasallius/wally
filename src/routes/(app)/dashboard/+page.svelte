<script>
	// @ts-nocheck
	import { onMount } from 'svelte';
	import DashboardSummary from './../../../components/DashboardSummary.svelte';
	import Wallet from '../../../components/Wallet.svelte';
	import RecordBar from '../../../components/RecordBar.svelte';
	import {
		authStore,
		monthlySummaryStores,
		activeWalletStore
	} from '../../../server/stores/stores';
	import Addrecord from '../../../components/Addrecord.svelte';
	import { getMonthlySummary } from '../../../server/routes/dashboard_routes/dashboardCardsAPI';
	import { getWallets } from '../../../server/routes/dashboard_routes/dashboardCardsAPI';

	let currentActiveWallet = 'Cash'; // Hardcoded value AVOID!
	let isModalOpen = false;

	function getActiveWallet(wallets) {
		return wallets.find((wallet) => wallet.active == 'True');
	}
	let wallets;
	let activeWallet;
	onMount(async () => {
		wallets = await getWallets($authStore.user.uid);
		activeWallet = getActiveWallet(wallets);
		activeWalletStore.set(activeWallet);
		monthlySummaryStores.set(await getMonthlySummary($authStore.user.uid, currentActiveWallet));
	});

	const openPopUp = () => {
		isModalOpen = true;
	};
</script>

<!-- Check if the user is authenticated using the $authStore variable -->

{#if $authStore && $monthlySummaryStores}
	<div class:scroll-lock={isModalOpen}>
		<DashboardSummary />
		<Wallet />
		<RecordBar />
	</div>

	<!-- Button is used to add records -->

	<button
		on:click={openPopUp}
		class="w-14 h-14 bottom-8 right-9 sm:left-[calc(50%+135px)] rounded-full bg-primary text-3xl text-center text-white font-primary hover:bg-[#01b99a] pb-1 fixed"
	>
		+
	</button>

	<div class="absolute z-50 h-full m-auto">
		<Addrecord bind:isOpen={isModalOpen} />
	</div>
{:else if $authStore || $monthlySummaryStores}
	<div>Loading...</div>
{:else}
	<div>You must be authenticated to access the dashboard.</div>
{/if}
