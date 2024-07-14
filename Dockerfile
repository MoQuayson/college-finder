FROM node:18-alpine3.20 AS builder

# Install xdg-utils
RUN apk add --no-cache xdg-utils

WORKDIR /usr/app

COPY package.json .

RUN ["npm", "install"]

COPY . .

CMD ["npm", "start"]