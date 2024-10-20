
const mongoose = require('mongoose');

const getFormattedDate = () => {
    const dateObj = new Date();
    const month = dateObj.getUTCMonth() + 1;
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();

    return `${year}/${month}/${day}`;
};

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: getFormattedDate,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
