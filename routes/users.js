const {Router} = require('express');
const { getAllUsers, getUserByID, changeSelfPassword,changePassword ,deleteUserbyID} = require('../controllers/usersController');
const {validateInput} = require("../middleware/validate-login");
const {check,body} = require("express-validator");

const router = Router();


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

// router.post("/:userId/forgetPassword", function (req, res) {

// });

// router.post("/:userId/changeForgottenPassword", function (req, res) {

// });


module.exports = router;
