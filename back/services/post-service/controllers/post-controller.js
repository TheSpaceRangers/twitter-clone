const postService = require('../services/post-service');

exports.createPost = async (req, res) => {
    const { id_user, message } = req.body;

    if (!id_user || !message)
        return res.status(400).json({ error: 'id_user and message are required' });

    try {
        res.status(201).json(await postService.createPost(id_user, message));
    } catch (error) {
        console.error('Error creating post:', error.message);
        res.status(500).json({ error: 'Failed to create post' });
    }
};

exports.getPosts = async (req, res) => {
    try {
        res.status(200).json(await postService.getPosts());
    } catch (error) {
        console.error('Error fetching posts:', error.message);
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
};
