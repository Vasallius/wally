<!-- WalletItem.svelte -->

<script lang="ts">
	import type { list } from 'postcss';
	import {
		getWallets,
		getDashboardRecords,
		getActiveWallet,
		editWallet
	} from '../server/routes/dashboard_routes/dashboardCardsAPI';
	import { authStore, walletStores, recordsStore } from '../server/stores/stores';

	export let label: string;
	export let amount: string;
	export let active: string;
	export let index: number;
	const changeActive = async () => {
		const wallets = await getWallets($authStore.user.uid);
		let reind = 0;
		for (let i = 0; i < wallets.length; i++) {
			if (wallets[i].active == 'True') {
				reind = i;
				break;
			}
		}
		const val = await editWallet($authStore.user.uid,index,{active: "True"});
		const val2 = await editWallet($authStore.user.uid,reind,{active: "False"});
		const currentActiveWallet = await getActiveWallet($authStore.user.uid);
		$walletStores = await getWallets($authStore.user.uid);
		$recordsStore = await getDashboardRecords($authStore.user.uid, currentActiveWallet);
	};
</script>

{#if active === 'True'}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class="flex flex-col pl-2 pt-3 mr-3 grow h-16 bg-primary rounded-lg" on:click={changeActive}>
		<div class="text-agray-200 font-medium text-xs font-primary">{label}</div>
		<div class="text-agray-200 font-primary font-semibold text-header5">{amount}</div>
	</div>
{:else}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		class="flex flex-col pl-2 pt-3 mr-3 grow h-16 bg-agray-200 rounded-lg"
		on:click={changeActive}
	>
		<div class="text-agray-500 font-medium text-xs font-primary">{label}</div>
		<div class="text-gdark font-primary font-semibold text-header5">{amount}</div>
	</div>
{/if}
