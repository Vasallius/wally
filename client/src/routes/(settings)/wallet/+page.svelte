<script>
	import SettingsNav from '../../../components/SettingsNav.svelte';
	import WalletRecord from '../../../components/WalletRecord.svelte';
	import PopUpWallet from '../../../components/PopUpWallet.svelte';
	
	export const name = 'wallet';
	let isModalOpen = false;
  	let label = '';
  	let amount = 0;

  	const openPopUp = () => {
    	isModalOpen = true;
  	};
		
</script>

<SettingsNav>Wallet</SettingsNav>
<WalletRecord title="Cash" balance={600} />
<WalletRecord title="Gcash" balance={700} />

<div class="flex flex-col mt-auto relative">
	<button on:click={openPopUp} class="w-14 h-14 absolute bottom-8 right-8 rounded-full bg-primary text-3xl text-center text-white font-primary hover:opacity-90 pb-1"> + </button>
</div>

<div class="absolute z-50 h-full m-auto ">
	<PopUpWallet
		isOpen={isModalOpen}
		label={label}
		amount={amount}
	/>
</div>