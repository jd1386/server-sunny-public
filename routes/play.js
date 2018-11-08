require('dotenv').config();
const express = require('express');
const fs = require('fs');
const request = require('request');
const router = express.Router();
const Scraper = require('../scrapers');
const Uploader = require('../uploader');
const Article = require('../models').Article;
require('colors');

/* GET articles listing. */
router.get('/', async (req, res, next) => {
  let scraper = new Scraper();
  let url = req.originalUrl.split('/play?url=')[1];
  let aid = scraper.naverURLParser(url)['aid'];

  // http://localhost:3000/play?url=https://m.news.naver.com/rankingRead.nhn%3Foid=001&aid=0010453702&sid1=100&date=20181107&ntype=RANKING

  try {
    // 1. check if we have an article with the given url
    let articleExisting = await Article.findOne({ where: {
      aid: aid
    } });

    if (!articleExisting) {
      console.log('no article found with given aid'.red);
      // the article comes from Naver search results
      // go fetch the article, play it, and do not
      // upload the file to S3

      let articleFetched = await scraper.getArticleContent(url);

      console.log('articleFetched..', articleFetched.title.blue);

      const options = {
        url: 'https://naveropenapi.apigw.ntruss.com/voice/v1/tts',
        form: { speaker: 'mijin', speed: '-1', text: articleFetched.title },
        headers: { 'X-NCP-APIGW-API-KEY-ID': process.env.NAVER_CLOVA_ID, 'X-NCP-APIGW-API-KEY': process.env.NAVER_CLOVA_SECRET }
      };
      // create tmp folder if not present
      if (!fs.existsSync('./tmp')) {
        fs.mkdirSync('./tmp');
      }

      const writeStream = await fs.createWriteStream(`./tmp/${articleFetched['aid']}.mp3`);
      const _req = await request.post(options).on('response', (response) => {
        _req.pipe(writeStream); // file로 출력
        _req.pipe(res); // 브라우저로 출력
      });
    } else {
      // if we do, play the mp3 file on S3
      if (articleExisting.get('file_url')) {
        console.log('Article has file_url. Redirecting to S3 URL..'.green);
        res.redirect(articleExisting.get('file_url'));
      } else {
        // if not, call Naver Clova API
        console.log('NO file_url'.red);

        let articleFetched = await scraper.getArticleContent(url);

        console.log('articleFetched..', articleFetched.title.blue);

        const options = {
          url: 'https://naveropenapi.apigw.ntruss.com/voice/v1/tts',
          form: { speaker: 'mijin', speed: '-1', text: articleFetched.title },
          headers: { 'X-NCP-APIGW-API-KEY-ID': process.env.NAVER_CLOVA_ID, 'X-NCP-APIGW-API-KEY': process.env.NAVER_CLOVA_SECRET }
        };
        // create tmp folder if not present
        if (!fs.existsSync('./tmp')) {
          fs.mkdirSync('./tmp');
        }

        const writeStream = await fs.createWriteStream(`./tmp/${articleFetched['aid']}.mp3`);
        const _req = await request.post(options).on('response', (response) => {
          _req.pipe(writeStream); // file로 출력
          _req.pipe(res); // 브라우저로 출력
        });

        // update the article's file_url to S3 path
        setTimeout(() => {
          Uploader.updateAndUploadMp3(articleFetched['aid']);
        }, 5000);
      }
    }
  } catch (err) {
    throw err;
  }
});

module.exports = router;
