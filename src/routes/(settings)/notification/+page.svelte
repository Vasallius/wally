<script>
	// @ts-nocheck

	import NotificationRecord from '../../../components/NotificationRecord.svelte';
	import SettingsNav from '../../../components/SettingsNav.svelte';

	// import { notificationsList } from '../../../server/routes/notificationsAndAlertsAPI';
	import { notificationsStore } from '../../../server/stores/stores';
	export const name = 'wallet';
</script>

<SettingsNav redirect="dashboard">Notification</SettingsNav>
{#if $notificationsStore.length > 0}
	{#each $notificationsStore as item}
		<NotificationRecord title={item.title} content={item.content} />
	{/each}
{/if}
