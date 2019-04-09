'use strict'
const express = require ('express'); 
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const router  = express.Router();

//Conecta ao banco de dados
mongoose.connect('mongodb://balta:balta123@ds045097.mlab.com:45097/wht_ndstr');

//Carregar os  models
const Product = require('./models/product');


// Carregar rotas
const indexRoute = require('./routes/index-route');
const productRoute = require('./routes/product-route');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/',indexRoute);
app.use('/products',productRoute);

module.exports = app;