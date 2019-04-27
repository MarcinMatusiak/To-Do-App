const {Task, validate} = require('../models/task');
const express = require('express');
const router = express.Router();

router.post('/', async(req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).json({error: error.details[0].message});

    let task = new Task({
        content: req.body.content,
        isDone: req.body.isDone
    });

  await task.save();
  res.status(200).json({task: task})
});

router.get('/', async (req, res) => {
  Task.find({})
    .then(results => {
      let todo = results.filter((task) => task.isDone === 'to do')
      let inprogress= results.filter((task) => task.isDone === 'in progress')
      let done = results.filter((task) => task.isDone === 'done')
      res.render('todo', {todos: todo, inprogress: inprogress, done: done})
    });
})

module.exports = router;