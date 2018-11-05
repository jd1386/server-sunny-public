const axios = require('axios');
const request = require('request');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');
const queryString = require('query-string');
const Category = require('../models').Category;
// const mobileContent = require('./mobileContent');
// const webContent = require('./webContent');

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
      return this.getMobileContent(url);
    } else if (url.includes('//news.naver.com')) {
      // use web version scraper
      return this.getWebContent(url);
    } else if (url.includes('//entertain.naver.com')) {
      // use entertainment version scraper
      return this.getEntContent(url);
    }
  }
  async getMobileContent (url) {
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
        sid1: this.naverURLParser(url).sid1,
        oid: this.naverURLParser(url).oid,
        aid: this.naverURLParser(url).aid
      };

      if (result) {
        resolve(result);
      } else {
        reject(new Error('failed to getMobileContent'));
      }
    });
  }
  async getWebContent (url) {
    return new Promise((resolve, reject) => {
      request(url, { encoding: null }, (err, res, body) => {
        if (err) { throw err; }

        const strContents = Buffer.from(body);
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
          sid: this.naverURLParser(url).sid1,
          oid: this.naverURLParser(url).oid,
          aid: this.naverURLParser(url).aid
        };

        if (article) {
          resolve(article);
        } else {
          reject(new Error('failed to getWebContent'));
        }
      });
    });
  }
  async getEntContent (url) {
    return new Promise((resolve, reject) => {
      request(url, (err, res, body) => {
        if (err) { throw err; };

        const strContents = Buffer.from(body);
        const html = iconv.decode(strContents, 'utf-8').toString();
        const $ = cheerio.load(html);

        // remove unnessary parts from DOM
        $('span.end_photo_org').remove();

        let article = {
          title: $('h2.end_tit').text().trim(),
          content: $('#articeBody').text().trim(),
          publisher: $('.press_logo').find('img').attr('alt'),
          url: url,
          sid1: this.naverURLParser(url).sid1,
          oid: this.naverURLParser(url).oid,
          aid: this.naverURLParser(url).aid
        };

        if (article) {
          resolve(article);
        } else {
          reject(new Error('failed to getEntContent'));
        }
      });
    });
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
