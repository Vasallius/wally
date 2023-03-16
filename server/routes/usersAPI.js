const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');

require('dotenv').config();

const uri = process.env.uri;
const client = new MongoClient(uri);

const accountCheck = async (body) => {
  const result = await client.db("wally")
                              .collection("users")
                              .find(body)
                              .toArray();
  return result;
}

router.post('/signup', async (req, res) => {
  const hashedPassword = await bcrypt.genSalt(process.env.saltRounds)
                                      .then(salt => {
                                        return bcrypt.hash(req.body.password, salt);
                                      })
                                      .catch(err => console.error(err.message));
  const signUpBody = {
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  };
  const logInBody = {
    name: req.body.name
  };
  const userCheck = await accountCheck(logInBody);
  if (userCheck.length == 0) {
    const request = await client.db("wally")
                              .collection("users")
                              .insertOne(signUpBody);
    res.send(request.acknowledged);
  } else {
    res.send(false);
  }
});

router.post('/login', async (req, res) => {
  const body = {
    email: req.body.email,
  };
  const userCheck = await accountCheck(body);
  const passwordCompare = await bcrypt.compare(req.body.password, userCheck[0].password);

  if (passwordCompare && request.length == 1){
    res.send(true);
  } else {
    res.send(false);
  }
})

router.patch('/updateProfile', (req, res) => {
  
})

module.exports = router;