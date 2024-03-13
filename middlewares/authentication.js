const jwt = require('jsonwebtoken');

const ROLES = {
    ADMIN: 'admin',
    STUDENT: 'student',
    TEACHER: 'teacher',
};

const roleID2Role = {
    1: ROLES.ADMIN,
    2: ROLES.TEACHER,
    3: ROLES.STUDENT
};

const authenticate = (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader || authHeader.length < 7) { 
        return res.status(401).json({ message: 'Unauthorized' });
    }

    if (!authHeader.startsWith("Bearer ")){
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.substring(7, authHeader.length);
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

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

const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        let role = roleID2Role[req.payload.role_id];
        if (!allowedRoles.includes(role)) {
            return res.status(403).json({ message: 'Access denied. You do not have permission to perform this action' });
        }
        
        next();
    }
}

module.exports = {
    authenticate,
    verifyRoles,
    ROLES
};
