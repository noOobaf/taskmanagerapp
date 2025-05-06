const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const auth = require('../middleware/auth');

// All routes below require authentication
router.use(auth);

// @route   POST /api/tasks
// @desc    Create a new task
router.post('/', taskController.createTask);

// @route   GET /api/tasks
// @desc    Get all tasks for user
router.get('/', taskController.getAllTasks);

// @route   PUT /api/tasks/:id/complete
// @desc    Mark task as completed
router.put('/:id/complete', taskController.markCompleted);

// @route   PUT /api/tasks/:id
// @desc    Update a task
router.put('/:id', taskController.updateTask);

// @route   DELETE /api/tasks/:id
// @desc    Delete a task
router.delete('/:id', taskController.deleteTask);

module.exports = router;
