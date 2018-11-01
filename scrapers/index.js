const _ = require('underscore');
const getArticleList = require('./getArticleList');
const getArticleContent = require('./getArticleContent');
const newsCategories = require('./newsCategories');

module.exports = {
  newsCategories,
  getArticleList,
  getArticleContent
};
