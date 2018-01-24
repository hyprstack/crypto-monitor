/**
 * Created by mario (https://github.com/hyprstack) on 20/01/2018.
 */
const express  = require('express');
const app      = express();
const clientIo = require('./lib/client-socket/crytpto-compare-socket');

clientIo.connect();

app.disable('x-powered-by');

module.exports = app;
