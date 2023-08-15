const { Sequelize } = require("sequelize");
const db = require("../config");
const PublishedItem = require("./publishedItem");

const Comment = db.define(
  "comment",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    text: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    date: {
      type: Sequelize.DATE,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

PublishedItem.hasMany(Comment);
Comment.belongsTo(PublishedItem);

module.exports = Comment;
