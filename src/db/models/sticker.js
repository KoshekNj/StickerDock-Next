const { Sequelize } = require("sequelize");
const db = require("../config");
const StickerPack = require("./stickerPack");

const Sticker = db.define(
  "sticker",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    imageUrl: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

StickerPack.hasMany(Sticker);
Sticker.belongsTo(StickerPack);

module.exports = Sticker;
