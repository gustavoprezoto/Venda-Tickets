const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Ticket = require("./Ticket");

const UserTicket = sequelize.define('UserTicket', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ticket_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'user_tickets',
  timestamps: true,
  createdAt: 'purchase_date',
  updatedAt: false,
});

UserTicket.belongsTo(Ticket, { foreignKey: "ticket_id" });

module.exports = UserTicket;