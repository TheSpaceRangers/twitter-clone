FROM node:16

WORKDIR /app

COPY ./../../package*.json .

RUN npm install

COPY ./services/db-service ./

EXPOSE 3004

CMD ["node", "server.js"]
