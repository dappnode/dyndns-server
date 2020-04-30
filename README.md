# dyndns-server

A Dynamic DNS server implementation for DAppNode.

In most of the cases, nodes running at home are using a dynamic IP provided by the ISP. Clients configured to connect to a provided IP will eventually lose connectivity to the DAppNode because its IP will change. At the moment we don't have any truly distributed, cross-platform and user friendly alternative to solve this, so we make use of an optional centralized service (which can be easily replicated) until we find a proper solution.

## Installation

Configure variables in docker-compose.yml to fit your needs.

Then the services can be deployed using docker compose:

```
$ docker-compose build
$ docker-compose up -d
```

## Usage

The server expects the following parameters in a GET call from the client:

`address` Public Ethereum address generated in the client.

`timestamp` Current UNIX timestamp. If the timestamp is not under some tolerance window (by default +/- 10min.) the request is not valid.

`sig` Signature of the timestamp by the address previously provided.

## Client request example

```
curl https://ns.dappnode.io/?address=0x8bb3A7F48F8c684EEF5BbE56c4c49c3Df636cd02&timestamp=1537958488&sig=0x97e9c5bfb4e46f73b0ef570a69f5fb39c6576b456506f4015bd0b64a4cd62a6b7a5278cbd3e070c4ce3177a8fbbe72801680b10c1384a6dcc8c369ec3f6ceeb31b
```
