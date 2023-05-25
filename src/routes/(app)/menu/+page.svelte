<script>
	// @ts-nocheck

	import Menu from '../../../components/Menu.svelte';
	import { authStore } from '../../../server/stores/stores';
	import { goto } from '$app/navigation';
	
	const redirect = () => {
		goto('/login');
	};
</script>

{#if $authStore}
	<Menu user={$authStore.user} />
{:else}
	<div on:load={redirect()} />
{/if}
