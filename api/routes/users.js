const {Router} = require('express');
const { getAllUsers, getUserByID, changeSelfPassword,changePassword ,deleteUserbyID, createUser, updateUser  } = require('../controllers/usersController');
const {validateInput} = require("../middleware/validate-login");
const {check,body} = require("express-validator");

const router = Router();


// regex to check if string is 'Admin' or 'User'
const roleRegex = new RegExp("^(Admin|User)$");

router.get("/",
    getAllUsers
);

router.get("/:userID",
    getUserByID
);

router.post("/:userID/resetSelfPassword",
    [
        check("oldPassword", "Password is required").not().isEmpty(),
        check("newPassword", "New Password is required").not().isEmpty(),
        body('oldPassword').trim().escape(),
        body('newPassword').trim().escape(),
        validateInput,
    ],
    changeSelfPassword 
);

router.post("/:userID/resetPassword",
    [
        check("newPassword", "New Password is required").not().isEmpty(),
        body('newPassword').trim().escape(),
        validateInput,
    ],
    changePassword 
);

router.delete("/:userID",
    deleteUserbyID
);

router.post("/",
    [
        check("username", "Username is required").not().isEmpty(),
        check("password", "Password is required").not().isEmpty(),
        check("role", "Role is required").not().isEmpty(),
        check("role", "Role must be 'Admin' or 'User'").matches(roleRegex),
        check("email", "Email is required").not().isEmpty(),
        check("firstname", "Firstname is required").not().isEmpty(),
        check("lastname", "Lastname is required").not().isEmpty(),
        body('username').trim().escape(),
        body('password').trim().escape(),
        body('role').trim().escape(),
        body('email').isEmail().normalizeEmail(),
        body('firstname').trim().escape().isAlpha(),
        body('lastname').trim().escape().isAlpha(),
        validateInput,
    ],
    createUser
);

router.put("/",
    [
        check("username", "Username is required").not().isEmpty(),
        check("role", "Role is required").not().isEmpty(),
        check("role", "Role must be 'Admin' or 'User'").matches(roleRegex),
        body('username').trim().escape(),
        body('role').trim().escape(),
        validateInput,
    ],
    updateUser
);

// router.post("/:userId/forgetPassword", function (req, res) {

// });

// router.post("/:userId/changeForgottenPassword", function (req, res) {

// });


module.exports = router;
