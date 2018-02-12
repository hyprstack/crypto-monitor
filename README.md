# CryptoWatch-ExchangeService

### Client example

```javascript
<script>
  (function() {
    var socket = io('http://localhost:3000', {path: '/cryptoWatch', reconnect: true, forceNew: true}).connect();
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

Logic path:
    . Connect to exchanges themselves!!!!!
    . Bitrex
    . Binance
    . Coinbase
