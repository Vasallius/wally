<script>
	// @ts-nocheck

	import { goto } from '$app/navigation';
	import { authStore } from '$stores/stores';
	import PopUpWallet from '../../../components/PopUpWallet.svelte';
	import SettingsNav from '../../../components/SettingsNav.svelte';
	import WalletRecordList from '../../../components/WalletRecordList.svelte';

	export const name = 'wallet';
	let isModalOpen = false;
	let label = '';
	let amount = 0;

	const openPopUp = () => {
		isModalOpen = true;
	};

	const redirect = () => {
		goto('/login');
	};
</script>

{#if $authStore}
	<SettingsNav redirect="menu">Wallet</SettingsNav>

	<div class="max-h-full flex flex-col overflow-y-scroll">
		<WalletRecordList />
	</div>

	<div class="flex flex-col mt-auto relative">
		<button
			on:click={openPopUp}
			class="w-14 h-14 absolute bottom-8 right-8 rounded-full bg-primary text-3xl text-center text-white font-primary hover:opacity-90 pb-1"
		>
			+
		</button>
	</div>

	<div class="absolute z-50 h-full m-auto">
		<PopUpWallet bind:isOpen={isModalOpen} {label} {amount} />
	</div>
{:else}
	<div on:load={redirect()} />
{/if}

<style>
	::-webkit-scrollbar {
		width: 0px;
	}

	::-webkit-scrollbar-track {
		background: #ffffff00;
	}

	::-webkit-scrollbar-thumb {
		background: #e3e3e300;
		border-radius: 10px;
	}
</style>
