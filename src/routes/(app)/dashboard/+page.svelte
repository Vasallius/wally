<script>
	// @ts-nocheck

	import DashboardSummary from './../../../components/DashboardSummary.svelte';
	import { logOut } from '../../../server/routes/usersAPI';
	import Wallet from '../../../components/Wallet.svelte';
	import RecordBar from '../../../components/RecordBar.svelte';
	import { authStore, recordsStore } from '../../../server/stores/stores';
	import Records from '../../../components/Records.svelte';
	import Addrecord from '../../../components/Addrecord.svelte';

	async function handleLogout() {
		await logOut();
	}

	let isModalOpen = false;

	const openPopUp = () => {
		isModalOpen = true;
	};

	const updateRecords = (e) => {
		recordsStore.set(e.detail);
	}
</script>

<!-- Check if the user is authenticated using the $authStore variable -->

{#if $authStore}
	<button on:click={handleLogout}>Logout</button>
	<div class:scroll-lock={isModalOpen}>
		<DashboardSummary user={$authStore.user} />
		<Wallet user={$authStore.user} recordsStore={recordsStore} on:updateRecords={updateRecords}/>
		<RecordBar user={$authStore.user} recordsStore={recordsStore} />		
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

