require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const pool = require("./db");

const PORT = process.env.PORT || 5000;
const app = express();

const start = async () => {
  try {
    pool
      .connect()
      .then(() => console.log("Connected to DB"))
      .catch((err) => console.log(`Error connecting to DB: ${err}`));
    app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
