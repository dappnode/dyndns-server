FROM alpine

RUN apk --no-cache add bind gettext && \
    mkdir -p /var/bind/log

COPY templates /etc/bind/templates

EXPOSE 53/udp
EXPOSE 53/tcp

CMD ["./init.sh"]