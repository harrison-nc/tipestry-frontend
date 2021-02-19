const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET;
if (!secretKey) throw new Error('JWT Key not provided');

exports.verify = (token, required = false) => {
    if (!token) {
        if (required) {
            throw new UnauthorizedError('Illegal access');
        }

        return {};
    }

    try {
        return jwt.verify(token, secretKey);
    }
    catch (ex) {
        console.debug(ex);
        throw new TokenError('Invalid token');
    }
}

class UnauthorizedError extends Error { }
class TokenError extends Error { }

exports.TokenError = TokenError;
exports.UnauthorizedError = UnauthorizedError;
