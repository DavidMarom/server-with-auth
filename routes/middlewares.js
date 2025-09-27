const { isTokenActive } = require('../services/activeTokens');

function isAuthorized(req, res, next) {
    const token = req.headers.authorization;
    if (token && isTokenActive(token)) {
        console.log("Authorized via middleware");
        next();
    } else {
        res.status(401).json("Unauthorized");
    }
}

module.exports = { isAuthorized };
