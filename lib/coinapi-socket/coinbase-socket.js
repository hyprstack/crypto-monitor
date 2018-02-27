/**
 * Created by mario (https://github.com/hyprstack) on 22/01/2018.
 */
const Websocket     = require('websocket').client;
const configs       = require('./../config/configs');
const customEmitter = require('./../custom-emitter/internal-emitter');

const coinBaseConfigs = configs.get('COINBASE_API');

const wsClient = new Websocket();

let wsConnection = '';

customEmitter.on('connectExchanges', () => {
  if (!wsConnection) {
    return wsClient.connect(coinBaseConfigs.ENDPOINT);
  }
  console.log('Connection to coinApi already established >>>', wsConnection.connected, wsConnection.remoteAddress);
});

function formCoinBaseRequest() {
  return {
    "type": "hello",
    "apikey": coinBaseConfigs.AUTH.X_CoinAPI_Key,
    "heartbeat": false,
    "subscribe_data_type": ["trade"]
  }
};

wsClient.on('connect', (connection) => {
  console.log('Connected to coinAPI >>>', connection.connected, connection.remoteAddress)
  wsConnection = connection
  connection.send(JSON.stringify(formCoinBaseRequest()));

  connection.on('message', (message) => {
    customEmitter.emit('coinApiExchanges', message);
  });

  connection.on('error', (error) => {
    console.log('Error >>', error);
    customEmitter.emit('coinApiExchangesError', error);
  });
});

module.exports = wsClient;
