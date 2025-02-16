const sequelize = require('../config/database');
const User = require('./User');
const Ticket = require('./Ticket');
const UserTicket = require('./UserTicket');

// Relation - User and UserTicket (1:N)
User.hasMany(UserTicket, { foreignKey: 'user_id' });
UserTicket.belongsTo(User, { foreignKey: 'user_id' });

// Relation - Ticket and UserTicket (1:N)
Ticket.hasMany(UserTicket, { foreignKey: 'ticket_id' });
UserTicket.belongsTo(Ticket, { foreignKey: 'ticket_id' });

module.exports = {
  sequelize,
  User,
  Ticket,
  UserTicket,
};