const express = require('express');

const cacheController = require('../controllers/cache-controller');

const router = express.Router();

router.get('/posts', cacheController.getCachedPosts);
router.post('/posts', cacheController.cachePosts);

module.exports = router;
