<script>
	// @ts-nocheck

	import DashboardSummary from './../../../components/DashboardSummary.svelte';
	import { logOut } from '../../../server/routes/usersAPI';
	import Wallet from '../../../components/Wallet.svelte';
	import RecordBar from '../../../components/RecordBar.svelte';
	import { authStore } from '../../../server/stores/stores';
	import Records from '../../../components/Records.svelte';
	import Tabs from '../../../components/Tabs.svelte';
	import TabPanel from '../../../components/TabPanel.svelte';
	import Tab from '../../../components/Tab.svelte';
	import Addrecord from '../../../components/Addrecord.svelte';

	async function handleLogout() {
		await logOut();
	}

	let isModalOpen = false;

	const openPopUp = () => {
		isModalOpen = true;
	};
</script>

<!-- Check if the user is authenticated using the $authStore variable -->

{#if $authStore}
	<button on:click={handleLogout}>Logout</button>
	<div class:scroll-lock={isModalOpen}>
		<DashboardSummary user={$authStore.user} />
		<Wallet user={$authStore.user} />
		<RecordBar />
		<Records user={$authStore.user} />
	</div>

	<!-- Button is used to add records -->

	<button
		on:click={openPopUp}
		class="w-14 h-14 bottom-8 right-9 sm:left-[calc(50%+135px)] rounded-full bg-primary text-3xl text-center text-white font-primary hover:bg-[#01b99a] pb-1 fixed"
	>
		+
	</button>

	<div class="absolute z-50 h-full m-auto ">
		<Addrecord bind:isOpen={isModalOpen} />
	</div>

{:else}
	<div>You must be authenticated to access the dashboard.</div>
{/if}

<style>
	::-webkit-scrollbar {
  		width: 4px;
	}

	::-webkit-scrollbar-track { 
  		background: #ffffff00;
	}

	::-webkit-scrollbar-thumb { 
  		background: #E3E3E3;
		border-radius:10px;
	}
</style>