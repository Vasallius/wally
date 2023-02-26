<script>
	import { onMount } from 'svelte';


// @ts-nocheck
  
  let loggedIn = false;
  let username = "test";
  let password = "test";
  const clicked = async () => {
    await fetch("http://127.0.0.1:3002/listdatabases", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      }
    })
    .then(res => res.json())
    .then(data => {
      data.forEach((val) => {
        console.log(val);
      })
    });
  }

  const submit = async () => {
    let body = {username, password};
    console.log(body);
    localStorage.setItem("loggedIn", true);
    await fetch("http://127.0.0.1:3002/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(dat => {
      if (dat) {
        loggedIn = !loggedIn;
      }
    });
  }

  const logout = () => {
    loggedIn = !loggedIn;
    localStorage.setItem("loggedIn", false);
    localStorage.removeItem("loggedIn");
  }

  onMount(
    () => {
      if (localStorage.getItem("loggedIn") !== null) {
        loggedIn = localStorage.getItem("loggedIn");
      }
    }
  );

</script>
<div>
  {#if !loggedIn}
    <h1>Welcome to SvelteKit</h1>
    <p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
    <form>
      <label>
        Username:
        <input type="text" name="username" bind:value={username}/>
      </label>
      <label>
        Password:
        <input type="password" name="password" bind:value={password}/>
      </label>
      <button on:click={submit}>Click me</button>
    </form>
    <h1>{username}</h1>
    <h2>{password}</h2>
  {:else}
    <h1>Yay!</h1>
    <button on:click={logout}>Log Out</button>
    <a href="/test">Test</a>
  {/if}
  
</div>