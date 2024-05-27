const {loginFunc, signupFunc, userVerification} = require('../controller/loginController')
const routerL = require('express').Router();
routerL.post('/login',loginFunc)
        .post('/signup',signupFunc)
        .post('/',userVerification);

module.exports = routerL;