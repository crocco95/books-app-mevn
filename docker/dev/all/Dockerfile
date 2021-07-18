FROM node:lts-alpine

ARG name

RUN mkdir /opt/${name}

WORKDIR /opt/${name}

RUN echo pwd

ENTRYPOINT [ "npm","run","dev" ]