const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'lbulegon',
  password: 'Ljb#215195',
  database: 'aws_cango'
});

connection.connect((error) => {
  if (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  } else {
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
  }
});

module.exports = connection;
