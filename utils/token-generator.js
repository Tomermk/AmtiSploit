const jwt = require("jsonwebtoken");

function generateAccessToken(username, userrole) {
    return jwt.sign({username, role:userrole}, process.env.TOKEN_SECRET, {
        expiresIn: "1800s",
    });
}

function generateRefreshToken(username, userrole) {
    return jwt.sign({username, role:userrole, refresh: true}, process.env.TOKEN_SECRET, {
        expiresIn: "7200s",
    });
}

module.exports = {
    generateAccessToken,
    generateRefreshToken
};