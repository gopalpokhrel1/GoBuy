const express = require('express');
const { fetchOrder, createOrder, updateOrder, deleteOrder } = require('../controllers/OrderController');
const OrderRouter = express.Router();

OrderRouter
.get('/', fetchOrder)
.post('/', createOrder)
.patch('/:id', updateOrder)
.delete('/:id', deleteOrder)

module.exports = OrderRouter