var express = require('express');
var router = express.Router();

/* GET articles listing. */
router.get('/', function (req, res, next) {
  // serve temporary dummy data
  // to-do: fetch data from database
  res.json(
    [
      {
        'name': 'all',
        'name_ko': '전체'
      },
      {
        'name': 'politics',
        'name_ko': '정치'
      },
      {
        'name': 'economy',
        'name_ko': '경제'
      },
      {
        'name': 'society',
        'name_ko': '사회'
      },
      {
        'name': 'life',
        'name_ko': '생활'
      },
      {
        'name': 'world',
        'name_ko': '세계'
      },
      {
        'name': 'technology',
        'name_ko': 'IT'
      },
      {
        'name': 'sports',
        'name_ko': '스포츠'
      },
      {
        'name': 'entertainment',
        'name_ko': '연예'
      }
    ]
  );
});

module.exports = router;
