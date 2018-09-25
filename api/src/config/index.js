
const config =  {
    server: {
        port: process.env.DYNDNS_API_PORT || '8080',
    },
    time_threshold: process.env.DYNDNS_THRESHOLD || 600,
    zone: process.env.DYNDNS_ZONE || "dyn.dappnode.io",
    ttl: process.env.DYNDNS_TTL || "30",
    bind_server: process.env.DYNDNS_BIND_SERVER || "127.0.0.1",
    message: process.env.DYNDNS_MESSAGE || "DAppNode DynDNS",
    limit_rate: process.env.DYNDNS_LIMIT_RATE || 5,
    limit_window: process.env.DYNDNS_LIMIT_WINDOW || 10
};

module.exports = config;