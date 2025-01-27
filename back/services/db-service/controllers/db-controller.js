const dbService = require('../services/db-service');

exports.createOrRetrieveUser = async (req, res) => {
    const { pseudo } = req.body;
    if (!pseudo)
        return res.status(400).json({ error: "Pseudo is required" });

    try {
        res.json(await dbService.createOrRetrieveUser(pseudo));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createPost = async (req, res) => {
    const { id_user, message } = req.body;

    if (!id_user || !message)
        return res.status(400).json({ error: 'id_user and message are required' });

    try {
        res.status(201).json(await dbService.createPost(id_user, message));
    } catch (error) {
        console.error('Error in createPost controller:', error.message);
        res.status(500).json({ error: 'Failed to create post' });
    }
};

exports.getPosts = async (req, res) => {
    try {
        res.status(200).json(await dbService.getPosts());
    } catch (error) {
        console.error('Error in getPosts controller:', error.message);
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
};
