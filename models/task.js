const mongoose = require('mongoose');
const Joi = require('joi');

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    isDone: {
        type: String,
        enum: ['to do', 'in progress', 'done'],
        default: 'to do',
    }
});

const Task = mongoose.model('Task', taskSchema);

function validateTask(task) {
    const schema = {
        name: Joi.string().required(),
        isDone: Joi.boolean()
    }

    return Joi.validate(task, schema);
}

exports.Task = Task;
exports.validate = validateTask;