const _ = require('underscore');
const Scraper = require('../scrapers');
const Article = require('../models').Article;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const updateArticles = async (list) => {
  /*
  combined aids는 현재 인기 기사 30개 각 aid의 array로써
  현재 인기 기사와 데이터베이스에 있지만 더이상 인기없는 기사를
  구분하기 위해서 수집합니다.
  */
  let combinedAids = _.pluck(list, 'aid');

  /*
  인기 기사 고유의 aid를 통해 기존 데이터베이스에 저장된
  기사의 aid를 비교하여 이미 기사가 저장되어 있는 경우
  저장된 기사의 현재 랭크를 업데이트 합니다.

  저장된 기사가 없는 경우 해당 인기 기사를 Article 모델을 통해
  생성합니다.
  */
  list.forEach(targetArticle => {
    Article.findOne({ where: {
      aid: targetArticle.aid
    } })
      .then(savedArticle => {
        if (savedArticle) {
          savedArticle.update({ rank: targetArticle.rank });
        } else {
          Article.create(targetArticle);
        }
      })
      .catch(err => { throw err; });
  });

  // 이번에 업데이트 되지 않은 기사들은
  // 더이상 실시간 리스트에 등장하지 않는 기사들이므로
  // 삭제하진 않고 rank을 null로 업데이트합니다.
  Article.findAll({
    where: {
      aid: {
        [Op.notIn]: combinedAids
      },
      rank: {
        [Op.not]: null
      }
    }
  }).then(articles => {
    articles.forEach(article => {
      article.update({ rank: null });
    });
  });

  // 이번 작업에서 update된 articles를
  // 다음 작업 (기사 내용 fetch)을 위해 리턴합니다.
  let articlesToReturn = await Article.findAll({
    where: {
      rank: {
        [Op.not]: null
      },
      title: {
        [Op.not]: null
      }
    }
  }).then(articles => {
    return _.pluck(articles, 'source_url');
  }).catch(err => { throw err; });

  return articlesToReturn;
};

const fetchArticleContent = async (urls) => {
  urls.forEach(url => {
    Scraper.getArticleContent(url);
  });
};

const saveArticlesList = async (category) => {
  let articles = await Scraper.getArticleList(category);
  let articlesToFetchContent = await updateArticles(articles);
  await fetchArticleContent(articlesToFetchContent);
};

saveArticlesList('politics');
saveArticlesList('economy');
saveArticlesList('society');
