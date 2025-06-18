const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bookRoutes = require('./routes/books'); // make sure this path is correct

const app = express();
app.use(cors());
app.use(express.json());

// Static folder to serve PDFs
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/', bookRoutes);  // This handles /search and /:id

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/library')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start the server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
