const express = require('express');
const router = express.Router();

require('dotenv').config();

const categories = require('./dashboard_routes/categoriesAPI');
const dashboardCards = require('./dashboard_routes/dashboardCardsAPI');

router.use('/categories', categories);
router.use('/dashboardcards', dashboardCards);

module.exports = router;