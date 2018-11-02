const axios = require('axios');
const cheerio = require('cheerio');
const newsCategories = require('./newsCategories');
const naverURLParser = require('./naverURLParser');
const Category = require('../models').Category;

const naverRootURL = 'https://m.news.naver.com';

/*
많이 본 뉴스
각 리스트별로 30개 기사 목록이 있음
*/

module.exports = async (categoryID) => {
  let categoryName;

  await Category.findByPk(categoryID)
    .then(returnedCategory => {
      if (returnedCategory) {
        categoryName = returnedCategory.get('name');
      }
    })
    .catch(err => {
      throw err;
    });

  const listURL = newsCategories[categoryName];
  const res = await axios.get(listURL);

  const $ = cheerio.load(res.data);
  let listArray = [];

  $('.commonlist').children().each((i, el) => {
    let articleObj = {
      category_id: categoryID,
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
