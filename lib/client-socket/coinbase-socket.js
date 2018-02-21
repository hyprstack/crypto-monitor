/**
 * Created by mario (https://github.com/hyprstack) on 22/01/2018.
 */
const Websocket = require('websocket').client;
const configs   = require('./../config/configs');

const coinBaseConfigs = configs.get('COINBASE_API');

const formCoinBaseRequest = ({ fromCoin, toCoin }) => {
  return {
    "type": "hello",
    "apikey": coinBaseConfigs.AUTH.X_CoinAPI_Key,
    "heartbeat": false,
    "subscribe_data_type": ["trade"]
  }
};

const wsClient = new Websocket();

wsClient.on('connect', (connection) => {
  console.log('Connected to coinAPI')
  const _message = JSON.stringify({
    "type": "hello",
    "apikey": coinBaseConfigs.AUTH.X_CoinAPI_Key,
    "heartbeat": true,
    "subscribe_data_type": ["trade"]
  })
  connection.send(_message);

  connection.on('message', (message) => {
    console.log('message >>>', message)
  });

  connection.on('error', (error) => {
    console.log('Error >>', error);
  });
});

module.exports = wsClient;
