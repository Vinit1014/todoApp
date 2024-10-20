const Task = require('../models/Task');

exports.addTask = async (req, res) => {
  const { title, content, userId } = req.body;
  try {
    const task = new Task({ title, content, userId });
    await task.save();
    return res.status(201).json({task, message:"Note added successfully"});
  } catch (error) {
    return res.status(500).json({ message: 'Error adding task', error });
  }
};

exports.getTasks = async (req, res) => {
  const { userId } = req.params;
  try {
    const tasks = await Task.find({ userId });
    return res.status(200).json({tasks, message:"Notes fetched successfully"});
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching tasks', error });
  }
};

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
    return res.status(200).json({task, message:"Note updated successfully"});
  } catch (error) {
    return res.status(500).json({ message: 'Error updating task', error });
  }
};

exports.deleteTask = async (req, res) => {
  const { taskId } = req.params;
  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    await task.deleteOne( { _id: taskId });
    return res.status(200).json({ message: 'Task deleted' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting task', error: error.message });
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

        return res.status(200).json(task);
    } catch (error) {
        return res.status(500).json({ message: 'Error updating task status', error });
    }
};