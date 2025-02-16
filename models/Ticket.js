const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Ticket = sequelize.define('Ticket', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  quantity_available: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'tickets',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
});

module.exports = Ticket;