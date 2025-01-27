const cacheService = require('../services/cache-service');

exports.getCachedPosts = async (req, res) => {
    try {
        const posts = await cacheService.getCachedPosts();
        if (posts)
            res.status(200).json(posts);
        else
            res.status(404).json({ message: 'No cached posts found' });
    } catch (error) {
        console.error('Error in getCachedPosts controller:', error.message);
        res.status(500).json({ error: 'Failed to fetch cached posts' });
    }
};

exports.cachePosts = async (req, res) => {
    const { posts } = req.body;
    if (!posts)
        return res.status(400).json({ error: 'Posts data is required' });

    try {
        await cacheService.cachePosts(posts);
        res.status(200).json({ message: 'Posts cached successfully' });
    } catch (error) {
        console.error('Error in cachePosts controller:', error.message);
        res.status(500).json({ error: 'Failed to cache posts' });
    }
};
