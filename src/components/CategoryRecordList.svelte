<script>
	// @ts-nocheck
	import { getCategories } from '../server/routes/dashboard_routes/dashboardCardsAPI';
	import CategoryRecord from './CategoryRecord.svelte';
	import { onMount } from 'svelte';
	import { authStore, categoriesStore } from '../server/stores/stores';

	export let user;

	onMount(async () => {
		// Fetch the data from the database
		const categories = await getCategories($authStore.user.uid);

		// Initialize the store value
		categoriesStore.set(categories);
	});
</script>

{#if $categoriesStore}
	{#each $categoriesStore as category}
		<CategoryRecord {category} />
	{/each}
{:else}
	<p>Loading user data...</p>
{/if}
