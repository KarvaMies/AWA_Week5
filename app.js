const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const mongoDB = process.env.MONGO_URL || 'mongodb://localhost:27017/testdb';
mongoose.connect(mongoDB)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Error connecting to MongoDB:', error+));

const recipesRouter = require('./routes/recipes');

const app = express();

const port = 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', recipesRouter);

app.listen(port, () => console.log("Server is listening port " + port + "!"));

module.exports = app;
