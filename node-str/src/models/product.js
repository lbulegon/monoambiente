'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema  =  new Schema({
    title:{
        type : String,
        required: true,
        trim: true
    },
    slug:{
        type: String,
        riquired: true,
        trim: true,
        index:true,
        unique:true
    },
    descritpion:{
        type : String,
        required: true,
        trim: true
    },
    price:{
        type: Number,
        required: true
    },
    activate:{
        type: Boolean,
        required:true,
        default: true
    },
    tags:[{
        type:String,
        required:true
    }]
});

module.exports = mongoose.model('Product', schema);