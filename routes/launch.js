const {Router} = require('express');
const { getVulnerabilities, getExploits } = require("../controllers/vulnController");
const {check} = require("express-validator");
const {validateInput} = require("../middleware/validate-login");
const {launchAttack} = require("../controllers/attackController")

const router = Router();

//regex to check a url with ip address and a port
const urlRegex = new RegExp(
    "^((https?:\/\/)|(www.))(?:([a-zA-Z0-9]+)([\-\.]{1}[a-z0-9]+)*|(\d+\.\d+.\d+.\d+)):\d{1,5}$");


router.post("/",[
        check("attackname", "attackname is required").not().isEmpty(),
        check("hostname", "hostname is required").not().isEmpty(),
        check("hostname","Hostname must be a valid URL with port").matches(urlRegex),
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

