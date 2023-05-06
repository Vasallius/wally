<script>
	import CategoryRecord from '../../../components/CategoryRecord.svelte';
	import SettingsNav from '../../../components/SettingsNav.svelte';
	import PopUpCategory from '../../../components/PopUpCategory.svelte';

	export const name = 'wallet';
	let isModalOpen = false;
	let label = '';
	let edit = '';

	export let CategoryRecords = [
		{ id: 0, category: 'Shopping' },
		{ id: 1, category: 'Essentials' }
	];

	const openPopUp = () => {
		isModalOpen = true;
	};
</script>

<SettingsNav>Category</SettingsNav>

{#each CategoryRecords as item}
	<CategoryRecord category={item.category} />
{/each}

<div class="flex flex-col mt-auto relative">
	<button
		on:click={openPopUp}
		class="w-14 h-14 absolute bottom-8 right-8 rounded-full bg-primary text-3xl text-center text-white font-primary hover:opacity-90 pb-1"
	>
		+
	</button>
</div>

<div class="absolute z-50 h-full m-auto ">
	<PopUpCategory bind:isOpen={isModalOpen} {label} />
</div>
