<script>
	import Menu from '../../../components/Menu.svelte';
	import { authStore } from '../../../server/stores/stores';
</script>

<Menu user={$authStore.user} />
