<script>
	import Addrecord from '../../../components/Addrecord.svelte';
	let isModalOpen = false;

	const openPopUp = () => {
		isModalOpen = true;
	};
</script>

<div class="flex flex-col mt-auto relative">
	<button
		on:click={openPopUp}
		class="w-14 h-14 absolute bottom-8 right-8 rounded-full bg-primary text-3xl text-center text-white font-primary hover:opacity-90 pb-1"
	>
		+
	</button>
</div>

<div class="absolute z-50 h-full m-auto ">
	<Addrecord isOpen={isModalOpen} />
</div>
