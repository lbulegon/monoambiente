module.exports = {
    development: {
      username: 'root',
      password: 'senha',
      database: 'meu_banco_de_dados',
      host: 'localhost',
      dialect: 'mysql',
    },
    production: {
      use_env_variable: 'DATABASE_URL',
      dialect: 'mysql',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    },
  };
  