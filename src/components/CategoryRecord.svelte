<script lang="ts">
	// @ts-nocheck
	export let category: string;
	export let options = '';
	import { BagHeartFill, ThreeDotsVertical, TrashFill } from 'svelte-bootstrap-icons';
	import { authStore, categoriesStore, recordsStore } from '../server/stores/stores';
	import {
		updateRecords,
		updateCategories,
	} from '../server/routes/dashboard_routes/dashboardCardsAPI';
	import EditCategoryModal from './EditCategoryModal.svelte';

	let isModalOpen = false;
	let label = '';

	function handleDeleteClick() {
		let val = confirm(`Are you sure you want to delete this category?`);
		if (val) {
			let records = $recordsStore.filter((data) => data.wallet != category);
			recordsStore.set(records);
			let categories = $categoriesStore;
			categories = categories.filter((categ) => categ != category);
			categoriesStore.set(categories);

			updateCategories($authStore.user.uid, categories);
			updateRecords($authStore.user.uid, records);
		}
		
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
	}
}
</script>

<!-- changed from a to div muna --> 
<div class="flex flex-row px-4 py-4 justify-between border-b hover:bg-agray-50 items-center">
	<button on:click={handleEditClick} class="w-full">
		<div class="flex flex-row gap-4">
			<div class="bg-light-green p-3 rounded-full">
				<BagHeartFill fill="var(--primary)" width={20} height={20} />
			</div>
			<div class="flex flex-col justify-center">
				<h1 class="text-base text-agray-700 font-semibold align-center">{category}</h1>
			</div>
		</div>
	</button>
	<button on:click={handleDeleteClick}>
		<TrashFill class="fill-agray-400 hover:fill-secondary"/>
	</button>
</div>

<EditCategoryModal bind:isOpen={isModalOpen} {label} {category} />