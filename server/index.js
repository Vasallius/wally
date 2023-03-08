const { MongoClient } = require('mongodb');
var ObjectId = require('mongodb').ObjectId;

const cors = require('cors');
const express = require('express');
const app = express();

app.use(express.json());
app.use(cors());

const uri = 'mongodb+srv://clydefrongoso:PoUF40DZdEhrQ4gQ@wally.koixbjb.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri);

const main = async () => {  

  try {
    await client.connect();

    // await listDatabases(client);

    let newListings = [
      {
        "title": "Monokatari",
        "author": "Meme Oshino",
        "pages": 690,
        "genres": ["fantasy", "adventure", "avant-garde"],
        "rating": 10,
        "userID": new ObjectId("63fbf74eab1b57aa610b380f"),
      },
      {
        "title": "Neko Cat",
        "author": "Neko Cat",
        "pages": 20,
        "genres": ["fantasy"],
        "rating": 9,
        "userID": new ObjectId("63fbf794ab1b57aa610b3810"),
      },
      {
        "title": "Sasha",
        "author": "Misha",
        "pages": 75,
        "genres": ["romance"],
        "rating": 8,
        "userID": new ObjectId("63fbf74eab1b57aa610b380f"),
      },
      {
        "title": "Buru Locku",
        "author": "Isagi Yoichi",
        "pages": 100,
        "genres": ["sports"],
        "rating": 10,
        "userID": new ObjectId("63fbf74eab1b57aa610b380f"),
      },
      {
        "title": "Baka-monokatari",
        "author": "Shinobu Oshino",
        "pages": 700,
        "genres": ["action", "avant-garde"],
        "rating": 10,
        "userID": new ObjectId("63fbf794ab1b57aa610b3810"),
      },
    ];

    // await addListing(client, newListing);
    // await addListings(client, newListings);

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

const addListing = async (newListing) => {
  const query = await client.db("bookstore")
                            .collection("books")
                            .insertOne(newListing);
  console.log(`Successful find with ID ${query.insertedId}`);
}

const addListings = async (client, newListing) => {
  const query = await client.db("bookstore")
                            .collection("books")
                            .insertMany(newListing);
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
  res.status(200).send(true);
})

app.post('/login', async (req, res) => {
  const result = await client.db("bookstore")
                              .collection("users")
                              .find({
                                email: req.body.email,
                                password: req.body.password,
                              });
  let data = await result.toArray();
  if (data.length == 1) {
    res.status(200).send(data[0]["_id"]);
  } else {
    res.status(200).send(null);
  }
})

app.get('/listdatabases', async (req, res) => {
  const result = await listDatabases(client);
  res.status(200).send(result.databases);
})

app.post('/userbooks', async (req, res) => {
  const userID = new ObjectId(req.body.userID);
  const result = await client.db("bookstore")
                              .collection("books")
                              .find({userID});
  const reste = await result.toArray();
  res.status(200).send(reste);
})

app.post('/addnewbook', async (req, res) => {
  const newbook = {title: req.body.title,
                  author: req.body.author,
                  pages: req.body.pages,
                  rating: req.body.rating,
                  userID: new ObjectId(req.body.userID),
                };
  const query = await addListing(newbook);
})

app.delete('/deleteEntry', async (req, res) => {
  await client.db("bookstore")
              .collection("books")
              .deleteOne({_id: new ObjectId(req.body.entryID)})
  res.status(200).send("goods");
});

app.listen(3002, () => {
  console.log("App running on port 3002");
  main().catch(console.error);
})