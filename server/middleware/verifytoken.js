const jwt = require('jsonwebtoken');

exports.verifytoken = async (req, res, next) => {
    const key = process.env.JWT_SECRET;
    const req_token = req.headers.authorization;

    if (!req_token) {
        return res.status(401).json({ message: "Authorization token is missing" });
    }

    const token = req_token.split(' ');
    
    if (token.length !== 2 || token[0] !== 'Bearer' || !token[1]) {
        return res.status(401).json({ message: "Invalid token format" });
    }

    try {
        const verify_token = await jwt.verify(token[1], key);
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};
