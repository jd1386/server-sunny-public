const axios = require('axios');
const cheerio = require('cheerio');
const naverURLParser = require('./naverURLParser');

module.exports = (url) => {
  return new Promise(async (resolve, reject) => {
    var res = await axios.get(url);
    var html = res.data;
    const $ = cheerio.load(html);

    // remove unnessary parts from DOM
    $('span.end_photo_org').remove();
    $('#dic_area > a').remove();

    let result = {
      title: $('h2.media_end_head_headline').text(),
      // content: $('#dic_area').text().trim().replace(/\[.*\] /gm, '').replace(/(\r\n|\n|\r|\t)/gm, "").replace(/\s+/g, " "),
      content: $('#dic_area').text().trim(),
      publisher: $('img.media_end_head_top_logo_img').attr('alt'),
      url: url,
      sid1: naverURLParser(url).sid1,
      oid: naverURLParser(url).oid,
      aid: naverURLParser(url).aid
    };

    if (result) {
      resolve(result);
    } else {
      reject('error');
    }
  });
};
