export {};

const express = require('express');
require('dotenv').config();
const app = express();
const apiRoutes = require('./routes/apiRoutes');

const port = process.env.PORT || 3000;

app.use(express.json()); // Middleware to parse JSON bodies

// Routes
app.use('/api', apiRoutes);

app.listen(port, () => console.log(`Server started on port ${port}...`));