const express = require('express');
const app = express();
const PORT = 3000;
const User = require('./models/User');

app.get('/', (req, res) => {
  User.findAll()
    .then((users) => {
      res.send(users);
    })
    .catch((error) => {
      res.status(500).send('Erro ao consultar usuários');
    });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
