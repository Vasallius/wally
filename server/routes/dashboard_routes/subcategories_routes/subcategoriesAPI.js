const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

require('dotenv').config();

const uri = process.env.uri;
const client = new MongoClient(uri);

/**
 * Add subcategory works
 */
router.patch("/addSubcategory", async (req, res) => {
  try {
    const filter = {
      _id: new ObjectId(req.body._id)
    };
    
    const document = await client.db("wally")
                                      .collection("categories")
                                      .find(filter)
                                      .toArray();
    const subcategories = document[0].subcategories;
    subcategories.push(req.body.subcategory);
    const body = {
      subcategories
    };
    const request = await client.db("wally")
                                .collection("categories")
                                .updateOne(filter, {$set: body});
    res.send(request.acknowledged);
  } catch (error) {
    console.error(error.message);
    res.send(false);
  }
});


router.patch("/deleteSubcategory", async (req, res) => {
  try {
    const filter = {
      _id: new ObjectId(req.body._id)
    };
    
    const document = await client.db("wally")
                                      .collection("categories")
                                      .find(filter)
                                      .toArray();
    let subcategories = document[0].subcategories;

    subcategories = subcategories.filter(val => {
      return val != req.body.subcategory
    });

    const body = {
      subcategories
    };
    
    const request = await client.db("wally")
                                .collection("categories")
                                .updateOne(filter, {$set: body});
    res.send(request.acknowledged);
  } catch (error) {
    console.error(error.message);
    res.send(false);
  }
});

module.exports = router;