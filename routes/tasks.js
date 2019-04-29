const {Task, validate} = require('../models/task');
const express = require('express');
const router = express.Router();

router.post('/:userId', async(req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).json({error: error.details[0].message});

    let task = new Task({
        content: req.body.content,
        isDone: req.body.isDone,
        userId: req.params.userId
    });

  await task.save();
  res.status(200).json({task: task, userId: task.userId})
});

router.get('/:userId', async (req, res) => {
  Task.find({ userId: req.params.userId })
    .then(results => {
      let todo = results.filter((task) => task.isDone === 'to do')
      let inprogress= results.filter((task) => task.isDone === 'in progress')
      let done = results.filter((task) => task.isDone === 'done')
      res.render('todo', {todos: todo, inprogress: inprogress, done: done, userId: req.params.userId})
    });
});

router.put('/:userId/:id', async(req, res) => {
  let task = await Task.findById({_id: req.params.id});
  if (!task) return;

  const { error } = validate(req.body);
  if (error) return res.status(400).json({error: error.details[0].message});

  task.set({
      content: req.body.content,
      isDone: req.body.isDone,
      userId: req.params.userId
  });

await task.save();
res.status(200).json({task: task, userId: task.userId});
});

router.delete('/:userId/:id', async (req, res) => {
  let task = await Task.findById({
      _id: req.params.id
  });
  if (!task) return res.status(404).send('There are no task with given id in the database');
  await Task.findByIdAndRemove(req.params.id);
  res.status(200).json({userId: req.params.userId});
});

router.delete('/:userId', async (req, res) => {
  await Task.deleteMany({ __v: 0});
});

module.exports = router;