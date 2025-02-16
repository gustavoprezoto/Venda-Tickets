const express = require("express");
const sequelize = require("./config/database");
const mustacheExpress = require("mustache-express");
const PROPERTIES = require("./config/properties");
const { User, Ticket, UserTicket } = require("./models");

const app = express();

// Middleware for json parsing:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mustache configs:
app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", __dirname + "/views");

// Configuração de rotas
const userRoutes = require("./routes/userRoutes");
app.use("/users", userRoutes);

(async () => {
  try {
    await sequelize.sync();
    app.listen(PROPERTIES.APPLICATION.PORT, () => console.log("Serving running on port " + PROPERTIES.APPLICATION.PORT));
  }

  catch (error) {
    console.error("Failed synchroninzing mysql database:", error);
  }
})();