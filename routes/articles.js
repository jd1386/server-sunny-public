const express = require('express');
const router = express.Router();
var Article = require('../models').Article;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

/* GET articles listing. */
router.get('/', async (req, res, next) => {
  let category = req.query.category_id;

  if (category) {
    let articles = await Article.findAll({
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
      ],
      attributes: ['id', 'title', 'publisher', 'image_url', 'rank']
    });
    res.json(articles);
  } else {
    let articles = await Article.findAll({
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
      ],
      attributes: ['id', 'title', 'publisher', 'image_url', 'rank']
    });
    res.json(articles);
  }
});

module.exports = router;
