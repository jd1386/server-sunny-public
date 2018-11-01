'use strict';
module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    content: {
      type: DataTypes.TEXT
    },
    source_url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    publisher: DataTypes.STRING,
    image_url: DataTypes.STRING,
    file_url: DataTypes.STRING,
    rank: DataTypes.TINYINT,
    sid: DataTypes.STRING,
    oid: DataTypes.STRING,
    aid: DataTypes.STRING,
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('now()')
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('now()')
    }
  }, {
    timestamps: false
  });
  return Article;
};
