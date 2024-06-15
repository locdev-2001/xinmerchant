FROM node:18-alpine

EXPOSE 6800

RUN apk update && \
    apk add --no-cache bash

WORKDIR /app
COPY ./ ./
RUN mkdir uploads

RUN yarn install
RUN yarn build

#====================================RUN=============================================== 
CMD ["yarn", "start"]