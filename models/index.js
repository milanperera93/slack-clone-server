import Sequelize from 'sequelize';

const sequelize = new Sequelize('slack', 'postgres', 'postgres', {
  dialect: 'postgres',
  operatorsAliases: false,
  define: {
    underscored: true,
  },
});
const models = {
  User: sequelize.import('./user.js'),
  Team: sequelize.import('./team.js'),
  Channel: sequelize.import('./channel.js'),
  Message: sequelize.import('./message.js'),
};

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
