<script>
	// @ts-nocheck

	import DashboardSummary from './../../../components/DashboardSummary.svelte';
	import { logOut } from '../../../server/routes/usersAPI';
	import Wallet from '../../../components/Wallet.svelte';
	import RecordBar from '../../../components/RecordBar.svelte';
	import { authStore } from '../../../server/stores/stores';
	import Records from '../../../components/Records.svelte';
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
	<div>
		<DashboardSummary user={$authStore.user} />
		<Wallet user={$authStore.user} />
		<RecordBar />
		<Records user={$authStore.user} />
	</div>

	<!-- Button is used to add records -->

	<div class="flex flex-col mt-auto relative">
		<button
			on:click={openPopUp}
			class="w-14 h-14 absolute bottom-8 right-8 rounded-full bg-primary text-3xl text-center text-white font-primary hover:opacity-90 pb-1"
		>
			+
		</button>
	</div>

	<div class="absolute z-50 h-full m-auto ">
		<Addrecord bind:isOpen={isModalOpen} />
	</div>
{:else}
	<div>You must be authenticated to access the dashboard.</div>
{/if}
