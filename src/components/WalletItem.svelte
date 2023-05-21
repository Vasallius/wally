<script lang="ts">
	import { getWallets } from '../server/routes/dashboard_routes/dashboardCardsAPI';
	import { updateWallets } from '../server/routes/dashboard_routes/dashboardCardsAPI';
	import { authStore, walletStores } from '../server/stores/stores';

	export let label: string;
	export let amount: string;
	export let active: string;
	const changeActive = async () => {
		let wallets = await getWallets($authStore.user.uid);
		wallets = wallets.map((wallet) => {
			if (wallet.name == label) {
				wallet.active = 'True';
			} else {
				wallet.active = 'False';
			}

			return wallet;
		});
		console.log(wallets);
		walletStores.set(wallets);
		updateWallets($authStore.user.uid, wallets);
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
