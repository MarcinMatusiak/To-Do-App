const {User} = require('../models/user');
const express = require('express');
const Joi = require('joi');
const router = express.Router();
const bcrypt = require('bcrypt');
const PasswordComplexity = require('joi-password-complexity');



router.post('/', async (req, res) => {
     const { error } = validate(req.body);
     if (error) return res.status(400).json({error: error.details[0].message});

     let user = await User.findOne({ login: req.body.login });
     if (!user) return res.status(400).json({error:"Invalid login or password"});

    const isValidPassword = await bcrypt.compare(req.body.password, user.password);
    if (!isValidPassword) return res.status(400).json({error:"Invalid login or password"});
    
    const token = user.generateToken();
    res.status(200).json({ token: token});
});

function validate(req) {
    const schema = {
        login: Joi.string().required(),
        password: new PasswordComplexity().required()
    }

    return Joi.validate(req, schema);
}

module.exports = router;