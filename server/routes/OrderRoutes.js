const express = require('express');
const { fetchOrder, createOrder, updateOrder, deleteOrder, ePayment } = require('../controllers/OrderController');
const OrderRouter = express.Router();

OrderRouter
.get('/', fetchOrder)
.post('/', createOrder)
.post('/payment', ePayment)
.patch('/:id', updateOrder)
.delete('/:id', deleteOrder)

module.exports = OrderRouter