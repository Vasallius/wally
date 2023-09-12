<script>
	// @ts-nocheck

	import { goto } from '$app/navigation';
	import Menu from '../../../components/Menu.svelte';
	import { authStore } from '../../../server/stores/stores';

	const redirect = () => {
		goto('/login');
	};
</script>

{#if $authStore}
	<Menu user={$authStore.user} />
{:else}
	<div on:load={redirect()} />
{/if}
