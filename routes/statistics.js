const {Router} = require('express');
const { getVulnsStatus, getHostsVulnsStatus } = require("../controllers/vulnController");

const router = Router();


router.get("/vulnsStatus",
    getVulnsStatus
);


router.get("/hostsVulnsStatus",
    getHostsVulnsStatus
);

module.exports = router;


