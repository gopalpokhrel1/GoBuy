const mongoose = require('mongoose');
const {Schema} = require('mongoose');

const productSchema = new Schema({
title: {type:String},
description: {type:String},
price: {type:Number},
discountPercentage:{type:Number},
rating: {type:Number},
stock:{type:Number},
brand: {type:String},
category: {type:String},
thumbnail:{type:String},
images:{type:[String]},
deleted:{type:Boolean}
})

const virtual = productSchema.virtual('id');
virtual.get(function(){
    return this._id;
})

productSchema.set('toJSON', {
    virtuals:true,
    versionKey:false,
    transform: function(doc,ret) { delete ret._id}

})

exports.Product = mongoose.model('products', productSchema) || mongoose.models.products;

