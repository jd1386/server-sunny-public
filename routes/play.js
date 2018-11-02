const express = require('express');
const fs = require('fs');
const request = require('request');
require('dotenv').config();
const router = express.Router();
const Article = require('../models').Article;
const Scraper = require('../scrapers');

/* GET articles listing. */
router.get('/', async (req, res, next) => {
  try {
    let articleExisting = await Article.findByPk(req.query.article_id);
    let articleFetched = await Scraper.getArticleContent(articleExisting.get('source_url'));

    if (articleFetched.content) {
      // console.log('ARTICLE CONTENT', articleFetched.content);
      // console.log('ARTICLE URL', articleFetched.url);

      const apiUrl = 'https://naveropenapi.apigw.ntruss.com/voice/v1/tts';
      const options = {
        url: apiUrl,
        form: { speaker: 'mijin', speed: '-1', text: articleFetched.title },
        headers: { 'X-NCP-APIGW-API-KEY-ID': process.env.NAVER_CLOVA_ID, 'X-NCP-APIGW-API-KEY': process.env.NAVER_CLOVA_SECRET }
      };
      const writeStream = fs.createWriteStream(`./tmp/article_${articleExisting.get('id')}.mp3`);
      const _req = request.post(options).on('response', function (response) {
        _req.pipe(writeStream); // file로 출력
        _req.pipe(res); // 브라우저로 출력
      });
    } else {
      // 기사 내용이 없는 경우
      console.warn('NO ARTICLE CONTENT!!');
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
