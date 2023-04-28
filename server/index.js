const { MongoClient } = require('mongodb');

const cors = require('cors');
const express = require('express');
const app = express();

const users = require('./routes/usersAPI');
const dashboards = require('./routes/dashboardsAPI');
const budgets = require('./routes/budgetsAPI');
const recordManipulations = require('./routes/recordManipulationsAPI');
const settings = require('./routes/settingsAPI');

app.use(express.json());
app.use(cors());

app.use('/users', users);
app.use('/dashboards', dashboards);
app.use('/budgets', budgets);
app.use('/recordManipulations', recordManipulations);
app.use('/settings', settings);

require('dotenv').config();

const uri = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri);

const main = async () => {  
  try {
    await client.connect();

  } catch (e) {
    console.error(e);
  }
}

app.listen(3002, () => {
  console.log("App running on port 3002");
  main().catch(console.error);
})