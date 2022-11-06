const {Router} = require('express');
const { getVulnsStatus, getHostsVulnsStatus, getAttacksWithDates } = require("../controllers/vulnController");

const router = Router();


router.get("/vulnsStatus",
    getVulnsStatus
);


router.get("/hostsVulnsStatus",
    getHostsVulnsStatus
);


router.get("/attacksWithDates",
    getAttacksWithDates
);

module.exports = router;


