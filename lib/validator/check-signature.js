/**
 * Created by mario (https://github.com/hyprstack) on 05/03/2018.
 */
const ursa                = require('ursa');
const configs             = require('./../config/configs');
const secretKey           = configs.get('SECRET-KEY');
const publicKeySignature  = ursa.createPublicKey(configs.get('PUBLIC_KEY'));
const privateKeySignature = ursa.createPrivateKey(configs.get('PRIVATE_KEY'));

const verifySignature = ({ headers, body }) => {
  const { 'x-crypto-watch-signature': crypto_signature } = headers;
  const { event } = body;
  const msg = `CryptoWatch/${event}/POST/${secretKey}`;
  const localSignature = publicKeySignature.encrypt(msg, 'utf8', 'base64');
  const decryptedSignature = privateKeySignature.decrypt(crypto_signature, 'base64', 'utf8');

  return localSignature !== crypto_signature && msg !== decryptedSignature;
};

module.exports = {
  verifySignature: verifySignature
}