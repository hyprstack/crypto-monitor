/**
 * Created by mario (https://github.com/hyprstack) on 20/01/2018.
 */
const io                  = require('socket.io');
const server              = require('./../../server');
const configs             = require('./../config/configs');
const cryptoCompareSocket = require('./../client-socket/crytpto-compare-socket');

const socketConfig = configs.get('SOCKET');

const socket = io(server, socketConfig);

socket.on('connection', (socket) => {
  console.log(socket);
});

module.exports = socket;
