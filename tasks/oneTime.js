const Article = require('../models').Article;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

Article.findAll().then(articles => {
  articles.forEach(article => {
    article.update({
      // file_url: `http://13.125.111.99/play?article_id=${article.get('id')}`
      file_url: null
    });
  });
});
