/**
 * Created by mario (https://github.com/hyprstack) on 22/01/2018.
 */
const io      = require('socket.io-client');
const configs = require('./../config/configs');

const coinBaseConfigs = configs.get('COINBASE_API');
const coinBaseEndpoint = coinBaseConfigs.ENDPOINT;

const coinBaseSocket = io(coinBaseEndpoint, {reconnect: true, forceNew: true});

coinBaseSocket.on('connect', () => {
  console.log('Connected to crypto compare!');
});

coinBaseSocket.on('connect_error', (error) => {
  console.log(error);
});

coinBaseSocket.on('disconnect', (error) => {
  console.log('Disconnected from third party client');
  console.log(error);
});

coinBaseSocket.on('error', (error) => {
  console.log('ERROR')
  console.log(error);
});

coinBaseSocket.on('reconnect', (error) => {
  console.log('Reconnecting to third party client');
  console.log(error);
});

module.exports = coinBaseSocket;
