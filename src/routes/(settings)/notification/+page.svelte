<script lang="ts">
	import { goto } from '$app/navigation';
	import NotificationRecord from '$components/NotificationRecord.svelte';
	import SettingsNav from '$components/SettingsNav.svelte';
	import { authStore, notificationsStore } from '$stores/stores';

	export const name = 'wallet';

	const redirect = () => {
		goto('/login');
	};
</script>

{#if $authStore}
	<SettingsNav redirect="dashboard">Notification</SettingsNav>
	{#if $notificationsStore}
		{#each $notificationsStore as item}
			<NotificationRecord title={item.title} content={item.content} />
		{/each}
	{/if}
{:else}
	<div on:load={redirect} />
{/if}
