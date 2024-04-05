const express = require('express');
const { createUser, getUser, updateUser, getSpecificUser } = require('../controllers/UserController');

const UserRouter = express.Router();

UserRouter.get('/:id', getSpecificUser)
.patch('/:id',updateUser)


module.exports = UserRouter