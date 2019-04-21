const mongoose = require('mongoose');
const Joi = require('joi');
const PasswordComplexity = require('joi-password-complexity');
const config = require('config');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true
    }
});

userSchema.methods.generateToken = function(){
    const token = jwt.sign({ _id: this._id }, config.get('jwtPrivateKey'));
    // localStorage.setItem("token", JSON.stringify(token));
    return token;
}
const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = {
        login: Joi.string().required(),
        password: new PasswordComplexity().required()
    }

    return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;