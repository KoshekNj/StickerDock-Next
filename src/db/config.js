const { Sequelize } = require("sequelize");
//const buildModels = require("./models/index");

const db = new Sequelize("bla", "root", "Mgmt567", {
  host: "127.0.0.1",
  port: 3306,
  dialect: "mysql",
  // ssl: true
});

//db.sync({ force: true });

module.exports = db;
