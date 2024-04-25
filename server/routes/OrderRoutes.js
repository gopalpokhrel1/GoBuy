const express = require('express');
const { fetchOrder, createOrder, updateOrder, deleteOrder, ePayment, updateOrderAfterPayment } = require('../controllers/OrderController');
const { handleKhaltiCallback } = require('../services/khalti');
const OrderRouter = express.Router();

OrderRouter
.get('/', fetchOrder)
.get('/callback', handleKhaltiCallback)
.post('/', createOrder)
.post('/payment', ePayment)
.patch('/:id', updateOrder)
.delete('/:id', deleteOrder)

module.exports = OrderRouter