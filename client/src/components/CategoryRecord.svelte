<script lang="ts">
	export let category: string;
	import { BagHeartFill, ThreeDotsVertical } from 'svelte-bootstrap-icons';
</script>

<a href="/" class="flex flex-row px-4 py-4 justify-between border-b">
	<div class="flex flex-row gap-4">
		<div class="bg-light-green p-3 rounded-full">
			<BagHeartFill fill="var(--primary)" width={20} height={20} />
		</div>
		<div class="flex flex-col justify-center">
			<h1 class="text-base text-agray-700 font-bold align-center">{category}</h1>
		</div>
	</div>
	<div class="flex flex-col justify-center">
		<ThreeDotsVertical fill="var(--agray-500)" height={20} width={20} />
	</div>
</a>

<style>
	a:visited {
		background: var(--agray-50);
	}
</style>
