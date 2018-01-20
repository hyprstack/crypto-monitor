/**
 * Created by mario (https://github.com/hyprstack) on 20/01/2018.
 */
const io      = require('socket.io');
const server  = require('./../../server');
const configs = require('./../config/configs');

const socket = io(server);

module.exports = socket;
