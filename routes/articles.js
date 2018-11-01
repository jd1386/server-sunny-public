const express = require('express');
const router = express.Router();
var Article = require('../models').Article;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

/* GET articles listing. */
router.get('/', async (req, res, next) => {
  try {
    let category = req.query.category_id;
    var articles;

    if (category) {
      articles = await Article.findAll({
        where: {
          category_id: category,
          rank: {
            [Op.not]: null
          },
          content: {
            [Op.not]: null
          }
        },
        order: [
          ['rank', 'asc']
        ]
      });
    } else {
      articles = await Article.findAll({
        where: {
          rank: {
            [Op.not]: null
          },
          content: {
            [Op.not]: null
          }
        },
        order: [
          ['rank', 'asc']
        ]
      });
    }
    res.json(articles);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
