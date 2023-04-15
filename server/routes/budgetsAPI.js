const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

require('dotenv').config();

const uri = process.env.uri;
const client = new MongoClient(uri);

router.post('/addBudget', async (req, res) => {
  try {
    const body = req.body;
    const request = await client.db("wally")
                                .collection("budgets")
                                .insertOne(body);
    res.send(request.acknowledged);
  } catch (error) {
    console.error(error.message);
    res.send(null);
  }
});

router.get('/getAllBudget', async (req, res) => {
  try {
    const request = await client.db("wally")
                                .collection("budgets")
                                .find()
                                .toArray();
    res.send(request);
  } catch (error) {
    console.error(error.message);
    res.send(null);
  }
});

router.delete('/deleteBudget', async (req, res) => {
  try {
    const body = {
      _id: new ObjectId(req.body._id)
    };
    const request = await client.db("wally")
                                .collection("budgets")
                                .deleteOne(body);
    res.send(request.acknowledged);
  } catch (error) {
    res.send(null);
  }
});

module.exports = router;