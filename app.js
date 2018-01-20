/**
 * Created by mario (https://github.com/hyprstack) on 20/01/2018.
 */
const express    = require('express');
const app        = express();
const router     = require('./lib/routes/routes');

app.disable('x-powered-by');
app.use(router);

module.exports = app;
