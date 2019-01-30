const EthCrypto = require('eth-crypto');

function verifyEthCrypto({address, timestamp, sig}) {
    try {
        signAddress = EthCrypto.recover(sig, EthCrypto.hash.keccak256(timestamp.toString()));
        return signAddress.toLowerCase() === address.toLowerCase()
    } catch (err){
        return false
    }
}

module.exports = verifyEthCrypto;
