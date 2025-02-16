const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

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

module.exports = UserTicket;