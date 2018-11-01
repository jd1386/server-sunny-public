const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();

const indexRouter = require('./routes/index');
const categoriesRouter = require('./routes/categories');
const articlesRouter = require('./routes/articles');
const playRouter = require('./routes/play');

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
app.use('/categories', categoriesRouter);
app.use('/articles', articlesRouter);
app.use('/play', playRouter);

module.exports = app;
