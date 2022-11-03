const {Router} = require('express');
const { getVulnerabilities, getExploits } = require("../controllers/vulnController");
const {check,body} = require("express-validator");
const {validateInput} = require("../middleware/validate-login");
const {launchAttack} = require("../controllers/attackController")

const router = Router();


router.post("/",[
        check("attackname", "attackname is required").not().isEmpty(),
        check("hostname", "hostname is required").not().isEmpty(),
        validateInput,
    ],
    launchAttack
);



router.get("/",
[],
getVulnerabilities);

router.get("/exploits",
[],
getExploits);

module.exports = router;



// functions

