const express = require('express');
const Task = require('../models/task');
const auth = require('../middleweare/auth');

const router = new express.Router();

router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    });

    try {
        const saveTask = await task.save()
        res.status(201).send(saveTask)
    } catch (error) {
        res.status(400).send(error)
    }
});

//GET /tasks?completed=true
//GET /tasks?limit=2&skip=2
//GET /tasks?sortBy=createdAt:desc
router.get('/tasks', auth, async (req, res) => {
    const match = {};
    const sort = {};
    if(req.query.sortBy) {
        const parts=req.query.sortBy.split(':');
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    }

    if (req.query.completed && req.query.completed.length > 0) {
        match.completed = req.query.completed === 'true';
    }

    try {
        // const tasks = await Task.find({owner: req.user._id});
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate();
        res.send(req.user.tasks);
    } catch (error) {
        res.status(500).send()
    }
});

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;
    try {
        const task = await Task.findOne({ _id, owner: req.user._id });
        return task ? res.send(task) : res.status(404).send();
    } catch (error) {
        console.log(error);

        res.status(500).send()
    }
});

router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400).send({ error: "invalid update" });
    }
    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id });

        if (!task) {
            return res.status(404).send();
        }

        updates.forEach(updateField => {
            task[updateField] = req.body[updateField]
        });
        await task.save();

        res.send(task);
    } catch (error) {
        res.status(500).send(error);
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
        return task ? res.send(task) : res.status(404).send({ error: 'Task not found' });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})

module.exports = router;