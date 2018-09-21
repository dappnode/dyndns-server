
const config =  {
    server: {
        port: process.env.API_PORT || '8080',
    },
    time_threshold: process.env.THRESHOLD || 300,
    zone: process.env.ZONE || "dyn.dappnode.io",
    ttl: process.env.TTL || "300",
    bind_server: process.env.BIND_SERVER || "localhost",
    welcome_message: process.env.MESSAGE || "DAppNode DynDNS"
};

module.exports = config;