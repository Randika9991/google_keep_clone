const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String },        // Changed 'description' to 'content' to match log
    color: { type: String },           // Added 'color' field
    image: { type: String },           // Added 'image' field
    date: { type: Date },              // Added 'date' field
    photoUri: { type: String },        // Added 'photoUri' field
    completed: { type: Boolean, default: false },
});

module.exports = mongoose.model('Note', TaskSchema);
