const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader.startsWith("Bearer ")){
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.substring(7, authHeader.length);
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    console.log(token);
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (req.payload == undefined) {
            req.payload = {};
        }

        req.payload = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token' });
    }
};

module.exports = authenticateJWT;
