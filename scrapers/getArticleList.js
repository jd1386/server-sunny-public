const axios = require('axios');
const cheerio = require('cheerio');
const naverRootURL = 'https://m.news.naver.com';
const newsCategories = require('./newsCategories');
const naverURLParser = require('./naverURLParser');
const Category = require('../models').Category;

/*
많이 본 뉴스
각 리스트별로 30개 기사 목록이 있음
*/

module.exports = async (category) => {
  let selectedCategoryID;

  Category.findOne({ where: { name: category.toLowerCase() } })
    .then(returnedCategory => {
      if (returnedCategory) {
        selectedCategoryID = returnedCategory.get('id');
      }
    })
    .catch(err => {
      throw err;
    });

  const listURL = newsCategories[category];
  const res = await axios.get(listURL);

  const $ = cheerio.load(res.data);
  let listArray = [];

  $('.commonlist').children().each((i, el) => {
    let articleObj = {
      category_id: selectedCategoryID,
      rank: $(el).find('i.commonlist_num').text(),
      title: $(el).find('.commonlist_tx_headline').text().trim(),
      image_url: $(el).find('img').attr('src'),
      source_url: naverRootURL + $(el).find('a').attr('href'),
      sid: naverURLParser(naverRootURL + $(el).find('a').attr('href')).sid1,
      oid: naverURLParser(naverRootURL + $(el).find('a').attr('href')).oid,
      aid: naverURLParser(naverRootURL + $(el).find('a').attr('href')).aid
    };

    listArray.push(articleObj);
  });

  return listArray;
};
