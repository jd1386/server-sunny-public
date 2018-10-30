module.exports = {
  up: function (queryInterface, Sequelize) {
    // 시드 데이터를 추가한다.
    return queryInterface.bulkInsert('Categories', [
      {
        name: 'politics',
        name_ko: '정치'
      },
      {
        name: 'economy',
        name_ko: '경제'
      },
      {
        name: 'society',
        name_ko: '사회'
      },
      {
        name: 'life',
        name_ko: '생활'
      },
      {
        name: 'world',
        name_ko: '세계'
      },
      {
        name: 'technology',
        name_ko: 'IT'
      },
      {
        name: 'sports',
        name_ko: '스포츠'
      },
      {
        name: 'entertainment',
        name_ko: '연예'
      }
    ], {});
  },

  down: function (queryInterface, Sequelize) {
    // 추가했던 모든 데이터를 삭제한다.
    return queryInterface.bulkDelete('Categories', {});
  }
};
