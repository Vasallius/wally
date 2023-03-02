const express = require('express');
const router = express.Router();
const app = express();

const database = process.env.db;

router.use((req, res, next) => {
  next();
});

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
                .collections("users")
                .insertOne(body);
  
    res.status(200).send(true);
  } catch (error) {
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
                                .collections("users")
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


    /* Check if user exists */
    const userExistence = await client.db(database)
                                      .collections("user")
                                      .find(filter)
                                      .toArray();

    if (userExistence.length == 1) {
      await client.db(database)
                .collections("users")
                .updateOne(filter, {$set: req.body});
      res.send(true);
    } else {
      res.send(false);
    }
    
  } catch (error) {
    res.send(false);
  }
})

module.exports = router;