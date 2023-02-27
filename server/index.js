const { MongoClient } = require('mongodb');
var ObjectId = require('mongodb').ObjectId;

const cors = require('cors');
const express = require('express');
const app = express();

app.use(express.json());
app.use(cors());

const uri = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri);

const main = async () => {  

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
      "_id": new ObjectId("63fb00227b5c287e4a6a0915")
    };

    // await findListing(client, filter);

    let newProperties = {
      "title": "Bumma",
      "author": "Takina Inoue",
      "pages": 400,
      "genres": ["action", "romance"],
      "rating": 7
    };

    // await updateListing(client, "Memenatari", newProperties);

  } catch (e) {
    console.error(e);
  }
}

const listDatabases = async (client) => {
  const databaseList = await client.db()
                                    .admin()
                                    .listDatabases();
  return databaseList;
}

const addListing = async (client, newListing) => {
  const query = await client.db("bookstore")
                            .collection("books")
                            .insertOne(newListing);
  console.log(`Successful find with ID ${query.insertedId}`);
}

const findListing = async (client, filter) => {
  const query = await client.db("bookstore")
                            .collection("books")
                            .find(filter);
  const res = await query.toArray();
  console.log(res);
}

const updateListing = async (client, filter, properties) => {
  // const objectId = new ObjectId(filter)  
  const query = await client.db("bookstore")
                            .collection("books")
                            .updateOne(filter, {$set: properties});
  // const result = await client.db("sample_airbnb").collection("listingsAndReviews")
  //                       .updateOne({ name: nameOfListing }, { $set: updatedListing });
  console.log(query.matchedCount);
}

const addUser = async (client, userInformation) => {
  const query = await client.db("bookstore")
                            .collection("users")
                            .insertOne(userInformation);
}

const userLogIn = async (client, loginInformation) => {
  const query = await client.db("bookstore")
                            .collection("users")
                            .find(loginInformation);
}

app.post('/signup', async (req, res) => {
  const body = {
    "username": req.body.username,
    "fullname": req.body.fullname,
    "email": req.body.email,
    "password": req.body.password
  };
  await addUser(client, body);
  res.status(200).send("goods boi");
})

app.post('/login', async (req, res) => {
  const result = await client.db("bookstore")
                              .collection("users")
                              .find({
                                username: req.body.username,
                                password: req.body.password,
                              });
  let data = await result.toArray();
  if (data.length == 1) {
    res.status(200).send(true);
  } else {
    res.status(200).send(false);
  }
})

app.get('/listdatabases', async (req, res) => {
  const result = await listDatabases(client);
  res.status(200).send(result.databases);
})

app.listen(3002, () => {
  console.log("App running on port 3002");
  main().catch(console.error);
})