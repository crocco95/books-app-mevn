FROM node:lts-alpine

ARG name

RUN mkdir /opt/${name}

WORKDIR /opt/${name}

ENTRYPOINT [ "npm","run","dev" ]