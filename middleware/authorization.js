const jwt = require('jsonwebtoken');
const config = require('../config');
const { unauthorizedResponse } = require('../utils/helpers');

const Authorization = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        res.status(401).json(unauthorizedResponse());
    }else {
        const token = authHeader.split(' ');
        if (token[0] !== 'Bearer' || token.length !== 2) {
            res.status(401).json(unauthorizedResponse());
        }
        try {
            const decoded = jwt.verify(token[1], config.jwtSecret);
            req.userId = decoded.id;
            next();
        } catch (error) {
            res.status(401).json(unauthorizedResponse());  
        }
    }
}

module.exports = Authorization;