'use strict';
const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/product-repository');

exports.get = async(req, res, next) => {
    try {
        var data = await    repository.get();
        res.status(200).send(data);   
    } catch (e) {
        res.status(500).send({message: 'Falha ao processar requisição'})
    }
};

exports.getBySlug = async(req, res, next) => {
   try{
    var data = await repository.getBySlug(req.params.slug);
    res.status(200).send(data);
    } catch (e) {
    res.status(500).send({message: 'Falha ao processar requisição'});
    }
}

exports.getByTag = async(req, res, next) => {
    try{
        var data = await repository.getByTag(req.params.tag);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({message: 'Falha ao processar requisição'});
    }
}

exports.getById = async(req, res, next) => {
    try{
        var data =  await repository.findById(req.params.id);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({message: 'Falha ao processar requisição'});
    }
}

exports.post = (req, res, next) => {
    let contract =  new ValidationContract();
    contract.hasMinLen(req.body.title, 3,'O título deve conter mais que 3 caracters!');
    contract.hasMinLen(req.body.description, 3,'A descrição deve conter mais que 3 caracters!');
    contract.hasMinLen(req.body.slug, 3,'O Slug deve conter mais que 3 caracters!');
    
    // se os dados forem validos
    if (!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }
    var product  = new Product(req.body);
   // product.title = req.body.title;

    product.save()
    .then(x =>{
        res.status(201).send({message: 'Produto cadastrao com sucesso!'});
    }).catch(e=>{
        res.status(400).send({message: 'Falha ao cadastrar o produto!', data: e});
    });
};

exports.put = (req, res, next) => {
    Product
        .findByIdAndUpdate(req.params.id, {
            $set: {
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
                slug: req.body.slug
            }
        }).then( x => {
            res.status(200).send({
                message:'Produto atualizado com sucesso!'
            });
        }).catch( e => { 
            res.status(400).send({
                message: 'falha ao atualizar produto! ',
                data: e
            });
        });
    };

exports.delete = (req, res, next) => {
    Product
        .findOneAndRemove(req.body.id)
        .then( x => {
            res.status(200).send({
                message:'Produto removido com sucesso!'
            });
        }).catch( e => { 
            res.status(400).send({
                message: 'falha ao remover produto! ',
                data: e
            });
        });
    };
  
/*
exports.put = (req, res, next) => {
    const id  = req.params.id;
    res.status(200).send({
        id : id ,
        item : req.body
    });
};
 
exports.delete = (req, res, next) => {
    res.status(200).send(req.body);
};
 */
