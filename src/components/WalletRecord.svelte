<script lang="ts">
	// @ts-nocheck
	import { Trash } from 'svelte-bootstrap-icons';
	import { walletStores } from '../server/stores/stores';

	export let title: string;
	export let balance: number;

	function handleDeleteClick() {
		let wallets = $walletStores;
		wallets = wallets.filter((wallet) => wallet.name != title);
		walletStores.set(wallets);
	}
</script>

<div class="flex flex-row px-8 py-4 justify-between border-b hover:bg-agray-50 items-center">
	<div class="flex flex-col">
		<h1 class="text-base text-agray-700 font-semibold">{title}</h1>
		<p class="text-xs text-agray-600">₱{balance}</p>
	</div>
	<button on:click={handleDeleteClick}>
		<Trash fill="#00C09F" />
	</button>
</div>
