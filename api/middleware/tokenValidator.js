const jwt = require("jsonwebtoken");

const validateToken = (req, res, next) => {
    const authHeader = req.header("authorization");
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(401).json("You are not authenticated");

    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) return res.status(403).json("Invalid Token");
        req.data = decoded;
        next();
    });
}

const validateRefresh = (req, res, next) => {
    const refreshToken = req.body.refreshToken;

//     //if(refresh is not in db) return res.status(403).json("Refresh Token is not valid");

    jwt.verify(refreshToken, process.env.TOKEN_SECRET, (err, decode) => {
        if(err) return res.status(403).json("Inavlid Refresh Token");
        if(decode.refresh) {
            req.data = decode;
            next();
        } else {
            return res.status(403).json("Invalid Refresh Token");
        }
    });
}


module.exports = {
    validateToken,
    validateRefresh
}