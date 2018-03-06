/**
 * Created by mario (https://github.com/hyprstack) on 14/05/2017.
 */
const nconf = require('nconf');
const fs    = require('fs');
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
  },
  'PRIVATE_KEY': fs.readFileSync('./lib/config/local-keys/my-server.key.pem', 'utf8'),
  'PUBLIC_KEY': fs.readFileSync('./lib/config/local-keys/client/my-server.pub', 'utf8'),
  'SECRET-KEY': '4757fhty474-457748j028-CRYPTO_WATCH-1847gft5-458885-fhfy366'
});

module.exports = nconf;
