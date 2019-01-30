const express = require('express');
const rateLimit = require('express-rate-limit');
const nsupdate = require('./util/nsupdate');
const verifyEthCrypto = require('./verifyEthCrypto')
const verifyNacl = require('./verifyNacl')

// Load configuration
const config = require('./config');

var app = express();

// Trust NGINX proxy
app.enable("trust proxy"); 

// Apply the rate limit to all requests
const limiter = rateLimit({
  windowMs: parseInt(config.limit_window) * 60 * 1000,
  max: parseInt(config.limit_rate),
  message: JSON.stringify({ message: `Too many requests from this IP, please try again after ${config.limit_window} minutes.` })
});
app.use(limiter);

// Just return public IP, no JSON for consistency with other services (icanhazip.com, ident.me, etc.)
app.get('/myip',  function (req, res) {
    res.status(200).send(req.ip)
});

// Middleware to return JSON header
app.use('/',function (req, res, next) {
    res.header('Content-Type', 'application/json');
    next();
});

app.get('/', async function (req, res) {
    var address = req.query.address;
    var timestamp = parseInt(req.query.timestamp,10);
    var threshold  = parseInt(config.time_threshold,10);
    var sig = req.query.sig;
    var signAddress = '0x0';
    const epoch = Math.floor((new Date).getTime() / 1000 );
    var version = req.query.version

    // If no parameteres were passed, return a generic welcome message
    if (!timestamp && !sig && !address ) {
        return res.status(200).send(JSON.stringify({ message: config.message }));
    }
    // Return error if some parameter is missing
    if (!timestamp || !sig || !address ) {
        return res.status(400).send(JSON.stringify({ message: "Missing parameter(s)"}));
    }
    // Make sure the threshold is correct
    if (threshold >= timestamp ) {
        console.log(`Warning: Threshold ${threshold} is bigger than timestamp.`);
    }
    // Timestamp must be within a threshold
    if (Math.abs(epoch - timestamp) > threshold) {
        return res.status(400).send(JSON.stringify({ message: "Timestamp out of sync. Is your server syncronized?"}));
    }

    const sigIsValid = version && version == '2' 
        ? verifyNacl({address, timestamp, sig})
        : verifyEthCrypto({address, timestamp, sig})

    if (!sigIsValid) {
        return res.status(400).send(JSON.stringify({ message: "Invalid address or signature."}));
    }
 
    // Grab only first 16 chars of address as subdomain
    var subdomain = address.toLowerCase().replace('0x', '').substring(0,16);
    // Grab ipv4 only
    var remoteIP = req.ip.includes(':') ? req.ip.split(':')[3] : req.ip
    try {
        var result = await nsupdate(config.bind_server, config.zone, subdomain, config.ttl, remoteIP);
        if (result) {
            return res.status(200).send(JSON.stringify({
                ip: remoteIP,
                domain: `${subdomain}.${config.zone}`,
                message: `Your dynamic domain ${subdomain}.${config.zone} has been updated to ${remoteIP}`})
            );
        }
    } catch (err){
        console.log(err.message);
        return res.status(500).send(JSON.stringify({ message: "Internal error on update."}));
    }
});

app.listen(config.server.port, (err) => {
    if (err) {
		console.error(err.message);
		process.exit(1);
	}
    console.log(`Running on port ${config.server.port}...`);
});
