/**
 * Created by mario (https://github.com/hyprstack) on 20/01/2018.
 */
const io                  = require('socket.io');
const server              = require('./../../server');
const configs             = require('./../config/configs');
const cryptoCompareSocket = require('./../client-socket/crytpto-compare-socket');

const socketConfig = configs.get('SOCKET');

const socket = io(server, socketConfig);

const formCryptoCompareRequest = ({ exchange, fromCoin, toCoin }) => `2~${exchange}~${fromCoin}~${toCoin}`;

socket.on('connection', (client) => {
  console.log('Client connected...', client);

  client.on('getExchangeRate', function(data) {
    console.log(data);
    let cryptoIo = cryptoCompareSocket.connect();
    const { room } = data;
    client.join(room, () => {
      const requestedExchange = formCryptoCompareRequest(data);
      cryptoIo.emit('SubAdd', { subs: [requestedExchange]} );
    });

    cryptoIo.on('m', (msg) => {
      socket.sockets.in(room).emit('coinExchange', msg);
    });
  });

  client.on('getExchangeRates', function(data) {
    console.log(data);
    let cryptoIo = cryptoCompareSocket.connect();
    const { room } = data;
    client.join(room, () => {
      const requestedExchanges = data.map(formCryptoCompareRequest);
      cryptoIo.emit('SubAdd', { subs: [requestedExchanges]} );
    });

    cryptoIo.on('m', (msg) => {
      socket.sockets.in(room).emit('coinExchange', msg);
    });
  });
});

module.exports = socket;
