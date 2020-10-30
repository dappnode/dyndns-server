#!/bin/bash

export ZONE=${ZONE:-default}
export UPDATE_HOST=${UPDATE_HOST:-127.0.0.1}
export RECORD_TTL=${RECORD_TTL:-30}
export DLR='$'

if [ -z $KEY_PATH ]; then
    export INCLUDE_LINE=""
    export UPDATE_LINE="allow-update { ${UPDATE_HOST}; };"
else
    export INCLUDE_LINE="include \"$KEY_PATH\";"
    export UPDATE_LINE="allow-update {key \"${KEY_NAME}\"; ${UPDATE_HOST}; };"
fi

# Do not overwrite existing zone file
if [ ! -f "/etc/bind/$ZONE.zone" ]; then
    envsubst <"/etc/bind/templates/template.zone" >"/etc/bind/$ZONE.zone"
fi
envsubst <"/etc/bind/templates/named.conf" >"/etc/bind/named.conf"

exec /usr/sbin/named -d 1 -f -c /etc/bind/named.conf
