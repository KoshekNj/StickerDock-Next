const { Sequelize } = require("sequelize");
const db = require("../config");
const User = require("./user");

const StickerPack = db.define(
  "stickerpack",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    labelUrl: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

User.hasMany(StickerPack);
StickerPack.belongsTo(User);

module.exports = StickerPack;
