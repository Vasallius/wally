<script>
  import { onMount } from 'svelte';
  let loggedIn = false;
  /**
	 * @type {any[]}
	 */
  let booksRead = [];
  onMount(
    async () => {
      if (localStorage.getItem("loggedIn") !== null) {
        // loggedIn = (localStorage.getItem("loggedIn") !== null ? localStorage.getItem("loggedIn") : false);
        loggedIn = localStorage.getItem("loggedIn");
        const body = {userID: localStorage.getItem("userID")};
        await fetch("http://127.0.0.1:3002/userbooks", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(body)
        }).then(res => res.json())
        .then(data => {
          console.log(data);
          data.forEach((/** @type {{ title: any; author: any; pages: any; rating: any; genres: any; }} */ content) => {
            booksRead = [...booksRead, {
              title: content.title,
              author: content.author,
              pages: content.pages,
              rating: content.rating,
              genres: content.genres,
            }];
          });
          console.log(booksRead, "meg");
        });
      }
    }
  );
</script>


{#if loggedIn}
  <h1>You passed!</h1>
  {#each booksRead as books}
    <h3>{books.title}</h3>
    <h3>{books.author}</h3>
    <h3>{books.pages}</h3>
    <h3>{books.rating}</h3>
  {/each}
  <a href="/">Home</a>
{:else}
  Go back to <a href="/">Home</a>
{/if}
