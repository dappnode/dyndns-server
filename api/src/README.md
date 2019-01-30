# Client code to generate signatures

## Compute subdomain

```js
// Grab only first 16 chars of address as subdomain
const subdomain = address
  .toLowerCase()
  .replace("0x", "")
  .substring(0, 16);
```

## EthCrypto

```js
const EthCrypto = require("eth-crypto");

/**
 * Generates url params to do a GET request to a DAppNode dyndns server
 *
 * @param {String} privateKey hex encoded key: '96e993b7c56ca2206b3711a0cfe646e05eb699855f15b0b3dfc603d123823af672efab76fa03cd7337d26bd53be3dc210803ece15fc0742bcfeb5692b3fa12a8'
 * @return {String} search params formated and encoded: address=72ef...&timestamp=1548826778&sig=823c...&version=2
 */
function dyndnsClient(privateKey) {
  const timestamp = Math.floor(new Date() / 1000);
  const messageHash = EthCrypto.hash.keccak256(timestamp.toString());
  const signature = EthCrypto.sign(privateKey, messageHash);
  const publicKey = EthCrypto.publicKeyByPrivateKey(privateKey);
  const address = EthCrypto.publicKey.toAddress(publicKey);

  // Send message
  return new URLSearchParams({
    address,
    timestamp,
    sig: signature
  }).toString();
  // address=0x72ef...&timestamp=1548826778&sig=823c...
}
```

## Nacl

```js
const nacl = require("tweetnacl");

/**
 * Generates url params to do a GET request to a DAppNode dyndns server
 * Uses nacl (v2)
 *
 * @param {String} secretKey hex encoded key: '96e993b7c56ca2206b3711a0cfe646e05eb699855f15b0b3dfc603d123823af672efab76fa03cd7337d26bd53be3dc210803ece15fc0742bcfeb5692b3fa12a8'
 * @return {String} search params formated and encoded: address=72ef...&timestamp=1548826778&sig=823c...&version=2
 */
function dyndnsClient(secretKey) {
  const timestamp = Math.floor(new Date() / 1000);
  const messageBuff = Buffer.from(timestamp.toString());
  const secretKeyBuff = Buffer.from(secretKey, "hex");
  const signatureBuff = nacl.sign.detached(messageBuff, secretKeyBuff);
  const signature = Buffer.from(signatureBuff).toString("hex");
  const publicKeyBuff = nacl.sign.keyPair.fromSecretKey(secretKeyBuff)
    .publicKey;
  const address = Buffer.from(publicKeyBuff).toString("hex");

  // Send message
  return new URLSearchParams({
    address,
    timestamp,
    sig: signature,
    version: 2
  }).toString();
  // address=72ef...&timestamp=1548826778&sig=823c...&version=2
}
```
