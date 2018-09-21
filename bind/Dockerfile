FROM alpine

RUN apk --no-cache add bind && \
    mkdir -p /var/bind/log


EXPOSE 53/udp
EXPOSE 53/tcp

CMD /usr/sbin/named -f -c /etc/bind/named.conf