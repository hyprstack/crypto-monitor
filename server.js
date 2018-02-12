/**
 * Created by mario (https://github.com/hyprstack) on 20/01/2018.
 */
const app                 = require('./app');
const configs             = require('./lib/config/configs');
const io                  = require('socket.io');
const coinBaseSocket = require('./lib/client-socket/crytpto-compare-socket');

const coinBaseConfigs = configs.get('COINBASE_API');

const _port = configs.get('PORT');

const server = app.listen(_port, () => {
  const port = server.address().port;
  console.log('App listening on port %s', port);
});

const socketConfig = configs.get('SOCKET');

const socket = io.listen(server, socketConfig);

const formCoinBaseRequest = ({ fromCoin, toCoin }) => {
  return {
    "type": "hello",
    "apikey": coinBaseConfigs.AUTH.X_CoinAPI_Key,
    "heartbeat": false,
    "subscribe_data_type": ["quote"]
  }
};

const createRoomName = (data) => {
  if (Array.isArray(data)) {
    return data.join('_');
  }
  const { fromCoin, toCoin } =  data;
  return `${fromCoin}_${toCoin}`;
};

socket.on('connection', (client) => {
  console.log('Client connected...', client);

  client.on('getExchangeRate', function(data) {
    console.log(data);
    const room = createRoomName(data.subs);
    let cryptoIo = coinBaseSocket.connect();
    client.join(room, () => {
      const requestedExchange = formCoinBaseRequest(data.subs);
      cryptoIo.emit('Hello', requestedExchange );
    });

    cryptoIo.on('m', (msg) => {
      socket.sockets.in(room).emit('coinExchange', msg);
    });
  });

  client.on('getExchangeRates', function(data) {
    console.log(data);
    let cryptoIo = cryptoCompareSocket.connect();
    const room = createRoomName(data.subs);
    client.join(room, () => {
      const requestedExchanges = data.subs.map(formCryptoCompareRequest);
      cryptoIo.emit('SubAdd', { subs: requestedExchanges  } );
    });

    cryptoIo.on('m', (msg) => {
      socket.sockets.in(room).emit('coinExchanges', msg);
    });
  });
});

module.exports = server;
