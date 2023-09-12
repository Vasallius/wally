<script>
	// @ts-nocheck

	import { goto } from '$app/navigation';
	import { authStore } from '$stores/stores';
	import Menu from '../../../components/Menu.svelte';

	const redirect = () => {
		goto('/login');
	};
</script>

{#if $authStore}
	<Menu user={$authStore.user} />
{:else}
	<div on:load={redirect()} />
{/if}
