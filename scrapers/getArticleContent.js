const Article = require('../models').Article;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const mobileContent = require('./mobileContent');
const webContent = require('./webContent');

module.exports = (url) => {
  if (url.includes('//m.news.naver.com')) {
    // use mobile version scraper
    mobileContent(url)
      .then(articleContent => {
        Article.findOne({
          where: {
            aid: articleContent.aid
          }
        })
          .then(savedArticle => {
            if (savedArticle && savedArticle.aid === articleContent.aid) {
              savedArticle.update({
                content: articleContent.content,
                publisher: articleContent.publisher
              });
            }
          })
          .catch(err => { throw err; });
      })
      .catch(err => { throw err; });
  } else if (url.includes('//news.naver.com')) {
    // use web version scraper
    // let articleObj = await webContent(url);
    console.log('hi i am web version content scraper');
  } else if (url.includes('//entertain.naver.com')) {
    // use entertainment version scraper
    console.log('hi i am ent version content scraper');
  }
};

/*

*/
