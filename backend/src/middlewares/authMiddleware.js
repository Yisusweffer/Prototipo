const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'token requerido' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(
            token, 
            process.env.JWT_SECRET || 'secreto123'
        );
        req.user = decoded;
        next();
    } catch {
        res.status(401).json({ message: 'token inválido' });
    }
};

module.exports = auth;