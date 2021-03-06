'use strict';

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Article = require('./article')(sequelize, Sequelize);
db.Category = require('./category')(sequelize, Sequelize);

db.Article.belongsTo(db.Category, {
  foreignKey: 'category_id',
  sourceKey: 'id',
  onDelete: 'CASCADE'
});

module.exports = db;
