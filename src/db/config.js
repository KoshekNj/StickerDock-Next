const { Sequelize } = require("sequelize");

const db = new Sequelize("world", "root", "Mgmt567", {
  host: "127.0.0.1",
  port: 3306,
  dialect: "mysql",
  // ssl: true
});

module.exports = db;
