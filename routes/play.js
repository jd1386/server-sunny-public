var express = require('express');
var router = express.Router();
var Article = require('../models').Article;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

/* GET articles listing. */
router.get('/', async (req, res, next) => {
  try {
    let article = await Article.findByPk(req.query.article_id);

    console.log(article.get('title'));
    res.end(article.get('title'));

    // res.send('data/1.mp3');
  } catch (err) {
    next(err);
  }
});

module.exports = router;
