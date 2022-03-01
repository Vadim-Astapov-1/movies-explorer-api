const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const { errors } = require('celebrate');

const router = require('./routers/index');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const limiter = require('./middlewares/rate-limit');

const { PORT = 3000, mongod = 'mongodb://localhost:27017/name'} = process.env;
const app = express();
app.use(helmet());
app.use(limiter);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(mongod)
  .catch((err) => {
    console.log(err);
  });

app.use(cookieParser());
app.use(requestLogger);

app.use(router);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`port: ${PORT}`);
});
