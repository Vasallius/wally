<script lang="ts">
	import { goto } from '$app/navigation';
	import Menu from '$components/Menu.svelte';
	import { authStore } from '$stores/stores';

	const redirect: EventListener = () => {
		goto('/login');
	};
</script>

{#if $authStore}
	<Menu user={$authStore.user} />
{:else}
	<div on:load={redirect} />
{/if}
