require('dotenv').config();
const {Router} = require('express');
const router = Router();
const {check,body} = require("express-validator");
const {validateInput} = require("../middleware/validate-login");
const {validateRefresh} = require("../middleware/tokenValidator");
const {login, refresh} = require("../controllers/auth");



router.post("/",
    [
        check("username", "Username is required").not().isEmpty(),
        check("password", "Password is required").not().isEmpty(),
        body('username').trim().escape(),
        body('password').trim().escape(),
        validateInput,
    ],
    login 
);



router.post("/refresh",
    [
        check("token", "Refresh Token is not valid!").not().isEmpty(),
        validateRefresh,
    ],
    refresh
);

module.exports = router;