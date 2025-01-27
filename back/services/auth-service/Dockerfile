FROM node:16

WORKDIR /app

COPY ../../package*.json ./

RUN npm install

COPY ./services/auth-service/ ./

EXPOSE 3001

CMD ["node", "server.js"]
