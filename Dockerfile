ARG NODE_VERSION=${NODE_VERSION};
FROM node:${NODE_VERSION}-buster

ENV NODE_ENV="production" \
    WORKDIR="/var/http-proxy"

WORKDIR ${WORKDIR}

ADD . .
RUN npm ci

CMD npm start
