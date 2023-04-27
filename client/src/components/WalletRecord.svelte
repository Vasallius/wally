<script lang="ts">
	export let title: string;
	export let balance: number;
	export let options = '';
	import { ThreeDots } from 'svelte-bootstrap-icons';
</script>

<!-- changed from a to div muna -->
<div class="flex flex-row px-8 py-4 justify-between border-b hover:bg-agray-50">
	<div class="flex flex-col">
		<h1 class="text-base text-agray-700 font-semibold">{title}</h1>
		<p class="text-xs text-agray-600">₱{balance}</p>
	</div>
	<!--
	<div class="flex flex-col justify-center">
		<ThreeDots fill="var(--agray-500)" height="1.2rem" width="1.2rem" />
	</div>
	-->
	<select id="options" bind:value={options} class="focus:outline-none text-agray-700 bg-transparent border-transparent w-6 font-primary text-sm rounded"> 
		<option value=""></option>
		<option value="Delete">Delete</option>
		<option value="Edit">Edit</option>
	</select>	
</div>
