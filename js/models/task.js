const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

const Task = mongoose.model('Task', taskSchema);

exports.Task = Task;