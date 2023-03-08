<script>
// @ts-nocheck

  import { onMount } from 'svelte';
  let loggedIn = false;
  let addNewBook = false;
  let newBook = {
    title: "",
    author: "",
    pages: 0,
    genres: [],
    rating: 0,
    userID: "",
  };
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
          data.forEach( content => {
            booksRead = [...booksRead, {
              title: content.title,
              author: content.author,
              pages: content.pages,
              rating: content.rating,
              genres: content.genres,
              _id: content._id,
            }];
          });
          // booksRead = booksRead;
        });
      }
    }
  );

  const addNewBookFunction = () => {
    addNewBook = true;
    loggedIn = false;
  }

  const cancel = () => {
    addNewBook = false;
    loggedIn = true;
  }

  const submitNewBook = async () => {
    const body = {
      title: newBook["title"],
      author: newBook["author"],
      pages: newBook["pages"],
      rating: newBook["rating"],
      userID: localStorage.getItem("userID"),
    };
    await fetch("http://127.0.0.1:3002/addnewbook", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    })
    addNewBook = false;
    loggedIn = true;
  }

  const deleteEntry = async (entryID) => {
    await fetch("http://127.0.0.1:3002/deleteEntry", {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({entryID}),
    });
    // booksRead = booksRead;
  }

</script>


{#if loggedIn}
  <h1>You passed!</h1>
  {#each booksRead as books}
    <div>
      <span>{books.title}</span>
      <span>{books.author}</span>
      <span>{books.pages}</span>
      <span>{books.rating}</span>
      <button on:click={() => {
        console.log(books);
        deleteEntry(books._id);
      }}>X</button>
    </div>
  {/each}
  <button on:click={addNewBookFunction}>Add new book</button>
  <a href="/">Home</a>
{:else if addNewBook}
  <form>
    <label>
      Title:
      <input type="text" bind:value={newBook["title"]} />
    </label>
    <label>
      Author:
      <input type="text" bind:value={newBook["author"]} />
    </label>
    <label>
      Pages:
      <input type="number" bind:value={newBook["pages"]} />
    </label>
    <label>
      Rating:
      <input type="number" bind:value={newBook["rating"]} />
    </label>
    <button on:click={cancel}>Cancel</button>
    <button on:click={submitNewBook}>Submit</button>
  </form>
{:else}
  Go back to <a href="/">Home</a>
{/if}
