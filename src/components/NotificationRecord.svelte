<script lang="ts">
	export let title: string;
	export let content: string;
	import { CalendarCheckFill } from 'svelte-bootstrap-icons';
</script>

<a href="/" class="flex flex-row px-4 py-4 justify-between border-b">
	<div class="flex flex-row gap-4">
		<div class="bg-light-green p-3 rounded-full">
			<CalendarCheckFill fill="var(--primary)" width={20} height={20} />
		</div>
		<div class="flex flex-col">
			<h1 class="text-base text-agray-700 font-bold">{title}</h1>
			<p class="text-xs text-agray-500">{content}</p>
		</div>
	</div>
</a>

<style>
	a:visited {
		background: var(--agray-50);
	}
</style>
