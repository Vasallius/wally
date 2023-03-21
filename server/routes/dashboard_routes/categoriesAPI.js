const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

require('dotenv').config();

const uri = process.env.uri;
const client = new MongoClient(uri);
const subcategories = require('./subcategories_routes/subcategoriesAPI');

router.use('/subcategories', subcategories);

/**
 * Adds a new category.
 */
router.post('/addCategory', async (req, res) => {
  try {
    const body = req.body;

    const request = await client.db('wally')
                                .collection('categories')
                                .insertOne(body);
    res.send(request.acknowledged);
  } catch (error) {
    console.error(error.message);
    res.send(false);
  }
});

/**
 * REQUEST body must contain ID and the 
 * name of the new category.
 * Basically changes the name of the
 * category.
 */
router.patch('/editCategory', async (req, res) => {
  try {
    const filter = {
      _id: new ObjectId(req.body._id)
    }
    const body = req.body;
    delete body._id;
    const result = await client.db("wally")
                                .collection("categories")
                                .updateOne(filter, {$set: body});
    res.send(result.acknowledged);
  } catch (error) {
    console.error(error.message);
    res.send(false);
  }
});

/**
 * Just call this API.
 */
router.get('/getAllCategories', async (req, res) => {
  try {
    const result = await client.db("wally")
                                .collection("categories")
                                .find()
                                .toArray();
    res.send(result);
  } catch (error) {
    console.error(error.message);
    res.send(false);
  }
});

/**
 * REQUEST body must only contain the ID of the category to be deleted
 */
router.delete('/deleteCategory', async (req, res) => {
  try {
    const body = req.body;
    
    const request = await client.db('wally')
                                .collection('categories')
                                .deleteOne(body);
    res.send(request.acknowledged);
  } catch (error) {
    console.error(error.message);
    res.send(false);
  }
});

module.exports = router;