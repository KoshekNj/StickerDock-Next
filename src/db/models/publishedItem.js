const { Sequelize } = require("sequelize");
const db = require("../config");
const User = require("./user");
const StickerPack = require("./stickerPack");
const Image = require("./image");

const PublishedItem = db.define(
  "publishedItem",
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
    },
    likes: {
      type: Sequelize.INTEGER,
    },
    public: {
      type: Sequelize.BOOLEAN,
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
