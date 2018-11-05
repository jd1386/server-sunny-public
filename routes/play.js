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
    let scraper = new Scraper();
    let url = req.originalUrl.split('play?url=')[1];
    console.log('url is', url);

    let articleFetched = await scraper.getArticleContent(url);

    console.log('articleFetched', articleFetched);

    const options = {
      url: 'https://naveropenapi.apigw.ntruss.com/voice/v1/tts',
      form: { speaker: 'mijin', speed: '-1', text: articleFetched.title },
      headers: { 'X-NCP-APIGW-API-KEY-ID': process.env.NAVER_CLOVA_ID, 'X-NCP-APIGW-API-KEY': process.env.NAVER_CLOVA_SECRET }
    };
    // create tmp folder if not present
    if (!fs.existsSync('./tmp')) {
      fs.mkdirSync('./tmp');
    }
    const writeStream = fs.createWriteStream('./tmp/search.mp3');
    const _req = request.post(options).on('response', (response) => {
      _req.pipe(writeStream); // file로 출력
      _req.pipe(res); // 브라우저로 출력

      // Todo
      // send the mp3 file to S3
      // remove the mp3 file
      // update the article's file_url to S3 path
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
