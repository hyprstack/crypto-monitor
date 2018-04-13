/**
 * Created by mario (https://github.com/hyprstack) on 05/03/2018.
 */
const ursa                = require('ursa');
const configs             = require('./../config/configs');

const secretKey           = configs.get('SECRET-KEY');
const privateKey          = configs.get('PRIVATE_KEY');
const privateKeySignature = ursa.createPrivateKey(privateKey);

const verifySignature = ({ query }) => {
  const { 'x-crypto-monitor-signature': crypto_signature } = query;
  if (!crypto_signature) {
    return false
  }

  const msg = `CryptoMonitor/POST/${secretKey}/getExchanges`;
  let decryptedSignature
  try {
    decryptedSignature = privateKeySignature.decrypt(crypto_signature, 'base64', 'utf8');
  } catch (e) {
    return false
  }
  return msg === decryptedSignature;
};

module.exports = {
  verifySignature: verifySignature
}
