<script>
  import { onMount } from 'svelte';
  let loggedIn = false;
  onMount(
    () => {
      if (localStorage.getItem("loggedIn") !== null) {
        loggedIn = localStorage.getItem("loggedIn");
      }
    }
  );
</script>

{#if loggedIn}
  <h1>You passed!</h1>
  <a href="/">Home</a>
{:else}
Go back to <a href="/">Home</a>
{/if}
