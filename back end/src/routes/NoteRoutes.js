// routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const NoteController = require('../controllers/NoteController');

router.post('/notes', NoteController.createTask);
router.get('/notes', NoteController.getTasks);
router.get('/notes/:id', NoteController.getTaskById);
router.put('/notes/:id', NoteController.updateTask);
router.delete('/notes/:id', NoteController.deleteTask);

module.exports = router;
