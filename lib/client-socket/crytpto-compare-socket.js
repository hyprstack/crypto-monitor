/**
 * Created by mario (https://github.com/hyprstack) on 22/01/2018.
 */
const io      = require('socket.io-client');
const configs = require('./../config/configs');

const crytpCompareConfigs = configs.get('CRYPTO_COMPARE_API');
const cryptoCompareEndpoint = crytpCompareConfigs.ENDPOINT;

const cryptoCompareSocket = io(cryptoCompareEndpoint, {reconnect: true, forceNew: true});

cryptoCompareSocket.on('connect', () => {
  console.log('Connected to crypto compare!');
});

cryptoCompareSocket.on('connect_error', (error) => {
  console.log(error);
});

cryptoCompareSocket.on('disconnect', (error) => {
  console.log('Disconnected from third party client');
  console.log(error);
});

cryptoCompareSocket.on('error', (error) => {
  console.log(error);
});

cryptoCompareSocket.on('reconnect', (error) => {
  console.log('Reconnecting to third party client');
  console.log(error);
});

module.exports = cryptoCompareSocket;
