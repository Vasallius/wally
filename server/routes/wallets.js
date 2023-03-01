const express = require('express');
const router = express.Router();
const app = express();

const database = process.env.db;

router.use((req, res, next) => {
  next();
});

router.post('/create', async (req, res) => {
  try {
    const body = {
      userID: req.body.userID,
      balance: req.body.balance,
    };
  
    await client.db(database)
                .collections("wallets")
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
                                .collections("wallets")
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
                .collections("wallets")
                .deleteOne(filter);
    res.send(true);
  } catch (error) {
    console.error(error);
    res.send(false);
  }
});

module.exports = router;