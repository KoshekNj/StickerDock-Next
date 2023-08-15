const db = require("../config");
const User = require("./user");

const Follower = db.define(
  "stickerPackTags",
  {},
  {
    freezeTableName: true,
    timestamps: false,
  }
);

User.belongsToMany(User, {
  through: Follower,
  as: "Parents",
  foreignKey: "userId",
  primaryKey: true,
});

User.belongsToMany(User, {
  through: Follower,
  as: "Siblings",
  foreignKey: "followId",
  primaryKey: true,
});

module.exports = Follower;
