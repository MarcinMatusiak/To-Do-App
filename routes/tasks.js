const mongoose = require('mongoose');
const Task = require('../models/user');

async function createTask(){
    const task = new Task({
        name: 'first task'
    });

    const savedTask = await task.save();
    console.log(savedTask);
}