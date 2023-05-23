<script>
	import SettingsNav from '../../../components/SettingsNav.svelte';
	import PopUpCategory from '../../../components/PopUpCategory.svelte';
	import CategoryRecordList from '../../../components/CategoryRecordList.svelte';
	import { authStore } from '../../../server/stores/stores';
	export const name = 'wallet';
	let isModalOpen = false;
	let label = '';

	const openPopUp = () => {
		isModalOpen = true;
	};
</script>

<SettingsNav redirect="menu">Category</SettingsNav>

<div class="max-h-full flex flex-col overflow-y-scroll">
	<CategoryRecordList user={$authStore.user} />
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
	<PopUpCategory bind:isOpen={isModalOpen} {label} />
</div>

<style>
	::-webkit-scrollbar {
		width: 4px;
	}

	::-webkit-scrollbar-track {
		background: #ffffff00;
	}

	::-webkit-scrollbar-thumb {
		background: #e3e3e3;
		border-radius: 10px;
	}
</style>
