const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');

require('dotenv').config();

const uri = process.env.uri;
const client = new MongoClient(uri);



module.exports = router;