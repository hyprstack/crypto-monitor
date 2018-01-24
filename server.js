/**
 * Created by mario (https://github.com/hyprstack) on 20/01/2018.
 */
const app     = require('./app');
const configs = require('./lib/config/configs');

const _port = configs.get('PORT');

const server = app.listen(_port, () => {
  const port = server.address().port;
  console.log('App listening on port %s', port);
});

module.exports = server;
