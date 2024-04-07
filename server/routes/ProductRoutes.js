const express = require('express');
const { createProducts, fetchAllProducts, fetchSpecificProduct, updateProduct, deleteProduct } = require('../controllers/ProductsController');
const { verifytoken } = require('../middleware/verifytoken');

const ProductRouter = express.Router();

ProductRouter
.get('/', verifytoken,  fetchAllProducts)
.get('/:id', fetchSpecificProduct)
.post('/', createProducts)
.patch('/:id', updateProduct)
.delete('/:id', deleteProduct);


module.exports = ProductRouter;