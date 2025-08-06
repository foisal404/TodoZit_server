import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
  priority: String,
  dueDate: Date,
  plannedDuration: Number,
  timeSpent: Number,
  userEmail: { type: String, required: true },
});

const Task = mongoose.model('Task', taskSchema);

export default Task;
