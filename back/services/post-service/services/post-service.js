const axios = require('axios');

const DB_SERVICE_URL = process.env.DB_SERVICE_URL || 'http://db-service:3004';
const CACHE_SERVICE_URL = process.env.CACHE_SERVICE_URL || 'http://cache-service:3003';

exports.createPost = async (
    id_user,
    message
) => {
    try {
        return (await axios.post(`${DB_SERVICE_URL}/db/posts`, {id_user, message})).data;
    } catch (error) {
        console.error('Error in createPost service:', error.message);
        throw new Error('Failed to create post');
    }
};

exports.getPosts = async () => {
    try {
        const cachedResponse = await axios.get(`${CACHE_SERVICE_URL}/cache/posts`);
        if (cachedResponse.data)
            return cachedResponse.data;
    } catch (cacheError) {
        console.warn('Cache not available or empty:', cacheError.message);
    }

    const posts = (await axios.get(`${DB_SERVICE_URL}/db/posts`)).data;

    try {
        await axios.post(`${CACHE_SERVICE_URL}/cache/posts`, { posts });
    } catch (cacheError) {
        console.warn('Failed to cache posts:', cacheError.message);
    }

    return posts;
};
