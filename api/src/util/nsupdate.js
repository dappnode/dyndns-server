const shell = require('shelljs');

async function nsupdate(server, zone, address, ttl,  ip) {
    var dnsType = 'A'
    const nsupdateCmd = 'nsupdate -v'
    var updateCmd = `server ${server}\ndebug yes\nzone ${zone}\nupdate delete ${address}.${zone} A\nupdate add ${address}.${zone} ${ttl} A ${ip}\nshow\nsend`
    try {
        const res = await shell.echo(updateCmd).exec(nsupdateCmd);
        console.log(updateCmd);
    }
    catch (err) {
      console.log('nsupdate failed: ', err);
    }
    return true;
}

module.exports = nsupdate;