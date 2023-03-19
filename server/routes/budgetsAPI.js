const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');

require('dotenv').config();

const uri = process.env.uri;
const client = new MongoClient(uri);

router.post('/addBudget', async (req, res) => {
  try {
    const body = {
      type: req.body.type,
      balance: req.body.balance
    };
    const request = await client.db("wally")
                                .collection("budgets")
                                .insertOne(body);
    res.send(request);
  } catch (error) {
    console.error(error.message);
    res.send(null);
  }
});

router.post('/getBudget', async (req, res) => {
  try {
    const body = {
      type: req.body.type
    };
    const request = await client.db("wally")
                                .collection("budgets")
                                .find(body);
    res.send(request);
  } catch (error) {
    console.error(error.message);
    res.send(null);
  }
});

router.delete('/deleteBudget', async (req, res) => {
  const body = {
    type: req.body.type,
    balance: req.body.balance
  };
  const request = await client.db("wally")
                              .collection("budgets")
                              .deleteOne(body);
  res.send(request);
});

module.exports = router;