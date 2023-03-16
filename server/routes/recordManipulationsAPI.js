const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

require('dotenv').config();

const uri = process.env.uri;
const client = new MongoClient(uri);

router.post('/addRecord', async (req, res) => {
  const record = {
    balance: req.body.balance,
    category: req.body.category,
    subcategory: req.body.subcategory,
    recordType: req.body.recordType,
    paymentType: req.body.paymentType,
    paymentStatus: req.body.paymentStatus,
    userID: ObjectId(req.body.userID)
  };

  const request = await client.db("wally")
                              .collection("record")
                              .insertOne(record);

  res.send(request.acknowledged);
});

/**
 * FIX: specific search properties
 */

router.post('/getRecord', async (req, res) => {
  const body = {
    userID: ObjectId(req.body.userID)
  };

  const request = await client.db("wally")
                              .collection("record")
                              .find(body)
                              .toArray();

  res.send(request);
});

router.post('/getRecords', async (req, res) => {
  const body = {
    userID: ObjectId(req.body.userID)
  };

  const request = await client.db("wally")
                              .collection("record")
                              .find(body)
                              .toArray();

  res.send(request);
});

router.delete('/deleteRecord', async (req, res) => {
  try {
    const body = {
      _id: ObjectId(req.body._id)
    };
  
    const request = await client.db("wally")
                                .collection("record")
                                .deleteOne(body)
  
    if (request.acknowledged) {
      res.send(true);
    } else {
      res.send(false);
    }
  } catch (error) {
    console.error(error.message);
  }
});

router.patch('/editRecord', (req, res) => {
  
});

module.exports = router;