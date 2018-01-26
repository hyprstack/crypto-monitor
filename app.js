/**
 * Created by mario (https://github.com/hyprstack) on 20/01/2018.
 */
const express  = require('express');
const app      = express();
const cors     = require('cors');

app.disable('x-powered-by');
app
  .use(cors({
    origin: true,
    credentials: true
  }))

module.exports = app;
