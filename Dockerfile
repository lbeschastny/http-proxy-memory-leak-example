ARG NODE_VERSION=${NODE_VERSION};
FROM node:${NODE_VERSION}-buster

ENV NODE_ENV="production" \
    USER="http-proxy" UID=1006 \
    WORKDIR="/var/http-proxy"

WORKDIR ${WORKDIR}

ADD . .
RUN npm ci

CMD npm start
