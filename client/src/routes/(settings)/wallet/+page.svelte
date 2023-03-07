<script>
	import SettingsNav from '../../../components/SettingsNav.svelte';
	import WalletRecord from '../../../components/WalletRecord.svelte';

	export const name = 'wallet';
</script>

<SettingsNav>Wallet</SettingsNav>
<WalletRecord title="Cash" balance={600} />
<WalletRecord title="Gcash" balance={700} />
