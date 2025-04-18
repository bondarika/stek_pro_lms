﻿require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const pool = require('./db');
const router = require('./router/index');
const errorMiddleware = require('./middleware/error-middleware');

const PORT = process.env.PORT || 5000;
const app = express();

const corsOptions = {
  origin: 'http://lms.stekpro.ru', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL, 
  credentials: true
}));
app.use('/api', router);
app.use(errorMiddleware);

const start = async () => {
  try {
    pool
      .connect()
      .then(() => console.log('Connected to DB'))
      .catch((err) => console.log(`Error connecting to DB: ${err}`));
    app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
