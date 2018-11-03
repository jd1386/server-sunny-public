const express = require('express');
const router = express.Router();
const Article = require('../models').Article;
const Scraper = require('../scrapers');

/* GET articles listing. */
router.get('/', async (req, res, next) => {
  // let scraper = new Scraper();
  // res.send(scraper.newsCategories()['politics']);
  // let results = await scraper.getArticleList(1);
  // let results = await Scraper.getArticleContent('https://m.news.naver.com/read.nhn?aid=0003673639&oid=421&sid1=100');

  let results = await Article.findAll({
    order: [
      ['oid', 'asc']
    ],
    attributes: ['id', 'publisher', 'oid']
  });

  res.send(results);
});

module.exports = router;
