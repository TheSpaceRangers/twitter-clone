const axios = require('axios');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'MFqyJ6N56N3OtSwplTcfI/nxne0NVcyNAZ2F9dru+EI=';

exports.registerUser = async (pseudo) => {
    try {
        const response = await axios.post('http://db-service:3004/db/user', { pseudo });
        const {
            id,
            pseudo: savedPseudo
        } = response.data;

        const token = jwt.sign(
            { userId: id, pseudo: savedPseudo },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        return {
            id,
            pseudo: savedPseudo,
            token
        };
    } catch (error) {
        console.error("Error registering user:", error.message);
        throw new Error("Failed to register user. Please try again.");
    }
};

exports.verifyToken = async (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        console.error("Error verifying token:", error.message);
        throw new Error("Invalid token. Please try again.");
    }
}
