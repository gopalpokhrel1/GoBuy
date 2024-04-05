const express = require('express');
const { createProducts, fetchAllProducts, fetchSpecificProduct, updateProduct } = require('../controllers/ProductsController');
const ProductRouter = express.Router();

ProductRouter
.get('/', fetchAllProducts)
.get('/:id', fetchSpecificProduct)
.post('/', createProducts)
.patch('/:id', updateProduct);


module.exports = ProductRouter;