const express = require('express');

const postRoutes = require('./routes/post-route');

const app = express();

app.use(express.json());

app.use('/posts', postRoutes);

module.exports = app;
