const express = require('express');
const router = express.Router();
const request = require('request');
const sanitizeHtml = require('sanitize-html');
const _ = require('underscore');

require('dotenv').config();
var clientId = process.env.NAVER_CLIENT_ID;
var clientSecret = process.env.NAVER_CLIENT_SECRET;

const naverConfig = (query) => {
  return {
    method: 'GET',
    url: 'https://openapi.naver.com/v1/search/news?display=25&query=' + encodeURI(query),
    headers: {
      'Content-Type': 'text/json; charset=utf-8',
      'cache-control': 'no-cache',
      'X-Naver-Client-Id': clientId,
      'X-Naver-Client-Secret': clientSecret
    }
  };
};

router.get('/news', function (req, res) {
  request(naverConfig(req.query.query), (error, response, body) => {
    if (!error && response.statusCode === 200) {
      let articles = [];

      JSON.parse(body).items
        .filter(item => {
          return item.link.includes('news.naver.com');
        })
        .forEach(item => {
          let articleObj = {};
          // sanitize <b> tag in the title
          articleObj.title = sanitizeHtml(item.title, {
            allowedTags: []
          });
          articleObj.source_url = item.link;
          articleObj.createdAt = item.pubDate;
          articles.push(articleObj);
        });

      res.send(articles);
    } else {
      res.status(response.statusCode).end();
      console.log('error = ' + response.statusCode);
    }
  });
});

module.exports = router;
