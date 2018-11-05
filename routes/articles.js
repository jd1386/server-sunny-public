const express = require('express');
const router = express.Router();
var Article = require('../models').Article;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const commonAttributes = ['id', 'aid', 'title', 'source_url', 'image_url', 'rank', 'publisher', 'createdAt'];

/* GET articles listing. */
router.get('/', (req, res, next) => {
  Article.findAll({
    where: {
      category_id: req.query.category_id,
      rank: {
        [Op.not]: null
      }
    },
    order: [
      ['rank', 'asc']
    ],
    attributes: commonAttributes
  }).then(articles => {
    res.json(articles);
  }).catch(err => {
    throw err;
  });
});

router.get('/featured', (req, res, next) => {
  Article.findAll({
    where: {
      rank: {
        [Op.not]: null,
        [Op.between]: [1, 3]
      }
    },
    order: [
      ['category_id', 'asc'],
      ['rank', 'asc']
    ],
    attributes: commonAttributes
  }).then(articles => {
    res.json(articles);
  }).catch(err => {
    throw err;
  });
});

module.exports = router;
