<script lang="ts">
	import EditBudgetModal2 from "./EditBudgetModal2.svelte";

	export let title: string;
	export let budgetSpent: number;
	export let budget: number;
	export let interval: string;
	$: percent = (budgetSpent / budget) * 100;

	let isModalOpen = false;

	const openPopUp = () => {
		isModalOpen = true;
	};

	function handleEditClick() {
		openPopUp();
	}
</script>

<button on:click={handleEditClick} class="flex flex-col px-8 py-4 justify-between border-b hover:bg-agray-50 w-full">
	<div class="flex flex-row justify-between w-full items-center">
		<h1 class="text-agray-700 font-semibold pb-1">{title}</h1>
		<p class="text-xs text-agray-600">₱{budgetSpent}/₱{budget}</p>
	</div>
	<div class="flex w-full bg-gray-200 rounded-full h-2">
		{#if budgetSpent > budget}
			<div class="flex bg-accent-pink h-2 rounded-full" style="width: {percent}%" />
		{:else if percent >= 75}
			<div class="flex bg-accent-yellow h-2 rounded-full" style="width: {percent}%" />
		{:else}
			<div class="flex bg-primary h-2 rounded-full" style="width: {percent}%" />
		{/if}
	</div>
</button>

<EditBudgetModal2 bind:isOpen={isModalOpen} label={title} interval={interval}/>