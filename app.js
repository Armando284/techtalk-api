const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const api = require('./api')

const indexRouter = require('./routes/index');
const healthRouter = require('./routes/health');
const usersRouter = require('./routes/users');
const postRouter = require('./routes/posts')
const commentRouter = require('./routes/comments')
const likeRouter = require('./routes/likes')

const app = express();

app.use(logger('dev'));
app.use(express.json()); // middleware for post methods body
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/health', healthRouter);
app.use('/posts', postRouter)
app.use('/comments', commentRouter)
app.use('/likes', likeRouter)
app.use('/api/v1', api)

module.exports = app;
