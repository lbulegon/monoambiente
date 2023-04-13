const Sequelize = require('sequelize');

const sequelize = new Sequelize('aws_cango', 'lbulegon', 'Ljb#215195', {
  host: 'localhost',
  dialect: 'mysql',
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
  })
  .catch((error) => {
    console.error('Erro ao conectar ao banco de dados:', error);
  });

module.exports = sequelize;
