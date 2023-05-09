<script>
	// @ts-nocheck

	import DashboardSummary from './../../../components/DashboardSummary.svelte';
	import { logOut } from '../../../server/routes/usersAPI';
	import {
		getDashboardRecords,
		getMonthlySummary,
		getWallets,
		addRecord,
		getRecord,
		deleteRecord,
		editRecord,
		deleteCategory,
		editCategory
	} from '../../../server';
	import Wallet from '../../../components/Wallet.svelte';
	import RecordBar from '../../../components/RecordBar.svelte';
	import { authStore } from '../../../server/stores/stores';
	import { goto } from '$app/navigation';
	import Records from '../../../components/Records.svelte';
	import Addrecord from '../../../components/Addrecord.svelte';

	let monthlySummary = [0, 0];
	let records = [];
	let wallets = [
		{ name: 'wah', balance: -1 },
		{ name: 'wah', balance: -1 }
	];

	(
		async () => {
			// let ret = await editCategory($authStore.user.uid, 2, "Sample Category").then(val => val);
			// console.log(ret)
		}
	)();

	async function handleLogout() {
		const success = await logOut();
	}

	let isModalOpen = false;

	const openPopUp = () => {
		isModalOpen = true;
	};
</script>

{#if $authStore}
	<button on:click={handleLogout}>Logout</button>
	<div>
		<DashboardSummary user={$authStore.user} />
		<Wallet user={$authStore.user} />
		<RecordBar />
		<Records user={$authStore.user} />
	</div>

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
