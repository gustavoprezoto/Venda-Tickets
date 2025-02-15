const sequelize = require("../config/database");

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("MySql connection stablished!");
  } catch (error) {
    console.error("Failed connecting with mysql:", error);
  }
}

testConnection();
