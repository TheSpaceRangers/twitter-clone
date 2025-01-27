const express = require('express');

const dbController = require('../controllers/db-controller');

const router = express.Router();

router.post('/user', dbController.createOrRetrieveUser);
router.post('/posts', dbController.createPost);
router.get('/posts', dbController.getPosts);

module.exports = router;
