var express = require('express');
var router = express.Router();
var Category = require('../models').Category;

/* GET articles listing. */
router.get('/', async (req, res, next) => {
  try {
    let categories = await Category.findAll({
      attributes: ['id', 'name', 'name_ko']
    });
    res.json(categories);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
