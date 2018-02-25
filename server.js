/**
 * Created by mario (https://github.com/hyprstack) on 20/01/2018.
 */
const app            = require('./app');
const configs        = require('./lib/config/configs');
const io             = require('socket.io');
const coinBaseSocket = require('./lib/coinapi-socket/coinbase-socket');
const customEmitter  = require('./lib/custom-emitter/internal-emitter');

const coinBaseConfigs = configs.get('COINBASE_API');

const _port = configs.get('PORT');

const server = app.listen(_port, () => {
  const port = server.address().port;
  console.log('App listening on port %s', port);
});

const socketConfig = configs.get('SOCKET');

const socket = io.listen(server, socketConfig);

const createRoomName = (data) => {
  if (Array.isArray(data)) {
    return data.join('_');
  }
  const { fromCoin, toCoin } =  data;
  return `${fromCoin}_${toCoin}`;
};

socket.on('connection', (client) => {
  console.log('Client connected...');

  customEmitter.emit('connectExchanges')

  client.on('getExchangeRate', function(data) {
    const room = createRoomName(data.subs);
    client.join(room, () => {
      customEmitter.emit('connectToExchange', data.subs)
    });

    customEmitter.on('coinApiExchanges', (msg) => {
      socket.sockets.in(room).emit('coinExchange', msg);
    });
  });

  // client.on('getExchangeRates', function(data) {
  //   const room = createRoomName(data.subs);
  //
  //   customEmitter.on('coinApiExchanges', (msg) => {
  //     socket.sockets.in(room).emit('coinExchanges', msg);
  //   });
  // });
});

module.exports = server;
