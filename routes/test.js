const express = require('express');
const router = express.Router();
const Article = require('../models').Article;
const scraper = require('../scrapers');

/* GET articles listing. */
router.get('/', async (req, res, next) => {
  let Scraper = new scraper();
  // res.send(scraper.newsCategories()['politics']);
  let results = await Scraper.getArticleList(1);
  // let results = await Scraper.getArticleContent('https://m.news.naver.com/read.nhn?aid=0003673639&oid=421&sid1=100');
  res.send(results);
});

module.exports = router;
