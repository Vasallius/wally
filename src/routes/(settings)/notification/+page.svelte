<script>
	// @ts-nocheck

	import NotificationRecord from '../../../components/NotificationRecord.svelte';
	import SettingsNav from '../../../components/SettingsNav.svelte';

	import { notificationsList } from '../../../server/routes/notificationsAndAlertsAPI';
	import { authStore } from '../../../server/stores/stores';
	export const name = 'wallet';
	let budgetsList = [];
	(async () => {
		budgetsList = await notificationsList($authStore.user.uid).then((val) => val);
	})();
</script>

<SettingsNav redirect="dashboard">Notification</SettingsNav>
{#if budgetsList.length > 0}
	{#each budgetsList as item, ind}
		<NotificationRecord title={item.title} content={item.content} />
	{/each}
{:else}
	<p>No notifications</p>
{/if}