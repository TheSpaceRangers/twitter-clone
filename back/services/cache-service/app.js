const express = require('express');

const cacheRoutes = require('./routes/cache-route');

const app = express();

app.use(express.json());
app.use('/cache', cacheRoutes);

module.exports = app;
