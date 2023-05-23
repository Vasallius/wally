<script lang="ts">
	// @ts-nocheck
	export let category: string;
	export let options = '';
	import { BagHeartFill, ThreeDotsVertical } from 'svelte-bootstrap-icons';
	import { authStore, categoriesStore, recordsStore } from '../server/stores/stores';
	import {
		updateRecords,
		updateCategories,
	} from '../server/routes/dashboard_routes/dashboardCardsAPI';
	import EditModal from './EditModal.svelte';

	let isModalOpen = false;
	let label = '';

	function handleDeleteClick() {
		let records = $recordsStore.filter((data) => data.wallet != category);
		recordsStore.set(records);
		let categories = $categoriesStore;
		categories = categories.filter((categ) => categ != category);
		// Check if there are still categories
		// if (categories.length > 0) {
		// 	let activeWallet = getActiveWallet(wallets);
		// 	if (activeWallet != null) {
		// 		// Do nothing
		// 	} else {
		// 		// If there is no active wallet, set first wallet to active
		// 		wallets[0].active = 'True';
		// 	}
		// } else {
		// 	console.log('No more wallets to delete');
		// }
		categoriesStore.set(categories);

		// Update Firebase
		updateCategories($authStore.user.uid, categories);
		updateRecords($authStore.user.uid, records);
	}

	const openPopUp = () => {
		isModalOpen = true;
	}

	function handleEditClick() {
		openPopUp();
	}
$: {
	if(options == "Delete"){
		handleDeleteClick();
	}else if(options == "Edit"){
		isModalOpen = true;
	}
}
</script>

<!-- changed from a to div muna --> 
<div class="flex flex-row px-4 py-4 justify-between border-b">
	<div class="flex flex-row gap-4">
		<div class="bg-light-green p-3 rounded-full">
			<BagHeartFill fill="var(--primary)" width={20} height={20} />
		</div>
		<div class="flex flex-col justify-center">
			<h1 class="text-base text-agray-700 font-semibold align-center">{category}</h1>
		</div>
	</div>
	<div class="flex flex-col justify-center">
		<!--<button>
			<ThreeDotsVertical fill="var(--agray-500)" height={20} width={20} />	
		</button>-->
		<select id="options" bind:value={options} class="focus:outline-none text-agray-700 bg-transparent border-transparent w-10 font-primary text-sm"> 
			<option value=""></option>
			<option value="Delete">Delete</option>
			<option value="Edit">Edit</option>
		</select>	
	</div>
</div>

<style>
	div:visited {
		background: var(--agray-50);
	}
</style>
