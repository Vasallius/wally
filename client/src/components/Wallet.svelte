<script>
	// @ts-nocheck

	import WalletItem from './WalletItem.svelte';

	import { getDashboardRecords, getMonthlySummary, getWallets } from '../server';
	let monthlySummary, records;
	let wallets = [];
	export let user;

	{
		(async () => {
			if (user) {
				monthlySummary = await getMonthlySummary(user.uid).then((val) => val);
				records = await getDashboardRecords(user.uid).then((val) => val);
				wallets = await getWallets(user.uid).then((val) => val);
			} else {
			}
		})();
	}
</script>

<div class="flex mx-3 mt-3.5 mb-1.5">
	<div class="text-header5 font-primary font-semibold">Wallets</div>
</div>
<div class="flex carousel mx-3">
	{#each wallets as wallet}
		<WalletItem label={wallet.name} amount={wallet.balance} active={wallet.active} />
	{/each}
</div>
