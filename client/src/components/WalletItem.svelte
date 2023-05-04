<!-- WalletItem.svelte -->

<script lang="ts">
    export let label: string;
    export let amount: string;
    export let active: string;
  </script>
  
  {#if active === 'True'}
    <div class="flex flex-col pl-2 pt-3 mr-3 grow h-16 bg-primary rounded-lg">
      <div class="text-agray-200 font-medium text-xs font-primary">{label}</div>
      <div class="text-agray-200 font-primary font-semibold text-header5">{amount}</div>
    </div>
  {:else}
    <div class="flex flex-col pl-2 pt-3 mr-3 grow h-16 bg-agray-200 rounded-lg">
      <div class="text-agray-500 font-medium text-xs font-primary">{label}</div>
      <div class="text-gdark font-primary font-semibold text-header5">{amount}</div>
    </div>
  {/if}
  