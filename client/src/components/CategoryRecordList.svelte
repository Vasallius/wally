<script>
	// @ts-nocheck
	import { getCategories } from '../server/routes/dashboard_routes/dashboardCardsAPI';
	import CategoryRecord from './CategoryRecord.svelte';
	export let user;

	// Retrieve the user's wallets from the server
	async function fetchCategories() {
		return getCategories(user.uid);
	}

	let promise = fetchCategories();
</script>

{#await promise then categories}
	{#each categories as category}
		<CategoryRecord {category} />
	{/each}
{:catch error}
	<div class="error">Error: {error.message}</div>
{/await}
