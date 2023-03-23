const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');

require('dotenv').config();

const uri = process.env.uri;
const client = new MongoClient(uri);

const findFunction = async (filter) => {
  const request = await client.db("wally")
                              .collection("records")
                              .find(filter)
                              .toArray();
  return request;
}

/**
 * Note: Refer to https://docs.google.com/document/d/1nV-V-FOqY50imfd8rtTYVxSMWISCnvrgHi4SlSc6avg/edit
 * GET requests below are ordered based on the order of the cards in the Sample Screen Prototype.
 */

router.get("/getMonthlySummary", async (req, res) => {
  const expense = await findFunction({recordType: "expense"});
  const income = await findFunction({recordType: "income"});
  console.log(expense, income)
  const totalExpense = expense.reduce((total, val) => {
    return total+val.balance;
  }, 0);
  const totalIncome = income.reduce((total, val) => {
    return total+val.balance;
  }, 0);
  res.send([totalIncome, totalExpense]);
});

router.get('/getWallets', async (req, res) => {
  const request = await client.db("wally")
                              .collection("wallets")
                              .find({});
  res.send(request);
});

router.get('/getAllRecords', async (req, res) => {
  const request = await findFunction({});
  res.send(request);
});

router.get('/getIncomeRecords', async (req, res) => {
  const request = await findFunction({ recordType: "income" });
  res.send(request);
});

router.get('/getExpenseRecords', async (req, res) => {
  const request = await findFunction({ recordType: "expense" });
  res.send(request);
});

router.get('/getTransferRecords', async (req, res) => {
  const request = await findFunction({ recordType: "transfer" });
  res.send(request);
});

module.exports = router;