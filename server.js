/**
 * Created by mario (https://github.com/hyprstack) on 20/01/2018.
 */
const io            = require('socket.io');
const app           = require('./app');
const configs       = require('./lib/config/configs');
const customEmitter = require('./lib/custom-emitter/internal-emitter');
const validator     = require('./lib/validator/check-signature');
require('./lib/coinapi-socket/coinbase-socket');

const _port = configs.get('PORT');

const server = app.listen(_port, () => {
  const port = server.address().port;
  console.log('App listening on port %s', port);
});

const socketConfig = configs.get('SOCKET');

const socket = io.listen(server, socketConfig);

io.use((socket, next) => {
  const { handshake } = socket;
  console.log(socket)
  console.log(handshake)
  console.log(socket.eventNames())
  console.log(socket.event)
  next();
})

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
  if (type === 'heartbeat') return;
  return symbol_id.split('SPOT_').pop();
}

const checkCoinPairInRoomName = (coinPair, roomName) => {
  const coinPairList = roomName.split('-');
  return coinPairList.indexOf(coinPair) > -1;
}

socket.on('connection', (client) => {
  console.log('Client connected...');

  customEmitter.emit('connectExchanges')

  client.on('getExchangeRates', function(data) {
    const room = createRoomName(data.subs);

    client.join(room, () => {
      console.log(`A new client ${client.id} has joined the room ${room}`)
    });

    customEmitter.on('coinApiExchanges', (msg) => {
      const partialMatch = extractPartialRoomNameFromData(msg)
      if (checkCoinPairInRoomName(partialMatch, room)) {
        socket.sockets.in(room).emit('coinExchange', msg.utf8Data);
      }
    });

    client.on('disconnect', () => {
      console.log(`Client disconnected and left room ${room}`);
    })

    client.on('cancelExchangeRates', () => {
      client.leave(room, () => {
        console.log(`Client ${client.id} left room ${room}`);
        client.emit('leftRoom', `Room ${room} left!`);
      })
    });

  });
});

module.exports = server;
