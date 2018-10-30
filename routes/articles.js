const express = require('express');
const router = express.Router();
const articlesData = require('../data/articles.json');

/* GET articles listing. */
router.get('/', function (req, res, next) {
  // serve temporary dummy data
  // to-do: fetch data from database
  res.json(articlesData);
});

module.exports = router;
