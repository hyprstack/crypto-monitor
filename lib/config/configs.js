/**
 * Created by mario (https://github.com/hyprstack) on 14/05/2017.
 */
const nconf = require('nconf');
// This is the order of preference

// 2. `process.env`
// 3. `process.argv`
nconf.env().argv();

// Values in `config.json`
nconf.file('./config.json');

//Any default values
nconf.defaults({
  'BASE_URL': 'http://localhost:3000',
  'PORT': 3000,
  'SOCKET': {
    path: '/cryptoWatch',
    serveClient: false,
    pingInterval: 1000,
    pingTimeout: 5000
  },
  'CRYPTO_COMPARE_API': {
    'ENDPOINT': 'wss://streamer.cryptocompare.com/'
  }
});

module.exports = nconf;
