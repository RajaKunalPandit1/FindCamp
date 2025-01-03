const express = require('express');
const router = express.Router();
const catchAsynch = require('../utils/catchAsync');
const User = require('../models/user');
const { resourceUsage } = require('process');
const passport = require('passport');
const { storeReturnTo } = require('../middleware');
const users = require('../controllers/users');


router.get('/register', users.renderRegister);

router.post('/register', catchAsynch(users.register));

router.get('/login', users.renderLogin);

// router.post('/login', passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), (req,res)=>{
//     req.flash('success', 'Welcome Back!');
//     const redirectUrl = req.session.returnTo || '/campgrounds';
//     delete req.session.returnTo;
//     res.redirect(redirectUrl);
// })

router.post('/login',
    // use the storeReturnTo middleware to save the returnTo value from session to res.locals
    storeReturnTo,
    // passport.authenticate logs the user in and clears req.session
    passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}),
    // Now we can use res.locals.returnTo to redirect the user after login
    users.login);

router.get('/logout', users.logout); 

module.exports = router;