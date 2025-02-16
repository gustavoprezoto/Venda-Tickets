const { sequelize, User, Ticket, UserTicket } = require('./models');

(async () => {
  try {
    await sequelize.sync({ force: true }); // force: true recria as tabelas
    console.log('Tabelas criadas com sucesso!');
  } catch (error) {
    console.error('Erro ao criar tabelas:', error);
  } finally {
    await sequelize.close();
  }
})();