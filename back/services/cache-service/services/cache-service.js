const redis = require('redis')

const client = redis.createClient({
    socket: {
        host: process.env.REDIS_HOST || '192.168.1.101',
        port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    },
});

client.on('error', (err) => {
    console.error('Redis Client Error:', err.message);
});

(async () => {
    try {
        await client.connect();
        console.log('Connected to Redis successfully.');
    } catch (err) {
        console.error('Failed to connect to Redis:', err.message);
    }
})();

exports.getCachedPosts = async () => {
    try {
        const cachedPosts = await client.get('posts');
        return cachedPosts ? JSON.parse(cachedPosts) : null;
    } catch (error) {
        console.error('Error fetching cached posts:', error.message);
        throw new Error('Failed to fetch cached posts');
    }
};

exports.cachePosts = async (posts) => {
    try {
        await client.set('posts', JSON.stringify(posts), { EX: 3600 });
    } catch (error) {
        console.error('Error caching posts:', error.message);
        throw new Error('Failed to cache posts');
    }
};
