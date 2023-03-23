<script lang="ts">
	export let title: string;
	export let balance: number;
    export let percent: number;
</script>

<a href="/" class="flex flex-col px-8 py-4 justify-between border-b hover:bg-agray-50">
	<div class="flex flex-row justify-between">
		<h1 class="text-base text-agray-700 font-semibold pb-1">{title}</h1>
        <p class="text-xs text-agray-600">₱{balance}</p>
    </div>
    <div class="flex w-full bg-gray-200 rounded-full h-2">
        <div class="flex bg-accent-green h-2 rounded-full" style="width: {percent}%"></div>
    </div>
</a>
