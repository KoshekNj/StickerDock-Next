const { Sequelize } = require("sequelize");
const db = require("../config");
const User = require("./user");
const StickerPack = require("./stickerPack");
const Image = require("./image");

const PublishedItem = db.define(
  "publisheditem",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    date: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
    likes: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    public: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

User.hasMany(PublishedItem);
PublishedItem.belongsTo(User);

Image.hasOne(PublishedItem);
PublishedItem.belongsTo(Image);

StickerPack.hasOne(PublishedItem);
PublishedItem.belongsTo(StickerPack);

module.exports = PublishedItem;
