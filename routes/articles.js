const express = require('express');
const router = express.Router();
var Article = require('../models').Article;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

/* GET articles listing. */
router.get('/', (req, res, next) => {
  let category = req.query.category_id;

  if (category) {
    Article.findAll({
      where: {
        category_id: category,
        rank: {
          [Op.not]: null
        }
      },
      order: [
        ['rank', 'asc']
      ],
      attributes: ['id', 'title', 'image_url', 'rank', 'publisher', 'oid']
    }).then(articles => {
      console.log(articles);
      res.json(articles);
    }).catch(err => {
      throw err;
    });
  } else {
    Article.findAll({
      where: {
        rank: {
          [Op.not]: null
        }
      },
      order: [
        ['rank', 'asc']
      ],
      attributes: ['id', 'title', 'image_url', 'rank', 'publisher', 'oid']
    }).then(articles => {
      res.json(articles);
    }).catch(err => {
      throw err;
    });
  }
});

module.exports = router;
