const express = require('express');

const postController = require('../controllers/post-controller');

const router = express.Router();

router.post('/', postController.createPost);
router.get('/', postController.getPosts);

module.exports = router;
