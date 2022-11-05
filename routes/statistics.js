const {Router} = require('express');
const { getVulnsStatus } = require("../controllers/vulnController");

const router = Router();


router.get("/vulnsStatus",
    getVulnsStatus
);

module.exports = router;



// functions

