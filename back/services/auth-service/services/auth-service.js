const axios = require('axios');

exports.registerUser = async (pseudo) => {
    try {
        const response = await axios.post('http://db-service:3004/db/user', { pseudo });
        const {
            id,
            pseudo: savedPseudo
        } = response.data;

        return {
            id,
            pseudo: savedPseudo,
        };
    } catch (error) {
        console.error("Error registering user:", error.message);
        throw new Error("Failed to register user. Please try again.");
    }
};
