<script>
	import NotificationRecord from '../../../components/NotificationRecord.svelte';
	import SettingsNav from '../../../components/SettingsNav.svelte';

	export const name = 'wallet';
</script>

<SettingsNav>Notification</SettingsNav>
<NotificationRecord
	title="Reminder: Add today’s transaction"
	content="Lorem Ipsum"
	timePassed={1}
/>
<NotificationRecord
	title="Reminder: Add today’s transaction"
	content="Lorem Ipsum"
	timePassed={2}
/>
<NotificationRecord
	title="Reminder: Add today’s transaction"
	content="Lorem Ipsum"
	timePassed={3}
/>
