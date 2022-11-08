const jwt = require("jsonwebtoken");

function generateAccessToken(username, userrole, id) {
    return jwt.sign({username, userid:id, role:userrole}, process.env.TOKEN_SECRET, {
        expiresIn: "1800s",
    });
}

function generateRefreshToken(username, userrole, id) {
    return jwt.sign({username, userid:id, role:userrole, refresh: true}, process.env.TOKEN_SECRET, {
        expiresIn: "7200s",
    });
}

module.exports = {
    generateAccessToken,
    generateRefreshToken
};