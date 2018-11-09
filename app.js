const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const exphbs = require('express-handlebars');
const passport = require('passport');
const session = require('express-session');
require('dotenv').config();

const passportConfig = require('./passport');

const indexRouter = require('./routes/index');
const articlesRouter = require('./routes/articles');
const categoriesRouter = require('./routes/categories');
const searchRouter = require('./routes/search');
const playRouter = require('./routes/play');
const kakaoRouter = require('./routes/kakao');
const testRouter = require('./routes/test');
const sequelize = require('./models').sequelize;

const app = express();

sequelize.sync();
passportConfig(passport);

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Handlebars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use('/', indexRouter);
app.use('/search', searchRouter);
app.use('/articles', articlesRouter);
app.use('/categories', categoriesRouter);
app.use('/play', playRouter);
app.use('/auth/kakao', kakaoRouter);
app.use('/test', testRouter);

module.exports = app;
