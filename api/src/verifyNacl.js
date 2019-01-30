const nacl = require('tweetnacl')

function verifyNacl({address, timestamp, sig}) {
    try {
        const publicKeyBuff = Buffer.from(address, 'hex')
        const signatureBuff = Buffer.from(sig, 'hex')
        const messageBuff = Buffer.from(timestamp.toString())
        return nacl.sign.detached.verify(messageBuff, signatureBuff, publicKeyBuff)
    } catch (err){
        return false
    }
}

module.exports = verifyNacl;
