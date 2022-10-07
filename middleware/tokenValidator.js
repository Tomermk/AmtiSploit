const jwt = require("jsonwebtoken");

const validateToken = (req, res, next) => {
    const authHeader = req.header("auth-token");
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(401).json("You are not authenticated");

    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) return res.status(403).json("Invalid Token");
        req.data = decoded;
        next();
    });
}

module.exports = {
    validateToken
}