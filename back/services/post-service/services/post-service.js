const axios = require('axios');

const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'http://auth-service:3001';
const DB_SERVICE_URL = process.env.DB_SERVICE_URL || 'http://db-service:3004';
const CACHE_SERVICE_URL = process.env.CACHE_SERVICE_URL || 'http://cache-service:3003';

async function verifyToken(token) {
    if (!token)
        throw new Error('No token provided');

    try {
        const response = await axios.post(`${AUTH_SERVICE_URL}/auth/verify-token`, { token: token.substring(7) });
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw new Error("Invalid token. Please try again.");
    }
}

exports.createPost = async (
    token,
    id_user,
    message
) => {
    const decoded = await verifyToken(token);
    if (decoded.userId !== id_user) {
        throw new Error('Unauthorized for this user');

    }
    try {
        return (await axios.post(`${DB_SERVICE_URL}/db/posts`, {id_user, message})).data;
    } catch (error) {
        console.error('Error in createPost service:', error.message);
        throw new Error('Failed to create post');
    }
};

exports.getPosts = async (
    token,
) => {
    await verifyToken(token);

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
