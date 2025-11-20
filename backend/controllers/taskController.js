const Task = require('../models/Task');

// Create Task
exports.createTask = async (req, res, next) => {
  try {
    const { title, description, status } = req.body;
    if (!title || title.trim() === '') {
      return res.status(400).json({ message: 'Title cannot be empty' });
    }
    const task = await Task.create({ title: title.trim(), description, status });
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

// Get tasks with optional status filter and pagination
exports.getTasks = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 5 } = req.query;

    const query = {};
    if (status && status !== 'all') {
      const allowed = ['pending', 'in-progress', 'completed'];
      if (allowed.includes(status)) query.status = status;
    }

    const pageNum = Math.max(parseInt(page) || 1, 1);
    const lim = Math.max(parseInt(limit) || 5, 1);

    const total = await Task.countDocuments(query);
    const pages = Math.max(Math.ceil(total / lim), 1);

    const tasks = await Task.find(query)
      .sort({ createdAt: -1 })
      .skip((pageNum - 1) * lim)
      .limit(lim);

    res.json({ tasks, total, page: pageNum, pages });
  } catch (error) {
    next(error);
  }
};

// Get single task
exports.getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (error) {
    next(error);
  }
};

// Update task
exports.updateTask = async (req, res, next) => {
  try {
    if (req.body.title !== undefined && req.body.title.trim() === '') {
      return res.status(400).json({ message: 'Title cannot be empty' });
    }
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (error) {
    next(error);
  }
};

// Delete task
exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    await task.deleteOne();
    res.json({ message: 'Task removed' });
  } catch (error) {
    next(error);
  }
};
