const shell = require("shelljs");

async function nsupdate(server, zone, address, ttl, ip) {
  //var dnsType = 'A'
  shell.config.silent = true;
  const cmdTimeout = 10 * 1000;
  const nsupdateCmd = "nsupdate -v";
  var updateCmd = `server ${server}\ndebug yes\nzone ${zone}\nupdate delete ${address}.${zone} A\nupdate add ${address}.${zone} ${ttl} A ${ip}\nupdate add \*.${address}.${zone} ${ttl} A ${ip}\nshow\nsend`;
  const res = await shell
    .echo(updateCmd)
    .exec(nsupdateCmd, { timeout: cmdTimeout });

  if (!res) throw Error(command + " expired timeout: (" + maxTime + " ms)");

  if (res.code !== 0) {
    const err = res.stderr.length ? res.stderr : res.stdout;
    throw Error(err);
  }
  return res.stdout;
}

module.exports = nsupdate;
