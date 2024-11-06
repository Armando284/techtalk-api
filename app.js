const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

app.use(logger('dev'));
app.use(express.json()); // middleware for post methods body
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', (req, res) => res.json({ success: 'Server works' }));
app.use('/health', (req, res) => res.json({ success: 'Health works' }));

module.exports = app;
