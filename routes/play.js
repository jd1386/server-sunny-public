const express = require('express');
const path = require('path');
const fs = require('fs');
const request = require('request');
require('dotenv').config();
const router = express.Router();
const Article = require('../models').Article;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

/* GET articles listing. */
router.get('/', async (req, res, next) => {
  try {
    let article = await Article.findByPk(req.query.article_id);
    const apiUrl = 'https://naveropenapi.apigw.ntruss.com/voice/v1/tts';
    const options = {
      url: apiUrl,
      form: { speaker: 'mijin', speed: '-1', text: article.title },
      headers: { 'X-NCP-APIGW-API-KEY-ID': process.env.NAVER_CLOVA_ID, 'X-NCP-APIGW-API-KEY': process.env.NAVER_CLOVA_SECRET }
    };
    const writeStream = fs.createWriteStream(`./tmp/article_${article.get('id')}.mp3`);
    const _req = request.post(options).on('response', function (response) {
      _req.pipe(writeStream); // file로 출력
      _req.pipe(res); // 브라우저로 출력
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
