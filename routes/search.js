const express = require('express');
const router = express.Router();
const request = require('request');
const sanitizeHtml = require('sanitize-html');
const _ = require('underscore');

require('dotenv').config();
var clientId = process.env.NAVER_CLIENT_ID;
var clientSecret = process.env.NAVER_CLIENT_SECRET;

router.get('/news', function (req, res) {
  var apiUrl =
    'https://openapi.naver.com/v1/search/news?display=30&query=' +
    encodeURI(req.query.query);
  var options = {
    method: 'GET',
    url: apiUrl,
    headers: {
      'Content-Type': 'text/json; charset=utf-8',
      'cache-control': 'no-cache',
      'X-Naver-Client-Id': clientId,
      'X-Naver-Client-Secret': clientSecret
    }
  };

  request(options, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      let articles = [];
      JSON.parse(body).items.forEach(item => {
        if (item.link.includes('news.naver.com')) {
          let articleObj = {};
          // sanitize <b> tag in the title
          articleObj.title = sanitizeHtml(item.title, {
            allowedTags: []
          });
          articleObj.link = item.link;
          articles.push(articleObj);
        }
      });

      res.send(articles);
    } else {
      res.status(response.statusCode).end();
      console.log('error = ' + response.statusCode);
    }
  });
});

module.exports = router;
