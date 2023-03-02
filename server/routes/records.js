const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');

const database = process.env.db;

router.use((req, res, next) => {
  next();
});

router.post('/create', async (req, res) => {
  try {
    const currentDate = new Date();

    const body = {
      balance: req.body.balance,
      userID: req.body.userID,
      category: req.body.category,
      subcategory: req.body.subcategory,
      dateissued: currentDate.getDate(),
      timeissued: currentDate.getTime(),
    };
  
    await client.db(database)
                .collections("records")
                .insertOne(body);
    res.send(true);
  } catch (error) {
    console.error(error);
    res.send(false);
  }
});

router.post('/take', async (req, res) => {
  try {
    const filter = {
      userID: req.body.userID,
    };
  
    const results = await client.db(database)
                                .collections("records")
                                .find(filter)
                                .toArray();
    res.status(200).send(results);
  } catch (error) {
    console.error(error);
    res.send([]);
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const filter = {
      _id: new ObjectId(req.params.id),
    };

    await client.db(database)
                .collections("records")
                .deleteOne(filter);
    res.send(true);
  } catch (error) {
    console.error(error);
    res.send(false);
  }
});

module.exports = router;