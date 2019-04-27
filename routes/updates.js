const {Task, validate} = require('../models/task');
const express = require('express');
const router = express.Router();

router.put('/:id', async(req, res) => {
    let task = await Task.findById({_id: req.params.id});
    if (!task) return;

    const { error } = validate(req.body);
    if (error) return res.status(400).json({error: error.details[0].message});

    task.set({
        name: req.body.name,
        isDone: req.body.isDone
    });

  await task.save();
  res.status(200).json({task: task});
});

module.exports = router;