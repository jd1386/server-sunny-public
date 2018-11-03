const argv = require('yargs').argv;
const _ = require('underscore');
const Scraper = require('../scrapers');
const Article = require('../models').Article;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// instantiate a new scraper instance for global use
const scraper = new Scraper();

const nullifyArticles = async (combinedAids, categoryID) => {
  await Article.findAll({
    where: {
      category_id: categoryID,
      aid: {
        [Op.notIn]: combinedAids
      },
      rank: {
        [Op.not]: null
      }
    }
  })
    .then(articlesToUpdate => {
      // articlesToUpdate.forEach(article => {
      //   article.update({ rank: null });
      // });
      for (let i = 0; i < articlesToUpdate.length; i++) {
        articlesToUpdate[i].update({ rank: null });
      }
    })
    .catch(err => { throw err; });
};

const updateOrCreateArticle = async (targetArticle) => {
  let savedArticle = await Article.findOne({ where: {
    aid: targetArticle.aid
  } });

  if (savedArticle) {
    if (savedArticle.get('rank') !== Number(targetArticle.rank)) {
      savedArticle.update({ rank: targetArticle.rank });
    }
  } else {
    // no article found
    Article.create(targetArticle);
  }
};

const returnURLs = async (categoryID) => {
  let urls;

  await Article.findAll({
    where: {
      category_id: categoryID,
      rank: {
        [Op.not]: null
      },
      publisher: null
    }
  }).then(articles => {
    urls = _.pluck(articles, 'source_url');
  }).catch(err => { throw err; });

  return urls;
};

const updateArticles = async (articlesList, categoryID) => {
  /*
  combined aids는 현재 인기 기사 30개 각 aid의 array로써
  현재 인기 기사와 데이터베이스에 있지만 더이상 인기없는 기사를
  구분하기 위해서 수집합니다.
  */
  let combinedAids = _.pluck(articlesList, 'aid');

  /*
  이번에 업데이트 되지 않은 기사들은
  더이상 실시간 리스트에 등장하지 않는 기사들이므로
  삭제하진 않고 rank을 null로 업데이트합니다.
  */
  await nullifyArticles(combinedAids, categoryID);

  /*
  인기 기사 고유의 aid를 통해 기존 데이터베이스에 저장된
  기사의 aid를 비교하여 이미 기사가 저장되어 있는 경우
  저장된 기사의 현재 랭크를 업데이트 합니다.

  저장된 기사가 없는 경우 해당 인기 기사를 Article 모델을 통해
  생성합니다.
  */
  for (let i = 0; i < articlesList.length; i++) {
    await updateOrCreateArticle(articlesList[i]);
  }

  // 이번 작업에서 update된 articles를
  // 다음 작업 (기사 내용 fetch)을 위해 리턴합니다.
  let articleURLs = await returnURLs(categoryID);

  return articleURLs;
};

const fetchArticleContent = async (urls) => {
  for (let i = 0; i < urls.length; i++) {
    await scraper.getArticleContent(urls[i])
      .then(articleContent => {
        Article.findOne({
          where: { aid: articleContent.aid }
        })
          .then(savedArticle => {
            if (savedArticle.aid === articleContent.aid) {
              savedArticle.update({
                publisher: articleContent.publisher
              });
            }
          })
          .catch(err => { throw err; });
      })
      .catch(err => { throw err; });
  }
};

const saveArticlesList = (categoryID) => {
  return new Promise(async (resolve, reject) => {
    // 기사 목록을 가져온다
    let articles = await scraper.getArticleList(categoryID);
    let articleURLsToFetch = await updateArticles(articles, categoryID);

    resolve(articleURLsToFetch);
  });
};

const test = async (categoryID) => {
  let articles = await Article.findAndCountAll({
    where: {
      category_id: categoryID,
      rank: {
        [Op.not]: null
      },
      publisher: {
        [Op.not]: null
      }
    }
  }).catch(err => { throw err; });

  console.log('===================================');
  console.log('COUNT:', articles.count);
  console.log('===================================');
};

const run = async (categoryID) => {
  let urls = await saveArticlesList(categoryID);
  await fetchArticleContent(urls);

  // test
  await test(categoryID);
  // terminate the task
  process.exit(0);
};

run(argv.c);
