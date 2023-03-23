const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

require('dotenv').config();

const uri = process.env.uri;
const client = new MongoClient(uri);

/**
 * all requests that starts with the keyword "get" must have its contents added as URL params
 */

router.post('/addRecord', async (req, res) => {
  let record = req.body;
  delete record._id;
  delete record.userID;
  record.userID = new ObjectId(req.body.userID);

  const request = await client.db("wally")
                              .collection("records")
                              .insertOne(record);

  res.send(request.acknowledged);
});

router.get('/getRecord/:userID', async (req, res) => {
  try {
    const request = await client.db("wally")
                              .collection("records")
                              .find({ userID: req.params.userID })
                              .toArray();
    res.send(request);
  } catch (error) {
    console.error(error.message);
    res.send(null);
  }
});

router.get('/getRecords', async (req, res) => {
  try {
    const request = await client.db("wally")
                              .collection("record")
                              .find({})
                              .toArray();
    res.send(request);
  } catch (error) {
    console.error(error.message);
    res.send(null);
  }
});

router.delete('/deleteRecord', async (req, res) => {
  try {
    const filter = {
      _id: new ObjectId(req.body._id)
    };
  
    const request = await client.db("wally")
                                .collection("record")
                                .deleteOne(filter)
  
    res.send(request.acknowledged);
  } catch (error) {
    console.error(error.message);
    res.send(null);
  }
});

router.patch('/editRecord', async (req, res) => {
  try {
    const filter = {
      _id: new ObjectId(req.body._id)
    };
    const newProperties = req.body;
    delete newProperties._id;
    const request = await client.db("wally")
                                .collection("records")
                                .updateOne(filter, {$set: newProperties});
    res.send(request.acknowledged);
  } catch (error) {
    console.error(error.message);
    res.send(null);
  }
});

module.exports = router;