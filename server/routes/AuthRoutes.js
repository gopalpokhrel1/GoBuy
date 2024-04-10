const express = require('express');
const { createUser, loginUser } = require('../controllers/AuthController');
const { upload } = require('../middleware/multer');
const AuthRouter = express.Router();

AuthRouter
.post('/login', loginUser)
.post('/signup',upload.fields([
    {
        name:'profileImage',
        maxCount:1
    }
]) , createUser);

module.exports = AuthRouter;