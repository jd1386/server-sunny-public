const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const articlesRouter = require('./routes/articles');
const categoriesRouter = require('./routes/categories');
const searchRouter = require('./routes/search');
const playRouter = require('./routes/play');
const testRouter = require('./routes/test');
const sequelize = require('./models').sequelize;

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
sequelize.sync();

app.use('/', indexRouter);
app.use('/search', searchRouter);
app.use('/articles', articlesRouter);
app.use('/categories', categoriesRouter);
app.use('/play', playRouter);
app.use('/test', testRouter);

module.exports = app;
