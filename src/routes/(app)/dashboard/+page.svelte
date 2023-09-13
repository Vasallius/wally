<script lang="ts">
	import { getWallets, sumRecords, sumTransferFrom, sumTransferTo } from '$api/dashboard';
	import { notificationsList } from '$api/notifications';
	import { getAllRecords } from '$api/records';
	import { getActiveWallet } from '$api/wallets';
	import Addrecord from '$components/Addrecord.svelte';
	import DashboardSummary from '$components/DashboardSummary.svelte';
	import RecordBar from '$components/RecordBar.svelte';
	import Wallet from '$components/Wallet.svelte';
	import {
		activeWalletStore,
		authStore,
		monthlySummaryStores,
		notificationsStore,
		recordsStore
	} from '$stores/stores';
	import { onMount } from 'svelte';

	interface Wallet {
		active: string;
		balance: number;
		dailyBudget: number;
		initial: number;
		name: string;
		weeklyBudget: number;
	}

	let isModalOpen = false;
	let wallets: Wallet[];
	let activeWallet: Wallet | undefined;

	onMount(async () => {
		if ($authStore) {
			wallets = await getWallets($authStore.user.uid);
			activeWallet = getActiveWallet(wallets);
			activeWalletStore.set(activeWallet);

			const records = await getAllRecords($authStore.user.uid);
			const notifs = await notificationsList($authStore.user.uid);
			notificationsStore.set(notifs);
			recordsStore.set(records);

			let initial: number;
			let income: number;
			let expenses: number;
			let transferout: number;
			let transferin: number;
			if (activeWallet == null || activeWallet == undefined) {
				monthlySummaryStores.set([0, 0, 0, 0, 0]);
			} else {
				initial = activeWallet.initial;
				if ($recordsStore) {
					income = sumRecords($recordsStore, 'income', activeWallet.name);
					expenses = sumRecords($recordsStore, 'expense', activeWallet.name);
					transferout = sumTransferFrom($recordsStore, activeWallet.name);
					transferin = sumTransferTo($recordsStore, activeWallet.name);
					monthlySummaryStores.set([income, expenses, transferin, transferout, initial]);
				}
			}
		}
	});

	const openPopUp = () => {
		isModalOpen = true;
	};
</script>

<!-- Check if the user is authenticated using the $authStore variable -->

{#if $authStore && $monthlySummaryStores && $notificationsStore}
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
