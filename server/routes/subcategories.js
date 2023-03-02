const express = require('express');
const router =  express.Router();
const { MongoClient } = require('mongodb');

const uri = process.env.uri;
const client = new MongoClient(uri);

const database = process.env.db;

router.use((req, res, next) => {
  next();
});

/**
 * TO-DO: Discuss different types of categories if there are any
 */
router.post('/create', async (req, res) => {
  try {
    const body = {
      title: req.body.title,
      userID: req.body.userID,
    };

    await client.db(database)
                .collections("categories")
                .insertOne(body);
    res.send(true);
  } catch (error) {
    console.error(error);
    res.send(false);
  }
});

router.post('/search', async (req, res) => {
  try {
    const body = {
      userID: req.body.userID,
    };

    const result = await client.db(database)
                .collections("categories")
                .find(body)
                .toArray();
    res.send(result);
  } catch (error) {
    console.error(error);
    res.send(false);
  }
});

router.delete('./delete/:id', (req, res) => {
  try {
    
  } catch (error) {
    
  }
})

module.exports = router;