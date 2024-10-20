// routes/taskRoutes.js
const express = require('express');
const { addTask, getTasks, updateTask, deleteTask, markTaskCompleted } = require('../controllers/taskController');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

// Task routes
router.post('/', protect, addTask);
router.get('/:userId', protect, getTasks);
router.put('/:taskId', protect, updateTask);
router.delete('/:taskId', protect, deleteTask);
router.put('/:taskId/complete', protect, markTaskCompleted);

module.exports = router;
