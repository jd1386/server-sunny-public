const express = require('express');
const router = express.Router();
var Article = require('../models').Article;

/* GET articles listing. */
router.get('/', async (req, res, next) => {
  try {
    let category = req.query.category_id;
    var articles;

    if (category) {
      articles = await Article.findAll({
        where: {
          category_id: category
        }
      });
    } else {
      articles = await Article.findAll();
    }
    res.json(articles);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
