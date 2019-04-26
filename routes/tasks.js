const {Task, validate} = require('../models/task');
const express = require('express');
const router = express.Router();

router.post('/', async(req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).json({error: error.details[0].message});

    let task = new Task({
        name: req.body.name,
        isDone: req.body.isDone
    });

  await task.save();
  res.status(200).json({task: task});
});

router.get('/', async (req, res) => {
  Task.find({})
    .then(results => {
      res.render('todo', {todos: results})
    });
})

module.exports = router;