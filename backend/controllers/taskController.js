// controllers/taskController.js
const Task = require('../models/Task');

// Add a task
exports.addTask = async (req, res) => {
  const { title, content, userId } = req.body;
  try {
    const task = new Task({ title, content, userId });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error adding task', error });
  }
};

// Get all tasks for the user
exports.getTasks = async (req, res) => {
  const { userId } = req.params;
  try {
    const tasks = await Task.find({ userId });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  const { taskId } = req.params;
  const { title, content, isCompleted } = req.body;
  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.title = title || task.title;
    task.content = content || task.content;
    task.isCompleted = isCompleted !== undefined ? isCompleted : task.isCompleted;

    await task.save();
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error updating task', error });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  const { taskId } = req.params;
  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    await task.deleteOne( { _id: taskId });
    res.status(200).json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error: error.message });
  }
};

exports.markTaskCompleted = async (req, res) => {
    const { taskId } = req.params;
    console.log(taskId);
    
    const { isCompleted } = req.body;
    
    try {
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        task.isCompleted = isCompleted;
        await task.save();

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Error updating task status', error });
    }
};