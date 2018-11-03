const axios = require('axios');
const cheerio = require('cheerio');
const queryString = require('query-string');
const Category = require('../models').Category;
const mobileContent = require('./mobileContent');

class Scraper {
  constructor () {
    this.naverRootURL = 'https://m.news.naver.com';
  }
  newsCategories () {
    return {
      'politics': 'https://m.news.naver.com/rankingList.nhn?sid1=100',
      'economy': 'https://m.news.naver.com/rankingList.nhn?sid1=101',
      'society': 'https://m.news.naver.com/rankingList.nhn?sid1=102',
      'life': 'https://m.news.naver.com/rankingList.nhn?sid1=103',
      'world': 'https://m.news.naver.com/rankingList.nhn?sid1=104',
      'technology': 'https://m.news.naver.com/rankingList.nhn?sid1=105',
      'sports': 'https://m.news.naver.com/rankingList.nhn?sid1=107',
      'entertainment': 'https://m.news.naver.com/rankingList.nhn?sid1=106'
    };
  }
  async getArticleList (categoryID) {
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

    const listURL = this.newsCategories()[categoryName];

    const res = await axios.get(listURL);

    const $ = cheerio.load(res.data);
    let listArray = [];

    $('.commonlist').children().each((i, el) => {
      let articleObj = {
        category_id: categoryID,
        rank: $(el).find('i.commonlist_num').text(),
        title: $(el).find('.commonlist_tx_headline').text().trim(),
        image_url: $(el).find('img').attr('src'),
        source_url: this.naverRootURL + $(el).find('a').attr('href'),
        sid: this.naverURLParser(this.naverRootURL + $(el).find('a').attr('href')).sid1,
        oid: this.naverURLParser(this.naverRootURL + $(el).find('a').attr('href')).oid,
        aid: this.naverURLParser(this.naverRootURL + $(el).find('a').attr('href')).aid
      };

      listArray.push(articleObj);
    });

    return listArray;
  }
  async getArticleContent (url) {
    if (url.includes('//m.news.naver.com')) {
    // use mobile version scraper
      try {
        let articleContent = await mobileContent(url);
        return articleContent;
      } catch (err) {
        console.log(err);
      }
    } else if (url.includes('//news.naver.com')) {
      // use web version scraper
      // let articleObj = await webContent(url);
      console.log('hi i am web version content scraper');
    } else if (url.includes('//entertain.naver.com')) {
      // use entertainment version scraper
      console.log('hi i am ent version content scraper');
    }
  }
  naverURLParser (url) {
    const parsed = queryString.parseUrl(url);
    return {
      sid1: parsed.query.sid1,
      oid: parsed.query.oid,
      aid: parsed.query.aid
    };
  }
}

module.exports = Scraper;
