const db = require("../config");
const StickerPack = require("./stickerPack");
const Tag = require("./tag");

const StickerPackTags = db.define(
  "stickerPackTags",
  {},
  {
    freezeTableName: true,
    timestamps: false,
  }
);

StickerPack.belongsToMany(Tag, {
  through: StickerPackTags,
  foreignKey: "stickerPackId",
  primaryKey: true,
});

Tag.belongsToMany(StickerPack, {
  through: StickerPackTags,
  foreignKey: "tagId",
  primaryKey: true,
});

module.exports = StickerPackTags;
