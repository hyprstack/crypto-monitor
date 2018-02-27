/**
 * Created by mario (https://github.com/hyprstack) on 20/01/2018.
 */
const app            = require('./app');
const configs        = require('./lib/config/configs');
const io             = require('socket.io');
const customEmitter  = require('./lib/custom-emitter/internal-emitter');
require('./lib/coinapi-socket/coinbase-socket');

const _port = configs.get('PORT');

const server = app.listen(_port, () => {
  const port = server.address().port;
  console.log('App listening on port %s', port);
});

const socketConfig = configs.get('SOCKET');

const socket = io.listen(server, socketConfig);

const createRoomName = (data) => {
  if (Array.isArray(data)) {
    const roomNameList = data.map((coins) => {
      const { fromCoin, toCoin } =  coins;
      return `${fromCoin}_${toCoin}-`;
    });
    return ''.concat(...roomNameList)
  }
  const { fromCoin, toCoin } =  data;
  return `${fromCoin}_${toCoin}-`;
};

const extractPartialRoomNameFromData = (data) => {
  const { symbol_id, type } = JSON.parse(data.utf8Data)
  if (type === 'heartbeat') return
  const coinPair = symbol_id.split('SPOT_').pop();
  return `${coinPair}-`;

}

socket.on('connection', (client) => {
  console.log('Client connected...');

  customEmitter.emit('connectExchanges')

  client.on('getExchangeRates', function(data) {
    const room = createRoomName(data.subs);
    client.join(room, () => {
      console.log(`A new client has joined the room ${room}`)
    });

    customEmitter.on('coinApiExchanges', (msg) => {
      const partialMatch = extractPartialRoomNameFromData(msg)
      if (room.includes(partialMatch)) {
        socket.sockets.in(room).emit('coinExchange', msg.utf8Data);
      }
    });

    client.on('disconnect', () => {
      console.log(`Client disconnected and left room ${room}`);
    })
  });
});

module.exports = server;
