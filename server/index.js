const { MongoClient } = require('mongodb');

const main = async () => {
  const uri = 'mongodb://127.0.0.1:27017';
  const client = new MongoClient(uri);

  try {
    await client.connect();

    // await listDatabases(client);

    let newListing = {
      "title": "Monokatari",
      "author": "Meme Oshino",
      "pages": 690,
      "genres": ["fantasy", "adventure", "avant-garde"],
      "rating": 10
    };

    // await addListing(client, newListing);
    
    let filter = {
      "rating": {$lte: 10},
    };

    await findListing(client, filter);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

const listDatabases = async (client) => {
  const databaseList = await client.db().admin().listDatabases();
  console.log("Databases:");
  databaseList.databases.forEach(db => {
    console.log(db['name']);
  });
}

const addListing = async (client, newListing) => {
  const query = await client.db("bookstore").collection("books").insertOne(newListing);
  console.log(`Successful find with ID ${query.insertedId}`);
}

const findListing = async (client, filter) => {
  const query = await client.db("bookstore").collection("books").find(filter);
  const res = await query.toArray();
  console.log(res);
}

main().catch(console.error);