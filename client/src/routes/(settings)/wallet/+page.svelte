<script>
	// @ts-nocheck

	import SettingsNav from '../../../components/SettingsNav.svelte';
	import WalletRecordList from '../../../components/WalletRecordList.svelte';
	import PopUpWallet from '../../../components/PopUpWallet.svelte';
	import { authStore } from '../../../server/stores/stores';

	export const name = 'wallet';
	let isModalOpen = false;
	let label = '';
	let amount = 0;
	let WalletRecords = [
		{ id: 0, title: 'Cash', balance: 600 },
		{ id: 1, title: 'Maya', balance: 1200 },
		{ id: 2, title: 'Bank (BPI)', balance: 20000 }
	];

	const openPopUp = () => {
		isModalOpen = true;
	};
</script>

{#if $authStore}
	<SettingsNav>Wallet</SettingsNav>
	<WalletRecordList user={$authStore.user} />
	<!-- {#each WalletRecords as item}
		<WalletRecord title={item.title} balance={item.balance} />
	{/each} -->

	<div class="flex flex-col mt-auto relative">
		<button
			on:click={openPopUp}
			class="w-14 h-14 absolute bottom-8 right-8 rounded-full bg-primary text-3xl text-center text-white font-primary hover:opacity-90 pb-1"
		>
			+
		</button>
	</div>

	<div class="absolute z-50 h-full m-auto ">
		<PopUpWallet bind:isOpen={isModalOpen} {label} {amount} />
	</div>
	<div>{$authStore.user.email}</div>
{:else}
	<div>You must be authenticated to access the dashboard.</div>
{/if}
