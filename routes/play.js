const express = require('express');
const fs = require('fs');
const request = require('request');
require('dotenv').config();
const router = express.Router();
const Scraper = require('../scrapers');
const Uploader = require('../uploader');
const Article = require('../models').Article;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

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
    const writeStream = fs.createWriteStream(`./tmp/${articleFetched.aid}.mp3`);
    const _req = request.post(options).on('response', (response) => {
      _req.pipe(writeStream); // file로 출력
      _req.pipe(res); // 브라우저로 출력

      // Todo
      // send the mp3 file to S3
      // remove the mp3 file

      // update the article's file_url to S3 path
      Article.findOne({ where: {
        aid: articleFetched.aid
      } })
        .then(async (savedArticle) => {
          if (savedArticle) {
            // console.log(savedArticle);
            if (!savedArticle.get('file_url')) {
              await savedArticle.update({ file_url: `https://sunny-files-dev.s3.ap-northeast-2.amazonaws.com/${savedArticle.aid}.mp3` });

              // console.log('aid', articleFetched.aid);

              await Uploader.upload(`${articleFetched.aid}.mp3`);
              console.log('uploaded?');
            }
          } else {
            // has no article in the db
            console.log('no article saved in the db');
          }
        })
        .catch(err => { throw err; });
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
