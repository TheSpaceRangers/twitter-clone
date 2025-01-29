const authService = require('../services/auth-service');

exports.choosePseudo = async (req, res) => {
    const { pseudo } = req.body;
    if (!pseudo)
        return res.status(400).json({ error: "Pseudo is required" });

    try {
        res.json(await authService.registerUser(pseudo));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.verifyToken = async (req, res) => {
    try {
        const { token } = req.body;
        if (!token)
            return res.status(400).json({ error: 'Token is required' });

        return res.json(await authService.verifyToken(token));
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
}
