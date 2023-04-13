const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'segredo', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.set('views', './views');
app.set('view engine', 'ejs');

// Rotas aqui

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
