const { Sequelize } = require("sequelize");
const PROPERTIES = require("../config/properties");

const sequelize = new Sequelize(PROPERTIES.DATABASE.NAME, PROPERTIES.DATABASE.USER, PROPERTIES.DATABASE.PASSWORD, {
    host: "localhost",
    dialect: "mysql",
    logging: false,
  });
  
module.exports = sequelize;