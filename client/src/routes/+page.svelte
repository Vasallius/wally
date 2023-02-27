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
      data.forEach((/** @type {string} */ val) => {
        console.log(val);
      })
    });
  }

  const submit = async () => {
    let body = {username, password};
    console.log(body);
    await fetch("http://127.0.0.1:3002/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(dat => {
      if (dat !== null) {
        loggedIn = !loggedIn;
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("userID", dat);
      }
    });
  }

  const logout = () => {
    loggedIn = !loggedIn;
    localStorage.setItem("loggedIn", "false");
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("userID");
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
    <h1>Test App</h1>
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
    <p>Sign up <a href="/signup">here</a></p>
  {:else}
    <h1>Yay!</h1>
    <h4><a href="/test">Test</a></h4>
    <button on:click={logout}>Log Out</button>
    
  {/if}
  
</div>