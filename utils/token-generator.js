const jwt = require("jsonwebtoken");

function generateAccessToken(username, userrole) {
    return jwt.sign({username, role:userrole}, process.env.TOKEN_SECRET, {
        expiresIn: "1800s",
    });
}

module.exports = {
    generateAccessToken,
};