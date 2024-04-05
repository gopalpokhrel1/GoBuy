const express = require('express');
const { createUser, loginUser } = require('../controllers/AuthController');
const AuthRouter = express.Router();

AuthRouter
.post('/login', loginUser)
.post('/signup', createUser);

module.exports = AuthRouter;