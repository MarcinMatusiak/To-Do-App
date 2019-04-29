const {Task,validate} = require('../models/task');
const express = require('express');
const router = express.Router();

router.delete('/:id', async (req, res) => {
    let task = await Task.findById({
        _id: req.params.id
    });
    if (!task) return res.status(404).send('There are no task with given id in the database');
    await Task.findByIdAndRemove(req.params.id);
    res.status(200).render('todo');
});

router.delete('/', async (req, res) => {
    await Task.deleteMany({ __v: 0});
});

module.exports = router;