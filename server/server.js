const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const colors = require('colors');
const dotenv = require('dotenv');
const connectDB = require('./config/connectDB');



connectDB();

// Initialize the express application
const app = express();

// Apply middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// Define routes
app.use('/api/users', require('./routes/userRoute'));
app.use('/api/expenses', require('./routes/expenseRoute'));

// Set the port
const PORT = process.env.PORT || 8080;

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
