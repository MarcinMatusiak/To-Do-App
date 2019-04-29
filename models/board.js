const mongoose = require('mongoose');
const Joi = require('joi');

const boardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    decsription: {
        type: String,
        required: false,
        default: false,
    },
    date: {
        type: Date, 
        default: Date.now
    }
});

const Board = mongoose.model('Board', boardSchema);

function validateBoard(board) {
    const schema = {
        name: Joi.string().required(),
        decsription: Joi.string(),
        date: Joi.date()
    }
    return Joi.validate(board, schema);
}

exports.Board = Board;
exports.validate = validateBoard;