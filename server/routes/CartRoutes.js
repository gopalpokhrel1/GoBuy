const express = require('express');
const { createCarts, getSpecificCart, updateCart, deleteItem } = require('../controllers/CartController');


const CartRouter = express.Router();

CartRouter
.get("/",getSpecificCart)
.post("/", createCarts)
.patch("/:id", updateCart)
.delete('/:id', deleteItem)

module.exports = CartRouter;