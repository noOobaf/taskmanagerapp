const Task = require('../models/taskModel');

exports.createTask = async (req, res, next) => {
    try {
        const { title, description } = req.body;
        if (!title) {
            return res.status(400).json({ error: 'Title is required' });
        }
        const taskId = await Task.create(title, description, req.user.id);
        res.status(201).json({ message: 'Task created', taskId: Number(taskId) });
    } catch (err) {
        next(err);
    }
};

exports.getAllTasks = async (req, res, next) => {
    try {
        const tasks = await Task.getAll(req.user.id);
        res.json(tasks);
    } catch (err) {
        next(err);
    }
};

exports.markCompleted = async (req, res, next) => {
    try {
        const { id } = req.params;
        await Task.markCompleted(id, req.user.id);
        res.json({ message: 'Task marked as completed' });
    } catch (err) {
        next(err);
    }
};

exports.deleteTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        await Task.delete(id, req.user.id);
        res.json({ message: 'Task deleted' });
    } catch (err) {
        next(err);
    }
};

exports.updateTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        if (!title) {
            return res.status(400).json({ error: 'Title is required' });
        }
        await Task.update(id, req.user.id, title, description);
        res.json({ message: 'Task updated' });
    } catch (err) {
        next(err);
    }
};
