'use strict';
module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    source_url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    publisher: DataTypes.STRING,
    image_url: DataTypes.STRING,
    file_url: DataTypes.STRING,
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
  Article.associate = function (models) {
    // associations can be defined here
  };
  return Article;
};
