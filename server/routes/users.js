const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

require('dotenv').config();


const uri = process.env.uri;
const database = process.env.database;
const client = new MongoClient(uri);

// router.use((req, res, next) => {
//   next();
// });

router.get('/', (req, res) => {
  res.send("Routing successful.");
});

/**
 * TO-DO: Apply hashing on password (utilize bcrypt)
 */
router.post('/signup', async (req, res) => {
  try {
    const body = {
      fullname: req.body.fullname,
      address: req.body.address,
      email: req.body.email,
      password: req.body.password,
    };
    await client.db(database)
                .collection("users")
                .insertOne(body);
  
    res.status(200).send(true);
  } catch (error) {
    console.log(error);
    res.status(500).send(false);
  }
});


/**
 * TO-DO: Hash password and check.
 */
router.post('/login', async (req, res) => {
  try {
    const body = {
      email: req.body.email,
      password: req.body.password,
    };
  
    const result = await client.db(database)
                                .collection("users")
                                .find(body)
                                .toArray();
    if (result.length != 1) {
      res.send(false);
    } else {
      res.send(true);
    }
  } catch (error) {
    res.send(false);
  }
});

router.patch('/patch', async (req, res) => {
  try {
    const filter = {
      _id: new ObjectId(req.body._id),
    };
    const setBody = req.body;
    delete setBody._id;
    /* Check if user exists */
    const userExistence = await client.db(database)
                                      .collection("users")
                                      .find(filter)
                                      .toArray();

    if (userExistence.length == 1) {
      await client.db(database)
                .collection("users")
                .updateOne(filter, {$set: setBody});
      res.send(true);
    } else {
      res.send(false);
    }
  } catch (error) {
    console.log(error);
    res.send(false);
  }
});

router.delete('/delete', async (req, res) => {
  try {
    const filter = {
      "_id": new ObjectId(req.body._id),
    }
    const result = await client.db(database)
                                .collection("users")
                                .deleteOne(filter);
    if (result.deletedCount !== 1) {
      res.send(false);
    } else {
      res.send(true);
    }
  } catch (error) {
    console.error(error);
    res.send(false);
  }
})

module.exports = router;