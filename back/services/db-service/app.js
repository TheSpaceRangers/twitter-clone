const express = require('express');

const dbRoute = require('./routes/db-route');

const app = express();
app.use(express.json());
app.use('/db', dbRoute);

module.exports = app;
