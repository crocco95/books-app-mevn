FROM node:lts-alpine

ARG name

RUN mkdir /opt/${name}

WORKDIR /opt/${name}

COPY ./backend/${name} .
RUN rm -R ./node_modules | echo No node_modules
RUN npm install

CMD ["npm", "start"]