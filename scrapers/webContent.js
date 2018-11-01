const request = require('request');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');
const naverURLParser = require('./naverURLParser');

module.export = async (url) => {
  return new Promise((resolve, reject) => {
    request(url, { encoding: null }, (err, res, body) => {
      const strContents = new Buffer(body);
      const html = iconv.decode(strContents, 'EUC-KR').toString();
      const $ = cheerio.load(html);

      // remove unnessary parts from DOM
      $('span.end_photo_org').remove();
      // $('#dic_area > a').remove()

      let article = {
        title: $('h3#articleTitle').text(),
        content: $('#articleBodyContents').text().trim(),
        publisher: $('.press_logo').find('img').attr('alt'),
        url: url,
        sid: naverURLParser(url).sid1,
        oid: naverURLParser(url).oid,
        aid: naverURLParser(url).aid
      };

      if (article) {
        resolve(article);
      } else {
        reject('web content errror');
      }
    });
  });
};
