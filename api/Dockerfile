FROM node:10.11.0-alpine

RUN apk add --no-cache git python build-base bind-tools bash

WORKDIR /usr/src/app

ADD src .

RUN npm install --production

CMD ["node","server.js"]
