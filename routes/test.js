const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();
const Article = require('../models').Article;
const Scraper = require('../scrapers');

/* GET articles listing. */
router.get('/', isLoggedIn, async (req, res, next) => {
  res.render('test', {
    user: req.user
  });
});

module.exports = router;
