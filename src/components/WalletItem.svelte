<script lang="ts">
	// @ts-nocheck
	import { getWallets } from '$api/dashboard';
	import { onMount } from 'svelte';
	import {
		sumRecords,
		sumTransferFrom,
		sumTransferTo,
		updateWallets
	} from '../server/routes/dashboard_routes/dashboardCardsAPI';
	import {
		activeWalletStore,
		authStore,
		monthlySummaryStores,
		recordsStore,
		walletStores
	} from '../server/stores/stores';

	export let label: string;
	export let amount: string;
	export let active: string;
	let wallets;

	onMount(async () => {
		wallets = await getWallets($authStore.user.uid);
	});

	const changeActive = async () => {
		wallets = $walletStores.map((wallet) => {
			if (wallet.name == label) {
				wallet.active = 'True';
				// console.log(`Changing active wallet to ${label}`);
				activeWalletStore.set(wallet);
				let initial = wallet.initial;
				let income = sumRecords($recordsStore, 'income', label);
				let expense = sumRecords($recordsStore, 'expense', label);
				let transferout = sumTransferFrom($recordsStore, label);
				let transferin = sumTransferTo($recordsStore, label);
				monthlySummaryStores.set([income, expense, transferin, transferout, initial]);
			} else {
				wallet.active = 'False';
			}
			return wallet;
		});
		walletStores.set(wallets);
		updateWallets($authStore.user.uid, wallets);
	};
</script>

{#if active === 'True'}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		class="flex flex-col pl-2 pt-3 mr-3 h-16 bg-primary rounded-lg snap-start"
		on:click={changeActive}
	>
		<div class="text-agray-200 font-medium text-xs font-primary w-32">{label}</div>
		<div class="text-agray-200 font-primary font-semibold text-header5">{amount}</div>
	</div>
{:else}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		class="flex flex-col pl-2 pt-3 mr-3 h-16 bg-agray-200 rounded-lg snap-start"
		on:click={changeActive}
	>
		<div class="text-agray-500 font-medium text-xs font-primary w-32">{label}</div>
		<div class="text-gdark font-primary font-semibold text-header5">{amount}</div>
	</div>
{/if}
