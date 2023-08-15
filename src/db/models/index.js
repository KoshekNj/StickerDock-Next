const StickerPack = require("./stickerPack");
const StickerPackTags = require("./stickerPackTags");
const User = require("./user");
const Sticker = require("./sticker");
const Image = require("./image");
const Comment = require("./comment");
const Follower = require("./follower");
const PublishedItem = require("./publishedItem");
const Tag = require("./tag");

let array = [
  Sticker,
  StickerPack,
  Comment,
  Tag,
  User,
  Image,
  StickerPackTags,
  Follower,
  PublishedItem,
];

const db = require("../config");
db.sync({ force: true });

// module.exports = {
//   buildModels,
// };
