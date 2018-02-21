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
  'COINBASE_API': {
    'ENDPOINT': 'wss://ws.coinapi.io/v1/',
    'AUTH': {
      'X_CoinAPI_Key': 'D7C9A955-FB93-4946-81E0-D3D2C928BC7B'
    }
  }
});

module.exports = nconf;
