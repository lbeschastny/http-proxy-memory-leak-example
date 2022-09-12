FROM node:16.17.0-buster

ENV NODE_ENV="production" \
    USER="http-proxy" UID=1006 \
    WORKDIR="/var/http-proxy"

WORKDIR ${WORKDIR}

ADD . .
RUN npm ci

CMD npm start
