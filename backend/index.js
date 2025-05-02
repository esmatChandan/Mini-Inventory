const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./src/router/expressRoute.js');
const cors =  require('cors')
const app = express();

const PORT = 3000;

// Middleware

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());


// Routes
app.use('/api', productRoutes);

// MongoDB Connection
mongoose
  .connect('mongodb://127.0.0.1:27017/ecommerce', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });