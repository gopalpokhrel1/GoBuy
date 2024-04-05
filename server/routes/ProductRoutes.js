const express = require('express');
const { createProducts, fetchAllProducts, fetchSpecificProduct, updateProduct } = require('../controllers/ProductsController');
const { verifytoken } = require('../middleware/verifytoken');

const ProductRouter = express.Router();

ProductRouter
.get('/', verifytoken,  fetchAllProducts)
.get('/:id', fetchSpecificProduct)
.post('/', createProducts)
.patch('/:id', updateProduct);


module.exports = ProductRouter;