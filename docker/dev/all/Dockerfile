FROM node:lts-alpine

ARG name

RUN mkdir /opt/${name}

WORKDIR /opt/${name}

RUN npm install

ENTRYPOINT [ "npm","run","dev" ]