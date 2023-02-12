const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;
const openaiRoutes = require('./Routes/openaiRoutes');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// Routes
app.use('/openai', openaiRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});