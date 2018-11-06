const express = require('express');
const router = express.Router();
const request = require('request');
require('dotenv').config();
var clientId = process.env.NAVER_CLIENT_ID;
var clientSecret = process.env.NAVER_CLIENT_SECRET;

router.get('/news', function (req, res) {
  var apiUrl =
    'https://openapi.naver.com/v1/search/news?query=' +
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
      var naverNews = JSON.parse(body).items.filter(item => {
        if (item.link.split('/')[2] === 'news.naver.com') {
          return item;
        }
      });
      // console.log('33333#####', naverNews);

      var titleLink = naverNews.map(item => {
        return { title: item.title, link: item.link };
      });

      console.log('$$$$$$$$$$$$', titleLink);
      res.set({ 'content-type': 'application/json; charset=utf-8' }); // should set utf-8 in request as well!!
      res.end(body);
    } else {
      res.status(response.statusCode).end();
      console.log('error = ' + response.statusCode);
    }
  });
});

module.exports = router;
