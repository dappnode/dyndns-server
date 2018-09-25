FROM alpine

RUN apk --no-cache add bash bind gettext && \
    mkdir -p /var/bind/log

COPY templates /etc/bind/templates
COPY init.sh .

EXPOSE 53/udp
EXPOSE 53/tcp

CMD ["./init.sh"]