const Task = require('../models/Task');

// save
exports.createTask = async (req, res) => {
    console.log('Received request to create a task:', req.body);
    try {
        const task = new Task(req.body);
        await task.save();
        console.log('Task saved successfully:', task);
        res.status(201).json(task);
    } catch (error) {
        console.error('Error saving task:', error.message);
        res.status(400).json({ error: error.message });
    }
};

// find
exports.getTasks = async (req, res) => {
    console.log('Received request to get all tasks');
    try {
        const tasks = await Task.find();
        console.log('Tasks retrieved successfully:', tasks);
        res.status(200).json(tasks);
    } catch (error) {
        console.error('Error retrieving tasks:', error.message);
        res.status(500).json({ error: error.message });
    }
};

// Get by ID
exports.getTaskById = async (req, res) => {
    console.log(`Received request to get task with ID: ${req.params.id}`);
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            console.log('Task not found:', req.params.id);
            return res.status(404).json({ error: 'Task not found' });
        }
        console.log('Task retrieved successfully:', task);
        res.status(200).json(task);
    } catch (error) {
        console.error('Error retrieving task by ID:', error.message);
        res.status(500).json({ error: error.message });
    }
};

// Update
exports.updateTask = async (req, res) => {
    console.log(`Received request to update task with ID: ${req.params.id}`, req.body);
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!task) {
            console.log('Task not found for update:', req.params.id);
            return res.status(404).json({ error: 'Task not found' });
        }
        console.log('Task updated successfully:', task);
        res.status(200).json(task);
    } catch (error) {
        console.error('Error updating task:', error.message);
        res.status(500).json({ error: error.message });
    }
};


// Delete
exports.deleteTask = async (req, res) => {
    console.log(`Received request to delete task with ID: ${req.params.id}`);
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            console.log('Task not found for deletion:', req.params.id);
            return res.status(404).json({ error: 'Task not found' });
        }
        console.log('Task deleted successfully:', task);
        res.status(200).json({ message: 'Task deleted' });
    } catch (error) {
        console.error('Error deleting task:', error.message);
        res.status(500).json({ error: error.message });
    }
};
