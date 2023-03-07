<script lang="ts">
	export let title: string;
	export let balance: number;
	import { ThreeDots } from 'svelte-bootstrap-icons';
</script>

<a href="/" class="flex flex-row px-8 py-4 justify-between border-b hover:bg-agray-50">
	<div class="flex flex-col">
		<h1 class="text-base text-agray-700 font-bold">{title}</h1>
		<p class="text-xs text-agray-600">₱{balance}</p>
	</div>
	<div class="flex flex-col justify-center">
		<ThreeDots fill="var(--agray-500)" height="1.2rem" width="1.2rem" />
	</div>
</a>
