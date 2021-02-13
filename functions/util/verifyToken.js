const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET;

if (!secretKey) throw new Error('JWT Key not provided');

module.exports = function (token) {
    if (!token) return {};

    try {
        const decoded = jwt.verify(token, secretKey);
        return decoded;
    }
    catch (ex) {
        console.debug(ex);
        throw new Error('Invalid token');
    }
}
