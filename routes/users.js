const {User, validate} = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');


router.post('/', async (req, res) => {
     const { error } = validate(req.body);
     if (error) return res.status(400).render('register', {"error": error.details[0].message});

     let user = await User.findOne({ login: req.body.login });
     if (user) return res.status(400).render('register', {"error":"Login already taken."});

     user = new User({
         login: req.body.login,
         password: req.body.password
     });
     const salt = await bcrypt.genSalt(10);
     user.password = await bcrypt.hash(user.password, salt);
     await user.save();

     const token = user.generateToken();
     res.header('x-log-token', token).redirect('/me');
});

module.exports = router;