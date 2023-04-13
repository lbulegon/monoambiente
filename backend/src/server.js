//https://github.com/expressjs/express/blob/master/examples/auth/index.js


// Importando as dependências
const express = require('express');
const Sequelize = require('sequelize');

var hash = require('pbkdf2-password')()
var path = require('path');
var session = require('express-session');


// DO NOT expose these values to public
const apiKey = "YOUR_PI_API_KEY"
const walletPrivateSeed = "S_YOUR_WALLET_PRIVATE_SEED" // starts with S
const pi = new PiNetwork(apiKey, walletPrivateSeed);

var app = module.exports = express();

// middleware

app.use(express.urlencoded({ extended: false }))
app.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: 'shhhh, very secret'
}));


// Session-persisted message middleware

app.use(function(req, res, next){
  var err = req.session.error;
  var msg = req.session.success;
  delete req.session.error;
  delete req.session.success;
  res.locals.message = '';
  if (err) res.locals.message = '<p class="msg error">' + err + '</p>';
  if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>';
  next();
});

// dummy database
var users = {
  tj: { name: 'tj' }
};

// when you create a user, generate a salt
// and hash the password ('foobar' is the pass here)

hash({ password: 'foobar' }, function (err, pass, salt, hash) {
  if (err) throw err;
  // store the salt & hash in the "db"
  users.tj.salt = salt;
  users.tj.hash = hash;
});


// Authenticate using our plain-object database of doom!
function authenticate(name, pass, fn) {
  if (!module.parent) console.log('authenticating %s:%s', name, pass);
  var user = users[name];
  // query the db for the given username
  if (!user) return fn(null, null)
  // apply the same algorithm to the POSTed password, applying
  // the hash against the pass / salt, if there is a match we
  // found the user
  hash({ password: pass, salt: user.salt }, function (err, pass, salt, hash) {
    if (err) return fn(err);
    if (hash === user.hash) return fn(null, user)
    fn(null, null)
  });
}

function restrict(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    req.session.error = 'Access denied!';
    res.redirect('/login');
  }
}


// Criando uma instância do Express
//const app = express();

// Configurando a porta da aplicação
const port = process.env.PORT || 3000;

// Conexão com o banco de dados
const sequelize = new Sequelize('aws_cango', 'lbulegon', 'Ljb#215195', {
  host: 'localhost',
  dialect: 'mysql'
});

// Definindo o modelo da tabela
const Usuario = sequelize.define('usuarios', {
  nome: {
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
  }
});


// Rota padrão para a página de abertura
app.set('views', './views');
app.set('view engine', 'ejs');


//app.get('/index', (req, res) => {
//  res.render('index', { message: 'C A N G O'});
//});

app.get('/', function(req, res){
  res.redirect('/login');
});

app.get('/login', function(req, res){
  res.render('login');
});


app.get('/register', function(req, res){
  res.render('register');
});



app.get('/restricted', restrict, function(req, res){
  //res.send('Wahoo! restricted area, click to <a href="/logout">logout</a>');
  res.render('index', { message: 'C A N G O'});
});


app.get('/logout', function(req, res){
  // destroy the user's session to log them out
  // will be re-created next request
  req.session.destroy(function(){
    res.redirect('/');
  });
});


app.post('/login', function (req, res, next) {
  authenticate(req.body.username, req.body.password, function(err, user){
    if (err) return next(err)
    if (user) {
      // Regenerate session when signing in to prevent fixation
      req.session.regenerate(function(){
        // Store the user's primary key in the session store to be retrieved,
        // or in this case the entire user object
        req.session.user = user;
        //req.session.success = 'Authenticated as ' + user.name
        //  + ' click to <a href="/logout">logout</a>. '
        //  + ' You may now access <a href="/restricted">/restricted</a>.';
        //res.redirect('back');
        res.render('index', { message: 'C A N G O'});
      });
    } else {
      req.session.error = 'Authentication failed, please check your '
        + ' username and password.'
        + ' (use "tj" and "foobar")';
      res.redirect('/login');
    }
  });
});









// Rota para criar a tabela no banco de dados
app.get('/criar-tabela', (req, res) => {
  // Sincronizando o modelo com o banco de dados
  sequelize.sync().then(() => {
    res.send('Tabela criada com sucesso.');
  }).catch((erro) => {
    res.send(`Erro ao criar tabela: ${erro}`);
  });
});

// Rota para popular a tabela com alguns dados
app.get('/popular-tabela', (req, res) => {
  // Criando um usuário
  Usuario.create({
    nome: 'João',
    email: 'jjoao@email.com',
    idade: 25
  }).then((usuario) => {
    res.send(`Usuário criado com sucesso: ${usuario.nome}`);
  }).catch((erro) => {
    res.send(`Erro ao criar usuário: ${erro}`);
  });
});

// Rota para ler os dados da tabela
app.get('/ler-tabela', (req, res) => {
  // Lendo os usuários
  Usuario.findAll().then((usuarios) => {
    let resultado = '';
    usuarios.forEach((usuario) => {
      resultado += `${usuario.nome} (${usuario.email}), ${usuario.idade} anos <br>`;
    });
    res.render('index', { message: 'C A N G O', pessoas: pessoas });
    res.send(resultado);
  }).catch((erro) => {
    res.send(`Erro ao ler tabela: ${erro}`);
  });
});

// Iniciando o servidor
app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}.`);
});
