/**
 * Created by mario (https://github.com/hyprstack) on 25/02/2018.
 */
const EventEmitter   = require('events');
// const coinBaseSocket = require('./../coinapi-socket/coinbase-socket');

class MyEmitter extends EventEmitter {}
const customEmitter = new MyEmitter();

module.exports = customEmitter
