# CryptoMonitor-ExchangeService

### Client example

```javascript
<script>
  (function() {
    var socket = io('http://localhost:3000', {path: '/crypto-monitor', reconnect: true, forceNew: true}).connect();
    socket.on('connect', function(data) {
      console.log(data);
      socket.emit('getExchangeRate', {
        subs: {
          exchange: 'Poloniex',
          fromCoin: 'BTC',
          toCoin: 'USD'
        }
      });

      socket.emit('getExchangeRates', {
        subs: [
          {
            exchange: 'Binance',
            fromCoin: 'VEN',
            toCoin: 'BTC'
          },
          {
            exchange: 'Binance',
            fromCoin: 'ETH',
            toCoin: 'BTC'
          },
          {
            exchange: 'Binance',
            fromCoin: 'CND',
            toCoin: 'BTC'
          }
        ]
      });
    });

    socket.on('coinExchange', function(data) {
      console.log('Data from coinExchange');
      console.log(data);
    });

    socket.on('coinExchanges', function(data) {
      console.log('Data from coinExchanges');
      console.log(data);
    });
  })()

</script>
```

### Signing the request

##### To form the request query - *x-crypto-monitor-signature*

Run the following command to generate the keys from the root directory of this project.

```bash
  openssl genrsa -out ./lib/config/local-keys/my-server.key.pem 2048
  openssl rsa -in ./lib/config/local-keys/my-server.key.pem -pubout -out ./lib/config/local-keys/client/my-server.pub
```

To generate the signature use `ursa` to encrypt the message with base64

To generate the message create a string with `CryptoMonitor/<eventName>/POST/<secretKey>`

For node

```javascript
const ursa                = require('ursa');
const configs             = require('./../config/configs');
const secretKey           = configs.get('SECRET-KEY');
const publicKeySignature  = ursa.createPublicKey(configs.get('PUBLIC_KEY'));

const verifySignature = ({ query }) => {
  const { 'x-crypto-monitor-signature': crypto_signature } = query;
  const msg = `CryptoMonitor/POST/${secretKey}/getExchanges`;
  const signature = publicKeySignature.encrypt(msg, 'utf8', 'base64');
  
  // The signature sent from the client needs to be decrypted before the handshake is complete
};
```

The generated signature should be sent as a query in the handshake

Please refer to [socketio](https://socket.io/docs/client-api/#with-query-option) for details on how to send the query.

Please refer to `example-index.html` on how to format the query

