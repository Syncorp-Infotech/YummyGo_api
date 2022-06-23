const config = require('../configs/auth.config')
var jwt = require("jsonwebtoken");

async function verifyToken_(_reqheaders) {
    let token = _reqheaders["x-access-token"];

    if (!token) {
        var error = { status_code: '403', message: 'No token provided' };
        throw error;
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            var error = { status_code: '401', message: 'Authentication failed' };
            throw error;
        }
        return decoded.id;
    });
}

function verifyToken(_reqheaders) {
    return new Promise((resolve, reject) => {
        let token = _reqheaders["x-access-token"];

        if (!token) {
            var error = { status_code: '403', message: 'No token provided' };
            return reject(error);
        }

        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                var error = { status_code: '401', message: 'Authentication failed' };
                return reject(error);
            }
            return resolve(decoded.id);
        });
    });
}

module.exports = {
    verifyToken
}