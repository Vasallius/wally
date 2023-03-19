const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');

require('dotenv').config();

const uri = process.env.uri;
const client = new MongoClient(uri);

/**
 * Note: Refer to https://docs.google.com/document/d/1nV-V-FOqY50imfd8rtTYVxSMWISCnvrgHi4SlSc6avg/edit
 * GET requests below are ordered based on the order of the cards in the Sample Screen Prototype.
 * Note: Shouldn't we add Total Transfer in the topmost card?
 */

router.get("/getMonthlySummary", async (req, res) => {
  // https://www.mongodb.com/docs/v3.0/tutorial/project-fields-from-query-results/
});

router.get('/getWallets', async (req, res) => {
  const body = {};

  const request = await client.db("wally")
                              .collection("wallets")
                              .find(body);
  res.send(request);
});

router.get('/getAllRecords', async (req, res) => {
  const body = {};

  const request = await client.db("wally")
                              .collection("records")
                              .find(body);
  res.send(request);
});

router.get('/getIncomeRecords', async (req, res) => {
  const body = {
    type: "income"
  };

  const request = await client.db("wally")
                              .collection("records")
                              .find(body);
  res.send(request);
});

router.get('/getExpenseRecords', async (req, res) => {
  const body = {
    type: "expense"
  };

  const request = await client.db("wally")
                              .collection("records")
                              .find(body);
  res.send(request);
});

router.get('/getTransferRecords', async (req, res) => {
  const body = {
    type: "transfer"
  };

  const request = await client.db("wally")
                              .collection("records")
                              .find(body);
  res.send(request);
});

module.exports = router;