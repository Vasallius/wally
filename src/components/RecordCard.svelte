<script lang="ts">
	// @ts-nocheck
	export let category: string;
	export let wallet: string;
	export let wallet2: string;
	export let amount: number;
	export let date: string;
	export let recordType: string;

	import { activeWalletStore } from '$stores/stores';
</script>

<div class="RecordCard px-5 pt-3 pb-3 border-b border-agray-400">
	<div class="flex justify-between">
		<div class="font-semibold text-header5 font-primary text-agray-700">{category}</div>
		{#if recordType == 'income'}
			<div class="text-primary font-primary font-semibold">+{amount}</div>
		{:else if recordType == 'expense'}
			<div class="text-secondary font-primary font-semibold">-{amount}</div>
		{:else}
			<div class="text-tertiary font-primary font-semibold">
				{`${$activeWalletStore.name === wallet ? '-' : '+'}${amount >= 0 ? amount : amount * -1}`}
			</div>
		{/if}
	</div>
	<div class="flex justify-between">
		{#if recordType == 'transfer'}
			<div class="text-xs leading-3 font-primary text-agray-500">
				{`${
					$activeWalletStore.name === wallet
						? `Transferred from ${wallet2}`
						: `Transferred into ${wallet2}`
				}`}
			</div>
		{:else}
			<div class="text-xs leading-3 font-primary text-agray-500">{wallet}</div>
		{/if}
		<div class="text-xs font-primary text-agray-500">{date}</div>
	</div>
</div>
