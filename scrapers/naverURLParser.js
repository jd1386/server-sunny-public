const queryString = require('query-string');

// https://m.news.naver.com/rankingRead.nhn?oid=109&aid=0003891402&sid1=107&date=20181027&ntype=RANKING

module.exports = (url) => {
  const parsed = queryString.parseUrl(url);
  return {
    sid1: parsed.query.sid1,
    oid: parsed.query.oid,
    aid: parsed.query.aid
  };
};
