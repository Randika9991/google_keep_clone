const express = require('express');
// Import CORS
const cors = require('cors');
// Import the database connection
const connectDB = require('./src/config/db');
// Import task routes
const taskRoutes = require('./src/routes/taskRoutes');
const noteRoutes = require('./src/routes/NoteRoutes');
// Initialize Express app
const app = express();

// Use CORS middleware to handle CORS issues
app.use(cors());
// Parse incoming JSON requests
app.use(express.json());

app.use('/api', taskRoutes); // Use task routes for '/api' path
app.use('/api', noteRoutes); // Use task routes for '/api' path

// Connect to the database
connectDB();

// Define the port and start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
