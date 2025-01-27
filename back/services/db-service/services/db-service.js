require('dotenv').config();

const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
});

exports.createOrRetrieveUser = async (
    pseudo
) => {
    const query = `
        INSERT INTO user (pseudo) VALUES (?)
        ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id)
    `;

    try {
        const [result] = await pool.query(query, [pseudo]);
        return { id: result.insertId, pseudo: pseudo };
    } catch (error) {
        console.error('Error in createOrRetrieveUser service:', error.message);
        throw new Error('Failed to create post');
    }
};

exports.createPost = async (
    id_user, message
) => {
    const query = `INSERT INTO message (id_user, message) VALUES (?, ?)`;

    try {
        const [result] = await pool.query(query, [id_user, message]);
        return { id: result.insertId, id_user, message };
    } catch (error) {
        console.error('Error in createPost service:', error.message);
        throw new Error('Failed to create post');
    }
};

exports.getPosts = async () => {
    const query = `
        SELECT m.id, u.pseudo, m.message, m.timestamp
        FROM message m
        JOIN user u ON m.id_user = u.id
        ORDER BY m.timestamp DESC
    `;

    try {
        return await pool.query(query);
    } catch (error) {
        console.error('Error in getPosts service:', error.message);
        throw new Error('Failed to fetch posts');
    }
};
