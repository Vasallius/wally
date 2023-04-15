const express = require('express');
const router = express.Router();

require('dotenv').config();

const categories = require('./dashboard_routes/categoriesAPI');
const dashboardCards = require('./dashboard_routes/dashboardCardsAPI');

router.use('/categories', categories);
router.use('/dashboardCards', dashboardCards);

module.exports = router;