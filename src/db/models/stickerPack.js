const { Sequelize } = require("sequelize");
const db = require("../config");
const mysql = require("mysql2/promise");

// initialize();
// let sequelize;
// let StickerPack;
// async function initialize() {
//   const db = await mysql.createConnection({
//     host: "localhost",
//     port: 3306,
//     user: "root",
//     password: "Mgmt567",
//   });
//   await db.query(`CREATE DATABASE IF NOT EXISTS BLA`);

//   sequelize = new Sequelize("newtestdb", "root", "Mgmt567", {
//     dialect: "mysql",
//   });

//   console.log(
//     "SGHČAGHGHFHLČGLHKČGALKHGFLKGFLKHGSKLHGSFLKFGAKGFLKGAKLGADGLDFA",
//     sequelize
//   );

//   StickerPack = await sequelize.define(
//     "stickerpack",
//     {
//       id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//         allowNull: false,
//         unique: true,
//       },
//       name: {
//         type: Sequelize.STRING,
//         allowNull: false,
//       },
//       userId: {
//         type: Sequelize.INTEGER,
//         allowNull: false,
//       },
//       label: {
//         type: Sequelize.TEXT,
//         allowNull: false,
//       },
//     },
//     {
//       freezeTableName: true,
//       timestamps: false,
//     }
//   );
// }

const StickerPack = db.define(
  "city",
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
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
module.exports = StickerPack;
