FROM node:16

WORKDIR /app

COPY ./../../package*.json .

RUN npm install

COPY ./services/cache-service ./

EXPOSE 3003

CMD ["node", "server.js"]
