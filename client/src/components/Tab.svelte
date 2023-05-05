<script>
	import { getContext } from 'svelte';
	import { TABS } from './Tabs.svelte';

	const tab = {};
	const { registerTab, selectTab, selectedTab } = getContext(TABS);
	registerTab(tab);
</script>

<style>
	.selected {		
        background-color: rgb(220, 220, 220);
		color: #3e3e3e;
	}
</style>

<button class:selected="{$selectedTab === tab}" 
    class="hover:outline hover:outline-1 hover:outline-agray-400 bg-agray-100 text-xs py-2.5 rounded-lg font-primary font-medium text-agray-500 px-3 mb-2"
    on:click="{() => selectTab(tab)}">
	<slot></slot>
</button>