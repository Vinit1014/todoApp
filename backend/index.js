// index.js
const express = require('express');
const dotenv = require('dotenv');
const dbConnect = require('./config/dbConnect');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');

// Initialize environment variables
dotenv.config();

// Connect to MongoDB
dbConnect();

// Initialize the app
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
