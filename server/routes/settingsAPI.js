const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');

require('dotenv').config();

const uri = process.env.uri;
const client = new MongoClient(uri);

router.patch('/updateProfile', async (req, res) => {
  const body = req.body;
  delete body._id;
  const filter = {
    _id: req.body._id
  };
  const result = await client.db("wally")
                              .collection("users")
                              .updateOne(filter, {$set: body});
  res.send(result.acknowledged);
})

module.exports = router;