module.exports = {
  up: function (queryInterface, Sequelize) {
    // 시드 데이터를 추가한다.
    return queryInterface.bulkInsert('Articles', [
      {
        title: '테스트 데이터 제목 1',
        content: '테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터',
        source_url: 'https://m.news.naver.com/rankingRead.nhn?oid=421&aid=0003664078&sid1=102&date=20181029&ntype=RANKING',
        publisher: '중앙일보',
        image_url: 'https://mimgnews.pstatic.net/image/origin/421/2018/10/29/3664078.jpg?type=nf144_144',
        file_url: '',
        sid: '102',
        oid: '421',
        aid: '0003664078',
        category_id: 1
      },
      {
        title: '테스트 데이터 제목 2',
        content: '테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터',
        source_url: 'https://m.news.naver.com/rankingRead.nhn?oid=421&aid=0003664078&sid1=102&date=20181029&ntype=RANKING',
        publisher: '중앙일보',
        image_url: 'https://mimgnews.pstatic.net/image/origin/421/2018/10/29/3664078.jpg?type=nf144_144',
        file_url: '',
        sid: '102',
        oid: '421',
        aid: '0003664078',
        category_id: 1
      },
      {
        title: '테스트 데이터 제목 3',
        content: '테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터',
        source_url: 'https://m.news.naver.com/rankingRead.nhn?oid=421&aid=0003664078&sid1=102&date=20181029&ntype=RANKING',
        publisher: '중앙일보',
        image_url: 'https://mimgnews.pstatic.net/image/origin/421/2018/10/29/3664078.jpg?type=nf144_144',
        file_url: '',
        sid: '102',
        oid: '421',
        aid: '0003664078',
        category_id: 1
      },
      {
        title: '테스트 데이터 제목 4',
        content: '테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터',
        source_url: 'https://m.news.naver.com/rankingRead.nhn?oid=421&aid=0003664078&sid1=102&date=20181029&ntype=RANKING',
        publisher: '중앙일보',
        image_url: 'https://mimgnews.pstatic.net/image/origin/421/2018/10/29/3664078.jpg?type=nf144_144',
        file_url: '',
        sid: '102',
        oid: '421',
        aid: '0003664078',
        category_id: 2
      },
      {
        title: '테스트 데이터 제목 5',
        content: '테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터',
        source_url: 'https://m.news.naver.com/rankingRead.nhn?oid=421&aid=0003664078&sid1=102&date=20181029&ntype=RANKING',
        publisher: '중앙일보',
        image_url: 'https://mimgnews.pstatic.net/image/origin/421/2018/10/29/3664078.jpg?type=nf144_144',
        file_url: '',
        sid: '102',
        oid: '421',
        aid: '0003664078',
        category_id: 2
      },
      {
        title: '테스트 데이터 제목 6',
        content: '테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터',
        source_url: 'https://m.news.naver.com/rankingRead.nhn?oid=421&aid=0003664078&sid1=102&date=20181029&ntype=RANKING',
        publisher: '중앙일보',
        image_url: 'https://mimgnews.pstatic.net/image/origin/421/2018/10/29/3664078.jpg?type=nf144_144',
        file_url: '',
        sid: '102',
        oid: '421',
        aid: '0003664078',
        category_id: 2
      },
      {
        title: '테스트 데이터 제목 7',
        content: '테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터',
        source_url: 'https://m.news.naver.com/rankingRead.nhn?oid=421&aid=0003664078&sid1=102&date=20181029&ntype=RANKING',
        publisher: '중앙일보',
        image_url: 'https://mimgnews.pstatic.net/image/origin/421/2018/10/29/3664078.jpg?type=nf144_144',
        file_url: '',
        sid: '102',
        oid: '421',
        aid: '0003664078',
        category_id: 3
      },
      {
        title: '테스트 데이터 제목 8',
        content: '테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터',
        source_url: 'https://m.news.naver.com/rankingRead.nhn?oid=421&aid=0003664078&sid1=102&date=20181029&ntype=RANKING',
        publisher: '중앙일보',
        image_url: 'https://mimgnews.pstatic.net/image/origin/421/2018/10/29/3664078.jpg?type=nf144_144',
        file_url: '',
        sid: '102',
        oid: '421',
        aid: '0003664078',
        category_id: 3
      },
      {
        title: '테스트 데이터 제목 9',
        content: '테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터 테스트 데이터',
        source_url: 'https://m.news.naver.com/rankingRead.nhn?oid=421&aid=0003664078&sid1=102&date=20181029&ntype=RANKING',
        publisher: '중앙일보',
        image_url: 'https://mimgnews.pstatic.net/image/origin/421/2018/10/29/3664078.jpg?type=nf144_144',
        file_url: '',
        sid: '102',
        oid: '421',
        aid: '0003664078',
        category_id: 3
      }
    ], {});
  },

  down: function (queryInterface, Sequelize) {
    // 추가했던 모든 데이터를 삭제한다.
    return queryInterface.bulkDelete('Articles', {});
  }
};
