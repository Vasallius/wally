<script>
	import { Bell } from 'svelte-bootstrap-icons';
    export let notifcount = 42;
</script>

<a href="/notification" class="relative mr-1">
    {#if notifcount > 9}
        <div class="flex items-center justify-center rounded-full bg-secondary text-white text-[7px] font-[700] absolute right-[-3px] top-[-2px] h-[13px] w-[13px]">{notifcount}</div>
    {:else if notifcount > 0}
        <div class="flex items-center justify-center rounded-full bg-secondary text-white text-[9px] font-[600] absolute right-[-3px] top-[-2px] h-[13px] w-[13px]">{notifcount}</div>
    {/if}
    <Bell fill="var(--agray-600)" width={22} height={22} />
</a>
