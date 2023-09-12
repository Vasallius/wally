<script lang="ts">
	// @ts-nocheck
	import { getActiveWallet } from '$api/wallets';
	import { authStore, recordsStore, walletStores } from '$stores/stores';
	import { TrashFill } from 'svelte-bootstrap-icons';
	import {
		updateRecords,
		updateWallets
	} from '../server/routes/dashboard_routes/dashboardCardsAPI';
	import EditWalletModal from './EditWalletModal.svelte';
	let isModalOpen = false;
	let label = '';

	export let title: string;
	export let balance: number;

	// This function handles the delete button click event
	async function handleDeleteClick() {
		let val = confirm(`Are you sure you want to delete this wallet?`);
		if (val) {
			let records = $recordsStore.filter((data) => data.wallet != title);
			recordsStore.set(records);
			let wallets = $walletStores;
			wallets = wallets.filter((wallet) => wallet.name != title);
			let records2 = records.filter((data) => data.recordType == 'expense');
			const today = new Date();
			let newRecords = records2.filter((val) => {
				const currentDate = new Date(val.date.seconds * 1000);
				console.log(currentDate, today);
				return true;
			});
			// Check if there are still wallets
			if (wallets.length > 0) {
				let activeWallet = getActiveWallet(wallets);
				if (activeWallet != null) {
					// Do nothing
				} else {
					// If there is no active wallet, set first wallet to active
					wallets[0].active = 'True';
				}
			} else {
				console.log('No more wallets to delete');
			}
			walletStores.set(wallets);

			// Update Firebase
			updateWallets($authStore.user.uid, wallets);
			updateRecords($authStore.user.uid, records);
		}
	}

	const openPopUp = () => {
		isModalOpen = true;
	};

	function handleEditClick() {
		openPopUp();
	}
</script>

<div class="flex px-8 py-4 justify-between border-b hover:bg-agray-50">
	<button on:click={handleEditClick} class="flex flex-col w-full">
		<h1 class="text-base text-agray-700 font-semibold align-left">{title}</h1>
		<p class="text-xs text-agray-600">₱{balance}</p>
	</button>
	<button on:click={handleDeleteClick}>
		<TrashFill class="fill-agray-400 hover:fill-secondary" />
	</button>
</div>
<EditWalletModal bind:isOpen={isModalOpen} {label} {title} />
