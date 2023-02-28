const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;

const app = express();

const uri = process.env.uri;
const client = new MongoClient(uri);

app.use(express.json());
app.use(cors());

const main = async () => {
  try {
    await client.connect();


  } catch (error) {
    console.error(error);
  }
}

app.listen(3002, () => {
  try {
    console.log("Server running at port 3002");
    main();
  } catch (error) {
    console.error(error);
  }
});