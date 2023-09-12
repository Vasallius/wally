<script>
	// @ts-nocheck

	import { goto } from '$app/navigation';
	import { authStore, notificationsStore } from '$stores/stores';
	import NotificationRecord from '../../../components/NotificationRecord.svelte';
	import SettingsNav from '../../../components/SettingsNav.svelte';
	export const name = 'wallet';
	const redirect = () => {
		goto('/login');
	};
</script>

{#if $authStore}
	<SettingsNav redirect="dashboard">Notification</SettingsNav>
	{#if $notificationsStore.length > 0}
		{#each $notificationsStore as item}
			<NotificationRecord title={item.title} content={item.content} />
		{/each}
	{/if}
{:else}
	<div on:load={redirect()} />
{/if}
