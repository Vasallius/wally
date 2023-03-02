const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

require('dotenv').config();

const app = express();

const uri = process.env.uri;
const client = new MongoClient(uri);

const users = require('./routes/users');
const wallets = require('./routes/wallets');
const categories = require('./routes/categories');
const subcategories = require('./routes/subcategories');
const records = require('./routes/records');
const dashboard_cards = require('./routes/dashboard_cards');

app.use(express.json());
app.use(cors());
app.use('/users', users);
app.use('/wallets', wallets);
app.use('/categories', categories);
app.use('/subcategories', subcategories);
app.use('/records', records);
app.use('/dashboard_cards', dashboard_cards);

const main = async () => {
  try {
    await client.connect();
  } catch (error) {
    console.error(error);
  }
}

app.listen(3002, async () => {
  try {
    console.log("Server running at port 3002");
    await main();
  } catch (error) {
    console.error(error);
  }
});