const Sequelize = require('sequelize');

// Conexão com o banco de dados
const sequelize = new Sequelize('aws_cango', 'lbulegon', 'Ljb#215195', {
  host: 'localhost',
  dialect: 'mysql'
});

// Definindo o modelo da tabela
const Usuario = sequelize.define('usuarios', {
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  idade: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false   
  },
  login: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

// Sincronizando o modelo com o banco de dados
sequelize.sync().then(() => {
  console.log('Tabela criada com sucesso.');

  // Criando um usuário
  Usuario.create({
    username: 'João',
    email: 'joao@email.com',
    idade: 25,
    password: 'ljb#215195',
    login: 'lbulegon'
  }).then((usuario) => {
    console.log(`Usuário criado com sucesso: ${usuario.nome}`);

    // Lendo os usuários
    Usuario.findAll().then((usuarios) => {
      console.log('Usuários encontrados:');
      usuarios.forEach((usuario) => {
        console.log(`${usuario.username} (${usuario.email}), ${usuario.idade} anos, ${usuario.login} Login `);
      });

      // Finalizando a conexão
      sequelize.close().then(() => {
        console.log('Conexão encerrada.');
      });
    });
  });
}).catch((erro) => {
  console.log(`Erro ao criar tabela: ${erro}`);
});
