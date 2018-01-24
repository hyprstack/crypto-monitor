/**
 * Created by mario (https://github.com/hyprstack) on 22/01/2018.
 */
const io      = require('socket.io-client');
const configs = require('./../config/configs');

const crytpCompareConfigs = configs.get('CRYPTO_COMPARE_API');
const cryptoCompareEndpoint = crytpCompareConfigs.ENDPOINT;

const cryptoCompareSocket = io(cryptoCompareEndpoint, {reconnect: true});

cryptoCompareSocket.on('connect', (socket) => {
  console.log('Connected');
  cryptoCompareSocket.emit('SubAdd', { subs: crytpCompareConfigs['LIST_OF_ITEMS']});
});

cryptoCompareSocket.on('m', (msg) => {
  console.log(msg);
});

cryptoCompareSocket.on('connect_error', (error) => {
  console.log(error);
});

cryptoCompareSocket.on('disconnect', (error) => {
  console.log('Disconnected');
  console.log(error);
});

cryptoCompareSocket.on('error', (error) => {
  console.log(error);
});

cryptoCompareSocket.on('ping', () => {
  console.log('Ping');
});

cryptoCompareSocket.on('pong', () => {
  console.log('Pong');
});

cryptoCompareSocket.on('reconnect', (error) => {
  console.log('reconnect');
  console.log(error);
});

module.exports = cryptoCompareSocket;
