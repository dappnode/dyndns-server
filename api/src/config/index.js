
const config =  {
    server: {
        port: process.env.DYNDNS_API_PORT || '8080',
    },
    time_threshold: process.env.DYNDNS_THRESHOLD || 600, // Default thresh
    zone: process.env.DYNDNS_ZONE || "dyn.dappnode.io",
    ttl: process.env.DYNDNS_TTL || "300",
    bind_server: process.env.DYNDNS_BIND_SERVER || "localhost",
    message: process.env.DYNDNS_MESSAGE || "DAppNode DynDNS"
    limit_rate:
};

module.exports = config;