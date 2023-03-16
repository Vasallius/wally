const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');

require('dotenv').config();

const uri = process.env.uri;
const client = new MongoClient(uri);

const categories = require('./dashboard_routes/categoriesAPI');
const dashboardCards = require('./dashboard_routes/dashboardCardsAPI');

router.use('/categories', categories);
router.use('/dashboardcards', dashboardsCards);

module.exports = router;