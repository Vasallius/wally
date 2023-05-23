<script>
	// @ts-nocheck
	import { onMount } from 'svelte';
	import DashboardSummary from './../../../components/DashboardSummary.svelte';
	import Wallet from '../../../components/Wallet.svelte';
	import RecordBar from '../../../components/RecordBar.svelte';
	import {
		authStore,
		monthlySummaryStores,
		activeWalletStore,
		recordsStore
	} from '../../../server/stores/stores';
	import Addrecord from '../../../components/Addrecord.svelte';
	import { getWallets } from '../../../server/routes/dashboard_routes/dashboardCardsAPI';
	import { getAllRecords } from '../../../server/routes/recordManipulationsAPI';
	let currentActiveWallet = 'Cash'; // Hardcoded value AVOID!
	let isModalOpen = false;
	let wallets;
	let activeWallet;

	function getActiveWallet(wallets) {
		return wallets.find((wallet) => wallet.active == 'True');
	}

	function sumRecords(array, recordType, walletname) {
		return array.reduce((total, current) => {
			if (current.recordType === recordType && current.wallet === walletname) {
				return total + current.amount;
			} else {
				return total;
			}
		}, 0);
	}

	function sumTransferFrom(array, walletname) {
		let transfer = array.filter(
			(wallet) => wallet.recordType == 'transfer' && wallet.wallet == walletname
		);
		let sum = transfer.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0);
		return sum;
	}

	function sumTransferTo(array, walletname) {
		let transfer = array.filter(
			(wallet) => wallet.recordType == 'transfer' && wallet.wallet2 == walletname
		);
		let sum = transfer.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0);
		return sum;
	}

	onMount(async () => {
		wallets = await getWallets($authStore.user.uid);
		activeWallet = getActiveWallet(wallets);
		activeWalletStore.set(activeWallet);
		let records = await getAllRecords($authStore.user.uid);
		recordsStore.set(records);
		let income = sumRecords($recordsStore, 'income', activeWallet.name);
		let expenses = sumRecords($recordsStore, 'expense', activeWallet.name);
		monthlySummaryStores.set([income, expenses]);
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
