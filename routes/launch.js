const {Router} = require('express');
const { getVulnerabilities } = require("../controllers/vulnController");
const router = Router();


router.post("/", (req, res) => {
    console.log(req.body.attackname);
    console.log(req.body.hostname);
    res.status(200).json({message: "O.K."});
});

router.get("/",
[],
getVulnerabilities);

module.exports = router;