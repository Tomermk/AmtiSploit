require('dotenv').config();
const {Router} = require('express');
const router = Router();
const {check} = require("express-validator");
const {validateInput} = require("../middleware/validate-login");
const {login} = require("../controllers/auth");



router.post("/",
    [
        check("username", "Username is required").not().isEmpty(),
        check("password", "Password is required").not().isEmpty(),
        validateInput,
    ],
    login 
);

module.exports = router;