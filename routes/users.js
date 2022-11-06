const {Router} = require('express');
const { getAllUsers, getUserByID, changePassword} = require('../controllers/usersController');
const {validateInput} = require("../middleware/validate-login");

const router = Router();


router.get("/",
    getAllUsers
);

router.get("/:userID",
    getUserByID
);

router.post("/:userID/changePassword",
    //Input validation
    changePassword 
);



// router.post("/:userId/forgetPassword", function (req, res) {

// });

// router.post("/:userId/changeForgottenPassword", function (req, res) {

// });


module.exports = router;
