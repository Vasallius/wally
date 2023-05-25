<script>
// @ts-nocheck

	import Addrecord from '../../../components/Addrecord.svelte';
	import { authStore } from '../../../server/stores/stores';
	import { goto } from '$app/navigation';
	let isModalOpen = false;

	const openPopUp = () => {
		isModalOpen = true;
	};
	
	const redirect = () => {
		goto('/login');
	};
</script>
{#if $authStore}
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
	<div on:load={redirect()} />
{/if}

