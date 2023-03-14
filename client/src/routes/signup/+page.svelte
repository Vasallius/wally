<script>
  let username = "";
  let fullname = "";
  let email = "";
  let password = "";

  const submit = async () => {
    const body = {username, fullname, email, password}
    await fetch("http://127.0.0.1:3002/signup", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    }).then(
      res => res.json()
    ).then(returnValue => {
      console.log(returnValue);
    });
  }
</script>
<form>
  <label>
    Username:
    <input type="text" bind:value={username}/>
  </label>
  <label>
    Full Name:
    <input type="text" bind:value={fullname} />
  </label>
  <label>
    Email:
    <input type="email" bind:value={email} />
  </label>
  <label>
    Password:
    <input type="password" bind:value={password} />
  </label>
  <button on:click={submit}>
    Submit
  </button>
</form>

<p>Welcome to Wally!</p>
<p>Build your own personalized wallet buddy</p>
<a href="/">Home</a>